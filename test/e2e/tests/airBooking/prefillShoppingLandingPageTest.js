let flight, navDraw;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    flight = client.page.flight();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Go to book a flight'() {
    navDraw.openMenu().bookAFlight();
    flight.assert.elementPresent('@grayFormCalendarField');
  },

  'Find flight from Atlanta to Austin with Dollars'(client) {
    flight
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .withPassenger(2)
      .continue();
  },

  'Re-enter book a flight'() {
    navDraw.openMenu().bookAFlight();
    flight.assert.elementNotPresent('@grayFormCalendarField');
  },

  'Refresh then select from Austin to Atlanta'(client) {
    client.refresh();
    flight
      .fromAirport(client.globals.airport.Austin)
      .toAirport(client.globals.airport.Atlanta)
      .waitForElementNotPresent('.airport-list--results', 10000)
      .assert.containsText('@fromAirport', 'AUS')
      .assert.containsText('@toAirport', 'ATL');
  },

  'Click recent search to prefill'() {
    flight.clickRecentToPrefill();
    flight.assert.elementNotPresent('@grayFormCalendarField');
  },

  'Refresh then select the two same airports and click OK for dialog'(client) {
    client.refresh();
    flight
      .fromAirport(client.globals.airport.Austin)
      .toAirport(client.globals.airport.Austin)
      .waitForElementNotPresent('.airport-list--results', 10000)
      .assert.containsText('@fromAirport', 'AUS')
      .assert.containsText('@toAirport', 'AUS')
      .continue()
      .clickVisible('.popup-buttons .confirm-button');
  },

  'Re-click recent search to prefill'() {
    flight.clickRecentToPrefill();
    flight.assert.elementNotPresent('@grayFormCalendarField');
  },

  'Refresh and re-enter book a flight from the sidebar and click recent search to prefill'(client) {
    client.refresh();
    navDraw.openMenu().bookAFlight();
    flight.clickRecentToPrefill();
    flight
      .assert.elementNotPresent('@grayFormCalendarField')
      .assert.containsText('@fromAirport', 'ATL')
      .assert.containsText('@toAirport', 'AUS');
  },

  after(client) {
    client.end();
  }
};
