const dayjs = require('dayjs');

let carDetails, carLandingPage, homePage, today, viewCarReservation;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    viewCarReservation = client.page.viewCarReservation();
    carDetails = client.page.carDetails();
    today = dayjs().format('YYYY-MM-DD');
    carLandingPage = client.page.landingPage();

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

  'Choose the Add car option'() {
    carDetails.manage()
      .assert.containsText('@addAnotherCarLink', 'Add another car')
      .waitForElementPresent('@addAnotherCarLink', 10000)
      .clickVisible('@addAnotherCarLink');
  },

  'Verify Car Booking Landing Page is populated with new dates but last searched locations'() {
    carLandingPage
      .waitForElementNotVisible('.dimmer', 10000)
      .assert.containsText('@fromLocation', 'DAL')
      .assert.containsText('@toLocation', 'DAL')
      .assert.containsText('@pickupDate', dayjs().add(1, 'day').format('M/DD'))
      .assert.containsText('@dropoffDate', dayjs().add(4, 'day').format('M/DD'));
  },

  after(client) {
    client.end();
  }
};
