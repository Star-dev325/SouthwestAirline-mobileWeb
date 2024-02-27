// @flow
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';

export const purchaseSummaryMktgSelector = createSelector(
  createMktgDataSelector('app.airBooking.purchaseSummaryPage.earlyBirdEligibility.mktg_data'),
  (mktgData) => [{ ...mktgData }]
);
