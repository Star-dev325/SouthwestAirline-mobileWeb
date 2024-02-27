'use strict';
let flight, login, navDraw, passenger,
  purchaseConfirmation, purchaseSummary,
  summary;
const dayjs = require('dayjs');

module.exports = {
  before(client) {
    flight = client.page.flight();
    summary = client.page.summary();
    navDraw = client.page.navDraw();
    purchaseConfirmation = client.page.purchaseConfirmation();
    login = client.page.login();
    purchaseSummary = client.page.purchaseSummary();
    passenger = client.page.passenger();
    client.init();
  },

  'Go to air booking from nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Find flight for single passenger from Dallas to Austin selecting LFC'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.DallasLoveField)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .withPassenger(1)
      .withLowFareCalendar();

    flight.continue();
  },

  'Select low fare day'() {
    const date = dayjs().add(1, 'day').format('YYYY-MM-DD');

    flight.clickLowFarePriceBar('outbound', date);
    flight.lowFareContinue();
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

  'Purchase flight'() {
    purchaseSummary.purchase();
  },

  'On confirmation Page'() {
    purchaseConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .verify.urlContains('air/booking/confirmation')
      .checkBookResultMessage('Your trip is booked!');
  },

  after(client) {
    client.end();
  }
};
