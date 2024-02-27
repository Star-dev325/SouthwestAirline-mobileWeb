import { getResults as resultsSelector } from 'src/airBooking/analytics/resultsSelector';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';

describe('resultsSelector', () => {
  it('should generate flight selections for bound type', () => {
    const flightProduct = new FlightProductBuilder().build();
    const state = {
      app: {
        airBooking: {
          flightShoppingPage: {
            response: {
              flightShoppingPage: {
                outboundPage: { cards: [flightProduct] },
                inboundPage: []
              }
            }
          }
        }
      },
      analytics: {
        AirBookingStore: {
          sortBy: {
            outbound: 'departureTime',
            inbound: 'startingFromAmount'
          }
        }
      }
    };

    const results = resultsSelector(state);

    expect(results).to.deep.equal({
      outbound: {
        sort: 'BY_DEPARTURE_TIME',
        flightProducts: [
          {
            fareProducts: [
              {
                discountedFareValue: '218',
                fareProductName: 'Wanna Get Away'
              },
              {
                discountedFareValue: '499',
                fareProductName: 'Anytime'
              },
              {
                discountedFareValue: '521',
                fareProductName: 'Business Select'
              }
            ],
            numberOfStops: 0
          }
        ]
      },
      inbound: {
        sort: 'BY_PRICE',
        flightProducts: []
      }
    });
  });
});
