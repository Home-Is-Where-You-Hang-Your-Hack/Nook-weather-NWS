interface currentWeather {
  detailedForecast?: string,
  humidity?: number,
  icon?: string,
  lastUpdated?: Date,
  location?: string,
  pressure?: number,
  shortForecast?: string,
  temperature?: number
  todaysHighTemperature?: number,
  todaysLowTemperature?: number,
  windSpeed?: number,
  windDirection?: string,
}

interface displayedForecastHour {
  icon?: string,
  shortForecast?: string,
  startTime?: Date,
  temperature?: number,
  temperatureUnit?: string,
}

interface displayedForecastDay {
  dayOfWeek?: string,
  highTemperature?: number,
  icon?: string,
  lowTemperature?: number,
  shortForecast?: string,
  startTime?: Date,
  temperatureUnit?: string,
}

interface templateData {
  currentWeather?: currentWeather,
  dailyForecast?: displayedForecastDay[],
  hourlyForecast?: displayedForecastHour[],
  isValid: boolean,
}
