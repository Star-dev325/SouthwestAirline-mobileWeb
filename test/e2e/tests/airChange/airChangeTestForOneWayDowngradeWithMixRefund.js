'use strict';

let viewReservation;
let tripDetails;
let login;
let airChangeSelect;
let airChangeShoppingSearch;
let airChangeProductList;
let airChangePricingSummary;
let airChangeReview;
let airChangeConfirmation;
let airChangeRepricing;

module.exports = {
  before(client) {
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    login = client.page.login();
    airChangeSelect = client.page.airChangeSelect();
    airChangeShoppingSearch = client.page.airChangeShoppingSearch();
    airChangeProductList = client.page.airChangeProductList();
    airChangeRepricing = client.page.airChangeRepricing();
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
      .withConfirmationNumber('DBDMIX')
      .withFirstName('Amber')
      .withLastName('Awesome')
      .waitForElementNotVisible('.dimmer', 10000)
      .continue();
  },

  'Choose the change flight option'() {
    tripDetails
      .changeFlight();
  },

  'Select the outbound to change'() {
    airChangeSelect
      .assert.containsText('@flightChangeIntro', 'Change Flight')
      .selectOutboundFlight()
      .submit();
  },

  'Search new flight search criteria '() {
    airChangeShoppingSearch
      .waitForElementVisible('@continueButton', 10000)
      .submitForm('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Select a flight product'() {
    airChangeProductList
      .withChangeFlightFare(4, airChangeProductList.fare.anytime)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Click continue button on Repricing Page'() {
    airChangeRepricing
      .continue();
  },

  'Click continue button on Pricing Summary Page'() {
    airChangePricingSummary
      .continue();
  },

  'Show Review Page'(client) {
    airChangeReview
      .assert.elementPresent('@reviewForm')
      .assert.elementPresent('@flightBriefSummary')
      .withRefundMethod('BACK_TO_ORIGINAL_PAYMENT');

    client.elements('css selector', '.refund-total-item--message', (result) => {
      client.elementIdText(result.value[0].ELEMENT, (result) => {
        client.assert.equal(result.value, 'Credit');
      });
      client.elementIdText(result.value[1].ELEMENT, (result) => {
        client.assert.equal(result.value, 'Credit');
      });
    });

    airChangeReview
      .assert.elementNotPresent('@paymentMethod')
      .assert.elementPresent('@contactMethodFields')
      .assert.containsText('@contactMethodFields', 'Text, (1) 123456789')
      .withContactMethod('EMAIL', 'DBDMIX@test.com')
      .saveSnapshot('pricing review')
      .submit();
  },

  'Show Confirmation Page'(client) {
    airChangeConfirmation
      .waitForElementVisible('@pnr', 10000)
      .assert.containsText('@userName', 'Sumo Aprilmember')
      .assert.containsText('@rapidRewardsAccount', '600954642')
      .assert.containsText('@pnr', 'DBDMIX')
      .saveSnapshot('confirmation');

    client.elements('css selector', '.refund-total-item-currency', (result) => {
      client.elementIdText(result.value[0].ELEMENT, (result) => {
        client.assert.equal(result.value, '$33.08');
      });
      client.elementIdText(result.value[1].ELEMENT, (result) => {
        client.assert.equal(result.value, '$109.92');
      });
    });

    client.elements('css selector', '.refund-total-item--bottom-message', (result) => {
      client.elementIdText(result.value[0].ELEMENT, (result) => {
        client.assert.equal(result.value, 'Refunded to credit card');
      });
      client.elementIdText(result.value[1].ELEMENT, (result) => {
        client.assert.equal(result.value, 'Held for future use');
      });
    });
  },

  after(client) {
    client.end();
  }
};
