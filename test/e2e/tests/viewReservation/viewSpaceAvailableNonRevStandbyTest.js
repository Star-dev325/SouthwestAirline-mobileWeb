'use strict';

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
    viewReservation.withConfirmationNumber('2IGGMN')
      .withFirstName('John')
      .withLastName('Doe')
      .saveSnapshot('details filled');
  },

  'when user click browser back'(client) {
    client.back().forward();
  },
  'Cached form data should be prefilled in air reservation form'() {
    viewReservation
      .waitForElementVisible('@viewUpcomingTripsLink', 10000)
      .assert.value('@confirmationNumber', '2IGGMN')
      .assert.value('@firstName', 'John')
      .assert.value('@lastName', 'Doe');
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
    viewReservation.withConfirmationNumber('2IGGMN')
      .withFirstName('John')
      .withLastName('Doe')
      .continue();
  },

  'Verify view trip details page'() {
    tripDetails
      .waitForElementVisible('@tripDetailsCard', 10000)
      .assert.urlContains('view-reservation/trip-details')
      .assert.containsText('@pageHeader', 'AUS - ALB')
      .assert.containsText('@tripDetailsCard', 'Oct 28 - 30')
      .assert.containsText('@tripDetailsCard', 'Austin')
      .assert.containsText('@tripDetailsCard', 'Austin, TX to')
      .assert.containsText('@tripDetailsCard', 'Albany, NY')
      .assert.containsText('@tripDetailsCard', '2IGGMN')
      .assert.containsText('@tripDetailsCard', 'John Doe JR')
      .assert.containsText('@flightDay', 'Wed, Oct 28, 2020')
      .assert.containsText('@fareType', 'Unavailable')
      .assert.containsText('@paxTypeAndNum', '1 Passenger')
      .assert.containsText('@yellowButton', 'Security document')
      .saveSnapshot('on trip details page');
  },

  'Search history section should be presented'(client) {
    client.back();
    viewReservation
      .waitForElementPresent('@recentTripSearchList', 10000)
      .assert.containsText('@recentTripSearchPassengerName', 'John Doe')
      .assert.containsText('@recentTripSearchConfirmationNumber', '2IGGMN');
  },

  'Refresh view reservation page and history section should be presented again'(client) {
    client.refresh();
    viewReservation
      .waitForElementPresent('@recentTripSearchList', 10000)
      .assert.containsText('@recentTripSearchPassengerName', 'John Doe')
      .assert.containsText('@recentTripSearchConfirmationNumber', '2IGGMN');
  },

  after(client) {
    client.end();
  }
};
