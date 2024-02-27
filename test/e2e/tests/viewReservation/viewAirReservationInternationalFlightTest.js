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
    viewReservation.withConfirmationNumber('INTCHC')
      .withFirstName('YANGJIE')
      .withLastName('LU')
      .continue();
  },

  'Verify view trip details page'() {
    tripDetails
      .waitForElementVisible('@tripDetailsCard', 10000)
      .assert.containsText('@windowCheckinMessaging', 'This flight is not eligible for Mobile Boarding Pass. Please visit a kiosk or ticket counter for your boarding passes.')
      .waitForElementVisible('@viewBoardingPositionsButton', 10000);
  },

  'Verify Air View Reservation Analytics Store is valid after searching successfully'(client) {
    Analytics.verifyStore(client, 'AirViewReservationStore');
  },

  after(client) {
    client.end();
  }
};
