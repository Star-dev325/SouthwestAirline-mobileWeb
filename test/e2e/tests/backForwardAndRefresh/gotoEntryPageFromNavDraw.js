let flight, homePage;
let navDraw;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    flight = client.page.flight();
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
  },

  'Go to air booking from home page'() {
    homePage
      .goToBookAFlight();
  },

  'Book a flight with single pax'(client) {
    flight
      .fromAirport(client.globals.airport.DallasLoveField)
      .toAirport(client.globals.airport.Austin)
      .withPassenger(1)
      .continue();
  },

  'Click "Book a Flight" from nav draw'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@BookFlight');
  },

  'Click browser back multiple times'(client) {
    client.back();
    client.back();
    client.back();
  },

  'User still on the air booking entry page without flow data'(client) {
    flight
      .waitForElementPresent('@fromAirport', 10000)
      .assert.containsText('@fromAirport', '')
      .waitForElementPresent('@toAirport', 10000)
      .assert.containsText('@toAirport', '');
    client.assert.urlContains('/air/booking');
  },

  after(client) {
    client.end();
  }
};
