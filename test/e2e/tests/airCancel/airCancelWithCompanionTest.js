'use strict';

let homePage, login, tripDetails, viewReservation;

module.exports = {
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    viewReservation = client.page.viewReservation();
    tripDetails = client.page.tripDetails();

    homePage.goToManageTrips();
  },

  'Login user'(client) {
    login
      .withDefaults(client.globals.username, client.globals.password)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  'Lookup flight reservation with confirmation number'() {
    viewReservation
      .withConfirmationNumber('CANONE')
      .withFirstName('Qianqian')
      .withLastName('Wang')
      .saveSnapshot('fill reservation details')
      .continue();

    tripDetails
      .waitForElementPresent('@recordLocator', 10000)
      .assert.containsText('@recordLocator', 'CANONE')
      .assert.urlContains('view-reservation/trip-details')
      .saveSnapshot('on trip details page');
  },

  'Verify Call SWA message appears in place of Change/Cancel Button'() {
    tripDetails
      .waitForElementPresent('@tripDetailsCard', 10000)
      .waitForElementPresent('@callFlySwaToModifyReservation', 10000)
      .assert.containsText('@callFlySwaToModifyReservation', 'Contact us at 1-800-I-FLY-SWA to modify your reservation');
  },

  after(client) {
    client.end();
  }
};
