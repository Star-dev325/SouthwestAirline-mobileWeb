'use strict';
const Analytics = require('test/e2e/analytics/analytics');

let flightStatus, flightStatusDetails, flightStatusResults, homePage;

module.exports = {
  before(client) {
    flightStatus = client.page.flightStatus();
    homePage = client.page.homePage();
    flightStatusResults = client.page.flightStatusResults();
    flightStatusDetails = client.page.flightStatusDetails();

    client
      .init()
      .verify.title(client.globals.title);
  },
  'go to flight status from homepage'() {
    homePage.goToFlightStatus();
  },

  'Fill up flight status form'(client) {
    flightStatus.openFromAirportSelector();
    Analytics.verifyPageView(client, 'flight-status-from');

    flightStatus.selectAirport(client.globals.airport.Atlanta);
    Analytics.verifyPageView(client, 'flight-status');

    flightStatus.openToAirportSelector();
    Analytics.verifyPageView(client, 'flight-status-to');

    flightStatus.selectAirport(client.globals.airport.Austin);
    Analytics.verifyPageView(client, 'flight-status');

    flightStatus
      .assert.containsText('@search', 'Search')
      .fromAirportUseCurrentLocation();

    flightStatus
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('@fromAirport', 'DAL');
  },

  'Go back to home'(client) {
    client.back();
  },

  'Go to flight status'() {
    homePage.goToFlightStatus();
  },

  'See empty flight search form'() {
    flightStatus
      .assert.containsText('@fromAirport', 'From')
      .assert.containsText('@toAirport', 'To')
      .assert.containsText('@flightNumber', '');
  },

  'Search a flight status'(client) {
    flightStatus
      .assert.containsText('@search', 'Search')
      .fromAirport(client.globals.airport.Atlanta)
      .toAirport(client.globals.airport.Austin)
      .saveSnapshot('airports selected')
      .tapSearch();
  },

  'Verify Search Analytics'(client) {
    flightStatusResults.waitForFlightSearchResultsPage();
    Analytics.verifyStore(client, 'FlightStatusStore/search');
  },

  'Select a flight from search results list'() {
    flightStatusResults
      .assert.containsText('@pageTitle', 'Flight Status ATL - AUS')
      .saveSnapshot('select flight from results list')
      .selectFlightInResultList();
  },

  'Verify flight details page'() {
    flightStatusDetails
      .waitForStatusDetailsAppear()
      .assert.containsText('@gateInfo', 'GATE')
      .assert.containsText('@dateStr', 'Tue, May 23, 2017')
      .saveSnapshot('flight status details');
  },

  'Verify flight details analytics'(client) {
    flightStatusDetails.waitForStatusDetailsAppear();
    Analytics.verifyStore(client, 'FlightStatusStore/flightDetails');
  },

  'Go to home page and enter the flight status flow'(client) {
    client.clickVisible('.home-link');
    homePage.goToFlightStatus();
  },

  'Re-run the most recent saved search and verify'() {
    flightStatus.tapRecent()
      .assert.containsText('@recentRecordHeader', 'Recent Searches')
      .saveSnapshot('recent searches');
  },

  'Click the latest recent record'() {
    flightStatus
      .assert.elementPresent('@recentRecord')
      .tapRecentSearchRecord()
      .saveSnapshot('recent search record');
  },

  'Verify the flight status page was prefilled'() {
    flightStatus
      .assert.containsText('@fromAirport', 'ATL')
      .assert.containsText('@toAirport', 'AUS')
      .assert.containsText('@flightNumber', '');
  },

  'Navigate to recent search list page'() {
    flightStatus.tapRecent()
      .assert.containsText('@recentRecordHeader', 'Recent Searches');
  },

  'Refresh the flight status landing page'(client) {
    client.back();
    flightStatus.fromAirport(client.globals.airport.Burbank)
      .toAirport(client.globals.airport.ChicagoMidway);
  },

  'Click the latest recent record again'() {
    flightStatus
      .tapRecent()
      .tapRecentSearchRecord();
  },

  'Verify the flight status page was prefilled with the selected data'() {
    flightStatus
      .assert.containsText('@fromAirport', 'ATL')
      .assert.containsText('@toAirport', 'AUS')
      .assert.containsText('@flightNumber', '');
  },

  'Verify going back takes you to the previous page (home) and not the recent searches page'(client) {
    client.back();

    client.waitForElementNotVisible('.dimmer', 10000)
      .assert.urlEquals(`${client.launchUrl}/`);
  },

  after(client) {
    client.end();
  }
};
