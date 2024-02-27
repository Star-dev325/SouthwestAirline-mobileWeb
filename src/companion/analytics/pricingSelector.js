import _ from 'lodash';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

const getPricingAmount = (state) => _.get(state, 'app.companion.flightPricingPage.totals.moneyTotal.amount');

export const getPricing = createSelector([getPricingAmount], (amount) => ({
  companion: {
    priceSearchTotals: {
      priceTotalAmountCents: amount
    }
  }
}));
