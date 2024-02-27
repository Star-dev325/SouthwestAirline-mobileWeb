let flight, navDraw, paymentEdit, purchaseConfirmation, purchaseSummary, summary;
let login;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    login = client.page.login();
    flight = client.page.flight();
    summary = client.page.summary();
    purchaseSummary = client.page.purchaseSummary();
    paymentEdit = client.page.paymentEdit();
    purchaseConfirmation = client.page.purchaseConfirmation();

    client
      .init()
      .verify.title(client.globals.title);
    client.waitForElementNotVisible('.dimmer', 10000);
  },

  'Login user to do authenticated check'(client) {
    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementNotVisible('.dimmer', 10000);
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
      .continue();
  },

  'Select to use payPal'() {
    purchaseSummary.openPaymentEdit();
    paymentEdit.clickPayPalCard();
  },

  'Verify payPal is selected'() {
    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('[data-qa="review-form--payment-card"]', 'PayPal');
  },

  'Session expired then purchase'(client) {
    client.expiredLoginSession();
    purchaseSummary.purchase();
  },

  'purchase success'() {
    purchaseConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.urlContains('air/booking/confirmation')
      .assert.elementPresent('@paypalImage');
  },

  after(client) {
    client.end();
  }
};
