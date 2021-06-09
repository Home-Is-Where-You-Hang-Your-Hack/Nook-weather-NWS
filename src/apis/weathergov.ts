/**
 * Weather.gov API
 *
 * https://www.weather.gov/documentation/services-web-api
 */

import * as superagent from 'superagent';
import { USER_AGENT, HTTP_MAX_RETRIES } from '../constants';

export const WEATHERGOV_HOST_URL = 'https://api.weather.gov';

// set Superagent defaults
const agent = superagent.agent()
                        .retry(HTTP_MAX_RETRIES)
                        .set('User-Agent', USER_AGENT)
                        .set('accept', 'json');

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
function gridPointPath(gridPoint: GridPoint):string {
  return `${gridPoint.gridId}/${gridPoint.gridX},${gridPoint.gridY}`;
}

/**
 * Get latest observations for a given station
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y gridi points.
 * @returns
 */
export const getCurrentWeather = async (stationId: string): Promise<Observation> => { /* eslint-disable-line arrow-body-style */
  const url = `${WEATHERGOV_HOST_URL}/stations/${stationId}/observations/latest`;

  return agent.get(url)
              .then((res: superagent.Response): Observation => {
                const weather: ObservationGeoJson = JSON.parse(res.text);

                return weather.properties;
              });
};

/**
 * Get daily forecast for a given point
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y gridi points.
 * @returns
 */
export const getDailyForecast = async (gridPointData: GridPoint): Promise<GridpointForecast> => { /* eslint-disable-line arrow-body-style */
  const url = `${WEATHERGOV_HOST_URL}/gridpoints/${gridPointPath(gridPointData)}/forecast`;

  return agent.get(url)
              .then((res: superagent.Response): GridpointForecast => {
                const forecast: GridpointForecastGeoJson = JSON.parse(res.text);

                return forecast.properties;
              });
};

/**
 * Get hourly forecast for a given point
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y gridi points.
 * @returns
 */
export const getHourlyForecast = async (gridPointData: GridPoint): Promise<GridpointForecast> => { /* eslint-disable-line arrow-body-style */
  const url = `${WEATHERGOV_HOST_URL}/gridpoints/${gridPointPath(gridPointData)}/forecast/hourly`;

  return agent.get(url)
              .then((res: superagent.Response): GridpointForecast => {
                const forecast: GridpointForecastGeoJson = JSON.parse(res.text);

                return forecast.properties;
              });
};

/**
 * Get Point data from latitude/longitude
 *
 * @param latLong - Latitude and Longitude
 * @returns
 */
export const getPoints = async (latLong: LatLong): Promise<GridPoint > => { /* eslint-disable-line arrow-body-style */
  const url = `${WEATHERGOV_HOST_URL}/points/${latLong.latitude},${latLong.longitude}`;
  return agent.get(url)
              .then((res: superagent.Response): GridPoint => {
                const pointData: Components.Schemas.PointGeoJson = JSON.parse(res.text);

                const gridPointData: GridPoint = {
                  gridId: pointData.properties.gridId,
                  gridX: pointData.properties.gridX,
                  gridY: pointData.properties.gridY,
                };

                return gridPointData;
              });
};

/**
 * Get weather station metadata for a given station id
 *
 * @param gridUrlPath - NOAA/NWS weather station office and x/y gridi points.
 * @returns
 */
export const getStationInfo = async (gridPointData: GridPoint): Promise<ObservationStation> => { /* eslint-disable-line arrow-body-style */
  const url = `${WEATHERGOV_HOST_URL}/gridpoints/${gridPointPath(gridPointData)}/stations`;
  return agent.get(url)
              .then((res: superagent.Response): ObservationStation => {
                const stations: ObservationStations = JSON.parse(res.text);

                return stations.features[0].properties;
              });
};
