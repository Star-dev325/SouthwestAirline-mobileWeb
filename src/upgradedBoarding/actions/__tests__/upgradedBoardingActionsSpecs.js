import * as router from 'connected-react-router';
import { sandbox } from 'sinon';
import * as AdobeTargetActions from 'src/shared/actions/adobeTargetActions';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import * as AlternativeFormsOfPaymentActions from 'src/shared/actions/alternativeFormsOfPaymentActions';
import * as creditCardActions from 'src/shared/actions/creditCardActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import FormDataActionTypes from 'src/shared/actions/formDataActionTypes';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as LoggingApi from 'src/shared/api/loggingApi';
import * as UpgradedBoardingApi from 'src/shared/api/upgradedBoardingApi';
import AdobeTargetConstants from 'src/shared/constants/adobeTargetConstants';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { STATUS } from 'src/shared/constants/flowConstants';
import { UPGRADED_BOARDING_FORM } from 'src/shared/constants/formIds';
import BrowserObject from 'src/shared/helpers/browserObject';
import * as ErrorCodesHelper from 'src/shared/helpers/errorCodesHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import * as AlternativeFormsOfPaymentTransformer from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import upgradedBoardingActionTypes from 'src/upgradedBoarding/actions/upgradedBoardingActionTypes';
import * as UpgradedBoardingActions from 'src/upgradedBoarding/actions/upgradedBoardingActions';
import { upgradedBoardingOldRoutes, upgradedBoardingRoutes } from 'src/upgradedBoarding/constants/upgradedBoardingRoutes';
import * as WcmActions from 'src/wcm/actions/wcmActions';
import { UPGRADED_BOARDING_PAGE_ID, UPGRADED_BOARDING_PURCHASE_PAGE_ID } from 'src/wcm/constants/wcmConstants';
import createMockStore from 'test/unit/helpers/createMockStore';

const sinon = sandbox.create();
const mockStore = createMockStore();

const {
  UPGRADED_BOARDING__CANCEL_RESERVATION_FAILED,
  UPGRADED_BOARDING__CANCEL_RESERVATION_SUCCESS,
  UPGRADED_BOARDING__CANCEL_RESERVATION,
  UPGRADED_BOARDING__FETCH_PURCHASE_FAILED,
  UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_FAILED,
  UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
  UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS,
  UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS,
  UPGRADED_BOARDING__FETCH_PURCHASE,
  UPGRADED_BOARDING__FETCH_RESERVATION_FAILED,
  UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS,
  UPGRADED_BOARDING__FETCH_RESERVATION,
  UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_FAILED,
  UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_SUCCESS,
  UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS,
  UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__RESET_PAYMENT_INFO,
  UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA,
  UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP,
  UPGRADED_BOARDING__SAVE_MONEY_TOTAL,
  UPGRADED_BOARDING__SAVE_PAYMENT_INFO
} = upgradedBoardingActionTypes;

