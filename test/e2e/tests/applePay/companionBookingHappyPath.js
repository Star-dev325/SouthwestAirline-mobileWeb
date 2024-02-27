'use strict';

const applePaySheetResponse = require('mocks/templates/applePay/applePaySheetResponse');

let login;
let viewReservation;
let navDraw;
let tripDetails;
let companionPrice;
let companionPassenger;
let payment;
let companionPurchase;
let companionConfirmation;
let purchaseSummary;

module.exports = {
  before(client) {
    login = client.page.login();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    companionPrice = client.page.companionPrice();
    companionPassenger = client.page.companionPassenger();
    payment = client.page.payment();
    companionPurchase = client.page.companionPurchase();
    companionConfirmation = client.page.companionConfirmation();
    purchaseSummary = client.page.purchaseSummary();

    client
      .init();
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Go to view reservations from the nav drawer'() {
    navDraw
      .openMenu()
      .viewReservations();
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('ADDCOM')
      .withFirstName('TEST')
      .withLastName('WANG')
      .continue();
  },

  'Route to trip details page and click add companion'() {
    tripDetails
      .waitForElementNotVisible('.dimmer', 10000)
      .addCompanion()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View companion price page and route to companion passenger page'() {
    companionPrice
      .waitForElementVisible('@companionPricing', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View companion passenger page and route to companion purchase page'() {
    companionPassenger
      .waitForElementVisible('@companionPersonalForm', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Select Apple Pay as payment type'() {
    purchaseSummary.openPaymentEdit();
    payment.clickApplePayCard();
  },

  'Verify Apple Pay is selected on companion purchase page'() {
    companionPurchase
      .waitForElementVisible('@companionPurchase', 10000)
      .assert.containsText('@paymentCard', 'Apple Pay');
  },

  'Stub and Move Ceptor Callback Function to prevent ApplePaySession errors'(client) {
    client
    // eslint-disable-next-line prefer-arrow-callback
      .execute(function() {
        window.CeptorCallbackFn = window.ClientCallbackFunction;
        window.ClientCallbackFunction = () => {};
      }, [applePaySheetResponse]);
  },

  'Purchase flight with Apple Pay'(client) {
    companionPurchase.clickVisible('@purchaseButton', 10000);

    client
    // eslint-disable-next-line prefer-arrow-callback
      .execute(function(resp) {
        window.CeptorCallbackFn(resp);
      }, [applePaySheetResponse]);
  },

  'Route to confirmation page and ensure Apple Pay is displayed'() {
    companionConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('@companionConfirmation', 10000)
      .assert.urlContains('/companion/confirmation')
      .assert.elementPresent('@applePayImage')
      .assert.containsText('@firstFundItemTitle', 'Visa')
      .assert.containsText('@firstFundItemFourDigits', 'Last 4 digits: 1234');
  },

  after(client) {
    client.end();
  }
};
