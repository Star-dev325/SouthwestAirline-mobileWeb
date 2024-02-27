module.exports = {
  flightConfirmationPage: {
    dates: {
      first: '2018-03-18',
      second: null
    },
    destinationDescription: 'Austin',
    failedPassengers: null,
    failedEarlyBird: {
      recordLocator: 'N9GBP5',
      firstName: 'Jab',
      lastName: 'Met'
    },
    pnrs: [
      {
        passengers: [
          {
            displayName: 'Jab Met',
            accountNumber: '601147396'
          }
        ],
        recordLocator: 'N9GBP5'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-03-18',
        flights: [
          {
            number: '3249',
            wifiOnBoard: true
          },
          {
            number: '4760',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:35',
        departureAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        arrivalTime: '12:05',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengers: [
          {
            type: 'Adult',
            count: 1,
            fareType: 'Anytime'
          }
        ],
        stops: [
          {
            airport: {
              name: 'Chicago (Midway)',
              state: 'IL',
              code: 'MDW',
              country: null
            },
            arrivalTime: '08:00',
            departureTime: '09:20',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 30m'
      }
    ],
    billingInfo: {
      cardType: 'MASTERCARD',
      lastFourDigits: '5454',
      cardHolderName: 'test test',
      amountApplied: {
        amount: '566.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '677676',
        streetTwo: null,
        location: 'Dallas, TX US 75070'
      }
    },
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '566.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '505.84',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'US',
            description: 'Excise Taxes',
            fee: {
              amount: '37.94',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: {
              amount: '5.60',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'ZP',
            description: 'Segment Fee',
            fee: {
              amount: '8.40',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'XF',
            description: 'Passenger Facility Charge',
            fee: {
              amount: '9.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: {
            amount: '566.78',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '566.78',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        },
        earlyBirdPriceDetails: null,
        _meta: {
          discountedFare: false
        }
      },
      seniorFare: null,
      _meta: {
        purchaseWithPoints: false,
        partialSuccess: false,
        analytics: null
      }
    },
    _links: {
      carBooking: {
        href: '/v1/mobile-misc/feature/cars/products',
        method: 'GET',
        query: {
          'pickup-location': 'AUS',
          'return-location': 'AUS',
          'pickup-datetime': '2018-03-18T13:00',
          'return-datetime': '2018-03-21T13:00'
        }
      }
    }
  }
};
