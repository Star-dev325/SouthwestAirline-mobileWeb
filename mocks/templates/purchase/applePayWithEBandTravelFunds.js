module.exports = {
  flightConfirmationPage: {
    headerMessage: {
      key: 'BOOKING_EARLYBIRD_CONFIRMATION',
      header: 'Your trip is booked with EarlyBird!',
      body: 'We will automatically reserve your boarding position 36 hours before your flight. Dont forget to retrieve your boarding pass 24 hours prior to departure.',
      icon: 'POSITIVE',
      textColor: 'DEFAULT',
      backgroundColor: 'DEFAULT'
    },
    dates: {
      first: '2020-06-20',
      second: null
    },
    destinationDescription: 'Charleston',
    failedPassengers: null,
    failedEarlyBird: null,
    pnrs: [
      {
        passengers: [
          {
            displayName: 'Eric Chavez JR',
            accountNumber: '601490374',
            specialAssistanceMessage: null,
            hasAnyEarlyBird: true
          }
        ],
        recordLocator: 'L9YPP5'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-06-20',
        flights: [
          {
            number: '2443',
            wifiOnBoard: true
          },
          {
            number: '4409',
            wifiOnBoard: true
          }
        ],
        departureTime: '05:25',
        departureAirport: {
          name: 'Albuquerque',
          state: 'NM',
          code: 'ABQ',
          country: null
        },
        arrivalTime: '13:30',
        arrivalAirport: {
          name: 'Charleston',
          state: 'SC',
          code: 'CHS',
          country: null
        },
        passengers: [
          {
            type: 'Passenger',
            count: 1,
            fareType: 'Anytime',
            bookingCode: null
          }
        ],
        stops: [
          {
            arrivalTime: '08:10',
            departureTime: '10:00',
            changePlanes: true,
            airport: {
              name: 'Dallas (Love Field)',
              state: 'TX',
              code: 'DAL',
              country: null
            }
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 5m'
      }
    ],
    billingInfo: {
      cardType: 'APPLE_PAY',
      cardHolderName: 'Test User',
      amountApplied: {
        amount: '33.50',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '1234 Abrams Rd',
        streetTwo: null,
        location: 'Dallas, TX US 75214'
      }
    },
    fundsApplied: [
      {
        travelFundType: 'TRAVEL_FUNDS',
        expirationDate: '2021-06-16',
        appliedAmount: {
          amount: '547.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Eric Chavez',
        fundIdentifier: 'L8V2ZF'
      }
    ],
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '581.48',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '541.88',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
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
            amount: '556.48',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '581.48',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        },
        earlyBirdPrice: {
          unitPrice: {
            amount: '25.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          total: {
            amount: '25.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          purchasedCount: 1
        },
        earlyBirdPriceDetails: [
          {
            description: 'EarlyBird Check-In® (ABQ - CHS)',
            unitPrice: {
              amount: '25.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            total: {
              amount: '25.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            purchasedCount: 1
          }
        ],
        _meta: {
          discountedFare: false,
          recordLocator: 'L9YPP5',
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
      subject: 'Southwest Flight 2443/4409 Albuquerque to Charleston',
      confirmationInfo: 'Confirmation #: L9YPP5',
      passengerInfo: 'Passenger names: Eric Chavez JR',
      flightInfo: [
        {
          header: 'Departing Flight: Sat, Jun 20, 2020',
          title: 'Southwest Flight 2443/4409 Albuquerque to Charleston',
          flightInfo: 'Flight #: 2443/4409',
          departureInfo: 'Departs: 05:25 AM ABQ',
          departureDateTime: '2020-06-20T05:25:00.000-06:00',
          stops: ['Stop: Dallas (Love Field), TX. Change planes'],
          arrivalInfo: 'Arrives: 01:30 PM CHS',
          arrivalDateTime: '2020-06-20T13:30:00.000-04:00',
          travelTime: 'Travel time: 6hr 5 mins'
        }
      ]
    },
    autoProvisioningMessage: null,
    _links: {
      carBooking: {
        href: '/v1/mobile-misc/feature/cars/products',
        method: 'GET',
        query: {
          'pickup-location': 'CHS',
          'return-location': 'CHS',
          'pickup-datetime': '2020-06-20T13:30',
          'return-datetime': '2020-06-23T13:30'
        }
      }
    },
    _analytics: null
  }
};
