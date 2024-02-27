'use strict';

let homePage, login, sessionExpired;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    sessionExpired = client.page.shared.sessionExpired();

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

  'Session expired'(client) {
    client.expiredLoginSession();
  },

  'User refreshes on home page - should not see session timeout popup'(client) {
    client
      .refresh()
      .assert.title(client.globals.title);
  },

  'User should not see session timeout popup'() {
    sessionExpired.assert.elementNotPresent('@sessionExpiredConfirmButton');
  },

  after(client) {
    client.end();
  }
};
