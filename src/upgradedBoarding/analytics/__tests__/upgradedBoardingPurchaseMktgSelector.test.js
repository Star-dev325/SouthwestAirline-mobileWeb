import _ from 'lodash';
import { upgradedBoardingPurchaseMktgSelector } from 'src/upgradedBoarding/analytics/upgradedBoardingPurchaseMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('upgradedBoardingPurchaseMktgSelector', () => {
  it('should merge mktg_data properties from CHAPI with hard coded analytics properties', () => {
    const mockMktgDataFromCHAPI = {
      test_mktg_data: 'mock data'
    };
    const mockState = _.set(
      {},
      'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingResponse.upgradedBoardingSelectPage.mktg_data',
      mockMktgDataFromCHAPI
    );
    const satelliteTrack = 'otter';
    const expectedResult = [{
      page_name: 'index',
      page_channel: 'upgraded-boarding',
      page_subchannel: 'purchase',
      formstart: '1',
      formname: 'upgradeboarding',
      productview: '1',
      product: 'ub',
      ...mockMktgDataFromCHAPI,
      ...globalMktgState
    },
    satelliteTrack
    ];
    const result = upgradedBoardingPurchaseMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });
});
