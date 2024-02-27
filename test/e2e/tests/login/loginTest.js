'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let flightStatus, homePage, login;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    flightStatus = client.page.flightStatus();

    homePage.open()
      .assert.title(client.globals.title);
  },

  'Login user'(client) {
    login
      .saveSnapshot('on homepage')
      .assert.containsText('@LoginLink', 'Log in / Enroll')
      .clickVisible('@LoginLink')
      .waitForElementPresent('@subTitle', 10000)
      .assert.containsText('@subTitle', 'Login')
      .assert.containsText('@rememberMeText', 'Remember me')
      .waitForElementPresent('@rememberMeBox', 10000)
      .assert.attributeContains('@loginInHelpLink', 'href', 'https://southwest.com/account/recovery#needPassword?src=LinkMobileWeb&clk=LinkMobileWeb')
      .assert.containsText('@LoginButton', 'Log in')
      .assert.containsText('@rewardYourselfText', 'REWARD YOURSELF')
      .assert.containsText('@enrollButton', 'Enroll now')
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .saveSnapshot('credentials filled')
      .verify.urlContains(`${client.launchUrl}/login`)
      .continue();
  },

  'Verify home page after login'(client) {
    login.waitForElementPresent('@LoginLink', 2000)
      .assert.visible('@LoginLink')
      .assert.containsText('@LoginLink', 'Log out')
      .assert.urlEquals(`${client.launchUrl}/`);
  },

  'Verify Analytics for UserStore'(client) {
    Analytics.verifyStore(client, 'UserStore');
  },

  'Verify Analytics for LocaleStore'(client) {
    Analytics.verifyStore(client, 'LocaleStore');
  },

  'Go to airbooking page'() {
    homePage
      .goToBookAFlight();
  },

  'Logout user'() {
    login.waitForElementPresent('@LoginLink', 1000)
      .saveSnapshot('on homepage as logged in user')
      .logout();
  },

  'Verify home page after logout'(client) {
    login.assert.containsText('@LoginLink', 'Log in / Enroll')
      .assert.urlEquals(`${client.launchUrl}/?clk=GNAVLOGOUT2`)
      .saveSnapshot('back to homepage');
  },

  'Click browser back multiple times'(client) {
    client.back();
    client.back();
    client.back();
  },

  'User is still on home page'(client) {
    client.waitForElementNotVisible('.dimmer', 10000)
      .assert.urlEquals(`${client.launchUrl}/`);
  },

  'Logout and go to flight status list page'() {
    login.logout();
    homePage.goToFlightStatus();
  },

  'Login success'(client) {
    login
      .assert.containsText('@LoginLink', 'Log in / Enroll')
      .clickVisible('@LoginLink')
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .continue();
  },

  'Verify click back on flightStatus page will leave current page'(client) {
    flightStatus.waitForElementPresent('@fromAirport', 10000);
    client.back();

    flightStatus.waitForElementNotPresent('@fromAirport', 10000);
  },

  after(client) {
    client.end();
  }
};
