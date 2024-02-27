import analyticsReducer from 'src/shared/analytics/reducers/analyticsReducer';
import AnalyticsActionTypes from 'src/shared/analytics/actions/analyticsActionTypes';

describe('analyticsReducer', () => {
  it('should contain airBooking sortBy node', () => {
    const action = {
      type: '@@Init'
    };

    const newState = analyticsReducer(undefined, action);

    expect(newState.AirBookingStore.sortBy).to.deep.equal({
      outbound: 'departureTime',
      inbound: 'departureTime'
    });
  });
  it('should contain specialAssistance selectionMade node', () => {
    const action = {
      type: '@@Init',
      selected: false
    };

    const newState = analyticsReducer(undefined, action);

    expect(newState.SpecialAssistanceStore.selectionMade).to.equal(false);
  });
  it('should contain TravelFunds lastSearchedFund node', () => {
    const action = {
      type: AnalyticsActionTypes.SAVE_LAST_SEARCHED_FUND,
      lastSearchedFund: {
        fundType: 'luv-voucher',
        fundData: {
          voucherNumber: '1234567890',
          securityCode: '1234'
        }
      }
    };

    const newState = analyticsReducer(undefined, action);

    expect(newState.TravelFundsStore.lastSearchedFund).to.deep.equal({
      fundType: 'luv-voucher',
      fundData: {
        voucherNumber: '1234567890',
        securityCode: '1234'
      }
    });
  });
});
