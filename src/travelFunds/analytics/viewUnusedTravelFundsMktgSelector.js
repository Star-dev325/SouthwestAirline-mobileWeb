// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const viewUnusedTravelFundsMktgSelector = createSelector(
  createMktgDataSelector('app.travelFunds.lookUpTravelFundsPage.viewTravelFund.mktg_data'),
  (mktgData) => [_.merge({}, mktgData)]
);
