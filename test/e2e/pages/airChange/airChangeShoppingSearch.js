const airChangeShoppingSearch = {
  checkShowSenior() {
    return this.clickVisible('@showSenior');
  },

  openFromAirportSelector() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@fromAirport')
      .waitForElementPresent('@airportList', 10000);
  },

  openToAirportSelector() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@toAirport')
      .waitForElementPresent('@airportList', 10000);
  },

  withCalendarDate() {
    return this.waitForElementNotVisible('.dimmer', 10000)
      .clickVisible('@calendarInput');
  },

  fromAirport(name) {
    return this.openFromAirportSelector().selectAirport(name);
  },

  toAirport(name) {
    return this.openToAirportSelector().selectAirport(name);
  },

  submit() {
    return this.clickVisible('@continueButton')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    from: '[data-qa="from"]',
    to: '[data-qa="to"]',
    fromAirport: '[data-qa="from"] .clickable-div',
    toAirport: '[data-qa="to"] .clickable-div',
    disabledAirportForOriginal: '[data-qa="from"] .airport-selector--formatted-airport_disabled',
    disabledAirportForDestination: '[data-qa="to"] .airport-selector--formatted-airport_disabled',
    airportList: '.airport-list',
    calendar: '.icon_calender',
    calendarInput: 'div[data-qa="depart-and-return-dates"]',
    showSenior: '.checkbox-button--mark',
    continueButton: 'button[type=submit]',
    sodaIneligiblePopup: '[data-qa="air-change-soda-ineligible"]',
    popupCancelButton: '.active .confirm-button',
    activePopup: '.popup-container.active'
  },

  commands: [airChangeShoppingSearch]
};
