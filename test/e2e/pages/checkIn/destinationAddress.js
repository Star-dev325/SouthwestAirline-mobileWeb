const destinationAddress = {
  withCountry(value) {
    return this.selectCountryByField('@country', value);
  },
  withSreetAddress(value) {
    return this
      .clickVisible('@streetAddress', value)
      .setValue('@streetAddress', value);
  },
  withCity(value) {
    return this
      .clickVisible('@city', value)
      .setValue('@city', value);
  },
  withState(value) {
    return this
      .clickVisible('@state', value)
      .setValue('@state', value);
  },
  withZipCode(value) {
    return this
      .clickVisible('@zipCode', value)
      .setValue('@zipCode', value);
  },
  clickDoneButton() {
    return this
      .clickVisible('@doneButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    streetAddress: 'input[name="addressLine"]',
    city: 'input[name="city"]',
    state: 'input[name="stateProvinceRegion"]',
    zipCode: 'input[name="zipOrPostalCode"]',
    doneButton: 'button[type="submit"]',
    country: {
      selector: '//a[contains(.,"Country")]',
      locateStrategy: 'xpath'
    }
  },

  commands: [destinationAddress]
};
