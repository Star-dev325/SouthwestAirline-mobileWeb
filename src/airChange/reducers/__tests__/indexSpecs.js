import airChangeReducers from 'src/airChange/reducers';
import airChangeActionTypes from 'src/airChange/actions/airChangeActionTypes';

const { AIR_CHANGE__RESET_FLOW_DATA } = airChangeActionTypes;

describe('airChangeReducer', () => {
  it('should reset airChange flow data when trigger reset airChange flow data action', () => {
    const updatedState = airChangeReducers(undefined, {
      type: AIR_CHANGE__RESET_FLOW_DATA
    });

    expect(updatedState).to.deep.equal({
      changeFlightPage: {
        response: {},
        pnr: null
      },
      paymentInfo: {},
      reaccomFlightPage: {
        response: {},
        pnr: null
      },
      reaccomShoppingPage: {
        reaccomCoTerminalProducts: {},
        response: {},
        selectedProducts: {},
        sortBy: {
          inbound: 'departureTime',
          outbound: 'departureTime'
        }
      },
      reaccomConfirmationPage: {
        response: {}
      },
      selectedBounds: {},
      changeShoppingPage: {
        response: {},
        sortBy: {
          inbound: 'departureTime',
          outbound: 'departureTime'
        },
        searchRequest: {},
        selectedProducts: {}
      },
      selectFarePage: {
        selectedFlight: {}
      },
      changePricingPage: {
        response: {},
        resumeAfterLogin: false
      },
      fundsAppliedToken: null,
      changeConfirmationPage: {
        response: {}
      },
      contactMethodInfo: {},
      accountInfo: {},
      shouldForbidForward: false,
      applyTravelFundsPage: {
        currentlySelectedTab: 'travel-funds',
        response: {}
      }
    });
  });
});
