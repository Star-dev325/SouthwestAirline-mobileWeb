import _ from 'lodash';
import proxyquire from 'proxyquire';
import Q from 'q';
import { sandbox } from 'sinon';
import StorageKeys from 'src/shared/helpers/storageKeys';
import store2 from 'store2';
import createMockStore from 'test/unit/helpers/createMockStore';
import waitFor from 'test/unit/helpers/waitFor';

import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import {
  EXTERNAL_PAYMENT_PAGE_URL,
  INITIAL_AVAILABILITY, PAYMENT_METHODS
} from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import BootstrapConstants from 'src/shared/constants/bootstrapConstants';
import WcmLinkTypes from 'src/shared/constants/wcmLinkTypes';
import {
  getCeptorConfig,
  getCeptorConfigWithAmount,
  getCeptorConfigWithEmptyUpliftConfig,
  getCeptorConfigWithPaymentMethodName,
  getCeptorValidationResponse
} from 'test/builders/model/ceptorBuilder';
import {
  getApplePayCard,
  getApplePayErrorCodes,
  getApplePayErrorCodesKeys,
  getNativeApplePayCard
} from 'test/builders/model/paymentInfoBuilder';

const { ERROR_CODE_MAP_PATH } = BootstrapConstants;

const sinon = sandbox.create();
const mockStore = createMockStore();

const {
  ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY,
  ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS,
  ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY,
  ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_SUCCESS,
  ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS,
  ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS_SUCCESS,
  ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT,
  ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM,
  ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM_SUCCESS,
  ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR,
  ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR_SUCCESS,
  ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR_FAILED
} = AlternativeFormsOfPaymentActionTypes;

