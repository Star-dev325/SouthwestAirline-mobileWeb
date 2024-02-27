const AirChangeReprice = {
  continue() {
    return this.clickVisible('@continue')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    continue: 'button.continue'
  },

  commands: [AirChangeReprice]
};
