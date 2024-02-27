const review = {
  goPaymentPage() {
    return this.clickVisible('@payment')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  purchase() {
    return this.clickVisible('@purchaseButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  fillInSecurityCode(value) {
    return this.setValueVisible('@securityCodeInputField', value);
  },
  fillReceiptToEmail(email) {
    return this.setValueVisible('@receiptToInput', email);
  }
};

module.exports = {
  elements: {
    payment: '.payment-nav-item-field',
    purchaseButton: 'button.continue',
    yourTripTitle: '.early-bird-review--trip-title',
    purchaseSubTitle: 'div.page-header',
    totalPrice: 'div.price-amount span[data-qa="total-amount"]',
    creditCardShortMsg: '[data-qa="review-form--payment-card"]',
    termsAndConditionsLink: 'ul.review-footer--links li:nth-of-type(1) a:nth-of-type(1)',
    privacyPolicyLink: 'ul.review-footer--links li:nth-of-type(1) a:nth-of-type(2)',
    contractOfCarriageLink: 'ul.review-footer--links li:nth-of-type(2) a:nth-of-type(1)',
    securityCodeInputField: '.purchase-summary-security-code--input-field input',
    errorHeader: '.error-header',
    receiptToInput: 'input[name=receiptEmail]',
    reviewPage: '.early-bird-review'
  },
  commands: [review]
};
