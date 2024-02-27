let address, contactMethodPage, flight, navDraw, passenger, payment, purchaseConfirmation, purchaseSummary, summary;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();
    contactMethodPage = client.page.contactMethodPage();
    purchaseSummary = client.page.purchaseSummary();
    payment = client.page.payment();
    address = client.page.address();
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

  'Find one-way flight from Austin to Atlanta with Points'(client) {
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

  'Fill payment information'(client) {
    const usAddress = client.globals.address.us;

    purchaseSummary.clickVisible('[data-qa="review-form--payment-method-nav-item"]');
    payment.selectUseNewCreditCard();

    address
      .withStreetAddress(usAddress.street)
      .withZipCode(usAddress.zipcode)
      .withCity(usAddress.city)
      .withState(usAddress.state)
      .withPhoneNumber(usAddress.phoneNumber);

    payment
      .withCardNumber('4111111111111111')
      .withNameOnCard('Test name')
      .withExpirationDateMonth(10)
      .withExpirationDateYear(2030)
      .withSecurityCode('123')
      .clickDone();
  },

  'Fill out contact information'() {
    purchaseSummary.clickContactMethod();

    contactMethodPage
      .withEmailMe('a@gmail.com')
      .saveNewContactMethod();
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
