/**
 * Open Street Map Nominatim API
 *
 * https://nominatim.org/release-docs/latest/api/Search/
 */

import * as superagent from 'superagent';
import { USER_AGENT, HTTP_MAX_RETRIES } from '../constants';

interface SearchResult {
  boundingbox?: string[4]
  class: string
  display_name: string /* eslint-disable-line camelcase */
  icon: string
  importance: number
  lat: string
  licence: string
  lon: string
  place_id: string /* eslint-disable-line camelcase */
  type: string
}

/**
 * Convert Zip code to latitude and longitude
 * @param zip - US Postal code/zip code
 * @returns Promise<ISearchResult>
 */
const zipToLatLong = async (zip: number): Promise<LatLong> => {
  // Verify the zip code is five digits in length
  if (zip.toString().length !== 5) {
    throw new Error('Zip code is not 5 digits in length');
  }

  return superagent.get('https://nominatim.openstreetmap.org/search')
                   .retry(HTTP_MAX_RETRIES)
                   .set('User-Agent', USER_AGENT)
                   .set('accept', 'json')
                   .query({
                     postalcode: zip,
                     country: 'US',
                     format: 'json',
                   })
                   .then((res: superagent.Response): LatLong => {
                     const obj: SearchResult[] = JSON.parse(res.text);
                     const latLong: LatLong = {
                       latitude: obj[0].lat,
                       longitude: obj[0].lon,
                     };
                     return latLong;
                   });
};

export default zipToLatLong;
