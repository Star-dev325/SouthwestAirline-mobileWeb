'use strict';
let address, flight, login, navDraw, passenger, payment, paymentPage, purchaseSummary,
  summary;

module.exports = {
  before(client) {
    login = client.page.login();
    flight = client.page.flight();
    summary = client.page.summary();
    navDraw = client.page.navDraw();
    paymentPage = client.page.paymentPage();
    payment = client.page.payment();
    address = client.page.address();
    purchaseSummary = client.page.purchaseSummary();
    passenger = client.page.passenger();
    client
      .init();
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
    summary
      .continue();
  },

  'Enter adult passenger details'() {
    passenger
      .withFirstName('Test')
      .withLastName('Test')
      .withMonth(10)
      .withDay(9)
      .withYear(1984);
  },

  'login from login banner'(client) {
    passenger
      .waitForElementVisible('@loginBanner', 10000)
      .clickVisible('@loginBanner');

    login
      .waitForElementVisible('@loginPage', 10000)
      .assert.elementPresent('@loginForm')
      .assert.elementNotPresent('@enrollButton')
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .saveSnapshot('simple login for express checkout')
      .verify.urlContains(`${client.launchUrl}/login`)
      .continue();

    client.pause(5000);
  },

  'Using browser back'(client) {
    client.back();
  },

  'Go to passenger page with pre-fill passegner info'() {
    passenger
      .waitForElementVisible('@inputFirstName', 10000)
      .assert.urlContains('air/booking/passengers/0')
      .assert.value('@inputFirstName', 'Ron')
      .assert.value('@inputLastName', 'Hackmann')
      .continue();
  },

  'Go to payment page with pre-fill saved credit card info'() {
    purchaseSummary.openPaymentEdit();
    paymentPage
      .waitForElementVisible('@defaultCreditCard', 10000)
      .assert.visible('@defaultCreditCard');
  },

  'Select new credit card and filling in the information with a non-us phone number and continue'(client) {
    paymentPage
      .clickNewCreditCard()
      .clickPhoneNumberLabel()
      .withInternaltionalPhoneCountryCode()
      .withPhoneNumber('1234567');
    const data = client.globals.address.us;

    payment
      .withCardNumber('4444331850431111')
      .withNameOnCard('Test name')
      .withExpirationDateMonth(1)
      .withSecurityCode('123')
      .withExpirationDateYear(2030);

    address
      .withStreetAddress(data.street)
      .withZipCode(data.zipcode)
      .withCity(data.city)
      .withState(data.state)
      .withPhoneNumber('123456');
    payment.clickDone();
  },

  'Go to purchase summary page'() {
    purchaseSummary.waitForElementVisible('@purchase', 10000);
  },

  after(client) {
    client.end();
  }
};
