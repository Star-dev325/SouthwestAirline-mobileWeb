'use strict';

const applePaySheetResponse = require('mocks/templates/applePay/applePaySheetResponse');

let navDraw;
let paymentEdit;
let viewReservation;
let travelFunds;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangeProductList;
let airChangePricingSummary;
let airChangeReview;
let airChangeConfirmation;
let login;

module.exports = {
  before(client) {
    login = client.page.login();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
    airChangeShoppingSearch = client.page.airChangeShoppingSearch();
    airChangeProductList = client.page.airChangeProductList();
    airChangePricingSummary = client.page.airChangePricingSummary();
    airChangeReview = client.page.airChangeReview();
    airChangeConfirmation = client.page.airChangeConfirmation();
    navDraw = client.page.navDraw();
    travelFunds = client.page.travelFunds();
    paymentEdit = client.page.paymentEdit();
    client
      .init();
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Go to view reservations from the nav drawer'() {
    navDraw.openMenu().viewReservations();
  },

  'View flight reservation through confirmation number'() {
    viewReservation
      .withConfirmationNumber('APLPAY')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .continue();
  },

  'Choose change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Select the outbound to change'() {
    airChangeSelect
      .selectOutboundFlight()
      .submit();
  },

  'Go the shopping page'() {
    airChangeShoppingSearch.submit();
  },

  'Select new flight for upgrade'() {
    airChangeProductList
      .withChangeFlightFare(4, airChangeProductList.fare.businessSelect)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue button on Pricing Summary Page'() {
    airChangePricingSummary.waitForElementVisible('@continuePricing', 10000);
    airChangePricingSummary.section.priceTotalSummaryFare.assert.containsText('@priceLineTitle', 'Amount Due');
    airChangePricingSummary.continue();
  },

  'Show Review Page and open Payment Edit page'() {
    airChangeReview
      .waitForElementVisible('@reviewForm', 10000)
      .withContactMethod('EMAIL', 'APLPAY@test.com')
      .openPaymentEdit();
  },

  'Select Apple Pay as payment type'() {
    paymentEdit.clickApplePayCard();
    airChangeReview
      .waitForElementVisible('@reviewForm', 10000);
  },

  'Verify Apple Pay is selected on review page'() {
    airChangeReview
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('@paymentCard', 'Apple Pay');
  },

  'Add Travel Funds'() {
    airChangeReview
      .clickApplyTravelFunds()
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('.apply-travel-funds', 10000);
    travelFunds
      .withConfirmationNumber('ABC123')
      .withPassengerFirstName('Apple')
      .withPassengerLastName('Pay')
      .lookUpFund();
  },

  'Go back to purchase summary page and ensure that Apple Pay is still selected'() {
    travelFunds
      .continue()
      .waitForElementNotVisible('.dimmer', 10000);
    airChangeReview
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
    airChangeReview.submit();

    client
    // eslint-disable-next-line prefer-arrow-callback
      .execute(function(resp) {
        window.CeptorCallbackFn(resp);
      }, [applePaySheetResponse]);
  },

  'Route to confirmation page and ensure Apple Pay and travel funds are displayed'() {
    airChangeConfirmation
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.urlContains('air/change/confirmation')
      .assert.elementPresent('@applePayImage')
      .assert.elementPresent('.travel-fund--image_rtf')
      .assert.containsText('@secondFundResultTitle', 'Visa')
      .assert.containsText('@secondFundLastFourDigits', 'Last 4 digits: 1234');
  },

  after(client) {
    client.end();
  }
};
