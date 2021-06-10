import { DateTime } from 'luxon';
import { NWS_WEATHER_ICON_MAP, COORDINATES } from '../constants';
import {
  getPoints,
  getStationInfo,
  getCurrentWeather,
  getDailyForecast,
  getHourlyForecast,
} from '../apis/weathergov';
import localWeather from '../apis/localWeather';

type GridpointForecast = Components.Schemas.GridpointForecast;
type ObservationStation = Components.Schemas.ObservationStation;
type QuantitativeValue = Components.Schemas.QuantitativeValue;
type Observation = Components.Schemas.Observation;

class Nws {
    latitudeLongitude: LatLong;

    gridPointData: GridPoint;

    stationData: ObservationStation;

    nwsDailyForecast: GridpointForecast;

    nwsHourlyForecast: GridpointForecast;

    nwsCurrentForecast: Observation;

    templateData: templateData;

    constructor(latLong: LatLong) {
      this.templateData = { isValid: false };
      this.latitudeLongitude = latLong;
      this.getStationInfo();
    }

    /**
     * Fetch NWS station info
     *
     * @returns NWS station info
     */
    private async getStationInfo(): Promise<ObservationStation> {
      this.gridPointData = await getPoints(this.latitudeLongitude);
      this.stationData = await getStationInfo(this.gridPointData);

      return this.stationData;
    }

    /**
     * Update NWS forecast data and update template data
     *
     * @returns template data
     */
    public async updateForecast():Promise<templateData> {
      if (this.stationData.timeZone) {
        process.env.TZ = this.stationData.timeZone;
      }

      this.nwsDailyForecast = await getDailyForecast(this.gridPointData);
      this.nwsHourlyForecast = await getHourlyForecast(this.gridPointData);
      this.nwsCurrentForecast = await getCurrentWeather(this.stationData.stationIdentifier);
      const localWeatherData: currentWeather = await localWeather();

      const hourlyForecast: displayedForecastHour[] = this.formatHourly(this.nwsHourlyForecast);
      const dailyForecast: displayedForecastDay[] = this.formatDaily(this.nwsDailyForecast);
      let currentWeather: currentWeather = this.formatCurrent(this.nwsCurrentForecast,
        this.nwsDailyForecast);

      currentWeather.location = this.stationData.name;

      // Update NWS weather with local values, if exists
      currentWeather = {...currentWeather, ...localWeatherData};

      this.templateData = {
        hourlyForecast,
        dailyForecast,
        currentWeather,
        isValid: true,
      };

      return this.templateData;
    }

    formatCurrent = (nwsCurrentForecast: Observation,
      nwsDailyForecast: GridpointForecast):currentWeather => {
      const currentWeather: currentWeather = {};
      const temp1 = Number(nwsDailyForecast.periods[0].temperature);
      const temp2 = Number(nwsDailyForecast.periods[1].temperature);

      if (nwsCurrentForecast.temperature?.value !== null) {
        currentWeather.temperature = this.celsiusToFahrenheit(nwsCurrentForecast.temperature);
      }
      currentWeather.humidity = nwsCurrentForecast.relativeHumidity?.value;
      currentWeather.icon = this.mapNwsIconMap(nwsCurrentForecast.icon);

      currentWeather.lastUpdated = new Date(nwsCurrentForecast.timestamp);

      if (nwsCurrentForecast.barometricPressure?.value) {
        currentWeather.pressure = nwsCurrentForecast.barometricPressure.value;

        if (nwsCurrentForecast.barometricPressure?.unitCode === 'unit:Pa') {
          currentWeather.pressure = (nwsCurrentForecast.barometricPressure.value / 100);
        }
      }

      currentWeather.shortForecast = nwsCurrentForecast.textDescription;

      currentWeather.todaysHighTemperature = Math.max(temp1, temp2);
      currentWeather.todaysLowTemperature = Math.min(temp1, temp2);

      if (nwsCurrentForecast.windSpeed?.value) {
        currentWeather.windSpeed = this.kphsToMph(nwsCurrentForecast.windSpeed);
      }

      if (nwsCurrentForecast.windDirection?.value) {
        currentWeather.windDirection = this.compass(nwsCurrentForecast.windDirection.value);
      }

      return currentWeather;
    }

