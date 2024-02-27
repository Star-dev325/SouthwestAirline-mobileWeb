'use strict';

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
      .waitForElementVisibleWithDefaultTimeout('.view-reservation');
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('CHDWDE')
      .withFirstName('Kyrr')
      .withLastName('Test')
      .continue();
  },

  'Change Dynamic Waiver flight'() {
    tripDetails
      .waitForElementVisibleWithDefaultTimeout('@tripDetails')
      .assert.elementPresent('@tripDetailsCard')
      .assert.elementPresent('@alertBannerIcon')
      .assert.containsText('@alertBanner', 'Important: You can change your flight')
      .saveSnapshot('show dynamic waiver alert in trip detail page for round trip even')
      .clickVisible('@alertBanner');
  },

  'Wait the the page transfer successfully, bounds already selected'() {
    airChangeSelect
      .waitForElementPresent('@flightChangeIntro', 10000)
      .assert.containsText('@flightChangeIntro', 'Change Flight')
      .assert.containsText('@dynamicWaiverMessage', 'You may change your travel date/time at no additional cost')
      .assert.elementPresent('@dynamicWaiverFirstBoundsMessage')
      .assert.elementPresent('@dynamicWaiverSecondBoundsMessage')
      .assert.elementPresent('@alertIconFirstBound')
      .assert.elementPresent('@alertIconSecondBound')
      .submit();
  },

  'Search new flight search criteria '() {
    airChangeShoppingSearch
      .waitForElementPresent('@from', 10000)
      .saveSnapshot('change flight form page ')
      .submitForm('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Select Outbound flight product for even exchange'() {
    airChangeProductList
      .saveSnapshot('show departure flight product list')
      .withChangeFlightFare(4, airChangeProductList.fare.anytime)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Select Inbound flight product for even exchange'() {
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
      .assert.containsText('@pnr', 'CHDWDE')
      .assert.containsText('@refundMessage', 'Amount Due')
      .withContactMethod('EMAIL', 'CHDWDE@test.com')
      .submit();
  },

  'Show confirmation page'() {
    airChangeConfirmation
      .waitForElementVisibleWithDefaultTimeout('@tripBookedMessage')
      .assert.containsText('@tripBookedMessage', 'Your trip is booked!')
      .assert.containsText('@destinationAirport', 'Boise')
      .assert.containsText('@userName', 'Kyrr Test')
      .assert.containsText('@pnr', 'CHDWDE')
      .assert.elementPresent('@flightSummaryCard')
      .assert.elementPresent('@flightSummaryDeparting')
      .assert.elementPresent('@flightSummaryReturning')
      .assert.containsText('@priceLineTitle', 'Total Paid')
      .assert.containsText('@totalAmount', '0.00')
      .assert.elementNotPresent('@billing')
      .saveSnapshot('Dynamic Waiver change confirmation page for even exchange');
  },

  after(client) {
    client.end();
  }
};
