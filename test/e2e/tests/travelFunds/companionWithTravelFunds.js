'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let companionConfirmation, companionPassenger, companionPrice, companionPurchase, homePage,
  login, navDraw, payment,
  purchaseSummary, travelFunds, tripDetails, viewReservation;

module.exports = {

  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    companionPrice = client.page.companionPrice();
    companionPassenger = client.page.companionPassenger();
    payment = client.page.payment();
    companionPurchase = client.page.companionPurchase();
    companionConfirmation = client.page.companionConfirmation();
    travelFunds = client.page.travelFunds();
    purchaseSummary = client.page.purchaseSummary();

    homePage.open()
      .assert.title(client.globals.title);
    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementNotVisible('.dimmer', 10000);
  },

  'Go to view reservation page from navDraw'() {
    navDraw.openMenu().viewReservations();
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('ADDCOM')
      .withFirstName('TEST')
      .withLastName('WANG')
      .continue();
  },

  'Navigate to companion purchase page'() {
    tripDetails
      .waitForElementNotVisible('.dimmer', 10000)
      .addCompanion()
      .waitForElementNotVisible('.dimmer', 10000);
    companionPrice
      .waitForElementVisible('@companionPricing', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
    companionPassenger
      .waitForElementVisible('@companionPersonalForm', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
    purchaseSummary.openPaymentEdit();
    payment
      .selectPrimaryCreditCard()
      .clickDone()
      .waitForElementNotVisible('.dimmer', 10000);
    companionPurchase
      .waitForElementVisible('@companionPurchase', 10000);
  },

  'Open Apply Travel Funds form and add a travel fund'() {
    companionPurchase
      .clickApplyTravelFunds()
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('.apply-travel-funds', 10000);
    travelFunds
      .withConfirmationNumber('ABC123')
      .withPassengerFirstName('Ben')
      .withPassengerLastName('Lacy')
      .lookUpFund();
  },

  'Verify Apply page rendered funds list and price total'(client) {
    client
      .waitForElementVisible('.fund-results-list', 10000)
      .assert.elementPresent('.travel-fund--image_rtf')
      .assert.elementPresent('.fund-results-list')
      .assert.elementPresent('.price-total');

    client.elements('css selector', '.fund-results-list--item', (result) => {
      client.assert.equal(result.value.length, 1);
    });
  },

  'Verify analytics TravelFundsStore for travelFunds'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('travel-funds');
    });
  },

  'Apply a gift card and verify that fund rendered correctly'(client) {
    travelFunds
      .selectGiftCardTab()
      .withCardNumber('6543210987652619')
      .withSecurityCode('4321')
      .lookUpFund();
    client
      .waitForElementNotVisible('.dimmer', 10000)
      .elements('css selector', '.fund-results-list--item', (result) => {
        client.assert.equal(result.value.length, 2);
      })
      .assert.elementPresent('.travel-fund--image_gift-card')
      .assert.containsText('.fund-results-list--error-message', 'Funds not applied');
  },

  'Verify analytics TravelFundsStore for gift card'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('gift-card');
    });
  },

  'Apply a luv voucher and verify that fund rendered correctly'(client) {
    travelFunds
      .selectLuvVoucherTab()
      .withVoucherNumber('6543210987652398')
      .withSecurityCode('4321')
      .lookUpFund();
    client
      .waitForElementNotVisible('.dimmer', 10000)
      .elements('css selector', '.fund-results-list--item', (result) => {
        client.assert.equal(result.value.length, 3);
      })
      .assert.elementPresent('.travel-fund--image_luv-voucher')
      .assert.containsText('.fund-results-list--error-message', 'Funds not applied');
  },

  'Verify analytics TravelFundsStore for luv voucher'(client) {
    Analytics.verifyStore(client, 'TravelFundsStore', (travelFundsStore) => {
      travelFundsStore.lastSearchedFund.should.eql('luv-voucher');
    });
  },

  'Back to purchase review page and verify UI updated'(client) {
    travelFunds
      .continue()
      .waitForElementNotVisible('.dimmer', 10000);

    client
      .assert.elementPresent('.billing-address-nav-item')
      .assert.elementNotPresent('.payment-method-nav-item')
      .assert.containsText('.apply-travel-funds-nav-item a span', 'Funds Applied');
  },

  'click purchase button'() {
    companionPurchase
      .clickVisible('@purchaseButton', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify confirmation page'(client) {
    companionConfirmation
      .waitForElementVisible('@companionConfirmation', 10000);

    client
      .elements('css selector', '.fund-results-list--item', (result) => {
        client.assert.equal(result.value.length, 1);
      })
      .assert.elementPresent('.fund-results-list')
      .assert.elementPresent('.travel-fund--image_rtf');
  },
  after(client) {
    login.logout();
    client.end();
  }
};
