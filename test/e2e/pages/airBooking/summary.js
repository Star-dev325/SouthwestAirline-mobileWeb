const page = {
  continue() {
    return this.clickVisible('@continue')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  cancel() {
    return this.clickVisible('@cancel');
  },

  clickChaseLearnMoreButton() {
    return this.clickVisible('@chaseLearnMoreButton');
  },

  clickSessionExpiredConfirm() {
    return this.clickVisible('@sessionExpiredConfirmButton');
  },

  clickLogin() {
    return this.clickVisible('@loginButton');
  }
};

module.exports = {
  elements: {
    continue: 'button.continue',
    cancel: 'button.cancel',
    repriceMessage: '.pricing-summary--message',
    wannaGetAway: '.passenger-price--fare-type',
    chaseLearnMoreButton: '.chase-instant-credit--button',
    sessionExpiredConfirmButton: '.button-popup_horizontal.confirm-button',
    sessionExpiredLoginForm: '.session-expired-login-form',
    loginButton: '.login-button--box'
  },

  commands: [page]
};
