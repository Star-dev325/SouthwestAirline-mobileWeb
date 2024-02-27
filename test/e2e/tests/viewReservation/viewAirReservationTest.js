'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let homePage;
let viewReservation;
let tripDetails;
let login;
let upcomingTripList;
let navDraw;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    login = client.page.login();
    upcomingTripList = client.page.upcomingTripList();
    navDraw = client.page.navDraw();

    homePage.open();

    login.withDefaults('thehack2', 'Test1234');
    client.pause(1000);
    navDraw.openMenu().viewReservations();
  },

  'Verify View Reservation home page'() {
    viewReservation
      .waitForElementVisible('@viewUpcomingTripsLink', 10000)
      .assert.attributeEquals('@confirmationNumber', 'placeholder', 'Confirmation #')
      .assert.attributeEquals('@firstName', 'placeholder', 'First name')
      .assert.attributeEquals('@lastName', 'placeholder', 'Last name')
      .assert.containsText('@retrieveReservation', 'Retrieve reservation');
  },

  'Go to upcoming trips page and back'(client) {
    viewReservation.clickVisible('@viewUpcomingTripsLink');

    upcomingTripList
      .waitForElementVisible('@upcomingTripList', 10000)
      .assert.urlContains('/my-account/upcoming-trips');
    client.back();
  },

  'Find flight reservation through confirmation number'() {
    viewReservation.withConfirmationNumber('VIWAIR')
      .withFirstName('amber')
      .withLastName('awesome')
      .saveSnapshot('details filled');
  },

  'when user click browser back'(client) {
    client.back().forward();
  },
  'Cached form data should be prefilled in air reservation form'() {
    viewReservation
      .waitForElementVisible('@viewUpcomingTripsLink', 10000)
      .assert.value('@confirmationNumber', 'VIWAIR')
      .assert.value('@firstName', 'amber')
      .assert.value('@lastName', 'awesome');
  },

  'User go to view reservation page by click link'(client) {
    client
      .back()
      .pause(1000);
    navDraw.openMenu().viewReservations();
  },

  'Cached form data should be clean out'() {
    viewReservation
      .waitForElementVisible('@viewUpcomingTripsLink', 10000)
      .assert.value('@confirmationNumber', '')
      .assert.value('@firstName', '')
      .assert.value('@lastName', '');
  },

  'Enter flight reservation again and submit'() {
    viewReservation.withConfirmationNumber('VIWAIR')
      .withFirstName('amber')
      .withLastName('awesome')
      .continue();
  },

  'Verify view trip details page'() {
    tripDetails
      .waitForElementVisible('@tripDetailsCard', 10000)
      .assert.urlContains('view-reservation/trip-details')
      .assert.containsText('@pageHeader', 'MDW - DAL')
      .assert.containsText('@tripDetailsCard', 'Aug 15')
      .assert.containsText('@tripDetailsCard', 'Dallas')
      .assert.containsText('@tripDetailsCard', 'Chicago (Midway), IL to')
      .assert.containsText('@tripDetailsCard', 'Dallas (Love Field), TX')
      .assert.containsText('@tripDetailsCard', 'VIWAIR')
      .assert.containsText('@tripDetailsCard', 'YANG LU')
      .assert.containsText('@flightDay', 'Tue, Aug 15, 2017')
      .assert.containsText('@fareType', 'Wanna Get Away')
      .assert.containsText('@paxTypeAndNum', '1 Passenger')
      .assert.containsText('@cancelButton', 'Cancel')
      .assert.containsText('@changeButton', 'Change')
      .saveSnapshot('on trip details page');
  },

  'Verify Air View Reservation Analytics Store is valid after searching successfully'(client) {
    Analytics.verifyStore(client, 'AirViewReservationStore');
  },

  'Search history section should be presented'(client) {
    client.back();
    viewReservation
      .waitForElementPresent('@recentTripSearchList', 10000)
      .assert.containsText('@recentTripSearchPassengerName', 'Amber Awesome')
      .assert.containsText('@recentTripSearchConfirmationNumber', 'VIWAIR');
  },

  'Refresh view reservation page and history section should be presented again'(client) {
    client.refresh();
    viewReservation
      .waitForElementPresent('@recentTripSearchList', 10000)
      .assert.containsText('@recentTripSearchPassengerName', 'Amber Awesome')
      .assert.containsText('@recentTripSearchConfirmationNumber', 'VIWAIR');
  },

  after(client) {
    client.end();
  }
};
