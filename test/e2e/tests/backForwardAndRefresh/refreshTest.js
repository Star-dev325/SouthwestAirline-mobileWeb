module.exports = {
  // make sure each test calls end to force a new browser for each step
  '@tags': ['backForwardRefresh'],
  'Redirect to beginning of flow when accessing a page out of flow'(client) {
    client
      .url(`${client.launchUrl}/air/booking/payment`)
      .waitForElementPresent('.book-flight-form', 10000)
      .saveSnapshot('payment form loaded')
      .assert.urlEquals(`${client.launchUrl}/air/booking/`);
  },

  'Click browser back'(client) {
    client.back();
  },

  'Should not be redirect to payment page'(client) {
    client.waitForElementPresent('.book-flight-form', 10000)
      .assert.urlEquals(`${client.launchUrl}/air/booking/`)
      .end();
  },

  'Redirect to login page when user is not login and visit my account flow directly'(client) {
    client
      .url(`${client.launchUrl}/my-account`)
      .waitForElementVisibleWithDefaultTimeout('.login-page')
      .assert.urlEquals(`${client.launchUrl}/login?to=%2Fmy-account`)
      .end();
  },

  'Show popup when there is an error occurred but not caught while render'(client) {
    const airBookingEntryUrl = `${client.launchUrl}/#/air/booking`;

    client
      .url(airBookingEntryUrl)
      .waitForElementVisibleWithDefaultTimeout('.home-and-nav')
      .url(`${client.launchUrl}/air/booking/pricing/summary`) // simulating going to some middle page in a flow by hitting url and this will cause an js error.
      .acceptAlert(() => {
        client.end();
      });
  },

  'redirect to home page when user enter a invalid url'(client) {
    client
      .url(`${client.launchUrl}/_frmHome`)
      .waitForElementPresent('#appContents', 10000)
      .assert.urlEquals(`${client.launchUrl}/`)
      .end();
  },

  'redirect to check-in retrieve page when refresh on check-in reservation detail page'(client) {
    client
      .url(`${client.launchUrl}/check-in`)
      .setValueVisible('input[name="recordLocator"]', 'F7KYIN')
      .setValueVisible('input[name=firstName]', 'amber')
      .setValueVisible('input[name=lastName]', 'awesome')
      .clickVisible('button[role="submit"]')
      .waitForElementVisibleWithDefaultTimeout('.popup')
      .waitForElementPresent('button[role="submit"]', 10000)
      .refresh(() => {
        client
          .waitForElementPresent('.reservation-retrieval-form', 10000)
          .assert.urlEquals(`${client.launchUrl}/check-in`);
      });
  },

  'click browser back after refresh'(client) {
    client.back();
  },

  'User should not allow to go anywhere by click browser and forward after refresh'(client) {
    client
      .waitForElementPresent('.reservation-retrieval-form', 10000)
      .assert.urlEquals(`${client.launchUrl}/check-in`)
      .end();
  }
};
