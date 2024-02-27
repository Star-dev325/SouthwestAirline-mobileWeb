const zeroAtStartOfLineRegex = /^0+/;

export const formatAccountNumber = (accountNumber) =>
  (accountNumber ? accountNumber.replace(zeroAtStartOfLineRegex, '') : '');
