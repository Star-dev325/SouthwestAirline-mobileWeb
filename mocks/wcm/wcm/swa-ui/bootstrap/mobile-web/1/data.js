/* eslint-disable */
require = (function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (var u = 'function' == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [function (require, module, exports) {}, {}],
    'swa-bootstrap-mobile-web/app-settings/mobile-web-app-settings': [
      function (require, module, exports) {
        module.exports = {
          default: {
            corporateInfoTimeOutMin: 5,
            accountInfoTimeOutMin: 1,
            mWebAdobeTargetTimeOutMS: 5000,
            nativeSessionTimeOutMin: 10080,
            rrMinAgeThreshold: 13,
            locationSettings: {
              locationCacheTimeoutMins: 1440
            },
            carBookingMaxDaysOut: 330,
            externalPaymentRedirectUrlWhitelist: {
              airBooking: '/air/booking/review'
            },
            hotStateTimeOutMin: 30
          }
        };
      },
      {}
    ],
    'swa-bootstrap-mobile-web/ceptor-uatp-settings': [
      function (require, module, exports) {
        module.exports = {
          ceptorConfig: {
            requestedAFPParams: {
              language: 'us',
              currency: 'USD',
              paymentMethodConfigParams: [
                {
                  provider: 'CPD',
                  paymentMethod: 'ApplePay',
                  config: {
                    accountId: 100850,
                    clientId: 10085,
                    transactionTypeId: 30,
                    applePayCardTypeId: 15,
                    hostUrl: 'https://uatp7.uat-01.cellpointmobile.net',
                    version: '1.00',
                    countryId: 200,
                    platform: 'HTML5/1.00'
                  }
                },
                {
                  provider: 'UPLIFT',
                  paymentMethod: 'PayMonthly',
                  config: {
                    container: '#uplift-iframe',
                    checkout: false
                  }
                }
              ]
            },
            ceptorConfigParams: {
              uatpAirlineIdentifier: 'WN',
              uatpHostUrl: 'https://ceptorqa.uatp.com/api'
            }
          },
          upliftTimeToTravelHoursLimit: 24,
          upliftPaxAgeLimit: 18,
          errorAFPCodesToDisplay: ['811', '813']
        };
      },
      {}
    ],
    'swa-bootstrap-mobile-web/chase-ttl-config': [
      function (require, module, exports) {
        module.exports = [
          {
            ttlInSeconds: 3600,
            type: 'offers'
          },
          {
            ttlInSeconds: 3600,
            type: 'no_offers'
          },
          {
            ttlInSeconds: 86400,
            type: 'foc'
          }
        ];
      },
      {}
    ],
    'swa-bootstrap-mobile-web/error-code-map': [
      function (require, module, exports) {
        module.exports = {
          '400518002': 'ERR_ACCOUNT_DISABLED',
          '400518024': 'ERR_USERNAME_PASSWORD_INCORRECT',
          '400518148': 'ERR_ACCOUNT_NUMBER_LONG',
          '400518329': 'ERR_PASSWORD_NOT_SET',
          '400618201': 'ERR_USERNAME_PASSWORD_INCORRECT',
          '400618202': 'ERR_MAXIMUM_TRIES',
          '400618205': 'ERR_USERNAME_PASSWORD_INCORRECT',
          '401615399': 'ERR_SESSION_TIMEOUT'
        };
      },
      {}
    ],
    'swa-bootstrap-mobile-web/i18n-override': [
      function (require, module, exports) {
        module.exports = {
          ERR_ACCOUNT_DISABLED: 'This account is closed and any associated points are no longer available for use.',
          ERROR__NO_ROUTES_EXISTS_HEADER: 'Sorry, No flights available.',
          ERROR__NO_ROUTES_EXISTS: 'Weâ€™d love to get you there, but this route cannot be booked online.'
        };
      },
      {}
    ],
    'swa-bootstrap-mobile-web/payment-option-order': [
      function (require, module, exports) {
        module.exports = ['UPLIFT', 'APPLE_PAY', 'PAYPAL', 'SAVED_CREDIT_CARD', 'CHASE_INSTANT_RR_VISA'];
      },
      {}
    ],
    'swa-bootstrap-mobile-web/urls': [
      function (require, module, exports) {
        module.exports = {
          clickNSaveSignUpIframeUrl: '/iframe/iFramePlaceholder.html',
          paypalUrl: 'https://www.sandbox.paypal.com/webscr?cmd=_express-checkout&useraction=commit',
          externalPaymentIOSCustomSchemePrefix: 'swaExternalPaymentRedirect://',
          entertainmentPortalUrl: 'https://getconnected.southwestwifi.com/images/s-w-logo.png',
          externalPaymentDeepLinkUrl: '/redirect/hybrid/payment/external',
          externalPaymentAndroidCustomSchemePrefix: 'swaexternalpaymentredirect://',
          chaseEmailOfferTargetUrl: 'https://chase-tools.dev1.southwest.com/chase/simulator/?REF=MWEB',
          lapChildFAQ: 'https://www.southwest.com/help/additional-travel-accommodations/lap-child-policy',
          trackBagsHelpCenterUrl: 'https://www.southwest.com/help/baggage/checked-baggage',
        };
      },
      {}
    ]
  },
  {},
  [1]
);
