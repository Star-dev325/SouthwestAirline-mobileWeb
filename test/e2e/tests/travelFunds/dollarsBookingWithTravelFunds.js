const Analytics = require('test/e2e/analytics/analytics');

let flight, login, navDraw, passenger, purchaseConfirmation,
  purchaseSummary, summary, travelFunds;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    purchaseSummary = client.page.purchaseSummary();
    passenger = client.page.passenger();
    purchaseConfirmation = client.page.purchaseConfirmation();
    travelFunds = client.page.travelFunds();
    login = client.page.login();

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
      .withCurrency(flight.currency.dollars)
      .continue();
  },

  'Select flights'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Check reprice / price summary and continue'() {
    summary
      .continue()
      .continue();
  },

  'Enter passenger details'() {
    passenger
      .waitForElementVisible('@loginBanner', 10000)
      .clickVisible('@loginBanner');
  },

  'Login with Account'(client) {
    login
      .waitForElementPresent('@loginPage', 10000)
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .verify.urlContains(`${client.launchUrl}/login`)
      .continue();
  },

  'Open Apply Travel Funds form and add a travel fund'() {
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

  'Back to purchase review page'() {
    travelFunds
      .continue()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify billing address is required now and payment is not'(client) {
    client
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.elementPresent('.billing-address-nav-item')
      .assert.elementNotPresent('[data-qa="review-form--payment-method-nav-item"]')
      .assert.containsText('.apply-travel-funds-nav-item a span', 'Funds Applied')
      .assert.containsText('.billing-address-nav-item a span', 'Complete');
  },

  'Open Apply Travel Funds form and see funds are still present'(client) {
    purchaseSummary
      .clickApplyTravelFunds()
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('.apply-travel-funds', 10000);

    client
      .waitForElementVisible('.fund-results-list', 10000)
      .assert.elementPresent('.travel-fund--image_rtf')
      .assert.elementPresent('.fund-results-list')
      .assert.elementPresent('.price-total');
  },

  'Remove all funds by clicking Cancel'() {
    travelFunds
      .cancel()
      .waitForElementVisible('.popup', 10000)
      .clickVisible('button.close-button')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Land on purchase review page and see that billing address is gone and payment method is required again'(client) {
    client
      .waitForElementVisible('.purchase-summary-form', 10000)
      .assert.elementNotPresent('.billing-address-nav-item')
      .assert.elementPresent('[data-qa="review-form--payment-method-nav-item"]')
      .assert.containsText('.apply-travel-funds-nav-item a span', 'Select (optional)');
  },

  'Reopen Apply TF page'() {
    purchaseSummary
      .clickApplyTravelFunds()
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('.apply-travel-funds', 10000);
  },

  'Verify that UI was cleared of results and ledger because all funds were removed'(client) {
    client
      .assert.elementNotPresent('.fund-results-list')
      .assert.elementNotPresent('.price-total');
  },

  'Add another travel fund then return to the purchase summary page'() {
    travelFunds
      .withConfirmationNumber('ABC123')
      .withPassengerFirstName('Ben')
      .withPassengerLastName('Lacy')
      .lookUpFund()
      .waitForElementNotVisible('.dimmer', 10000)
      .continue();
  },

  'Verify that Billing Address field is back and is still marked Complete'(client) {
    client
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.elementPresent('.billing-address-nav-item')
      .assert.elementNotPresent('[data-qa="review-form--payment-method-nav-item"]')
      .assert.containsText('.apply-travel-funds-nav-item a span', 'Funds Applied')
      .assert.containsText('.billing-address-nav-item a span', 'Complete');
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
      .assert.elementPresent('.fund-results-list');
  },

  after(client) {
    client.end();
  }
};
