import { formatAccountNumber } from 'src/shared/helpers/accountNumberFormatter';

describe('accountNumberFormatter', () => {
  it('should return accountNumber without zeros at the beginning', () => {
    const accountNumberWithZeros = '000123123123';

    const result = formatAccountNumber(accountNumberWithZeros);

    expect(result).toEqual('123123123');
  });

  it('should return not modify accountNumber if there are no zeros at the beginning', () => {
    const accountNumberWithoutZeros = '23230003';

    const result = formatAccountNumber(accountNumberWithoutZeros);

    expect(result).toEqual('23230003');
  });

  it('should return empty string if account number is undefined', () => {
    const undefinedAccountNumber = undefined;

    const result = formatAccountNumber(undefinedAccountNumber);

    expect(result).toEqual('');
  });
});
