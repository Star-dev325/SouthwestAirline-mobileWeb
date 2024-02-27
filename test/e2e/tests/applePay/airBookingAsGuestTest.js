'use strict';

const applePaySheetResponse = require('mocks/templates/applePay/applePaySheetResponse');

let contactMethodPage, flight, navDraw, passenger, payment, purchaseConfirmation, purchaseSummary, summary;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();
    contactMethodPage = client.page.contactMethodPage();
    purchaseSummary = client.page.purchaseSummary();
    payment = client.page.payment();
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
      .toAirport(client.globals.airport.DallasLoveField)
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
      .withFirstName('Fisher')
      .withLastName('King')
      .withMonth(10)
      .withDay(9)
      .withYear(1997)
      .withGender(passenger.gender.female)
      .withReceiptEmail('test@test.com')
      .continue();
  },

  'Enter contact information'() {
    purchaseSummary.clickContactMethod();
    contactMethodPage
      .withTextMe('5125555555')
      .saveNewContactMethod();
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

  'Route to confirmation page and ensure Apple Pay is displayed'() {
    purchaseConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.urlContains('air/booking/confirmation')
      .assert.elementPresent('@applePayImage')
      .assert.containsText('@firstFundItemTitle', 'Visa')
      .assert.containsText('@firstFundItemFourDigits', 'Last 4 digits: 1234');
  },

  after(client) {
    client.end();
  }
};
