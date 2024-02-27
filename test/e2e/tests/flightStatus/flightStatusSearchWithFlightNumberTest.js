'use strict';

let flightStatus, flightStatusResults, homePage;

module.exports = {
  before(client) {
    flightStatus = client.page.flightStatus();
    flightStatusResults = client.page.flightStatusResults();
    homePage = client.page.homePage();

    client
      .init()
      .verify.title(client.globals.title);
  },

  'go to flight status from homepage'() {
    homePage.goToFlightStatus();
  },

  'Search a flight status'(client) {
    flightStatus
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .withFlightNumber('1750')
      .saveSnapshot('flight status')
      .tapSearch()
      .saveSnapshot('search tapped');
  },

  'Verify flight details are loaded'(client) {
    flightStatusResults.waitForElementPresent('@flightNumber', 10000);
    client.assert.urlContains('flightNumber=1750');
    flightStatusResults.assert.containsText('@flightNumber', '1750');
    client.saveSnapshot('flight status results');
  },

  after(client) {
    client.end();
  }
};
