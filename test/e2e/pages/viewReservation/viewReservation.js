const viewReservation = {
  _setValue(key, value) {
    return this.waitForElementVisible(key, 10000)
      .setValue(key, value);
  },
  open() {
    return this.api.url(`${this.api.launchUrl}/view-reservation`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  withConfirmationNumber(name) {
    return this._setValue('@confirmationNumber', name);
  },
  withFirstName(name) {
    return this._setValue('@firstName', name);
  },
  withLastName(name) {
    return this._setValue('@lastName', name);
  },
  tapFlightTab() {
    return this.clickVisible('@flightTab')
      .waitForElementNotVisible('.dimmer', 10000);
  },
  continue() {
    return this.clickVisible('@retrieveReservation')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    confirmationNumber: 'input[name="recordLocator"]',
    firstName: 'input[name=firstName]',
    lastName: 'input[name=lastName]',
    retrieveReservation: '.button[role=submit]',
    viewUpcomingTripsLink: '.upcoming-trips-link',
    recentTripSearchList: '.recent-trip-search-cards-list',
    recentTripSearchPassengerName: '.recent-trip-search-card--content-passenger-name',
    recentTripSearchConfirmationNumber: '.recent-trip-search-card--content-confirmation',
    flightTab: '[data-qa=detached-tab-bar-flight]'
  },

  commands: [viewReservation]
};
