'use strict';

let homePage;

module.exports = {
  before(client) {
    homePage = client.page.homePage();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'go to special offer from homepage and verify the url'() {
    homePage.goToSpecialOffers()
      .assert.urlContains('https://www.southwest.com/special-offers/flight-deals/');
  },

  after(client) {
    client.end();
  }
};