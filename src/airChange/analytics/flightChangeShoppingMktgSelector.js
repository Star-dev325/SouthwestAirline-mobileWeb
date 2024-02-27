// @flow
import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const flightChangeShoppingMktgSelector = createSelector(
  createMktgDataSelector('app.airChange.changeShoppingPage.response.mktg_data'),
  (mktgData) => [mktgData]
);
