const page = {
  tapNexUpcomingTrip() {
    return this.clickVisible('@nextUpcomingTrip');
  },
  tapTripsNumber() {
    this.waitForElementNotVisible('.dimmer', 10000);

    return this.clickVisible('@tripsNumber');
  },
  waitUpcomingTripsDisplay() {
    return this.waitForElementVisibleWithDefaultTimeout('@tripsNumber');
  },
  waitUpNextdisplay() {
    return this.waitForElementVisibleWithDefaultTimeout('@nextUpTripTitle');
  }
};

module.exports = {
  elements: {
    nextUpcomingTrip: '.my-trips-panel--next-trip-title',
    tripsNumber: '.my-trips-panel--upcoming-trip-count',
    nextUpTripTitle: '.my-trips-panel--next-trip-title',
    logoutLink: 'div#header .login-btn',
    pageHeader: '.page-header',
    userName: 'span[data-qa="user-name"]',
    accountNumber: 'span[data-qa="rapid-rewards-number"]',
    ptsGroup: '.points-group',
    exclusivePromoAvailNum: 'div.vertical-fill > div > b',
    pastFlightsLink: '.my-trips-panel--past-and-saved-links .item:nth-child(1)',
    savedFlightsLink: '.my-trips-panel--past-and-saved-links .item:nth-child(2)'
  },

  commands: [page]
};
