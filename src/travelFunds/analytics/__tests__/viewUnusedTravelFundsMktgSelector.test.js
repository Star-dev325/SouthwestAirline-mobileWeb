import _ from 'lodash';

import { viewUnusedTravelFundsMktgSelector } from 'src/travelFunds/analytics/viewUnusedTravelFundsMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('viewUnusedTravelFundsMktgSelector', () => {
  it('should return an empty object for mktgData if "state.app.travelFunds.lookUpTravelFundsPage.viewTravelFund.mktg_data" does not exist', () => {
    const [mktgData] = viewUnusedTravelFundsMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockMktgData = {
      funds_availablefortransfer: 'mock value'
    };
    const state_data = _.set({}, 'app.travelFunds.lookUpTravelFundsPage.viewTravelFund.mktg_data', mockMktgData);
    const [mktgData] = viewUnusedTravelFundsMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockMktgData });
  });
});
