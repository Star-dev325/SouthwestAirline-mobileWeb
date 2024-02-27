const Analytics = require('test/e2e/analytics/analytics');

let flight, login, navDraw, purchaseConfirmation, purchaseSummary, summary, travelFunds;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    purchaseSummary = client.page.purchaseSummary();
    login = client.page.login();
    purchaseConfirmation = client.page.purchaseConfirmation();
    travelFunds = client.page.travelFunds();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@BookFlight');
  },

  'Find one-way flight from Austin to Atlanta with Points'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.points)
      .continue()
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Check reprice / price summary and continue'() {
    summary
      .continue()
      .continue();
  },

  'Login with Account'(client) {
    login
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .verify.urlContains(`${client.launchUrl}/login`)
      .continue();
  },

  'Open Apply Travel Funds form and add a travel fund'() {
    summary
      .continue();
    purchaseSummary
      .clickApplyTravelFunds()
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('.apply-travel-funds', 10000);
    travelFunds
      .withConfirmationNumber('ABC123')
      .withPassengerFirstName('Ben')
      .withPassengerLastName('Lacy')
      .lookUpFund();
  },

  'Verify Apply page rendered funds list and price total'(client) {
    client
      .waitForElementVisible('.fund-results-list', 10000)
      .assert.elementPresent('.travel-fund--image_rtf')
      .assert.elementPresent('.fund-results-list')
      .assert.elementPresent('.price-total');

    client.elements('css selector', '.fund-results-list--item', (result) => {
      client.assert.equal(result.value.length, 1);
    });
  },

  'Verify analytics TravelFundsStore for travelFunds'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('travel-funds');
    });
  },

  'Apply a gift card and verify that fund rendered correctly'(client) {
    travelFunds
      .selectGiftCardTab()
      .withCardNumber('6543210987652619')
      .withSecurityCode('4321')
      .lookUpFund();
    client
      .waitForElementNotVisible('.dimmer', 10000)
      .elements('css selector', '.fund-results-list--item', (result) => {
        client.assert.equal(result.value.length, 2);
      })
      .assert.elementPresent('.travel-fund--image_gift-card')
      .assert.containsText('.fund-results-list--error-message', 'Funds not applied');
  },

  'Verify analytics TravelFundsStore for gift card'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('gift-card');
    });
  },

  'Apply a luv voucher and verify that fund rendered correctly'(client) {
    travelFunds
      .selectLuvVoucherTab()
      .withVoucherNumber('6543210987652398')
      .withSecurityCode('4321')
      .lookUpFund();

    client
      .waitForElementNotVisible('.dimmer', 10000)
      .elements('css selector', '.fund-results-list--item', (result) => {
        client.assert.equal(result.value.length, 3);
      })
      .assert.elementPresent('.travel-fund--image_luv-voucher')
      .assert.containsText('.fund-results-list--error-message', 'Funds not applied');
  },

  'Verify analytics TravelFundsStore for luv voucher'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('luv-voucher');
    });
  },

  'Remove a fund'() {
    travelFunds
      .removeFirstFund()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Remove another fund after session expired'(client) {
    client.expiredLoginSession();

    travelFunds
      .removeFirstFund()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Back to purchase review page after session expired again'() {
    travelFunds
      .continue()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify purchase page'(client) {
    client
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.elementPresent('.billing-address-nav-item')
      .assert.elementNotPresent('.payment-method-nav-item')
      .assert.containsText('.apply-travel-funds-nav-item a span', 'Funds Applied');
  },

  'Purchase flight'() {
    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .purchase();
  },

  'On confirmation Page'(client) {
    purchaseConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .verify.urlContains('air/booking/confirmation')
      .checkBookResultMessage('Your trip is booked!');

    client
      .elements('css selector', '.fund-results-list--item', (result) => {
        client.assert.equal(result.value.length, 1);
      })
      .assert.elementPresent('.fund-results-list')
      .assert.elementPresent('.travel-fund--image_rtf');
  },

  after(client) {
    client.end();
  }
};
