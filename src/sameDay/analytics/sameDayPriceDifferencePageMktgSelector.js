// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const sameDayPriceDifferencePageMktgSelector = createSelector(
  createMktgDataSelector('app.sameDay.sameDayPricingPage.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.PRICE_DIFFERENCE_PAGE
    },
    'otter',
    { page: ANALYTICS.PRICE_DIFFERENCE_PAGE.page }
  ]
);
