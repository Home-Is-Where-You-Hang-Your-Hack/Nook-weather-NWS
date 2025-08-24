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
const zipToLatLong = async (zip: string): Promise<ILatLong | undefined> => {
  const res: SearchResult[] = await apiRequest.query({
    postalcode: zip,
    country: 'US',
    format: 'json',
  })
    .get(URL)
    .json();

  if (!res[0]) {
    return undefined;
  }

  return {
    latitude: res[0].lat,
    longitude: res[0].lon,
  } as ILatLong;
};

export default zipToLatLong;
