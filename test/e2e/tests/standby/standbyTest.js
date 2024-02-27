'use strict';
const Analytics = require('test/e2e/analytics/analytics');

let homePage, login, myAccount, navDraw, standbyList, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    myAccount = client.page.myAccount();
    standbyList = client.page.standbyList();
    viewReservation = client.page.viewReservation();

    homePage.open()
      .assert.title(client.globals.title);

    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementNotVisible('.dimmer', 10000);
  },

  'Go MyAccount home page'() {
    navDraw
      .openMenu().myAccount();
  },

  'Clicking on all upcoming trips banner'() {
    myAccount.tapTripsNumber();
  },

  'Clicking on revenue trip card View standby list'(client) {
    client.clickVisible('.trip-card:nth-of-type(8) .standby-card--link [data-a="STANDBY"]');

    standbyList.waitForElementVisibleWithDefaultTimeout('@standbyContainer');
    standbyList.assert.urlContains(`${client.launchUrl}/standby`);
  },

  'Verify stand by list page analytics when coming from upcoming trip list'(client) {
    Analytics.verifyStore(client, 'StandbyListStore');
  },

  'Refresh on stand by page'(client) {
    client.refresh();
    standbyList.waitForElementVisibleWithDefaultTimeout('@standbyContainer');
    standbyList.assert.urlContains(`${client.launchUrl}/standby`);
  },

  'Back to upcoming trips list page'(client) {
    client.back();
    client.assert.urlContains(`${client.launchUrl}/my-account/upcoming-trips`);
  },

  'Come to upcoming trips again'() {
    navDraw
      .openMenu().myAccount();
    myAccount.tapTripsNumber();
  },

  'Click details button to go to upcoming trip details'(client) {
    client.clickVisible('.trip-card:nth-of-type(5) .detailed-trip-card--detail-button');
    client.waitForElementVisible('[data-qa="upcoming-trip-details-page"]', 10000);
    client.assert.urlContains(`${client.launchUrl}/my-account/upcoming-trip-details`);
  },

  'Refresh the page'(client) {
    client.refresh();
  },

  'Go to view reservation page'() {
    navDraw
      .openMenu().viewReservations();
  },

  'Enter PNR and go to reservation details page'() {
    viewReservation
      .withConfirmationNumber('STMXQ6')
      .withFirstName('I')
      .withLastName('WANG')
      .continue();
  },

  'Click stand by link on view reservation page'(client) {
    client.clickVisible('.flight-summary-card .standby-card--link [data-a="STANDBY"]');
  },

  'Verify stand by list page analytics when coming from view reservation details'(client) {
    standbyList.waitForElementVisibleWithDefaultTimeout('@standbyContainer');
    Analytics.verifyStore(client, 'StandbyListStore');
    standbyList.assert.elementPresent('.standby-list-page');
  },

  after(client) {
    client.end();
  }
};
