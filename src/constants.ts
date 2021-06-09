export const USER_AGENT = `Home-Is-Where-You-Hang-Your-Hack/nook-weather-${process.env.EMAIL}`;
export const DEFAULT_PORT = 3099;

export const HTTP_MAX_RETRIES = 5;

export const NWS_WEATHER_ICON_MAP: Record<string, any> = {
  bkn: { day: 'wi-cloud' },
  blizzard: { day: 'wi-day-snow', night: 'wi-night-snow' },
  cold: { day: 'wi-thermometer-exterior' },
  dust: { day: 'wi-dust' },
  few: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy' },
  fog: { day: 'wi-fog', night: 'wi-night-fog' },
  fzra: { day: 'wi-day-rain-mix', night: 'wi-night-alt-rain-mix' },
  haze: { day: 'wi-day-haze' },
  hot: { day: 'wi-hot' },
  hurricane: { day: 'wi-hurricane' },
  ovc: { day: 'wi-cloudy' },
  rain_fzra: { day: 'wi-day-rain-mix', night: 'wi-night-alt-rain-mix' },
  rain_showers_hi: { day: 'wi-day-sprinkle', night: 'wi-night-alt-sprinkle' },
  rain_showers: { day: 'wi-day-showers', night: 'wi-night-alt-showers' },
  rain_sleet: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  rain_snow: { day: 'wi-day-rain-mix', night: 'wi-night-alt-rain-mix' },
  rain: { day: 'wi-day-rain', night: 'wi-night-alt-rain' },
  sct: { day: 'wi-day-cloudy', night: 'wi-night-alt-cloudy' },
  skc: { day: 'wi-day-sunny', night: 'wi-night-clear' },
  sleet: { day: 'wi-day-hail', night: 'wi-night-alt-hail' },
  smoke: { day: 'wi-smoke' },
  snow_fzra: { day: 'wi-day-rain-mix', night: 'wi-night-alt-rain-mix' },
  snow_sleet: { day: 'wi-day-sleet', night: 'wi-night-alt-sleet' },
  snow: { day: 'wi-day-snow', night: 'wi-night-snow' },
  tornado: { day: 'wi-tornado' },
  tropical_storm: { day: 'wi-storm-warning' },
  tsra_hi: { day: 'wi-day-storm-showers', night: 'wi-night-alt-storm-showers' },
  tsra_sct: { day: 'wi-thunderstorm' },
  tsra: { day: 'wi-thunderstorm' },
  wind_bkn: { day: 'wi-cloudy-gusts', night: 'wi-cloudy-gusts' },
  wind_few: { day: 'wi-day-cloudy-gusts', night: 'wi-night-alt-cloudy-gusts' },
  wind_ovc: { day: 'wi-cloudy-gusts', night: 'wi-cloudy-gusts' },
  wind_sct: { day: 'wi-day-cloudy-gusts', night: 'wi-night-alt-cloudy-gusts' },
  wind_skc: { day: 'wi-day-windy', night: 'wi-strong-wind' },
};

export const COORDINATES: Record<string, any> = {
  N: [0, 22.5],
  NE: [22.5, 67.5],
  E: [67.5, 112.5],
  SE: [112.5, 157.5],
  S: [157.5, 202.5],
  SW: [202.5, 247.5],
  W: [247.5, 292.5],
  NW: [292.5, 337.5],
};
