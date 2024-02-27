'use strict';

const dayjs = require('dayjs');

let carCancelConfirmation, carDetails, homePage, today, viewCarReservation;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    viewCarReservation = client.page.viewCarReservation();
    carDetails = client.page.carDetails();
    carCancelConfirmation = client.page.carCancelConfirmation();
    today = dayjs().format('YYYY-MM-DD');

    client
      .init()
      .assert.title(client.globals.title);
  },

  'Going to manage trips and tap car tab'() {
    homePage
      .goToManageTrips()
      .waitForElementNotVisible('.dimmer', 10000);
    viewCarReservation
      .tapCarTab()
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'View car reservation through with confirmation number'() {
    viewCarReservation
      .withConfirmationNumber('08172185US0')
      .withFirstName('Cannon')
      .withLastName('Biggs')
      .withPickUpDate(today)
      .saveSnapshot('fill reservation details')
      .continue()
      .waitForElementVisible('.manage-car-reservation-with-details', 10000)
      .saveSnapshot('on car details page');
  },

  'Choose the cancel car option'() {
    carDetails.manage()
      .assert.containsText('@cancelCar', 'Cancel car reservation')
      .cancelCar()
      .confirmCancelCar()
      .waitForElementNotVisible('.dimmer', 10000)
      .saveSnapshot('on cancel car page');
  },

  'Verify car cancel confirmation'(client) {
    carCancelConfirmation
      .waitForElementPresent('@cancelTitle', 10000)
      .assert.urlContains('/confirmation')
      .assert.containsText('@driver', 'Cannon Biggs')
      .assert.containsText('@confirmationNumber', '08172185US0')
      .assert.containsText('@pickupTime', '9/16/2017')
      .assert.containsText('@pickupLocation', 'Dallas (Love Field), TX');
    client.saveSnapshot('on car cancel confirmation page');
  },

  'Check the browser back behavoir'(client) {
    client
      .back()
      .assert.urlEquals(`${client.launchUrl}/`);
  },

  after(client) {
    client.end();
  }
};
