const travelDocument = {
  withGreenCard() {
    return this
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@greenCard');
  },
  withDestinationAddress() {
    return this
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@destinationAddress');
  },
  withVisa() {
    return this
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@visa');
  },
  clickCheckInButton(value) {
    return this
      .waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@checkInButton', value);
  }
};

module.exports = {
  elements: {
    checkInButton: 'button[type="submit"]',
    greenCard: {
      selector: '//a[contains(.,"Green Card")]',
      locateStrategy: 'xpath'
    },
    destinationAddress: {
      selector: '//a[contains(.,"Destination Address")]',
      locateStrategy: 'xpath'
    },
    visa: {
      selector: '//a[contains(.,"Visa")]',
      locateStrategy: 'xpath'
    }
  },

  commands: [travelDocument]
};
