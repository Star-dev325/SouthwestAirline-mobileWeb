import jsdom from 'jsdom';
import pathname from 'test/unit/assertions/pathname';
import search from 'test/unit/assertions/search';
import * as I18n from '@swa-ui/locale';
import i18nGlobalProperties from 'src/app/i18n/global';
import { jestSnapshotPlugin, addSerializer } from 'mocha-chai-jest-snapshot';
import { createSerializer } from 'enzyme-to-json';
import 'src/app/helpers/dayJsSetup';

I18n.setI18nRoot({
  en: Object.freeze({
    ...i18nGlobalProperties
  })
});

global.document = jsdom.jsdom('<!doctype html><html><body><div id="appRoot"></div></body></html>');
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.window.open.restore = () => {};
global.window._trackAnalytics = { event() {} };
global.window._satellite = { track() {} };
global.navigator = { userAgent: 'node.js' };
global.window.navigator = { userAgent: 'node.js', javaEnabled: () => false };
global.mwebAppConfig = {};
global.self = global.window;
global.IntersectionObserver = function () {
  return { observe() {} };
};
global.Image = window.Image;

const mockStorage = () => {
  let data = {};

  return {
    getItem: (key) => data[key],
    setItem: (key, value) => (data[key] = value),
    removeItem: (key) => delete data[key],
    clear: () => (data = {})
  };
};

window.localStorage = window.sessionStorage = mockStorage();

global.__DEV__ = false;

import chai from 'chai';

global.expect = chai.expect;
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
chai.use(pathname);
chai.use(search);
chai.use(jestSnapshotPlugin());
addSerializer(createSerializer({ ignoreDefaultProps: true }));

// The Adapter must be imported and configured after jsdom has been initialized.
import { configure } from 'enzyme';

const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });

const {
  failOnAnyPropTypeErrors,
  treatSpecificWarningsAsErrors
} = require('test/unit/helpers/failOnSpecificWarningsAndErrors');

failOnAnyPropTypeErrors();
treatSpecificWarningsAsErrors();

require('src/shared/mixins/lodashMixin').default();

const clearRequireCache = require('test/unit/helpers/clearRequireCache');
const resetHistory = require('test/unit/helpers/resetHistory').default;

// TODO: Possibly stop ignoring the below items. Originally ignored due to Reflux but might be valid now.
// ignore the unhandledRejection and rejectionHandled with throw this warning.
process.on('unhandledRejection', () => {});
process.on('rejectionHandled', () => {});

beforeEach(() => {
  clearRequireCache();
  resetHistory();
  window.localStorage && window.localStorage.clear();
});
