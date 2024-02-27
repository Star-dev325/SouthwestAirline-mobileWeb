'use strict';
let flight, navDraw;
const dayjs = require('dayjs');

module.exports = {
  before(client) {
    flight = client.page.flight();
    navDraw = client.page.navDraw();
    client.init();
  },

  'Go to air booking from nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Find flight for single passenger from Tulsa to Austin selecting LFC'(client) {
    flight
      .fromAirport(client.globals.airport.Tulsa)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .withPassenger(1)
      .withLowFareCalendar();

    flight.continue();
  },

  'Verify Inbound Date Fields'() {
    const outboundDate = dayjs().add(1, 'day').format('ddd, ll');
    const inboundDate = dayjs().add(4, 'days').format('ddd, ll');

    flight
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('@lowFarePointerDepartureDate', outboundDate)
      .assert.containsText('@lowFarePointerReturnDate', inboundDate)
      .assert.containsText('@lowFareSelectedDepartureDate', outboundDate)
      .assert.containsText('@lowFareSelectedDepartureDate', '(TUL - AUS)')
      .assert.containsText('@lowFareSelectedReturnDate', '- -');
  },

  after(client) {
    client.end();
  }
};
