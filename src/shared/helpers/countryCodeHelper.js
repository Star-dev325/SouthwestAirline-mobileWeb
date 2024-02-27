// @flow
import countryCodes from 'src/shared/constants/countryCode';

export const getIsoCountryCodeForPhone = (numericCountryCode: ?string): string => {
  const parsedNumericCountryCode = parseInt(numericCountryCode);

  if (!parsedNumericCountryCode || parsedNumericCountryCode === 1) {
    return 'US';
  } else {
    const countryCodeEntry = Object.entries(countryCodes).find(([, numericCode]) => numericCode === parsedNumericCountryCode);

    return countryCodeEntry ? countryCodeEntry[0] : 'US';
  }
};
