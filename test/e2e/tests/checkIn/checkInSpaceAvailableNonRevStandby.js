/* eslint-disable prefer-arrow-callback */
'use strict';
const _ = require('lodash');

let boardingPass, checkIn, confirmation, hazmatDeclaration, homePage, login;

const setWindowStubs = (client) => {
  client.execute(function () {
    _.set(
      window,
      'document.cookie',
      'id_token=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NzMzMTg0MSwiaWF0IjoxNjY3MzMxODQxLCJhenAiOiIvIn0.UgoB7_FZumSOOeeUSR32TjSSsrm25w8WvQj3sha3JT4'
    );
  }, []);
  client.pause(10000);
};

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    checkIn = client.page.checkIn();
    confirmation = client.page.confirmation();
    homePage = client.page.homePage();
    boardingPass = client.page.boardingPass();
    login = client.page.login();
    hazmatDeclaration = client.page.hazmatDeclaration();

    client.init().assert.title(client.globals.title);
  },

  'go to check in from homepage'() {
    homePage.goToCheckIn();
  },

  'Before login user'() {
    checkIn.waitForElementNotPresent('.eligible-check-in-trips-link', 10000);
  },

  'set window stubs to set javascript interface'(client) {
    setWindowStubs(client);
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementVisible('.reservation-retrieval-form', 10000);
  },

  'After login user'() {
    checkIn.waitForElementVisible('.eligible-check-in-trips-link', 10000);
  },

  'Click the upcoming trips banner to upcomingTripsPage then go back,'(client) {
    checkIn.assert.urlContains('/check-in').clickVisible('.eligible-check-in-trips-link');
    client.waitForElementVisible('.my-trips-header', 10000).assert.urlContains('/my-account/upcoming-trips').back();
  },

  'Search for a reservation'() {
    checkIn
      .withConfirmationNumber('2IGGMN')
      .withFirstName('John')
      .withLastName('Doe')
      .saveSnapshot('fill checkin details')
      .continue();
  },

  'Check in confirmation page'() {
    confirmation
      .waitForElementVisible('@securityDocument', 10000)
      .assert.containsText('@successMessage', "You're on standby.")
      .saveSnapshot('checkin confirmation page');
  },

  'Go to boarding pass page'() {
    checkIn.viewBoardingPass();
  },

  'Verify Hazmat Declaration page and tap Continue button'() {
    hazmatDeclaration
      .waitForElementVisible('@hazmatDeclaration', 10000)
      .assert.urlContains('/hazmat-declaration')
      .continue();
  },

  'Confirm Contents of MBP'() {
    boardingPass
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisibleWithDefaultTimeout('@boardingPass')
      .waitForElementVisibleWithDefaultTimeout('@securityDocument');
  },

  'Go back and forward'(client) {
    client.back().forward();

    boardingPass
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisibleWithDefaultTimeout('@boardingPass')
      .waitForElementVisibleWithDefaultTimeout('@securityDocument');
  },

  after(client) {
    client.end();
  }
};
