'use strict';

let carDetails, hazmatDeclaration, homePage, login, myAccount, navDraw, tripDetails, upcomingTripList;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    myAccount = client.page.myAccount();
    upcomingTripList = client.page.upcomingTripList();
    tripDetails = client.page.tripDetails();
    carDetails = client.page.carDetails();
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
    myAccount
      .waitForElementVisibleWithDefaultTimeout('@ptsGroup')
      .assert.containsText('@logoutLink', 'Log out')
      .assert.containsText('@pageHeader', 'My Account')
      .assert.containsText('@userName', 'Ron Hackmann')
      .assert.containsText('@accountNumber', '600597056')
      .assert.elementNotPresent('@exclusivePromoAvailNum', '4')
      .assert.containsText('@pastFlightsLink', 'Past Flights')
      .assert.containsText('@savedFlightsLink', 'Saved Flights');

    myAccount.waitUpNextdisplay();
    myAccount.waitUpcomingTripsDisplay();

    myAccount.assert.containsText('@nextUpTripTitle', 'Austin')
      .assert.containsText('@tripsNumber', 22)
      .saveSnapshot('on my account page');
  },

  'Clicking on next up takes you to trip details'() {
    myAccount.tapNexUpcomingTrip();
  },

  'Verify flight trip details page'() {
    tripDetails._isVisible();

    tripDetails.assert.urlContains('/my-account/upcoming-trip-details/0')
      .assert.containsText('@pageHeader', 'DAL - HOU')
      .assert.containsText('@tripDetailsCard', 'Aug 31')
      .assert.containsText('@tripDetailsCard', 'Houston')
      .assert.containsText('@tripDetailsCard', 'Dallas (Love Field), TX to')
      .assert.containsText('@tripDetailsCard', 'Houston (Hobby), TX')
      .assert.containsText('@tripDetailsCard', 'JAXNZG')
      .assert.containsText('@tripDetailsCard', 'QIANQIAN WANG')
      .assert.containsText('@tripDetailsCard', '601141461')
      .assert.containsText('@cancelButton', 'Cancel')
      .assert.containsText('@changeButton', 'Change')
      .saveSnapshot('on up next trip flight detail page');
  },

  'Verify change flight button and back'(client) {
    tripDetails
      .clickVisible('@changeButton')
      .waitForElementVisibleWithDefaultTimeout('.air-change');

    client.assert.urlContains('/air/change')
      .back();
  },

  'Go Upcoming trips page'(client) {
    client.back();
  },

  'Tap Trips number banner'() {
    myAccount
      .waitUpcomingTripsDisplay()
      .waitForElementVisibleWithDefaultTimeout('.my-account')
      .tapTripsNumber();
  },

  'Verify Upcoming trips page and take you to the first upcoming car trip'() {
    upcomingTripList.waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .tapNextUpcomingCarTrip()
      .waitForElementVisibleWithDefaultTimeout('.lazy-loaded-car');
  },

  'Verify car trip details page'() {
    carDetails.waitForElementPresent('@carImg', 10000)
      .assert.containsText('@pageHeader', 'Reservation')
      .assert.containsText('@pickupTime', '9/16/2017')
      .assert.containsText('@pickupLocation', 'Dallas (Love Field), TX')
      .assert.containsText('@driverName', 'Cannon Biggs')
      .assert.containsText('@carConfirmCode', '08172185US0')
      .waitForElementPresent('@manageButton', 10000)
      .clickVisible('@manageButton')
      .waitForElementPresent('@addAnotherCarLink', 10000)
      .waitForElementPresent('@cancelCar', 10000)
      .waitForElementPresent('@cancelLinkOnCarTab', 10000)
      .saveSnapshot('on up next trip car detail page');
  },

  'Go Upcoming trips page again'(client) {
    client.back();
  },

  'Verify check in button in upcoming trips page and back'(client) {
    upcomingTripList.waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .clickVisible('@checkInButton');

    client.waitForElementVisibleWithDefaultTimeout('.check-in-confirmation')
      .assert.urlContains('/check-in/confirmation')
      .back();
  },

  'Verify view boarding pass button in upcoming trips page'() {
    upcomingTripList.waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .clickVisible('@viewBoardingPass');
  },

  'Verify Hazmat Declaration page and tap Continue button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'Verify boarding pass page and back'(client) {
    client.waitForElementVisibleWithDefaultTimeout('.mobile-boarding-pass')
      .assert.urlContains('/check-in/boarding-pass')
      .back();
  },

  'Verify view boarding passes button in upcoming trips page and back'(client) {
    upcomingTripList.waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .clickVisible('@viewBoardingPassesMultiPax');
    client.waitForElementVisibleWithDefaultTimeout('.check-in')
      .assert.urlContains('/check-in/boarding-positions')
      .back();
  },

  'Verify Upcoming trips page'(client) {
    upcomingTripList.waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .waitForElementVisibleWithDefaultTimeout('.my-trips-header')
      .assert.containsText('@upcomingTripList', '22')
      .assert.containsText('@logoutLink', 'Log out');

    client
      .refresh()
      .pause(1000, () => {
        upcomingTripList.waitForTripListDisplay()
          .assert.urlContains('/my-account/upcoming-trips')
          .assert.containsText('@upcomingTripList', '22')
          .saveSnapshot('tapped trips number');
      });
  },

  'refresh should back to upcoming trips page'(client) {
    client.refresh(() => {
      client.waitForElementVisibleWithDefaultTimeout('.my-trips-header')
        .assert.urlContains('/my-account/upcoming-trips');
      login.logout()
        .saveSnapshot('log out');
      client.end();
    });
  }
};
