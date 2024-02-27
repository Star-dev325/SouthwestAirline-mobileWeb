'use strict';

let viewReservation;
let login;
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
    login = client.page.login();
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

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('CHFUMN')
      .withFirstName('UNACC')
      .withLastName('MINOR')
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
      .saveSnapshot('pricing review')
      .assert.elementPresent('@reviewForm')
      .assert.elementPresent('@flightBriefSummary')
      .assert.elementPresent('@paymentMethod')
      .assert.elementPresent('@contactMethodFields')
      .assert.containsText('@pnr', 'CHFUMN')
      .assert.containsText('@amountDueSummary', 'Amount Due')
      .withContactMethod('EMAIL', 'CHFUMN@test.com')
      .submit();
  },

  'Show Confirmation Page'() {
    airChangeConfirmation
      .waitForElementVisible('@tripBookedMessage', 10000)
      .saveSnapshot('confirmation')
      .assert.containsText('@tripBookedMessage', 'Your trip is booked!')
      .assert.containsText('@destinationAirport', 'Indianapolis')
      .assert.containsText('@userName', 'Unaccompanied Minor')
      .assert.containsText('@pnr', 'CHFUMN')
      .assert.elementPresent('@flightSummaryCard')
      .assert.elementPresent('@flightSummaryDeparting')
      .assert.elementPresent('@flightSummaryReturning')
      .assert.containsText('@priceLineTitle', 'Total Paid')
      .assert.containsText('@totalAmount', '$17.80')
      .assert.elementPresent('@fundResultsList')
      .assert.elementPresent('@creditCardImage')
      .assert.containsText('@fundResultTitle', 'VISA')
      .assert.containsText('@lastFourDigitsText', 'Last 4 digits: 4113')
      .assert.containsText('@cardHolder', 'Li Rui')
      .assert.containsText('@streetOne', '428 Main St')
      .assert.containsText('@locationInfo', 'Brooklyn, NY US 42971');
  },

  after(client) {
    client.end();
  }
};
