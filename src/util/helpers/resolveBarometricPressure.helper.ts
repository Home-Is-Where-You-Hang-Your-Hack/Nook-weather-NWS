type QuantitativeValue = Components.Schemas.QuantitativeValue;

/**
 * Resolve Barometric Pressure
 *
 * @param pressure - pressure value and units
 */
const resolveBarometricPressure = (pressure: QuantitativeValue | undefined): number | null => {
  if (!pressure) {
    return null;
  }

  if (pressure.value && pressure.unitCode === 'unit:Pa') {
    return (pressure.value / 100);
  }
  return pressure.value ?? null;
};

export default resolveBarometricPressure;
