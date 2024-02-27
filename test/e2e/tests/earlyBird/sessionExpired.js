'use strict';

let detail, earlyBirdCheckIn, earlyBirdConfirmation, homePage, login, navDraw, review;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    earlyBirdCheckIn = client.page.earlyBirdCheckIn();
    detail = client.page.detail();
    review = client.page.review();
    navDraw = client.page.navDraw();
    login = client.page.login();
    earlyBirdConfirmation = client.page.earlyBirdConfirmation();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'Login user to do authenticated purchase'(client) {
    homePage.goToLogin();

    login
      .waitForElementPresent('@subTitle', 10000)
      .waitForElementPresent('@rememberMeBox', 10000)
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .continue();
  },

  'go to early bird from nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@EarlyBirdCheckIn');
  },

  'On earlyBird checkIn page'() {
    earlyBirdCheckIn.waitForElementVisible('@earlyBirdCheckInBanner', 1000)
      .assert.containsText('@pageHeader', 'EarlyBird Check-In')
      .assert.containsText('@retrieveReservation', 'Retrieve reservation');
  },

  'Search for a reservation'() {
    earlyBirdCheckIn
      .withConfirmationNumber('NALVRY')
      .withFirstName('I')
      .withLastName('Li')
      .saveSnapshot('fill reservation details')
      .continue();
  },

  'Go to purchase review page'() {
    detail
      .continue();
    review.purchase();
  },

  'finish purchase'(client) {
    earlyBirdConfirmation
      .waitForElementPresent('@iconCheck', 10000)
      .assert.urlEquals(`${client.launch_url}/earlybird/checkin/ABC123/confirmation`);
  },

  'Go back to home'(client) {
    client.back();
    client.assert.urlEquals(`${client.launch_url}/`);
  },

  after(client) {
    client.end();
  }
};
