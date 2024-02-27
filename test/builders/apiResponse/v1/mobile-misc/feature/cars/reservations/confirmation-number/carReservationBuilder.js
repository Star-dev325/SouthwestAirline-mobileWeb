const dayjs = require('dayjs');

module.exports = function CarReservationBuilder() {
  this.confirmationNumber = '1005304455COUNT';
  this.driver = { firstName: 'Ron', lastName: 'Zhen' };
  this.vendor = 'Alamo';
  this.vehicleType = 'Mid-size';
  this.pickupDatetime = '2016-11-21T11:30';
  this.returnDatetime = '2016-11-23T11:30';
  this.pickupLocation = 'DAL';
  this.returnLocation = 'DAL';
  this.numberOfDays = 2;
  this.price = {
    dailyRate: { value: '80.65', currencyCode: 'USD' },
    total: { value: '128.00', currencyCode: 'USD' },
    totalWithTaxes: {
      value: '161.30', currencyCode: 'USD'
    }
  };
  this.tax = { value: '33.30', currencyCode: 'USD' };
  this.extras = [];
  this.rentalDeskLocation = 'Rental Counter is located outside of the Airport Terminal. Shuttle is provided.';
  this.cancelled = false;
  this.name = '5DR LIFTBACK OR SIMILAR';
  this.mileage = {
    amount: {
      value: 0.32,
      currencyCode: 'USD'
    },
    freeMileage: '300',
    per: 'Mile'
  };

  this.withUnlimitedMileage = function() {
    this.mileage = {
      amount: {
        value: 'Unlimited',
        currencyCode: 'USD'
      },
      freeMileage: null,
      per: null
    };

    return this;
  };

  this.withConfimationNumber = function(confirmationNumber) {
    this.confirmationNumber = confirmationNumber;

    return this;
  };

  this.withDriverInfo = function(firstName, lastName) {
    this.driver.firstName = firstName;
    this.driver.lastName = lastName;

    return this;
  };

  this.withPickUpDate = function(pickupDate) {
    const pickupDatetime = dayjs(pickupDate, 'YYYY-MM-DD').hour(11).minute(30);

    this.pickupDatetime = pickupDatetime.format('YYYY-MM-DDTHH:mm');
    this.returnDatetime = pickupDatetime.add(this.numberOfDays, 'day').format('YYYY-MM-DDTHH:mm');

    return this;
  };

  this.build = function() {
    return {
      confirmationNumber: this.confirmationNumber,
      driver: this.driver,
      vendor: this.vendor,
      vehicleType: this.vehicleType,
      pickupDatetime: this.pickupDatetime,
      returnDatetime: this.returnDatetime,
      pickupLocation: this.pickupLocation,
      returnLocation: this.returnLocation,
      numberOfDays: this.numberOfDays,
      price: this.price,
      tax: this.tax,
      extras: this.extras,
      rentalDeskLocation: this.rentalDeskLocation,
      cancelled: this.cancelled,
      name: this.name,
      mileage: this.mileage
    };
  };
};
