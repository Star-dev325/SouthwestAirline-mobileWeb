const flightstatus = {
  open() {
    return this.api.url(`${this.api.launchUrl}/flight-status`)
      .waitForElementNotVisible('.dimmer', 10000);
  },

  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },

  fromAirport(name) {
    return this.openFromAirportSelector()
      .selectAirport(name);
  },
  fromAirportUseCurrentLocation() {
    return this.openFromAirportSelector()
      .clickVisible('@currentLocation');
  },
  toAirport(name) {
    return this.openToAirportSelector().selectAirport(name);
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

  withFlightNumber(value) {
    return this.waitForElementPresent('@flightNumber', 10000)
      ._setValue('@flightNumber', value);
  },

  tapSearch() {
    return this.clickVisible('@search')
      .waitForElementNotVisible('.dimmer', 10000);
  },

  tapRecent() {
    return this.clickVisible('@recent');
  },

  tapRecentSearchRecord() {
    return this.clickVisible('@recentRecord');
  }
};

module.exports = {
  elements: {
    fromAirport: '[data-qa="fromAirport"]',
    toAirport: '[data-qa="toAirport"]',
    currentLocation: '.icon_current-location',
    flightNumber: '[data-qa="flightNumber"]',
    search: 'button[type="submit"]',
    recent: '[data-qa="recent-search-button"]',
    statusList: '[data-qa="search flight results page"]',
    airportList: '.airport-list',
    recentRecord: '[data-qa="recent-search-card"]',
    tabForSearch: 'div[data-qa="detached-tab-bar-search"]',
    recentRecordHeader: '.action-bar--main-title',
    recentRecordDate: 'div.meta'
  },

  commands: [flightstatus]
};
