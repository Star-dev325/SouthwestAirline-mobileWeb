export const removeSeparator = (originalString) => {
  if (typeof originalString === 'string') {
    return originalString.replace(/-/g, '');
  } else {
    return originalString;
  }
};

export const addUSPhoneNumberSeparator = (phoneNumberString) =>
  phoneNumberString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');

export const addPhoneNumberSeparator = (phoneNumberString, countryCode) =>
  (countryCode === '1' && phoneNumberString ? addUSPhoneNumberSeparator(phoneNumberString) : phoneNumberString);
