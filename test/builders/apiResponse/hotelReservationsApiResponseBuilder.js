class HotelReservationsApiResponseBuilder {
  constructor() {
    this.confirmationNumber = 'TESTCNF';
  }

  withConfirmationNumber(confirmationNumber) {
    this.confirmationNumber = confirmationNumber;

    return this;
  }

  build() {
    return {
      hotelReservations: [{
        confirmationNumber: this.confirmationNumber,
        checkInDate: '2016-05-30',
        checkOutDate: '2016-05-31',
        guest: { firstName: 'Helen', lastName: 'Wang' },
        hotel: {
          name: 'Love Field Hotel and Suites',
          address: '1241 W Mockingbird Lane, Dallas, TX 75247 US',
          city: 'Dallas',
          state: 'TX',
          zipCode: '75247',
          phone: '(214) 630-7000'
        },
        roomCount: 1,
        priceDetails: { totalCents: 9111, taxesAndFeesCents: 1101, hotelImposedFeesCents: 0 },
        canceled: false
      }]
    };
  }
}

module.exports = HotelReservationsApiResponseBuilder;
