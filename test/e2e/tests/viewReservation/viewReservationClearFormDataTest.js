'use strict';

const dayjs = require('dayjs');

let homePage, navDraw, tomorrow, viewCarReservation, viewReservation;

module.exports = {
  before(client) {
    navDraw = client.page.navDraw();
    homePage = client.page.homePage();
    viewReservation = client.page.viewReservation();
    viewCarReservation = client.page.viewCarReservation();
    tomorrow = dayjs().add(1, 'd').format('YYYY-MM-DD');

    homePage.open();
    navDraw.openMenu().viewReservations();
  },

  'enter information in flight form'() {
    viewReservation.withConfirmationNumber('VIWAIR')
      .withFirstName('amber')
      .withLastName('awesome')
      .assert.value('@confirmationNumber', 'VIWAIR')
      .assert.value('@firstName', 'amber')
      .assert.value('@lastName', 'awesome');
  },

  'tap car tab and enter information in car form'() {
    viewCarReservation
      .tapCarTab()
      .waitForElementNotVisible('.dimmer', 10000);
    viewCarReservation.withConfirmationNumber('08172185US0')
      .withFirstName('Cannon')
      .withLastName('Biggs')
      .withPickUpDate(tomorrow)
      .assert.value('@confirmationNumber', '08172185US0')
      .assert.value('@firstName', 'Cannon')
      .assert.value('@lastName', 'Biggs')
      .assert.value('@pickUpDate', tomorrow);
  },

  're-enter flight reservation page from hamburger menu'() {
    navDraw.openMenu().viewReservations();
  },

  'flight form is not cleared'() {
    viewReservation
      .waitForElementVisible('@confirmationNumber', 10000)
      .assert.value('@confirmationNumber', 'VIWAIR')
      .assert.value('@firstName', 'amber')
      .assert.value('@lastName', 'awesome');
  },

  'tap car tab and car form is not cleared'() {
    viewCarReservation
      .tapCarTab()
      .waitForElementNotVisible('.dimmer', 10000);
    viewCarReservation
      .waitForElementVisible('@confirmationNumber', 1000)
      .assert.value('@confirmationNumber', '08172185US0')
      .assert.value('@firstName', 'Cannon')
      .assert.value('@lastName', 'Biggs')
      .assert.value('@pickUpDate', tomorrow);
  },

  'tap flight tab and re-enter flight reservation page from hamburger menu'() {
    viewReservation
      .tapFlightTab()
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.value('@confirmationNumber', 'VIWAIR')
      .assert.value('@firstName', 'amber')
      .assert.value('@lastName', 'awesome');
    navDraw.openMenu().viewReservations();
  },

  'flight form is not cleared as well'() {
    viewReservation
      .waitForElementVisible('@confirmationNumber', 10000)
      .assert.value('@confirmationNumber', 'VIWAIR')
      .assert.value('@firstName', 'amber')
      .assert.value('@lastName', 'awesome');
  },

  after(client) {
    client.end();
  }
};
