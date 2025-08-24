import { COORDINATES } from 'util/constants.js';

type QuantitativeValue = Components.Schemas.QuantitativeValue;

/**
 * Wind degrees to direction
 *
 * @param bearing - wind direction bearing angle
 * @returns
 */
const windCompass = (windDirection: QuantitativeValue | undefined): string | null => {
  if (!windDirection) {
    return null;
  }

  return Object.keys(COORDINATES).find((currentDirection) => {
    const directionRange = COORDINATES[currentDirection];
    const bearing = windDirection.value ?? null;

    return (
      directionRange
      && bearing !== null
      && bearing > directionRange[0]
      && bearing <= directionRange[1]
    );
  }) ?? null;
};

export default windCompass;
