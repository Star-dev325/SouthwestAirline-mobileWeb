// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const companionPricingPageMktgSelector = createSelector(
  createMktgDataSelector('app.companion.flightPricingPage.mktg_data'),
  (mktgData) => [mktgData]
);
