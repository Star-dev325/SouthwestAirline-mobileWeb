// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const travelFundsConfirmationMktgSelector = createSelector(
  createMktgDataSelector('app.travelFunds.lookUpTravelFundsPage.transferTravelFundsConfirmation.mktg_data'),
  (mktgData) => [
    _.merge(
      {
        pagename: 'transfer-confirmation',
        channel: 'swa',
        subchannel: 'travel-funds',
        form_complete: '1',
        form_name: 'travel fund transfer'
      },
      mktgData
    ),
    'otter'
  ]
);
