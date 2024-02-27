'use strict';

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangeProductList;
let airChangePricingSummary;
let airChangeReview;
let airChangeConfirmation;
let login;
let payment;

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
    payment = client.page.payment();

    viewReservation
      .open()
      .assert.title(client.globals.title);
  },

  'Login user'() {
    login
      .withDefaults('paotest2', 'Test1234')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('CHFRDU')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .continue();
  },

  'Choose the change flight option'() {
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

  'Select new flight product for upgrade'() {
    airChangeProductList
      .withChangeFlightFare(4, airChangeProductList.fare.businessSelect)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue button on Pricing Summary Page'() {
    airChangePricingSummary.waitForElementVisible('@continuePricing', 10000);
    airChangePricingSummary.section.priceTotalSummaryFare.assert.containsText('@priceLineTitle', 'Amount Due');
    airChangePricingSummary.continue();
  },

  'Show Review Page'() {
    airChangeReview
      .waitForElementVisible('@reviewForm', 10000)
      .assert.elementPresent('@reviewForm')
      .assert.elementPresent('@flightBriefSummary')
      .assert.elementPresent('@paymentMethod')
      .assert.elementPresent('@contactMethodFields')
      .assert.containsText('@pnr', 'CHFRDU')
      .assert.containsText('@amountDueSummary', 'Amount Due')
      .withContactMethod('EMAIL', 'CHFRDU@test.com');
  },

  'Select card with unverified CVV'() {
    payment
      .waitForElementVisible('[data-qa="review-form--payment-method-nav-item"]', 10000)
      .clickVisible('[data-qa="review-form--payment-method-nav-item"]')
      .clickVisible('.credit-card-radio-input:nth-child(1)')
      .clickDone();
  },

  'Select card with verified CVV'() {
    payment
      .waitForElementVisible('[data-qa="review-form--payment-method-nav-item"]', 10000)
      .clickVisible('[data-qa="review-form--payment-method-nav-item"]')
      .clickVisible('.credit-card-radio-input:nth-child(3)')
      .clickDone();
  },

  'Show Confirmation Page'() {
    airChangeConfirmation
      .waitForElementVisible('@tripBookedMessage', 10000)
      .assert.containsText('@tripBookedMessage', 'Your trip is booked!')
      .assert.containsText('@destinationAirport', 'Austin')
      .assert.containsText('@userName', 'Yang Lu')
      .assert.containsText('@pnr', 'JIRBOJ')
      .assert.elementPresent('@flightSummaryCard')
      .assert.elementPresent('@flightSummaryDeparting')
      .assert.elementPresent('@flightSummaryReturning')
      .assert.containsText('@priceLineTitle', 'Total Paid')
      .assert.containsText('@totalAmount', '$483.76')
      .assert.elementPresent('@fundResultsList')
      .assert.elementPresent('@creditCardImage')
      .assert.containsText('@cardHolder', 'Andy Gough')
      .assert.containsText('@streetOne', '1 Main St')
      .assert.containsText('@locationInfo', 'San Jose, CA US 95131');
  },

  after(client) {
    client.end();
  }
};
