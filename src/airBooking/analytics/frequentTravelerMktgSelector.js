import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

export const frequentTravelerMktgSelector = createSelector(
  createMktgDataSelector('app.airBooking.accountInfo.mktg_data'),
  (mktgData) => [
    {
      ...mktgData,
      ...ANALYTICS.frequentTraveler
    }
  ]
);
