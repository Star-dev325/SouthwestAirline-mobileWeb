'use strict';

function _getCreditCardSelector(sectionSelector, index, options) {
  options = options || { isCheckBox: false };
  let selector = `${sectionSelector} .saved-credit-cards--item-field:nth-of-type(${index})`;

  if (options.isCheckBox) {
    selector = `${selector} .checkbox-button`;
  }

  return selector;
}

const payment = {
  _dropdown(key, value) {
    return this.waitForElementVisible(`select[placeholder*="${key}"]`, 10000)
      .clickVisible(`select[placeholder*="${key}"] option[value="${value}"]`);
  },
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  selectUseNewCreditCard() {
    return this.clickVisible('@useNewCreditCardItem');
  },
  withCardNumber(value) {
    return this.clickVisible('@maskCardNumber')._setValue('@realCardNumber', value);
  },
  withSecurityCode(value) {
    return this.clickVisible('@securityCode')._setValue('@securityCode', value);
  },
  withNameOnCard(value) {
    return this._setValue('@nameOnCard', value);
  },

  withExpirationDateMonth(value) {
    return this._dropdown('Month', value);
  },
  withExpirationDateYear(value) {
    return this._dropdown('Year', value);
  },

  withChaseCardBillingPhone(value) {
    return this._setValue('@chaseCardBillingPhone', value);
  },

  selectSaveCreditCard() {
    return this.scrollIntoViewByElementClassName('@saveCreditCardSwitch')
      .clickVisible('@saveCreditCardSwitch');
  },

  clickDone() {
    return this.clickVisible('@doneButton');
  },

  continue() {
    return this.clickVisible('@continue');
  },

  assertSavedCreditCardsCount(size) {
    return this.elementsCount('@savedCreditCard', size);
  },

  selectPrimaryCreditCard(options) {
    return this.clickVisible(_getCreditCardSelector('.primary-saved-credit-cards', 1, options));
  },

  selectOtherCreditCardByIndex(index, options) {
    return this.clickVisible(_getCreditCardSelector('.other-saved-credit-cards', index, options));
  },

  enterEditModel() {
    return this.clickVisible('@editButton');
  },

  clickPrimaryButton() {
    return this.clickVisible('.credit-cards-bottom-bar--button:nth-of-type(1)');
  },

  clickUpdateButton() {
    return this.clickVisible('.credit-cards-bottom-bar--button:nth-of-type(2)');
  },

  clickDeleteButton() {
    return this.clickVisible('.credit-cards-bottom-bar--button:nth-of-type(3)');
  },

  clickYesOnDeletePopup() {
    return this.clickVisible('@deleteCCPopupYes');
  },
  clickPayPalCard() {
    return this.clickVisible('@payPalCard');
  },
  clickApplePayCard() {
    return this.clickVisible('@applePayCard');
  }
};

module.exports = {
  elements: {
    paymentFormEdit: '.payment-form_edit',
    maskCardNumber: 'input[placeholder="Card Num."]',
    realCardNumber: 'input[name=cardNumber]',
    cardNumber: '.grouped:nth-child(1) div:nth-child(2) input',
    nameOnCard: 'input[name="nameOnCard"]',
    expirationDateMonth: 'select[placeholder="Month"]',
    expirationdateYear: 'select[placeholder="Year"]',
    securityCode: 'input[name=securityCode]',
    useNewCreditCardItem: 'div.credit-card--image_new',
    doneButton: 'button[type=submit]',
    editButton: '.action-bar--left-buttons button',
    saveCreditCardSwitch: '.saved-credit-cards--checkbox-field div span',
    defaultCreditCard: '.saved-credit-cards > div .saved-credit-cards--item > div',
    savedCreditCard: '.saved-credit-cards--item',
    deleteCCPopupYes: '.close-button',
    chaseCardBillingPhone: 'input[name="chasePhoneNumber"]',
    continue: 'button.continue',
    payPalCard: '.credit-card--image_paypal',
    applePayCard: '.credit-card--image_apple-pay'
  },

  commands: [payment]
};
