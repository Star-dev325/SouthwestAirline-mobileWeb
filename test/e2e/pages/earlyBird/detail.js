const detail = {
  continue() {
    return this.clickVisible('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  clickLogin() {
    return this.clickVisible('@loginButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    continueButton: 'button.continue',
    pageHeader: '.page-header',
    earlyBirdReviewPricingBanner: '.early-bird-confirmation--pricing-banner',
    loginButton: '.login-button--box',
    dateDuration: '.early-bird-destination-info--date-range',
    destinationCity: '.early-bird-destination-info--airport-name',
    totalPrice: 'div.price-amount span[data-qa="total-amount"]',
    departingCheckBoxForSecondPax:
      'div.early-bird-detail form fieldset div:nth-of-type(1) div div:nth-of-type(3) div.early-bird-passenger-checkbox--personal-info p',
    aList: '.early-bird-passenger-checkbox--ineligible-label',
    popHeader: '.popup-head',
    popBody: '.popup-body',
    popButton: 'button.button.button-popup_horizontal.confirm-button'
  },

  commands: [detail]
};
