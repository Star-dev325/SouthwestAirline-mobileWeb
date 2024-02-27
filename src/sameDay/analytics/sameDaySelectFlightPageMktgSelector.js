// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const sameDaySelectFlightPageMktgSelector = createSelector(
  createMktgDataSelector('app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.SHOPPING_PAGE
    },
    'otter',
    { page: ANALYTICS.SHOPPING_PAGE.page }
  ]
);
