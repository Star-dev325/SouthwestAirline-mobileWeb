module.exports = function RetrieveCarReservationBuilder() {
  this.state = {
    confirmationNumber: '61805258COUNT',
    driver: {
      firstName: 'HX',
      lastName: 'LIN',
      accountNumber: null
    },
    vendor: 'National',
    vehicleType: 'Mid-size',
    pickupDatetime: '2016-05-07T11:30',
    dropoffDatetime: '2016-05-10T11:30',
    pickupLocation: 'ABI',
    dropoffLocation: 'ABI',
    numberOfDays: 3,
    price: {
      dailyRateCents: 5895,
      totalCents: 13242,
      totalCentsWithTaxes: 17685
    },
    taxCents: 4443,
    mileage: 'Unlimited',
    extras: [
      'Mobile Phone',
      'Child Safety Seat Infant',
      'Child Safety Seat Toddler',
      'Navigation'
    ],
    rentalDeskLocation: 'We are unable to provide the rental car location.',
    cancelled: false,
    name: 'COROLLA OR SIMILAR'
  };

  this.withLimitedFreeMileage = function() {
    this.state.mileage = {
      cents: 30,
      freeMileage: '300',
      per: 'Mile'
    };

    return this;
  };

  this.build = function() {
    return this.state;
  };

  return this;
};
