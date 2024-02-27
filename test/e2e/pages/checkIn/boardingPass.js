const boardingPass = {
  getTextByLabelAndPos(label, position = 0) {
    return `.carousel-wrapper > div:nth-child(${position}) #${label}`;
  },

  passengerBoardingPassIsShown(passengerName, position = 1) {
    const el = this.getTextByLabelAndPos('passenger', position);

    this.waitForElementVisibleWithDefaultTimeout(el);

    return this.assert.containsText(this.getTextByLabelAndPos('passenger', position), passengerName);
  },

  passengerBoardingPassIsNotShown(passengerName, position = 1) {
    const el = this.getTextByLabelAndPos('passenger', position);

    this.expect.element(el).text.to.not.contain(passengerName);

    return this;
  }
};

module.exports = {
  elements: {
    boardingPass: '.mobile-boarding-pass',
    securityDocument: '.mbp-security-header',
    paginationDotsWithArrows: '.carousel-dots--in-footer-with-arrows',
    leftArrow: '.left-arrow-container',
    rightArrow: '.right-arrow-container',
    editContactLink: '[data-qa="link-text"]'
  },

  commands: [boardingPass]
};