describe('UpgradedBoardingActions', () => {
  let clearFlowStatusStub;
  let creditCardResetSaveCreditCardsStub;
  let initiateVoidTransactionStub;
  let resetAlternativeFormsOfPaymentStub;
  let sendErrorLogStub;
  let setFlowStatusStub;
  let store;
  let toChapiAfpErrorLogStub;

  const paymentInfo = { selectedCardId: 'SELECTED_CARD_ID' };
  const setFlowStatusFakeActionType = { type: 'SET_FLOW_STATUS_FAKE_TYPE' };
  const clearFlowStatusFakeActionType = { type: 'CLEAR_FLOW_STATUS_FAKE_TYPE' };
  const resetAlternativeFormsOfPaymentFakeActionType = {
    type: 'ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY_FAKE_TYPE'
  };
  const alternativeFormsOfPaymentFailedFakeActionType = {
    type: 'ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED_FAKE_TYPE'
  };
  const creditCardResetSaveCreditCardsFakeActionType = { type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS_FAKE_TYPE' };

  beforeEach(() => {
    store = mockStore({});
    setFlowStatusStub = sinon.stub(FlowStatusActions, 'setFlowStatus').returns(setFlowStatusFakeActionType);
    clearFlowStatusStub = sinon.stub(FlowStatusActions, 'clearFlowStatus').returns(clearFlowStatusFakeActionType);
    resetAlternativeFormsOfPaymentStub = sinon
      .stub(AlternativeFormsOfPaymentActions, 'resetAlternativeFormsOfPayment')
      .returns(resetAlternativeFormsOfPaymentFakeActionType);
    initiateVoidTransactionStub = sinon
      .stub(AlternativeFormsOfPaymentActions, 'initiateVoidTransaction')
      .returns(alternativeFormsOfPaymentFailedFakeActionType);
    sendErrorLogStub = sinon.stub(LoggingApi, 'sendErrorLog');
    toChapiAfpErrorLogStub = sinon.stub(AlternativeFormsOfPaymentTransformer, 'toChapiAfpErrorLog');
    creditCardResetSaveCreditCardsStub = sinon
      .stub(creditCardActions, 'resetSavedCreditCards')
      .returns(creditCardResetSaveCreditCardsFakeActionType);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('loadUpgradedBoardingPagePlacements', () => {
    let getPlacementsStub;

    beforeEach(() => {
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements');
    });

    it('should trigger fetchUpgradedBoardingPagePlacementsSuccess when getPlacements succeeds', async () => {
      getPlacementsStub.returns(() => Promise.resolve('placements'));
      await store.dispatch(UpgradedBoardingActions.loadUpgradedBoardingPagePlacements());
      const actions = store.getActions();

      expect(getPlacementsStub).to.have.been.calledWith(UPGRADED_BOARDING_PAGE_ID);
      expect(actions).to.deep.equal([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS
        },
        {
          type: UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_SUCCESS,
          response: 'placements',
          isFetching: false
        }
      ]);
    });

    it('should trigger fetchUpgradedBoardingPagePlacementsFailed when getPlacements fails', async () => {
      getPlacementsStub.returns(() => Promise.reject('error'));
      await store.dispatch(UpgradedBoardingActions.loadUpgradedBoardingPagePlacements());
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS
        },
        {
          type: UPGRADED_BOARDING__FETCH_UPGRADED_BOARDING_PAGE_PLACEMENTS_FAILED,
          isFetching: false
        }
      ]);
    });
  });

  describe('loadPurchasePagePlacements', () => {
    let getPlacementsStub, getSegmentsStub;

    beforeEach(() => {
      getPlacementsStub = sinon.stub(WcmActions, 'getPlacements').returns(() => Promise.resolve('placements'));
      getSegmentsStub = sinon.stub(AdobeTargetActions, 'getSegments').returns(() => Promise.resolve('segments'));
    });

    it('should trigger fetchPurchasePagePlacementsSuccess when actions succeed', async () => {
      await store.dispatch(UpgradedBoardingActions.loadPurchasePagePlacements());
      const actions = store.getActions();

      expect(getSegmentsStub).to.have.been.calledWith([
        { mbox: AdobeTargetConstants.UPGRADED_BOARDING_PURCHASE_PROMO_TOP_01_MBOX_ID }
      ]);
      expect(getPlacementsStub).to.have.been.calledWith(UPGRADED_BOARDING_PURCHASE_PAGE_ID, [], 'segments');
      expect(actions).to.deep.equal([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS
        },
        {
          type: UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_SUCCESS,
          response: 'placements',
          isFetching: false
        }
      ]);
    });

    it('should trigger fetchUpgradedBoardingPagePlacementsFailed when getSegments fails', async () => {
      getSegmentsStub.returns(() => Promise.reject('error'));
      await store.dispatch(UpgradedBoardingActions.loadPurchasePagePlacements());
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS
        },
        {
          type: UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_FAILED,
          isFetching: false
        }
      ]);
    });

    it('should trigger fetchUpgradedBoardingPagePlacementsFailed when getPlacements fails', async () => {
      getPlacementsStub.returns(() => Promise.reject('error'));
      await store.dispatch(UpgradedBoardingActions.loadPurchasePagePlacements());
      const actions = store.getActions();

      expect(actions).to.deep.equal([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS
        },
        {
          type: UPGRADED_BOARDING__FETCH_PURCHASE_PAGE_PLACEMENTS_FAILED,
          isFetching: false
        }
      ]);
    });
  });

  describe('getUpgradedBoardingReservation', () => {
    const linkObj = {
      body: { passengerSearchToken: 'testToken' },
      href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
      labelText: 'Upgrade boarding position to A1 - A15',
      method: 'POST'
    };

    it('should fetchReservationSuccess and push to Upgraded Boarding purchase page when retrieve api success, when push route is false', async () => {
      sinon
        .stub(UpgradedBoardingApi, 'retrieveReservation')
        .resolves({ upgradedBoardingSelectPage: { upgradedBoardingSegment: ['FakeSegments'] } });
      await store.dispatch(UpgradedBoardingActions.getUpgradedBoardingReservation(linkObj, false));
      expect(setFlowStatusStub).to.have.been.calledWith('upgradedBoarding', STATUS.IN_PROGRESS);
      expect(resetAlternativeFormsOfPaymentStub).to.have.been.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
        },
        { type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS_FAKE_TYPE' },
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_RESERVATION
        },
        resetAlternativeFormsOfPaymentFakeActionType,
        {
          isFetching: false,
          response: { upgradedBoardingSelectPage: { upgradedBoardingSegment: ['FakeSegments'] } },
          type: UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS
        },
        setFlowStatusFakeActionType
      ]);
    });

    it('should fetchReservationSuccess and push to Upgraded Boarding purchase page when retrieve api success, when push route is true', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('upgraded-boarding');
      BrowserObject.location = { pathname: '/upgraded-boarding' };
      sinon
        .stub(UpgradedBoardingApi, 'retrieveReservation')
        .resolves({ upgradedBoardingSelectPage: { upgradedBoardingSegment: ['FakeSegments'] } });
      await store.dispatch(UpgradedBoardingActions.getUpgradedBoardingReservation(linkObj, true));
      expect(setFlowStatusStub).to.have.been.calledWith('upgradedBoarding', STATUS.IN_PROGRESS);
      expect(resetAlternativeFormsOfPaymentStub).to.have.been.called;
      expect(creditCardResetSaveCreditCardsStub).to.have.been.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
        },
        creditCardResetSaveCreditCardsFakeActionType,
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_RESERVATION
        },
        resetAlternativeFormsOfPaymentFakeActionType,
        {
          isFetching: false,
          response: { upgradedBoardingSelectPage: { upgradedBoardingSegment: ['FakeSegments'] } },
          type: UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS
        },
        setFlowStatusFakeActionType,
        {
          payload: {
            args: [upgradedBoardingOldRoutes['upgradedBoardingPurchase']],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should fetchReservationSuccess and push to Upgraded Boarding purchase page when retrieve api success, when push route is true and ENABLE_URL_NORMALIZATION is true', async () => {
      store = mockStore({
        app: {
          toggles: {
            ENABLE_URL_NORMALIZATION: true
          }
        }
      });

      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('upgraded-boarding');
      BrowserObject.location = { pathname: '/upgraded-boarding' };
      sinon
        .stub(UpgradedBoardingApi, 'retrieveReservation')
        .resolves({ upgradedBoardingSelectPage: { upgradedBoardingSegment: ['FakeSegments'] } });
      await store.dispatch(UpgradedBoardingActions.getUpgradedBoardingReservation(linkObj, true));
      expect(setFlowStatusStub).to.have.been.calledWith('upgradedBoarding', STATUS.IN_PROGRESS);
      expect(resetAlternativeFormsOfPaymentStub).to.have.been.called;
      expect(creditCardResetSaveCreditCardsStub).to.have.been.called;
      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
        },
        creditCardResetSaveCreditCardsFakeActionType,
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_RESERVATION
        },
        resetAlternativeFormsOfPaymentFakeActionType,
        {
          isFetching: false,
          response: { upgradedBoardingSelectPage: { upgradedBoardingSegment: ['FakeSegments'] } },
          type: UPGRADED_BOARDING__FETCH_RESERVATION_SUCCESS
        },
        setFlowStatusFakeActionType,
        {
          payload: {
            args: [upgradedBoardingRoutes['upgradedBoardingPurchase']],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should fetchReservationFailed and not push to Upgraded Boarding purchase page when retrieve api fail', async () => {
      sinon.stub(UpgradedBoardingApi, 'retrieveReservation').rejects({ errMsg: 'errMsg' });
      await store.dispatch(UpgradedBoardingActions.getUpgradedBoardingReservation(linkObj));

      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
        },
        creditCardResetSaveCreditCardsFakeActionType,
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_RESERVATION
        },
        resetAlternativeFormsOfPaymentFakeActionType,
        {
          isFetching: false,
          type: UPGRADED_BOARDING__FETCH_RESERVATION_FAILED,
          error: {
            errMsg: 'errMsg'
          }
        }
      ]);
    });

    it('should fetchReservationFailed and not push to Upgraded Boarding purchase page when retrieve api fail, when link obj is undefined', async () => {
      sinon.stub(UpgradedBoardingApi, 'retrieveReservation').rejects({ errMsg: 'errMsg' });
      await store.dispatch(UpgradedBoardingActions.getUpgradedBoardingReservation({}, false));

      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA
        },
        {
          type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS_FAKE_TYPE'
        },
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_RESERVATION
        },
        resetAlternativeFormsOfPaymentFakeActionType,
        {
          isFetching: false,
          type: UPGRADED_BOARDING__FETCH_RESERVATION_FAILED,
          error: {
            errMsg: 'errMsg'
          }
        }
      ]);
    });

    it('should fetchReservationFailed and not push to Upgraded Boarding purchase page when retrieve api fail, when isWebview true', async () => {
      sinon.stub(UpgradedBoardingApi, 'retrieveReservation').rejects({ errMsg: 'errMsg' });
      store = mockStore({ app: { webView: { isWebView: true } } });

      await store.dispatch(UpgradedBoardingActions.getUpgradedBoardingReservation(linkObj));
      expect(clearFlowStatusStub).to.have.been.calledWith('upgradedBoarding');
      expect(resetAlternativeFormsOfPaymentStub).to.have.been.called;

      const storeActions = store.getActions();

      expect(storeActions[0]).to.contain({
        type: 'UPGRADED_BOARDING__RESET_UPGRADED_BOARDING_FLOW_DATA'
      });
      expect(storeActions[1]).to.contain({
        type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS_FAKE_TYPE'
      });
      expect(storeActions[2]).to.contain({
        type: 'UPGRADED_BOARDING__FETCH_RESERVATION'
      });
      expect(storeActions[3]).to.contain({
        type: 'ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY_FAKE_TYPE'
      });
      expect(storeActions[4]).to.contain({
        type: 'UPGRADED_BOARDING__FETCH_RESERVATION_FAILED'
      });
      expect(storeActions[5]).to.contain({
        type: 'CLEAR_FLOW_STATUS_FAKE_TYPE'
      });
      expect(storeActions[6]).to.contain({
        type: 'TOGGLE_DIALOG'
      });
    });
  });

  describe('savePaymentInfo', () => {
    it('should dispatch UB save payment info action with payload', () => {
      store.dispatch(UpgradedBoardingActions.savePaymentInfo(paymentInfo));

      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__SAVE_PAYMENT_INFO,
          paymentInfo
        }
      ]);
    });
  });

  describe('savePaymentInfoAndBackToPreviousPage', () => {
    it('should save payment info go back to previous page', () => {
      store.dispatch(UpgradedBoardingActions.savePaymentInfoAndBackToPreviousPage(paymentInfo));

      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__SAVE_PAYMENT_INFO,
          paymentInfo
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: {
            method: 'goBack',
            args: []
          }
        },
        {
          type: FormDataActionTypes.UPDATE_FORM_FIELD_DATA_VALUE,
          formId: 'UPGRADED_BOARDING_PURCHASE_FORM',
          fieldName: 'securityCode',
          url: '/',
          value: ''
        }
      ]);
    });
  });

  describe('cancelUpgradedBoardingReservation', () => {
    let cancelReservationStub;

    beforeEach(() => {
      cancelReservationStub = sinon.stub(UpgradedBoardingApi, 'cancelReservation');
    });

    it('should dispatch cancelReservation and cancelReservationSuccess when retrieve api success', async () => {
      cancelReservationStub.resolves('response');
      const linkObject = {
        href: '/v1/mobile-air-operations/feature/upgraded-boarding/3NSCML',
        method: 'PUT',
        body: {
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0ghh',
          productReferenceToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0'
        }
      };

      await store.dispatch(UpgradedBoardingActions.cancelUpgradedBoardingReservation(linkObject));

      const actions = store.getActions();

      expect(clearFlowStatusStub).to.have.been.calledWith('upgradedBoarding');
      expect(actions).to.deep.eq([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__CANCEL_RESERVATION
        },
        clearFlowStatusFakeActionType,
        {
          isFetching: false,
          type: UPGRADED_BOARDING__CANCEL_RESERVATION_SUCCESS
        }
      ]);
    });

    it('should dispatch cancelReservation and cancelReservationFailed when retrieve api failed', async () => {
      cancelReservationStub.rejects('error');

      const linkObject = {
        href: '/v1/mobile-air-operations/feature/upgraded-boarding/3NSCML',
        method: 'PUT',
        body: {
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0ghh',
          productReferenceToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0'
        }
      };

      await store.dispatch(UpgradedBoardingActions.cancelUpgradedBoardingReservation(linkObject));

      const actions = store.getActions();

      expect(clearFlowStatusStub).to.have.been.calledWith('upgradedBoarding');
      expect(actions).to.deep.eq([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__CANCEL_RESERVATION
        },
        clearFlowStatusFakeActionType,
        {
          isFetching: false,
          type: UPGRADED_BOARDING__CANCEL_RESERVATION_FAILED
        }
      ]);
    });
  });

  describe('purchaseUpgradedBoarding', () => {
    const formData = { paymentInfo: { selectedCardId: 'test' } };
    const upgradedBoardingSegment = [
      { upgradedBoardingPrice: { currencyCode: 'testCode', currencySymbol: 'testSymbol' } }
    ];

    it('should fetchPurchaseSuccess and push to upgraded boarding confirmation page when retrieve api success', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('upgraded-boarding');
      BrowserObject.location = { pathname: '/upgraded-boarding' };
      sinon
        .stub(UpgradedBoardingApi, 'purchaseUpgradedBoarding')
        .resolves({ upgradedBoardingConfirmationPage: { upgradedBoardingRecords: ['FakeRecords'] } });

      await store.dispatch(UpgradedBoardingActions.purchaseUpgradedBoarding({ formData }, true));

      expect(setFlowStatusStub).to.have.been.calledWith('upgradedBoarding', STATUS.COMPLETED);
      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_PURCHASE
        },
        {
          isFetching: false,
          response: { upgradedBoardingConfirmationPage: { upgradedBoardingRecords: ['FakeRecords'] } },
          type: UPGRADED_BOARDING__FETCH_PURCHASE_SUCCESS
        },
        setFlowStatusFakeActionType,
        {
          payload: {
            args: ['/upgraded-boarding/confirmation'],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ]);
    });

    it('should fetchPurchaseFailed and not push to upgraded boarding confirmation page when retrieve api failed', async () => {
      sinon.stub(UpgradedBoardingApi, 'purchaseUpgradedBoarding').rejects({ errMsg: 'errMsg' });

      await store.dispatch(
        UpgradedBoardingActions.purchaseUpgradedBoarding({ formData, upgradedBoardingSegment }, false)
      );

      expect(store.getActions()).to.deep.equal([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__FETCH_PURCHASE
        },
        {
          isFetching: false,
          type: UPGRADED_BOARDING__FETCH_PURCHASE_FAILED,
          error: {
            errMsg: 'errMsg'
          }
        }
      ]);
    });

    describe('when error code in UPGRADED_BOARDING_RESTART_FLOW_ERRORS', () => {
      beforeEach(() => {
        sinon.stub(AppSelector, 'getCurrentAppFlow').returns('upgraded-boarding');
        sinon.stub(UpgradedBoardingApi, 'purchaseUpgradedBoarding').rejects({ errMsg: 'errMsg' });
        sinon.stub(ErrorCodesHelper, 'containsApiErrorCodes').returns(true);
        BrowserObject.location = { pathname: '/upgraded-boarding' };
      });

      it('should include errorHandler and call updateFormDataValue and push', () => {
        const mockUpdateFormDataValue = { type: 'MOCK_UPDATE_FORM_DATA_VALUE_TYPE' };
        const mockPushValue = { type: 'MOCK_PUSH_TYPE' };

        const updateFormDataValueStub = sinon
          .stub(FormDataActions, 'updateFormDataValue')
          .returns(mockUpdateFormDataValue);
        const pushStub = sinon.stub(router, 'push').returns(mockPushValue);

        store = mockStore({
          app: {
            upgradedBoarding: {
              upgradedBoardingPage: {
                upgradedBoardingResponse: {
                  upgradedBoardingSelectPage: {
                    recordLocator: 'recordLocator'
                  }
                }
              }
            }
          }
        });

        return store
          .dispatch(UpgradedBoardingActions.purchaseUpgradedBoarding({ formData, upgradedBoardingSegment }, false))
          .then(() => {
            const errorHandler = sinon.spy(store.getActions()[1].error, 'errorHandler');

            errorHandler();

            expect(updateFormDataValueStub).to.have.been.calledWith(UPGRADED_BOARDING_FORM, {
              recordLocator: 'recordLocator',
              firstName: '',
              lastName: ''
            });
            expect(pushStub).to.have.been.calledWith('/upgraded-boarding?clearFormData=false');

            expect(store.getActions()).to.deep.equal([
              {
                isFetching: true,
                type: UPGRADED_BOARDING__FETCH_PURCHASE
              },
              {
                isFetching: false,
                type: UPGRADED_BOARDING__FETCH_PURCHASE_FAILED,
                error: {
                  errMsg: 'errMsg',
                  errorHandler
                }
              },
              mockUpdateFormDataValue,
              mockPushValue
            ]);
          });
      });

      it('should include errorHandler and call exitWebView when in webView', () => {
        const mockExitWebViewType = { type: 'MOCK_EXIT_WEB_VIEW_TYPE' };
        const exitWebViewStub = sinon.stub(WebViewActions, 'exitWebView').returns(mockExitWebViewType);

        store = mockStore({ app: { webView: { isWebView: true } } });

        return store
          .dispatch(UpgradedBoardingActions.purchaseUpgradedBoarding({ formData, upgradedBoardingSegment }, false))
          .then(() => {
            const errorHandler = sinon.spy(store.getActions()[1].error, 'errorHandler');

            errorHandler();

            expect(exitWebViewStub).to.have.been.called;

            expect(store.getActions()).to.deep.equal([
              {
                isFetching: true,
                type: UPGRADED_BOARDING__FETCH_PURCHASE
              },
              {
                isFetching: false,
                type: UPGRADED_BOARDING__FETCH_PURCHASE_FAILED,
                error: {
                  errMsg: 'errMsg',
                  errorHandler
                }
              },
              mockExitWebViewType
            ]);
          });
      });
    });

    describe('isApplePay', () => {
      let applePayFormData;
      let isSessionTimeoutErrorStub;

      beforeEach(() => {
        isSessionTimeoutErrorStub = sinon.stub(ErrorCodesHelper, 'isSessionTimeoutError');
        applePayFormData = { ...formData, paymentInfo: { selectedCardId: 'APPLE_PAY_CARD_ID' } };
        toChapiAfpErrorLogStub.returns('logData');
        sinon.stub(UpgradedBoardingApi, 'purchaseUpgradedBoarding').rejects({ errMsg: 'errMsg' });
        initiateVoidTransactionStub.returns({ type: 'ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED' });
      });

      it('should fetchPurchaseFailed and not push to upgraded boarding confirmation page when retrieve api failed', async () => {
        isSessionTimeoutErrorStub.returns(false);

        await store.dispatch(
          UpgradedBoardingActions.purchaseUpgradedBoarding(
            { formData: applePayFormData, upgradedBoardingSegment },
            true
          )
        );

        expect(toChapiAfpErrorLogStub).to.have.been.calledWith({ errMsg: 'errMsg' }, PAYMENT_METHODS.APPLE_PAY);
        expect(sendErrorLogStub).to.have.been.calledWith('logData');
        expect(initiateVoidTransactionStub).to.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: UPGRADED_BOARDING__FETCH_PURCHASE
          },
          {
            type: "ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED"
          },
          {
            isFetching: false,
            type: UPGRADED_BOARDING__FETCH_PURCHASE_FAILED,
            error: {
              errMsg: 'errMsg'
            }
          }
        ]);
      });

      it('should call void transaction if purchase failed with applePayErrorCode and payment method is apple pay', async () => {
        store = mockStore({
          app: {
            toggles: {
              CEPTOR_VOID_API: true
            }
          }
        });

        isSessionTimeoutErrorStub.returns(false);

        await store.dispatch(
          UpgradedBoardingActions.purchaseUpgradedBoarding(
            { formData: applePayFormData, upgradedBoardingSegment },
            true
          )
        );

        expect(initiateVoidTransactionStub).to.have.been.called;
        const actions = store.getActions();

        expect(actions[1]).to.deep.equal({
          type: AlternativeFormsOfPaymentActionTypes.ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED
        });
      });

      it('should not dispatch alternativeFormsOfPaymentFailed if changePurchase failed with warm state and payment method is apple pay', async () => {
        store = mockStore({
          app: {
            toggles: {
              CEPTOR_VOID_API: true
            }
          }
        });
        isSessionTimeoutErrorStub.returns(true);

        await store.dispatch(
          UpgradedBoardingActions.purchaseUpgradedBoarding(
            { formData: applePayFormData, upgradedBoardingSegment },
            true
          )
        );

        expect(initiateVoidTransactionStub).to.not.have.been.called;
        expect(store.getActions()).to.deep.equal([
          {
            isFetching: true,
            type: UPGRADED_BOARDING__FETCH_PURCHASE
          },
          {
            isFetching: false,
            type: UPGRADED_BOARDING__FETCH_PURCHASE_FAILED,
            error: {
              errMsg: 'errMsg'
            }
          }
        ]);
      });
    });
  });

  describe('saveMoneyTotal', () => {
    it('should dispatch UB save money total action with payload', () => {
      const moneyTotal = {
        amount: '10',
        currencyCode: 'USD',
        currencySymbol: '$'
      };

      store.dispatch(UpgradedBoardingActions.saveMoneyTotal(moneyTotal));

      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__SAVE_MONEY_TOTAL,
          moneyTotal
        }
      ]);
    });
  });

  describe('resetUpgradedBoardingData', () => {
    it('should reset upgraded boarding data', () => {
      store.dispatch(UpgradedBoardingActions.resetUpgradedBoardingData());

      expect(store.getActions()).to.deep.equal([
        { type: UPGRADED_BOARDING__RESET_PAYMENT_INFO },
        { type: 'ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY_FAKE_TYPE' },
        { type: 'CREDIT_CARD__RESET_SAVED_CREDIT_CARDS_FAKE_TYPE' }
      ]);
    });
  });

  describe('handleCancelUpgradedBoarding', () => {
    let cancelReservationStub;

    beforeEach(() => {
      cancelReservationStub = sinon.stub(UpgradedBoardingApi, 'cancelReservation');
    });

    it('should not dispatch cancelUpgradedBoardingReservation, when cancel link is undefined', async () => {
      cancelReservationStub.resolves('response');
      store = mockStore({
        router: {
          location: {
            pathname: '/not-upgraded-boarding/purchase'
          }
        }
      });

      await store.dispatch(UpgradedBoardingActions.handleCancelUpgradedBoarding());
      expect(clearFlowStatusStub).to.have.not.been.called;
    });
    it('should return undefined, when pathname is not purchase page', async () => {
      cancelReservationStub.resolves('response');

      await store.dispatch(UpgradedBoardingActions.handleCancelUpgradedBoarding());
      expect(clearFlowStatusStub).to.have.not.been.called;
    });
    it('should return undefined, when pathname is / and user is coming from the Air Cancel flow', async () => {
      sinon.stub(AppSelector, 'getCurrentAppFlow').returns('air/cancel');
      
      store = mockStore({
        router: {
          location: {
            pathname: '/'
          }
        }
      });

      cancelReservationStub.resolves('response');

      await store.dispatch(UpgradedBoardingActions.handleCancelUpgradedBoarding());
      expect(clearFlowStatusStub).to.have.not.been.called;
    });
    it('should call cancelupgradedboarding', async () => {
      cancelReservationStub.resolves('response');
      const linkObject = {
        href: '/v1/mobile-air-operations/feature/upgraded-boarding/3NSCML',
        method: 'PUT',
        body: {
          passengerSearchToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0ghh',
          productReferenceToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0'
        }
      };

      store = mockStore({
        router: {
          location: {
            pathname: '/not-upgraded-boarding/purchase'
          }
        },
        app: {
          upgradedBoarding: {
            upgradedBoardingPage: {
              upgradedBoardingResponse: {
                upgradedBoardingSelectPage: {
                  _links: {
                    upgradedBoardingCancel: linkObject
                  }
                }
              }
            }
          }
        }
      });

      await store.dispatch(UpgradedBoardingActions.handleCancelUpgradedBoarding());
      expect(clearFlowStatusStub).to.have.been.called;
      expect(store.getActions()).to.deep.eq([
        {
          isFetching: true,
          type: UPGRADED_BOARDING__CANCEL_RESERVATION
        },
        clearFlowStatusFakeActionType,
        {
          isFetching: false,
          type: UPGRADED_BOARDING__CANCEL_RESERVATION_SUCCESS
        }
      ]);
    });
  });

  describe('upgradedBoardingCountdownTimeStamp', () => {
    it('should save countdown timestamp', () => {
      store.dispatch(UpgradedBoardingActions.saveCountdownTimeStamp("2023-01-08T03:01:18.325Z"));

      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__SAVE_COUNTDOWN_TIMESTAMP,
          timeStamp: "2023-01-08T03:01:18.325Z"
        }
      ]);
    });

    it('should reset countdown timestamp', () => {
      store.dispatch(UpgradedBoardingActions.resetCountdownTimeStamp());

      expect(store.getActions()).to.deep.equal([
        {
          type: UPGRADED_BOARDING__RESET_COUNTDOWN_TIMESTAMP
        }
      ]);
    });
  });
});
