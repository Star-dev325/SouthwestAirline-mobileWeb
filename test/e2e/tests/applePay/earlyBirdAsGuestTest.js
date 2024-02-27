'use strict';

const applePaySheetResponse = require('mocks/templates/applePay/applePaySheetResponse');

let earlyBirdCheckIn;
let detail;
let review;
let payment;
let earlyBirdConfirmation;
let navDraw;

module.exports = {
  before(client) {
    earlyBirdCheckIn = client.page.earlyBirdCheckIn();
    detail = client.page.detail();
    review = client.page.review();
    payment = client.page.payment();
    earlyBirdConfirmation = client.page.earlyBirdConfirmation();
    navDraw = client.page.navDraw();

    client
      .init();
  },

  'Go to early bird from the nav drawer'() {
    navDraw
      .openMenu()
      .accordionClick('@Flight', '@EarlyBirdCheckIn');
  },

  'Search for a reservation'() {
    earlyBirdCheckIn
      .withConfirmationNumber('KUO3NN')
      .withFirstName('T')
      .withLastName('Liu')
      .continue();
  },

  'Go to review page'() {
    detail
      .waitForElementVisible('@earlyBirdReviewPricingBanner', 10000)
      .continue();
  },

  'Show review page and open payment page'() {
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
      .assert.urlContains('earlybird/checkin/KUO3NN/confirmation')
      .assert.elementPresent('@applePayImage')
      .assert.containsText('@visaName', 'Visa')
      .assert.containsText('@visaLast4Digits', '1234');
  },

  after(client) {
    client.end();
  }
};
