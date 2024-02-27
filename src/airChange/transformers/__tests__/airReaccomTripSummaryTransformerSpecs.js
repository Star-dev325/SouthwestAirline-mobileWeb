import { transformToFlightSummary } from 'src/airChange/transformers/airReaccomTripSummaryTransformer';
import ReaccomFlightBoundPageBuilder from 'test/builders/model/reaccomFlightBoundPageBuilder';
import ReaccomFlightProductBuilder from 'test/builders/model/reaccomFlightProductBuilder';

describe('airReaccomTripSummaryTransformer', () => {
  const reaccomFlightBoundPage = new ReaccomFlightBoundPageBuilder().build();
  const reaccomFlightCard = new ReaccomFlightProductBuilder().build();
  let expectedData;

  beforeEach(() => {
    expectedData = {
      boundType: 'DEPARTING',
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
      travelTime: '1h 0m',
      departureDate: '2019-11-02',
      departureTime: '10:40',
      departureAirport: {
        name: 'Dallas (Love Field)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      arrivalTime: '11:40',
      arrivalAirport: {
        code: 'AUS',
        country: null,
        name: 'Austin',
        state: 'TX'
      },
      stops: [],
      isNextDayArrival: false,
      passengerCount: '1 Passenger'
    };
  });
  it('should transform data correctly', () => {
    const transformedData = transformToFlightSummary(reaccomFlightBoundPage, reaccomFlightCard);

    expect(transformedData).to.deep.equal(expectedData);
  });
});
