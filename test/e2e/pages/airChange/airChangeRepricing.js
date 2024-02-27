const page = {
  continue() {
    return this.clickVisible('@repricingContinueButton');
  },
  cancel() {
    return this.clickVisible('@repricingCancelButton');
  }
};

module.exports = {
  elements: {
    repricingContinueButton: '[data-qa="continueButton"]',
    repricingCancelButton: '[data-qa="cancelButton"]',
    repricingMessage: '.pricing-summary--message'
  },

  commands: [page]
};
