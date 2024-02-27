const Analytics = require('test/e2e/analytics/analytics');

let flight, login, navDraw, purchaseConfirmation, purchaseSummary, summary;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    purchaseSummary = client.page.purchaseSummary();
    login = client.page.login();
    purchaseConfirmation = client.page.purchaseConfirmation();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@BookFlight');
  },

  'Verify analytics event count'(client) {
    Analytics.verifyEvents(client, 3);
  },

  'Find one-way flight from Austin to Atlanta with Points'(client) {
    flight
      .flightType('oneway')
      .openFromAirportSelector();
    Analytics.verifyPageView(client, 'air-booking-shopping-from');

    flight.selectAirport(client.globals.airport.Atlanta);
    Analytics.verifyPageView(client, 'air-booking-shopping');

    flight.openToAirportSelector();
    Analytics.verifyPageView(client, 'air-booking-shopping-to');

    flight.selectAirport(client.globals.airport.Austin);
    Analytics.verifyPageView(client, 'air-booking-shopping');

    flight
      .withCalendarDate()
      .waitForElementPresent('@calendar', 10000);
    Analytics.verifyPageView(client, 'air-booking-shopping-dates');

    client.back();
    Analytics.verifyPageView(client, 'air-booking-shopping');

    flight
      .withCurrency(flight.currency.points)
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

    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .purchase();
  },

  'On confirmation Page'() {
    purchaseConfirmation
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
