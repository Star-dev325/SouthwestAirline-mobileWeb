import { isCurrencyAmountZero, getZeroValueByCurrencyCode } from 'src/shared/helpers/travelFundsHelper';
import { POINTS, DOLLAR } from 'src/shared/constants/currencyTypes';

describe('TravelFundsHelper', () => {
  context('isCurrencyAmountZero', () => {
    it('should return true if the amount is 0.00', () => {
      expect(
        isCurrencyAmountZero({
          amount: '0.00',
          currencyCode: 'US',
          currencySymbol: '$'
        })
      ).to.equal(true);
    });

    it('should return false if the amount is not 0.00', () => {
      expect(
        isCurrencyAmountZero({
          amount: '10.00',
          currencyCode: 'US',
          currencySymbol: '$'
        })
      ).to.equal(false);
    });
  });

  context('getZeroValueByCurrencyCode', () => {
    it('should return 0 for a PTS currencyCode', () => {
      const currency = {
        currencyCode: POINTS
      };
      const expectedResult = '0';

      expect(getZeroValueByCurrencyCode(currency)).to.equal(expectedResult);
    });

    it('should return 0.00 for a USD currencyCode', () => {
      const currency = {
        currencyCode: DOLLAR
      };
      const expectedResult = '0.00';

      expect(getZeroValueByCurrencyCode(currency)).to.equal(expectedResult);
    });

    it('should return 0.00 for any other currencyCode', () => {
      const currency = {
        currencyCode: 'some other currencyCode'
      };
      const expectedResult = '0.00';

      expect(getZeroValueByCurrencyCode(currency)).to.equal(expectedResult);
    });

    it('should return 0.00 if currencyCode does not exist', () => {
      const currency = {};
      const expectedResult = '0.00';

      expect(getZeroValueByCurrencyCode(currency)).to.equal(expectedResult);
    });

    it('should return 0.00 if currency does not exist', () => {
      const expectedResult = '0.00';

      expect(getZeroValueByCurrencyCode()).to.equal(expectedResult);
    });
  });
});
