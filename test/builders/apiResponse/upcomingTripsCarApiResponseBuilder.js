module.exports = class upcomingTripsCarApiResponseBuilder {
  constructor() {
    this.pickUpDate = '2016-05-18';
  }

  withPickUpDate(pickUpDate) {
    this.pickUpDate = pickUpDate;

    return this;
  }

  build() {
    return {
      pickUpDate: this.pickUpDate,
      confirmationNumber: '1106454688COUNT',
      firstName: 'Helen',
      lastName: 'Wang'
    };
  }
};
