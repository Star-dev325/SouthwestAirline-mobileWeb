// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const sameDayCancelConfirmationPageMktgSelector = createSelector(
  createMktgDataSelector('app.sameDay.sameDayShoppingPage.sameDayShoppingInformation.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.CANCEL_STANDBY_CONFIRMATION_PAGE
    },
    'otter',
    { page: ANALYTICS.CANCEL_STANDBY_CONFIRMATION_PAGE.page }
  ]
);
