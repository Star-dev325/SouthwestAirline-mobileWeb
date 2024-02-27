const FlightProductApiJsonBuilder = require('test/builders/apiResponse/flightProductApiJsonBuilder');

module.exports = function TripApiResponseBuilder() {
  this.trip = {
    travelDate: '2015-06-13',
    airProducts: [new FlightProductApiJsonBuilder().build()],
    originationAirportCode: 'DAL',
    destinationAirportCode: 'ATL'
  };

  this.setAirProducts = function(airProducts) {
    this.trip.airProducts = airProducts;

    return this;
  };

  this.setOrigin = function(originationAirportCode) {
    this.trip.originationAirportCode = originationAirportCode;

    return this;
  };
  this.setDestination = function(destinationAirportCode) {
    this.trip.destinationAirportCode = destinationAirportCode;

    return this;
  };
  this.setDate = function(travelDate) {
    this.trip.travelDate = travelDate;

    return this;
  };

  this.build = function() {
    return this.trip;
  };
};
