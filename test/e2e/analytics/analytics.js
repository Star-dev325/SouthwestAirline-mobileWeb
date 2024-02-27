/* eslint-disable */
require('should');
const validate = require('jsonschema').validate;

const Analytics = {
  verifyStore: function(browser, store, customAssertion) {
    const schema = require(`test/analyticsContracts/${store}.json`);

    browser.execute(function(store) {
      const storeName = store.split('/')[0];
      return window.data_a.stores[storeName];
    }, [store], function(result) {
      const store = result.value;
      const errors = validate(store, schema).errors;
      errors.should.eql([], `Actual store values: ${JSON.stringify(store, undefined, 2)} did not match contract because:\n\t${errors.join('\n\t')}`);

      if(customAssertion) {
        customAssertion(store);
      }
    });
  },

  verifyPageView: function(browser, expectedPageName) {
    browser.execute(function() {
      return window.data_a.events.pageView;
    }, [], function(result) {
      browser.assert.equal(result.value, expectedPageName, `Actual analytics page view name: ${result.value}, expected: ${expectedPageName}`);
    });
  },

  verifyEvents: function(browser, expectEventsCount) {
    browser.execute(function() {
      return window.analytics_events_counter;
    }, [], function(result) {
      browser.assert.equal(result.value, expectEventsCount, `Actual analytics events count: ${result.value} did not match expected: ${expectEventsCount}`);
    });
  },

  verifyMessage: function(browser, expectedMessage) {
    browser.execute(function() {
      return window.data_a.message;
    }, [], function(result) {
      browser.assert.deepEqual(result.value, expectedMessage,
        `Actual message object: ${JSON.stringify(result.value)} did not match expected value ${JSON.stringify(expectedMessage)}`);
    });
  }
};

module.exports = Analytics;