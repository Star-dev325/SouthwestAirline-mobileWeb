'use strict';

let boardingPass, checkIn, confirmation, hazmatDeclaration, login, navDraw;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    checkIn = client.page.checkIn();
    confirmation = client.page.confirmation();
    login = client.page.login();
    navDraw = client.page.navDraw();
    hazmatDeclaration = client.page.hazmatDeclaration();
    boardingPass = client.page.boardingPass();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Go to check in from Nav draw'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@CheckIn');
  },

  'Search for a reservation'() {
    checkIn
      .withConfirmationNumber('RMXAUA')
      .withFirstName('helen')
      .withLastName('wang')
      .saveSnapshot('fill checkin details')
      .continue();
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
