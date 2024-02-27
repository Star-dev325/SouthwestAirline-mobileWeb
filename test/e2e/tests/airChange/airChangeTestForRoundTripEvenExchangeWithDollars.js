'use strict';

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangeProductList;
let airChangePricingSummary;
let airChangeReview;
let airChangeConfirmation;

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

    viewReservation
      .open()
      .assert.title(client.globals.title);
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('CHFRDE')
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

  'Select the outbound to change'() {
    airChangeSelect
      .selectOutboundFlight()
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

  'Select flight product for even exchange'() {
    airChangeProductList
      .saveSnapshot('show departure flight product list')
      .withChangeFlightFare(4, airChangeProductList.fare.anytime)
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
      .saveSnapshot('pricing review')
      .assert.elementPresent('@reviewForm')
      .assert.elementPresent('@flightBriefSummary')
      .assert.elementNotPresent('@paymentMethod')
      .assert.elementPresent('@contactMethodFields')
      .assert.containsText('@pnr', 'CHFRDE')
      .assert.containsText('@refundMessage', 'Amount Due')
      .withContactMethod('EMAIL', 'CHFRDE@test.com')
      .submit();
  },

  'Show Confirmation Page'() {
    airChangeConfirmation
      .waitForElementVisible('@tripBookedMessage', 10000)
      .saveSnapshot('confirmation')
      .assert.containsText('@tripBookedMessage', 'Your trip is booked!')
      .assert.containsText('@destinationAirport', 'Houston')
      .assert.containsText('@userName', 'Charith Tangrila')
      .assert.containsText('@pnr', 'CHFRDE')
      .assert.elementPresent('@flightSummaryCard')
      .assert.elementPresent('@flightSummaryDeparting')
      .assert.elementPresent('@flightSummaryReturning')
      .assert.containsText('@priceLineTitle', 'Total Paid')
      .assert.containsText('@totalAmount', '0.00');
  },

  after(client) {
    client.end();
  }
};
