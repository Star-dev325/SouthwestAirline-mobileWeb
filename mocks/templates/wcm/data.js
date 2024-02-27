/* eslint-disable */
module.exports = ({ mockServerDomain, applePayMockServerPort, payPalMockServerPort }) => `
require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],"swa-bootstrap-mobile-web/app-settings/mobile-web-app-settings":[function(require,module,exports){
module.exports = {
    "default": {
        "locationSettings": {
            "locationCacheTimeoutMins": 1440
        }
    }
};
},{}],"swa-bootstrap-mobile-web/ceptor-uatp-settings":[function(require,module,exports){
module.exports = {
    "ceptorConfig": {
        "requestedAFPParams": {
            "language": "us",
            "currency": "USD",
            "paymentMethodConfigParams": [
                {
                    "provider": "CPD",
                    "paymentMethod": "ApplePay",
                    "config": {
                        "accountId": 100850,
                        "clientId": 10085,
                        "transactionTypeId": 30,
                        "applePayCardTypeId": 15,
                        "hostUrl": "https://uatp7.uat-01.cellpointmobile.net",
                        "version": "1.00",
                        "countryId": 200,
                        "platform": "HTML5/1.00"
                    }
                },
                {
                    "provider": "UPLIFT",
                    "paymentMethod": "PayMonthly",
                    "config": {
                        "container": "#uplift-iframe",
                        "checkout": false
                    }
                }
            ]
        },
        "ceptorConfigParams": {
            "uatpAirlineIdentifier": "WN",
            "uatpHostUrl": "http://${mockServerDomain}:${applePayMockServerPort}/ceptorJS"
        }
    },
    "upliftTimeToTravelHoursLimit": 24,
    "upliftPaxAgeLimit": 18,
    "errorAFPCodesToDisplay": [
        "811",
        "813"
    ]
};
},{}],"swa-bootstrap-mobile-web/chase-ttl-config":[function(require,module,exports){
module.exports = [
    {
        "ttlInSeconds": 7200,
        "type": "offers"
    },
    {
        "ttlInSeconds": 7200,
        "type": "no_offers"
    },
    {
        "ttlInSeconds": 86400,
        "type": "foc"
    }
];
},{}],"swa-bootstrap-mobile-web/error-code-map":[function(require,module,exports){
module.exports = {
    "400518002": "ERR_ACCOUNT_DISABLED",
    "400518024": "ERR_USERNAME_PASSWORD_INCORRECT",
    "400518148": "ERR_ACCOUNT_NUMBER_LONG",
    "400518329": "ERR_PASSWORD_NOT_SET",
    "400618201": "ERR_USERNAME_PASSWORD_INCORRECT",
    "400618202": "ERR_MAXIMUM_TRIES",
    "400618205": "ERR_USERNAME_PASSWORD_INCORRECT",
    "401615399": "ERR_SESSION_TIMEOUT",
    "applePayErrorCodes": {
        "400310564": "ERR_GENDER_IS_MISSING",
        "400310588": "ERR_INVALID_STATE_CODE",
        "400310631": "ERR_INVALID_KTN_FORMAT ",
        "400310654": "ERR_BOUND_REFERENCE_TIMEOUT_IN_CHANGEFLOW_TRYING_TO_CONFIRM",
        "400310709": "ERR_ALL_PASSENGERS_ARE_CONSIDERED_YT",
        "400310710": "ERR_ALL_PASSENGERS_ARE_CONSIDERED_UM",
        "400310764": "ERR_ALL_PASSENGERS_ARE_UNDER_5YEARS_OLD",
        "400310793": "ERR_INVALID_CONTACT_PHONENUMBER_IS_PROVIDED",
        "400310830": "ERR_PAYMENT_SOLUTION_ERRORS"
    }
};
},{}],"swa-bootstrap-mobile-web/i18n-override":[function(require,module,exports){
module.exports = {};
},{}],"swa-bootstrap-mobile-web/payment-option-order":[function(require,module,exports){
module.exports = [
    "UPLIFT",
    "APPLE_PAY",
    "PAYPAL",
    "SAVED_CREDIT_CARD",
    "CHASE_INSTANT_RR_VISA"
];
},{}],"swa-bootstrap-mobile-web/urls":[function(require,module,exports){
module.exports = {
    "clickNSaveSignUpIframeUrl": "https://t.iluv.southwest.com/webApp/swaClickSaveOptIn?lang=&target=iframe",
    "paypalUrl": "http://${mockServerDomain}:${payPalMockServerPort}/webscr?cmd=_express-checkout&useraction=commit",
    "externalPaymentIOSCustomSchemePrefix": "swaExternalPaymentRedirect://",
    "entertainmentPortalUrl": "https://getconnected.southwestwifi.com/images/s-w-logo.png",
    "externalPaymentDeepLinkUrl": "/redirect/hybrid/payment/external",
    "externalPaymentAndroidCustomSchemePrefix": "swaexternalpaymentredirect://",
    "chaseEmailOfferTargetUrl": "https://chase-tools.dev1.southwest.com/chase/simulator/?REF=MWEB"
};
},{}],"swa-bootstrap-mobile-web/webview-routes":[function(require,module,exports){
module.exports = {
    "gift-card": {
        "/gift-card": "/gift-card",
        "/blank": "/gift-card/blank"
    },
    "mobile-web": {
        "/car/booking": "/car/booking",
        "/air/upgrade": "/air/upgrade",
        "/home/offers": "/home/offers",
        "/blank": "/blank",
        "/upgraded-boarding/confirmation": "/upgraded-boarding/confirmation",
        "/air/booking/shopping/adult/outbound/results": "/air/booking/shopping/adult/outbound/results",
        "/flight-status": "/flight-status",
        "/upgraded-boarding": "/upgraded-boarding",
        "/upgraded-boarding/purchase": "/upgraded-boarding/purchase",
        "/contact-tracing": "/contact-tracing",
        "/travel-funds/look-up": "/travel-funds/look-up",
        "/air/booking/shopping": "/air/booking/shopping",
        "/air/upgrade/select-bounds": "/air/upgrade/select-bounds"
    },
    "loyalty-myaccount-v2": {
        "/loyalty/myaccount/payment": "/loyalty/myaccount/payment",
        "/loyalty/myaccount/profile": "/loyalty/myaccount/profile",
        "/loyalty/myaccount/rapid-rewards": "/loyalty/myaccount/rapid-rewards",
        "/loyalty/myaccount/blank": "/loyalty/myaccount/blank",
        "/loyalty/myaccount/trips": "/loyalty/myaccount/trips"
    }
};
},{}]},{},[1]);
`;
