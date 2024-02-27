import _ from 'lodash';
import TravelFundsConstants from 'src/travelFunds/constants/travelFundsConstants';

export const getViewTravelFundData = (selectedTab, mktgData) => {
  const [travelFunds, luvVoucher] = TravelFundsConstants.FUND_TYPES_FORMATTED;
  const shouldMergeMktgData = selectedTab === travelFunds;
  const calculatedProps = shouldMergeMktgData
    ? _.merge({ travelfund_lookup: '1' }, mktgData)
    : selectedTab === luvVoucher
      ? { luvvoucher_lookup: '1' }
      : { giftcard_lookup: '1' };

  return {
    data_pagedescription: 'travelfund_lookup',
    ...calculatedProps
  };
};
