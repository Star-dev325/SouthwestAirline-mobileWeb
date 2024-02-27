const earlyBirdCheckIn = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  open() {
    return this.api.url(`${this.api.launchUrl}/earlybird/checkin`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  withConfirmationNumber(pnr) {
    return this._setValue('@confirmationNumber', pnr);
  },
  withFirstName(firstName) {
    return this._setValue('@firstName', firstName);
  },
  withLastName(lastName) {
    return this._setValue('@lastName', lastName);
  },
  continue() {
    return this.clickVisible('@retrieveReservation')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    confirmationNumber: 'input[name="recordLocator"]',
    firstName: 'input[name=firstName]',
    lastName: 'input[name=lastName]',
    retrieveReservation: '.button[role=submit]',
    loginButton: '.login-button--box',
    earlyBirdCheckInBanner: '.early-bird-check-in-banner',
    pageHeader: '.page-header'
  },

  commands: [earlyBirdCheckIn]
};
