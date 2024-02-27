import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { ANALYTICS } from 'src/airBooking/constants/airBookingConstants';

export const selectedFrequentTravelerMktgSelector = createSelector(
  createMktgDataSelector('app.airBooking.accountInfo.mktg_data'),
  (frequentTravelerMktgData) => [
    {
      ...frequentTravelerMktgData,
      ...ANALYTICS.frequentTraveler,
      frequenttraveler_selected: '1'
    }
  ]
);
