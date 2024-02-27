const hotelListReservations = {
  open() {
    return this.api.url(`${this.api.launchUrl}/view-reservation/hotel-reservations`)
      .waitForElementNotVisible('.dimmer', 10000);
  },
  clickFirstTripCard() {
    return this.clickVisible('@firstTripCard')
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    pageHeader: '.page-header',
    firstTripCard: '.trip-card:nth-child(1)',
    lastTripCard: '.trip-card:nth-of-type(2)'
  },

  commands: [hotelListReservations]
};
