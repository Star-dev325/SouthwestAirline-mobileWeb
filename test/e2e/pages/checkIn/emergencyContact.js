const emergencyContact = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValueVisible(key, value);
  },
  withName(name) {
    return this._setValue('@name', name);
  },
  withPhoneNumber(name) {
    return this._setValue('@phoneNumber', name);
  },
  getSelectedOption(assertion) {
    return this.getText('.switch-button--item .active', (result) => {
      const text = result.status === 0 ? result.value : undefined;

      assertion(text);
    });
  },
  withCountry(value) {
    return this.waitForElementVisible('@country', 10000)
      .clickVisible(`select[name*="country"] option[value="${value}"]`);
  },

  useExistingContact(index) {
    return this.clickVisible(`.switch-button .switch-button--item:nth-child(${index})`);
  },
  continue() {
    return this
      .clickVisible('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    name: 'input[name="name"]',
    country: 'select[name*="country"]',
    phoneNumber: 'input[name="phoneNumber"]',
    continueButton: 'button[type="submit"]',
    selectedExistingContact: '.active'
  },

  commands: [emergencyContact]
};
