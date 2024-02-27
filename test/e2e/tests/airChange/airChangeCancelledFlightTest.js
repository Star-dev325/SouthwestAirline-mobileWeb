'use strict';

let viewReservation;
let tripDetails;
let airChangeSelect;
let navDraw;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
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
      .withConfirmationNumber('U5NLCS')
      .withFirstName('TEST')
      .withLastName('WANG')
      .continue();
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Verify the bound effected by dynamic waiver is pre-selected'() {
    airChangeSelect
      .assert.elementPresent('.checkbox-button_checked');
  },

  after(client) {
    client.end();
  }
};
