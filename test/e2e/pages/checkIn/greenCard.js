const greenCard = {
  withType() {
    return this.waitForElementPresent('@type', 10000)
      .click('option[value="RESIDENT_ALIEN_CARD"]');
  },
  withNumber(value) {
    return this
      .clickVisible('@number')
      .setValue('@number', value);
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
    number: 'input[name="number"]',
    year: 'select[placeholder=Year]',
    month: 'select[placeholder=Month]',
    day: 'select[placeholder=Day]',
    doneButton: 'button[type="submit"]',
    countryIssuedBy: {
      selector: '//a[contains(.,"Country issued by")]',
      locateStrategy: 'xpath'
    },
    type: '.form-select-placeholder-field--select'
  },

  commands: [greenCard]
};
