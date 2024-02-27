const dayjs = require('dayjs');

let carDetails, carLandingPage, homePage, login, myAccount, navDraw, upcomingTripList;

module.exports = {
  '@tags': ['backForwardRefresh'],
  before(client) {
    homePage = client.page.homePage();
    login = client.page.login();
    navDraw = client.page.navDraw();
    myAccount = client.page.myAccount();
    upcomingTripList = client.page.upcomingTripList();
    carDetails = client.page.carDetails();
    carLandingPage = client.page.landingPage();

    homePage.open()
      .assert.title(client.globals.title);

    login.withDefaults('thehack2', 'Test1234');
    client.waitForElementVisibleWithDefaultTimeout('.home-and-nav');
  },

  'Go MyAccount home page'() {
    navDraw
      .openMenu().myAccount();
  },

  'Tap Trips number banner'() {
    myAccount
      .waitUpcomingTripsDisplay()
      .waitForElementVisibleWithDefaultTimeout('.my-account')
      .tapTripsNumber();
  },

  'Verify Upcoming trips page and take you to the first upcoming car trip'() {
    upcomingTripList.waitForTripListDisplay()
      .assert.urlContains('/my-account/upcoming-trips')
      .tapNextUpcomingCarTrip()
      .waitForElementVisibleWithDefaultTimeout('.lazy-loaded-car');
  },

  'Verify car trip details page and Add Another Car'() {
    carDetails.waitForElementPresent('@carImg', 10000)
      .assert.containsText('@pageHeader', 'Reservation')
      .assert.containsText('@pickupTime', '9/16/2017')
      .assert.containsText('@pickupLocation', 'Dallas (Love Field), TX')
      .assert.containsText('@driverName', 'Cannon Biggs')
      .assert.containsText('@carConfirmCode', '08172185US0')
      .waitForElementPresent('@manageButton', 10000)
      .clickVisible('@manageButton')
      .waitForElementPresent('@addAnotherCarLink', 10000)
      .clickVisible('@addAnotherCarLink');
  },

  'Verify Car Booking Landing Page is populated with data from previous car reservation'() {
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
