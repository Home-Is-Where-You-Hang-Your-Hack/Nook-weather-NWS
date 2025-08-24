import { NWS_WEATHER_ICON_MAP } from 'util/constants.js';

import type { INwsIconDayNightMap } from 'types/weather.js';
/**
 * Replace Icon path
 *
 * @param nwsIcon - NWS Weather Icon
 * @param isDaytime - Use day or night icon
 * @returns updated icon path
 */
const mapNwsIconMap = (nwsIcon: string | undefined): string | null => {
  const { pathname } = new URL(nwsIcon ?? '');
  if (!nwsIcon || !pathname) {
    return null;
  }
  const urlPath: string[] = pathname.split('/');
  const condition: string | null = urlPath[urlPath.length - 1]?.split(',')[0] ?? null;
  const isDaytime: boolean = urlPath.some((x) => x === 'day');
  const iconMap: INwsIconDayNightMap | null = NWS_WEATHER_ICON_MAP[condition ?? ''] ?? null;

  if (!iconMap) {
    return '';
  }

  const wiIcon = (!isDaytime && iconMap.night) ? iconMap.night : iconMap.day;

  return `/png/${wiIcon}.png`;
};

export default mapNwsIconMap;
