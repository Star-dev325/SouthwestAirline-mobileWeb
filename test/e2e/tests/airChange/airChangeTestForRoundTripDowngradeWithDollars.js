'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangeProductList;
let airChangePricingSummary;
let airChangeReview;
let airChangeConfirmation;
let homePage;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
    airChangeShoppingSearch = client.page.airChangeShoppingSearch();
    airChangeProductList = client.page.airChangeProductList();
    airChangePricingSummary = client.page.airChangePricingSummary();
    airChangeReview = client.page.airChangeReview();
    airChangeConfirmation = client.page.airChangeConfirmation();
    homePage = client.page.homePage();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'view reservation from homepage'() {
    homePage
      .goToManageTrips()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('CHFRDD')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .continue();
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Wait the the page transfer successfully'() {
    airChangeSelect
      .waitForElementPresent('@flightChangeIntro', 10000)
      .assert.containsText('@flightChangeIntro', 'Change Flight');
  },

  'Verify analytics data for original reservation is filled in'(client) {
    Analytics.verifyStore(client, 'AirChangeStore/originalReservation');
  },

  'Select both bounds to change'() {
    airChangeSelect
      .selectOutboundFlight()
      .selectInboundFlight()
      .saveSnapshot('select bounds to change ')
      .submit();
  },

  'Search new flight search criteria '() {
    airChangeShoppingSearch
      .waitForElementPresent('@from', 10000)
      .saveSnapshot('change flight form page ')
      .submitForm('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Waiting transfer to product list page'() {
    airChangeProductList
      .waitForElementPresent('@currentReservationInfo', 10000);
  },

  'Analytics data for search request and search results should be filled in'(client) {
    Analytics.verifyStore(client, 'AirChangeStore/search');
  },

  'Select outbound flight product for downgrade'() {
    airChangeProductList
      .saveSnapshot('show departure flight product list')
      .withChangeFlightFare(4, airChangeProductList.fare.wannaGetAway);
  },

  'Select inbound flight product for downgrade'() {
    airChangeProductList
      .saveSnapshot('show inbound flight product list')
      .withChangeFlightFare(4, airChangeProductList.fare.wannaGetAway)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue button on Pricing Summary Page'() {
    airChangePricingSummary.waitForElementVisible('@continuePricing', 10000);
    airChangePricingSummary.section.priceTotalSummaryFare.assert.containsText('@priceLineTitle', 'Credit');
    airChangePricingSummary.continue();
  },

  'Show Review Page'() {
    airChangeReview
      .waitForElementVisible('@reviewForm', 10000)
      .saveSnapshot('pricing review')
      .assert.elementPresent('@reviewForm')
      .assert.elementPresent('@flightBriefSummary')
      .assert.elementNotPresent('@paymentMethod')
      .assert.elementPresent('@contactMethodFields')
      .assert.containsText('@pnr', 'CHFRDD')
      .assert.containsText('@amountDueSummary', 'Credit')
      .withContactMethod('EMAIL', 'CHFRDD@test.com')
      .withRefundMethod('BACK_TO_ORIGINAL_PAYMENT')
      .submit();
  },

  'Analytics data for payment options should be filled in'(client) {
    Analytics.verifyStore(client, 'AirChangeStore/payment');
  },

  'Show Confirmation Page'() {
    airChangeConfirmation
      .waitForElementVisible('@tripBookedMessage', 10000)
      .saveSnapshot('downgrade confirmation')
      .assert.containsText('@tripBookedMessage', 'Your trip is booked!')
      .assert.containsText('@destinationAirport', 'San Antonio')
      .assert.containsText('@userName', 'Charith Tangrila')
      .assert.containsText('@pnr', 'CHFRDD')
      .assert.elementPresent('@flightSummaryDeparting')
      .assert.elementPresent('@flightSummaryReturning')
      .assert.containsText('@priceLineTitle', 'Total Credit')
      .assert.containsText('@totalAmount', '$119.77')
      .assert.containsText('@refundMethodMsg', 'Refunded to credit card');
  },

  after(client) {
    client.end();
  }
};
