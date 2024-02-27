// @flow
import type { ReaccomBoundPageCardType } from 'src/airChange/flow-typed/airChange.types';

export default class ReaccomFlightProductBuilder {
  reaccomFlightProduct: ReaccomBoundPageCardType;

  constructor() {
    this.reaccomFlightProduct = {
      departureTime: '10:40',
      arrivalTime: '11:40',
      duration: '1h 0m',
      stopDescription: '1 Stop',
      stopDescriptionOnSelect: '1 Stop',
      shortStopDescription: '1 Stop',
      stopCity: 'DAL',
      reasonIfUnavailable: 'TOO_CLOSE_TO_DEPARTURE_DOMESTIC',
      limitedSeats: null,
      flights: [
        {
          number: '519',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        },
        {
          number: '1134',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }
      ],
      stops: [],
      _meta: {
        reaccomProductId: 'reaccom-product-id-0',
        cardId: 'AUS:DAL:0:2019-10-03',
        durationMinutes: 60,
        numberOfStops: 0,
        departureTime: '10:40'
      },
      isNextDayArrival: false
    };
  }

  withNonStop() {
    this.reaccomFlightProduct = {
      departureTime: '10:40',
      arrivalTime: '11:40',
      duration: '1h 0m',
      stopDescription: 'Nonstop',
      stopDescriptionOnSelect: 'Nonstop',
      shortStopDescription: 'Nontop',
      stopCity: null,
      reasonIfUnavailable: 'TOO_CLOSE_TO_DEPARTURE_DOMESTIC',
      limitedSeats: null,
      flights: [
        {
          number: '462',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }
      ],
      stops: [],
      _meta: {
        reaccomProductId: 'reaccom-product-id-2',
        cardId: 'AUS:DAL:0:2019-10-03',
        durationMinutes: 60,
        numberOfStops: 0,
        departureTime: '10:40'
      },
      isNextDayArrival: false
    };

    return this;
  }

  withNextDay() {
    this.reaccomFlightProduct.isNextDayArrival = true;

    return this;
  }

  withOvernight() {
    this.reaccomFlightProduct.isOvernight = true;

    return this;
  }

  build(): ReaccomBoundPageCardType {
    return { ...this.reaccomFlightProduct };
  }
}
