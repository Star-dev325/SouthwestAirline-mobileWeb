import _ from 'lodash';
import sinonModule from 'sinon';
import proxyquire from 'proxyquire';

const sinon = sinonModule.sandbox.create();

describe('analyticsMiddleware', () => {
  let mockWindow;
  let generateUpdatedStoresForAnalyticsStub;
  let analyticsMiddleware;
  let fireAnalyticsEventStub;
  let mockHistory;
  let sendToDataLayerStub;

  beforeEach(() => {
    mockWindow = {};
    generateUpdatedStoresForAnalyticsStub = sinon.stub();
    fireAnalyticsEventStub = sinon.stub();
    sendToDataLayerStub = sinon.stub();
    mockHistory = {
      location: {
        pathname: '/path',
        search: ''
      },
      replace: sinon.stub()
    };
    analyticsMiddleware = proxyquire('src/shared/redux/middlewares/analyticsMiddleware', {
      'src/shared/helpers/browserObject': {
        default: { window: mockWindow }
      },
      'src/shared/analytics/helpers/analyticsHelper': {
        generateUpdatedStoresForAnalytics: generateUpdatedStoresForAnalyticsStub
      },
      'src/airBooking/analytics/index': {
        analyticsActionsForAirBooking: ['TYPE FOR ANALYTICS'],
        dataLayerSelectorsForAirBooking: {
          'TYPE FOR MKTG DATA LAYER': () => ['mock mktg_data', 'mock satellite track']
        }
      },
      'src/companion/analytics/index': {
        analyticsActionsForCompanionBooking: ['TYPE FOR COMPANION ANALYTICS']
      },
      'src/shared/analytics/analyticsEvents': { fireAnalyticsEvents: () => fireAnalyticsEventStub },
      '@swa-ui/analytics': { sendToDataLayer: sendToDataLayerStub },
      'src/appHistory': { history: mockHistory },
      'src/viewReservation/analytics/index': {
        dataLayerSelectorsForViewReservation: {
          'TYPE FOR MKTG DATA LAYER': () => ['mock mktg_data', 'mock satellite track']
        }
      }
    }).default;
  });

  context('promo query analytics', () => {
    let action, next, store;

    beforeEach(() => {
      store = { getState: _.noop };
      next = _.noop;
    });

    it('should not update data on window when no promo query in URL', () => {
      action = {
        type: 'ANY_OTHER_ACTION',
        payload: {
          search: '?other=anything'
        }
      };

      analyticsMiddleware(store)(next)(action);

      expect(mockWindow).to.deep.equal({});
    });
  });

  context('set data to analytics store', () => {
    let action, analyticsStoreData, next, store;

    beforeEach(() => {
      store = { getState: _.noop };
      next = _.noop;
      action = { type: 'TYPE FOR ANALYTICS' };
      analyticsStoreData = {
        'AirBookingStore.search': 'air booking search data',
        'AirChangeStore.earlyBird': 'air change early bird data'
      };
      generateUpdatedStoresForAnalyticsStub.returns(analyticsStoreData);
    });

    it('should set data into window when action type is used for analytics', () => {
      analyticsMiddleware(store)(next)(action);

      expect(generateUpdatedStoresForAnalyticsStub).to.be.called;
      expect(mockWindow.data_a.stores).to.deep.equal({
        AirBookingStore: {
          search: 'air booking search data'
        },
        AirChangeStore: {
          earlyBird: 'air change early bird data'
        }
      });
    });

    it('should not set data into window when action type is not used for analytics', () => {
      analyticsMiddleware(store)(next)({ type: 'TYPE NOT FOR ANALYTICS' });

      expect(generateUpdatedStoresForAnalyticsStub).to.not.be.called;
      expect(mockWindow).to.be.empty;
    });

    context('dialog', () => {
      const store = {};

      beforeEach(() => {
        const state = {
          app: {
            dialog: {
              title: 'dialog Title'
            }
          }
        };

        store.getState = sinon.stub().returns(state);
      });

      it('should set data into ModalStore for api error when action type is TOGGLE_DIALOG', () => {
        analyticsMiddleware(store)(next)({
          type: 'TOGGLE_DIALOG',
          isShowDialog: true,
          options: {
            title: 'dialog Title',
            error: {
              responseJSON: {
                code: 400310589,
                message: 'message',
                requestId: 'mkddk90:mweb',
                httpStatusCode: '3008333'
              }
            }
          }
        });
        expect(mockWindow.data_a.stores).to.deep.equal({
          ModalStore: {
            code: '400310589',
            message: 'message',
            requestID: 'mkddk90:mweb',
            title: ''
          }
        });
      });

      it('should set data into ModalStore for customized api error when action type is TOGGLE_DIALOG', () => {
        analyticsMiddleware(store)(next)({
          type: 'TOGGLE_DIALOG',
          isShowDialog: true,
          options: {
            title: 'dialog Title',
            message: 'customized message',
            error: {
              responseJSON: {
                code: 400310589,
                message: 'message',
                requestId: 'mkddk90:mweb',
                httpStatusCode: '3008333'
              },
              $customized: true
            }
          }
        });
        expect(mockWindow.data_a.stores).to.deep.equal({
          ModalStore: {
            code: '400310589',
            message: 'customized message',
            requestID: 'mkddk90:mweb',
            title: 'dialog Title'
          }
        });
      });

      it('should set data into ModalStore for normal dialog when action type is TOGGLE_DIALOG', () => {
        analyticsMiddleware(store)(next)({
          type: 'TOGGLE_DIALOG',
          isShowDialog: true,
          options: {
            title: 'dialog Title'
          }
        });
        expect(mockWindow.data_a.stores).to.deep.equal({
          ModalStore: {
            code: '',
            requestID: '',
            message: '',
            title: 'dialog Title'
          }
        });
      });

      it('should reset data into ModalStore when action type is VIEW_MODAL', () => {
        analyticsMiddleware(store)(next)({ type: 'TOGGLE_DIALOG' });
        expect(mockWindow.data_a.stores).to.deep.equal({
          ModalStore: {
            code: '',
            message: '',
            requestID: '',
            title: ''
          }
        });
      });
    });
  });

  context('fire events', () => {
    it('should call fireAnalyticsEvent', () => {
      const store = { getState: _.noop };
      const next = _.noop;
      const action = { type: 'TYPE FOR ANALYTICS' };

      analyticsMiddleware(store)(next)(action);

      expect(fireAnalyticsEventStub).to.have.been.called;
    });
  });

  context('mktg data layer', () => {
    it('should fire sendToDataLayer', () => {
      const store = { getState: _.noop };
      const next = _.noop;
      const action = { type: 'TYPE FOR MKTG DATA LAYER' };

      analyticsMiddleware(store)(next)(action);

      expect(sendToDataLayerStub).to.be.calledWith('mock mktg_data', 'mock satellite track');
    });

    it('should not fire sendToDataLayer when an unrelated action is dispatched', () => {
      const store = { getState: _.noop };
      const next = _.noop;
      const action = { type: 'NOT TYPE FOR MKTG DATA LAYER' };

      analyticsMiddleware(store)(next)(action);

      expect(sendToDataLayerStub).to.not.be.called;
    });
  });
});
