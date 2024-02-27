import _ from 'lodash';
import { upgradedBoardingConfirmationMktgSelector } from 'src/upgradedBoarding/analytics/upgradedBoardingConfirmationMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('upgradedBoardingConfirmationMktgSelector', () => {
  it('should merge mktg_data properties from CHAPI with hard coded analytics properties', () => {
    const mockMktgDataFromCHAPI = {
      test_mktg_data: 'mock data'
    };
    const mockState = _.set(
      {},
      'app.upgradedBoarding.upgradedBoardingPage.upgradedBoardingPurchaseResponse.upgradedBoardingConfirmationPage.mktg_data',
      mockMktgDataFromCHAPI
    );
    const satelliteTrack = 'otter';
    const expectedResult = [{
      page_name: 'index',
      page_channel: 'upgraded-boarding',
      page_subchannel: 'confirmation',
      formcomplete: '1',
      formname: 'upgradeboarding',
      purchase: '1',
      product: 'ub',
      ...mockMktgDataFromCHAPI,
      ...globalMktgState
    },
    satelliteTrack
    ];
    const result = upgradedBoardingConfirmationMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });
});
