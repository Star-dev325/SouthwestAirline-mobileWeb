const page = {
  resetCreditCardNumber(value) {
    this.waitForElementVisible('@creditCardNumber', 10000)
      .clearValue('@creditCardNumber')
      .setValue('@creditCardNumber', value);
  }
};

module.exports = {
  elements: {
    creditCardNumber: 'input[placeholder="Card Num."]'
  },
  commands: [page]
};
