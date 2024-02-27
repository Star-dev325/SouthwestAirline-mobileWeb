'use strict';

const dayjs = require('dayjs');

let homePage, today, viewCarReservation;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    viewCarReservation = client.page.viewCarReservation();
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

  'Check the browser refresh behavior'(client) {
    client
      .refresh()
      .assert.urlEquals(`${client.launchUrl}/view-reservation?tab=CAR`);
  },

  after(client) {
    client.end();
  }
};
