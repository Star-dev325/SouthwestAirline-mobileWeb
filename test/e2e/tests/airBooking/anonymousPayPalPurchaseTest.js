let flight, navDraw, passenger, payment, purchaseSummary, summary;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();
    purchaseSummary = client.page.purchaseSummary();
    payment = client.page.payment();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@BookFlight');
  },

  'Find one-way flight from Atlanta to Austin with Dollars'(client) {
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

  'Select to use payPal'() {
    purchaseSummary.clickVisible('[data-qa="review-form--payment-method-nav-item"]');
    payment.clickPayPalCard();
  },

  'Verify payPal is selected'() {
    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('[data-qa="review-form--payment-card"]', 'PayPal');
  },

  after(client) {
    client.end();
  }
};
