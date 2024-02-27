const page = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  withConfirmationNumber(number) {
    return this._setValue('@inputConfirmationNumber', number);
  },
  withVoucherNumber(number) {
    return this._setValue('@inputVoucherNumber', number);
  },
  withCardNumber(number) {
    return this._setValue('@inputCardNumber', number);
  },
  withPassengerFirstName(name) {
    return this._setValue('@inputPassengerFirstName', name);
  },
  withPassengerLastName(name) {
    return this._setValue('@inputPassengerLastName', name);
  },
  withSecurityCode(code) {
    return this._setValue('@inputSecurityCode', code);
  },
  done() {
    return this.clickVisible('@doneButton');
  },
  lookUpFund() {
    return this.clickVisible('@lookUpButton');
  },
  selectTravelFundsTab() {
    return this.clickVisible('@travelFundsTab');
  },
  selectLuvVoucherTab() {
    return this.clickVisible('@luvVoucherTab');
  },
  selectGiftCardTab() {
    return this.clickVisible('@giftCardTab');
  },
  cancel() {
    return this.clickVisible('@doneButton');
  },
  continue() {
    return this.clickVisible('@continueButton');
  },
  removeFirstFund() {
    return this.clickVisible('.fund-results-list--removal-button');
  }
};

module.exports = {
  elements: {
    inputConfirmationNumber: 'input[name=confirmationNumber]',
    inputVoucherNumber: 'input[name=voucherNumber]',
    inputCardNumber: 'input[name=cardNumber]',
    inputPassengerFirstName: 'input[name=passengerFirstName]',
    inputPassengerLastName: 'input[name=passengerLastName]',
    inputSecurityCode: 'input[name=securityCode]',
    doneButton: '.action-bar--right-buttons button',
    lookUpButton: 'button[type="submit"]',
    travelFundsTab: 'div[data-qa="travel-funds-selector"]',
    luvVoucherTab: 'div[data-qa="luv-voucher-selector"]',
    giftCardTab: 'div[data-qa="gift-card-selector"]',
    continueButton: '.apply-continue-button'
  },

  commands: [page]
};
