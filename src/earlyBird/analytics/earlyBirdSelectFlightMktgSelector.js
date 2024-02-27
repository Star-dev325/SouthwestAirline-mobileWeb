// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const earlyBirdSelectFlightMktgSelector = createSelector(
  createMktgDataSelector('app.earlyBird.detailPage.response.mktg_data'),
  (mktgData) => [mktgData]
);
