const pricing = {
  continue() {
    return this.clickVisible('@continueButton');
  }
};

module.exports = {
  elements: {
    continueButton: 'button[type="submit"]',
    extraContainer1: '[data-qa="car-booking-extras-checkbox-0"]',
    extraContainer2: '[data-qa="car-booking-extras-checkbox-1"]',
    extraCheckBox1: '[data-qa="car-booking-extras-checkbox-0"] .icon_check',
    extraCheckBox2: '[data-qa="car-booking-extras-checkbox-1"] .icon_check',
    loginButton: '.login-button--box'
  },
  commands: [pricing]
};
