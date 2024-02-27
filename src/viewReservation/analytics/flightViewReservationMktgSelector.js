// @flow
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { ANALYTICS } from 'src/viewReservation/constants/viewReservationConstants';

export const flightViewReservationMktgSelector = createSelector(
  [createMktgDataSelector('app.viewReservation.flightReservation.mktg_data')],
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.VIEW_RESERVATION_DETAILS_PAGE
    },
    'otter',
    { page: ANALYTICS.VIEW_RESERVATION_DETAILS_PAGE.page }
  ]
);
