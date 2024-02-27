// @flow
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const youngTravelerPageMktgSelector = createSelector(createMktgDataSelector(''), (mktgData) => [
  {
    ...mktgData,
    ...ANALYTICS.YOUNG_TRAVELER_PAGE
  },
  'otter',
  { page: ANALYTICS.YOUNG_TRAVELER_PAGE.page }
]);
