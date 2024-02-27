import _ from 'lodash';
import React, { cloneElement } from 'react';
import { integrationMount } from 'test/unit/helpers/testUtils';
import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import waitFor from 'test/unit/helpers/waitFor';

import { APPLE_PAY_CARD_ID, UPLIFT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { getCeptorConfigWithAmount } from 'test/builders/model/ceptorBuilder';
import { getApplePayCard, getUpliftCard } from 'test/builders/model/paymentInfoBuilder';
import { INITIAL_AVAILABILITY, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import SharedConstants from 'src/shared/constants/sharedConstants';

const { EXTERNAL_TARGETS } = SharedConstants;

const sinon = sandbox.create();

describe('WithAlternativeFormsOfPayment', () => {
  const FakeComponent = () => <div />;

  const defaultAfpAvailability = INITIAL_AVAILABILITY;
  const amount = 1000;
  const defaultCeptorConfig = getCeptorConfigWithAmount(amount);

  const defaultState = {
    app: {
      applePay: { applePayAvailability: defaultAfpAvailability },
      uplift: { upliftAvailability: defaultAfpAvailability },
      webView: {
        isWebView: false,
        webViewExternalPaymentAuthorizedSearchString: 'webViewExternalPaymentAuthorizedSearchString'
      }
    }
  };
  const applicationType = 'fake-application';

  let alternativeFormsOfPaymentFailedStub;
  let buildPathWithParamAndQueryStub;
  let containsErrorStub;
  let getAfpAvailabilityStub;
  let getCeptorConfigStub;
  let getShouldDisableUpliftStub;
  let getShouldShowUpliftStub;
  let initiateAlternativeFormOfPaymentStub;
  let initiatePaymentFailedStub;
  let initiatePaymentSuccessStub;
  let initiateVoidTransactionStub;
  let reloadAndSubmitAlternativeFormOfPaymentStub;
  let reloadAndSubmitSuccessStub;
  let resumeAppStateFnStub;
  let saveFormDataStub;
  let sendErrorLogStub;
  let sendInfoLogStub;
  let setUpAlternativeFormsOfPaymentStub;
  let shouldResumeAppStateFnStub;
  let toApplePayCardStub;
  let toUpliftCardStub;
  let transformSearchToQueryStub;
  let validateAlternativeFormsOfPaymentStub;
  let wcmTransitionToStub;

  beforeEach(() => {
    alternativeFormsOfPaymentFailedStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    buildPathWithParamAndQueryStub = sinon.stub();
    containsErrorStub = sinon.stub();
    getAfpAvailabilityStub = sinon.stub().returns(defaultAfpAvailability);
    getCeptorConfigStub = sinon.stub().returns(() => defaultCeptorConfig);
    getShouldDisableUpliftStub = sinon.stub().returns(_.noop);
    getShouldShowUpliftStub = sinon.stub().returns(_.noop);
    initiateAlternativeFormOfPaymentStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    initiatePaymentFailedStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    initiatePaymentSuccessStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    initiateVoidTransactionStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    reloadAndSubmitAlternativeFormOfPaymentStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    reloadAndSubmitSuccessStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    resumeAppStateFnStub = sinon.stub().resolves();
    saveFormDataStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    sendErrorLogStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    sendInfoLogStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    setUpAlternativeFormsOfPaymentStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    shouldResumeAppStateFnStub = sinon.stub().returns(false);
    toApplePayCardStub = sinon.stub();
    toUpliftCardStub = sinon.stub();
    transformSearchToQueryStub = sinon.stub();
    validateAlternativeFormsOfPaymentStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    wcmTransitionToStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('wrapped component should have ommitted props', () => {
      const wrapper = createComponent(defaultState);

      expect(wrapper.find('FakeComponent').prop('afpAvailability')).to.be.undefined;
      expect(wrapper.find('FakeComponent').prop('ceptorConfig')).to.be.undefined;
      expect(wrapper.find('FakeComponent').prop('alternativeFormsOfPaymentFailedFn')).to.be.undefined;
      expect(wrapper.find('FakeComponent').prop('initiatePaymentFailedFn')).to.be.undefined;
      expect(wrapper.find('FakeComponent').prop('initiatePaymentSuccessFn')).to.be.undefined;
      expect(wrapper.find('FakeComponent').prop('setUpAlternativeFormsOfPaymentFn')).to.be.undefined;
    });

    it('wrapped component should have added props', () => {
      const wrapper = createComponent(defaultState);

      expect(wrapper.find('FakeComponent').prop('hasSelectedAlternativeFormOfPaymentFn')).to.not.be.undefined;
      expect(wrapper.find('FakeComponent').prop('initiateAlternativeFormOfPaymentFn')).to.not.be.undefined;
    });
  });

  context('componentDidMount', () => {
    it('should call setup when shouldResumeAppStateFn is false', () => {
      createComponent(defaultState);

      expect(shouldResumeAppStateFnStub).to.have.been.calledWith(EXTERNAL_TARGETS.EXTERNAL_PAYMENT);
      expect(setUpAlternativeFormsOfPaymentStub).to.have.been.called;
      expect(resumeAppStateFnStub).to.not.have.been.called;
    });

    context('when shouldResumeAppState is true', () => {
      it('should call resumeAppStateFn', () => {
        shouldResumeAppStateFnStub.returns(true);
        createComponent(defaultState);

        expect(shouldResumeAppStateFnStub).to.have.been.calledWith(EXTERNAL_TARGETS.EXTERNAL_PAYMENT);
        expect(setUpAlternativeFormsOfPaymentStub).to.not.have.been.called;
        expect(resumeAppStateFnStub).to.have.been.called;
      });

      it('should call reloadAndSubmitAlternativeFormOfPayment action when token available true', (done) => {
        shouldResumeAppStateFnStub.returns(true);
        const state = _.cloneDeep(defaultState);

        createComponent(state, {
          history: {
            location: {
              search: ''
            }
          }
        });

        transformSearchToQueryStub.returns({ tokenAvailable: 'true', paymentMethod: 'paymentMethod' });

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).to.have.been.calledWith(EXTERNAL_TARGETS.EXTERNAL_PAYMENT);
          expect(resumeAppStateFnStub).to.have.been.called;
          expect(reloadAndSubmitAlternativeFormOfPaymentStub).to.have.been.called;
          expect(reloadAndSubmitAlternativeFormOfPaymentStub.args[0][0]).to.deep.equal('paymentMethod');
          expect(reloadAndSubmitAlternativeFormOfPaymentStub.args[0][1]).to.deep.equal(defaultCeptorConfig);
        }, done);
      });

      it('should not call reloadAndSubmitAlternativeFormOfPayment action when token available false', (done) => {
        shouldResumeAppStateFnStub.returns(true);
        const state = _.cloneDeep(defaultState);

        createComponent(state);

        transformSearchToQueryStub.returns({ tokenAvailable: 'false', paymentMethod: 'paymentMethod' });

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).to.have.been.calledWith(EXTERNAL_TARGETS.EXTERNAL_PAYMENT);
          expect(resumeAppStateFnStub).to.have.been.called;
          expect(reloadAndSubmitAlternativeFormOfPaymentStub).to.not.have.been.called;
        }, done);
      });
    });
  });

  context('componentDidUpdate', () => {
    it('should call setup if props are different', () => {
      const ceptorConfig = _.merge({}, defaultCeptorConfig, { requestedAFPParams: { amount: 9999 } });

      getCeptorConfigStub.onCall(0).returns(() => ceptorConfig);

      createComponent(defaultState);
      expect(setUpAlternativeFormsOfPaymentStub).to.have.been.calledTwice;
    });

    it('should not call setup if props are same', () => {
      createComponent(defaultState);
      expect(setUpAlternativeFormsOfPaymentStub).to.have.been.calledOnce;
    });

    it('should not dispatch initiatePaymentFailed if afp not active', () => {
      const afpAvailability = {
        paymentMethod: 'paymentMethod',
        isAvailable: true,
        isActive: false,
        hasError: false,
        lastUpdateFailed: false,
        shouldDisplay: true
      };

      getAfpAvailabilityStub.returns(afpAvailability);

      const wrapper = createComponent(defaultState);

      wrapper.setProps({
        children: cloneElement(wrapper.props().children, { afpAvailability })
      });

      expect(initiatePaymentFailedStub).to.not.have.been.called;
    });

    it('should not dispatch initiatePaymentFailed if afp does not have error', () => {
      const afpAvailability = {
        paymentMethod: 'paymentMethod',
        isAvailable: true,
        isActive: true,
        hasError: false,
        lastUpdateFailed: false,
        shouldDisplay: true
      };

      getAfpAvailabilityStub.returns(afpAvailability);

      const wrapper = createComponent(defaultState);

      wrapper.setProps({
        children: cloneElement(wrapper.props().children, { afpAvailability })
      });

      expect(initiatePaymentFailedStub).to.not.have.been.called;
    });

    it('should dispatch initiatePaymentFailed if afp is active and has error', () => {
      const afpAvailability = {
        paymentMethod: 'paymentMethod',
        isAvailable: true,
        isActive: true,
        hasError: true,
        lastUpdateFailed: false,
        shouldDisplay: true
      };

      getAfpAvailabilityStub.onCall(1).returns(afpAvailability);

      const wrapper = createComponent(defaultState);

      wrapper.setProps({
        children: cloneElement(wrapper.props().children, { afpAvailability })
      });

      expect(initiatePaymentFailedStub).to.have.been.called;
    });

    context('resume from external payment page', () => {
      it('should resume app from app state from external payment page when in web view', (done) => {
        shouldResumeAppStateFnStub.onCall(1).returns(true);
        resumeAppStateFnStub.resolves();
        transformSearchToQueryStub.returns({ tokenAvailable: 'true', paymentMethod: 'paymentMethod' });

        createComponent({
          app: {
            webView: {
              isWebView: true,
              webViewExternalPaymentAuthorizedSearchString: 'webViewSearchString'
            }
          }
        });

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).to.have.been.calledWith(EXTERNAL_TARGETS.EXTERNAL_PAYMENT);
          expect(shouldResumeAppStateFnStub.callCount).to.eq(2);
          expect(resumeAppStateFnStub).to.have.been.calledOnce;
          expect(reloadAndSubmitAlternativeFormOfPaymentStub).to.have.been.called;
          expect(reloadAndSubmitAlternativeFormOfPaymentStub.args[0][0]).to.deep.equal('paymentMethod');
          expect(reloadAndSubmitAlternativeFormOfPaymentStub.args[0][1]).to.deep.equal(defaultCeptorConfig);
        }, done);
      });

      it('should not resume app from app state from external payment page when in web view and search string null', (done) => {
        shouldResumeAppStateFnStub.onCall(1).returns(true);
        resumeAppStateFnStub.returns(Promise.resolve());

        createComponent({
          app: {
            webView: {
              isWebView: true,
              webViewExternalPaymentAuthorizedSearchString: null
            }
          }
        });

        waitFor.untilAssertPass(() => {
          expect(shouldResumeAppStateFnStub).to.have.been.calledWith(EXTERNAL_TARGETS.EXTERNAL_PAYMENT);
          expect(resumeAppStateFnStub).to.not.have.been.called;
          expect(reloadAndSubmitAlternativeFormOfPaymentStub).to.not.have.been.called;
        }, done);
      });
    });
  });

  context('setUpAlternativeFormsOfPayment', () => {
    it('should trigger the setUpAlternativeFormsOfPayment action', () => {
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      expect(setUpAlternativeFormsOfPaymentStub).to.have.been.called;
      expect(setUpAlternativeFormsOfPaymentStub.args[0][0]).to.deep.equal([
        defaultAfpAvailability,
        defaultAfpAvailability
      ]);
      expect(setUpAlternativeFormsOfPaymentStub.args[0][1]).to.deep.equal(defaultCeptorConfig);
    });
  });

  context('hasSelectedAlternativeFormOfPayment', () => {
    it('should return true when selected card is Apple Pay', () => {
      const wrapper = createComponent(defaultState);

      const paymentInfo = { selectedCardId: APPLE_PAY_CARD_ID };
      const hasSelectedAlternativeFormOfPaymentFn = wrapper
        .find('FakeComponent')
        .prop('hasSelectedAlternativeFormOfPaymentFn');

      const result = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, paymentInfo);

      expect(result).to.equal(true);
    });

    it('should return true when selected card is Uplift', () => {
      const wrapper = createComponent(defaultState);

      const paymentInfo = { selectedCardId: UPLIFT_CARD_ID };
      const hasSelectedAlternativeFormOfPaymentFn = wrapper
        .find('FakeComponent')
        .prop('hasSelectedAlternativeFormOfPaymentFn');

      const result = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.UPLIFT, paymentInfo);

      expect(result).to.equal(true);
    });

    it('should return false when selected card is not Apple Pay', () => {
      const wrapper = createComponent(defaultState);

      const paymentInfo = { selectedCardId: 'not Apple Pay' };
      const hasSelectedAlternativeFormOfPaymentFn = wrapper
        .find('FakeComponent')
        .prop('hasSelectedAlternativeFormOfPaymentFn');

      const result = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, paymentInfo);

      expect(result).to.equal(false);
    });

    it('should return false when paymentInfo is empty', () => {
      const wrapper = createComponent(defaultState);

      const paymentInfo = {};
      const hasSelectedAlternativeFormOfPaymentFn = wrapper
        .find('FakeComponent')
        .prop('hasSelectedAlternativeFormOfPaymentFn');

      const result = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, paymentInfo);

      expect(result).to.equal(false);
    });

    it('should return false when paymentInfo is undefined', () => {
      const wrapper = createComponent(defaultState);

      const paymentInfo = undefined;
      const hasSelectedAlternativeFormOfPaymentFn = wrapper
        .find('FakeComponent')
        .prop('hasSelectedAlternativeFormOfPaymentFn');

      const result = hasSelectedAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY, paymentInfo);

      expect(result).to.equal(false);
    });
  });

  context('_initiateAlternativeFormOfPayment', () => {
    it('should initiate apple pay', () => {
      const wrapper = createComponent(defaultState);

      const initiateAlternativeFormOfPaymentFn = wrapper
        .find('FakeComponent')
        .prop('initiateAlternativeFormOfPaymentFn');

      initiateAlternativeFormOfPaymentFn(PAYMENT_METHODS.APPLE_PAY);

      expect(initiateAlternativeFormOfPaymentStub).to.have.been.calledWith(
        defaultAfpAvailability,
        defaultCeptorConfig,
        PAYMENT_METHODS.APPLE_PAY,
        false
      );
    });

    it('should initiate uplift', () => {
      const wrapper = createComponent(defaultState);

      const initiateAlternativeFormOfPaymentFn = wrapper
        .find('FakeComponent')
        .prop('initiateAlternativeFormOfPaymentFn');

      initiateAlternativeFormOfPaymentFn(PAYMENT_METHODS.UPLIFT);

      expect(initiateAlternativeFormOfPaymentStub).to.have.been.calledWith(
        defaultAfpAvailability,
        defaultCeptorConfig,
        PAYMENT_METHODS.UPLIFT,
        false
      );
    });
  });

  context('initiateVoidTransaction', () => {
    it('should void apple pay', () => {
      const wrapper = createComponent(defaultState);

      const initiateVoidTransactionFn = wrapper
        .find('FakeComponent')
        .prop('initiateVoidTransactionFn');

      initiateVoidTransactionFn(PAYMENT_METHODS.APPLE_PAY, null, true);

      expect(initiateVoidTransactionStub).to.have.been.calledWith(
        PAYMENT_METHODS.APPLE_PAY,
        null,
        true
      );
    });
  });

  context('_ceptorCallbackFn', () => {
    it('should save apple pay card when a valid card is returned', () => {
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      const applePayCard = getApplePayCard();

      toApplePayCardStub.returns(applePayCard);

      containsErrorStub.returns(false);

      const callbackFn = setUpAlternativeFormsOfPaymentStub.args[0][2];
      const response = { paymentMethod: 'ApplePay' };

      callbackFn(response);

      expect(toApplePayCardStub).to.have.been.calledWith(response);
      expect(sendErrorLogStub).to.not.have.been.called;
      expect(initiatePaymentSuccessStub).to.have.been.calledWith({
        paymentMethod: PAYMENT_METHODS.APPLE_PAY,
        uatpCard: applePayCard
      });
    });

    it('should save error when error is returned', () => {
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      const applePayCard = getApplePayCard();

      toApplePayCardStub.returns(applePayCard);

      containsErrorStub.returns(true);

      const callbackFn = setUpAlternativeFormsOfPaymentStub.args[0][2];
      const response = { paymentMethod: 'ApplePay' };

      callbackFn(response);

      expect(toApplePayCardStub).to.not.have.been.called;
      expect(initiatePaymentSuccessStub).to.not.have.been.called;
      expect(sendErrorLogStub).to.have.been.called;
      expect(alternativeFormsOfPaymentFailedStub).to.have.been.called;
    });

    it('should save uplift card when a valid card is returned', () => {
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      const upliftCard = getUpliftCard();

      toUpliftCardStub.returns(upliftCard);

      containsErrorStub.returns(false);

      const callbackFn = setUpAlternativeFormsOfPaymentStub.args[0][2];
      const response = { paymentMethod: PAYMENT_METHODS.UPLIFT };

      callbackFn(response);

      expect(toUpliftCardStub).to.have.been.calledWith(response);
      expect(sendErrorLogStub).to.not.have.been.called;
      expect(initiatePaymentSuccessStub).to.have.been.calledWith({
        paymentMethod: PAYMENT_METHODS.UPLIFT,
        uatpCard: upliftCard
      });
      expect(reloadAndSubmitSuccessStub).to.have.been.called;
    });

    it('should save error when error is returned', () => {
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      const upliftCard = getUpliftCard();

      toUpliftCardStub.returns(upliftCard);

      containsErrorStub.returns(true);

      const callbackFn = setUpAlternativeFormsOfPaymentStub.args[0][2];
      const response = { paymentMethod: PAYMENT_METHODS.UPLIFT };

      callbackFn(response);

      expect(toUpliftCardStub).to.not.have.been.called;
      expect(initiatePaymentSuccessStub).to.not.have.been.called;
      expect(sendErrorLogStub).to.have.been.called;
      expect(alternativeFormsOfPaymentFailedStub).to.have.been.called;
    });

    it('should set digitalTransactionId to null if isWebView is true', () => {
      defaultState.app.webView.isWebView = true;
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      const applePayCard = getApplePayCard();
      
      applePayCard.token.digitalTransactionId = null;

      toApplePayCardStub.returns(applePayCard);

      containsErrorStub.returns(false);

      const callbackFn = setUpAlternativeFormsOfPaymentStub.args[0][2];
      const response = { paymentMethod: 'ApplePay' };

      callbackFn(response);

      expect(toApplePayCardStub).to.have.been.calledWith(response);
      expect(sendErrorLogStub).to.not.have.been.called;
      expect(initiatePaymentSuccessStub).to.have.been.calledWith({
        paymentMethod: PAYMENT_METHODS.APPLE_PAY,
        uatpCard: applePayCard
      });
    });

    it('should not call sendErrorLog nor initiatePaymentSuccess functions if the response is undefined', () => {
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      const applePayCard = getApplePayCard();
      
      applePayCard.token.digitalTransactionId = null;

      toApplePayCardStub.returns(applePayCard);

      containsErrorStub.returns(false);

      const callbackFn = setUpAlternativeFormsOfPaymentStub.args[0][2];
      const response = undefined;

      callbackFn(response);

      expect(sendErrorLogStub).to.not.have.been.called;
      expect(initiatePaymentSuccessStub).to.not.have.been.called;
    });
  });

  context('_validationCallbackFn', () => {
    it('should call validateAlternativeFormsOfPayment action', () => {
      const state = _.cloneDeep(defaultState);

      createComponent(state);

      const validationFn = setUpAlternativeFormsOfPaymentStub.args[0][3];
      const validationResponse = { validation: 'response' };

      validationFn(validationResponse);

      expect(validateAlternativeFormsOfPaymentStub).to.have.been.calledWith(validationResponse);
    });
  });

  function createComponent(state = {}, props = {}) {
    const withAlternativeFormsOfPayment = proxyquire('src/shared/enhancers/withAlternativeFormsOfPayment', {
      'src/shared/actions/alternativeFormsOfPaymentActions': {
        alternativeFormsOfPaymentFailed: alternativeFormsOfPaymentFailedStub,
        initiateAlternativeFormOfPayment: initiateAlternativeFormOfPaymentStub,
        initiatePaymentFailed: initiatePaymentFailedStub,
        initiatePaymentSuccess: initiatePaymentSuccessStub,
        initiateVoidTransaction: initiateVoidTransactionStub,
        reloadAndSubmitAlternativeFormOfPayment: reloadAndSubmitAlternativeFormOfPaymentStub,
        reloadAndSubmitSuccess: reloadAndSubmitSuccessStub,
        setUpAlternativeFormsOfPayment: setUpAlternativeFormsOfPaymentStub,
        validateAlternativeFormsOfPayment: validateAlternativeFormsOfPaymentStub
      },
      'src/shared/api/loggingApi': {
        sendErrorLog: sendErrorLogStub,
        sendInfoLog: sendInfoLogStub
      },
      'src/shared/helpers/alternativeFormsOfPaymentHelper': {
        containsError: containsErrorStub
      },
      'src/shared/helpers/pathUtils': {
        buildPathWithParamAndQuery: buildPathWithParamAndQueryStub,
        transformSearchToQuery: transformSearchToQueryStub
      },
      'src/shared/helpers/wcmTransitionHelper': wcmTransitionToStub,
      'src/shared/selectors/alternativeFormsOfPaymentSelector': {
        getAfpAvailability: getAfpAvailabilityStub,
        getCeptorConfig: getCeptorConfigStub
      },
      'src/shared/selectors/upliftSelector': {
        getShouldDisableUplift: getShouldDisableUpliftStub,
        getShouldShowUplift: getShouldShowUpliftStub
      },
      'src/shared/transformers/applePayTransformer': {
        toApplePayCard: toApplePayCardStub
      },
      'src/shared/transformers/upliftTransformer': {
        toUpliftCard: toUpliftCardStub
      }
    }).default;

    const WithAlternativeFormsOfPaymentComponent = withAlternativeFormsOfPayment(applicationType)(FakeComponent);

    const defaultProps = {
      saveFormDataFn: saveFormDataStub,
      shouldResumeAppStateFn: shouldResumeAppStateFnStub,
      resumeAppStateFn: resumeAppStateFnStub,
      history: {
        location: ''
      }
    };

    return integrationMount()(state, WithAlternativeFormsOfPaymentComponent, _.merge({}, defaultProps, props));
  }
});
