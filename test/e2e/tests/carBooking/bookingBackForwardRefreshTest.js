/* eslint-disable no-unused-vars */
/* TODO: re-enable eslint when fixing flaky test MOB-116221 */
let confirmation, homePage, landingPage, navDraw, pricing, purchase, shoppingResultsPage;
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
    navDraw = client.page.navDraw();

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
    landingPage.selectCarLocation(client.globals.airport.DallasLoveField);

    landingPage.openDropOffSelector();
    landingPage.selectCarLocation(client.globals.airport.DallasLoveField);

    landingPage
      .withPickUpCalendarDate()
      .waitForElementPresent('@calendar', 10000);

    client.back();
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

  'Choose a car product'(client) {
    shoppingResultsPage
      .withCarResult(1)
      .expect.element('@loginButton').text.to.equal('Log in');
    client.saveSnapshot('select car');
  },

  'Continues to pricing page'(client) {
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

  'Continue to purchase page'(client) {
    pricing.continue();
    purchase.waitForElementVisible('@reserveButton', 10000);
    client.assert.urlEquals(`${client.launchUrl}/car/booking/purchase`);
  },

  'Enter purchase data'(client) {
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
  },

  'Browser Back/Forward'(client) {
    client.back();
    pricing.waitForElementVisible('@continueButton', 10000);
    client.assert.urlEquals(`${client.launchUrl}/car/booking/pricing`);

    client.forward();
    purchase.waitForElementVisible('@reserveButton', 10000);
    client.assert.urlEquals(`${client.launchUrl}/car/booking/purchase`);

    client.saveSnapshot('back forward on purchase page');
  },

  'Reserve Car'() {
    purchase.reserve();
  },

  /* TODO: re-enable eslint when fixing flaky test MOB-116221 */

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

  // 'Attempt Browser Back from car comfirmation page to car purchase page redirects to home page'(client) {
  //   client.back();

  //   client.waitForElementNotVisible('.dimmer', 10000)
  //     .assert.urlEquals(`${client.launchUrl}/`);
  // },

  // 'Redirected to the home page'(client) {
  //   client.waitForElementNotVisible('.dimmer', 10000)
  //     .assert.urlEquals(`${client.launchUrl}/`);
  // },

  // 'Go to car booking from home page 2nd time, expect cleared and default values'(client) {
  //   homePage.goToCarBooking();
  //   landingPage
  //     .expect.element('@loginButton').text.to.equal('Log in');
  //   client.waitForElementNotVisible('.dimmer', 10000);

  //   landingPage.assert.containsText('@fromLocation', 'Pick-up');
  //   landingPage.assert.containsText('@toLocation', 'Return');

  //   client.saveSnapshot('on car booking page 2nd time');
  // },

  // 'Enter search data on car booking landing page'(client) {
  //   landingPage.openPickUpSelector();
  //   landingPage.selectCarLocation(client.globals.airport.DallasLoveField);
  // },

  // 'Find an Economy car with pick-up and drop off in Dallas'(client) {
  //   landingPage
  //     .withPickUp(client.globals.airport.DallasLoveField)
  //     .waitForElementNotPresent('@fullScreenModal', 10000)
  //     .withVehicleType('Economy')
  //     .saveSnapshot('fill car selection details')
  //     .goToCarCompanyPage()
  //     .waitForElementPresent('@fullScreenModal', 10000)
  //     .assert.urlContains('selectCarCompany')
  //     .saveSnapshot('select car company page')
  //     .goBackToLandingPage()
  //     .assert.visible('@carCompany')
  //     .findCars();
  // },

  // 'Wait for car shopping page to render'() {
  //   shoppingResultsPage.waitUntilFinishedLoading();
  // },

  // 'Refesh on shopping page (mid flow)'(client) {
  //   client.refresh();
  // },

  // 'Expect redirect to car booking page with search data reset to defaults'(client) {
  //   landingPage
  //     .waitUntilFinishedLoading()
  //     .expect.element('@loginButton').text.to.equal('Log in');
  //   client.waitForElementNotVisible('.dimmer', 10000);

  //   landingPage.assert.containsText('@fromLocation', 'Pick-up');
  //   landingPage.assert.containsText('@toLocation', 'Return');

  //   client.saveSnapshot('on car booking page after refresh browser in mid flow');
  // },

  // 'Go to car booking from home page 3nd time, expect cleared and default values'(client) {
  //   homePage.goToCarBooking();
  //   landingPage
  //     .expect.element('@loginButton').text.to.equal('Log in');
  //   client.waitForElementNotVisible('.dimmer', 10000);

  //   landingPage.assert.containsText('@fromLocation', 'Pick-up');
  //   landingPage.assert.containsText('@toLocation', 'Return');

  //   client.saveSnapshot('on car booking page 3nd time');
  // },

  // 'Enter search data on car booking landing page for CHAPI error'(client) {
  //   landingPage.openPickUpSelector();
  //   landingPage.selectCarLocation(client.globals.airport.BaltimoreWashington);
  // },

  // 'Show Popup and remains on landing page with search data same as entered'(client) {
  //   landingPage
  //     .findCars()
  //     .waitForElementNotVisible('.dimmer', 10000);

  //   client.saveSnapshot('popup displayed when fetch cars returns chapi error');

  //   landingPage
  //     .assert.containsText('@popupTitle', 'Something must have gone wrong. Please try again.')
  //     .clickVisible('@popUpButton', 1000)
  //     .assert.containsText('@fromLocation', 'BWI')
  //     .assert.containsText('@toLocation', 'BWI');
  // },

  // 'Go to car booking from home page 4th time, expect cleared and default values'(client) {
  //   homePage.goToCarBooking();
  //   landingPage
  //     .expect.element('@loginButton').text.to.equal('Log in');
  //   client.waitForElementNotVisible('.dimmer', 10000);

  //   landingPage.assert.containsText('@fromLocation', 'Pick-up');
  //   landingPage.assert.containsText('@toLocation', 'Return');

  //   client.saveSnapshot('on car booking page 4th time');
  // },

  // 'Enter search data on car booking landing page (Recent Search Refresh scenario)'(client) {
  //   landingPage.openPickUpSelector();
  //   landingPage.selectCarLocation(client.globals.airport.DallasLoveField);
  // },

  // 'Click Recent button and Refresh Browser on Recent Searches modal'(client) {
  //   landingPage
  //     .clickVisible('@recentButton', 10000)
  //     .waitForElementNotVisible('.dimmer', 10000);

  //   client.refresh();
  // },

  // 'Expect to redirect to car booking landing page with data cleared'(client) {
  //   client.waitForElementNotVisible('.dimmer', 10000);

  //   landingPage.assert.containsText('@fromLocation', 'Pick-up');
  //   landingPage.assert.containsText('@toLocation', 'Return');
  // },

  // 'Go to car booking using Nav Drawer'(client) {
  //   homePage.open();

  //   navDraw
  //     .openMenu()
  //     .accordionClick('@Car', '@BookCar')
  //     .waitForElementNotVisible('.dimmer', 10000)
  //     .assert.urlEquals(`${client.launchUrl}/car/booking?cleanFlow=true&clk=GNAVBKCAR`);
  // },

  // 'Click Recent button, select first recent record, and validate form has recent record values'() {
  //   landingPage
  //     .clickVisible('@recentButton', 10000)
  //     .waitForElementNotVisible('.dimmer', 10000)
  //     .clickVisible('@recentRecord', 10000)
  //     .waitForElementNotVisible('.dimmer', 10000)
  //     .assert.containsText('@fromLocation', 'DAL')
  //     .assert.containsText('@toLocation', 'DAL');
  // },

  // 'Open a modal and verify the form still has recent record values (cleanFlowInterceptor did not run)'(client) {
  //   landingPage
  //     .withPickUpCalendarDate()
  //     .waitForElementPresent('@calendar', 10000);

  //   client.back();

  //   landingPage
  //     .assert.containsText('@fromLocation', 'DAL')
  //     .assert.containsText('@toLocation', 'DAL');
  // },

  // 'Verify going back takes you to the previous page (home) and not the recent searches page'(client) {
  //   client.back();

  //   client.waitForElementNotVisible('.dimmer', 10000)
  //     .assert.urlEquals(`${client.launchUrl}/`);
  // },

  after(client) {
    client.end();
  }
};
