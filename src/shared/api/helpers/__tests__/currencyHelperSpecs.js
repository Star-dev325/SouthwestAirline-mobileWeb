import { getCurrencyFromDollarsToCents, addCurrency } from 'src/shared/api/helpers/currencyHelper';

describe('currencyHelper', () => {
  context('getCurrencyFromDollarsToCents', () => {
    it('should return currency as cents when value is number', () => {
      const price = { value: '123.40', currencyType: 'USD' };

      expect(getCurrencyFromDollarsToCents(price)).to.equal(12340);
    });

    it('should return string when value is not number', () => {
      const mileage = { value: 'Unlimited', currencyType: 'USD' };

      expect(getCurrencyFromDollarsToCents(mileage)).to.equal('Unlimited');
    });
  });

  context('addCurrency', () => {
    let prices;

    beforeEach(() => {
      prices = [
        {
          amount: '10.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        {
          amount: '11.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        {
          amount: '12.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      ];
    });

    it('should return undefined if mixed currency types', () => {
      prices[1].currencyCode = 'ZZZ';
      expect(addCurrency(...prices)).to.be.undefined;
    });

    it('should return the sum of all prices', () => {
      expect(addCurrency(...prices)).to.be.deep.equal({
        amount: '33.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });

    it('should format values over 1000', () => {
      prices[1].amount = '1000';
      expect(addCurrency(...prices)).to.be.deep.equal({
        amount: '1,022.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });

    it('should return the sum of all prices and handle nulls', () => {
      const pricesWithNull = prices.concat(undefined);

      expect(addCurrency(...pricesWithNull)).to.be.deep.equal({
        amount: '33.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      });
    });
  });
});
