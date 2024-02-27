/* eslint-disable no-unused-vars */
/* TODO: re-enable eslint when fixing flaky test MOB-116158  */
const Analytics = require('test/e2e/analytics/analytics');

let confirmation, homePage, landingPage, pricing, purchase, shoppingResultsPage;
const selectedExtras = [];

module.exports = {
  '@tags': ['backForwardRefresh, flaky'],
  before(client) {
    homePage = client.page.homePage();
    landingPage = client.page.landingPage();
    shoppingResultsPage = client.page.shoppingResultsPage();
    pricing = client.page.pricing();
    purchase = client.page.purchase();
    confirmation = client.page.carBookingConfirmation();

    client
      .init()
      .assert.title(client.globals.title);
  },

  'Go to car booking from home page'(client) {
    homePage.goToCarBooking();
    landingPage
      .expect.element('@loginButton').text.to.equal('Log in');
    client.waitForElementNotVisible('.dimmer', 10000);
    client.saveSnapshot('on car booking page');

    landingPage.openPickUpSelector();
    Analytics.verifyPageView(client, 'car-booking-pick-up');

    landingPage.selectCarLocation(client.globals.airport.DallasLoveField);
    Analytics.verifyPageView(client, 'car-booking');

    landingPage.openDropOffSelector();
    Analytics.verifyPageView(client, 'car-booking-drop-off');

    landingPage.selectCarLocation(client.globals.airport.DallasLoveField);
    Analytics.verifyPageView(client, 'car-booking');

    landingPage
      .withPickUpCalendarDate()
      .waitForElementPresent('@calendar', 10000);
    Analytics.verifyPageView(client, 'car-booking-dates');

    client.back();
    Analytics.verifyPageView(client, 'car-booking');
  },

  'Book an Economy car with pick-up and drop off in Dallas'(client) {
    landingPage
      .withPickUp(client.globals.airport.DallasLoveField)
      .waitForElementNotPresent('@fullScreenModal', 10000)
      .withVehicleType('Economy')
      .saveSnapshot('fill car selection details')
      .goToCarCompanyPage()
      .waitForElementPresent('@fullScreenModal', 10000)
      .assert.urlContains('selectCarCompany')
      .saveSnapshot('select car company page')
      .goBackToLandingPage()
      .assert.visible('@carCompany')
      .findCars();
  },

  'Wait for car search results page to render'() {
    shoppingResultsPage.waitUntilFinishedLoading();
  },

  'Verify Car Search Analytics'(client) {
    Analytics.verifyStore(client, 'CarBookingStore/search');
  },

  'Verify analytics data is correct for car search results'(client) {
    Analytics.verifyStore(client, 'CarBookingStore/results');
  },

  'Chose a car product'(client) {
    shoppingResultsPage
      .withCarResult(1)
      .expect.element('@loginButton').text.to.equal('Log in');
    client.saveSnapshot('select car');
  },

  'Redirect to pricing page'(client) {
    pricing
      .waitForElementVisible('@continueButton', 10000)
      .getText('@extraContainer1', (result) => {
        pricing.clickVisible('@extraCheckBox1');
        selectedExtras.push(result.value);
      })
      .getText('@extraContainer2', (result) => {
        pricing.clickVisible('@extraCheckBox2');
        selectedExtras.push(result.value);
      })
      .assert.containsText('.page-header', 'Price')
      .expect.element('@loginButton').text.to.equal('Log in');
    client.saveSnapshot('redirected to pricing page');
  },

  'Go to purchase page'() {
    pricing.continue();
    purchase.waitForElementNotPresent('@loginButton', 500);
  },

  'Verify selected car details are correct in analytics store'(client) {
    Analytics.verifyStore(client, 'CarBookingStore/carSelection');
  },

  'enter purchase data'(client) {
    const { us } = client.globals.address;

    purchase
      ._setValue('@driverFirstName', 'James')
      ._setValue('@driverMiddleName', 'Robert')
      ._setValue('@driverLastName', 'Merson')
      ._setValue('@accountNumber', '888888888');

    purchase
      ._setValue('@driverPhoneNumber', us.phoneNumber)
      ._setValue('@confirmationEmail', 'test@test.com');
    client.saveSnapshot('car purchase page');
    purchase.reserve();
  },

  // TODO: fix this flaky test (MOB-116158)

  // 'Go to confirmation page'(client) {
  //   confirmation
  //     .waitForElementVisible('@extras', 10000, function() {
  //       selectedExtras.forEach(function(extra) {
  //         confirmation.assert.containsText('@extras', extra);
  //       });
  //     })
  //     .waitForElementNotPresent('@loginButton', 500);
  //   client.saveSnapshot('car confirmation page');
  // },

  // 'Go to home page'(client) {
  //   confirmation
  //     .clickVisible('@homeArrow');
  //   client.waitForElementNotVisible('.dimmer', 10000)
  //     .assert.urlEquals(`${client.launchUrl}/`);
  // },

  // 'Back to car comfirmation page'(client) {
  //   client.back();

  //   client.waitForElementNotVisible('.dimmer', 10000)
  //     .assert.urlEquals(`${client.launchUrl}/car/booking/confirmation`);
  // },

  // 'Verify car purchase confirmation analytics data'(client) {
  //   Analytics.verifyStore(client, 'CarBookingStore/purchase');
  // },

  // 'Browser back'(client) {
  //   client.back();
  // },

  // 'Redirected to the home page'(client) {
  //   client.waitForElementNotVisible('.dimmer', 10000)
  //     .assert.urlEquals(`${client.launchUrl}/`);
  // },

  after(client) {
    client.end();
  }
};
