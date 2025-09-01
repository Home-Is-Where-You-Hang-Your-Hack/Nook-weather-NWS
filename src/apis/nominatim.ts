// cSpell: words nominatim, boundingbox,postalcode

/**
 * Open Street Map Nominatim API
 *
 * https://nominatim.org/release-docs/latest/api/Search/
 */

import { apiRequest } from 'util/helpers.js';

import type { ILatLong } from 'types/location.js';

interface SearchResult {
  boundingbox?: string[4];
  class: string;
  display_name: string;
  icon: string;
  importance: number;
  lat: string;
  license: string;
  lon: string;
  place_id: string;
  type: string;
}

const URL = 'https://nominatim.openstreetmap.org/search';

/**
 * Convert Zip code to latitude and longitude
 * @param zip - US Postal code/zip code
 * @returns Promise<ISearchResult>
 */
const zipToLatLong = async (zip: string): Promise<ILatLong> => {
  const res = await apiRequest.query({
    postalcode: zip,
    country: 'US',
    format: 'json',
  })
    .get(URL)
    .json()
    .catch(() => {
      // TODO: add debugging level log.
    });

  if (!Array.isArray(res) || !res[0]) {
    return Promise.reject();
  }

  const { lat: latitude, lon: longitude } = res[0] as SearchResult;

  return { latitude, longitude };
};

export default zipToLatLong;
