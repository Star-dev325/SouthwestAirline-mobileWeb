const viewHotelReservation = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  open() {
    return this.api.url(`${this.api.launchUrl}/view-reservation`)
      .waitForElementNotVisible('.dimmer', 10000);
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
  tapHotelTab() {
    return this.clickVisible('@hotelTab');
  },
  continue() {
    return this.clickVisible('@retrieveReservation')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    confirmationNumber: 'input[name="confirmationNumber"]',
    firstName: 'input[name=firstName]',
    lastName: 'input[name=lastName]',
    hotelTab: '[data-qa="detached-tab-bar-hotel"]',
    retrieveReservation: '.button[role=submit]',
    confirmationTab: '.confirmation-nav',
    creditCardTab: '.credit-card-nav',
    creditCardNum: 'div[data-qa="credit-card"] input'
  },

  commands: [viewHotelReservation]
};
