const featureToggle = {
  open() {
    return this.api.url(`${this.api.launchUrl}/feature-toggles`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  toggleBoxClick(toggleBox) {
    return this.clickVisible(`[data-link="${toggleBox}"]`);
  }
};

module.exports = {
  elements: {},
  commands: [featureToggle]
};
