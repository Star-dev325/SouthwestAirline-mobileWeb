let flight, navDraw, passenger, paymentPage, purchaseSummary, summary;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();
    purchaseSummary = client.page.purchaseSummary();
    paymentPage = client.page.paymentPage();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@BookFlight');
  },

  'Find one-way domestic flight with dollars'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.Memphis)
      .toAirport(client.globals.airport.Nashville)
      .withCurrency(flight.currency.dollars)
      .continue();
  },

  'Select flights'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Check price summary and continue'() {
    summary
      .waitForElementVisible('[data-qa="chase"]', 10000)
      .clickChaseLearnMoreButton();
  },

  'Check reprice / price summary and continue'() {
    summary
      .continue()
      .continue();
  },

  'Enter adult passenger details'() {
    passenger
      .withMonth(10)
      .withDay(9)
      .withYear(1984)
      .withGender(passenger.gender.female)
      .withReceiptEmail('test@test.com')
      .continue();
  },

  'Select to use chase'() {
    purchaseSummary.clickVisible('[data-qa="review-form--payment-method-nav-item"]');
    paymentPage.clickDone();
  },

  'Verify chase is selected'() {
    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('[data-qa="review-form--payment-card"]', 'Rapid Rewards® Visa')
      .waitForElementVisible('.phone-number-field', 10000);
  },

  after(client) {
    client.end();
  }
};
