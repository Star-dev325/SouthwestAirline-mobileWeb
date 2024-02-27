'use strict';

let address, flight, login, navDraw, passenger, payment, purchaseConfirmation, purchaseSummary, summary;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();
    summary = client.page.summary();
    purchaseSummary = client.page.purchaseSummary();
    login = client.page.login();
    purchaseConfirmation = client.page.purchaseConfirmation();
    passenger = client.page.passenger();
    payment = client.page.payment();
    address = client.page.address();

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
      .clickVisible('@calendarInput')
      .waitForElementPresent('@calendar', 10000)
      .saveSnapshot('calendar display');
    flight.expect.element('@calendar').text.to.not.contain('RETURN');
    flight
      .clickVisible('@calendarDone')
      .waitForElementNotPresent('airBookingCalendar', 10000)
      .continue();
  },

  'Select flights'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway);
  },

  'Check price summary and continue'() {
    summary
      .saveSnapshot('points booking on price page')
      .continue();
  },

  'Login with Account'(client) {
    passenger.login();
    client.pause(1000);
    login
      .withUser('msauce')
      .withPass('Test1234')
      .saveSnapshot('login for points booking')
      .continue();
    client.pause(5000);
    passenger
      .withContactMethod('EMAIL', 'test@test.com')
      .continue();
  },

  'Enter card info'() {
    payment
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementPresent('@maskCardNumber', 10000)
      .withCardNumber('4012999999999999')
      .withNameOnCard('Test Name')
      .withExpirationDateMonth(1)
      .withExpirationDateYear(2030)
      .saveSnapshot('fill card details')
      .assert.value('.grouped:nth-child(1) div:nth-child(2) input', 'XXXXXXXXXXXX9999');
  },

  'Enter billing address'(client) {
    const data = client.globals.address.us;

    address
      .withStreetAddress(data.street)
      .withZipCode(data.zipcode)
      .withCity(data.city)
      .withState(data.state)
      .withPhoneNumber(data.phoneNumber)
      .saveSnapshot('fill billing address')
      .continue();
  },

  'Purchase flight'() {
    purchaseSummary
      .waitForElementNotVisible('.dimmer', 10000)
      .saveSnapshot('purchase info')
      .purchase(30000);
  },

  'On confirmation Page'() {
    purchaseConfirmation
      .checkUrlForConfirmationPage('air/booking/confirmation', 30000)
      .saveSnapshot('on booking confirmation page')
      .checkBookResultMessage('Your trip is booked!')
      .checkPassengerName('Marinara Sauce')
      .checkHasPNR();
  },

  after(client) {
    client.end();
  }
};
