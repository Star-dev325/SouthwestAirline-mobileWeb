function FlightStatusBuilder() {
  this.arrivalStatus = 'ON TIME';
  this.departureStatus = 'ON TIME';
  this.gate = 'A51';
  this.isCancelled = false;
  this.isNowBoarding = false;
  FlightStatusBuilder.DELAYED = 'DELAYED';
  FlightStatusBuilder.EARLY = 'EARLY';
  FlightStatusBuilder.DEPARTED = 'DEPARTED';
  FlightStatusBuilder.ARRIVED = 'ARRIVED';
  FlightStatusBuilder.BOARDING = 'BOARDING';
  FlightStatusBuilder.CANCELLED = 'CANCELLED';

  this.withCancelledStatus = function() {
    this.arrivalStatus = 'CANCELLED';
    this.departureStatus = 'CANCELLED';
    this.isCancelled = true;

    return this;
  };

  this.withNowBoarding = function() {
    this.isNowBoarding = true;
    this.departureStatus = 'BOARDING';

    return this;
  };

  this.withArrivalStatus = function(arrivalStatus) {
    this.arrivalStatus = arrivalStatus;

    return this;
  };

  this.withDepartureStatus = function(departureStatus) {
    this.departureStatus = departureStatus;

    return this;
  };

  this.withGate = function(gate) {
    this.gate = gate;

    return this;
  };

  this.build = function() {
    return {
      actualDepartureTime: '19:00',
      actualArrivalTime: '20:10',
      arrivalStatus: this.arrivalStatus,
      arrivalStatusType: this.arrivalStatus,
      departureStatus: this.departureStatus,
      departureStatusType: this.departureStatus,
      gate: this.gate,
      isCancelled: this.isCancelled,
      isNowBoarding: this.isNowBoarding
    };
  };
}

module.exports = FlightStatusBuilder;
