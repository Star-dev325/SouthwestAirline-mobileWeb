class BoundDetailBuilder {
  constructor() {
    this.boundType = 'DEPARTING';
    this.departureDate = '2017-11-01';
    this.flights = [
      {
        number: '1504',
        wifiOnBoard: true,
        aircraftInfo: {
          aircraftType: 'Boeing 777'
        }
      }
    ];
    this.departureTime = '06:30';
    this.departureAirport = {
      name: 'Dallas (Love Field)',
      state: 'TX',
      code: 'DAL',
      country: null
    };
    this.arrivalDate = '2017-11-01';
    this.arrivalTime = '09:30';
    this.arrivalAirport = {
      name: 'Atlanta',
      state: 'GA',
      code: 'ATL',
      country: null
    };
    this.passengers = [
      {
        type: 'ADULT',
        count: 1,
        fareType: 'WGA',
        bookingCode: 'W'
      }
    ];
    this.fareProductDetails = {
      fareProductId: 'WGA',
      label: 'Wanna Get Away',
      fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
    };
    this.stops = [];
    this.travelTime = '02:00';
    this.isNextDayArrival = false;
    this.standbyFlight = null;
    this.passengerCount = null;
  }

  withStopsUndefined() {
    this.stops = undefined;

    return this;
  }

  withNoFlightAircraftInfo() {
    this.flights = [{
      number: '1504',
      wifiOnBoard: true
    }];

    return this;
  }

  withStandby() {
    this.standbyFlight = {
      arrivalAirportCode: 'MDW',
      arrivalTime: '06:55',
      departureTime: '06:00',
      flightNumber: '1479',
      hasWifi: true,
      viewStandbyList: {
        href: '/v1/mobile-air-operations/page/standby',
        method: 'GET',
        query: {
          'arrival-time': '06:55',
          'carrier-code': 'WN',
          'departure-date': '2017-11-16',
          'departure-time': '06:00',
          'destination-airport': 'MDW',
          'first-name': 'AMBER',
          'flight-number': '1479',
          'has-wifi': true,
          'last-name': 'AWESOME',
          'origin-airport': 'ATL',
          'record-locator': 'STMXQ6'
        }
      }
    };

    return this;
  }

  withPassengerCountStringInsteadOfArray() {
    this.passengerCount = '1 Passenger';
    this.passengers = null;

    return this;
  }

  withInternationalFlight() {
    this.arrivalAirport = {
      name: 'Cancun',
      state: null,
      code: 'CUN',
      country: 'Mexico'
    };

    return this;
  }

  withInternationalDepartureFlight() {
    this.departureAirport = {
      name: 'Cancun',
      state: null,
      code: 'CUN',
      country: 'Mexico'
    };

    return this;
  }

  build() {
    return {
      boundType: this.boundType,
      departureDate: this.departureDate,
      flights: this.flights,
      departureTime: this.departureTime,
      departureAirport: this.departureAirport,
      arrivalDate: this.arrivalDate,
      arrivalTime: this.arrivalTime,
      arrivalAirport: this.arrivalAirport,
      passengers: this.passengers,
      fareProductDetails: this.fareProductDetails,
      stops: this.stops,
      travelTime: this.travelTime,
      isNextDayArrival: this.isNextDayArrival,
      standbyFlight: this.standbyFlight,
      passengerCount: this.passengerCount
    };
  }
}

export default BoundDetailBuilder;
