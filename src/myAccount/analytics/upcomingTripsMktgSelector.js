import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const upcomingTripsMktgSelector = createSelector(
  createMktgDataSelector('app.upcomingTrips.mktg_data'),
  (mktgData) => [{ ...mktgData }]
);
