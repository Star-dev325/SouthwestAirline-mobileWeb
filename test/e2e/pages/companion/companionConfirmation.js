const page = {
  checkSpecialAssistanceConfirmationMessage(value) {
    this.expect.element('@specialAssistanceConfirmation').text.to.equal(value);

    return this;
  },

  showFareBreakdown() {
    return this.clickVisible('@fareBreakdown');
  }
};

module.exports = {
  elements: {
    companionConfirmation: '.companion-confirmation',
    pageHeader: '.page-header',
    tripBooked: '.trip-booked',
    tripBriefInfo: '.confirmation-trip-header',
    fareBreakdown: '[data-qa="price-breakdown"]',
    addEarlyBirdCheckIn: '.early-bird-in-path--price-total-line',
    popUpHeader: '.popup-head',
    popUpBody: '.popup-body',
    popUpButton: 'button[data-a="addEBLater"]',
    paypalImage: '.credit-card--image_paypal',
    applePayImage: '.credit-card--image_apple-pay',
    specialAssistanceConfirmation: '.special-assistance-message',
    firstFundItemTitle: '.fund-results-list--item:nth-of-type(1) .fund-result-title',
    firstFundItemFourDigits: '.fund-results-list--item:nth-of-type(1) .last-four-digits-text',
    secondFundItemTitle: '.fund-results-list--item:nth-of-type(2) .fund-result-title',
    secondFundItemFourDigits: '.fund-results-list--item:nth-of-type(2) .last-four-digits-text'
  },
  commands: [page]

};
