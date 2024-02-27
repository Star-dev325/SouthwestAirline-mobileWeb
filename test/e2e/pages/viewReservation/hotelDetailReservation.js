const hotelDetailReservation = {
  open() {
    return this.api.url(`${this.api.launchUrl}/view-reservation/hotel-details`)
      .waitForElementNotVisible('.dimmer', 10000);
  }
};

module.exports = {
  elements: {
    pageHeader: '.page-header',
    hotelInfo: '.hotel-reservation-details--container--hotel',
    reservationInfo: '.hotel-reservation-details--container--reservation',
    priceInfo: '.hotel-reservation-details--container--price'
  },

  commands: [hotelDetailReservation]
};
