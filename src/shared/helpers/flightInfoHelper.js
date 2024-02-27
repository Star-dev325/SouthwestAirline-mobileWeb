export const calculateFlightNumberFontSize = (flightNumber) => {
  flightNumber = Array.isArray(flightNumber) ? flightNumber.join('') : flightNumber;

  const flightNumberLength = flightNumber?.length || 0;

  if (flightNumberLength <= 9) return 'xlarge';
  
  if (flightNumberLength <= 13) return 'large';

  return 'medium';
};
export const isValidFlightNumber = (num) => num !== '0' && /^([0-9]{0,4})$/.test(num);
