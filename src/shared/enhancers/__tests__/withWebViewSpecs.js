import React, { cloneElement } from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';
import _ from 'lodash';
import waitFor from 'test/unit/helpers/waitFor';
import { mockStore } from 'test/unit/helpers/interceptorTestUtils';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import { WEBVIEW_MESSAGE_KEYS } from '@swa-ui/hybrid';

const {
  ADD_OAUTH,
  AUTH_EVENT,
  REMOVE_OAUTH,
  ROUTE_CHANGE,
  PAYPAL_AUTHORIZED,
  APPLE_PAY_AUTHORIZED,
  ADD_CHASE_SESSION,
  DEEP_LINK_CONTINUE,
  SAVE_CHASE_OFFERS,
  EXTERNAL_PAYMENT_AUTHORIZED
} = WEBVIEW_MESSAGE_KEYS;
const sinon = sandbox.create();
const defaultState = {
  app: {
    webView: {
      isWebView: false
    }
  }
};

describe('WithWebView', () => {
  let dispatchStub;
  let handleOAuthStub;
  let handleAuthEventStub;
  let handleRouteChangeStub;
  let handlePaypalAuthStub;
  let handleNativeApplePayStub;
  let handleChaseSessionStub;
  let handleDeepLinkContinueStub;
  let handleSaveChaseOffersStub;
  let handleExternalPaymentAuthorizedStub;

  beforeEach(() => {
    handleOAuthStub = sinon.stub(WebViewActions, 'handleOAuth');
    handleAuthEventStub = sinon.stub(WebViewActions, 'handleAuthEvent');
    handleRouteChangeStub = sinon.stub(WebViewActions, 'handleRouteChange');
    handlePaypalAuthStub = sinon.stub(WebViewActions, 'setPaypalAuthorized');
    handleNativeApplePayStub = sinon.stub(WebViewActions, 'handleNativeApplePay');
    handleChaseSessionStub = sinon.stub(WebViewActions, 'handleChaseSession');
    handleDeepLinkContinueStub = sinon.stub(WebViewActions, 'handleDeepLinkContinue');
    handleSaveChaseOffersStub = sinon.stub(WebViewActions, 'handleChaseSaveOffers');
    handleExternalPaymentAuthorizedStub = sinon.stub(WebViewActions, 'handleExternalPaymentAuthorized');

    dispatchStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it(`should dispatch the handleOAuth action when the ${ADD_OAUTH} message is received`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handleOAuthStub.returns(webViewAction);

    window.swa.webViewMessage(ADD_OAUTH, 'credentials');

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleOAuthStub).to.be.called;
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handleAuthEvent action when the ${AUTH_EVENT} message is received`, () => {
    const webViewAction = { type: 'action' };

    createComponent(defaultState);
    handleAuthEventStub.returns(webViewAction);
    window.swa.webViewMessage(AUTH_EVENT, '');

    expect(dispatchStub).to.have.been.calledWith(webViewAction);
    expect(handleAuthEventStub).to.have.been.called;
    expect(handleOAuthStub).to.not.have.been.called;
    expect(handleRouteChangeStub).to.not.have.been.called;
    expect(handlePaypalAuthStub).to.not.have.been.called;
    expect(handleNativeApplePayStub).to.not.have.been.called;
    expect(handleChaseSessionStub).to.not.have.been.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.have.been.called;
  });

  it(`should dispatch the handleOAuth action when the ${REMOVE_OAUTH} message is received`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handleOAuthStub.returns(webViewAction);

    window.swa.webViewMessage(REMOVE_OAUTH);

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleOAuthStub).to.be.called;
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handleRouteChange action when the ${ROUTE_CHANGE} message is received`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handleRouteChangeStub.returns(webViewAction);

    window.swa.webViewMessage(ROUTE_CHANGE, 'new-route', 'with-state');

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleRouteChangeStub).to.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handlePaypalAuthFn action when the ${PAYPAL_AUTHORIZED} message is received`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handlePaypalAuthStub.returns(webViewAction);

    window.swa.webViewMessage(PAYPAL_AUTHORIZED, 'token');

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handlePaypalAuthStub).to.be.called;
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handleNativeApplePayFn action when the ${APPLE_PAY_AUTHORIZED} message is received`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handleNativeApplePayStub.returns(webViewAction);

    const obj = { key: 'value' };

    window.swa.webViewMessage(APPLE_PAY_AUTHORIZED, obj);

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleNativeApplePayStub).to.be.calledWith(obj);
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handleChaseSessionFn action when the ${ADD_CHASE_SESSION} message is received`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handleChaseSessionStub.returns(webViewAction);

    const value = 'session';

    window.swa.webViewMessage(ADD_CHASE_SESSION, value);

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleChaseSessionStub).to.be.calledWith(value);
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handleDeepLinkContinueFn action when the ${DEEP_LINK_CONTINUE} message is received`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handleDeepLinkContinueStub.returns(webViewAction);

    window.swa.webViewMessage(DEEP_LINK_CONTINUE, '');

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleDeepLinkContinueStub).to.be.calledWith(true);
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handleSaveChaseOffersFn action when the ${SAVE_CHASE_OFFERS} message is received`, () => {
    createComponent(defaultState);

    const value = { key: 'value' };
    const webViewAction = { type: 'action' };

    handleSaveChaseOffersStub.returns(webViewAction);

    window.swa.webViewMessage(SAVE_CHASE_OFFERS, value);

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleSaveChaseOffersStub).to.be.calledWith(value);
    expect(handleDeepLinkContinueStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should dispatch the handleExternalPaymentAuthorizedFn action when the ${EXTERNAL_PAYMENT_AUTHORIZED} message is received`, () => {
    createComponent(defaultState);

    const value = { key: 'value' };
    const webViewAction = { type: 'action' };

    handleExternalPaymentAuthorizedStub.returns(webViewAction);

    window.swa.webViewMessage(EXTERNAL_PAYMENT_AUTHORIZED, value);

    expect(dispatchStub).to.be.calledWith(webViewAction);
    expect(handleExternalPaymentAuthorizedStub).to.have.been.calledWith(value);
    expect(handleSaveChaseOffersStub).to.be.not.be.called;
    expect(handleDeepLinkContinueStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleRouteChangeStub).to.not.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
  });

  it(`should not dispatch an action when an invalid message is received`, () => {
    createComponent(defaultState);

    window.swa.webViewMessage('INVALID_MESSAGE');

    expect(handleRouteChangeStub).to.not.be.called;
    expect(handleOAuthStub).to.not.be.called;
    expect(handlePaypalAuthStub).to.not.be.called;
    expect(handleChaseSessionStub).to.not.be.called;
    expect(handleNativeApplePayStub).to.not.be.called;
    expect(handleExternalPaymentAuthorizedStub).to.not.be.called;
  });

  it(`should not add is-webview class to the body when isWebView prop is false`, (done) => {
    createComponent(defaultState);

    waitFor.untilAssertPass(() => {
      expect(document.getElementsByClassName('is-webview')).to.have.lengthOf(0);
    }, done);
  });

  it(`should add is-webview class to the body when isWebView prop is true`, (done) => {
    const webViewState = _.cloneDeep(defaultState);

    _.set(webViewState, 'app.webView.isWebView', true);

    const wrapper = createComponent(webViewState);

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { isWebView: true })
    });

    waitFor.untilAssertPass(() => {
      expect(document.getElementsByClassName('is-webview')).to.have.lengthOf(1);
    }, done);
  });

  it(`should remove is-webview class from the body when unmounted`, (done) => {
    const webViewState = _.cloneDeep(defaultState);

    _.set(webViewState, 'app.webView.isWebView', true);

    const wrapper = createComponent(webViewState);

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { isWebView: true })
    });

    wrapper.unmount();

    waitFor.untilAssertPass(() => {
      expect(document.getElementsByClassName('is-webview')).to.have.lengthOf(0);
    }, done);
  });

  it(`should dispatch the handleAuthEvent action only once if ${AUTH_EVENT} message is received twice in a row`, () => {
    createComponent(defaultState);

    const webViewAction = { type: 'action' };

    handleOAuthStub.returns(webViewAction);

    window.swa.webViewMessage(ADD_OAUTH, 'credentials');
    window.swa.webViewMessage(ADD_OAUTH, 'credentials');

    expect(dispatchStub).to.have.been.calledOnce;
    expect(handleOAuthStub).to.have.been.calledOnce;
  });

  function createComponent(state = {}) {
    const defaultProps = {
      history: {
        location: { pathname: '/' }
      }
    };

    const store = { ...mockStore({ dispatch: dispatchStub, state }), subscribe: () => {} };

    const withWebView = proxyquire('src/shared/enhancers/withWebView', {
      'src/shared/actions/webViewActions': {
        handleOAuth: handleOAuthStub,
        handleAuthEvent: handleAuthEventStub,
        handleRouteChange: handleRouteChangeStub,
        setPaypalAuthorized: handlePaypalAuthStub,
        handleNativeApplePay: handleNativeApplePayStub,
        handleChaseSession: handleChaseSessionStub,
        handleDeepLinkContinue: handleDeepLinkContinueStub,
        handleSaveChaseOffers: handleSaveChaseOffersStub,
        handleExternalPaymentAuthorized: handleExternalPaymentAuthorizedStub
      }
    }).default;

    const WithWebView = withWebView(() => <div />);

    return mount(
      <Provider store={store}>
        <WithWebView {...defaultProps} />
      </Provider>
    );
  }
});
