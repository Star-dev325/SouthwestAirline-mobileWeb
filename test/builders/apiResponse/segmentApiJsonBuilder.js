module.exports = function SegmentApiJsonBuilder() {
  this.operatingFlightNumber = '3167';
  this.marketingFlightNumber = '3167';
  this.departureDateTime = '2015-05-13T06:20';
  this.arrivalDateTime = '2015-06-13T08:00';
  this.numberOfStops = 0;
  this.stopAirportCodes = [];
  this.originationAirportCode = 'DAL';
  this.destinationAirportCode = 'MDW';
  this.wifiAvailable = true;
  this.segmentId = undefined;
  this.legs = [{
    destinationAirportCode: 'MDW',
    originationAirportCode: 'DAL'
  }];
  this.flightStatus = undefined;

  this.setOperatingFlightNumber = function(operatingFlightNumber) {
    this.operatingFlightNumber = operatingFlightNumber;

    return this;
  };

  this.setMarketingFlightNumber = function(marketingFlightNumber) {
    this.marketingFlightNumber = marketingFlightNumber;

    return this;
  };

  this.setDepartureDateTime = function(departureDateTime) {
    this.departureDateTime = departureDateTime;

    return this;
  };

  this.setArrivalDateTime = function(arrivalDateTime) {
    this.arrivalDateTime = arrivalDateTime;

    return this;
  };

  this.setWifiAvailable = function(wifiAvailable) {
    this.wifiAvailable = wifiAvailable;

    return this;
  };

  this.setNumberOfStops = function(numberOfStops) {
    this.numberOfStops = numberOfStops;

    return this;
  };

  this.setStopAirportCodes = function(stopAirportCodes) {
    this.stopAirportCodes = stopAirportCodes;

    return this;
  };

  this.setOriginationAirport = function(airportCode) {
    this.originationAirportCode = airportCode;

    return this;
  };

  this.setDestinationAirportCode = function(airportCode) {
    this.destinationAirportCode = airportCode;

    return this;
  };

  this.setSegmentId = function(segmentId) {
    this.segmentId = segmentId;

    return this;
  };

  this.setLegs = function(legs) {
    this.legs = legs;

    return this;
  };

  this.setFlightStatus = function(flightStatus) {
    this.flightStatus = flightStatus;

    return this;
  };

  this.build = function() {
    return {
      segmentId: this.segmentId,
      originationAirportCode: this.originationAirportCode,
      destinationAirportCode: this.destinationAirportCode,
      marketingCarrierInfo: {
        carrierCode: 'WN',
        flightNumber: this.marketingFlightNumber
      },
      operatingCarrierInfo: {
        carrierCode: 'WN',
        flightNumber: this.operatingFlightNumber
      },
      legs: this.legs,
      departureDateTime: this.departureDateTime,
      arrivalDateTime: this.arrivalDateTime,
      numberOfStops: this.numberOfStops,
      stopAirportCodes: this.stopAirportCodes,
      wifiAvailable: this.wifiAvailable,
      flightStatus: this.flightStatus
    };
  };
};
