this["mwebAppConfig"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ({

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  LUV_API: 'https://luv.southwest.com',
  CAR_API: '/api/car-reservations/',
  CHAPI_AIR_OPERATIONS: '/api/mobile-air-operations/',
  CHAPI_AIR_BOOKING: '/api/mobile-air-booking/',
  CHAPI_AIR_SHOPPING: '/api/mobile-air-shopping/',
  CHAPI_MISC: '/api/mobile-misc/',
  CONTENT_API: '/api/content-delivery/',
  SECURITY_API: '/api/security/',
  LOGGING_API: '/api/logging/',
  API_KEY: 'l7xxa0e90ad37a4441979953e8207e32bde7',
  IOS_API_KEY: 'l7xxd690c2dcabf84b8fa29a3cfad29e0c00',
  IOS_API_CHANNEL: 'IOS',
  IOS_API_CORPORATE_CHANNEL: 'IOS_CORP',
  OAUTH_CLIENT_ID_COOKIE: 'fcc7ce27-d185-441d-bff7-f07a1ca6f6b9',
  OAUTH_CLIENT_ID_CORPORATE: 'adc0e9b5-0e75-4a1c-87de-b26fec92c3ff',
  OAUTH_CLIENT_ID_CORPORATE_COOKIE: 'b1b931ca-b288-437a-9264-564c7a7bb1a6',
  ANALYTICS_URL: '/content/app/scripts/analytics/analytics.js',
  USER_CAN_CHANGE_TOGGLES: true,
  BRANCH_KEY: 'key_test_kiCmZHbV9GYaXUX4au1dMeoewweY08T9',
  API_GATEWAY_CHASE_API: '/api/chase/',
  PAYPAL_WEBVIEW_ENV: 'https://mobile.itest2.southwest.com/',
  PAYPAL_WEBVIEW_CANCEL_URL: 'redirect/hybrid/paypal/cancel',
  PAYPAL_WEBVIEW_RETURN_URL: 'redirect/hybrid/paypal/success',
  SWA_VACATIONS_URL: 'https://res.southwestvacations.com/search/ExternalFormPost.aspx?cmpid=SWA-INPATH',
  CEPTOR_SITE: 'mobile.itest2.southwest.com',
  CEPTOR_ENV: 'dev',
  APP_ENV: 'dev',
  CHATBOT_BASE_LIVE_AGENT_CONTENT_URL: 'https://c.la1-c1cs-iad.salesforceliveagent.com/content',
  CHATBOT_BASE_LIVE_AGENT_URL: 'https://d.la1-c1cs-iad.salesforceliveagent.com/chat',
  CHATBOT_BUTTON_ID: '5730v0000004Dtl',
  CHATBOT_DEPLOYMENT_ID: '5720v0000004DXv',
  CHATBOT_ESW_LIVE_AGENT_DEV_NAME: 'EmbeddedServiceLiveAgent_Parent04I0v0000008OUzEAM_1754bf9c45e',
  CHATBOT_ORG_ENDPOINT: 'https://config4-swacssinternal.cs66.force.com/connect',
  CHATBOT_ORG_URL: 'https://swac360--config4.my.salesforce.com',
  CHATBOT_ORG_ID: '00D0v000000E32k',
  CHATBOT_EMBEDDED_WINDOW_URL: 'https://swac360--config4.my.salesforce.com/embeddedservice/5.0/esw.min.js'
};

/***/ })

/******/ });
//# sourceMappingURL=config.js.map