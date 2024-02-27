// @flow

export const convertStringToInt = (numberString: string): number => {
  const num = Number.parseInt(numberString);

  if (isNaN(num)) {
    return 0;
  }

  return num;
};

export const convertToNumber = (value: ?string): ?number => {
  const amount = value ? value.replace(/,/g, '') : value;

  return amount ? parseFloat(amount) : null;
};
