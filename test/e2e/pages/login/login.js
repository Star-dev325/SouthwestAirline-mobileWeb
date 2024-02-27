'use strict';

const login = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  withDefaults(username, password) {
    return this.clickVisible('@LoginLink')
      ._setValue('@Username', username)
      ._setValue('@Password', password)
      .clickVisible('@LoginButton');
  },
  logout() {
    return this.clickVisible('@LoginLink');
  },
  withUser(username) {
    return this._setValue('@Username', username);
  },
  withPass(password) {
    return this._setValue('@Password', password);
  },
  continue() {
    return this.clickVisible('@LoginButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  continueAsGuest() {
    return this.clickVisible('@continueAsGuest');
  }
};

module.exports = {
  elements: {
    loginPage: '.login-page',
    loginForm: 'form[name=login]',
    usingPointsPrompt: '[data-qa="login-prompt"]',
    Username: 'input[name=userNameOrAccountNumber]',
    Password: 'input[name=password]',
    LoginLink: '.login-btn',
    LoginButton: '#login-btn',
    subTitle: '.action-bar--main-title',
    rememberMeText: '.checkbox-button--children',
    rememberMeBox: '.icon_check',
    loginInHelpLink: '.pblue',
    rewardYourselfText: '.heading',
    enrollButton: 'button[name="enrollButton"]',
    continueAsGuest: '.continue-as-guest'
  },

  commands: [login]
};
