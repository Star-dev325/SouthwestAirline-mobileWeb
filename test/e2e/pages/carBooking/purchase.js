const purchase = {
  reserve() {
    return this.clickVisible('button[type="submit"]')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  _dropdown(key, value) {
    return this.waitForElementVisible(`select[placeholder*="${key}"]`, 10000)
      .click(`select[placeholder*="${key}"] option[value="${value}"]`);
  },
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  }
};

module.exports = {
  elements: {
    maskCardNumber: '[placeholder="Card Num."]',
    realCardNumber: '[name="cardNumber"]',
    loginButton: '.login-button--box',
    driverFirstName: '[name="firstName"]',
    driverMiddleName: '[name="middleName"]',
    driverLastName: '[name="lastName"]',
    accountNumber: '[name="accountNumber"]',
    driverPhoneNumber: '[data-qa="car-booking-purchase-form-phone-number"]',
    confirmationEmail: '[name="confirmationEmail"]',
    reserveButton: 'button[type="submit"]'
  },
  commands: [purchase]
};
