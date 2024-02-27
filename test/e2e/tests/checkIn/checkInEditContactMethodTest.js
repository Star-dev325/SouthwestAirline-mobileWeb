'use strict';

let checkIn, confirmation, contactMethodPage, homePage, navDraw;

module.exports = {
  '@tags': ['flaky'],
  before(client) {
    checkIn = client.page.checkIn();
    confirmation = client.page.confirmation();
    homePage = client.page.homePage();
    navDraw = client.page.navDraw();
    contactMethodPage = client.page.contactMethodPage();
  },

  'Go to check in from hamburger menu'() {
    homePage.open();
    navDraw
      .openMenu()
      .checkIn();
  },

  'Search for a reservation'() {
    checkIn
      .withConfirmationNumber('RMXAUA')
      .withFirstName('helen')
      .withLastName('wang')
      .continue();
  },

  'Click and go to edit contact method page'() {
    confirmation
      .waitForElementVisible('@editContactLink', 10000)
      .clickVisible('@editContactLink');
    contactMethodPage.waitForElementVisible('@message', 10000);
  },

  'Change contact method'() {
    contactMethodPage
      .withTextMe('1231231231')
      .saveNewContactMethod();
    confirmation.waitForElementVisible('@editContactLink', 10000);
  },

  'Go to edit contact method page'() {
    confirmation.clickVisible('@editContactLink');
    contactMethodPage.waitForElementVisible('@message', 10000);
  },

  'Browser back to checkin confirmation'(client) {
    client.back();
    confirmation.waitForElementVisible('@editContactLink', 10000);
  },

  'Browser forward to contact method page'(client) {
    client.forward();
    contactMethodPage.waitForElementVisible('@message', 10000);
  },

  'refresh on contact method to checkIn search reservation page'(client) {
    client.refresh();
    checkIn.waitForElementVisible('@confirmationNumber', 10000);
  },

  after(client) {
    client.end();
  }
};