describe('AlternativeFormsOfPaymentActions', () => {
  const amount = 10000;
  const moneyTotal = { amount: '100.00', currencyCode: 'USA' };
  const ceptorConfigWithAmount = getCeptorConfigWithAmount(amount);
  const errorCodes = ['811', '813'];
  const location = {
    pathname: 'path'
  };

  let AlternativeFormsOfPaymentActions;
  let buildPathWithParamAndQueryStub;
  let confirmStub;
  let containsApiErrorCodesStub;
  let createBaseInstanceStub;
  let createInstanceStub;
  let defaultState;
  let errorStub;
  let fetchBootstrapDataStub;
  let getAmountFromTotalStub;
  let getAvailabilityForPaymentMethodStub;
  let getAvailablePaymentMethodsStub;
  let getCurrentAppFlowStub;
  let getInstanceStub;
  let getMoneyTotalForApplicationStub;
  let getPersistenceIdentifierForPaymentMethodStub;
  let getProviderForPaymentMethodStub;
  let getQueryParamsForExternalPaymentPageStub;
  let getTotalFromAmountStub;
  let getUatpCardStub;
  let getValidationErrorsStub;
  let removeStub;
  let sendErrorLogStub;
  let sendInfoLogStub;
  let setupAvailablePaymentMethodsStub;
  let showErrorPopUpStub;
  let showNativeApplePayStub;
  let store;
  let toAfpAvailabilitiesStub;
  let toChapiAfpErrorLogStub;
  let toGetUatpCardRequestStub;
  let toInfoLogStub;
  let toRequestedAFPParamsStub;
  let toUpdateRequestStub;
  let validatePaymentMethodIsAvailableStub;
  let voidTransactionStub;
  let wcmTransitionToStub;

  beforeEach(() => {
    defaultState = {
      app: {
        wcmContent: {
          applicationProperties: {
            ERROR_AFP_CODES_TO_DISPLAY: errorCodes
          }
        }
      },
      router: {
        location
      }
    };

    buildPathWithParamAndQueryStub = sinon.stub();
    confirmStub = sinon.stub();
    containsApiErrorCodesStub = sinon.stub();
    createBaseInstanceStub = sinon.stub();
    createInstanceStub = sinon.stub();
    errorStub = sinon.stub();
    fetchBootstrapDataStub = sinon.stub();
    getAmountFromTotalStub = sinon.stub();
    getAvailabilityForPaymentMethodStub = sinon.stub();
    getAvailablePaymentMethodsStub = sinon.stub();
    getCurrentAppFlowStub = sinon.stub();
    getInstanceStub = sinon.stub();
    getMoneyTotalForApplicationStub = sinon.stub();
    getPersistenceIdentifierForPaymentMethodStub = sinon.stub();
    getProviderForPaymentMethodStub = sinon.stub();
    getQueryParamsForExternalPaymentPageStub = sinon.stub();
    getTotalFromAmountStub = sinon.stub();
    getUatpCardStub = sinon.stub();
    getValidationErrorsStub = sinon.stub();
    removeStub = sinon.stub(store2.session, 'remove');
    sendErrorLogStub = sinon.stub();
    sendInfoLogStub = sinon.stub();
    setupAvailablePaymentMethodsStub = sinon.stub();
    showErrorPopUpStub = sinon.stub().returns('dssd');
    showNativeApplePayStub = sinon.stub();
    toAfpAvailabilitiesStub = sinon.stub();
    toChapiAfpErrorLogStub = sinon.stub().returns('errorLog');
    toGetUatpCardRequestStub = sinon.stub();
    toInfoLogStub = sinon.stub().returns('infoLog');
    toRequestedAFPParamsStub = sinon.stub();
    toUpdateRequestStub = sinon.stub();
    validatePaymentMethodIsAvailableStub = sinon.stub();
    voidTransactionStub = sinon.stub();
    wcmTransitionToStub = sinon.stub();

    createInstanceStub.returns({
      getAvailablePaymentMethods: getAvailablePaymentMethodsStub,
      setupAvailablePaymentMethods: setupAvailablePaymentMethodsStub
    });

    getInstanceStub.returns({
      confirm: confirmStub,
      error: errorStub,
      getUatpCard: getUatpCardStub,
      voidTransaction: voidTransactionStub
    });

    AlternativeFormsOfPaymentActions = proxyquire('src/shared/actions/alternativeFormsOfPaymentActions', {
      'src/app/helpers/bootstrapHelper': {
        fetchBootstrapData: fetchBootstrapDataStub
      },
      'src/shared/actions/sharedActions': {
        showErrorPopUp: showErrorPopUpStub
      },
      'src/shared/api/loggingApi': {
        sendErrorLog: sendErrorLogStub,
        sendInfoLog: sendInfoLogStub
      },
      'src/shared/helpers/alternativeFormsOfPaymentHelper': {
        getAmountFromTotal: getAmountFromTotalStub,
        getAvailabilityForPaymentMethod: getAvailabilityForPaymentMethodStub,
        getPersistenceIdentifierForPaymentMethod: getPersistenceIdentifierForPaymentMethodStub,
        getProviderForPaymentMethod: getProviderForPaymentMethodStub,
        getQueryParamsForExternalPaymentPage: getQueryParamsForExternalPaymentPageStub,
        getTotalFromAmount: getTotalFromAmountStub,
        getValidationErrors: getValidationErrorsStub,
        validatePaymentMethodIsAvailable: validatePaymentMethodIsAvailableStub
      },
      'src/shared/helpers/ceptorWrapper': {
        default: {
          createBaseInstance: createBaseInstanceStub,
          createInstance: createInstanceStub,
          getInstance: getInstanceStub
        }
      },
      'src/shared/helpers/errorCodesHelper': {
        containsApiErrorCodes: containsApiErrorCodesStub
      },
      'src/shared/helpers/pathUtils': {
        buildPathWithParamAndQuery: buildPathWithParamAndQueryStub
      },
      'src/shared/helpers/wcmTransitionHelper': {
        default: wcmTransitionToStub
      },
      'src/shared/helpers/webViewHelper': {
        showNativeApplePay: showNativeApplePayStub
      },
      'src/shared/selectors/alternativeFormsOfPaymentSelector': {
        getMoneyTotalForApplication: getMoneyTotalForApplicationStub
      },
      'src/shared/selectors/appSelector': {
        getCurrentAppFlow: getCurrentAppFlowStub
      },
      'src/shared/transformers/alternativeFormsOfPaymentTransformer': {
        toAfpAvailabilities: toAfpAvailabilitiesStub,
        toChapiAfpErrorLog: toChapiAfpErrorLogStub,
        toGetUatpCardRequest: toGetUatpCardRequestStub,
        toInfoLog: toInfoLogStub,
        toRequestedAFPParams: toRequestedAFPParamsStub,
        toUpdateRequest: toUpdateRequestStub
      }
    });

    store = mockStore(defaultState);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('setUpAlternativeFormsOfPayment', () => {
    const afpAvailability = { isAvailable: false };
    const callbackFn = _.noop;
    const validationFn = _.noop;

    it('should not dispatch actions when amount is undefined', () => {
      const ceptorConfig = getCeptorConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
          [afpAvailability],
          ceptorConfig,
          callbackFn,
          validationFn
        )
      );

      const actions = store.getActions();

      expect(actions).to.be.empty;
    });

    it('should not dispatch actions when requestedAFPParams is null', () => {
      const ceptorConfig = getCeptorConfig();

      _.set(ceptorConfig, 'requestedAFPParams', null);
      store.dispatch(
        AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
          [afpAvailability],
          ceptorConfig,
          callbackFn,
          validationFn
        )
      );

      const actions = store.getActions();

      expect(actions).to.be.empty;
    });

    describe('fetchAlternativeFormsOfPayment', () => {
      it('should dispatch fetchAvailability and fetchAvailabilitySuccess when afps are not available', (done) => {
        const response = 'response';

        getAvailablePaymentMethodsStub.returns(Q(response));

        const afpAvailabilities = [afpAvailability];

        toAfpAvailabilitiesStub.returns(afpAvailabilities);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            afpAvailabilities,
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          expect(getAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);
          expect(toAfpAvailabilitiesStub).to.have.been.calledWith(response, errorCodes);
          expect(setupAvailablePaymentMethodsStub).to.not.have.been.called;

          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
          expect(actions[1]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS,
            response: afpAvailabilities
          });
        }, done);
      });

      it('should dispatch fetchAvailability and fetchAvailabilitySuccess when one afp is available and other is not', async () => {
        const response = 'response';

        getAvailablePaymentMethodsStub.returns(Promise.resolve(response));

        const availability = { ...afpAvailability, ...{ isAvailable: true } };
        const afpAvailabilities = [availability];

        toAfpAvailabilitiesStub.returns(afpAvailabilities);

        await store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            [afpAvailability],
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        expect(createInstanceStub).to.have.been.calledWith({ ...ceptorConfigWithAmount, validationFn });
        expect(getAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);
        expect(toAfpAvailabilitiesStub).to.have.been.calledWith(response, errorCodes);
        expect(setupAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);

        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[1]).to.deep.equal({
          type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS,
          response: afpAvailabilities
        });
      });

      it('should dispatch fetchAvailability and fetchAvailabilitySuccess when one afp is available and other is not', (done) => {
        const response = 'response';

        getAvailablePaymentMethodsStub.returns(Promise.resolve(response));

        const availability = { ...afpAvailability, ...{ isAvailable: true } };
        const availabilitiesToRequest = [afpAvailability, availability];

        const afpAvailabilities = [availability, availability];

        toAfpAvailabilitiesStub.returns(afpAvailabilities);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            availabilitiesToRequest,
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          expect(createInstanceStub).to.have.been.calledWith({ ...ceptorConfigWithAmount, validationFn });
          expect(getAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);
          expect(toAfpAvailabilitiesStub).to.have.been.calledWith(response, errorCodes);
          expect(setupAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);

          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
          expect(actions[1]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS,
            response: afpAvailabilities
          });
        }, done);
      });

      it('should dispatch fetchAvailability and fetchAvailabilityFailed when getAvailablePaymentMethods returns an error response', (done) => {
        const error = 'error';

        getAvailablePaymentMethodsStub.returns(Q.reject(error));

        toAfpAvailabilitiesStub.returns(afpAvailability);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            afpAvailability,
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          expect(createInstanceStub).to.have.been.calledWith({ ...ceptorConfigWithAmount, validationFn });
          expect(getAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);
          expect(toAfpAvailabilitiesStub).to.not.have.been.called;
          expect(setupAvailablePaymentMethodsStub).to.not.have.been.called;

          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
          expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED });
        }, done);
      });

      it('should dispatch fetchAvailability and fetchAvailabilityFailed when getAvailablePaymentMethods throws an error', (done) => {
        const error = new Error();

        getAvailablePaymentMethodsStub.throws(error);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            afpAvailability,
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          expect(createInstanceStub).to.have.been.calledWith({ ...ceptorConfigWithAmount, validationFn });
          expect(getAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);
          expect(toAfpAvailabilitiesStub).to.not.have.been.called;
          expect(setupAvailablePaymentMethodsStub).to.not.have.been.called;

          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
          expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED });
        }, done);
      });

      it('should dispatch fetchAvailability and fetchAvailabilityFailed when setupAvailablePaymentMethods throws an error', (done) => {
        const response = 'response';

        getAvailablePaymentMethodsStub.returns(Q(response));

        const availability = { ...afpAvailability, ...{ isAvailable: true } };

        toAfpAvailabilitiesStub.returns([availability]);

        const error = new Error();

        setupAvailablePaymentMethodsStub.throws(error);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            afpAvailability,
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          expect(createInstanceStub).to.have.been.calledWith({ ...ceptorConfigWithAmount, validationFn });
          expect(getAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);
          expect(toAfpAvailabilitiesStub).to.have.been.calledWith(response, errorCodes);
          expect(setupAvailablePaymentMethodsStub).to.have.been.calledWith(callbackFn);

          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
          expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED });
        }, done);
      });
    });

    describe('updateAlternativeFormsOfPayment', () => {
      let updateStub;

      beforeEach(() => {
        updateStub = sinon.stub();
        getInstanceStub.returns({ update: updateStub });
      });

      it('should dispatch updateAvailabilitySuccess', (done) => {
        const availability = { ...afpAvailability, ...{ isAvailable: true } };
        const request = 'request';

        toUpdateRequestStub.returns(request);
        updateStub.returns(Q(amount));
        toAfpAvailabilitiesStub.returns([availability]);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            [availability],
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_SUCCESS,
            response: [availability],
            isFetching: false
          });

          expect(toUpdateRequestStub).to.have.been.calledWith(ceptorConfigWithAmount);
          expect(updateStub).to.have.been.calledWith(request);
        }, done);
      });

      it('should dispatch updateAvailabilitySuccess when both afps are available', (done) => {
        const availability = { ...afpAvailability, ...{ isAvailable: true } };
        const request = 'request';

        toUpdateRequestStub.returns(request);
        updateStub.returns(Q(amount));
        toAfpAvailabilitiesStub.returns([availability, availability]);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            [availability, availability],
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_SUCCESS,
            response: [availability, availability],
            isFetching: false
          });

          expect(toUpdateRequestStub).to.have.been.calledWith(ceptorConfigWithAmount);
          expect(updateStub).to.have.been.calledWith(request);
        }, done);
      });

      it('should not dispatch updateAvailabilityFailed when the promise errors', (done) => {
        const availability = { ...afpAvailability, ...{ isAvailable: true } };
        const request = 'request';
        const error = 'error';

        toUpdateRequestStub.returns(request);
        updateStub.returns(Q.reject(error));

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            [availability],
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_FAILED,
            isFetching: false
          });

          expect(toUpdateRequestStub).to.have.been.calledWith(ceptorConfigWithAmount);
          expect(updateStub).to.have.been.calledWith(request);
        }, done);
      });

      it('should not dispatch updateAvailabilityFailed when the promise errors', (done) => {
        const availability = { ...afpAvailability, ...{ isAvailable: true } };
        const request = 'request';

        toUpdateRequestStub.returns(request);

        const error = new Error();

        updateStub.throws(error);

        store.dispatch(
          AlternativeFormsOfPaymentActions.setUpAlternativeFormsOfPayment(
            [availability],
            ceptorConfigWithAmount,
            callbackFn,
            validationFn
          )
        );

        waitFor.untilAssertPass(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY,
            isFetching: true
          });
          expect(actions[1]).to.deep.equal({
            type: ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_FAILED,
            isFetching: false
          });

          expect(toUpdateRequestStub).to.have.been.calledWith(ceptorConfigWithAmount);
          expect(updateStub).to.have.been.calledWith(request);
        }, done);
      });
    });
  });

  describe('resetAlternativeFormsOfPayment', () => {
    it('should dispatch action', () => {
      store.dispatch(AlternativeFormsOfPaymentActions.resetAlternativeFormsOfPayment());

      expect(removeStub).to.have.been.calledWith(StorageKeys.CEPTOR_PERSISTENCE_IDENTIFIER);
      const actions = store.getActions();

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY });
    });
  });

  describe('initiateAlternativeFormOfPayment', () => {
    const afpAvailability = { isAvailable: true, lastUpdateFailed: false, shouldDisplay: true };

    beforeEach(() => {
      getPersistenceIdentifierForPaymentMethodStub.returns('uuid');
      getProviderForPaymentMethodStub.returns('provider');
    });

    it('should initiate alternative form of payment', () => {
      const paymentMethod = 'paymentMethod';
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = false;

      getTotalFromAmountStub.returns(amount);
      toGetUatpCardRequestStub.returns(request);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });

      expect(getInstanceStub).to.have.been.called;
      expect(getTotalFromAmountStub).to.have.been.calledWith(amount);
      expect(toGetUatpCardRequestStub).to.have.been.calledWith(ceptorConfigWithAmount, paymentMethod, amount);
      expect(getUatpCardStub).to.have.been.calledWith(request);
      expect(showNativeApplePayStub).to.not.have.been.called;
    });

    it('should initiate native apple pay when is webview with apple pay as payment method', () => {
      const paymentMethod = PAYMENT_METHODS.APPLE_PAY;
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = true;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });

      expect(getInstanceStub).to.have.been.called;
      expect(getTotalFromAmountStub).to.have.been.calledWith(amount);
      expect(toGetUatpCardRequestStub).to.have.been.calledWith(ceptorConfigWithAmount, paymentMethod, amount);
      expect(getUatpCardStub).to.not.have.been.called;
      expect(showNativeApplePayStub).to.have.been.calledWith(moneyTotal);
    });

    it('should not initiate native apple pay when is webview with non apple pay payment method', () => {
      const paymentMethod = 'not-apple-pay';
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = true;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });

      expect(getInstanceStub).to.have.been.called;
      expect(getTotalFromAmountStub).to.have.been.calledWith(amount);
      expect(toGetUatpCardRequestStub).to.have.been.calledWith(ceptorConfigWithAmount, paymentMethod, amount);
      expect(getUatpCardStub).to.have.been.calledWith(request);
      expect(showNativeApplePayStub).to.not.have.been.called;
    });

    it('should redirect to external payment page when Uplift when valid afp', () => {
      const paymentMethod = PAYMENT_METHODS.UPLIFT;
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = false;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);
      validatePaymentMethodIsAvailableStub.returns(true);
      buildPathWithParamAndQueryStub.returns('target');
      getQueryParamsForExternalPaymentPageStub.returns({
        persistenceIdentifier: 'uuid',
        provider: 'provider',
        paymentMethod,
        redirectUrl: 'path',
        webView: isWebView
      });

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(1);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });

      expect(getQueryParamsForExternalPaymentPageStub).to.have.been.calledWith(
        paymentMethod,
        ceptorConfigWithAmount,
        location,
        isWebView
      );
      expect(buildPathWithParamAndQueryStub).to.have.been.calledWith(EXTERNAL_PAYMENT_PAGE_URL, null, {
        persistenceIdentifier: 'uuid',
        provider: 'provider',
        paymentMethod,
        redirectUrl: 'path',
        webView: isWebView
      });
      expect(wcmTransitionToStub).to.have.been.calledWith({
        linkType: WcmLinkTypes.BROWSER,
        target: 'target',
        useWebViewLinkType: true
      });
    });

    it('should dispatch initiate failed when Uplift when is invalid afp', () => {
      store = mockStore(
        _.merge({}, defaultState, {
          app: {
            uplift: {
              upliftAvailability: INITIAL_AVAILABILITY
            }
          }
        })
      );

      const paymentMethod = PAYMENT_METHODS.UPLIFT;
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = false;
      const shouldShowUplift = false;
      const shouldDisableUplift = false;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);
      validatePaymentMethodIsAvailableStub.returns(false);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          shouldShowUplift,
          shouldDisableUplift,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(validatePaymentMethodIsAvailableStub).to.have.been.calledWith(
        paymentMethod,
        INITIAL_AVAILABILITY,
        shouldShowUplift,
        shouldDisableUplift
      );
      expect(actions.length).to.equal(2);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });
      expect(actions[1]).to.contain({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED });
    });

    it('should dispatch initiatePaymentFailed when afp availability lastUpdateFailed is true', () => {
      const afpAvailability = { isAvailable: true, lastUpdateFailed: true };
      const paymentMethod = 'paymentMethod';
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = false;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(2);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });
      expect(actions[1]).to.contain({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED });

      expect(getInstanceStub).to.have.been.called;
      expect(getTotalFromAmountStub).to.have.been.calledWith(amount);
      expect(toGetUatpCardRequestStub).to.have.been.calledWith(ceptorConfigWithAmount, paymentMethod, amount);
      expect(getUatpCardStub).to.not.have.been.called;
      expect(showNativeApplePayStub).to.not.have.been.called;
    });

    it('should dispatch initiatePaymentFailed when afp availability shouldDisplay is false', () => {
      const afpAvailability = { isAvailable: true, lastUpdateFailed: false, shouldDisplay: false };
      const paymentMethod = 'paymentMethod';
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = false;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(2);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });
      expect(actions[1]).to.contain({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED });

      expect(getInstanceStub).to.have.been.called;
      expect(getTotalFromAmountStub).to.have.been.calledWith(amount);
      expect(toGetUatpCardRequestStub).to.have.been.calledWith(ceptorConfigWithAmount, paymentMethod, amount);
      expect(getUatpCardStub).to.not.have.been.called;
      expect(showNativeApplePayStub).to.not.have.been.called;
    });

    it('should dispatch initiatePaymentFailed when afp availability is no longer available', () => {
      const afpAvailability = { isAvailable: false, lastUpdateFailed: true };
      const paymentMethod = 'paymentMethod';
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = false;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(2);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });
      expect(actions[1]).to.contain({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED });

      expect(getInstanceStub).to.have.been.called;
      expect(getTotalFromAmountStub).to.have.been.calledWith(amount);
      expect(toGetUatpCardRequestStub).to.have.been.calledWith(ceptorConfigWithAmount, paymentMethod, amount);
      expect(getUatpCardStub).to.not.have.been.called;
      expect(showNativeApplePayStub).to.not.have.been.called;
    });

    it('should dispatch initiatePaymentFailed when getUatpCard throws an error', () => {
      const paymentMethod = 'paymentMethod';
      const request = 'request';
      const errorHandler = _.noop;
      const isWebView = false;

      getTotalFromAmountStub.returns(moneyTotal);
      toGetUatpCardRequestStub.returns(request);

      const error = new Error();

      getUatpCardStub.throws(error);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateAlternativeFormOfPayment(
          afpAvailability,
          ceptorConfigWithAmount,
          paymentMethod,
          isWebView,
          errorHandler
        )
      );

      const actions = store.getActions();

      expect(actions.length).to.equal(2);
      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT });
      expect(actions[1]).to.contain({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED });

      expect(getInstanceStub).to.have.been.called;
      expect(getTotalFromAmountStub).to.have.been.calledWith(amount);
      expect(toGetUatpCardRequestStub).to.have.been.calledWith(ceptorConfigWithAmount, paymentMethod, amount);
      expect(getUatpCardStub).to.have.been.calledWith(request);
      expect(showNativeApplePayStub).to.not.have.been.called;
    });
  });

  describe('validateAlternativeFormsOfPayment', () => {
    let validationErrorsStub;
    let ceptorValidationResponse;

    beforeEach(() => {
      validationErrorsStub = sinon.stub();
      ceptorValidationResponse = getCeptorValidationResponse();

      getInstanceStub.returns({
        validationErrors: validationErrorsStub
      });
    });

    it('should call getValidationErrors when validation is possible and send errors to validationErrors', () => {
      const errors = ['error1', 'error2'];

      getValidationErrorsStub.returns(errors);

      store.dispatch(AlternativeFormsOfPaymentActions.validateAlternativeFormsOfPayment(ceptorValidationResponse));

      expect(getValidationErrorsStub).to.have.been.calledWith(ceptorValidationResponse.paymentParameters);
      expect(validationErrorsStub).to.have.been.calledWith(errors);
    });

    it('should not call getValidationErrors when validation is not possible and send empty array to validationErrors', () => {
      _.set(ceptorValidationResponse, 'validationPossible', false);

      store.dispatch(AlternativeFormsOfPaymentActions.validateAlternativeFormsOfPayment(ceptorValidationResponse));

      expect(getValidationErrorsStub).to.have.not.been.called;
      expect(validationErrorsStub).to.have.been.calledWith([]);
    });
  });

  describe('alternativeFormsOfPaymentFailed', () => {
    it('should dispatch action', () => {
      store.dispatch(AlternativeFormsOfPaymentActions.alternativeFormsOfPaymentFailed());

      const actions = store.getActions();

      expect(actions.length).to.equal(1);

      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED });
    });
  });

  describe('initiateVoidTransaction', () => {
    let errorCode;
    let voidRequest;
    let voidResponse;

    beforeEach(() => {
      store = mockStore(
        _.merge({}, defaultState, {
          app: {
            applePay: {
              applePayCard: getApplePayCard()
            },
            toggles: {
              CEPTOR_VOID_API: true
            },
            webView: {
              isWebView: false
            },
            wcmContent: {
              applicationProperties: {
                ceptorConfig: getCeptorConfigWithPaymentMethodName(PAYMENT_METHODS.APPLE_PAY)
              }
            }
          }
        })
      );
      voidRequest = {
        paymentMethod: "ApplePay",
        provider: "provider1",
        config: {
          cardNumber: "123456",
          amount: 10000
        }
      };
      voidResponse = "response";
      errorCode = 123456;
      getCurrentAppFlowStub.returns('air/booking');
      getMoneyTotalForApplicationStub.returns(moneyTotal);
      getAmountFromTotalStub.returns(amount);
      fetchBootstrapDataStub.returns(getApplePayErrorCodes());
    });

    it('should dispatch action when initiating a void transaction for Apple Pay with shouldVoidTransaction=true', (done) => {
      containsApiErrorCodesStub.returns(false);
      voidTransactionStub.returns(Promise.resolve(voidResponse));

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          null,
          true
        )
      );

      waitFor.untilAssertPass(() => {
        expect(getInstanceStub).to.have.been.called;
        expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
        expect(containsApiErrorCodesStub).to.not.have.been.called;
        expect(getAmountFromTotalStub).to.have.been.calledWith(moneyTotal);
        expect(toInfoLogStub).to.have.been.called;
        expect(sendInfoLogStub).to.have.been.calledWith('infoLog');
        expect(voidTransactionStub).to.have.been.calledWith(voidRequest);
        expect(showErrorPopUpStub).to.not.have.been.called;
      }, done);
    });

    it('should dispatch an action to initiate a void transaction for Apple Pay when shouldVoidTransaction is true and webView is enabled', (done) => {
      store = mockStore(
        _.merge({}, defaultState, {
          app: {
            applePay: {
              applePayCard: getNativeApplePayCard()
            },
            toggles: {
              CEPTOR_VOID_API: true
            },
            wcmContent: {
              applicationProperties: {
                ceptorConfig: getCeptorConfigWithPaymentMethodName(PAYMENT_METHODS.APPLE_PAY)
              }
            },
            webView: {
              isWebView: true
            }
          }
        })
      );
      voidRequest = {
        paymentMethod: "ApplePay",
        provider: "provider1",
        config: {
          cardNumber: "4123456789012",
          amount: 10000
        }
      };
      containsApiErrorCodesStub.returns(false);
      voidTransactionStub.returns(Promise.resolve(voidResponse));

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          null,
          true
        )
      );

      waitFor.untilAssertPass(() => {
        expect(containsApiErrorCodesStub).to.not.have.been.called;
        expect(getAmountFromTotalStub).to.have.been.calledWith(moneyTotal);
        expect(voidTransactionStub).to.have.been.calledWith(voidRequest);
        expect(showErrorPopUpStub).to.not.have.been.called;
      }, done);
    });

    it('should dispatch an action to initiate a void transaction for Apple Pay when applePayResponse is null and webView is null', (done) => {
      store = mockStore(
        _.merge({}, defaultState, {
          app: {
            applePay: null,
            toggles: {
              CEPTOR_VOID_API: true
            },
            wcmContent: {
              applicationProperties: {
                ceptorConfig: getCeptorConfigWithPaymentMethodName(PAYMENT_METHODS.APPLE_PAY)
              }
            },
            webView: null
          }
        })
      );
      voidRequest = {
        paymentMethod: "ApplePay",
        provider: "provider1",
        config: {
          cardNumber: undefined,
          amount: 10000
        }
      };
      containsApiErrorCodesStub.returns(false);
      voidTransactionStub.returns(Promise.resolve(voidResponse));

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          null,
          true
        )
      );

      waitFor.untilAssertPass(() => {
        expect(voidTransactionStub).to.have.been.calledWith(voidRequest);
        expect(showErrorPopUpStub).to.not.have.been.called;
      }, done);
    });

    it('should dispatch an action to initiate a void transaction for Apple Pay when applePayResponse is null and webView is true', (done) => {
      store = mockStore(
        _.merge({}, defaultState, {
          app: {
            applePay: {
              applePayCard: undefined
            },
            toggles: {
              CEPTOR_VOID_API: true
            },
            wcmContent: {
              applicationProperties: {
                ceptorConfig: getCeptorConfigWithPaymentMethodName(PAYMENT_METHODS.APPLE_PAY)
              }
            },
            webView: {
              isWebView: true
            }
          }
        })
      );
      voidRequest = {
        paymentMethod: "ApplePay",
        provider: "provider1",
        config: {
          cardNumber: undefined,
          amount: 10000
        }
      };
      containsApiErrorCodesStub.returns(false);
      voidTransactionStub.returns(Promise.resolve(voidResponse));

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          null,
          true
        )
      );

      waitFor.untilAssertPass(() => {
        expect(voidTransactionStub).to.have.been.calledWith(voidRequest);
        expect(showErrorPopUpStub).to.not.have.been.called;
      }, done);
    });

    it('should not dispatch action when initiating a void transaction for Apple Pay with shouldVoidTransaction=false', (done) => {
      containsApiErrorCodesStub.returns(false);
      voidTransactionStub.returns(Promise.resolve(voidResponse));

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY
        )
      );

      waitFor.untilAssertPass(() => {
        expect(getInstanceStub).to.have.been.called;
        expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
        expect(containsApiErrorCodesStub).to.not.have.been.called;
        expect(getMoneyTotalForApplicationStub).to.not.have.been.called;
        expect(getAmountFromTotalStub).to.not.have.been.called;
        expect(voidTransactionStub).to.not.have.been.called;
        expect(showErrorPopUpStub).to.not.have.been.called;
      }, done);
    });

    it('should call void transaction when errorCode matches applePayErrorCode', (done) => {
      containsApiErrorCodesStub.returns(true);
      voidTransactionStub.returns(Promise.resolve(voidResponse));

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          errorCode
        )
      );

      waitFor.untilAssertPass(() => {
        expect(getInstanceStub).to.have.been.called;
        expect(fetchBootstrapDataStub).to.have.been.calledWith(ERROR_CODE_MAP_PATH);
        expect(containsApiErrorCodesStub).to.have.been.calledWith(errorCode, getApplePayErrorCodesKeys());
        expect(getAmountFromTotalStub).to.have.been.calledWith(moneyTotal);
        expect(voidTransactionStub).to.have.been.calledWith(voidRequest);
        expect(showErrorPopUpStub).to.have.been.calledWith(errorCode);
      }, done);
    });

    it('should not call void transaction when errorCode does not matches applePayErrorCode', (done) => {
      showErrorPopUpStub.returns({ type: 'showErrorPopUp' });
      containsApiErrorCodesStub.returns(false);
      voidTransactionStub.returns(Promise.resolve(voidResponse));

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          errorCode
        )
      );

      waitFor.untilAssertPass(() => {
        expect(getMoneyTotalForApplicationStub).to.not.have.been.called;
        expect(getAmountFromTotalStub).to.not.have.been.called;
        expect(voidTransactionStub).to.not.have.been.called;
        expect(showErrorPopUpStub).to.have.been.calledWith(errorCode);
      }, done);
    });

    it('should return error when voidTransaction throws an error', (done) => {
      errorCode = {
        'responseJSON': {
          'code': 400310793,
          'message': 'Please verify that the phone number entered is valid.'
        }
      };

      voidRequest = {
        paymentMethod: 'ApplePay',
        provider: 'provider1',
        config: {
          cardNumber: '123456',
          amount: 0
        }
      };
      showErrorPopUpStub.returns({ type: 'showErrorPopUp' });
      getCurrentAppFlowStub.returns(null);
      getMoneyTotalForApplicationStub.returns(null);
      const error = new Error();

      containsApiErrorCodesStub.returns(true);
      voidTransactionStub.throws(error);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          errorCode
        )
      );

      waitFor.untilAssertPass(() => {
        expect(getMoneyTotalForApplicationStub).to.have.been.calledWith(store.getState(), "");
        expect(getAmountFromTotalStub).to.not.have.been.called;
        expect(voidTransactionStub).to.have.been.calledWith(voidRequest);
        expect(toChapiAfpErrorLogStub).to.have.been.called;
        expect(sendErrorLogStub).to.have.been.calledWith('errorLog');
        expect(showErrorPopUpStub).to.have.been.calledWith(errorCode);
      }, done);
    });

    it('should return error when voidTransaction throws an error and not dispatch showErrorPopUpStub with error as null', (done) => {
      const error = new Error();

      containsApiErrorCodesStub.returns(true);
      voidTransactionStub.throws(error);

      store.dispatch(
        AlternativeFormsOfPaymentActions.initiateVoidTransaction(
          PAYMENT_METHODS.APPLE_PAY,
          null,
          true
        )
      );

      waitFor.untilAssertPass(() => {
        expect(voidTransactionStub).to.have.been.calledWith(voidRequest);
        expect(showErrorPopUpStub).to.not.have.been.called;
      }, done);
    });
  });

  describe('retrieveAFPParams', () => {
    let retrieveParamsStub;

    beforeEach(() => {
      retrieveParamsStub = sinon.stub();
      createBaseInstanceStub.returns({ retrieveParams: retrieveParamsStub });
    });

    it('should dispatch action when promise resolves', (done) => {
      const response = 'response';

      retrieveParamsStub.returns(Q(response));
      toRequestedAFPParamsStub.returns(response);
      store.dispatch(AlternativeFormsOfPaymentActions.retrieveAFPParams());

      waitFor.untilAssertPass(() => {
        const actions = store.getActions();

        expect(actions.length).to.equal(2);

        expect(retrieveParamsStub).to.have.been.called;
        expect(toRequestedAFPParamsStub).to.have.been.called;

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS_SUCCESS, response });
      }, done);
    });

    it('should dispatch failed action when promise rejects', async () => {
      const error = 'error';

      retrieveParamsStub.returns(Q.reject(error));
      await store
        .dispatch(AlternativeFormsOfPaymentActions.retrieveAFPParams())
        .catch((error) => expect(error).to.equal('error'));

      const actions = store.getActions();

      expect(actions.length).to.equal(2);

      expect(retrieveParamsStub).to.have.been.called;

      expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS });
      expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS_FAILED, error });
    });
  });

  describe('selectAlternativeFormOfPayment', () => {
    let selectStub;

    beforeEach(() => {
      selectStub = sinon.stub();
      getInstanceStub.returns({ select: selectStub });
    });

    it('should call select stub', (done) => {
      const response = 'response';

      selectStub.returns(Q(response));
      store.dispatch(AlternativeFormsOfPaymentActions.selectAlternativeFormOfPayment());

      waitFor.untilAssertPass(() => {
        expect(selectStub).to.have.been.called;
      }, done);
    });

    it('should resolve with undefined on success', () => {
      const response = 'response';

      selectStub.returns(Q(response));
      store
        .dispatch(AlternativeFormsOfPaymentActions.selectAlternativeFormOfPayment())
        .then((result) => expect(result).to.be.undefined);

      expect(selectStub).to.have.been.called;
    });

    it('should reject when select promise rejects', () => {
      const error = 'error';

      selectStub.returns(Q.reject(error));
      store
        .dispatch(AlternativeFormsOfPaymentActions.selectAlternativeFormOfPayment())
        .catch((error) => expect(error).to.equal('error'));

      expect(selectStub).to.have.been.called;
    });

    it('should dispatch failed action when unexpected error', () => {
      const error = new Error();

      selectStub.throws(error);
      store
        .dispatch(AlternativeFormsOfPaymentActions.selectAlternativeFormOfPayment())
        .catch((error) => expect(error).to.equal('error'));

      expect(selectStub).to.have.been.called;
    });
  });

  describe('reloadAndSubmitAlternativeFormOfPayment', () => {
    it('should dispatch fetch and call getUatpCard when available', (done) => {
      const response = 'response';

      getAvailablePaymentMethodsStub.returns(Q(response));

      const paymentMethod = 'paymentMethod';

      const availability = _.merge({}, INITIAL_AVAILABILITY, {
        paymentMethod,
        lastUpdateFailed: false,
        isAvailable: true,
        shouldDisplay: true
      });

      getAvailabilityForPaymentMethodStub.returns(availability);

      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment(
          paymentMethod,
          ceptorConfig,
          _.noop,
          _.noop
        )
      );

      waitFor.untilAssertPass(() => {
        expect(toGetUatpCardRequestStub).to.have.been.called;
        expect(getAvailabilityForPaymentMethodStub).to.have.been.called;
        expect(getInstanceStub).to.have.been.called;
        expect(getUatpCardStub).to.have.been.called;

        const actions = store.getActions();

        expect(actions.length).to.equal(3);

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT, isFetching: true });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[2]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS });
      }, done);
    });

    it('should dispatch failed when getUatpCard throws error', (done) => {
      const response = 'response';

      getAvailablePaymentMethodsStub.returns(Q(response));

      const paymentMethod = 'paymentMethod';

      const availability = _.merge({}, INITIAL_AVAILABILITY, {
        paymentMethod,
        lastUpdateFailed: false,
        isAvailable: true,
        shouldDisplay: true
      });

      getAvailabilityForPaymentMethodStub.returns(availability);
      const error = new Error();

      getUatpCardStub.throws(error);

      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment(
          paymentMethod,
          ceptorConfig,
          _.noop,
          _.noop
        )
      );

      waitFor.untilAssertPass(() => {
        expect(toGetUatpCardRequestStub).to.have.been.called;
        expect(getAvailabilityForPaymentMethodStub).to.have.been.called;
        expect(getInstanceStub).to.have.been.called;
        expect(getUatpCardStub).to.have.been.called;

        const actions = store.getActions();

        expect(actions.length).to.equal(4);

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT, isFetching: true });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[2]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS });
        expect(actions[3]).to.contain({
          type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_FAILED,
          isFetching: false
        });
      }, done);
    });

    it('should dispatch failed when fetch fails', (done) => {
      getAvailablePaymentMethodsStub.returns(Promise.reject('error'));

      const paymentMethod = 'paymentMethod';

      getAvailabilityForPaymentMethodStub.returns(INITIAL_AVAILABILITY);

      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment(
          paymentMethod,
          ceptorConfig,
          _.noop,
          _.noop
        )
      );

      waitFor.untilAssertPass(() => {
        expect(toGetUatpCardRequestStub).to.have.been.called;
        expect(getAvailabilityForPaymentMethodStub).to.have.been.called;
        expect(getInstanceStub).to.not.have.been.called;
        expect(getUatpCardStub).to.not.have.been.called;

        const actions = store.getActions();

        expect(actions.length).to.equal(4);

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT, isFetching: true });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[2]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED });
        expect(actions[3]).to.contain({
          type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_FAILED,
          isFetching: false
        });
      }, done);
    });

    it('should dispatch failed when fetch throws error', (done) => {
      const error = new Error();

      getAvailablePaymentMethodsStub.throws(error);

      const paymentMethod = 'paymentMethod';

      const availability = _.merge({}, INITIAL_AVAILABILITY, {
        paymentMethod,
        lastUpdateFailed: false,
        isAvailable: true,
        shouldDisplay: true
      });

      getAvailabilityForPaymentMethodStub.returns(availability);

      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment(
          paymentMethod,
          ceptorConfig,
          _.noop,
          _.noop
        )
      );

      waitFor.untilAssertPass(() => {
        expect(toGetUatpCardRequestStub).to.have.been.called;
        expect(getInstanceStub).to.not.have.been.called;
        expect(getUatpCardStub).to.not.have.been.called;

        const actions = store.getActions();

        expect(actions.length).to.equal(4);

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT, isFetching: true });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[2]).to.contain({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED });
        expect(actions[3]).to.contain({
          type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_FAILED,
          isFetching: false
        });
      }, done);
    });

    it('should dispatch failed when last update failed', (done) => {
      const response = 'response';

      getAvailablePaymentMethodsStub.returns(Q(response));

      const paymentMethod = 'paymentMethod';

      const availability = _.merge({}, INITIAL_AVAILABILITY, {
        paymentMethod,
        lastUpdateFailed: true,
        isAvailable: true,
        shouldDisplay: true
      });

      getAvailabilityForPaymentMethodStub.returns(availability);

      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment(
          paymentMethod,
          ceptorConfig,
          _.noop,
          _.noop
        )
      );

      waitFor.untilAssertPass(() => {
        expect(toGetUatpCardRequestStub).to.have.been.called;
        expect(getAvailabilityForPaymentMethodStub).to.have.been.called;
        expect(getInstanceStub).to.not.have.been.called;
        expect(getUatpCardStub).to.not.have.been.called;

        const actions = store.getActions();

        expect(actions.length).to.equal(4);

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT, isFetching: true });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[2]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS });
        expect(actions[3]).to.contain({
          type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_FAILED,
          isFetching: false
        });
      }, done);
    });

    it('should dispatch failed when unavailable', (done) => {
      const response = 'response';

      getAvailablePaymentMethodsStub.returns(Q(response));

      const paymentMethod = 'paymentMethod';

      const availability = _.merge({}, INITIAL_AVAILABILITY, {
        paymentMethod,
        lastUpdateFailed: false,
        isAvailable: false,
        shouldDisplay: true
      });

      getAvailabilityForPaymentMethodStub.returns(availability);

      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment(
          paymentMethod,
          ceptorConfig,
          _.noop,
          _.noop
        )
      );

      waitFor.untilAssertPass(() => {
        expect(toGetUatpCardRequestStub).to.have.been.called;
        expect(getAvailabilityForPaymentMethodStub).to.have.been.called;
        expect(getInstanceStub).to.not.have.been.called;
        expect(getUatpCardStub).to.not.have.been.called;

        const actions = store.getActions();

        expect(actions.length).to.equal(4);

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT, isFetching: true });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[2]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS });
        expect(actions[3]).to.contain({
          type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_FAILED,
          isFetching: false
        });
      }, done);
    });

    it('should dispatch failed when shouldDisplay is false', (done) => {
      const response = 'response';

      getAvailablePaymentMethodsStub.returns(Q(response));

      const paymentMethod = 'paymentMethod';

      const availability = _.merge({}, INITIAL_AVAILABILITY, {
        paymentMethod,
        lastUpdateFailed: false,
        isAvailable: true,
        shouldDisplay: false
      });

      getAvailabilityForPaymentMethodStub.returns(availability);

      const ceptorConfig = getCeptorConfigWithEmptyUpliftConfig();

      store.dispatch(
        AlternativeFormsOfPaymentActions.reloadAndSubmitAlternativeFormOfPayment(
          paymentMethod,
          ceptorConfig,
          _.noop,
          _.noop
        )
      );

      waitFor.untilAssertPass(() => {
        expect(toGetUatpCardRequestStub).to.have.been.called;
        expect(getAvailabilityForPaymentMethodStub).to.have.been.called;
        expect(getInstanceStub).to.not.have.been.called;
        expect(getUatpCardStub).to.not.have.been.called;

        const actions = store.getActions();

        expect(actions.length).to.equal(4);

        expect(actions[0]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT, isFetching: true });
        expect(actions[1]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY });
        expect(actions[2]).to.deep.equal({ type: ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS });
        expect(actions[3]).to.contain({
          type: ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_FAILED,
          isFetching: false
        });
      }, done);
    });
  });

  describe('confirmAlternativeFormOfPayment', () => {
    it('should call wrapper confirm and dispatch action', () => {
      const recordLocator = 'recordLocator';

      store.dispatch(AlternativeFormsOfPaymentActions.confirmAlternativeFormOfPayment(recordLocator));

      expect(confirmStub).to.have.been.calledWith(recordLocator);

      const actions = store.getActions();

      expect(actions.length).to.equal(2);

      expect(actions).to.deep.equal([
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM },
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM_SUCCESS }
      ]);
      expect(removeStub).to.have.been.calledWith(StorageKeys.CEPTOR_PERSISTENCE_IDENTIFIER);
    });

    it('should call wrapper confirm and dispatch failed action when wrapper errors', () => {
      const recordLocator = 'recordLocator';

      confirmStub.throws(new Error('error'));
      store.dispatch(AlternativeFormsOfPaymentActions.confirmAlternativeFormOfPayment(recordLocator));

      expect(confirmStub).to.have.been.calledWith(recordLocator);

      const actions = store.getActions();

      expect(actions.length).to.equal(2);

      expect(actions).to.deep.equal([
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM },
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__CONFIRM_FAILED }
      ]);
      expect(removeStub).to.not.have.been.called;
    });
  });

  describe('sendAlternativeFormOfPaymentError', () => {
    it('should call wrapper error and dispatch action', () => {
      const errorMessage = 'errorMessage';

      store.dispatch(AlternativeFormsOfPaymentActions.sendAlternativeFormOfPaymentError(errorMessage));

      expect(errorStub).to.have.been.calledWith(errorMessage);

      const actions = store.getActions();

      expect(actions.length).to.equal(2);

      expect(actions).to.deep.equal([
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR },
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR_SUCCESS }
      ]);
    });

    it('should call wrapper confirm and dispatch failed action when wrapper errors', () => {
      errorStub.throws(new Error('error'));
      const errorMessage = 'errorMessage';

      store.dispatch(AlternativeFormsOfPaymentActions.sendAlternativeFormOfPaymentError(errorMessage));

      expect(errorStub).to.have.been.calledWith(errorMessage);

      const actions = store.getActions();

      expect(actions.length).to.equal(2);

      expect(actions).to.deep.equal([
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR },
        { type: ALTERNATIVE_FORMS_OF_PAYMENT__SEND_ERROR_FAILED }
      ]);
    });
  });
});
