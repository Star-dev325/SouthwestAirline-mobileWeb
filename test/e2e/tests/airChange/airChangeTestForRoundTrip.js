'use strict';
const Analytics = require('test/e2e/analytics/analytics');

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let login;
let navDraw;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
    airChangeShoppingSearch = client.page.airChangeShoppingSearch();
    login = client.page.login();
    navDraw = client.page.navDraw();

    viewReservation
      .open()
      .assert.title(client.globals.title);
  },

  'Go to view reservations from home page'() {
    navDraw.openMenu().viewReservations();
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('RVCOMP')
      .withFirstName('STEVEN')
      .withLastName('JACKIE')
      .continue();
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Show the select page'() {
    login
      .assert.containsText('@LoginLink', 'Log in');

    airChangeSelect
      .assert.containsText('@outbound', '194/285')
      .assert.containsText('@inbound', '1732/2021')
      .selectOutboundFlight()
      .assert.elementPresent('.checkbox-button_checked')
      .selectInboundFlight()
      .assert.elementPresent('.checkbox-button_checked');
  },

  'Go the shopping page'(client) {
    airChangeSelect.submit();
    airChangeShoppingSearch
      .waitForElementPresent('@from', 10000)
      .openFromAirportSelector();
    Analytics.verifyPageView(client, 'air-change-shopping-from');

    airChangeShoppingSearch.selectAirport(client.globals.airport.Atlanta);
    Analytics.verifyPageView(client, 'air-change-shopping');

    airChangeShoppingSearch.openToAirportSelector();
    Analytics.verifyPageView(client, 'air-change-shopping-to');

    airChangeShoppingSearch.selectAirport(client.globals.airport.Austin);
    Analytics.verifyPageView(client, 'air-change-shopping');

    airChangeShoppingSearch
      .withCalendarDate()
      .waitForElementPresent('@calendar', 10000);
    Analytics.verifyPageView(client, 'air-change-shopping-dates');

    client.back();
    Analytics.verifyPageView(client, 'air-change-shopping');
  },

  after(client) {
    client.end();
  }
};
