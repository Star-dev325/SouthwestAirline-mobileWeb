module.exports = {
  flightConfirmationPage: {
    dates: {
      first: '2018-03-23',
      second: null
    },
    destinationDescription: 'Austin',
    failedPassengers: null,
    failedEarlyBird: {
      recordLocator: 'NAAHHN',
      firstName: 'FailEB',
      lastName: 'Tangrila'
    },
    pnrs: [
      {
        passengers: [
          {
            displayName: 'FailEB Tangrila',
            accountNumber: null
          }
        ],
        recordLocator: 'NAAHHN'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-03-23',
        flights: [
          {
            number: '138',
            wifiOnBoard: true
          },
          {
            number: '2025',
            wifiOnBoard: true
          }
        ],
        departureTime: '05:50',
        departureAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        arrivalTime: '11:35',
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
            arrivalTime: '07:10',
            departureTime: '08:50',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 45m'
      }
    ],
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: {
        amount: '581.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '206 Main St',
        streetTwo: null,
        location: 'Brooklyn, NY US 57894'
      }
    },
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '581.78',
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
            amount: '551.78',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '551.78',
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
          'pickup-datetime': '2018-03-23T12:30',
          'return-datetime': '2018-03-26T12:30'
        }
      }
    }
  }
};
