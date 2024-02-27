const cancelFlight = {
  selectRefundMethod(el) {
    return this.clickVisible('@selectRefundMethod')
      .waitForElementPresent(el, 10000)
      .clickVisible(el);
  },

  selectCompanionRefundMethod() {
    return this.clickVisible('@selectCompanionRefundMethod')
      .clickVisible('@companionRefundToCreditCard');
  },

  withReceiptEmail(emailAddress) {
    return this.setValueVisible('@emailInput', emailAddress);
  },

  submit() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@cancelFlightButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    selectRefundMethod: 'select[name="refundMethod"]',
    holdForFutureUse: 'option[value="HOLD_FUTURE_USE"]',
    sponsorRefundToCreditCard: 'select[name=sponsorRefundMethod] option[value="BACK_TO_ORIGINAL_PAYMENT"]',
    companionRefundToCreditCard: 'select[name=companionRefundMethod] option[value="BACK_TO_ORIGINAL_PAYMENT"]',
    cancelFlightButton: 'button[data-qa=cancel-button]',
    emailInput: '.require-receipt-field .input input[name="emailReceiptTo"]',
    refundMessage: '[data-qa="refund-message"]',
    refundMethod: '[data-qa="refund-method"]',
    refundToCardMethod: 'option[value="BACK_TO_ORIGINAL_PAYMENT"]',
    companionRefundInfo: '.companion-refund-info',
    selectCompanionRefundMethod: 'select[name=companionRefundMethod]'
  },

  commands: [cancelFlight]
};
