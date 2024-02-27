'use strict';

const Analytics = require('test/e2e/analytics/analytics');

let homePage, login, navDraw, travelInformation, tripDetails, upcomingTripList, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();
    travelInformation = client.page.travelInformation();
    upcomingTripList = client.page.upcomingTripList();

    homePage.open();

    login.withDefaults('thehack2', 'Test1234');
    client.pause(1000);
  },

  'Find flight reservation through confirmation number'(client) {
    navDraw.openMenu().viewReservations();
    client.pause(1000);

    viewReservation.withConfirmationNumber('PPUWKZ')
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
      .saveSnapshot('on travel information page for domestic pnr');
  },

  'Verify Cancel Warning Popup and Pressing No to Popup Warning'() {
    travelInformation.cancel();

    travelInformation.waitForElementVisible('@cancelPopupWarning', 10000)
      .assert.containsText('@cancelPopupWarning', 'Are you sure you want to cancel?')
      .assert.containsText('@cancelPopupWarning', 'If so, the information on this page will not be saved and you\'ll be taken back to the view reservation details page.');

    travelInformation.pressCancelPopupNoButton();

    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000);
  },

  'Verify Transition to Trip Details Page after Pressing Cancel Button and Press Yes on Warning Popup'() {
    travelInformation.cancel();
    travelInformation.pressCancelPopupYesButton();

    tripDetails
      .waitForElementVisible('@passengerSection', 10000);
  },

  'Go To Travel Information page second time'() {
    tripDetails
      .waitForElementVisible('@passengerSection', 10000)
      .clickVisible('@passengerSection');
  },

  'Verify Pressing Save Button transitions to Trip Details Page'() {
    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000)
      .saveWithRedressNumber('123456789');

    tripDetails
      .waitForElementVisible('@passengerSection', 10000);
  },

  'Verify Analytics Event Store is correct after Save on Travel Information Page'(client) {
    Analytics.verifyStore(client, 'EventStore', (EventStore) => {
      EventStore.should.eql({
        addedEmergencyContact: false,
        addedKTN: false,
        addedPassport: false,
        addedRR: false,
        addedRedress: true,
        edited: {
          editedKTN: false,
          editedRedress: false
        }
      });
    });
  },

  'Go To Travel Information page third time'() {
    tripDetails
      .waitForElementVisible('@passengerSection', 10000)
      .clickVisible('@passengerSection');
  },

  'Verify Browser Refresh transitions back to beginning of upcoming trips flow because user is logged in'(client) {
    travelInformation
      .waitForElementVisible('@rapidRewardsNumberField', 10000);

    client.refresh();

    upcomingTripList.waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips');
  },

  after(client) {
    client.end();
  }
};
