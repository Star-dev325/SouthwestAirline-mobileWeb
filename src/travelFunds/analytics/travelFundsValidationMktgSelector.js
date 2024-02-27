// @flow
import _ from 'lodash';

import { createSelector } from 'src/shared/helpers/createSelectorWithErrorReporter';
import { createMktgDataSelector } from 'src/shared/analytics/helpers/mktgHelper';

export const travelFundsValidationMktgSelector = createSelector(
  createMktgDataSelector('app.travelFunds.lookUpTravelFundsPage.validateFunds.mktg_data'),
  (mktgData) => [
    _.merge(
      {
        pagename: 'transfer-review',
        channel: 'swa',
        subchannel: 'travel-funds',
        form_start: '1',
        form_name: 'travel fund transfer'
      },
      mktgData
    ),
    'otter'
  ]
);
