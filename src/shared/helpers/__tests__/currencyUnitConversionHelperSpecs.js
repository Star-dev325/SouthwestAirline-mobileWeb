import { dollarsFromCents, centsFromDollars } from 'src/shared/helpers/currencyUnitConversionHelper';

describe('CurrencyUnitConversionHelper', () => {
  context('cents to dollars', () => {
    it('return one dollar when user passes in 100 cents', () => {
      const dollars = dollarsFromCents(100);

      expect(dollars).to.equal(1);
    });
  });

  context('dollars to cents', () => {
    it('return 100 cents when user passes in 1 dollar', () => {
      const cents = centsFromDollars(1);

      expect(cents).to.equal(100);
    });
  });
});
