'use strict';

let flight, homePage, login, navDraw, passenger, paymentPage, priceSummary, purchaseSummary;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    login = client.page.login();
    flight = client.page.flight();
    priceSummary = client.page.summary();
    passenger = client.page.passenger();
    priceSummary = client.page.summary();
    purchaseSummary = client.page.purchaseSummary();
    paymentPage = client.page.paymentPage();

    client
      .init();
  },

  'Login user to do authenticated check'(client) {
    homePage.goToLogin();

    login
      .waitForElementPresent('@subTitle', 10000)
      .waitForElementPresent('@rememberMeBox', 10000)
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .continue();
  },

  'Go to air booking from nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Find flight for one passenger from Dallas to Austin with Dollars'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.DallasLoveField)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .withPassenger(1)
      .continue();
  },

  'Select flights'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Click continue button on price page'() {
    priceSummary
      .continue();
  },

  'Back to flight products page'(client) {
    client.back();
    client.back();
    client.back();
  },

  'Select flights again'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Click continue button on price page again'() {
    priceSummary
      .continue();
  },

  'Using browser back'(client) {
    client.back();
  },

  'Click continue button from pricing page'() {
    priceSummary
      .assert.urlContains('air/booking/pricing/summary')
      .assert.visible('.pricing-summary')
      .continue();
  },

  'Go to passenger page with pre-fill passegner info'() {
    passenger
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.urlContains('air/booking/passengers/0')
      .assert.value('@inputFirstName', 'Ron')
      .assert.value('@inputLastName', 'Hackmann');
  },

  'Go to purchase summary page'() {
    passenger
      .continue();
  },

  'Session expire on edit mode and click update'(client) {
    client.expiredLoginSession();

    purchaseSummary
      .openPaymentEdit();
    paymentPage
      .selectPrimaryCreditCard()
      .clickDone();
    purchaseSummary.purchase();
  },

  after(client) {
    client.end();
  }
};
