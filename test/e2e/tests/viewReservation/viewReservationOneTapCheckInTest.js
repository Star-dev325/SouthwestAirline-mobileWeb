'use strict';

let boardingPass,
  confirmation,
  hazmatDeclaration,
  homePage,
  login,
  navDraw,
  upcomingTripList,
  viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    viewReservation = client.page.viewReservation();
    login = client.page.login();
    upcomingTripList = client.page.upcomingTripList();
    navDraw = client.page.navDraw();
    confirmation = client.page.confirmation();
    hazmatDeclaration = client.page.hazmatDeclaration();
    boardingPass = client.page.boardingPass();

    homePage.open();

    login.withDefaults('thehack2', 'Test1234');
    client.pause(1000);
  },

  'Go View Reservation home page'() {
    navDraw.openMenu().viewReservations();
  },

  'Verify View Reservation home page and go to upcoming trips page'() {
    viewReservation
      .waitForElementVisible('@viewUpcomingTripsLink', 10000)
      .clickVisible('@viewUpcomingTripsLink');
  },

  'Verify upcoming trips page and tap on check in button'() {
    upcomingTripList
      .waitForElementVisible('@upcomingTripList', 10000)
      .assert.urlContains('/my-account/upcoming-trips')
      .clickVisible('@checkInButton');
  },

  'Check in confirmation page'() {
    confirmation
      .waitForElementVisible('@boardingPass', 10000)
      .assert.urlContains('/confirmation')
      .assert.containsText('@successMessage', 'You\'re checked in!')
      .saveSnapshot('checkin confirmation page');
  },

  'Click on 1st boarding pass'() {
    confirmation.continue();
  },

  'Verify Hazmat Declaration page and tap on Disagree button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .assert.elementPresent('@hazmatInfoLink')
      .clickDisagree();
  },

  'Verify Check in confirmation page on Disagree and tap on Boarding Pass'() {
    confirmation
      .waitForElementVisible('@boardingPass', 10000)
      .assert.urlContains('/confirmation')
      .continue();
  },

  'Verify Hazmat Declaration page'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'Verify Boarding Pass page'(client) {
    client.waitForElementVisibleWithDefaultTimeout('.mobile-boarding-pass')
      .assert.urlContains('/check-in/boarding-pass');
  },

  'Go back and forward'(client) {
    client.back().forward();

    boardingPass
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisibleWithDefaultTimeout('@boardingPass');
  },

  after(client) {
    client.end();
  }
};
