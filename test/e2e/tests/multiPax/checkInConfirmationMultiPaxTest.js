'use strict';

let boardingPass, checkIn, chooseMobileBoardingPasses, confirmation, hazmatDeclaration, homePage, login, navDraw;

const Analytics = require('test/e2e/analytics/analytics');

module.exports = {
  before(client) {
    checkIn = client.page.checkIn();
    confirmation = client.page.confirmation();
    homePage = client.page.homePage();
    boardingPass = client.page.boardingPass();
    login = client.page.login();
    navDraw = client.page.navDraw();
    chooseMobileBoardingPasses = client.page.chooseMobileBoardingPasses();
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

  'Go to check in from hamburger menu'() {
    navDraw
      .openMenu()
      .checkIn();
  },

  'Search for a reservation'() {
    checkIn
      .withConfirmationNumber('RMXAUA')
      .withFirstName('helen')
      .withLastName('wang')
      .saveSnapshot('fill multi pax checkin details')
      .continue();
  },

  'Check in confirmation page'() {
    confirmation
      .waitForElementVisible('@boardingPass', 10000)
      .assert.containsText('@successMessage', 'You\'re checked in!')
      .saveSnapshot('checkin confirmation page');
  },

  'Verify analytics isMultiPaxPNR is set to true'(client) {
    Analytics.verifyStore(client, 'CheckInStore/multiPax', (checkInStore) => {
      checkInStore.multiPax.isMultiPaxPNR.should.eql(true);
    });
  },

  'Click on 1st boarding pass'() {
    confirmation.viewBoardingPass(1, 1);
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
    confirmation
      .waitForElementVisibleWithDefaultTimeout('@viewAllBoardingPasses')
      .viewBoardingPass(1, 2);
  },

  'Mobile boarding pass page should show only 2nd passenger\'s boarding passes'() {
    boardingPass.passengerBoardingPassIsShown('ANDREW TERRIS');
  },

  'Go back and click on 3rd boarding pass'(client) {
    client
      .back();
    confirmation
      .waitForElementVisibleWithDefaultTimeout('@viewAllBoardingPasses')
      .viewBoardingPass(1, 3);
  },

  'Mobile boarding pass page should show only 3rd passenger\'s boarding passes'() {
    boardingPass.passengerBoardingPassIsShown('Bob Bobster');
  },

  'Go back and click on View All Boarding Passes'(client) {
    client
      .back();
    confirmation
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

  'Verify analytics selectedMultipleTravelers is set to true when multiple travelers BPs are displayed'(client) {
    Analytics.verifyStore(client, 'CheckInStore/boardingPassView', (checkInStore) => {
      checkInStore.boardingPassView.selectedMultipleTravelers.should.eql(true);
    });
  },

  'Go back and uncheck 2nd passenger'(client) {
    client
      .back();
    chooseMobileBoardingPasses
      .clickPassengerCheckboxByName('ANDREW TERRIS')
      .clickVisible('@continue');
  },

  'Mobile boarding pass page should show 1st and 3rd and passenger\'s boarding passes'() {
    boardingPass
      .waitForElementVisibleWithDefaultTimeout('@boardingPass')
      .passengerBoardingPassIsShown('HELEN WANG', 1)
      .clickVisible('@rightArrow')
      .passengerBoardingPassIsShown('Bob Bobster', 2);
  },

  'Go back and uncheck 3rd passenger'(client) {
    client
      .back();
    chooseMobileBoardingPasses
      .clickPassengerCheckboxByName('Bob Bobster')
      .clickVisible('@continue');
  },

  'Mobile boarding pass page should show on 1st passenger\'s boarding pass'() {
    boardingPass
      .waitForElementVisibleWithDefaultTimeout('@boardingPass')
      .passengerBoardingPassIsShown('HELEN WANG', 1);
  },

  'Verify analytics selectedMultipleTravelers is set to false when only one travelers BPs are displayed'(client) {
    Analytics.verifyStore(client, 'CheckInStore/boardingPassView', (checkInStore) => {
      checkInStore.boardingPassView.selectedMultipleTravelers.should.eql(false);
    });
  },

  'Go back and check 2nd and 3rd passengers again'(client) {
    client
      .back();
    chooseMobileBoardingPasses
      .clickPassengerCheckboxByName('Bob Bobster')
      .clickPassengerCheckboxByName('ANDREW TERRIS');
  },

  'All passes button should be checked automatically'() {
    chooseMobileBoardingPasses
      .waitForElementPresent('@allPassesCheckboxSelected', 10000)
      .assert.elementPresent('@allPassesCheckboxSelected');
  },

  'Click off all passes button and click continue to see form validation'(client) {
    chooseMobileBoardingPasses
      .clickVisible('@allPassesCheckbox')
      .clickVisible('@continue');

    client
      .waitForElementPresent('.error-header', 10000)
      .assert.containsText('.error-header', 'Please choose at least one passenger to continue.');
  },

  'Select all passes again then continue'(client) {
    chooseMobileBoardingPasses.clickVisible('@allPassesCheckbox');
    client.pause(500);
    chooseMobileBoardingPasses.clickVisible('@continue');
  },

  'Mobile boarding pass page should show the 3 passenger\'s boarding passes again'() {
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
