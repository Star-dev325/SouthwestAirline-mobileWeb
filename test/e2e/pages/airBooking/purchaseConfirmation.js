const page = {
  checkUrlForConfirmationPage(path, timeout) {
    return this.waitForElementVisible('@userName', timeout || 10000).assert.urlContains(path);
  },

  checkBookResultMessage(value) {
    this.expect.element('.xxlarge').text.to.equal(value);

    return this;
  },

  checkSpecialAssistanceConfirmationMessage(value) {
    this.expect.element('@specialAssistanceConfirmation').text.to.equal(value);

    return this;
  },

  checkPassengerName(name) {
    this.expect.element('@userName').text.to.equal(name);

    return this;
  },

  checkPNR(value) {
    this.expect.element('@pnr').text.to.equal(value);

    return this;
  },

  checkHasPNR() {
    this.expect.element('@pnr').text.to.match(/([A-Z]|[0-9]){6}/);
  },

  checkNthPNR(nth, value) {
    const elementSelector = `[data-qa='passenger-reservation-info']:nth-child(${nth})`;

    return this
      .waitForElementVisible(elementSelector, 10000)
      .assert.containsText(elementSelector, value);
  },

  checkPointTotalAndDollarTotalVal(pointTotal, dollarTotal) {
    this.expect.element('@pointTotal').text.to.equal(pointTotal);
    this.expect.element('@dollarTotal').text.to.equal(dollarTotal);

    return this;
  },

  withTotalAmount(expectedAmount) {
    this.expect.element('@totalAmount').text.to.equal(expectedAmount);

    return this;
  },

  withAppliedAmount(expectedAmount) {
    this.expect.element('@appliedAmount').text.to.equal(expectedAmount);

    return this;
  },

  showFareBreakdown() {
    return this.clickVisible('@fareBreakdown');
  }

};

module.exports = {
  elements: {
    totalAmount: '.price-total--info [data-qa="total-amount"]',
    appliedAmount: '.amount-applied [data-qa="total-amount"]',
    partialConfirmation: '[data-qa="partial-booking"]',
    searchFlights: 'button[data-qa="search-flight"]',
    destinationCity: 'span[class="destination-airport"]',
    destination: '.trip-date-dest-city--destination-airport',
    userName: 'span[data-qa="userName"]',
    passengerName: '.confirmation-trip-header--passenger-name',
    pointTotal: 'div.formatted-currency--points span[data-qa="total-amount"]',
    dollarTotal: 'div[class="price-total--info"] div:nth-of-type(2) span[data-qa="total-amount"]',
    pnr: 'div[data-qa="passenger-record-locator"]',
    fareBreakdown: '[data-qa="price-breakdown"]',
    addEarlyBirdCheckIn: '.early-bird-in-path--price-total-line',
    creditCardName: '.credit-card--info_name',
    paypalImage: '.credit-card--image_paypal',
    specialAssistanceConfirmation: '.special-assistance-message',
    applePayImage: '.credit-card--image_apple-pay',
    firstFundItemTitle: '.fund-results-list--item:nth-of-type(1) .fund-result-title',
    firstFundItemFourDigits: '.fund-results-list--item:nth-of-type(1) .last-four-digits-text',
    secondFundItemTitle: '.fund-results-list--item:nth-of-type(2) .fund-result-title',
    secondFundItemFourDigits: '.fund-results-list--item:nth-of-type(2) .last-four-digits-text'
  },

  commands: [page]
};
