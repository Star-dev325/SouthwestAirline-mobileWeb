module.exports = {
  flightConfirmationPage: {
    dates: {
      first: '2019-09-10',
      second: null
    },
    destinationDescription: 'Las Vegas',
    failedPassengers: null,
    failedEarlyBird: null,
    pnrs: [
      {
        passengers: [
          {
            displayName: 'Ben Lacy',
            accountNumber: '601592810',
            specialAssistanceMessage: null
          }
        ],
        recordLocator: 'LJVJ4A'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-09-10',
        flights: [
          {
            number: '503',
            wifiOnBoard: true
          },
          {
            number: '2133',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:05',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '09:20',
        arrivalAirport: {
          name: 'Las Vegas',
          state: 'NV',
          code: 'LAS',
          country: null
        },
        passengers: [
          {
            type: 'Adult',
            count: 1,
            fareType: 'Wanna Get Away',
            bookingCode: null
          }
        ],
        stops: [
          {
            arrivalTime: '07:00',
            departureTime: '08:15',
            changePlanes: true,
            airport: {
              name: 'Denver',
              state: 'CO',
              code: 'DEN',
              country: null
            }
          }
        ],
        isNextDayArrival: false,
        travelTime: '5h 15m'
      }
    ],
    billingInfo: null,
    fundsApplied: [
      {
        travelFundType: 'TRAVEL_FUNDS',
        expirationDate: '2020-08-27',
        appliedAmount: {
          amount: '83.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Ben Lacy',
        fundIdentifier: 'JO3GHK'
      }
    ],
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '83.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '55.81',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'US',
            description: 'U.S. Transportation Tax',
            fee: {
              amount: '4.19',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: {
              amount: '5.60',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: {
              amount: '8.40',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
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
            amount: '83.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '83.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        },
        earlyBirdPrice: null,
        earlyBirdPriceDetails: null,
        _meta: {
          discountedFare: false,
          recordLocator: 'LJVJ4A',
          failedEarlyBird: false
        }
      },
      seniorFare: null,
      _meta: {
        purchaseWithPoints: false,
        partialSuccess: false,
        analytics: null
      }
    },
    shareDetails: {
      subject: 'Southwest Flight 503 Dallas (Love Field) to Las Vegas',
      confirmationInfo: 'Confirmation #: LJVJ4A',
      passengerInfo: 'Passenger names: Ben Lacy',
      flightInfo: [
        {
          header: 'Departing Flight: Tue, Sep 10, 2019',
          title: 'Southwest Flight 503/2133 Dallas (Love Field) to Las Vegas',
          flightInfo: 'Flight #: 503/2133',
          departureInfo: 'Departs: 06:05 AM DAL',
          departureDateTime: '2019-09-10T06:05:00.000-05:00',
          stops: ['Stop: Denver, CO. Change planes'],
          arrivalInfo: 'Arrives: 09:20 AM LAS',
          arrivalDateTime: '2019-09-10T09:20:00.000-07:00',
          travelTime: 'Travel time: 5hr 15 mins'
        }
      ]
    },
    _links: {
      carBooking: {
        href: '/v1/mobile-misc/feature/cars/products',
        method: 'GET',
        query: {
          'pickup-location': 'LAS',
          'return-location': 'LAS',
          'pickup-datetime': '2019-09-10T09:30',
          'return-datetime': '2019-09-13T09:30'
        }
      }
    }
  }
};
