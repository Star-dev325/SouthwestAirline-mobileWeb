// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const earlyBirdConfirmationMktgSelector = createSelector(
  createMktgDataSelector('app.earlyBird.confirmationPage.response.mktg_data'),
  (mktgData) => [mktgData]
);
