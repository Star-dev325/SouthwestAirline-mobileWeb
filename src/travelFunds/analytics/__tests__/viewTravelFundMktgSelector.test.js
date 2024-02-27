import _ from 'lodash';

import { viewTravelFundMktgSelector } from 'src/travelFunds/analytics/viewTravelFundMktgSelector';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('viewTravelFundMktgSelector', () => {
  const [travelFunds, luvVoucher, giftCard] = TravelFundsConstants.FUND_TYPES_FORMATTED;
  const mockMktgDataFromCHAPI = { availablefortransfer: 'mock value' };
  const data_pagedescription = 'travelfund_lookup';
  const satelliteTrack = 'squid';
  const getState = (selectedTab) =>
    _.chain({})
      .set('app.travelFunds.lookUpTravelFundsPage.viewTravelFund.mktg_data', mockMktgDataFromCHAPI)
      .set('app.travelFunds.lookUpTravelFundsPage.currentlySelectedTab', selectedTab)
      .value();

  it('should merge mktg_data properties from chapi with values to indicate a travel fund search', () => {
    const mockState = getState(travelFunds);
    const expectedResult = [{
      data_pagedescription,
      travelfund_lookup: '1',
      ...mockMktgDataFromCHAPI,
      ...globalMktgState
    }, satelliteTrack];
    const result = viewTravelFundMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should contain values to indicate a luv voucher search', () => {
    const mockState = getState(luvVoucher);
    const expectedResult = [
      {
        data_pagedescription,
        luvvoucher_lookup: '1'
      },
      satelliteTrack
    ];
    const result = viewTravelFundMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should contain values to indicate a gift card search', () => {
    const mockState = getState(giftCard);
    const expectedResult = [
      {
        data_pagedescription,
        giftcard_lookup: '1'
      },
      satelliteTrack
    ];
    const result = viewTravelFundMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });
});
