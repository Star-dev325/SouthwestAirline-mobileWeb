'use strict';
let flight, login, navDraw, purchaseConfirmation, purchaseSummary, summary;
const dayjs = require('dayjs');

module.exports = {
  before(client) {
    login = client.page.login();
    flight = client.page.flight();
    summary = client.page.summary();
    navDraw = client.page.navDraw();
    purchaseConfirmation = client.page.purchaseConfirmation();
    purchaseSummary = client.page.purchaseSummary();
    client.init();
  },

  'Go to air booking from nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Find flight for single passenger from Dallas to Austin selecting LFC and Points'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.DallasLoveField)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.points)
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

  'Login with Account'(client) {
    login
      .waitForElementPresent('@loginPage', 10000)
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .verify.urlContains(`${client.launchUrl}/login`)
      .continue();
  },

  'Purchase flight'() {
    summary
      .continue();
    purchaseSummary.purchase();
  },

  'On confirmation Page'() {
    purchaseConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .verify.urlContains('air/booking/confirmation')
      .checkBookResultMessage('Your trip is booked!');
  },

  'Session expire and refresh then User is on the home page with session Expired dialog poping up'(client) {
    client.expiredLoginSession();
    client.refresh();

    login.logout();
  },

  after(client) {
    client.end();
  }
};
