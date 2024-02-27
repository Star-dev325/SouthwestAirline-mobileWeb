'use strict';

const homePage = {

  open() {
    return this.api.url(this.api.launchUrl)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToBookAFlight() {
    this.open();

    return this.clickVisible('@bookAFlight')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToCheckIn() {
    this.open();

    return this.clickVisible('@checkIn')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToSpecialOffers() {
    this.open();

    return this.clickVisible('@specialOffers');
  },
  goToFlightStatus() {
    this.open();

    return this.clickVisible('@flightStatus')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToRapidRewards() {
    this.open();

    return this.clickVisible('@rapidRewards')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToManageTrips() {
    this.open();

    return this.clickVisible('@manageTrips')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToFlyingSouthwest() {
    this.open();

    return this.clickVisible('@flyingSouthwestLink')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToCarBooking() {
    this.open();

    return this.clickVisible('@carBooking')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  goToLogin() {
    this.open();

    return this.clickVisible('@loginButtonOnHeader')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    bookAFlight: 'i[class="home-nav-grid-item--icon icon icon_airplane-depart"]',
    checkIn: 'i[class="home-nav-grid-item--icon icon icon_home-checkin"]',
    specialOffers: 'i[class="home-nav-grid-item--icon icon icon_home-special-offers-tag"]',
    flightStatus: 'i[class="home-nav-grid-item--icon icon icon_home-flight-status"]',
    rapidRewards: 'i[class="home-nav-grid-item--icon icon icon_home-rapid-rewards"]',
    manageTrips: 'i[class="home-nav-grid-item--icon icon icon_home-manage"]',
    flyingSouthwestLink: '.home-nav-list-item:nth-child(2)',
    carBooking: '.home-nav-list-item:nth-child(4)',
    viewFullSite: 'a[href="https://www.southwest.com/?src=LinkMobileWeb&clk=LinkMobileWeb"]',
    contactUs: 'a[href="/contact-us"]',
    termsAndConditions: 'a[href="/terms-and-conditions"]',
    privacyPolicy: 'a[href="/privacy-policy"]',
    loginButtonOnHeader: '#header .login-btn'
  },
  commands: [homePage]
};
