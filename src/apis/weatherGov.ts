// cSpell: words Gridpoint gridpoints NOAA
/**
 * Weather.gov API
 *
 * https://www.weather.gov/documentation/services-web-api
 */

import { apiRequest } from 'util/helpers.js';

import type { IGridPoint, ILatLong } from 'types/location.js';

const WEATHER_GOV_HOST_URL = 'https://api.weather.gov';

type GridpointForecast = Components.Schemas.GridpointForecast;
type GridpointForecastGeoJson = Components.Schemas.GridpointForecastGeoJson;
type ObservationStations = Components.Schemas.ObservationStationCollectionGeoJson;
type ObservationStation = Components.Schemas.ObservationStation;
type Observation = Components.Schemas.Observation;
type ObservationGeoJson = Components.Schemas.ObservationGeoJson;

/**
 * Generate Weather.gov grid points path
 *
 * @param gridPoint - Grid id and x,y points
 * @returns Weather.gov grid points path
 */
function gridPointPath(gridPoint: IGridPoint): string {
  return `/${gridPoint.gridId}/${gridPoint.gridX},${gridPoint.gridY}`;
}

/**
 * Get latest observations for a given station
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y grid points.
 * @returns
 */
const getCurrentWeather = async (stationId: string): Promise<Observation> => {
  const url = `${WEATHER_GOV_HOST_URL}/stations/${stationId}/observations/latest`;

  return apiRequest.get(url).json((weather: ObservationGeoJson) => weather.properties);
};

/**
 * Get daily forecast for a given point
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y grid points.
 * @returns
 */
const getDailyForecast = async (gridPointData: IGridPoint): Promise<GridpointForecast> => {
  const url = `${WEATHER_GOV_HOST_URL}/gridpoints/${gridPointPath(gridPointData)}/forecast`;

  return apiRequest.get(url).json((forecast: GridpointForecastGeoJson) => forecast.properties);
};

/**
 * Get hourly forecast for a given point
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y grid points.
 * @returns
 */
const getHourlyForecast = async (gridPointData: IGridPoint): Promise<GridpointForecast> => {
  const url = `${WEATHER_GOV_HOST_URL}/gridpoints/${gridPointPath(gridPointData)}/forecast/hourly`;

  return apiRequest.get(url).json((forecast: GridpointForecastGeoJson) => forecast.properties);
};

/**
 * Get Point data from latitude/longitude
 *
 * @param latLong - Latitude and Longitude
 * @returns
 */
const getPoints = async (latLong: ILatLong): Promise<IGridPoint> => {
  const url = `${WEATHER_GOV_HOST_URL}/points/${latLong.latitude},${latLong.longitude}`;

  return apiRequest.get(url).json((pointData: Components.Schemas.PointGeoJson): IGridPoint => {
    const { gridId, gridX, gridY } = pointData.properties;
    return {
      gridId,
      gridX,
      gridY,
    } as IGridPoint;
  });
};

/**
 * Get weather station metadata for a given station id
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y  points.
 * @returns
 */
const getStationInfo = async (pointData: IGridPoint): Promise<ObservationStation | undefined> => {
  const url = `${WEATHER_GOV_HOST_URL}/gridpoints/${gridPointPath(pointData)}/stations`;

  return apiRequest.get(url).json((stations: ObservationStations) => (
    stations.features[0]?.properties
  ));
};

export {
  getCurrentWeather,
  getDailyForecast,
  getHourlyForecast,
  getPoints,
  getStationInfo,
};
