import _ from 'lodash';
import { getFlightSelections as flightSelectionsSelector } from 'src/airBooking/analytics/flightSelectionsSelector';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';
import FareProductBuilder from 'test/builders/model/fareProductForChapiBuilder';

describe('flight selection selector', () => {
  let fareProductId;
  let state;

  beforeEach(() => {
    fareProductId =
      'eyJwcm9kdWN0SWQiOiJXR0F8QURUfFFMTjBXTlIsUSxBVEwsQVVTLDIwMTctMTItMTNUMTM6MDAtMDU6MDAsMjAxNy0xMi0xM1QxNDozMC0wNjowMCxXTixXTiwxODg3LDczVyIsInF1b3RlZFByaWNlIjoiMjMzLjA4In0=';
    state = {
      app: {
        airBooking: {
          selectedProducts: {
            adult: {
              outbound: {
                fareProductId,
                flightCardIndex: 0
              }
            }
          },
          flightShoppingPage: {
            pages: [
              {
                direction: 'outbound',
                paxType: 'adult',
                header: {
                  selectedDate: '20180404'
                },
                cards: [
                  new FlightProductBuilder()
                    .addFareProduct(new FareProductBuilder().withProductId(fareProductId).build())
                    .addFareProduct(
                      new FareProductBuilder()
                        .withDiscountedPrice({
                          amount: '300.00',
                          currencyCode: 'USD',
                          currencySymbol: '$'
                        })
                        .build()
                    )
                    .build()
                ]
              }
            ]
          }
        }
      }
    };
  });

  it('should generate flight selections for bound type', () => {
    const flightSelections = flightSelectionsSelector(state);

    expect(flightSelections).to.deep.equal({
      adult: {
        outbound: {
          selectedFareProduct: {
            fareProductName: 'Wanna Get Away'
          },
          selectedFlightProduct: {
            departureDateTime: '20180404T19:35',
            fareProducts: [
              {
                discountedFareValue: '218',
                fareProductName: 'Wanna Get Away',
                fareValue: '218'
              },
              {
                discountedFareValue: '499',
                fareProductName: 'Anytime',
                fareValue: '499'
              },
              {
                discountedFareValue: '521',
                fareProductName: 'Business Select',
                fareValue: '521'
              },
              {
                discountedFareValue: '428.98',
                fareProductName: 'Wanna Get Away',
                fareValue: '428.98'
              },
              {
                discountedFareValue: '300.00',
                fareProductName: 'Wanna Get Away',
                fareValue: '428.98'
              }
            ]
          }
        }
      }
    });
  });

  it('should return fareValue UNAVAILABLE for fare product without price when product group has a selected fare', () => {
    const cards = [new FlightProductBuilder().withUnavailableFareInProductGroup(fareProductId).build()];

    _.set(state, 'app.airBooking.flightShoppingPage.pages[0].cards', cards);
    const flightSelections = flightSelectionsSelector(state);

    expect(flightSelections).to.deep.equal({
      adult: {
        outbound: {
          selectedFareProduct: {
            fareProductName: 'Wanna Get Away'
          },
          selectedFlightProduct: {
            departureDateTime: '20180404T19:35',
            fareProducts: [
              {
                discountedFareValue: '218',
                fareProductName: 'Wanna Get Away',
                fareValue: '218'
              },
              {
                discountedFareValue: undefined,
                fareProductName: 'Anytime',
                fareValue: 'UNAVAILABLE'
              },
              {
                discountedFareValue: '521',
                fareProductName: 'Business Select',
                fareValue: '521'
              }
            ]
          }
        }
      }
    });
  });

  it('should include `_analytics` data', () => {
    const _analytics = {
      'air.fareClassb1': 'V',
      'air.fareProductIdb1': 'WGA',
      'air.fareTypeb1': 'WGA'
    };

    _.set(state, 'app.airBooking.flightPricingPage.response.flightPricingPage._analytics', _analytics);

    const flightSelections = flightSelectionsSelector(state);

    expect(flightSelections).to.deep.equal({
      adult: {
        outbound: {
          selectedFareProduct: {
            fareProductName: 'Wanna Get Away'
          },
          selectedFlightProduct: {
            departureDateTime: '20180404T19:35',
            fareProducts: [
              {
                discountedFareValue: '218',
                fareProductName: 'Wanna Get Away',
                fareValue: '218'
              },
              {
                discountedFareValue: '499',
                fareProductName: 'Anytime',
                fareValue: '499'
              },
              {
                discountedFareValue: '521',
                fareProductName: 'Business Select',
                fareValue: '521'
              },
              {
                discountedFareValue: '428.98',
                fareProductName: 'Wanna Get Away',
                fareValue: '428.98'
              },
              {
                discountedFareValue: '300.00',
                fareProductName: 'Wanna Get Away',
                fareValue: '428.98'
              }
            ]
          }
        }
      },
      ..._analytics
    });
  });
});
