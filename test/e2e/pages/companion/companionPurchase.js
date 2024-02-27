const page = {
  chooseCallMeAndFillContactMethod(value) {
    this.clickVisible('@contactMethodType');
    this.clickVisible('@callContactMethod');
    this.waitForElementVisible('@phoneNumber', 10000)
      .setValue('@phoneNumber', value);
  },
  addEarlyBirdInPath() {
    this.clickVisible('@addEarlyBirdInPath');

    return this;
  },
  showFareBreakdown() {
    return this.clickVisible('@fareBreakdown');
  },
  clickApplyTravelFunds() {
    return this.clickVisible('@applyTravelFunds');
  }
};

module.exports = {
  elements: {
    companionPurchase: '.title',
    tripSummary: '.trip-summary',
    titleAndPrice: '.title-and-price',
    tripPriceDetailsLink: '.nav-item-link.bgwhite',
    passengerInfoSummaryLink: '.passenger-info-summary',
    companionPassengerName: '[data-qa="passenger-info-summary--passenger-name"]',
    contactMethodType: 'select[name="contactMethod"]',
    callContactMethod: 'option[value=CALL]',
    phoneNumber: 'input[name=phoneNumber]',
    contactMethodValue: '.phone-number-field input',
    paymentEditTab: 'div[data-qa="review-form--payment-method-nav-item"] a',
    purposeOfTravel: 'select[name="purposeOfTravel"]',
    businessTravel: 'option[value="BUSINESS"]',
    addEarlyBirdInPath: '[data-qa="add-early-bird-check-in--radio-button"]',
    fareBreakdown: '[data-qa="toggleBreakdown"]',
    addEarlyBirdCheckIn: '.purchase-summary-form--add-early-bird',
    purchaseButton: 'button[type="submit"]',
    securityCodeHeader: '.purchase-summary--message',
    contactMethod: '[data-qa="nav-item-field-value"]',
    popButton: 'button.button.button-popup_horizontal.confirm-button',
    applyTravelFunds: '[data-qa="review-form--apply-travel-funds-nav-item"] a',
    paymentCard: '[data-qa="review-form--payment-card"]'
  },
  commands: [page]
};
