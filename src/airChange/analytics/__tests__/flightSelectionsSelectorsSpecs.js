import _ from 'lodash';
import { getFlightSelections } from 'src/airChange/analytics/flightSelectionsSelectors';

describe('flightSelections', () => {
  context('getFlightSelections', () => {
    const _analytics = {
      'air.fareClassb1': 'R',
      'air.fareProductIdb1': 'WGA',
      'air.fareTypeb1': 'WGA'
    };

    const oneWayTrip = {
      app: {
        airChange: {
          changePricingPage: {
            response: {
              bounds: [
                {
                  boundType: 'DEPARTING',
                  departureDate: '2020-04-06',
                  flights: [
                    {
                      number: '698',
                      wifiOnBoard: true
                    }
                  ],
                  departureTime: '06:15',
                  departureAirport: {
                    name: 'Amarillo',
                    state: 'TX',
                    code: 'AMA',
                    country: null
                  },
                  arrivalTime: '07:25',
                  arrivalAirport: {
                    name: 'Dallas (Love Field)',
                    state: 'TX',
                    code: 'DAL',
                    country: null
                  },
                  passengers: [
                    {
                      type: 'Passenger',
                      count: 1,
                      fareType: 'Business Select',
                      bookingCode: 'K'
                    }
                  ],
                  stops: [],
                  isNextDayArrival: false,
                  travelTime: '1h 10m',
                  upsellAmount: null,
                  _links: null
                }
              ]
            }
          }
        }
      }
    };

    it('should generate selections for round trip', () => {
      const state = {
        app: {
          airChange: {
            changePricingPage: {
              response: {
                bounds: [
                  {
                    boundType: 'DEPARTING',
                    departureDate: '2020-04-08',
                    flights: [
                      {
                        number: '3426',
                        wifiOnBoard: true
                      },
                      {
                        number: '8',
                        wifiOnBoard: true
                      }
                    ],
                    departureTime: '06:05',
                    departureAirport: {
                      name: 'Atlanta',
                      state: 'GA',
                      code: 'ATL',
                      country: null
                    },
                    arrivalTime: '09:05',
                    arrivalAirport: {
                      name: 'Dallas (Love Field)',
                      state: 'TX',
                      code: 'DAL',
                      country: null
                    },
                    passengers: [
                      {
                        type: 'Passenger',
                        count: 1,
                        fareType: 'Business Select',
                        bookingCode: 'K'
                      }
                    ],
                    stops: [
                      {
                        arrivalTime: '07:20',
                        departureTime: '08:00',
                        changePlanes: true,
                        airport: {
                          name: 'Houston (Hobby)',
                          state: 'TX',
                          code: 'HOU',
                          country: null
                        }
                      }
                    ],
                    isNextDayArrival: false,
                    travelTime: '4h 0m',
                    upsellAmount: null,
                    _links: null
                  },
                  {
                    boundType: 'RETURNING',
                    departureDate: '2020-04-09',
                    flights: [
                      {
                        number: '598',
                        wifiOnBoard: true
                      }
                    ],
                    departureTime: '06:00',
                    departureAirport: {
                      name: 'Dallas (Love Field)',
                      state: 'TX',
                      code: 'DAL',
                      country: null
                    },
                    arrivalTime: '08:55',
                    arrivalAirport: {
                      name: 'Atlanta',
                      state: 'GA',
                      code: 'ATL',
                      country: null
                    },
                    passengers: [
                      {
                        type: 'Passenger',
                        count: 1,
                        fareType: 'Business Select',
                        bookingCode: 'K'
                      }
                    ],
                    stops: [],
                    isNextDayArrival: false,
                    travelTime: '1h 55m',
                    upsellAmount: null,
                    _links: null
                  }
                ]
              }
            }
          }
        }
      };

      expect(getFlightSelections(state)).to.deep.equal({
        adult: {
          inbound: {
            selectedFareProduct: {
              fareClass: 'K'
            }
          },
          outbound: {
            selectedFareProduct: {
              fareClass: 'K'
            }
          }
        }
      });
    });

    it('should generate selections for one way', () => {
      const state = oneWayTrip;

      expect(getFlightSelections(state)).to.deep.equal({
        adult: {
          outbound: {
            selectedFareProduct: {
              fareClass: 'K'
            }
          }
        }
      });
    });

    it('should ignore the presence of fields that are not passenger or adult', () => {
      const state = {
        app: {
          airChange: {
            changePricingPage: {
              response: {
                bounds: [
                  {
                    boundType: 'DEPARTING',
                    departureDate: '2020-04-08',
                    flights: [
                      {
                        number: '3426',
                        wifiOnBoard: true
                      },
                      {
                        number: '8',
                        wifiOnBoard: true
                      }
                    ],
                    departureTime: '06:05',
                    departureAirport: {
                      name: 'Atlanta',
                      state: 'GA',
                      code: 'ATL',
                      country: null
                    },
                    arrivalTime: '09:05',
                    arrivalAirport: {
                      name: 'Dallas (Love Field)',
                      state: 'TX',
                      code: 'DAL',
                      country: null
                    },
                    passengers: [
                      {
                        type: 'Adult',
                        count: 1,
                        fareType: 'Business Select',
                        bookingCode: 'K'
                      },
                      {
                        type: 'Robots',
                        count: 1,
                        fareType: 'Business Select',
                        bookingCode: 'K'
                      }
                    ],
                    stops: [
                      {
                        arrivalTime: '07:20',
                        departureTime: '08:00',
                        changePlanes: true,
                        airport: {
                          name: 'Houston (Hobby)',
                          state: 'TX',
                          code: 'HOU',
                          country: null
                        }
                      }
                    ],
                    isNextDayArrival: false,
                    travelTime: '4h 0m',
                    upsellAmount: null,
                    _links: null
                  },
                  {
                    boundType: 'RETURNING',
                    departureDate: '2020-04-09',
                    flights: [
                      {
                        number: '598',
                        wifiOnBoard: true
                      }
                    ],
                    departureTime: '06:00',
                    departureAirport: {
                      name: 'Dallas (Love Field)',
                      state: 'TX',
                      code: 'DAL',
                      country: null
                    },
                    arrivalTime: '08:55',
                    arrivalAirport: {
                      name: 'Atlanta',
                      state: 'GA',
                      code: 'ATL',
                      country: null
                    },
                    passengers: [
                      {
                        type: 'Adult',
                        count: 1,
                        fareType: 'Business Select',
                        bookingCode: 'K'
                      },
                      {
                        type: 'Robots',
                        count: 1,
                        fareType: 'Business Select',
                        bookingCode: 'K'
                      }
                    ],
                    stops: [],
                    isNextDayArrival: false,
                    travelTime: '1h 55m',
                    upsellAmount: null,
                    _links: null
                  }
                ]
              }
            }
          }
        }
      };

      expect(getFlightSelections(state)).to.deep.equal({
        adult: {
          inbound: {
            selectedFareProduct: {
              fareClass: 'K'
            }
          },
          outbound: {
            selectedFareProduct: {
              fareClass: 'K'
            }
          }
        }
      });
    });

    it('should include `_analytics` data if available', () => {
      const state = _.merge({}, oneWayTrip, {
        app: {
          airChange: {
            changePricingPage: {
              response: {
                _analytics
              }
            }
          }
        }
      });

      expect(getFlightSelections(state)).to.deep.equal({
        adult: {
          outbound: {
            selectedFareProduct: {
              fareClass: 'K'
            }
          }
        },
        'air.fareClassb1': 'R',
        'air.fareProductIdb1': 'WGA',
        'air.fareTypeb1': 'WGA'
      });
    });

    it('should not include `_analytics` data if `_analytics` is not defined', () => {
      const state = oneWayTrip;

      expect(getFlightSelections(state)).to.deep.equal({
        adult: {
          outbound: {
            selectedFareProduct: {
              fareClass: 'K'
            }
          }
        }
      });
    });
  });
});
