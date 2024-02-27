module.exports = class upcomingTripsHotelApiResponseBuilder {
  constructor() {
    this.checkInDate = '2016-05-18';
  }

  withCheckInDate(checkInDate) {
    this.checkInDate = checkInDate;

    return this;
  }

  build() {
    return {
      checkInDate: this.checkInDate,
      checkOutDate: '2016-05-20',
      confirmationNumber: 'TESTCNF',
      firstName: 'Helen',
      hotelName: 'Ramada Plaza Atlanta Downtown Capitol Park',
      lastName: 'Wang'
    };
  }
};
