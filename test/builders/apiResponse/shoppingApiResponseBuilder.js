const FlightProductApiJsonBuilder = require('test/builders/apiResponse/flightProductApiJsonBuilder');
const TripApiResponseBuilder = require('test/builders/apiResponse/tripApiResponseBuilder');

export default function ShoppingApiResponseBuilder() {
  this.airProducts = [new FlightProductApiJsonBuilder().build()];
  this.promoCodeApplied = false;
  this.trips = [new TripApiResponseBuilder().setAirProducts(this.airProducts).build()];

  this.setTrips = function(trips) {
    this.trips = trips;

    return this;
  };

  this.withPromoCodeApplied = function() {
    this.promoCodeApplied = true;

    return this;
  };

  this.withoutPromoCodeApplied = function() {
    this.promoCodeApplied = false;

    return this;
  };

  this.build = function() {
    return {
      trips: this.trips,
      discountApplied: false,
      promoCodeApplied: this.promoCodeApplied,
      promoCode: '',
      warnings: []
    };
  };
}
