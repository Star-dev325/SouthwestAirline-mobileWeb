// @flow
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const flightReaccomSelectFlightMktgSelector = createSelector(
  [createMktgDataSelector('app.airChange.reaccomFlightPage.response.mktg_data')],
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.REACCOM_SELECT_FLIGHT_PAGE
    },
    'otter',
    { page: ANALYTICS.REACCOM_SELECT_FLIGHT_PAGE.page }
  ]
);
