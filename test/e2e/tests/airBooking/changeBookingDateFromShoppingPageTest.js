'use strict';
let flight, navDraw;

module.exports = {
  before(client) {
    flight = client.page.flight();
    navDraw = client.page.navDraw();

    client
      .init();
  },

  'Go to air booking from home page'() {
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

  'Change booking date to next day'() {
    flight
      .nextDate()
      .assert.attributeEquals('@nextDate', 'class', 'block center bgpblue calendar-strip--item')
      .previousDate()
      .assert.attributeEquals('@previousDate', 'class', 'block center bgpblue calendar-strip--item');
  },

  after(client) {
    client.end();
  }
};
