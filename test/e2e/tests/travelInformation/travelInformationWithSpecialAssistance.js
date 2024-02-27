const Analytics = require('test/e2e/analytics/analytics');

let login, navDraw, specialAssistance, travelInformation, tripDetails, viewReservation;

module.exports = {
  before(client) {
    login = client.page.login();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    travelInformation = client.page.travelInformation();
    specialAssistance = client.page.specialAssistance();

    client
      .init()
      .verify.title(client.globals.title);

    client.waitForElementNotVisible('.dimmer', 10000);

    login
      .withDefaults('thehack2', 'Test1234')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Find flight reservation through confirmation number'() {
    navDraw
      .openMenu()
      .viewReservations()
      .waitForElementNotVisible('.dimmer', 10000);

    viewReservation
      .withConfirmationNumber('SPESHL')
      .withFirstName('SA PASSENGER')
      .withLastName('VIEWREZERTON')
      .continue();
  },

  'Go To Travel Information page'() {
    tripDetails
      .waitForElementVisible('@passengerSection', 10000)
      .clickVisible('@passengerSection');
  },

  'Verify Special Assistance on Travel Information Page'() {
    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .checkSpecialAssistanceNavItemMessage('Some options selected')
      .clickSpecialAssistance();
  },

  'Verify analytics SpecialAssistanceStore.selectionMade'(client) {
    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(false);
    });
  },

  'Remove the existing Special Assistance options'() {
    specialAssistance
      .selectBlind()
      .saveSASelections();

    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .checkSpecialAssistanceNavItemMessage('(Optional)')
      .clickSpecialAssistance();
  },

  'Analytics selectionMade should be true now'(client) {
    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(true);
    });
  },

  'Replace the removed Special Assistance options'() {
    specialAssistance
      .selectBlind()
      .saveSASelections();

    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .checkSpecialAssistanceNavItemMessage('Some options selected')
      .clickSpecialAssistance();
  },

  'Analytics selectionMade should be false again'(client) {
    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(false);
    });
  },

  'Add additional Special Assistance options and save Travel Info form'(client) {
    specialAssistance
      .selectDeaf()
      .saveSASelections();

    Analytics.verifyStore(client, 'SpecialAssistanceStore', (specialAssistanceStore) => {
      specialAssistanceStore.selectionMade.should.eql(true);
    });

    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .checkSpecialAssistanceNavItemMessage('Some options selected')
      .save();
  },

  'Verify transition back to Trip Details Page'() {
    tripDetails
      .waitForElementVisible('@passengerSection', 10000);
  },

  after(client) {
    client.end();
  }
};
