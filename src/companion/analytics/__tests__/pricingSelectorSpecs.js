import { getPricing as pricingSelector } from 'src/companion/analytics/pricingSelector';

describe('pricingSelector', () => {
  it('should populate total price for add companion on pricing page', () => {
    const state = {
      app: {
        companion: {
          flightPricingPage: {
            totals: {
              moneyTotal: {
                amount: '5.60',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          }
        }
      }
    };

    const pricing = pricingSelector(state);

    expect(pricing.companion.priceSearchTotals.priceTotalAmountCents).to.equal('5.60');
  });
});
