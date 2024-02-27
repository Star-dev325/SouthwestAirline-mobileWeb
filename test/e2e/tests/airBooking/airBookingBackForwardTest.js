'use strict';
let flight, navDraw, passenger, summary;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    flight = client.page.flight();
    summary = client.page.summary();
    passenger = client.page.passenger();
    navDraw = client.page.navDraw();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to air booking from nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Open airport selector and back forward'(client) {
    flight.openFromAirportSelector();

    client.back();
    flight.assert.elementNotPresent('@airportList');

    client.forward();
    flight.assert.elementPresent('@airportList');
    client.back();
  },

  'Open calendar and click browser back to close'(client) {
    flight
      .withCalendarDate()
      .waitForElementPresent('@calendar', 10000);

    client.back();
    flight
      .waitForElementPresent('@calendarInput', 10000);
  },

  'Open calendar again and click done to close'(client) {
    flight
      .withCalendarDate()
      .waitForElementPresent('@calendar', 10000);

    flight.clickVisible('@calendarDone')
      .waitForElementNotPresent('.attach-full', 10000);

    client.assert.urlContains(`${client.launch_url}/air/booking/shopping`);
  },

  'Find flight from Austin to Atlanta with LFC Dollars and back'(client) {
    flight
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .withPassenger(1)
      .withLowFareCalendar();
    flight.continue();
    flight.waitForElementPresent('.low-fare-calendar-page', 10000);
    client.assert.urlContains(`${client.launch_url}/air/booking/shopping/low-fare-calendar`);
    client.back();
    flight.waitForElementPresent('@calendarInput', 10000);
    client.assert.urlContains(`${client.launch_url}/air/booking/shopping`);
    client.forward();
    flight.waitForElementPresent('.low-fare-calendar-page', 10000);
    client.assert.urlContains(`${client.launch_url}/air/booking/shopping/low-fare-calendar`);
    client.back();
    flight.waitForElementPresent('@calendarInput', 10000);
    client.assert.urlContains(`${client.launch_url}/air/booking/shopping`);
    flight.withLowFareCalendar();
  },

  'Find flight from Austin to Atlanta with Dollars'(client) {
    flight
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .withPassenger(1)
      .saveSnapshot('fill find flight details')
      .continue();
  },

  'Select flights for adult'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true)
      .saveSnapshot('select first flight')
      .withFlightFare(2, flight.fare.businessSelect, true)
      .saveSnapshot('select second flight');
  },

  'Check price summary and continue'() {
    summary.continue();
    summary.saveSnapshot('on passenger details page');
  },

  'Input shareItineraryEmail then back to price summary and continue'(client) {
    passenger
      .withShareItineraryEmail('test@test.com');
    client.back();
    summary.continue();
  },

  'Enter adult passenger details'() {
    passenger
      .assert.elementNotPresent('@itineraryEmail')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .withMonth(10)
      .withDay(9)
      .withYear(1984)
      .withGender(passenger.gender.male)
      .withReceiptEmail('test@test.com')
      .saveSnapshot('fill passenger details')
      .continue();
  },

  after(client) {
    client.end();
  }
};
