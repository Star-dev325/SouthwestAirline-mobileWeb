'use strict';

const applePaySheetResponse = require('mocks/templates/applePay/applePaySheetResponse');

let flight, login, navDraw, passenger, payment, purchaseConfirmation, purchaseSummary, summary, travelFunds;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();
    purchaseSummary = client.page.purchaseSummary();
    payment = client.page.payment();
    login = client.page.login();
    travelFunds = client.page.travelFunds();
    purchaseConfirmation = client.page.purchaseConfirmation();
    client
      .init();
  },

  'Go to air booking from the nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Search for a one way flight from Dallas to Austin for single passenger'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.Austin)
      .toAirport(client.globals.airport.Atlanta)
      .withCurrency(flight.currency.dollars)
      .withPassenger(1);

    flight.continue();
  },

  'Select flight'() {
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

  'Fill payment information'() {
    purchaseSummary.clickVisible('@paymentMethod');
    payment.clickVisible('@applePayCard');
    purchaseSummary.waitForElementVisible('@purchase', 10000);
  },

  'Verify Apple Pay is selected'() {
    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('@paymentCard', 'Apple Pay');
  },

  'Add EB'() {
    purchaseSummary.addEarlyBirdInPath();
  },

  'Add Travel Funds'() {
    purchaseSummary
      .clickApplyTravelFunds()
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('.apply-travel-funds', 10000);
    travelFunds
      .withConfirmationNumber('ABC123')
      .withPassengerFirstName('Apple')
      .withPassengerLastName('Pay')
      .lookUpFund();
  },

  'Go back to purchase summary page and ensure that Apple Pay is still selected'() {
    travelFunds
      .continue()
      .waitForElementNotVisible('.dimmer', 10000);

    purchaseSummary
      .assert.containsText('@paymentCard', 'Apple Pay');
  },

  'Stub and Move Ceptor Callback Function to prevent ApplePaySession errors'(client) {
    client
    // eslint-disable-next-line prefer-arrow-callback
      .execute(function() {
        window.CeptorCallbackFn = window.ClientCallbackFunction;
        window.ClientCallbackFunction = () => {};
      }, [applePaySheetResponse]);
  },

  'Purchase flight with Apple Pay'(client) {
    purchaseSummary
      .purchase();

    client
    // eslint-disable-next-line prefer-arrow-callback
      .execute(function(resp) {
        window.CeptorCallbackFn(resp);
      }, [applePaySheetResponse]);
  },

  'Route to confirmation page and ensure Apple Pay, Travel Funds, and Early Bird are displayed'() {
    purchaseConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.urlContains('air/booking/confirmation')
      .assert.elementPresent('@applePayImage')
      .assert.elementPresent('.travel-fund--image_rtf')
      .assert.elementPresent('.early-bird-wrap')
      .assert.containsText('@secondFundItemTitle', 'Visa')
      .assert.containsText('@secondFundItemFourDigits', 'Last 4 digits: 1234');
  },

  after(client) {
    client.end();
  }
};
