'use strict';

let viewReservation;
let tripDetails;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangeProductList;
let airChangeRepricing;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    airChangeSelect = client.page.airChangeSelect();
    airChangeShoppingSearch = client.page.airChangeShoppingSearch();
    airChangeProductList = client.page.airChangeProductList();
    airChangeRepricing = client.page.airChangeRepricing();

    viewReservation
      .open()
      .assert.title(client.globals.title);
  },

  'View flight reservation through with confirmation number'() {
    viewReservation
      .withConfirmationNumber('REPRIC')
      .withFirstName('Kyrr')
      .withLastName('Test')
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

  'Click continue and Verify Reprice message on Repricing Page'() {
    airChangeRepricing
      .waitForElementVisible('@repricingContinueButton', 10000)
      .assert.urlContains('air/change/pricing/repricing')
      .assert.containsText('@repricingMessage', 'We are unable to secure the price for the flight(s) you selected. ' +
        'The next lowest available fare(s) for the flight(s) you selected are listed below.')
      .saveSnapshot('repricing page');
  },

  after(client) {
    client.end();
  }
};
