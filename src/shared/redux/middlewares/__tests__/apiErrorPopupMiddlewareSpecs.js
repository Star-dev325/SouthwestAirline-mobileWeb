import sinonModule from 'sinon';
import apiErrorPopupMiddleware from 'src/shared/redux/middlewares/apiErrorPopupMiddleware';
import AccessTokenExpiredError from 'src/shared/errors/accessTokenExpiredError';
import UserNotLoginError from 'src/shared/errors/userNotLoginError';
import * as SharedActions from 'src/shared/actions/sharedActions';
import * as WebViewActions from 'src/shared/actions/webViewActions';
import * as WebViewHelper from 'src/shared/helpers/webViewHelper';
import * as ErrorCodesHelper from 'src/shared/helpers/errorCodesHelper';
import * as HttpErrorTransformer from 'src/shared/transformers/httpErrorTransformer';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as AccountActions from 'src/shared/actions/accountActions';
import i18n from '@swa-ui/locale';

const sinon = sinonModule.sandbox.create();

describe('apiErrorPopupMiddleware', () => {
  const store = {};
  const mockAction = { type: 'mock type', error: 'error' };
  const mockErrorPopUpAction = { type: 'showErrorPopUp' };
  const mockNativeAppLoginAction = { type: 'showNativeAppLogin' };
  let isAuthenticationErrorStub;

  beforeEach(() => {
    store.dispatch = sinon.stub();
    store.getState = sinon.stub();
    sinon.stub(SharedActions, 'showErrorPopUp').returns(mockErrorPopUpAction);
    sinon.stub(WebViewActions, 'showNativeAppLogin').returns(mockNativeAppLoginAction);
    sinon.stub(HttpErrorTransformer, 'transformToHttpRequestError').returns({});

    isAuthenticationErrorStub = sinon.stub(ErrorCodesHelper, 'isAuthenticationError');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should dispatch showNativeAppLogin action when in a webview and is authentication error', () => {
    store.getState = sinon.stub().returns({ app: { webView: { isWebView: true } } });
    isAuthenticationErrorStub.returns(true);

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(store.dispatch.args[0][0]).to.equal(mockNativeAppLoginAction);
    expect(store.dispatch.args[1][0]).to.equal(mockAction);
  });

  it('should not dispatch showNativeAppLogin action when not in a webview', () => {
    store.getState = sinon.stub().returns({ app: { webView: { isWebView: false } } });
    isAuthenticationErrorStub.returns(true);

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(store.dispatch).to.have.not.been.calledWith(mockNativeAppLoginAction);
    expect(store.dispatch).to.have.been.calledWith(mockAction);
  });

  it('should not dispatch showNativeAppLogin action when not an authentication error', () => {
    store.getState = sinon.stub().returns({ app: { webView: { isWebView: true } } });
    isAuthenticationErrorStub.returns(false);

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(store.dispatch).to.have.not.been.calledWith(mockNativeAppLoginAction);
    expect(store.dispatch).to.have.been.calledWith(mockAction);
  });

  it('should dispatch showErrorPopUp action when action contain error', () => {
    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(store.dispatch.args[0][0]).to.equal(mockErrorPopUpAction);
    expect(store.dispatch.args[1][0]).to.equal(mockAction);
  });

  it('should not dispatch showErrorPopUp action if dialog is already active', () => {
    store.getState = sinon.stub().returns({ app: { dialog: { active: true } } });
    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(store.dispatch).to.have.not.been.calledWith(mockErrorPopUpAction);
    expect(store.dispatch).to.have.been.calledWith(mockAction);
  });

  it('should not trigger showErrorPopUp action when error has $customized', () => {
    const error = 'some error';
    const mockAction = { error: { errorMessage: error, $customized: true } };

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(store.dispatch).to.have.not.been.calledWith(mockErrorPopUpAction);
    expect(store.dispatch).to.have.been.calledWith(mockAction);
  });

  it('should not trigger showErrorPopUp action when get api failed without error message', () => {
    const mockAction = { type: 'CALL_API_FAILED' };

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(store.dispatch).to.have.not.been.calledWith(mockErrorPopUpAction);
    expect(store.dispatch).to.have.been.calledWith(mockAction);
  });

  it('should not trigger showErrorPopUp action when in webview on blank page', () => {
    store.getState = sinon.stub().returns({ app: { webView: { isWebView: true } } });

    const getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    const isBlankPageStub = sinon.stub(WebViewHelper, 'isBlankPage').returns(true);

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(getCurrentRouteStateStub).to.have.been.called;
    expect(isBlankPageStub).to.have.been.called;

    expect(store.dispatch).to.have.not.been.calledWith(mockErrorPopUpAction);
    expect(store.dispatch).to.have.been.calledWith(mockAction);
  });

  it('should not trigger showErrorPopUp action when shouldHideError is true', () => {
    store.getState = sinon.stub().returns({ app: { webView: { isWebView: true } } });

    const getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    const isBlankPageStub = sinon.stub(WebViewHelper, 'isBlankPage').returns(false);

    const action = { ...mockAction, shouldHideError: true };

    apiErrorPopupMiddleware(store)(store.dispatch)(action);

    expect(getCurrentRouteStateStub).to.have.been.called;
    expect(isBlankPageStub).to.have.been.called;

    expect(store.dispatch).to.have.not.been.calledWith(mockErrorPopUpAction);
    expect(store.dispatch).to.have.been.calledWith(action);
  });

  it('should trigger showErrorPopUp action when shouldHideError is false', () => {
    store.getState = sinon.stub().returns({ app: { webView: { isWebView: true } } });

    const getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    const isBlankPageStub = sinon.stub(WebViewHelper, 'isBlankPage').returns(false);

    const action = { ...mockAction, shouldHideError: false };

    apiErrorPopupMiddleware(store)(store.dispatch)(action);

    expect(getCurrentRouteStateStub).to.have.been.called;
    expect(isBlankPageStub).to.have.been.called;

    expect(store.dispatch.args[0][0]).to.equal(mockErrorPopUpAction);
    expect(store.dispatch.args[1][0]).to.equal(action);
  });

  it('should trigger showErrorPopUp action when in a webview and not on blank page', () => {
    store.getState = sinon.stub().returns({ app: { webView: { isWebView: true } } });

    const getCurrentRouteStateStub = sinon.stub(RouteStateHelper, 'getCurrentRouteState');
    const isBlankPageStub = sinon.stub(WebViewHelper, 'isBlankPage').returns(false);

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(getCurrentRouteStateStub).to.have.been.called;
    expect(isBlankPageStub).to.have.been.called;

    expect(store.dispatch.args[0][0]).to.equal(mockErrorPopUpAction);
    expect(store.dispatch.args[1][0]).to.equal(mockAction);
  });

  it('should use corporate session expired message when AccessTokenExpiredError is received and isCorporate is set', () => {
    const mockAction = { type: 'mock type', error: new AccessTokenExpiredError(true) };

    store.getState = sinon.stub().returns({});

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(SharedActions.showErrorPopUp.args[0][0].message).to.equal(i18n('ERROR__CORPORATE_SESSION_EXPIRED'));
    expect(SharedActions.showErrorPopUp.args[0][1]).to.be.false;
  });

  it('should use corporate session expired message when UserNotLoggedIn error is received and there is a selected company', () => {
    const mockAction = { type: 'mock type', error: new UserNotLoginError() };

    store.getState = sinon.stub().returns({
      app: {
        account: {
          corporateInfo: { selectedCompany: { companyName: 'Dunder Mifflin Paper Company', companyId: '99999999' } }
        }
      }
    });

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(SharedActions.showErrorPopUp.args[0][0].message).to.equal(i18n('ERROR__CORPORATE_SESSION_EXPIRED'));
  });

  it('should suppress AccessTokenExpiredError popup on fresh load of homepage and clean up session', () => {
    const mockAction = { type: 'mock type', error: new AccessTokenExpiredError() };
    const cleanUpSessionStub = sinon.stub(AccountActions, 'cleanUpEndOfSession');

    sinon.stub(RouteStateHelper, 'getCurrentRouteState').returns({
      action: 'POP',
      pathname: '/'
    });

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(cleanUpSessionStub).to.be.called;
  });

  it('should suppress UserNotLoginError popup on fresh load of homepage and clean up session', () => {
    const mockAction = { type: 'mock type', error: new UserNotLoginError() };
    const cleanUpSessionStub = sinon.stub(AccountActions, 'cleanUpEndOfSession');

    sinon.stub(RouteStateHelper, 'getCurrentRouteState').returns({
      action: null,
      pathname: '/'
    });

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(cleanUpSessionStub).to.be.called;
  });

  it('should not suppress popup on fresh load of homepage and other error', () => {
    const mockAction = { type: 'mock type', error: 'error' };
    const cleanUpSessionStub = sinon.stub(AccountActions, 'cleanUpEndOfSession');

    sinon.stub(RouteStateHelper, 'getCurrentRouteState').returns({
      action: null,
      pathname: '/'
    });

    apiErrorPopupMiddleware(store)(store.dispatch)(mockAction);

    expect(cleanUpSessionStub).to.not.be.called;
  });

  it('should call showErrorPopUp with redirect to home page', () => {
    const mockError = { errorCode: 'error' };
    const shouldRedirectToHomePageStub = sinon.stub().returns(true);
    const errorAction = {
      type: 'Test',
      error: mockError, 
      shouldRedirectToHomePage: shouldRedirectToHomePageStub
    };

    apiErrorPopupMiddleware(store)(store.dispatch)(errorAction);

    expect(SharedActions.showErrorPopUp).to.have.been.calledWith(mockError, true);
  });

  it('should call shouldRedirectToHomePage with state and error', () => {
    const mockError = { errorCode: 'error' };
    const mockState = { test: 'test' };
    const shouldRedirectToHomePageStub = sinon.stub().returns(true);
    const errorAction = {
      type: 'Test',
      error: mockError,
      shouldRedirectToHomePage: shouldRedirectToHomePageStub
    };

    store.getState = sinon.stub().returns(mockState);
    
    apiErrorPopupMiddleware(store)(store.dispatch)(errorAction);

    expect(shouldRedirectToHomePageStub).to.have.been.calledWith(mockState, mockError);
  });
});
