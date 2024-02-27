const visa = {
  withVisaNumber(value) {
    return this
      .clickVisible('@visaNumber')
      .setValue('@visaNumber', value);
  },
  withVisaCountry(value) {
    return this.selectCountryByField('@visaCountry', value);
  },
  withCountryIssuedBy(value) {
    return this.selectCountryByField('@countryIssuedBy', value);
  },
  withDay(value) {
    return this
      .waitForElementVisible('@day', 10000)
      .setValue('@day', value);
  },
  withMonth(value) {
    return this
      .waitForElementVisible('@month', 10000)
      .setValue('@month', value);
  },
  withYear(value) {
    return this
      .waitForElementVisible('@year', 10000)
      .setValue('@year', value);
  },
  clickDoneButton() {
    return this
      .clickVisible('@doneButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    visaNumber: 'input[name="number"]',
    year: 'select[placeholder=Year]',
    month: 'select[placeholder=Month]',
    day: 'select[placeholder=Day]',
    doneButton: 'button[type="submit"]',
    visaCountry: {
      selector: '//a[contains(.,"Visa Country")]',
      locateStrategy: 'xpath'
    },
    countryIssuedBy: {
      selector: '//a[contains(.,"Country issued by")]',
      locateStrategy: 'xpath'
    }
  },

  commands: [visa]
};
