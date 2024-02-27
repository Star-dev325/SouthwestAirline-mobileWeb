const page = {
  purchase(timeout) {
    return this.clickVisible('@purchase')
      .waitForElementNotVisible('.dimmer', timeout || 10000);
  },
  addEarlyBirdInPath() {
    return this.clickVisible('@addEarlyBirdInPath');
  },
  showFareBreakdown() {
    return this.clickVisible('@fareBreakdown');
  },
  continueForAuthenticatedPurchase() {
    return this.waitForElementNotVisible('.dimmer', 10000);
  },
  withChaseCardBillingPhone(value) {
    return this._setValue('@chaseCardBillingPhone', value);
  },
  clickContactMethod() {
    return this.clickVisible('@contactMethodContent');
  },
  openPaymentEdit() {
    return this.clickVisible('@paymentEdit');
  },
  openPassengerEdit() {
    return this.clickVisible('@passengerEdit');
  },
  clickApplyTravelFunds() {
    return this.clickVisible('@applyTravelFunds');
  },
  clickBillingAddress() {
    return this.clickVisible('@billingAddress');
  },
  clickChasePlacement() {
    return this.clickVisible('@chasePlacement');
  }
};

module.exports = {
  elements: {
    purchase: 'button.purchase',
    expressCheckOutContinue: '.check-our-work-dialog .confirm-button',
    passengerInfoSummary: 'div.passenger-info-summary',
    paymentEdit: 'div.payment-nav-item-field',
    addEarlyBirdInPath: '.early-bird-check-in--radio-button',
    fareBreakdown: '[data-qa="price-breakdown"]',
    addEarlyBirdCheckIn: '.early-bird-in-path--price-total-line',
    expressCheckOutDialog: '[data-qa="flight-purchase-check-our-work"] .popup',
    expressCheckOutMessage: '[data-qa="flight-purchase-check-our-work"] .popup-body',
    contactMethodContent: '.contact-method .icon',
    chaseCardBillingPhone: 'input[name="chasePhoneNumber"]',
    passengerEdit: 'a.passenger-info-summary--item',
    applyTravelFunds: '[data-qa="review-form--apply-travel-funds-nav-item"] a',
    billingAddress: '[data-qa="review-form--billing-address-nav-item"] a',
    paymentMethod: '[data-qa="review-form--payment-method-nav-item"] a',
    paymentCard: '[data-qa="review-form--payment-card"]',
    chasePlacement: '.image-placement img'
  },

  commands: [page]
};
