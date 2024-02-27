/* eslint-disable no-unused-vars */
/* TODO: re-enable eslint when fixing flaky test MOB-116218 */
let address, carLandingPage, contactMethodPage, flight, navDraw, passenger, payment, purchaseConfirmation,
  purchaseSummary, summary;

module.exports = {
  '@tags': ['flaky'],
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
    carLandingPage = client.page.landingPage();

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
    passenger.clickNewContactMethod();
    contactMethodPage
      .withEmailMe('a@gmail.com')
      .saveNewContactMethod();
    purchaseSummary.openPaymentEdit();
    payment.selectUseNewCreditCard();
    const ukAdress = client.globals.address.uk;

    address
      .withCountry(address.country.unitedKingdom)
      .withStreetAddress(ukAdress.street)
      .withZipCode(ukAdress.postcode)
      .withCity(ukAdress.city)
      .withRegion(ukAdress.region)
      .withPhoneNumber(ukAdress.phoneNumber);

    payment
      .withCardNumber('4111111111111111')
      .withNameOnCard('Test name')
      .withExpirationDateMonth(10)
      .withExpirationDateYear(2030)
      .withSecurityCode('123')
      .clickDone();
  },

  /* TODO: re-enable eslint when fixing flaky test MOB-116218 */

  //   'Purchase flight'() {
  //     purchaseSummary
  //       .waitForElementNotVisible('.dimmer', 10000)
  //       .purchase();
  //   },

  //   'On confirmation Page'() {
  //     purchaseConfirmation
  //       .verify.urlContains('air/booking/confirmation')
  //       .checkBookResultMessage('Your trip is booked!');
  //   },

  //   'Click Book it now Button to book a Rental Car'() {
  //     purchaseConfirmation.clickVisible('.car-cross-sell--button');
  //   },

  //   'Verify Car Booking Landing Page is populated with data from air reservation'() {
  //     carLandingPage
  //       .waitForElementNotVisible('.dimmer', 10000)
  //       .assert.containsText('@fromLocation', 'AUS')
  //       .assert.containsText('@toLocation', 'AUS')
  //       .assert.containsText('@pickupDate', '12/18')
  //       .assert.containsText('@dropoffDate', '12/21');
  //   },

  after(client) {
    client.end();
  }
};
