// cSpell: words Gridpoint kphs
import { setInterval } from 'node:timers';

import { TZDate } from '@date-fns/tz';
import retry from 'async-retry';
import { getDay, isBefore } from 'date-fns';
import { get } from 'lodash-es';

import {
  getCurrentWeather,
  getDailyForecast,
  getHourlyForecast,
} from 'apis/weatherGov.js';
import {
  celsiusToFahrenheit,
  kphToMph,
  mapNwsIconMap,
  resolveBarometricPressure,
  windCompass,
} from 'util/helpers.js';

import Location from './location.js';

import type {
  ICurrentWeather,
  IDisplayedForecastDay,
  IDisplayedForecastHour,
  ITemplateData,
} from 'types/weather.js';

type GridpointForecast = Components.Schemas.GridpointForecast;
type Observation = Components.Schemas.Observation;
type QuantitativeValue = Components.Schemas.QuantitativeValue;

const MINUTES_TO_MS = 60000;

type QuantitativeValueOrNumber = number | QuantitativeValue | null | undefined;
const resolveQuantOrNumber = (val: QuantitativeValueOrNumber): number | null => (
  (val as QuantitativeValue).value ?? (val as number) ?? null
);

const formatCurrent = (
  nwsCurrentWeather: Observation,
  nwsDailyForecast: GridpointForecast,
  location: string,
): ICurrentWeather => {
  const {
    temperature: temperatureObject,
    relativeHumidity,
    icon: iconPath,
    timestamp,
    windDirection: windDirectionObject,
    windSpeed: windSpeedObject,
    textDescription,
    barometricPressure,
  } = nwsCurrentWeather;
  const dailyTemp1 = resolveQuantOrNumber(get(nwsDailyForecast, 'periods[0].temperature'));
  const dailyTemp2 = resolveQuantOrNumber(get(nwsDailyForecast, 'periods[1].temperature'));

  const lastUpdated = timestamp ? new Date(timestamp) : null;

  const hasDailyHighLow = dailyTemp1 !== null && dailyTemp2 !== null;
  const todaysHighTemperature = hasDailyHighLow ? Math.max(dailyTemp1, dailyTemp2) : null;
  const todaysLowTemperature = hasDailyHighLow ? Math.min(dailyTemp1, dailyTemp2) : null;

  return {
    temperature: celsiusToFahrenheit(temperatureObject),
    humidity: relativeHumidity?.value ?? null,
    windDirection: windCompass(windDirectionObject),
    icon: mapNwsIconMap(iconPath),
    lastUpdated,
    windSpeed: kphToMph(windSpeedObject),
    pressure: resolveBarometricPressure(barometricPressure),
    todaysHighTemperature,
    todaysLowTemperature,
    shortForecast: textDescription ?? null,
    location,
  };
};

/**
 * Format hourly forecast for template
 *
 * @returns formatted forecast hours
 */
const formatHourly = (
  nwsHourlyForecast: GridpointForecast,
  timeZone: string | undefined,
): IDisplayedForecastHour[] => {
  const { periods: forecasts } = nwsHourlyForecast;
  const now = timeZone ? TZDate.tz(timeZone) : Date.now();

  let displayedForecastHours: IDisplayedForecastHour[] = [];
  let i = 0;

  if (!forecasts) {
    return [];
  }

  while (forecasts[i]?.startTime && isBefore(forecasts[i]?.startTime ?? 0, now)) {
    i += 1;
  }

  const numForecast = forecasts.length;

  for (i; i < numForecast && displayedForecastHours.length < 6; i += 2) {
    const currentForecast = forecasts[i];
    if (currentForecast) {
      const {
        startTime,
        temperatureUnit,
        icon,
        shortForecast,
        temperature,
      } = currentForecast;
      const displayedForecastHour: IDisplayedForecastHour = {
        startTime: startTime ? new Date(startTime) : null,
        temperatureUnit: temperatureUnit ?? null,
        icon: mapNwsIconMap(icon),
        shortForecast: shortForecast ?? null,
        temperature: (temperature as QuantitativeValue).value ?? (temperature as number) ?? null,
      };

      displayedForecastHours = [
        ...displayedForecastHours,
        displayedForecastHour,
      ];
    }
  }

  return displayedForecastHours;
};

/**
 * Format daily forecast for template
 *
 * @returns formatted forecast days
 */
