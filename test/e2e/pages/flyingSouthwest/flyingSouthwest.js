const flyingSouthwest = {
  goToAtTheAir() {
    this.clickVisible('@atTheAirLink')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToBoardingThePlane() {
    this.clickVisible('@boardingThePlaneLink')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToInTheAir() {
    this.clickVisible('@inTheAirLink')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    atTheAirLink: 'div a:nth-child(1) img',
    boardingThePlaneLink: 'div a:nth-child(2) img',
    inTheAirLink: 'div a:nth-child(3) img'
  },

  commands: [flyingSouthwest]
};
