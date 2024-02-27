'use strict';

const dayjs = require('dayjs');

let carDetails, homePage, landingPage, tomorrow, viewCarReservation;

module.exports = {
  before(client) {
    viewCarReservation = client.page.viewCarReservation();
    carDetails = client.page.carDetails();
    landingPage = client.page.landingPage();
    homePage = client.page.homePage();
    tomorrow = dayjs().add(1, 'd').format('YYYY-MM-DD');

    client
      .init()
      .verify.title(client.globals.title);
  },

  'Going to manage trips and tap car tab'() {
    homePage
      .goToManageTrips()
      .waitForElementNotVisible('.dimmer', 10000);
    viewCarReservation
      .tapCarTab()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Verify car reservation home page'() {
    viewCarReservation
      .assert.attributeEquals('@confirmationNumber', 'placeholder', 'Confirmation #')
      .assert.attributeEquals('@firstName', 'placeholder', 'Driver\'s first name')
      .assert.attributeEquals('@lastName', 'placeholder', 'Driver\'s last name');
  },

  'View car reservation through with confirmation number'() {
    viewCarReservation.withConfirmationNumber('08172185US0')
      .withFirstName('Cannon')
      .withLastName('Biggs')
      .withPickUpDate(tomorrow)
      .saveSnapshot('entered car confirmation details');
  },

  'Click retrieve reservation and refresh'(client) {
    viewCarReservation.continue();
    client.refresh();
  },

  'Verify going to car reservation instead of flight reservation'(client) {
    viewCarReservation.waitForElementNotVisible('.dimmer', 10000);
    client.assert.urlContains('/view-reservation?tab=CAR');
  },

  'Prefill View car reservation through with confirmation number'() {
    viewCarReservation.withConfirmationNumber('08172185US0')
      .withFirstName('Cannon')
      .withLastName('Biggs')
      .withPickUpDate(tomorrow)
      .saveSnapshot('entered car confirmation details');
  },

  'User click browser back and forward'(client) {
    client.pause(500).back().forward();
  },

  'The cached form data should still be prefill'() {
    viewCarReservation
      .waitForElementVisible('@confirmationNumber', 1000)
      .assert.value('@confirmationNumber', '08172185US0')
      .assert.value('@firstName', 'Cannon')
      .assert.value('@lastName', 'Biggs')
      .assert.value('@pickUpDate', tomorrow)
      .continue();
  },

  'Verify car reservation details page and click Manage button'() {
    carDetails.waitForElementPresent('@carImg', 10000)
      .assert.urlContains('view-reservation/car-details')
      .assert.containsText('@pageHeader', 'Reservations')
      .assert.containsText('@pickupTime', '9/16/2017')
      .assert.containsText('@pickupLocation', 'Dallas (Love Field), TX')
      .assert.containsText('@driverName', 'Cannon Biggs')
      .assert.containsText('@carConfirmCode', '08172185US0')
      .waitForElementPresent('@manageButton', 10000)
      .clickVisible('@manageButton')
      .waitForElementPresent('@addAnotherCarLink', 10000);
  },

  'Add another car and go back'(client) {
    carDetails.waitForElementPresent('@cancelCar', 30000)
      .waitForElementPresent('@cancelLinkOnCarTab', 10000)
      .saveSnapshot('on car details page')
      .clickVisible('@addAnotherCarLink');

    landingPage.waitForElementPresent('@fromLocation', 10000)
      .saveSnapshot('Add another car home page');

    client.back();

    carDetails
      .waitForElementNotVisible('.dimmer', 10000)
      .waitForElementVisible('@manageButton', 50000);
  },

  'Verify do not cancel car reservation'() {
    carDetails
      .clickVisible('@manageButton')
      .waitForElementPresent('@addAnotherCarLink', 10000)
      .waitForElementPresent('@cancelCar', 10000)
      .saveSnapshot('on car details page')
      .clickVisible('@cancelCar')
      .waitForElementPresent('@doNotCancelButton', 10000)
      .waitForElementPresent('@confirmCancelButtion', 10000)
      .assert.containsText('@cancelPopupTitle', 'Please confirm your cancellation')
      .saveSnapshot('Cancel car reservation pop up')

      .clickVisible('@doNotCancelButton')
      .waitForElementPresent('@manageButton', 10000)
      .saveSnapshot('Do not to cancel car reservation');
  },

  after(client) {
    client.end();
  }
};
