// @flow
import type { stopsType } from 'src/shared/flow-typed/shared.types';

export default class BriefBoundBuilder {
  departureAirportCode: string;
  departureDate: string;
  departureDayOfWeek: string;
  departureTime: string;
  arrivalAirportCode: string;
  arrivalTime: string;
  isOvernightUnderDeparture: boolean;
  stops: Array<stopsType>;

  constructor() {
    this.departureAirportCode = 'LAS';
    this.departureDate = '2017-11-27';
    this.departureDayOfWeek = 'Monday';
    this.departureTime = '23:55';
    this.arrivalAirportCode = 'OAK';
    this.arrivalTime = '01:30';
  }

  withDepartureAirportCode(departureAirportCode: string) {
    this.departureAirportCode = departureAirportCode;

    return this;
  }

  withDepartureDate(departureDate: string) {
    this.departureDate = departureDate;

    return this;
  }

  withDepartureDayOfWeek(departureDayOfWeek: string) {
    this.departureDayOfWeek = departureDayOfWeek;

    return this;
  }

  withDepartureTime(departureTime: string) {
    this.departureTime = departureTime;

    return this;
  }

  withArrivalAirportCode(arrivalAirportCode: string) {
    this.arrivalAirportCode = arrivalAirportCode;

    return this;
  }

  withArrivalTime(arrivalTime: string) {
    this.arrivalTime = arrivalTime;

    return this;
  }

  withOvernightStops() {
    this.stops = [
      {
        arrivalTime: '00:45',
        departureTime: '06:00',
        changePlanes: true,
        airport: {
          name: 'Denver',
          state: 'CO',
          code: 'DEN',
          country: null
        },
        isOvernight: true,
        isNextDayArrival: true
      }
    ];

    return this;
  }

  withOvernightUnderDeparture() {
    this.stops = [
      {
        arrivalTime: '00:45',
        departureTime: '06:00',
        changePlanes: true,
        airport: {
          name: 'Denver',
          state: 'CO',
          code: 'DEN',
          country: null
        },
        isOvernight: true,
        isNextDayArrival: true
      }
    ];
    this.isOvernightUnderDeparture = true;

    return this;
  }
  
  withoutOvernightStops() {
    this.stops = [
      {
        arrivalTime: '00:45',
        departureTime: '06:00',
        changePlanes: true,
        airport: {
          name: 'Denver',
          state: 'CO',
          code: 'DEN',
          country: null
        },
        isOvernight: false,
        isNextDayArrival: true
      }
    ];

    return this;
  }

  build() {
    return {
      departureAirportCode: this.departureAirportCode,
      departureDate: this.departureDate,
      departureDayOfWeek: this.departureDayOfWeek,
      departureTime: this.departureTime,
      arrivalAirportCode: this.arrivalAirportCode,
      arrivalTime: this.arrivalTime,
      stops: this.stops
    };
  }
}
