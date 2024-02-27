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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  LUV_API: 'https://luv.southwest.com',
  CAR_API: '/api/car-reservations/',
  CHAPI_MISC: '/api/mobile-misc/',
  CHAPI_AIR_OPERATIONS: '/api/mobile-air-operations/',
  CHAPI_AIR_BOOKING: '/api/mobile-air-booking/',
  CHAPI_AIR_SHOPPING: '/api/mobile-air-shopping/',
  SECURITY_API: '/api/security/',
  LOGGING_API: '/api/logging/',
  OAUTH_CLIENT_ID_COOKIE: '528294d5-a159-46a2-a547-33eacf0425d2',
  OAUTH_CLIENT_ID_CORPORATE: '3f942c06-415a-4202-900f-4a78d4966a10',
  OAUTH_CLIENT_ID_CORPORATE_COOKIE: '1575f85a-1542-4d0f-871b-de2927212f81',
  CONTENT_API: '/api/content-delivery/',
  API_KEY: 'l7xx2c186c1297274b828b1872e22edfe67a',
  IOS_API_KEY: 'l7xxd90ee09777e84da2bf5de6d38b7dedd6',
  IOS_API_CHANNEL: 'IOS',
  IOS_API_CORPORATE_CHANNEL: 'IOS_CORP',
  ANALYTICS_URL: '/content/app/scripts/analytics/analytics.js',
  USER_CAN_CHANGE_TOGGLES: false,
  BRANCH_KEY: 'key_live_giugWIpIXUYa4N52lEYdgbcfDyg004TU',
  API_GATEWAY_CHASE_API: '/api/chase/',
  PAYPAL_WEBVIEW_ENV: 'https://www.southwest.com/',
  PAYPAL_WEBVIEW_CANCEL_URL: 'redirect/hybrid/paypal/cancel',
  PAYPAL_WEBVIEW_RETURN_URL: 'redirect/hybrid/paypal/success',
  SWA_VACATIONS_URL: 'https://res.southwestvacations.com/search/ExternalFormPost.aspx?cmpid=SWA-INPATH',
  CEPTOR_SITE: 'mobile.southwest.com',
  CEPTOR_ENV: 'prod',
  APP_ENV: 'prod',
  CHATBOT_BASE_LIVE_AGENT_CONTENT_URL: 'https://c.la3-c2-ia4.salesforceliveagent.com/content',
  CHATBOT_BASE_LIVE_AGENT_URL: 'https://d.la3-c2-ia4.salesforceliveagent.com/chat',
  CHATBOT_BUTTON_ID: '5735G000000Qyhf',
  CHATBOT_DEPLOYMENT_ID: '5725G000000Qzlr',
  CHATBOT_ESW_LIVE_AGENT_DEV_NAME: 'EmbeddedServiceLiveAgent_Parent04I5G0000008UsyUAE_17aad2b25d2',
  CHATBOT_ORG_ENDPOINT: 'https://support.southwest.com/email-us',
  CHATBOT_ORG_URL: 'https://swac360.my.salesforce.com',
  CHATBOT_ORG_ID: '00Df40000003k1z',
  CHATBOT_EMBEDDED_WINDOW_URL: 'https://swac360.my.salesforce.com/embeddedservice/5.0/esw.min.js'
};

/***/ })

/******/ });
//# sourceMappingURL=config.js.map