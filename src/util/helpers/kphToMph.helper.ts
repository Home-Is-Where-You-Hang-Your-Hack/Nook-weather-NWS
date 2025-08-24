type QuantitativeValue = Components.Schemas.QuantitativeValue;

/**
 * Kilometer per hour to miles per hour
 *
 * @param speed - speed value and units
 */
const kphToMph = (speed: QuantitativeValue | undefined): number | null => {
  if (!speed) {
    return null;
  }

  if (speed.value && speed.unitCode === 'unit:km_h-1') {
    return (speed.value * (8 / 5));
  }
  return speed.value ?? null;
};

export default kphToMph;
