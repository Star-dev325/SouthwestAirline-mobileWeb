const chooseMobileBoardingPasses = {
  clickPassengerCheckboxByName(passengerName, segmentIndex = 3) {
    return this.clickByText(`fieldset > div > div:nth-child(${segmentIndex}) > .field .checkbox-button--children`, passengerName);
  }
};

module.exports = {
  elements: {
    continue: '[data-qa="continue-button"]',
    allPassesCheckbox: 'div.checkbox-button[name="allPasses"]',
    allPassesCheckboxSelected: 'div.checkbox-button[name="allPasses"] > div > span.checkbox-button_checked'
  },

  commands: [chooseMobileBoardingPasses]
};
