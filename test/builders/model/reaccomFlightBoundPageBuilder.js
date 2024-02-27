// @flow
import type { ReaccomFlightBoundPageType } from 'src/airChange/flow-typed/airChange.types';

export default class ReaccomFlightBoundPageBuilder {
  reaccomFlightBoundPage: ReaccomFlightBoundPageType;

  constructor() {
    this.reaccomFlightBoundPage = {
      arrivalAirport: {
        code: 'AUS',
        country: null,
        name: 'Austin',
        state: 'TX'
      },
      boundType: 'DEPARTING',
      cards: [{
        departureTime: '10:40',
        arrivalTime: '11:40',
        duration: '1h 0m',
        flights: [{
          number: '519',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }, {
          number: '1134',
          aircraftInfo: {
            aircraftType: 'Boeing 737-700',
            numberOfSeats: 143,
            wifiSupported: true
          }
        }],
        isNextDayArrival: false,
        limitedSeats: null,
        reasonIfUnavailable: 'AVAILABLE',
        stopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        stops: [],
        _meta: {
          reaccomProductId: 'reaccom-product-id-0',
          cardId: 'DAL:AUS:0:2019-10-03',
          departureTime: '10:40',
          durationMinutes: 60,
          numberOfStops: 0
        }
      }],
      departureAirport: {
        name: 'Dallas (Love Field)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      header: {
        airportInfo: 'DAL - AUS',
        selectedDate: '2019-11-02'
      },
      messages: null,
      passengerCount: '1 Passenger',
      shoppingDates: {
        beginShoppingDate: '2019-11-01',
        endShoppingDate: '2019-11-15'
      }
    };
  }

  build(): ReaccomFlightBoundPageType {
    return { ...this.reaccomFlightBoundPage };
  }
}
