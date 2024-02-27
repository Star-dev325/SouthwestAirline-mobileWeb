import { getViewTravelFundData } from 'src/travelFunds/analytics/helpers/mktgDataHelpers';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

describe('getViewTravelFundData', () => {
  const [travelFunds, luvVoucher, giftCard] = TravelFundsConstants.FUND_TYPES_FORMATTED;
  const mktgData = { mockMktgDataProp: 'mock mktg data prop' };

  it('should merge the mktgData properties passed from CHAPI along with setting the travelfund_lookup property to 1 when travelFund tab is selected', () => {
    const result = getViewTravelFundData(travelFunds, mktgData);
    const expectedResult = {
      data_pagedescription: 'travelfund_lookup',
      travelfund_lookup: '1',
      ...mktgData
    };

    expect(result).to.eql(expectedResult);
  });

  it('should set the luvvoucher_lookup to 1 when the luv voucher search tab is selected', () => {
    const result = getViewTravelFundData(luvVoucher, mktgData);
    const expectedResult = {
      data_pagedescription: 'travelfund_lookup',
      luvvoucher_lookup: '1'
    };

    expect(result).to.eql(expectedResult);
  });

  it('should set the giftcard_lookup to 1 when the gift card search tab is selected', () => {
    const result = getViewTravelFundData(giftCard, mktgData);
    const expectedResult = {
      data_pagedescription: 'travelfund_lookup',
      giftcard_lookup: '1'
    };

    expect(result).to.eql(expectedResult);
  });
});
