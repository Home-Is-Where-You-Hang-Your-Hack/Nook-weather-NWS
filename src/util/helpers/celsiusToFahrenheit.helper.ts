type QuantitativeValue = Components.Schemas.QuantitativeValue;

/**
 * Convert Celsius to Fahrenheit
 * @param temperature - temperature value and units
 * @returns
 */
const celsiusToFahrenheit = (temperature: QuantitativeValue | undefined): number | null => {
  if (!temperature) {
    return null;
  }

  if (temperature.value && temperature.unitCode?.endsWith(':degC')) {
    return (temperature.value * (9 / 5) + 32);
  }
  return temperature.value ?? null;
};

export default celsiusToFahrenheit;