    /**
     * Format hourly forecast for template
     *
     * @returns foreatted forecast hours
     */
    formatHourly = (nwsHourlyForecast: GridpointForecast): displayedForecastHour[] => {
      const forecasts = nwsHourlyForecast.periods;
      const displayedForecastHours: displayedForecastHour[] = [];
      const forecastLength = forecasts.length;
      const now = DateTime.local().setLocale(this.stationData.timeZone);
      let i = 0;

      while (DateTime.fromISO(forecasts[i].startTime) < now) {
        i += 1;
      }

      for (i; i < forecastLength && displayedForecastHours.length < 6; i += 2) {
        const displayedForecastHour: displayedForecastHour = {
          startTime: new Date(forecasts[i].startTime),
          temperatureUnit: forecasts[i].temperatureUnit,
          icon: this.mapNwsIconMap(forecasts[i].icon),
          shortForecast: forecasts[i].shortForecast,
          temperature: Number(forecasts[i].temperature),
        };

        displayedForecastHours.push(displayedForecastHour);
      }

      return displayedForecastHours;
    }

    /**
     * Format daily forecast for template
     *
     * @returns formatted forecast days
     */
    formatDaily = (nwsDailyForecast: GridpointForecast): displayedForecastDay[] => {
      const forecasts = nwsDailyForecast.periods;
      const displayedForecastDays: displayedForecastDay[] = [];
      const forecastLength = forecasts.length;

      for (let i = 0; i < forecastLength - 1 && displayedForecastDays.length < 6; i += 1) {
        if (forecasts[i].name !== 'Tonight') {
          const forecastDay = DateTime.fromISO(forecasts[i].startTime).day;
          const newForecastDay = DateTime.fromISO(forecasts[i + 1].startTime).day;
          const temp1 = Number(forecasts[i].temperature);
          const temp2 = Number(forecasts[i + 1].temperature);

          if (forecastDay === newForecastDay) {
            const dayTime = forecasts[i].isDaytime ? forecasts[i] : forecasts[i + 1];

            const displayedForecastDay: displayedForecastDay = {
              dayOfWeek: dayTime.name,
              startTime: new Date(dayTime.startTime),
              temperatureUnit: dayTime.temperatureUnit,
              icon: this.mapNwsIconMap(dayTime.icon),
              shortForecast: dayTime.shortForecast,
              lowTemperature: Math.min(temp1, temp2),
              highTemperature: Math.max(temp1, temp2),
            };

            displayedForecastDays.push(displayedForecastDay);
          }
        }
      }

      return displayedForecastDays;
    }

    /**
     * Replace Icon path
     *
     * @param nwsIcon - NWS Weather Icon
     * @param isDaytime - Use day or night icon
     * @returns updated icon path
     */
    mapNwsIconMap = (nwsIcon: string): string => {
      const urlPath: string[] = nwsIcon.split('?')[0].split(',')[0].split('/');
      const condition:string = urlPath.pop();
      const isDaytime: boolean = (urlPath.pop() === 'day');
      const iconMap: NwsIconDayNightMap = NWS_WEATHER_ICON_MAP[condition];

      if (!iconMap) {
        return '';
      }

      const wiIcon = (!isDaytime && iconMap.night) ? iconMap.night : iconMap.day;

      return `/png/${wiIcon}.png`;
    }

    /**
     * Convert Celsius to Fahrenheit
     * @param temperature - temperature value and units
     * @returns
     */
    celsiusToFahrenheit = (temperature: QuantitativeValue): number => {
      if (temperature.unitCode === 'unit:degC') {
        return (temperature.value * (9 / 5) + 32);
      }
      return temperature.value;
    }

    /**
     * Kilometer per hour to miles per hour
     *
     * @param speed - speed value and units
     */
    kphsToMph = (speed: QuantitativeValue): number => {
      if (speed.unitCode === 'unit:km_h-1') {
        return (speed.value * (8 / 5));
      }
      return speed.value || 0;
    }

    /**
     * Wind degrees to direction
     *
     * @param bearing - wind direction bearing angle
     * @returns
     */
    compass = (bearing: number): string => {
      // 'N': [337.5, 360],
      let direction = 'N';

      Object.keys(COORDINATES).forEach((currentDirection) => {
        const directionRange = COORDINATES[currentDirection];
        if (bearing > directionRange[0] && bearing <= directionRange[1]) {
          direction = String(currentDirection);
        }
      });

      return direction;
    }
}

export default Nws;
