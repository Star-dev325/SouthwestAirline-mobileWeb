import _ from 'lodash';

import { travelFundsValidationMktgSelector } from 'src/travelFunds/analytics/travelFundsValidationMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('travelFundsValidationMktgSelector', () => {
  it('should merge mktg_data properties from chapi with hard coded analytics properties pagename, channel, subchannel, form_name and form_complete', () => {
    const mockMktgDataFromCHAPI = {
      fund_transferable: 'mock value',
      fund_partiallytransferable: 'mock value',
      fund_corporate: 'mock value',
      swabiz_cid: 'mock value',
      fund_expiration: 'mock value'
    };
    const mockState = _.set({}, 'app.travelFunds.lookUpTravelFundsPage.validateFunds.mktg_data', mockMktgDataFromCHAPI);
    const satelliteTrack = 'otter';
    const expectedResult = [{
      pagename: 'transfer-review',
      channel: 'swa',
      subchannel: 'travel-funds',
      form_start: '1',
      form_name: 'travel fund transfer',
      ...mockMktgDataFromCHAPI,
      ...globalMktgState
    },
    satelliteTrack
    ];
    const result = travelFundsValidationMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });
});
