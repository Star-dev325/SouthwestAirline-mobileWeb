// @flow
import { ANALYTICS } from 'src/sameDay/constants/sameDayConstants.js';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const sameDayConfirmationPageMktgSelector = createSelector(
  createMktgDataSelector('app.sameDay.sameDayConfirmationPage.response.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.CONFIRMATION_PAGE
    },
    'otter',
    { page: ANALYTICS.CONFIRMATION_PAGE.page }
  ]
);
