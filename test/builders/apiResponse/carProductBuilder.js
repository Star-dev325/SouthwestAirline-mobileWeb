function CarProductBuilder() {
  this.vendor = 'Avis';
  this.vehicleType = 'PREMIUM';
  this.productId = 'MjAxNy0wMS0zMFQwNjozMHxTRUF8MjAxNy0wMi0wMlQyMDozMHxTRUF8UFJFTUlVTXxBVklTfFBDQVJ8TEN8UENBUnwyODAwMHwzOTg4NHwwfDB8VVNE';
  this.price = {
    dailyRate: {
      value: '132.95',
      currencyCode: 'USD'
    },
    total: {
      value: '280.00',
      currencyCode: 'USD'
    },
    totalWithTaxes: {
      value: '398.84',
      currencyCode: 'USD'
    },
    rates: [
      {
        amount: {
          value: '70.00',
          currencyCode: 'USD'
        },
        quantity: 4,
        per: 'DAY'
      }
    ]
  };
  this.additionalCharges = {
    mileage: {
      amount: {
        value: '0',
        currencyCode: 'USD'
      },
      freeMileage: 'Unlimited',
      per: ''
    },
    returnCharge: {
      value: '0',
      currencyCode: 'USD'
    },
    noShowFee: {
      value: '0',
      currencyCode: 'USD'
    }
  };
  this.appliedDiscounts = [];
  this.name = 'Group G - Ford Taurus LTD or similar';

  const vehicles = {
    FULLSIZE: 'Group E - Ford Fusion or similar',
    MIDSIZE: 'Group C - Chevrolet Cruze or similar',
    PREMIUM: 'Group G - Ford Taurus LTD or similar',
    STANDARD_SUV: 'Group W - Ford Edge or similar',
    MID_SIZE_SUV: 'Group F - Ford Escape or similar',
    MINIVAN: 'Group V - Chrysler Town and Country or similar',
    ECONOMY: 'Group A - Ford Fiesta or similar',
    COMPACT: 'Group B - Ford Focus or similar',
    LUXURY: 'Group H - Lincoln MKZ or similar',
    CONVERTIBLE: 'Group K - FORD MUSTANG CON  2DR/4PSGR or similar'
  };

  this.withVendor = function(vendor) {
    this.vendor = vendor;

    return this;
  };

  this.withVehicleType = function(vehicleType) {
    this.vehicleType = vehicleType;
    this.name = vehicles[vehicleType];

    return this;
  };

  this.build = function() {
    return {
      vendor: this.vendor,
      vehicleType: this.vehicleType,
      productId: this.productId,
      price: this.price,
      additionalCharges: this.additionalCharges,
      appliedDiscounts: this.appliedDiscounts,
      name: this.name
    };
  };
}

module.exports = CarProductBuilder;
