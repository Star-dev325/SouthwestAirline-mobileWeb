import _ from 'lodash';
import React from 'react';
import { sandbox } from 'sinon';
import proxyquire from 'proxyquire';

import { integrationMount } from 'test/unit/helpers/testUtils';
import waitFor from 'test/unit/helpers/waitFor';
import { CHANNEL } from 'src/shared/constants/webViewConstants';

const sinon = sandbox.create();

describe('withPayPal', () => {
  const customSchemePrefix = 'customschemeprefix://';
  const FakeComponent = () => <div />;
  const paypalWebviewEnv = 'http://local.swacorp.com/';
  const paypalWebviewCancelUrl = 'paypal/webview/cancel/url';
  const paypalWebviewSuccessUrl = 'paypal/webview/success/url';
  const storedData = {
    state: {
      app: {
        airBooking: {
          paymentInfo: {}
        },
        formData: {
          SOME_FORM_ID: {
            field: 'value'
          }
        },
        webView: {
          isWebView: true,
          webViewChannel: 'IOS'
        }
      }
    },
    options: {
      foo: 'bar',
      payPal: {
        token: 'FAKE_TOKEN'
      }
    },
    analytics: {
      stores: { airBookingStore: 'analyticsStore' }
    }
  };

  let gotoPayPalSignInFnStub, mockSessionStorage, resumeAppStateFnStub, withPayPal, wrapper;

  beforeEach(() => {
    gotoPayPalSignInFnStub = sinon.stub().returns({ type: 'FAKE_ACTION' });
    mockSessionStorage = sinon.stub().returns(storedData);
    mockSessionStorage.has = sinon.stub();
    mockSessionStorage.remove = sinon.stub();
    resumeAppStateFnStub = sinon.stub().returns({ type: 'FAKE_ACTION' });

    withPayPal = proxyquire('src/shared/enhancers/withPayPal', {
      store2: {
        session: mockSessionStorage
      },
      'src/shared/actions/payPalActions': {
        resumeAppState: resumeAppStateFnStub,
        gotoPayPalSignIn: gotoPayPalSignInFnStub
      },
      'src/shared/config/appConfig': {
        default: {
          PAYPAL_WEBVIEW_ENV: paypalWebviewEnv,
          PAYPAL_WEBVIEW_CANCEL_URL: paypalWebviewCancelUrl,
          PAYPAL_WEBVIEW_RETURN_URL: paypalWebviewSuccessUrl
        }
      },
      'src/shared/helpers/urlHelper': {
        getNormalizedRoute: () => '/air/booking/purchase'
      },
      'src/shared/bootstrap/urls': {
        default: {
          externalPaymentAndroidCustomSchemePrefix: customSchemePrefix
        }
      }
    }).default;
  });

  afterEach(() => {
    sinon.restore();
  });

  context('_shouldResumeData', () => {
    it('should return true when there is PayPal data and the pathname is matched', () => {
      mockSessionStorage.has.returns(true);

      wrapper = createWrappedComponent();
      const shouldResumeDataFn = wrapper.find('FakeComponent').prop('shouldResumeDataFn');

      expect(shouldResumeDataFn()).to.be.true;
    });

    it('should return false when it has no PayPal data', () => {
      mockSessionStorage.has.returns(false);

      wrapper = createWrappedComponent();
      const shouldResumeDataFn = wrapper.find('FakeComponent').prop('shouldResumeDataFn');

      expect(shouldResumeDataFn()).to.be.false;
    });

    it('should return false when the pathname is not match', () => {
      mockSessionStorage.has.returns(true);

      wrapper = createWrappedComponent({ pathnameRegExp: 'wrongPath' });
      const shouldResumeDataFn = wrapper.find('FakeComponent').prop('shouldResumeDataFn');

      expect(shouldResumeDataFn()).to.be.false;
    });

    it('should return true when isWebView is true and webViewPayPalAuthorizedToken is not empty', () => {
      mockSessionStorage.has.returns(true);

      wrapper = createWrappedComponent(
        { pathnameRegExp: 'wrongPath' },
        {},
        { app: { webView: { isWebView: true, webViewPayPalAuthorizedToken: 'FAKE_TOKEN' } } }
      );
      const shouldResumeDataFn = wrapper.find('FakeComponent').prop('shouldResumeDataFn');

      expect(shouldResumeDataFn()).to.be.true;
    });

    it('should return false when isWebView is true and webViewPayPalAuthorizedToken is empty', () => {
      mockSessionStorage.has.returns(true);

      wrapper = createWrappedComponent(
        {},
        {},
        { app: { webView: { isWebView: true, webViewPayPalAuthorizedToken: '' } } }
      );
      const shouldResumeDataFn = wrapper.find('FakeComponent').prop('shouldResumeDataFn');

      expect(shouldResumeDataFn()).to.be.false;
    });
  });

  context('_resumeData', () => {
    it('should loadPayPalData from session storage, dispatch resume actions and deletePayPalData from session storage', (done) => {
      wrapper = createWrappedComponent({ pathname: 'wrongPath' });
      const resumeDataFn = wrapper.find('FakeComponent').prop('resumeDataFn');

      resumeDataFn();

      waitFor.untilAssertPass(() => {
        expect(mockSessionStorage).to.be.called;
        expect(mockSessionStorage.remove).to.be.called;
        expect(resumeAppStateFnStub).to.be.calledWith(storedData.state);
        expect(window.data_a.stores).to.be.deep.equal({ airBookingStore: 'analyticsStore' });
      }, done);
    });

    it('should loadPayPalData from session storage, dispatch resume actions and deletePayPalData from session storage when isWebView is true', (done) => {
      wrapper = createWrappedComponent({ pathname: 'wrongPath' }, {}, { app: { webView: { isWebView: true } } });
      const resumeDataFn = wrapper.find('FakeComponent').prop('resumeDataFn');

      resumeDataFn();

      waitFor.untilAssertPass(() => {
        expect(mockSessionStorage).to.be.called;
        expect(mockSessionStorage.remove).to.be.called;
        expect(resumeAppStateFnStub).to.be.calledWith(storedData.state);
        expect(window.data_a.stores).to.be.deep.equal({ airBookingStore: 'analyticsStore' });
      }, done);
    });

    it('should return true for isFromPayPalAuthorized when isWebView is true and webViewPayPalAuthorizedToken matches stored token', (done) => {
      wrapper = createWrappedComponent(
        { pathname: 'wrongPath' },
        {},
        { app: { webView: { isWebView: true, webViewPayPalAuthorizedToken: 'FAKE_TOKEN' } } }
      );
      const resumeDataFn = wrapper.find('FakeComponent').prop('resumeDataFn');

      let isAuthorized = null;

      resumeDataFn().then(({ isFromPayPalAuthorized }) => {
        isAuthorized = isFromPayPalAuthorized;
      });

      waitFor.untilAssertPass(() => {
        expect(isAuthorized).to.be.true;
      }, done);
    });

    it('should return false for isFromPayPalAuthorized when isWebView is true and webViewPayPalAuthorizedToken does not match stored token', (done) => {
      wrapper = createWrappedComponent(
        { pathname: 'wrongPath' },
        {},
        { app: { webView: { isWebView: true, webViewPayPalAuthorizedToken: 'BAD_TOKEN' } } }
      );
      const resumeDataFn = wrapper.find('FakeComponent').prop('resumeDataFn');

      let isAuthorized = null;

      resumeDataFn().then(({ isFromPayPalAuthorized }) => {
        isAuthorized = isFromPayPalAuthorized;
      });

      waitFor.untilAssertPass(() => {
        expect(isAuthorized).to.be.false;
      }, done);
    });
  });

  context('_shouldGotoPayPalSignIn', () => {
    it('should return true when payment method is PayPal and is not coming back from PalPal', () => {
      wrapper = createWrappedComponent({ pathname: 'wrongPath' });
      const shouldGotoPayPalSignInFn = wrapper.find('FakeComponent').prop('shouldGotoPayPalSignInFn');

      expect(shouldGotoPayPalSignInFn({ selectedCardId: 'PAY_PAL_CARD_ID' })).to.be.true;
    });

    it('should return false when payment method is not PayPal', () => {
      wrapper = createWrappedComponent({ pathname: 'wrongPath' });
      const shouldGotoPayPalSignInFn = wrapper.find('FakeComponent').prop('shouldGotoPayPalSignInFn');

      expect(shouldGotoPayPalSignInFn({ selectedCardId: 'NEW_CREDIT_CARD_ID' })).to.be.false;
    });
  });

  context('_gotoPayPalSignIn', () => {
    const host = 'host';
    const moneyTotalAmount = { currencyCode: 'USD', amount: '10' };
    const moneyTotalValue = { currencyCode: 'USD', value: '10' };
    const protocol = 'http:';
    const pathname = '/relative/path';
    let location;

    beforeEach(() => {
      ({ location } = window);
      global.window = {
        ...window,
        location: {
          host,
          protocol,
          pathname
        }
      };
    });

    afterEach(() => {
      global.window = {
        ...window,
        location
      };
    });

    context('when MWEB', () => {
      it('should use default urls', () => {
        wrapper = createWrappedComponent();
        const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

        gotoPayPalSignInFn(moneyTotalAmount, 'formData');

        expect(gotoPayPalSignInFnStub).to.have.been.called;
        expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal({
          tokenRequest: {
            totalFare: moneyTotalValue,
            redirectURLs: {
              cancelURL: `${protocol}//${host}${pathname}/paypal-canceled`,
              returnURL: `${protocol}//${host}${pathname}/paypal`
            }
          }
        });
        expect(gotoPayPalSignInFnStub.args[0][2]).to.deep.equal({ formData: 'formData' });
        expect(gotoPayPalSignInFnStub.args[0][3]).to.deep.equal(true);
      });
    });

    context('when isWebView', () => {
      context('when webViewChannel', () => {
        const { ANDROID, IOS } = CHANNEL;

        context(`is ${IOS}`, () => {
          const iOSWebViewState = {
            app: { webView: { isWebView: true, webViewChannel: 'IOS', webViewPayPalAuthorizedToken: 'FAKE_TOKEN' } }
          };
          const iOSExpectedTokenRequest = {
            tokenRequest: {
              totalFare: moneyTotalValue,
              redirectURLs: {
                cancelURL: `${paypalWebviewEnv}${paypalWebviewCancelUrl}`,
                returnURL: `${paypalWebviewEnv}${paypalWebviewSuccessUrl}`
              }
            }
          };

          it(`should use ${IOS} urls for path /air/booking/purchase`, () => {
            global.window = {
              ...window,
              location: {
                pathname: '/air/booking/purchase'
              }
            };
            wrapper = createWrappedComponent({}, {}, iOSWebViewState);
            const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

            gotoPayPalSignInFn(moneyTotalAmount, 'formData');

            expect(gotoPayPalSignInFnStub).to.have.been.called;
            expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal(iOSExpectedTokenRequest);
            expect(gotoPayPalSignInFnStub.args[0][2]).to.deep.equal({ formData: 'formData' });
            expect(gotoPayPalSignInFnStub.args[0][3]).to.deep.equal(true);
          });

          it(`should use ${IOS} urls for path /air/change/pricing/review`, () => {
            global.window = {
              ...window,
              location: {
                pathname: '/air/change/pricing/review'
              }
            };
            wrapper = createWrappedComponent({}, {}, iOSWebViewState);
            const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

            gotoPayPalSignInFn(moneyTotalAmount, 'formData');

            expect(gotoPayPalSignInFnStub).to.have.been.called;
            expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal(iOSExpectedTokenRequest);
            expect(gotoPayPalSignInFnStub.args[0][2]).to.deep.equal({ formData: 'formData' });
            expect(gotoPayPalSignInFnStub.args[0][3]).to.deep.equal(true);
          });

          it(`should use ${IOS} urls for path /upgraded-boarding/purchase`, () => {
            global.window = {
              ...window,
              location: {
                pathname: '/upgraded-boarding/purchase'
              }
            };
            wrapper = createWrappedComponent({}, {}, iOSWebViewState);
            const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

            gotoPayPalSignInFn(moneyTotalAmount, 'formData');

            expect(gotoPayPalSignInFnStub).to.have.been.called;
            expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal(iOSExpectedTokenRequest);
            expect(gotoPayPalSignInFnStub).to.have.been.calledWith(
              iOSExpectedTokenRequest,
              sinon.match.any,
              { formData: 'formData' },
              true
            );
          });
        });

        context(`is ${ANDROID}`, () => {
          const androidWebViewState = {
            app: { webView: { isWebView: true, webViewChannel: 'ANDROID', webViewPayPalAuthorizedToken: 'FAKE_TOKEN' } }
          };
          const androidExpectedTokenRequest = {
            tokenRequest: {
              totalFare: moneyTotalValue,
              redirectURLs: {
                cancelURL: `${customSchemePrefix}${paypalWebviewCancelUrl}`,
                returnURL: `${customSchemePrefix}${paypalWebviewSuccessUrl}`
              }
            }
          };

          it(`should use ${ANDROID} urls for path /air/booking/purchase`, () => {
            global.window = {
              ...window,
              location: {
                pathname: '/air/booking/purchase'
              }
            };
            wrapper = createWrappedComponent({}, {}, androidWebViewState);
            const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

            gotoPayPalSignInFn(moneyTotalAmount, 'formData');
            expect(gotoPayPalSignInFnStub).to.have.been.called;
            expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal(androidExpectedTokenRequest);
            expect(gotoPayPalSignInFnStub.args[0][2]).to.deep.equal({ formData: 'formData' });
            expect(gotoPayPalSignInFnStub.args[0][3]).to.deep.equal(true);
          });

          it(`should use ${ANDROID} urls for path /air/change/pricing/review`, () => {
            global.window = {
              ...window,
              location: {
                pathname: '/air/change/pricing/review'
              }
            };
            wrapper = createWrappedComponent({}, {}, androidWebViewState);
            const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

            gotoPayPalSignInFn(moneyTotalAmount, 'formData');

            expect(gotoPayPalSignInFnStub).to.have.been.called;
            expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal(androidExpectedTokenRequest);
            expect(gotoPayPalSignInFnStub.args[0][2]).to.deep.equal({ formData: 'formData' });
            expect(gotoPayPalSignInFnStub.args[0][3]).to.deep.equal(true);
          });

          it(`should use ${ANDROID} urls for path /upgraded-boarding/purchase`, () => {
            global.window = {
              ...window,
              location: {
                pathname: '/upgraded-boarding/purchase'
              }
            };
            wrapper = createWrappedComponent({}, {}, androidWebViewState);
            const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

            gotoPayPalSignInFn(moneyTotalAmount, 'formData');

            expect(gotoPayPalSignInFnStub).to.have.been.called;
            expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal(androidExpectedTokenRequest);
            expect(gotoPayPalSignInFnStub).to.have.been.calledWith(
              androidExpectedTokenRequest,
              sinon.match.any,
              { formData: 'formData' },
              true
            );
          });
        });
      });

      it('should use default urls for a non-registered path', () => {
        wrapper = createWrappedComponent(
          {},
          {},
          { app: { webView: { isWebView: true, webViewPayPalAuthorizedToken: 'FAKE_TOKEN' } } }
        );
        const gotoPayPalSignInFn = wrapper.find('FakeComponent').prop('gotoPayPalSignInFn');

        gotoPayPalSignInFn(moneyTotalAmount, 'formData');

        expect(gotoPayPalSignInFnStub).to.have.been.called;
        expect(gotoPayPalSignInFnStub.args[0][0]).to.deep.equal({
          tokenRequest: {
            totalFare: { value: '10', currencyCode: 'USD' },
            redirectURLs: {
              cancelURL: `${protocol}//${host}${pathname}/paypal-canceled`,
              returnURL: `${protocol}//${host}${pathname}/paypal`
            }
          }
        });
        expect(gotoPayPalSignInFnStub).to.have.been.calledWith(
          {
            tokenRequest: {
              redirectURLs: {
                cancelURL: `${protocol}//${host}${pathname}/paypal-canceled`,
                returnURL: `${protocol}//${host}${pathname}/paypal`
              },
              totalFare: moneyTotalValue
            }
          },
          sinon.match.any,
          { formData: 'formData' },
          true
        );
      });
    });
  });

  function createWrappedComponent(
    options = { pathnameRegExp: '/earlybird/checkin/[0-9A-Z]{6}/review/paypal' },
    props = {},
    newState = {}
  ) {
    const defaultProps = {
      history: {
        location: {
          pathname: '/earlybird/checkin/UFOXPU/review/paypal'
        }
      }
    };
    const defaultState = { app: { account: { isLoggedIn: true } } };
    const state = _.merge({}, defaultState, newState);

    const WithPayPal = withPayPal(options)(FakeComponent);

    return integrationMount()(state, WithPayPal, { ...defaultProps, ...props });
  }
});
