const page = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  _dropdown(key, value) {
    return this.waitForElementVisible(`select[placeholder*="${key}"]`, 30000)
      .click(`select[placeholder*="${key}"] option[value="${value}"]`);
  },
  withContactMethod(key, value) {
    this.clickNewContactMethod();

    if (key === 'TEXT') {
      this.clickVisible('@emailMeCheck');
      this.setValueVisible('@inputPhoneNumber', value);
    }

    if (key === 'CALL') {
      this.clickVisible('@textMeCheck');
      this.setValueVisible('@inputPhoneNumber', value);
    }

    if (key === 'EMAIL') {
      this.clickVisible('@emailMeCheck');
      this.setValueVisible('@inputEmail', value);
    }

    return this.clickVisible('@submitButton');
  },
  clickNewContactMethod() {
    return this.clickVisible('@newContactMethod');
  },
  withRefundMethod(value) {
    this._dropdown('Select refund method', value);

    return this.setValue('@inputRefundMethod', value);
  },
  openPaymentEdit() {
    return this.clickVisible('@paymentEdit');
  },
  clickApplyTravelFunds() {
    return this.clickVisible('@applyTravelFunds');
  },
  submit() {
    return this.clickVisible('@submitButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    reviewForm: '.air-change-review-form',
    paymentCard: '[data-qa="review-form--payment-card"]',
    userName: '[data-qa="userName"]',
    pnr: '[data-qa="confirmation-number"]',
    flightBriefSummary: '.flight-brief-summary',
    tripCostsTable: '.trip-costs-table',
    refundInfoPerType: '.refund-info-per-type',
    paymentMethod: '[data-qa="review-form--payment-method-nav-item"]',
    contactMethodFields: '.fields.contact-method.grouped',
    newContactMethod: '[name="contactMethodContent"]',
    refundMessage: '[data-qa="refund-message"]',
    travelFundsRefundInfo: '[data-qa="travel-funds-refund-info"]',
    refundMethod: '.refund-method',
    textMeCheck: '.contact-method-options li:nth-child(1)',
    callMeCheck: '.contact-method-options li:nth-child(2)',
    emailMeCheck: '.contact-method-options li:nth-child(3)',
    inputEmail: 'input[name="email"]',
    inputPhoneNumber: 'input[name="phoneNumber"]',
    inputRefundMethod: 'input[name="refundMethod"]',
    paymentEdit: '.payment-nav-item-field .nav-item-link',
    refundSummary: '[data-qa="refund-summary"]',
    submitButton: 'button[type="submit"]',
    refundTotalItemBottomMessage: '.refund-total-item--bottom-message',
    refundInfoForPoints: '.refund-info-for-points',
    amountDueSummary: '[data-qa="refund-message"]',
    applyTravelFunds: '[data-qa="review-form--apply-travel-funds-nav-item"] a'
  },

  commands: [page]
};
