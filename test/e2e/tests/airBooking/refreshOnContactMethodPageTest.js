let flight, navDraw, passenger, summary;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to book a flight'() {
    navDraw
      .openMenu()
      .bookAFlight();
    flight.assert.elementPresent('@grayFormCalendarField');
  },

  'Find flight from Austin to Atlanta with Dollars'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .continue();
  },

  'Select flights'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Check reprice / price summary and continue'() {
    summary
      .continue();
  },

  'Enter adult passenger details'() {
    passenger
      .withFirstName('Fisher')
      .withLastName('King')
      .withMonth(10)
      .withDay(9)
      .withYear(1984)
      .withGender(passenger.gender.female)
      .withReceiptEmail('test@test.com')
      .continue();
  },

  'Refresh on contact method page'(client) {
    passenger.clickNewContactMethod();
    client.refresh();
  },

  'Verify going to airBooking flow entry instead of home page'() {
    flight
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.elementPresent('.book-flight-form');
  },

  after(client) {
    client.end();
  }
};
