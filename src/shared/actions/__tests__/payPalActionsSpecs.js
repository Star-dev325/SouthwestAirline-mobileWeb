import _ from 'lodash';
import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';

import createMockStore from 'test/unit/helpers/createMockStore';
import PayPalActionTypes from 'src/shared/actions/payPalActionTypes';
import StorageKeys from 'src/shared/helpers/storageKeys';

const sinon = sandbox.create();
const mockStock = createMockStore();

describe('PayPalActions', () => {
  let store;
  let PayPalActions;

  beforeEach(() => {
    store = mockStock({ app: {} });
  });

  afterEach(() => {
    sinon.restore();
  });

  context('gotoPayPalSignIn', () => {
    let createPayPalTokenStub;
    let wcmTransitionToStub;
    let options;
    let request;
    let mockSessionStorage;

    beforeEach(() => {
      options = {
        formData: {
          field: 'value'
        }
      };
      request = {
        tokenRequest: {
          totalFare: {
            value: '123.00',
            currencyCode: 'USD'
          },
          redirectURLs: {
            cancelURL: 'cancel.com',
            returnURL: 'return.com'
          }
        }
      };

      mockSessionStorage = sinon.stub();
      mockSessionStorage.remove = sinon.stub();

      createPayPalTokenStub = sinon.stub();
      wcmTransitionToStub = sinon.stub();
      PayPalActions = proxyquire('src/shared/actions/payPalActions', {
        store2: {
          session: mockSessionStorage
        },
        'src/shared/helpers/wcmTransitionHelper': { default: wcmTransitionToStub },
        'src/shared/api/payPalApi': {
          createPayPalToken: createPayPalTokenStub
        },
        'src/shared/bootstrap/urls': {
          default: {
            paypalUrl: 'somewhere.com'
          }
        }
      });
    });

    it('should save resume data to session storage, pass isLoggedIn, create PayPal token and transition to PayPal sign in page when action is called', () => {
      const state = { app: 'app' };
      const createResponse = {
        merchantToken: {
          token: 'EC-123'
        }
      };

      createPayPalTokenStub.resolves(createResponse);
      _.set(window, 'data_a.stores', { airBookingStore: 'analyticsStore' });

      return store.dispatch(PayPalActions.gotoPayPalSignIn(request, state, options, true)).then(() => {
        const expectResumeDate = {
          state: { app: 'app' },
          options: {
            ...options
          },
          analytics: {
            stores: { airBookingStore: 'analyticsStore' }
          }
        };

        expect(mockSessionStorage.remove).to.have.been.called;
        expect(mockSessionStorage).to.have.been.calledWith(StorageKeys.PAYPAL_DATA_KEY, expectResumeDate);
        expect(createPayPalTokenStub).to.have.been.calledWith(request.tokenRequest, true);
        expect(wcmTransitionToStub).to.have.been.calledWith({
          linkType: 'webview',
          target: 'somewhere.com?token=EC-123'
        });
      });
    });

    it('should call createPaypalTokenFailed when call to CHAPI createPayPalToken fails', () => {
      const error = {
        responseJSON: {
          code: 400511157
        }
      };

      createPayPalTokenStub.rejects(error);

      return store.dispatch(PayPalActions.gotoPayPalSignIn(request, options)).then(() => {
        const actions = store.getActions();

        expect(mockSessionStorage.remove).to.have.been.called;
        expect(actions[1]).to.be.deep.equal({
          type: 'PAYPAL__CREATE_PAYPAL_TOKEN_FAILED',
          error,
          isFetching: false
        });
      });
    });
  });

  context('resumeAppState', () => {
    it('should create correct action request for resume', () => {
      const expectedAction = {
        type: PayPalActionTypes.PAYPAL__RESUME_APP_STATE,
        payload: {
          state: {
            app: {
              accountNumber: '601005646',
              isLoggedIn: true
            }
          }
        }
      };

      expect(store.dispatch(PayPalActions.resumeAppState(expectedAction.payload.state))).to.deep.equal(expectedAction);
    });
  });
});
