const landingPage = {
  waitUntilFinishedLoading() {
    return this.waitForElementVisible('form[name="car-booking-search-form"]', 10000);
  },

  _dropdown(value) {
    return this.waitForElementPresent('select[name*="vehicle"]', 10000)
      .click('.vehicle-type label')
      .clickVisible(`option[value="${value}"]`);
  },

  openPickUpSelector() {
    return this.clickVisible('@fromLocation')
      .waitForElementPresent('@airportList', 10000);
  },

  openDropOffSelector() {
    return this.clickVisible('@toLocation')
      .waitForElementPresent('@airportList', 10000);
  },

  withPickUpCalendarDate() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@pickUpCalendarInput');
  },

  withPickUp(name) {
    return this.openPickUpSelector()
      .selectCarLocation(name);
  },

  withVehicleType(value) {
    return this._dropdown(value);
  },
  goToCarCompanyPage() {
    return this.clickVisible('@carCompany');
  },
  goBackToLandingPage() {
    return this.clickVisible('@doneButton');
  },
  findCars() {
    return this.clickVisible('@findCarsButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    fromLocation: 'div[data-qa="car-pick-up"]',
    toLocation: 'div[data-qa="car-drop-off"]',
    calendar: '.calendar',
    pickUpCalendarInput: 'div[data-qa="car-booking-pick-up-date"]',
    airportList: '.airport-list',
    pageTitle: '.page-title',
    loginButton: '.login-button--box',
    carCompany: '[data-qa="car-companies"]',
    doneButton: 'button[type="button"]',
    titleOfCarCompany: '.action-bar--main-title',
    fullScreenModal: '.action-bar--container',
    findCarsButton: 'button[type="submit"]',
    popupTitle: '.popup-title',
    popUpButton: '.confirm-button',
    recentButton: '.page-header--right-button',
    recentRecord: '[data-qa="recent-search-card"]',
    pickupDate: 'div[data-qa="car-booking-pick-up-date"]',
    dropoffDate: 'div[data-qa="car-booking-drop-off-date"]'
  },
  commands: [landingPage]
};
