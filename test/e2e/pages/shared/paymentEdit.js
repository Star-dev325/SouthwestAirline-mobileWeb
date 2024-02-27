function _getCreditCardSelector(sectionSelector, index, options = { isCheckBox: false }) {
  let selector = `${sectionSelector} .saved-credit-cards--item_edit-mode:nth-of-type(${index})`;

  if (options.isCheckBox) {
    selector = `${selector} .checkbox-button`;
  }

  return selector;
}

const paymentEdit = {
  clickDone() {
    return this.clickVisible('@doneButton');
  },

  clickEdit() {
    return this.clickVisible('@editButton');
  },

  selectPrimaryCreditCard(options) {
    return this.clickVisible(_getCreditCardSelector('.primary-saved-credit-cards', 1, options));
  },

  clickUpdateButton() {
    return this.clickVisible('.credit-cards-bottom-bar--button:nth-of-type(2)');
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
    doneButton: '.credit-card-update-form .page-header .action-bar--right-buttons .button',
    editButton: '.page-header .action-bar--left-buttons .button',
    creditCardUpdateForm: '.credit-card-update-form',
    payPalCard: '.credit-card--image_paypal',
    applePayCard: '.credit-card--image_apple-pay'
  },

  commands: [paymentEdit]
};
