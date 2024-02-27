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

  'Go to edit passenger details page and edit passenger information'() {
    editPassenger.openEditPassengerPage();
    editPassenger.setValueVisible('@firstName', 'e');
  },

  'Browse back and return to view reservation page'(client) {
    client.back();
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.viewReservationDetailsUrl}/RDO2CH`);
  },

  'Browse forward and return to edit passenger page with changed name'(client) {
    client.forward();
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.editPassengerPageUrl}`);
    editPassenger.assert.value('@firstName', 'Carole');
  },

  'Browse back to view reservation page'(client) {
    client.back();
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.viewReservationDetailsUrl}/RDO2CH`);
  },

  'Go to edit passenger page and see the original name'() {
    editPassenger.openEditPassengerPage();
    editPassenger.assert.value('@firstName', 'Carol');
  },

  'Refresh and go back to view reservation search page'(client) {
    client.refresh();
    client.assert.urlEquals(`${client.launchUrl}${editPassenger.viewReservationUrl}`);
  },

  after(client) {
    client.end();
  }
};
