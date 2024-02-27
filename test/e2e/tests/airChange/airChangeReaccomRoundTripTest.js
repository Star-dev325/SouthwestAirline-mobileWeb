'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeProductList;
let airChangeReaccomTripSummary;
let airChangeConfirmation;
let login;
let navDraw;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
    airChangeProductList = client.page.airChangeProductList();
    airChangeReaccomTripSummary = client.page.airChangeReaccomTripSummary();
    airChangeConfirmation = client.page.airChangeConfirmation();
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
      .withConfirmationNumber('REACC2')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .continue();
  },

  'Verify Air View Reservation Analytics Store, Page and Message are valid after searching successfully'(client) {
    Analytics.verifyStore(client, 'AirViewReservationStore', (store) => {
      store.details.isReaccom.should.eql(true);
    });
    Analytics.verifyPageView(client, 'view-reservation-trip-details-REACC2');
    Analytics.verifyMessage(client, {
      customer: 'REACCOM_VIEW_RESERVATION',
      customerdisplay: '1'
    });
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Show the select page'(client) {
    login
      .assert.containsText('@LoginLink', 'Log in');

    airChangeSelect
      .assert.containsText('@outbound', '750')
      .assert.containsText('@inbound', '973');

    Analytics.verifyPageView(client, 'air-change');
  },

  'Go the shopping page'() {
    airChangeSelect.submit();
  },

  'Select new flights'() {
    airChangeProductList
      .withReaccomFlightProduct(4)
      .withReaccomFlightProduct(4)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify Trip Summary Page and Confirm Change'(client) {
    airChangeReaccomTripSummary
      .waitForElementNotVisible('.dimmer', 10000);

    Analytics.verifyPageView(client, 'air-change-reaccom-summary');

    airChangeReaccomTripSummary
      .assert.containsText('@pageTitle', 'Trip Summary')
      .assert.containsText('@flightSummaryDeparting', 'Departing')
      .assert.containsText('@flightSummaryReturning', 'Returning')
      .confirmChange();
  },

  'Verify Confirmation Page'(client) {
    airChangeConfirmation
      .waitForElementVisible('@tripBookedMessage', 10000)
      .saveSnapshot('reaccom roundtrip confirmation')
      .assert.urlContains('air/change/confirmation')
      .assert.containsText('@tripBookedMessage', 'Your trip is booked!')
      .assert.containsText('@destinationAirport', 'Austin')
      .assert.containsText('@userName', 'Amber Awesome')
      .assert.containsText('@rapidRewardsAccount', '601725003')
      .assert.containsText('@pnr', 'REACC2')
      .assert.elementPresent('@flightSummaryCard')
      .assert.elementPresent('@flightSummaryDeparting')
      .assert.elementPresent('@flightSummaryReturning');

    Analytics.verifyPageView(client, 'air-change-confirmation');
  },

  after(client) {
    client.end();
  }
};
