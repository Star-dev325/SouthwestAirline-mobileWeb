'use strict';

let airCancelConfirmation, airCancelSelect, cancelFlight, confirmation, hazmatDeclaration, homePage, navDraw, tripDetails, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airCancelSelect = client.page.airCancelSelect();
    cancelFlight = client.page.cancelFlight();
    airCancelConfirmation = client.page.airCancelConfirmation();
    confirmation = client.page.confirmation();
    hazmatDeclaration = client.page.hazmatDeclaration();

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

  'Select the outbound to cancel'() {
    airCancelSelect
      .selectOutboundFlight()
      .submit();
  },

  'cancel the flight'() {
    cancelFlight.submit();
  },

  'Verify air cancel confirmation and check in'() {
    airCancelConfirmation
      .waitForElementPresent('@cancelBoundConfirmation', 10000)
      .assert.urlContains('/refund-summary')
      .assert.containsText('@passenger', 'John Cancel')
      .assert.containsText('@confirmationNumber', 'EMRCPT')
      .clickVisible('@checkInButton');
  },

  'Check in confirmation page'() {
    confirmation
      .waitForElementVisible('@boardingPass', 10000)
      .assert.urlContains('/confirmation')
      .assert.containsText('@successMessage', 'You\'re checked in!')
      .saveSnapshot('checkin confirmation page');
  },

  'Click on 1st boarding pass'() {
    confirmation.continue();
  },

  'Verify Hazmat Declaration page and tap on Disagree button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .clickDisagree();
  },

  'Verify Check in confirmation page on Disagree and tap Boarding Pass'() {
    confirmation
      .waitForElementVisible('@boardingPass', 10000)
      .assert.urlContains('/confirmation')
      .continue();
  },

  'Verify Hazmat Declaration page and tap Continue button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'Verify Boarding Pass page'(client) {
    client.waitForElementVisibleWithDefaultTimeout('.mobile-boarding-pass')
      .assert.urlContains('/check-in/boarding-pass');
  },

  after(client) {
    client.end();
  }
};
