import _ from 'lodash';

import { travelFundsConfirmationMktgSelector } from 'src/travelFunds/analytics/travelFundsConfirmationMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('travelFundsConfirmationMktgSelector', () => {
  it('should merge mktg_data properties from chapi with hard coded analytics properties pagename, channel, subchannel, form_name and form_complete', () => {
    const mockMktgDataFromCHAPI = {
      fund_transfervalue: 'mock data'
    };
    const mockState = _.set(
      {},
      'app.travelFunds.lookUpTravelFundsPage.transferTravelFundsConfirmation.mktg_data',
      mockMktgDataFromCHAPI
    );
    const satelliteTrack = 'otter';
    const expectedResult = [{
      pagename: 'transfer-confirmation',
      channel: 'swa',
      subchannel: 'travel-funds',
      form_complete: '1',
      form_name: 'travel fund transfer',
      ...mockMktgDataFromCHAPI,
      ...globalMktgState
    },
    satelliteTrack
    ];
    const result = travelFundsConfirmationMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });
});
