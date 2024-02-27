// @flow
export const toNumberStringWithoutCommas = (formattedString: ?string) =>
  (formattedString && formattedString.split(',').join('')) || '';

export const toNumberFromFormattedString = (formattedString: string) => {
  const withoutCommas = toNumberStringWithoutCommas(formattedString);

  return parseFloat(withoutCommas) || 0;
};

export const toFormattedStringFromNumber = (num: number, isPointsBooking: ?boolean = true) => {
  const float = parseFloat(num);
  const options = isPointsBooking ? {} : { minimumFractionDigits: 2, maximumFractionDigits: 2 };

  return isNaN(float) ? '' : float.toLocaleString('en-US', options);
};

export const toFormattedPrice = (num: number) => toFormattedStringFromNumber(num, false);
