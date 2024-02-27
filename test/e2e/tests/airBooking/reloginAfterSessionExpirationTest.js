'use strict';
/* eslint-disable no-unused-vars */
/* TODO: re-enable eslint when fixing flaky test MOB-117004 */
let flight, homePage, login, navDraw, passenger, paymentEdit, paymentPage, priceSummary, purchaseConfirmation,
  purchaseSummary, sessionExpired;

module.exports = {
  '@tags': ['flaky'],
  before(client) {
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    login = client.page.login();
    flight = client.page.flight();
    priceSummary = client.page.summary();
    purchaseSummary = client.page.purchaseSummary();
    purchaseConfirmation = client.page.purchaseConfirmation();
    passenger = client.page.passenger();
    paymentPage = client.page.paymentPage();
    paymentEdit = client.page.shared.paymentEdit();
    sessionExpired = client.page.shared.sessionExpired();

    client
      .init();
  },

  'Login user to do authenticated purchase'(client) {
    homePage.goToLogin();

    login
      .waitForElementPresent('@subTitle', 10000)
      .waitForElementPresent('@rememberMeBox', 10000)
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .continue();
  },

  'Go to air booking from nav drawer'() {
    navDraw.openMenu().bookAFlight();
  },

  'Find flight for one passenger from Dallas to Austin with Dollars'(client) {
    flight
      .flightType('oneway')
      .fromAirport(client.globals.airport.DallasLoveField)
      .toAirport(client.globals.airport.Austin)
      .withCurrency(flight.currency.dollars)
      .withPassenger(1)
      .continue();
  },

  'Select flights'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Click continue button on price page'() {
    priceSummary
      .continue();
  },

  'Back to flight products page'(client) {
    client.back();
    client.back();
    client.back();
  },

  'Select flights again'() {
    flight
      .withFlightFare(1, flight.fare.wannaGetAway, true);
  },

  'Click continue button on price page again'() {
    priceSummary.continue();
  },

  'Using browser back'(client) {
    purchaseSummary.waitForElementVisible('@paymentEdit', 10000);
    client.back();
  },

  'Click continue button from pricing page'() {
    priceSummary
      .waitForElementVisible('@continue', 10000)
      .assert.urlContains('air/booking/pricing/summary')
      .assert.visible('.pricing-summary')
      .continue();
  },

  'Go to passenger page with pre-populated passenger info form'() {
    passenger
      .waitForElementVisible('@inputFirstName', 10000)
      .assert.urlContains('air/booking/passengers/0')
      .assert.value('@inputFirstName', 'Ron')
      .assert.value('@inputLastName', 'Hackmann');
  },

  'Go to payment page'() {
    passenger.continue();
    purchaseSummary.openPaymentEdit();
    paymentPage
      .waitForElementVisible('@defaultCreditCard', 10000)
      .assert.visible('@defaultCreditCard')
      .clickNewCreditCard()
      .withPhoneNumber('123456789012')
      .clickDefaultCreditCard()
      .clickDone();
  },

  'Using browser back to payment page'(client) {
    purchaseSummary.waitForElementNotVisible('.dimmer', 10000);
    client.back();
  },

  'Select new credit card'() {
    passenger.continue();
    purchaseSummary.openPaymentEdit();
    paymentPage
      .waitForElementVisible('@defaultCreditCard', 10000)
      .clickNewCreditCard()
      .assert.value('@phoneNumberInput', '123-123-1234');
  },

  'Click continue to purchase summary pay with default saved credit card'() {
    paymentPage
      .clickDefaultCreditCard()
      .clickDone();
  },

  'Go to payment edit page'() {
    purchaseSummary
      .openPaymentEdit();
  },

  'Enter edit mode and finish update'() {
    paymentEdit
      .clickEdit()
      .selectPrimaryCreditCard()
      .clickUpdateButton()
      .waitForElementPresent('@creditCardUpdateForm', 10000)
      .assert.urlContains('/air/booking/payment/edit?airportsCode=DAL-ATL&_modal=airBookingCreditCardUpdate')
      .clickDone();
  },

  // 'Session expired then update again'(client) {
  //   paymentEdit
  //     .clickEdit()
  //     .selectPrimaryCreditCard();
  //   client.expiredLoginSession();
  //   paymentEdit.clickUpdateButton();
  // },

  // 'Go to re-login form from payment edit mode'() {
  //   sessionExpired.clickSessionExpiredConfirm();
  //   sessionExpired.assert.elementPresent('@sessionExpiredLoginForm');
  // },

  // 'Continue as guest and go back to pricing summary page'() {
  //   login.continueAsGuest();
  //   paymentPage
  //     .waitForElementVisible('.progression-bar', 10000)
  //     .assert.urlContains('/air/booking/pricing/summary');
  // },

  // 'Login and continue to purchase summary page'(client) {
  //   priceSummary.clickLogin();
  //   login
  //     .waitForElementPresent('@subTitle', 10000)
  //     .withUser(client.globals.username)
  //     .withPass(client.globals.password)
  //     .continue();
  //   priceSummary.continue();
  // },

  // 'session expired and purchase'(client) {
  //   client.expiredLoginSession();
  //   purchaseSummary.purchase();
  // },

  // 'Go to re-login form'() {
  //   sessionExpired.clickSessionExpiredConfirm();
  //   sessionExpired.assert.elementPresent('@sessionExpiredLoginForm', 10000);
  // },

  // 'Re-login and purchase success'(client) {
  //   login
  //     .waitForElementPresent('@subTitle', 10000)
  //     .waitForElementPresent('@rememberMeBox', 10000)
  //     .withPass(client.globals.password)
  //     .continue();

  //   purchaseConfirmation
  //     .assert.urlContains('air/booking/');
  // },

  after(client) {
    client.end();
  }
};
