'use strict';

let confirmation, hazmatDeclaration, homePage, login, myAccount, navDraw, upcomingTripList;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    myAccount = client.page.myAccount();
    upcomingTripList = client.page.upcomingTripList();
    confirmation = client.page.confirmation();
    hazmatDeclaration = client.page.hazmatDeclaration();

    homePage.open()
      .assert.title(client.globals.title);

    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementVisibleWithDefaultTimeout('.home-and-nav');
  },

  'Go MyAccount home page'() {
    navDraw
      .openMenu().myAccount();
  },

  'Verify MyAccount home page'(client) {
    client.assert.urlContains('/my-account');

    myAccount.waitUpNextdisplay()
      .waitUpcomingTripsDisplay();

    myAccount.assert.containsText('@nextUpTripTitle', 'Austin')
      .assert.containsText('@tripsNumber', 22)
      .saveSnapshot('on my account page');
  },

  'Go to upcoming trips page and tap on Check in button'() {
    myAccount.tapTripsNumber();

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
      .clickDisagree();
  },

  'Verify Check in confirmation page on Disagree and tap Boarding Pass'() {
    confirmation
      .waitForElementVisible('@boardingPass', 10000)
      .assert.urlContains('/confirmation')
      .continue();
  },

  'Verify Hazmat Declaration page and tap Continue button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'Verify Boarding Pass page'(client) {
    client.waitForElementVisibleWithDefaultTimeout('.mobile-boarding-pass')
      .assert.urlContains('/check-in/boarding-pass');
  },

  after(client) {
    client.end();
  }
};
