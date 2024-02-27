/* eslint-disable prefer-arrow-callback */
'use strict';
const _ = require('lodash');

const Analytics = require('test/e2e/analytics/analytics');
const { OAUTH_LOGIN_STATUS, WEB_VIEW_API_KEY, WEB_VIEW_CHANNEL } = require('src/shared/helpers/storageKeys').default;
const { NATIVE_FUNCTIONS } = require('src/shared/constants/webViewConstants');

const WEBVIEW_MESSAGE_KEYS = {
  ADD_OAUTH: "ADD_OAUTH",
  REMOVE_OAUTH: "REMOVE_OAUTH",
  ROUTE_CHANGE: "ROUTE_CHANGE"
};

const { ADD_OAUTH, REMOVE_OAUTH, ROUTE_CHANGE } = WEBVIEW_MESSAGE_KEYS;
const { EXIT, PAGE_RENDERED } = NATIVE_FUNCTIONS;

let page, route;

const apiKey = 'api-key-value';
const channel = 'channel-value';
const deviceType = 'device-type-value';

const stub_prefix = '_stub';
const ios = '_ios_';
const android = '_android_';

const setWindowStubs = (client) => {
  client
    .execute(function(stub_prefix, ios, android, keys) {
      _.each(keys, key => {
        const androidStub = function(val) { _.set(window, `${stub_prefix}${android}${key}`, val); };
        const iosStub = function(val) { _.set(window, `${stub_prefix}${ios}${key}`, val); };

        _.set(window, `AndroidInterface.${key}`, androidStub);
        _.set(window, `webkit.messageHandlers.${key}.postMessage`, iosStub);
      });
    }, [stub_prefix, ios, android, [EXIT, PAGE_RENDERED]]);
};

const sendMessage = (client, key, value) => {
  client
    .execute(function(key, value) {
      window.swa.webViewMessage(key, value);
    }, [key, value]);
};

const changeRoute = (client, route) => {
  sendMessage(client, ROUTE_CHANGE, route);
  verifyWebView(client, route);
};

const verifyWebView = (client, route) => {
  verifyState(client, route);
  verifyAnalytics(client);
  verifyLocalStorage(client, WEB_VIEW_API_KEY, apiKey);
  verifyLocalStorage(client, WEB_VIEW_CHANNEL, channel);
};

const verifyState = (client, route) => {
  client
    .assert.urlContains(route)
    .assert.elementNotPresent('#header');
};

const verifyAnalytics = (client) => {
  Analytics.verifyStore(client, 'WebViewStore', (webViewStore) => {
    webViewStore.isWebView.should.eql(true);
    webViewStore.deviceType.should.eql(deviceType);
  });
};

const verifyLocalStorage = (client, key, value) => {
  client
    .execute(function(key) {
      return localStorage.getItem(key);
    }, [key], function(result) {
      client.assert.equal(JSON.parse(result.value), value);
    });
};

module.exports = {
  before(client) {
    page = client.page.blank();
  },

  'load blank page without webView param'() {
    page.open()
      .assert.elementPresent('#header');
  },

  'set window stubs to set javascript interface'(client) {
    setWindowStubs(client);
  },

  'check in webview state since javascript interface exists'(client) {
    route = '/flight-status';
    sendMessage(client, ROUTE_CHANGE, route);
    verifyState(client, route);
  },

  'load blank page with webView param'() {
    page.openInWebView(channel, deviceType, apiKey)
      .assert.elementNotPresent('#header');
  },

  'reset window stubs to set javascript interface'(client) {
    setWindowStubs(client);
  },

  'go to flight status page from blank page'(client) {
    route = '/flight-status';
    changeRoute(client, route);
  },

  'go back to blank page from flight status page'(client) {
    route = '/blank';
    changeRoute(client, route);
  },

  'go to car booking page from blank page'(client) {
    route = '/car/booking';
    changeRoute(client, route);
  },

  'go back to blank page from car booking page'(client) {
    route = '/blank';
    changeRoute(client, route);
  },

  'send OAuth credentials'(client) {
    const credentials = JSON.stringify({ id_token: 'id_token', token_type: 'token_type' });
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    sendMessage(client, ADD_OAUTH, encodedCredentials);
    verifyLocalStorage(client, OAUTH_LOGIN_STATUS, undefined);
    verifyWebView(client, route);
  },

  'remove OAuth credentials'(client) {
    sendMessage(client, REMOVE_OAUTH, '');
    client.waitForElementNotVisible('.dimmer-web-view', 10000);
    verifyLocalStorage(client, OAUTH_LOGIN_STATUS, undefined);
    verifyWebView(client, route);
  },

  'go to non-blank page'(client) {
    route = '/car/booking';
    changeRoute(client, route);
  },

  'resend OAuth credentials'(client) {
    const credentials = JSON.stringify({ access_token: 'credentials', id_token: 'id_token', token_type: 'token_type' });
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    client.pause(2000);
    sendMessage(client, ADD_OAUTH, encodedCredentials);
    verifyLocalStorage(client, OAUTH_LOGIN_STATUS, undefined);
    verifyWebView(client, route);
  },

  'go to invalid route and verify on blank page'(client) {
    route = '/invalid-route';
    sendMessage(client, ROUTE_CHANGE, route);
    verifyState(client, '/blank');
  },

  after(client) {
    client.end();
  }
};
