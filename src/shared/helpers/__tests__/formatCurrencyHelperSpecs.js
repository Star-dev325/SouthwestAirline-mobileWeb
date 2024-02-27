import { formatCurrency, formatCurrencyRounded } from 'src/shared/helpers/formatCurrencyHelper';

describe('formatCurrencyHelper', () => {
  it('should format price correct when price is Dollars', () => {
    const priceCents = 1250;
    const isDollars = true;

    const formattedString = formatCurrency(priceCents / 100, isDollars);

    expect(formattedString).to.equal('12.50');
  });

  it('should format price correct when price is points', () => {
    const pricePoints = 12450;
    const isDollars = false;

    const formattedString = formatCurrency(pricePoints, isDollars);

    expect(formattedString).to.equal('12,450');
  });

  it('should format price rounded when try rounded price', () => {
    const pricePoints = 12449.34524;

    const formattedString = formatCurrencyRounded(pricePoints);

    expect(formattedString).to.equal('12,450');
  });
});
