import Q from 'q';
import { sandbox } from 'sinon';
import createMockStore from 'test/unit/helpers/createMockStore';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import * as ApplyTravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';

const sinon = sandbox.create();
const mockStore = createMockStore();

const {
  SHARED__CALC_FUNDS,
  SHARED__CALC_FUNDS_SUCCESS,
  SHARED__CALC_FUNDS_FAILED,
  SHARED__REMOVE_TRAVEL_FUND,
  SHARED__REMOVE_TRAVEL_FUND_SUCCESS,
  SHARED__REMOVE_TRAVEL_FUND_FAILED,
  SHARED__RESET_CALCULATE_FLOW_DATA,
  SHARED__REFRESH_TRAVEL_FUNDS,
  SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS,
  SHARED__REFRESH_TRAVEL_FUNDS_FAILED
} = SharedActionTypes;

describe('Calculate Funds Actions', () => {
  let calcRequest, passengers, refreshRequest, removeRequest, store;

  beforeEach(() => {
    store = mockStore({});
    passengers = {
      passengerReference: '1',
      passengerType: 'ADULT',
      name: {
        firstName: 'Fred',
        lastName: 'Flintstone'
      }
    };

    calcRequest = {
      travelFundIdentifier: 'fund1',
      securityCode: '1234',
      passengers
    };

    removeRequest = {
      removeTravelFundId: 'fund1',
      passengers
    };

    refreshRequest = {
      passengers,
      fundsAppliedToken: 'funds-token',
      itineraryPricingToken: 'itinerary-token'
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('resetCalculateFlowData', () => {
    expect(ApplyTravelFundsActions.resetCalculateFlowData()).to.deep.equal({
      type: SHARED__RESET_CALCULATE_FLOW_DATA
    });
  });

  context('calc travel funds', () => {
    it('should trigger success action when calcTravelFunds api completes successfully', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.resolve('response'));
      const clearFormDataByIdStub = { type: 'CLEAR_FORM_DATA_BY_ID' };

      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(ApplyTravelFundsActions.calculateFunds(calcRequest)).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__CALC_FUNDS,
            request: calcRequest,
            isFetching: true
          },
          {
            type: SHARED__CALC_FUNDS_SUCCESS,
            response: 'response',
            isFetching: false
          },
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          clearFormDataByIdStub
        ]);
      });
    });

    it('should trigger success action when calcTravelFunds api completes successfully with termsAndConditions', () => {
      const mockRequest = {
        body: {
          cashPointsPage: true
        },
        ...calcRequest
      };
      const mockResponse = {
        termsAndConditions: 'test'
      };

      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.resolve(mockResponse));
      const clearFormDataByIdStub = { type: 'CLEAR_FORM_DATA_BY_ID' };

      sinon.stub(FormDataActions, 'clearFormDataById').returns(clearFormDataByIdStub);

      return store.dispatch(ApplyTravelFundsActions.calculateFunds(mockRequest)).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: 'SHARED__CALC_FUNDS',
            request: {
              body: { cashPointsPage: true },
              travelFundIdentifier: 'fund1',
              securityCode: '1234',
              passengers
            },
            isFetching: true
          },
          { type: 'SHARED__CALC_FUNDS_SUCCESS', response: { termsAndConditions: 'test' }, isFetching: false },
          { type: 'AIR_BOOKING__SAVE_SPLIT_PAY_TERMS_AND_CONDITIONS', termsAndConditions: 'test' },
          clearFormDataByIdStub,
          clearFormDataByIdStub,
          clearFormDataByIdStub
        ]);
      });
    });

    it('should trigger failure action when calcTravelFunds api has an error', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.reject('error'));

      return store.dispatch(ApplyTravelFundsActions.calculateFunds(calcRequest)).catch(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__CALC_FUNDS,
            request: calcRequest,
            isFetching: true
          },
          {
            type: SHARED__CALC_FUNDS_FAILED,
            error: 'error',
            isFetching: false
          }
        ]);
      });
    });
  });

  context('remove travel fund', () => {
    it('should trigger success action when calculateFunds api completes successfully', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').resolves('response');

      return store.dispatch(ApplyTravelFundsActions.removeFund(removeRequest)).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__REMOVE_TRAVEL_FUND,
            request: removeRequest,
            isFetching: true
          },
          {
            type: SHARED__REMOVE_TRAVEL_FUND_SUCCESS,
            response: 'response',
            isFetching: false
          }
        ]);
      });
    });

    it('should trigger success action when calculateFunds api completes successfully with terms and conditions', () => {
      const mockRequest = {
        body: {
          cashPointsPage: true
        },
        ...removeRequest
      };
      const mockResponse = {
        termsAndConditions: 'test'
      };

      sinon.stub(FlightBookingApi, 'calculateFunds').resolves(mockResponse);

      return store.dispatch(ApplyTravelFundsActions.removeFund(mockRequest)).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: 'SHARED__REMOVE_TRAVEL_FUND',
            request: {
              body: { cashPointsPage: true },
              removeTravelFundId: 'fund1',
              passengers: {
                passengerReference: '1',
                passengerType: 'ADULT',
                name: { firstName: 'Fred', lastName: 'Flintstone' }
              }
            },
            isFetching: true
          },
          { type: 'SHARED__REMOVE_TRAVEL_FUND_SUCCESS', response: { termsAndConditions: 'test' }, isFetching: false },
          { type: 'AIR_BOOKING__SAVE_SPLIT_PAY_TERMS_AND_CONDITIONS', termsAndConditions: 'test' }
        ]);
      });
    });

    it('should trigger failure action when calculateFunds api has an error', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.reject('error'));

      return store.dispatch(ApplyTravelFundsActions.removeFund(removeRequest)).catch(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__REMOVE_TRAVEL_FUND,
            request: removeRequest,
            isFetching: true
          },
          {
            type: SHARED__REMOVE_TRAVEL_FUND_FAILED,
            error: 'error',
            isFetching: false
          }
        ]);
      });
    });
  });

  context('refresh travel funds', () => {
    it('should trigger success action when calculateFunds api completes successfully', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').resolves('response');

      return store.dispatch(ApplyTravelFundsActions.refreshFunds(refreshRequest)).then(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__REFRESH_TRAVEL_FUNDS,
            request: refreshRequest,
            isFetching: true
          },
          {
            type: SHARED__REFRESH_TRAVEL_FUNDS_SUCCESS,
            response: 'response',
            isFetching: false
          }
        ]);
      });
    });

    it('should trigger failure action when calculateFunds api has an error', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.reject('error'));

      return store.dispatch(ApplyTravelFundsActions.removeFund(refreshRequest, true)).catch(() => {
        expect(store.getActions()).to.deep.equal([
          {
            type: SHARED__REFRESH_TRAVEL_FUNDS,
            request: refreshRequest,
            isFetching: true
          },
          {
            type: SHARED__REFRESH_TRAVEL_FUNDS_FAILED,
            error: 'error',
            isFetching: false
          }
        ]);
      });
    });
  });

  context('Token expired error code 400310756', () => {
    it('calcFunds failed should open custom popup when error code 400310756', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.reject({ responseJSON: { code: 400310756 } }));

      return store.dispatch(ApplyTravelFundsActions.calculateFunds(calcRequest)).then(() => {
        expect(store.getActions()[2]).to.contains({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });
    });

    it('removeFund failed should open custom popup when error code 400310756', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.reject({ responseJSON: { code: 400310756 } }));

      return store.dispatch(ApplyTravelFundsActions.removeFund(removeRequest)).then(() => {
        expect(store.getActions()[2]).to.contains({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });
    });

    it('refreshFund failed should open custom popup when error code 400310756', () => {
      sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.reject({ responseJSON: { code: 400310756 } }));

      return store.dispatch(ApplyTravelFundsActions.refreshFunds(refreshRequest)).then(() => {
        expect(store.getActions()[2]).to.contains({
          isShowDialog: true,
          type: 'TOGGLE_DIALOG'
        });
      });
    });

    context('when popup is closed in a web view', () => {
      let exitWebViewStub;
      let mockedStore;

      beforeEach(() => {
        exitWebViewStub = sinon.stub(WebViewActions, 'exitWebView').returns({ type: 'action' });
        mockedStore = mockStore({
          app: {
            webView: {
              isWebView: true
            }
          }
        });
        sinon.stub(DialogActions, 'hideDialog').callsFake(() => () => ({
          then: (resolve) => {
            resolve();
          }
        }));
        sinon.stub(FlightBookingApi, 'calculateFunds').returns(Q.reject({ responseJSON: { code: 400310756 } }));
      });

      it('calcFunds should exit webView', () =>
        mockedStore.dispatch(ApplyTravelFundsActions.calculateFunds(calcRequest, '/air/booking/shopping')).then(() => {
          const actions = mockedStore.getActions();
          const errorHandler = actions[2].options.buttons[0].onClick;

          errorHandler();
          expect(exitWebViewStub).to.have.been.called;
        }));

      it('removeFund should exit webView', () =>
        mockedStore.dispatch(ApplyTravelFundsActions.removeFund(removeRequest, '/air/booking/shopping')).then(() => {
          const actions = mockedStore.getActions();
          const errorHandler = actions[2].options.buttons[0].onClick;

          errorHandler();
          expect(exitWebViewStub).to.have.been.called;
        }));

      it('refreshFunds should exit webView', () =>
        mockedStore.dispatch(ApplyTravelFundsActions.refreshFunds(refreshRequest, '/air/booking/shopping')).then(() => {
          const actions = mockedStore.getActions();
          const errorHandler = actions[2].options.buttons[0].onClick;

          errorHandler();
          expect(exitWebViewStub).to.have.been.called;
        }));
    });
  });
});
