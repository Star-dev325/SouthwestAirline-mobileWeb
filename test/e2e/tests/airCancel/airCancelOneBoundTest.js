'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let airCancelConfirmation, airCancelSelect, cancelFlight, homePage, navDraw, tripDetails, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airCancelSelect = client.page.airCancelSelect();
    cancelFlight = client.page.cancelFlight();
    airCancelConfirmation = client.page.airCancelConfirmation();

    homePage.goToManageTrips();
  },

  'Go to view reservations from home page'() {
    navDraw.openMenu().viewReservations();
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('EMRCPT')
      .withFirstName('John')
      .withLastName('Cancel')
      .saveSnapshot('fill reservation details')
      .continue();

    tripDetails
      .waitForElementPresent('@changeButton', 10000)
      .waitForElementPresent('@cancelButton', 10000)
      .assert.urlContains('view-reservation/trip-details')
      .saveSnapshot('on trip details page');
  },

  'Choose the cancel flight option'() {
    tripDetails.assert
      .containsText('@cancelButton', 'Cancel')
      .cancelFlight()
      .waitForElementNotVisible('.dimmer', 10000)
      .saveSnapshot('on cancel flight page');
  },

  'Verify Air Cancel Analytics Store is valid before cancelling'(client) {
    Analytics.verifyStore(client, 'AirCancelStore');
  },

  'Select the outbound to cancel'() {
    airCancelSelect
      .selectOutboundFlight()
      .submit();
  },

  'cancel the flight'() {
    cancelFlight.submit();
  },

  'Verify air cancel confirmation'() {
    airCancelConfirmation
      .waitForElementPresent('@cancelBoundConfirmation', 10000)
      .assert.urlContains('/refund-summary')
      .assert.containsText('@passenger', 'John Cancel')
      .assert.containsText('@confirmationNumber', 'EMRCPT');
  },

  'Verify Air Cancel Analytics Store is valid after cancelling successfully'(client) {
    Analytics.verifyStore(client, 'AirCancelStore');
  },

  after(client) {
    client.end();
  }
};
