'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let homePage;
let viewReservation;
let tripDetails;
let navDraw;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    navDraw = client.page.navDraw();

    homePage.open();

    client.pause(1000);
    navDraw.openMenu().viewReservations();
  },

  'Verify View Reservation home page'() {
    viewReservation
      .assert.attributeEquals('@confirmationNumber', 'placeholder', 'Confirmation #');
  },

  'Find flight reservation through confirmation number'() {
    viewReservation.withConfirmationNumber('DOMEST')
      .withFirstName('YANGJIE')
      .withLastName('LU')
      .continue();
  },

  'Verify view trip details page'() {
    tripDetails
      .waitForElementVisible('@tripDetailsCard', 10000)
      .assert.containsText('@windowCheckinMessaging', 'Airport check in required.')
      .assert.containsText('@windowCheckinMessaging', 'Unable to complete the check in process. Please visit a ticket counter to check in.');
  },

  'Verify Air View Reservation Analytics Store is valid after searching successfully'(client) {
    Analytics.verifyStore(client, 'AirViewReservationStore');
  },

  after(client) {
    client.end();
  }
};
