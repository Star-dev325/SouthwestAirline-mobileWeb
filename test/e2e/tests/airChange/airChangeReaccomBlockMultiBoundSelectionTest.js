'use strict';

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeProductList;
let airChangeReaccomTripSummary;
let login;
let navDraw;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
    airChangeProductList = client.page.airChangeProductList();
    airChangeReaccomTripSummary = client.page.airChangeReaccomTripSummary();
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
      .withConfirmationNumber('REACMB')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .continue();
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Show the select page and select only one bound'() {
    login
      .assert.containsText('@LoginLink', 'Log in');

    airChangeSelect
      .assert.containsText('@outbound', '750')
      .assert.containsText('@inbound', '973')
      .selectOutboundFlight()
      .assert.elementPresent('.checkbox-button_checked')
      .assert.elementPresent('[name="firstbound"] .checkbox-button_checked')
      .selectInboundFlight()
      .assert.elementPresent('[name="secondbound"] .checkbox-button_checked')
      .assert.elementNotPresent('[name="firstbound"] .checkbox-button_checked');
  },

  'Go the shopping page'() {
    airChangeSelect.submit();
  },

  'Select new flight'() {
    airChangeProductList
      .withReaccomFlightProduct(4)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify Trip Summary Page and Confirm Change'() {
    airChangeReaccomTripSummary
      .waitForElementNotVisible('.dimmer', 10000);

    airChangeReaccomTripSummary
      .assert.containsText('@pageTitle', 'Trip Summary')
      .assert.containsText('@flightSummaryDeparting', 'Departing')
      .assert.containsText('@flightSummaryReturning', 'Returning');
  },

  after(client) {
    client.end();
  }
};
