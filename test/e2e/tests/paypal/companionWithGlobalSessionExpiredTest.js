'use strict';
let companionConfirmation, companionPassenger, companionPrice, companionPurchase, homePage,
  login, navDraw, payment,
  purchaseSummary, tripDetails, viewReservation;

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

  'Verify trip details page'() {
    tripDetails
      .waitForElementNotVisible('.dimmer', 10000)
      .addCompanion()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View companion price page'() {
    companionPrice
      .waitForElementVisible('@companionPricing', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View companion passenger page'() {
    companionPassenger
      .waitForElementVisible('@companionPersonalForm', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Use PayPal on companion payment page'() {
    purchaseSummary.openPaymentEdit();
    payment
      .waitForElementVisible('.payment-form.form', 10000)
      .clickPayPalCard();
  },

  'Session expired then purchase'(client) {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000);

    client.expiredLoginSession();

    companionPurchase
      .clickVisible('@purchaseButton', 10000);
  },

  'Login and view reservation page from navDraw again'(client) {
    client.waitForElementNotVisible('.dimmer', 10000);
    
    login.logout();
    login.withDefaults('thehack2', 'Test1234');

    client.waitForElementNotVisible('.dimmer', 10000);

    navDraw.openMenu().viewReservations();
  },

  'View flight reservation'() {
    viewReservation
      .withConfirmationNumber('ADDCOM')
      .withFirstName('TEST')
      .withLastName('WANG')
      .continue();
  },

  'Click add companion'() {
    tripDetails
      .waitForElementNotVisible('.dimmer', 10000)
      .addCompanion()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue button on companion price page'() {
    companionPrice
      .waitForElementVisible('@companionPricing', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue button on companion passenger page'() {
    companionPassenger
      .waitForElementVisible('@companionPersonalForm', 10000)
      .clickVisible('@continue', 10000)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Choose PayPal'() {
    purchaseSummary.openPaymentEdit();
    payment
      .waitForElementVisible('.payment-form.form', 10000)
      .clickPayPalCard();
  },

  'Purchase success with PayPal'(client) {
    companionPurchase
      .waitForElementNotVisible('.dimmer', 10000);

    companionPurchase
      .clickVisible('@purchaseButton', 10000);

    companionConfirmation
      .waitForElementPresent('@tripBooked', 10000)
      .assert.urlEquals(`${client.launch_url}/companion/confirmation`)
      .assert.elementPresent('@paypalImage');
  },
  after(client) {
    login.logout();
    client.end();
  }
};
