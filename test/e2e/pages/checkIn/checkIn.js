const checkIn = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  open() {
    return this.api.url(`${this.api.launchUrl}/check-in`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  viewBoardingPass() {
    return this.clickVisible('@viewBoardingPassButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  viewAllBoardingPasses() {
    return this.clickVisible('@viewAllBoardingPasses')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  share() {
    return this.clickVisible('@share');
  },
  withConfirmationNumber(name) {
    return this._setValue('@confirmationNumber', name);
  },
  withFirstName(name) {
    return this._setValue('@firstName', name);
  },
  withLastName(name) {
    return this._setValue('@lastName', name);
  },
  continue() {
    return this.clickVisible('@retrieveReservation')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    share: 'a[data-qa="shareLink"]',
    viewBoardingPassButton: '.view-boarding-pass-btn',
    viewAllBoardingPasses: '[data-qa="view-all-boarding-passes"]',
    confirmationNumber: 'input[name="recordLocator"]',
    firstName: 'input[name=firstName]',
    lastName: 'input[name=lastName]',
    retrieveReservation: 'button[role="submit"]'
  },

  commands: [checkIn]
};
