const viewCarReservation = {
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
  withPickUpDate(date) {
    return this.waitForElementVisible('@pickUpDate', 10000)
      .clickVisible(`select[name="pickupDate"] option[value="${date}"]`);
  },
  tapCarTab() {
    return this.clickVisible('@carTab')
      .waitForElementNotVisible('.dimmer', 10000);
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
    carTab: '[data-qa=detached-tab-bar-car]',
    retrieveReservation: '.button[role=submit]',
    pickUpDate: 'select[name="pickupDate"]'
  },

  commands: [viewCarReservation]
};
