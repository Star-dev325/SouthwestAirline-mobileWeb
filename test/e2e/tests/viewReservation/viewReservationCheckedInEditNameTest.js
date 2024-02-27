'use strict';

let editPassenger, homePage, navDraw, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    editPassenger = client.page.editPassenger();
  },

  'Go to view reservation page'() {
    homePage.open();
    navDraw.openMenu().viewReservations();
    viewReservation.assert.attributeEquals('@confirmationNumber', 'placeholder', 'Confirmation #');
  },

  'Retrieve flight reservation for a checked-in flight'() {
    viewReservation.withConfirmationNumber('RDOCHK')
      .withFirstName('Cannon')
      .withLastName('Biggs')
      .continue();
    editPassenger.assert.containsText('.passenger-reservation-info--passenger-name', 'Checked In');
  },

  'Go to edit passenger details page'() {
    editPassenger.openEditPassengerPage();
  },

  'Gender, date of birth, and suffix are not editable'() {
    editPassenger.checkDisabledFields();
  },

  'Gender reads "On File" and DOB year is masked'() {
    editPassenger.checkMaskedFields();
  },

  'Edit passenger first, middle, and last name'() {
    editPassenger.editPassengerNames();
  },

  'Click Save and select "No" on the popup'() {
    editPassenger.saveUpdatedPassengerInfo();
    editPassenger.waitForElementVisible('@popup', 10000);
    editPassenger.clickVisible('@popupNo');
    editPassenger.waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify remain on the Edit Passenger page'(client) {
    editPassenger.assert.containsText('@pageHeader', 'Passenger Details');
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.editPassengerPageUrl}`);
  },

  'Click Cancel and select "No" on the popup'() {
    editPassenger.clickVisible('@cancel');
    editPassenger.waitForElementVisible('@popup', 10000);
    editPassenger.clickVisible('@popupNo');
  },

  'Verify remain on Edit Passenger page'(client) {
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.editPassengerPageUrl}`);
  },

  'Click Cancel and select "Yes" on the popup'() {
    editPassenger.clickVisible('@cancel');
    editPassenger.waitForElementVisible('@popup', 10000);
    editPassenger.clickVisible('@popupYes');
    editPassenger.waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify return to View Reservation Details page'(client) {
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.viewReservationDetailsUrl}/RDOCHK`);
  },

  'Return to edit passenger details page and edit passenger information'() {
    editPassenger.openEditPassengerPage();
    editPassenger.editPassengerNames();
  },

  'Click Save and select Yes on the popup'() {
    editPassenger.saveUpdatedPassengerInfo();
    editPassenger.waitForElementVisible('@popup', 10000);
    editPassenger.clickVisible('@popupYes');
    editPassenger.waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify return to View Reservation Details page after saving'(client) {
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.viewReservationDetailsUrl}/RDOCHK`);
  },

  after(client) {
    client.end();
  }
};
