/**
 * Return weather information from a local source.
 *
 */

import * as superagent from 'superagent';

const localWeather = async (): Promise<currentWeather> => {
  const URL = '';

  if (!URL) {
    return Promise.resolve({});
  }

  return superagent.get(URL).then((): currentWeather => {
    return {};
  });
};

export default localWeather;
