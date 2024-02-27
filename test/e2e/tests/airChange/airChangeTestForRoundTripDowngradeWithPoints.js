'use strict';

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangeProductList;
let airChangePricingSummary;
let login;
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
    login = client.page.login();
    airChangeReview = client.page.airChangeReview();
    airChangeConfirmation = client.page.airChangeConfirmation();

    viewReservation
      .open()
      .assert.title(client.globals.title);
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('CHFRPD')
      .withFirstName('A')
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
      .withChangeFlightFare(4, airChangeProductList.fare.wannaGetAway)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue button on Pricing Summary Page'() {
    airChangePricingSummary.waitForElementVisible('@continuePricing', 10000);
    airChangePricingSummary.section.priceTotalSummaryFare.assert.containsText('@priceLineTitle', 'Credit');
    airChangePricingSummary.continue();
  },

  'Show Simple Login Page for points'(client) {
    login
      .waitForElementPresent('@loginPage', 10000)
      .assert.elementPresent('@loginForm')
      .assert.containsText('@usingPointsPrompt', 'You must log in to book with points.')
      .withUser(client.globals.username)
      .withPass(client.globals.password)
      .continue();
  },

  'Show Review Page'() {
    airChangeReview
      .waitForElementVisible('@reviewForm', 10000)
      .saveSnapshot('pricing review')
      .assert.elementPresent('@reviewForm')
      .assert.elementPresent('@flightBriefSummary')
      .assert.elementNotPresent('@paymentMethod')
      .assert.elementPresent('@contactMethodFields')
      .assert.containsText('@pnr', 'CHFRPD')
      .assert.containsText('@amountDueSummary', 'Credit')
      .withContactMethod('EMAIL', 'CHFRPD@test.com')
      .submit();
  },

  'Show Confirmation Page'() {
    airChangeConfirmation
      .waitForElementVisible('@tripBookedMessage', 10000)
      .saveSnapshot('downgrade confirmation')
      .assert.containsText('@tripBookedMessage', 'Your trip is booked!')
      .assert.containsText('@destinationAirport', 'Houston')
      .assert.containsText('@userName', 'Kyrr Test')
      .assert.containsText('@pnr', 'CHFRPD')
      .assert.elementPresent('@flightSummaryDeparting')
      .assert.elementPresent('@flightSummaryReturning')
      .assert.containsText('@priceLineTitle', 'Total Credit')
      .assert.containsText('@totalAmount', '3,990PTS');
  },

  after(client) {
    client.end();
  }
};
