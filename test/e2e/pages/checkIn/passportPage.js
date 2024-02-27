const viewReservationPassportPage = {
  withpassportNumber(value) {
    return this
      .clickVisible('@passportNumber')
      .setValue('@passportNumber', value);
  },
  choosePassportWasIssuedBy(value) {
    return this.selectCountryByField('@passportWasIssuedBy', value);
  },
  chooseNationality(value) {
    return this.selectCountryByField('@nationality', value);
  },
  chooseResidence(value) {
    return this.selectCountryByField('@residence', value);
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
  withName(value) {
    return this
      .clickVisible('@name')
      .setValue('@name', value);
  },
  withPhoneNumber(value) {
    return this
      .clickVisible('@phoneNumber')
      .setValue('@phoneNumber', value);
  },
  continue() {
    return this
      .clickVisible('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  skip() {
    return this
      .clickVisible('@skipButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    passportNumber: 'input[placeholder="Passport Number"]',
    passportWasIssuedBy: {
      selector: '//a[contains(.,"Passport was Issued by:")]',
      locateStrategy: 'xpath'
    },
    nationality: {
      selector: '//a[contains(.,"Nationality")]',
      locateStrategy: 'xpath'
    },
    year: 'select[placeholder=Year]',
    month: 'select[placeholder=Month]',
    day: 'select[placeholder=Day]',
    residence: {
      selector: '//a[contains(.,"Country of Residence")]',
      locateStrategy: 'xpath'
    },
    name: 'input[name="emergencyContactName"]',
    phoneNumber: 'input[name="emergencyContactPhoneNumber"]',
    continueButton: 'button[type="submit"]',
    skipButton: '.action-bar--right-buttons button.button'
  },

  commands: [viewReservationPassportPage]
};
