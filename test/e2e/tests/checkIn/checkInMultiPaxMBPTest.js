'use strict';

let boardingPass, checkIn, confirmation, hazmatDeclaration, homePage, login, navDraw;

module.exports = {
  before(client) {
    checkIn = client.page.checkIn();
    confirmation = client.page.confirmation();
    homePage = client.page.homePage();
    boardingPass = client.page.boardingPass();
    login = client.page.login();
    navDraw = client.page.navDraw();
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

  'Go to mobile boarding pass page'() {
    checkIn.viewBoardingPass();
  },

  'Verify Hazmat Declaration page and tap Continue button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'View multiple boarding passes'(client) {
    client.back();
    checkIn
      .viewAllBoardingPasses()
      .continue();
    boardingPass
      .waitForElementVisibleWithDefaultTimeout('@paginationDotsWithArrows')
      .waitForElementNotVisible('@leftArrow', 10000)
      .waitForElementVisibleWithDefaultTimeout(boardingPass.getTextByLabelAndPos('departs', 1))
      .assert.containsText(boardingPass.getTextByLabelAndPos('departs', 1), 'Dallas (Love Field)')
      .clickVisible('@rightArrow')
      .waitForElementVisibleWithDefaultTimeout(boardingPass.getTextByLabelAndPos('departs', 2))
      .assert.containsText(boardingPass.getTextByLabelAndPos('arrives', 2), 'Boston (Boston Logan)')
      .waitForElementVisibleWithDefaultTimeout('@leftArrow')
      .waitForElementVisible('@rightArrow', 10000);
  },

  after(client) {
    client.end();
  }
};
