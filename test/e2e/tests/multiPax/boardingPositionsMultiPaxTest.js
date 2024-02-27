'use strict';

let boardingPass, boardingPositions, chooseMobileBoardingPasses, hazmatDeclaration, homePage, login, navDraw, upcomingTripList, viewReservation;

module.exports = {
  before(client) {
    boardingPositions = client.page.boardingPositions();
    homePage = client.page.homePage();
    boardingPass = client.page.boardingPass();
    login = client.page.login();
    navDraw = client.page.navDraw();
    chooseMobileBoardingPasses = client.page.chooseMobileBoardingPasses();
    upcomingTripList = client.page.upcomingTripList();
    viewReservation = client.page.viewReservation();
    hazmatDeclaration = client.page.hazmatDeclaration();

    homePage
      .open()
      .assert.title(client.globals.title);
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementVisible('.home-nav-list', 10000);
  },

  'Go to view res from hamburger menu then click upcoming trips'() {
    navDraw.openMenu().viewReservations();

    viewReservation
      .waitForElementVisible('@viewUpcomingTripsLink', 10000)
      .clickVisible('@viewUpcomingTripsLink');
  },

  'Click view boarding passes button in upcoming trips page'() {
    upcomingTripList
      .waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .clickVisible('@viewBoardingPassesMultiPax');
  },

  'Click on 1st boarding pass'() {
    boardingPositions.viewBoardingPass(1, 1);
  },

  'Verify Hazmat Declaration page and tap Continue button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'Mobile boarding pass page should show only 1st passenger\'s boarding passes'() {
    boardingPass.passengerBoardingPassIsShown('HELEN WANG');
  },

  'Go back and click on 2nd boarding pass'(client) {
    client
      .back();
    boardingPositions
      .waitForElementVisibleWithDefaultTimeout('@viewAllBoardingPasses')
      .viewBoardingPass(1, 2);
  },

  'Mobile boarding pass page should show only 2nd passenger\'s boarding passes'() {
    boardingPass.passengerBoardingPassIsShown('ANDREW TERRIS');
  },

  'Go back and click on 3rd boarding pass'(client) {
    client
      .back();
    boardingPositions
      .waitForElementVisibleWithDefaultTimeout('@viewAllBoardingPasses')
      .viewBoardingPass(1, 3);
  },

  'Mobile boarding pass page should show only 3rd passenger\'s boarding passes'() {
    boardingPass.passengerBoardingPassIsShown('Bob Bobster');
  },

  'Go back and click on View All Boarding Passes'(client) {
    client
      .back();
    boardingPositions
      .waitForElementVisibleWithDefaultTimeout('@viewAllBoardingPasses')
      .clickVisible('@viewAllBoardingPasses');
  },

  'Mobile boarding pass page should show all 3 passenger\'s boarding passes'() {
    chooseMobileBoardingPasses
      .clickVisible('@continue');
    boardingPass
      .waitForElementVisibleWithDefaultTimeout('@boardingPass')
      .passengerBoardingPassIsShown('HELEN WANG', 1)
      .clickVisible('@rightArrow')
      .passengerBoardingPassIsShown('ANDREW TERRIS', 2)
      .clickVisible('@rightArrow')
      .passengerBoardingPassIsShown('Bob Bobster', 3);
  },

  after(client) {
    client.end();
  }
};
