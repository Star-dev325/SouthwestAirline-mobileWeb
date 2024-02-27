'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let homePage, login, navDraw, travelInformation, tripDetails, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    travelInformation = client.page.travelInformation();

    homePage.open();

    login.withDefaults('thehack2', 'Test1234');
    client.pause(1000);
  },

  'Find flight reservation through confirmation number'(client) {
    navDraw.openMenu().viewReservations();
    client.pause(1000);

    viewReservation.withConfirmationNumber('MTCO7D')
      .withFirstName('JOHN')
      .withLastName('DOE')
      .continue();
  },

  'Go To Travel Information page'() {
    tripDetails
      .waitForElementVisible('@passengerSection', 10000)
      .clickVisible('@passengerSection');
  },

  'Verify Travel Information Page'() {
    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .assert.value('@rapidRewardsNumberField', '601005646')
      .assert.containsText('@ktnField', '')
      .assert.value('@redressField', '')
      .saveSnapshot('on travel information page for international pnr');
  },

  'Verify Pressing Save Button transitions to Trip Details Page'() {
    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .withKtnNumber('123ABC34567890')
      .withRedressNumber('123456789')
      .withPassportNumber('ABC1234PASSPORT')
      .withPassportIssuedByCountryUS()
      .withPassportNationalityUS()
      .withPassportYear(2030)
      .withPassportResidencyUS()
      .withEmergencyContactName('Fred Flintstone')
      .withEmergencyContactPhoneNumber('817-855-1234')
      .save();

    tripDetails
      .waitForElementVisible('@passengerSection', 10000);
  },

  'Verify Analytics Event Store is correct after Save on Travel Information Page'(client) {
    Analytics.verifyStore(client, 'EventStore', (EventStore) => {
      EventStore.should.eql({
        addedEmergencyContact: true,
        addedKTN: true,
        addedPassport: true,
        addedRR: false,
        addedRedress: true,
        edited: {
          editedKTN: false,
          editedRedress: false
        }
      });
    });
  },

  'Go To Travel Information page a second time'() {
    tripDetails
      .waitForElementVisible('@passengerSection', 10000)
      .clickVisible('@passengerSection');
  },

  'Verify Oops Error Message is displayed when partial passport data is entered'() {
    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .withPassportNumber('ABC1234PASSPORT')
      .save();

    travelInformation
      .waitForElementVisible('@oopsErrorHeader', 10000)
      .assert.containsText('@oopsErrorHeader', 'Please correct the highlighted errors.');
  },

  after(client) {
    client.end();
  }
};
