let flight, navDraw, passenger, summary;

module.exports = {
  '@tags': ['backForwardRefresh'],

  before(client) {
    summary = client.page.summary();
    passenger = client.page.passenger();
    navDraw = client.page.navDraw();
    flight = client.page.flight();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking from nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Select same airport to show error-popup'(client) {
    flight
      .fromAirport(client.globals.airport.Austin)
      .toAirport(client.globals.airport.Austin)
      .continue()
      .waitForElementPresent('.popup', 10000);
  },

  'Verify click OK can hide error-popup'(client) {
    client.clickVisible('.button-popup_horizontal.confirm-button');

    flight.waitForElementNotPresent('.popup', 10000);
  },

  'Find one-way flight from Atlanta to Austin with Dollar'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars);

    client.pause(500);

    flight.continue();
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

  'Enter adult passenger details'() {
    passenger
      .withFirstName('nomatch')
      .withLastName('King')
      .withMonth(10)
      .withDay(9)
      .withYear(1984)
      .withGender(passenger.gender.female)
      .withRapidRewardsNumber()
      .withReceiptEmail('test@test.com')
      .continue()
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('.popup', 'The passenger name does not match the name on file for the Rapid Rewards account # entered');
  },

  after(client) {
    client.end();
  }
};
