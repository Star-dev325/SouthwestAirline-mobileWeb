'use strict';

let viewReservation;
let tripDetails;
let airChangeSelect;
let login;
let navDraw;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
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
      .withConfirmationNumber('OPENJW')
      .withFirstName('TEST')
      .withLastName('WANG')
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
      .assert.containsText('@outbound', '65')
      .assert.containsText('@inbound', '1817/1911')
      .selectOutboundFlight()
      .assert.elementPresent('.checkbox-button_checked')
      .selectInboundFlight()
      .assert.elementPresent('.checkbox-button_checked')
      .submit()
      .assert.containsText('@openJawDialogTitle', 'Both flights can only be changed on Southwest.com.');
  },

  after(client) {
    client.end();
  }
};
