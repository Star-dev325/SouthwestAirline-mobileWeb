'use strict';

let viewReservation;
let tripDetails;
let login;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangePricingSummary;
let airChangeRepricing;
let airChangeProductList;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    login = client.page.login();
    airChangeSelect = client.page.airChangeSelect();
    airChangeShoppingSearch = client.page.airChangeShoppingSearch();
    airChangeProductList = client.page.airChangeProductList();
    airChangePricingSummary = client.page.airChangePricingSummary();
    airChangeRepricing = client.page.airChangeRepricing();

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
      .withConfirmationNumber('CHFCHK')
      .withFirstName('X')
      .withLastName('Liu')
      .continue();
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Select the outbound to change'() {
    airChangeSelect
      .selectOutboundFlight()
      .assert.containsText('@flightChangeIntro', 'Change Flight')
      .submit();
  },

  'Search new flight search criteria '() {
    airChangeShoppingSearch
      .waitForElementPresent('@from', 10000)
      .submitForm('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Select first flight product'() {
    airChangeProductList
      .withChangeFlightFare(4, airChangeProductList.fare.anytime)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify You Must Check in Again Popup'() {
    airChangeProductList
      .waitForElementVisible('@checkInAgainPopup', 10000)
      .assert.containsText('@checkInAgainPopup', 'You must check in again for all of your flights.')
      .clickVisible('@okPopupButton');
  },

  'Click continue button on Repricing Page'() {
    airChangeRepricing
      .continue();
  },

  'Click continue button on Pricing Summary Page'() {
    airChangePricingSummary
      .continue();
  },

  after(client) {
    client.end();
  }
};
