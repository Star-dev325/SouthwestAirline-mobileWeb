// @flow
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const flightReaccomConfirmationMktgSelector = createSelector(
  createMktgDataSelector('app.airChange.reaccomConfirmationPage.response.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.REACCOM_CONFIRMATION_PAGE
    },
    'otter',
    { page: ANALYTICS.REACCOM_CONFIRMATION_PAGE.page }
  ]
);
