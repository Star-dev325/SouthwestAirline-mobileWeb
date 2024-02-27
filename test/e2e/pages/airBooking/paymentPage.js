'use strict';

function _getCreditCardSelector(sectionSelector, index, options) {
  options = options || { isCheckBox: false };
  let selector = `${sectionSelector} .saved-credit-cards--item-field`;

  if (options.isCheckBox) {
    selector = `${selector} .checkbox-button`;
  }

  return selector;
}

const page = {
  clickNewCreditCard() {
    return this.clickVisible('@newCreditCard');
  },

  clickPhoneNumberLabel() {
    return this.clickVisible('@phoneNumberLabel');
  },

  clickDefaultCreditCard() {
    return this.clickVisible('@defaultCreditCard');
  },

  withInternaltionalPhoneCountryCode() {
    return this.clickVisible('@internaltionalPhoneCountryCode');
  },

  withPhoneNumber(value) {
    return this.setValueVisible('@phoneNumberInput', value);
  },

  clickChaseCard() {
    return this.clickVisible('@chaseCard');
  },

  selectPrimaryCreditCard(options) {
    return this.clickVisible(_getCreditCardSelector('.primary-saved-credit-cards', 1, options));
  },

  clickEdit() {
    return this.clickVisible('@editButton');
  },
  clickUpdateButton() {
    return this.clickVisible('.credit-cards-bottom-bar--button:nth-of-type(2)');
  },
  clickDone() {
    return this.clickVisible('@doneButton');
  },

  continue() {
    return this.clickVisible('@continue');
  }
};

module.exports = {

  elements: {
    internaltionalPhoneCountryCode: '.searchable-list-code li:nth-child(3)',
    phoneNumberLabel: '.phone-number-field .input--label',
    newCreditCard: '.new-credit-card .check',
    defaultCreditCard: '.saved-credit-cards .primary-saved-credit-cards .credit-card-radio-input',
    phoneNumberInput: 'input[name="phoneNumber"]',
    editButton: '#header .edit-btn',
    continue: 'button.continue',
    doneButton: '.action-bar--right-buttons button',
    chaseCard: '.rapid-rewards-credit-card .credit-card-radio-input'
  },

  commands: [page]
};
