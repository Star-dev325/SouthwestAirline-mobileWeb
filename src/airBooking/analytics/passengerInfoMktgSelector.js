import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const passengerInfoMktgSelector = createSelector(
  createMktgDataSelector('app.airBooking.accountInfo.mktg_data'),
  (mktgData) => [ mktgData ]
);