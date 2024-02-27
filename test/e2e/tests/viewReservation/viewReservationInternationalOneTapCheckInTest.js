'use strict';

let confirmation, homePage, login, navDraw, upcomingTripList, viewReservation;

module.exports = {
  '@tags': ['flaky'],
  before(client) {
    homePage = client.page.homePage();
    viewReservation = client.page.viewReservation();
    login = client.page.login();
    upcomingTripList = client.page.upcomingTripList();
    navDraw = client.page.navDraw();
    confirmation = client.page.confirmation();

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

  'Verify upcoming trips page and tap on international trip check in button'() {
    upcomingTripList
      .waitForElementVisible('@upcomingTripList', 10000)
      .assert.urlContains('/my-account/upcoming-trips')
      .clickVisible('@internationalTripCheckInButton');
  },

  // TODO: Find out why this is required locally but fails on Jenkins.
  // 'See missing documents passport pages and skip them'() {
  //   passportPage
  //     .waitForElementPresent('@passportNumber', 10000)
  //     .assert.urlContains('/check-in/1/passportPage')
  //     .skip()
  //     .waitForElementPresent('@passportNumber', 10000)
  //     .assert.urlContains('/check-in/2/passportPage')
  //     .skip()
  //     .waitForElementPresent('@passportNumber', 10000)
  //     .assert.urlContains('/check-in/3/passportPage')
  //     .skip();
  // },

  'Check in confirmation page'() {
    confirmation
      .waitForElementVisibleWithDefaultTimeout('@checkInDocuments')
      .assert.urlContains('/confirmation')
      .assert.containsText('@successMessage', 'You\'re checked in!')
      .saveSnapshot('checkin confirmation page');
  },

  after(client) {
    client.end();
  }
};
