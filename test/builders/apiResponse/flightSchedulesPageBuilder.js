'use strict';

const _ = require('lodash');

class FlightSchedulesPageBuilder {
  constructor() {
    this.numberOfFlight = 1;
    this.connectFlight = null;
  }

  withNumberOfFlight(n) {
    this.numberOfFlight = n;

    return this;
  }

  withConnectFlight() {
    this.connectFlight = {
      flightNumbers: [
        '1131',
        '197'
      ],
      departsTime: '06:00',
      arrivesTime: '08:55',
      stopDescription: '1 Stop, Change planes DAL',
      arrivesNextDay: false,
      _links: {
        flightStatusDetail: {
          href: '/v1/mobile-air-operations/page/flight-status/details',
          method: 'GET',
          query: {
            'origin-airport1': 'ATL',
            'destination-airport1': 'DAL',
            'departure-date': '2017-04-24',
            'flight-number1': '1131',
            'origin-airport2': 'DAL',
            'destination-airport2': 'AUS',
            'flight-number2': '197'
          }
        }
      }
    };

    return this;
  }

  withOvernight() {
    this.connectFlight = {
      flightNumbers: [
        '1131'
      ],
      departsTime: '22:00',
      arrivesTime: '02:55',
      stopDescription: '1 Stop, Change planes DAL',
      arrivesNextDay: false,
      isOvernight: true,
      _links: {
        flightStatusDetail: {
          href: '/v1/mobile-air-operations/page/flight-status/details',
          method: 'GET',
          query: {
            "flight-keys": "2017-04-24:ATLDAL1131|2017-04-24:DALAUS197"
          }
        }
      }
    };

    return this;
  }

  build() {
    const noConnectFlightsCount = (this.numberOfFlight >= 1 && this.connectFlight)
      ? this.numberOfFlight - 1 : this.numberOfFlight;

    const flights = _.times(noConnectFlightsCount, () => ({
      flightNumbers: ['1628'],
      arrivesNextDay: false,
      departsTime: '06:00',
      arrivesTime: '17:00',
      stopDescription: '1 Stop, No plane change',
      _links: {
        flightStatusDetail: {
          href: '/v1/mobile-air-operations/page/flight-status/details',
          method: 'GET',
          query: {
            "flight-keys": "2017-02-02:DALHOU1628"
          }
        }
      }
    }));

    if (this.connectFlight) {
      flights.push(this.connectFlight);
    }

    return {
      flightSchedulesPage: {
        header: {
          tripDescription: 'DAL - MDW',
          date: '2013-11-15',
          from: 'Dallas, TX (DAL)',
          to: 'Austin, TX (AUS)'
        },
        flights
      }
    };
  }
}

module.exports = FlightSchedulesPageBuilder;
