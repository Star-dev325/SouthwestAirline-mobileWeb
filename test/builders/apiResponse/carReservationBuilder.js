const _ = require('lodash');

class CarReservationBuilder {
  constructor() {
    this.reservation = {
      confirmationNumber: '08172185US0',
      driver: {
        firstName: 'Cannon',
        lastName: 'Biggs'
      },
      appliedDiscounts: [],
      vendor: 'Avis',
      vehicleType: 'Mid-size',
      pickupDatetime: '2017-09-16T11:30',
      returnDatetime: '2017-09-19T11:30',
      pickupLocation: 'DAL',
      returnLocation: 'DAL',
      numberOfDays: 3,
      price: {
        dailyRate: {
          value: '73.00',
          currencyCode: 'USD'
        },
        total: {
          value: '219.00',
          currencyCode: 'USD'
        },
        totalWithTaxes: {
          value: '277.09',
          currencyCode: 'USD'
        }
      },
      tax: {
        value: '0.00',
        currencyCode: 'USD'
      },
      extras: [],
      rentalDeskLocation: 'Rental Counter is at the terminal. Shuttle is provided to pick up your car.',
      cancelled: false,
      name: 'Group C - Chevrolet Cruze or s',
      mileage: {
        amount: {
          value: 'Unlimited',
          currencyCode: 'USD'
        },
        freeMileage: null,
        per: null
      }
    };
  }

  withConfirmationNumber(confirmationNumber) {
    this.confirmationNumber = confirmationNumber;

    return this;
  }

  withCancelled(cancelled) {
    this.cancelled = cancelled;

    return this;
  }

  withExtras(extras) {
    this.extras = extras;

    return this;
  }

  build() {
    return _.merge({}, this.reservation, {
      confirmationNumber: this.confirmationNumber,
      cancelled: this.cancelled,
      extras: this.extras
    });
  }
}

module.exports = CarReservationBuilder;