const formatDaily = (
  nwsDailyForecast: GridpointForecast,
  timeZone: string | undefined,
): IDisplayedForecastDay[] => {
  const { periods: forecasts } = nwsDailyForecast;
  const now = timeZone ? TZDate.tz(timeZone) : Date.now();

  let displayedForecastDays: IDisplayedForecastDay[] = [];
  let i = 0;

  if (!forecasts) {
    return [];
  }

  while (forecasts[i]?.endTime && isBefore(forecasts[i]?.endTime ?? 0, now)) {
    i += 1;
  }

  const numForecast = forecasts.length;

  for (i; i < numForecast - 1 && displayedForecastDays.length < 6; i += 1) {
    const currentForecast = forecasts[i];
    const nextForecast = forecasts[i + 1];
    if (currentForecast && nextForecast && currentForecast.name !== 'Tonight') {
      const forecastDay = currentForecast.startTime ? getDay(currentForecast.startTime) : null;
      const newForecastDay = nextForecast.startTime ? getDay(nextForecast.startTime) : null;
      const temp1 = Number(currentForecast.temperature);
      const temp2 = Number(nextForecast.temperature);

      if (forecastDay === newForecastDay) {
        const dayTime = currentForecast.isDaytime ? currentForecast : nextForecast;

        const displayedForecastDay: IDisplayedForecastDay = {
          dayOfWeek: dayTime.name ?? null,
          startTime: dayTime.startTime ? new Date(dayTime.startTime) : null,
          temperatureUnit: dayTime.temperatureUnit ?? null,
          icon: mapNwsIconMap(dayTime.icon),
          shortForecast: dayTime.shortForecast ?? null,
          lowTemperature: Math.min(temp1, temp2),
          highTemperature: Math.max(temp1, temp2),
        };

        displayedForecastDays = [
          ...displayedForecastDays,
          displayedForecastDay,
        ];
      }
    }
  }

  return displayedForecastDays;
};

class Nws {
  location: Location;

  nwsDailyForecast: GridpointForecast | undefined;

  nwsDailyForecastTimerId: ReturnType<typeof setTimeout> | undefined;

  nwsDailyForecastLastRequested = 0;

  nwsHourlyForecast: GridpointForecast | undefined;

  nwsHourlyForecastTimerId: ReturnType<typeof setTimeout> | undefined;

  nwsHourlyForecastLastRequested = 0;

  nwsCurrentWeather: Observation | undefined;

  nwsCurrentWeatherTimerId: ReturnType<typeof setTimeout> | undefined;

  constructor(zipCode: string) {
    this.location = new Location(zipCode);
    this.verifyLocationComplete();
  }

  private async verifyLocationComplete() {
    // TODO: this is a bit of a hack, figure out a better way to verify all of the data
    //       with a promise without spamming the apis
    await retry(
      async (bail) => {
        const response = await this.location.determineNWSLocation();
        if (!response) {
          bail(new Error('Location is not fulled loaded yet'));
        }

        this.initializeForecastRequests();
      },
      {
        minTimeout: 5000,
      },
    );
  }

  private initializeForecastRequests() {
    if (
      this.nwsDailyForecastTimerId
      && this.nwsCurrentWeatherTimerId
      && this.nwsHourlyForecastTimerId) {
      return;
    }

    if (this.location.timeZone) {
      process.env.TZ = this.location.timeZone;
    }

    this.nwsDailyForecastTimerId = setInterval(
      this.updateDailyForecast.bind(this),
      (parseInt(process.env['DAILY_FORECAST_INTERVAL_IN_MIN'] ?? '60', 10) * MINUTES_TO_MS),
    );

    this.nwsHourlyForecastTimerId = setInterval(
      this.updateHourlyForecast.bind(this),
      (parseInt(process.env['HOURLY_FORECAST_INTERVAL_IN_MIN'] ?? '15', 10) * MINUTES_TO_MS),
    );

    this.nwsCurrentWeatherTimerId = setInterval(
      this.updateCurrentWeather.bind(this),
      (parseInt(process.env['CURRENT_FORECAST_INTERVAL_IN_MIN'] ?? '3', 10) * MINUTES_TO_MS),
    );

    this.updateCurrentWeather();
    this.updateHourlyForecast();
    this.updateDailyForecast();
  }

  /**
   *
   */
  private async updateDailyForecast() {
    if (!this.location?.gridPoints) {
      await this.location?.determineNWSLocation();
    }

    if (this.location?.gridPoints) {
      this.nwsDailyForecast = await getDailyForecast(this.location?.gridPoints);
    }
  }

  /**
   *
   */
  private async updateHourlyForecast() {
    if (!this.location?.gridPoints) {
      await this.location?.determineNWSLocation();
    }

    if (this.location?.gridPoints) {
      this.nwsHourlyForecast = await getHourlyForecast(this.location?.gridPoints);
    }
  }

  private async updateCurrentWeather() {
    if (!this.location?.stationIdentifier) {
      await this.location?.determineNWSLocation();
    }

    if (this.location?.stationIdentifier) {
      this.nwsCurrentWeather = await getCurrentWeather(this.location?.stationIdentifier);
    }
  }

  /**
   * Update NWS forecast data and update template data
   *
   * @returns template data
   */
  public async updateForecast(): Promise<ITemplateData> {
    if (!this.nwsDailyForecast || !this.nwsHourlyForecast || !this.nwsCurrentWeather) {
      return { isValid: false };
    }

    const hourlyForecast = formatHourly(this.nwsHourlyForecast, this.location?.timeZone);
    const dailyForecast = formatDaily(this.nwsDailyForecast, this.location?.timeZone);
    const currentWeather = formatCurrent(
      this.nwsCurrentWeather,
      this.nwsDailyForecast,
      this.location?.locationName,
    );

    return {
      hourlyForecast,
      dailyForecast,
      currentWeather,
      isValid: true,
    };
  }
}

export default Nws;
