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

  'Retrieve flight reservation'() {
    viewReservation.withConfirmationNumber('RDO2CH')
      .withFirstName('Carol')
      .withLastName('Biggs')
      .continue();
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

  'Click Save and should not see a popup'() {
    editPassenger.saveUpdatedPassengerInfo();
    editPassenger.waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify return to View Reservation Details page after saving'(client) {
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.viewReservationDetailsUrl}/RDO2CH`);
  },

  'Return to edit passenger details page and edit passenger information'() {
    editPassenger.openEditPassengerPage();
    editPassenger.editPassengerNames();
  },

  'Click cancel, see popup, and select no'() {
    editPassenger.clickVisible('@cancel');
    editPassenger.waitForElementVisible('@popup', 10000);
    editPassenger.clickVisible('@popupNo');
  },

  'Verify remain on the Edit Passenger page'(client) {
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.editPassengerPageUrl}`);
  },

  'Click cancel, see popup, and select yes'() {
    editPassenger.clickVisible('@cancel');
    editPassenger.waitForElementVisible('@popup', 10000);
    editPassenger.clickVisible('@popupYes');
    editPassenger.waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify return to the View Reservation Details page'(client) {
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.viewReservationDetailsUrl}/RDO2CH`);
  },

  after(client) {
    client.end();
  }
};
