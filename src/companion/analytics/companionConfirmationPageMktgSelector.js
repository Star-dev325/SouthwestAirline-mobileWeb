// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const companionConfirmationPageMktgSelector = createSelector(
  createMktgDataSelector('app.companion.companionConfirmationPage.mktg_data'),
  (mktgData) => [mktgData]
);
