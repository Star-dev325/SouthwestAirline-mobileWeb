'use strict';

const applePaySheetResponse = require('mocks/templates/applePay/applePaySheetResponse');

let earlyBirdCheckIn;
let detail;
let review;
let payment;
let earlyBirdConfirmation;
let navDraw;
let login;

module.exports = {
  before(client) {
    login = client.page.login();
    earlyBirdCheckIn = client.page.earlyBirdCheckIn();
    detail = client.page.detail();
    review = client.page.review();
    payment = client.page.payment();
    earlyBirdConfirmation = client.page.earlyBirdConfirmation();
    navDraw = client.page.navDraw();

    client
      .init();
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Go to early bird from the nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@EarlyBirdCheckIn');
  },

  'Search for a reservation'() {
    earlyBirdCheckIn
      .withConfirmationNumber('NALVRY')
      .withFirstName('I')
      .withLastName('Li')
      .continue();
  },

  'Unselect departing flight for second passenger on details page'() {
    detail
      .waitForElementVisible('@earlyBirdReviewPricingBanner', 10000)
      .assert.containsText('@totalPrice', '27.50')
      .clickVisible('@departingCheckBoxForSecondPax')
      .assert.containsText('@totalPrice', '12.50')
      .expect.element('.login-btn').text.to.contain('Log out');
  },

  'Go to review page'() {
    detail
      .continue();
  },

  'Show review page and open payment edit page'() {
    review
      .waitForElementVisible('@reviewPage', 10000)
      .goPaymentPage();
  },

  'Select Apple Pay as payment type'() {
    payment.clickApplePayCard();
    review
      .waitForElementVisible('@reviewPage', 10000);
  },

  'Verify Apple Pay is selected on review page'() {
    review
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('@creditCardShortMsg', 'Apple Pay');
  },

  'Go back to detail page and reselect departing flight for second passenger'(client) {
    client.back();

    detail
      .waitForElementVisible('@earlyBirdReviewPricingBanner', 10000)
      .clickVisible('@departingCheckBoxForSecondPax')
      .assert.containsText('@totalPrice', '27.50');
  },

  'Go to review page and ensure that Apple Pay is still selected'() {
    detail.continue();

    review
      .waitForElementVisible('@reviewPage', 10000)
      .assert.containsText('@creditCardShortMsg', 'Apple Pay');
  },

  'Stub and Move Ceptor Callback Function to prevent ApplePaySession errors'(client) {
    client
    // eslint-disable-next-line prefer-arrow-callback
      .execute(function() {
        window.CeptorCallbackFn = window.ClientCallbackFunction;
        window.ClientCallbackFunction = () => {};
      }, [applePaySheetResponse]);
  },

  'Purchase with Apple Pay'(client) {
    review.purchase();

    client
    // eslint-disable-next-line prefer-arrow-callback
      .execute(function(resp) {
        window.CeptorCallbackFn(resp);
      }, [applePaySheetResponse]);
  },

  'Route to confirmation page and ensure Apple Pay is displayed'() {
    earlyBirdConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.urlContains('earlybird/checkin/ABC123/confirmation')
      .assert.elementPresent('@applePayImage')
      .assert.containsText('@visaName', 'Visa')
      .assert.containsText('@visaLast4Digits', '1234');
  },

  after(client) {
    client.end();
  }
};
