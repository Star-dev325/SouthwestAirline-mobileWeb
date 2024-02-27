import airCancelReducers from 'src/airCancel/reducers';
import AirCancelActionTypes from 'src/airCancel/actions/airCancelActionTypes';

const { AIR_CANCEL__RESET_FLOW_DATA } = AirCancelActionTypes;

describe('airCancelReducer', () => {
  it('should reset the airCancel redux store when the Air Cancel flow begins', () => {
    const resetState = airCancelReducers(undefined, {
      type: AIR_CANCEL__RESET_FLOW_DATA
    });

    expect(resetState).to.be.deep.equal({
      cancelAnalytics: {
        data: null
      },
      cancelBoundPage: {
        response: null
      },
      cancelRefundQuotePage: {
        response: {}
      },
      cancelBoundConfirmationPage: {
        response: null
      }
    });
  });
});
