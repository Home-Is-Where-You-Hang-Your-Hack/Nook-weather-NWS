export interface ICurrentWeather {
  humidity: number | null;
  icon: string | null;
  lastUpdated: Date | null;
  location: string | null;
  pressure: number | null;
  shortForecast: string | null;
  temperature: number | null;
  todaysHighTemperature: number | null;
  todaysLowTemperature: number | null;
  windSpeed: number | null;
  windDirection: string | null;
}

interface ISharedForecast {
  icon: string | null;
  shortForecast: string | null;
  temperatureUnit: string | null;
  startTime: Date | null;
}

export interface IDisplayedForecastHour extends ISharedForecast {
  temperature: number | null;
}

export interface IDisplayedForecastDay extends ISharedForecast {
  dayOfWeek: string | null;
  highTemperature: number | null;
  lowTemperature: number | null;
}

export interface ITemplateData {
  currentWeather?: ICurrentWeather;
  dailyForecast?: IDisplayedForecastDay[];
  hourlyForecast?: IDisplayedForecastHour[];
  isValid: boolean;
}

export interface INwsIconDayNightMap {
  day: string;
  night?: string;
}
