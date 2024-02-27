import { formatDate } from 'src/shared/helpers/dateHelper';

class AirChangeOriginalFlightInfoBuilder {
  constructor() {
    this.departureDateTime = '2016-02-01';
    this.arrivalDateTime = '2016-03-01';
    this.durationMinutes = 150;
    this.numberOfStops = 1;
    this.connectionAirportCode = 'MDW';
    this.flightNumbers = '1423/652';
  }

  withDepartureDateTime(departureDateTime) {
    this.departureDateTime = departureDateTime;

    return this;
  }

  withArrivalDateTime(arrivalDateTime) {
    this.arrivalDateTime = arrivalDateTime;

    return this;
  }

  withDurationMinutes(durationMinutes) {
    this.durationMinutes = durationMinutes;

    return this;
  }

  withNumberOfStops(numberOfStops) {
    this.numberOfStops = numberOfStops;

    return this;
  }

  withConnectionAirportCode(connectionAirportCode) {
    this.connectionAirportCode = connectionAirportCode;

    return this;
  }

  withFlightNumbers(flightNumbers) {
    this.flightNumbers = flightNumbers;

    return this;
  }

  build() {
    return {
      date: formatDate(this.departureDateTime, 'ddd, ll', true),
      flightInfo: {
        departureDateTime: this.departureDateTime,
        arrivalDateTime: this.arrivalDateTime,
        durationMinutes: this.durationMinutes,
        numberOfStops: this.numberOfStops,
        connectionAirportCode: this.connectionAirportCode,
        flightNumbers: this.flightNumbers
      }
    };
  }
}

module.exports = AirChangeOriginalFlightInfoBuilder;
