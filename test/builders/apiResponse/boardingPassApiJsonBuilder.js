module.exports = function BoardingPassApiJsonBuilder() {
  let duration = 120;
  let boardingGroup = '';
  let boardingPosition = '';
  let gate = null;
  let flightNumber = '3167';
  let carrierInfoFlightNumber = flightNumber;
  let precheck = true;
  const origin = 'DAL';
  const destination = 'DEN';

  this.documentType = 'BOARDING_PASS';

  this.withSecurityDocument = function() {
    this.documentType = 'SECURITY_DOCUMENT';

    return this;
  };

  this.withBoardingPassAvailable = function() {
    this.documentType = 'BOARDING_PASS';

    return this;
  };

  this.withDuration = function(flightDuration) {
    duration = flightDuration;

    return this;
  };

  this.withBoardingGroup = function(group) {
    boardingGroup = group;

    return this;
  };

  this.withBoardingPosition = function(position) {
    boardingPosition = position;

    return this;
  };

  this.withGate = function(airportGate) {
    gate = airportGate;

    return this;
  };

  this.withFlightNumber = function(flight) {
    flightNumber = flight;

    return this;
  };

  this.withCarrierInfoFlightNumber = (flight) => {
    carrierInfoFlightNumber = flight;

    return this;
  };

  this.withoutPrecheck = function() {
    precheck = false;

    return this;
  };

  this.withPrecheck = function() {
    precheck = true;

    return this;
  };

  this.withOrigin = function(origin) {
    this.origin = origin;

    return this;
  };

  this.withDestination = function(destination) {
    this.destination = destination;

    return this;
  };

  this.build = function() {
    return {
      boardingGroupNumber: boardingPosition,
      boardingGroup,
      documentType: this.documentType,
      departureDateTime: '2015-03-19T06:00:00.000',
      arrivalDateTime: '2015-03-19T09:20:00.000',
      origin,
      destination,
      secureFlightBarCode: 'M1WAYNE/BRUCE EF7KYIN DALDENWN 1628 078K001A0001 125>30B0WW5077BWN 0E 0W0011L^460MEUCIDbGj9cfSuGT9msc3HJH5u/7PQwdyI+UUvEuOZij8qf+AiEAmS3hH5CWRiL8NpjPkijZn9StRDGaTBWdih8L2nGLOR4=',
      fareProductType: 'businessSelect',
      gate,
      flightNumber,
      hasPreCheck: precheck,
      originName: 'Dallas (Love Field)',
      destinationName: 'Denver',
      carrierInfo: {
        carrierCode: 'WN',
        flightNumber: carrierInfoFlightNumber
      },
      drinkCouponBarCode: '01^1628^DAL^19MAR^001^A^F7KYIN^WAYNE/BRUCE^LDNLFLNJX9BR2YVB',
      issued: true,
      nonRevenue: false,
      seat: null,
      durationMinutes: duration
    };
  };
};
