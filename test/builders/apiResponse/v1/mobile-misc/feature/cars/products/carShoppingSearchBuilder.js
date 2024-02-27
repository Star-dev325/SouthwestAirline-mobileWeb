const CarProductBuilder = require('test/builders/apiResponse/carProductBuilder');

function CarShoppingSearchBuilder() {
  this.carProducts = [
    new CarProductBuilder().withVendor('Avis').withVehicleType('MIDSIZE').build(),
    new CarProductBuilder().withVendor('Avis').withVehicleType('FULLSIZE').build(),
    new CarProductBuilder().withVendor('Avis').withVehicleType('ECONOMY').build(),
    new CarProductBuilder().withVendor('Budget').withVehicleType('ECONOMY').build(),
    new CarProductBuilder().withVendor('Budget').withVehicleType('MINIVAN').build(),
    new CarProductBuilder().withVendor('Budget').withVehicleType('MIDSIZE').build(),
    new CarProductBuilder().withVendor('Dollar').withVehicleType('COMPACT').build(),
    new CarProductBuilder().withVendor('Payless').withVehicleType('MIDSIZE').build(),
    new CarProductBuilder().withVendor('Alamo').withVehicleType('MIDSIZE').build(),
    new CarProductBuilder().withVendor('Advantage').withVehicleType('MIDSIZE').build()
  ];
  this.warnings = [
    {
      vendorId: 'AD',
      message: 'Problem accessing the vendor'
    },
    {
      vendorId: 'ZA',
      message: 'Problem accessing the vendor'
    }
  ];
  this.promoCodes = undefined;

  this.withCarProducts = function(carProducts) {
    this.carProducts = carProducts;

    return this;
  };

  this.withPromoCodes = function(promoCodes) {
    this.promoCodes = promoCodes;

    return this;
  };

  this.build = function() {
    return {
      carProducts: this.carProducts,
      promoCodes: this.promoCodes,
      warnings: this.warnings
    };
  };
}

module.exports = CarShoppingSearchBuilder;
