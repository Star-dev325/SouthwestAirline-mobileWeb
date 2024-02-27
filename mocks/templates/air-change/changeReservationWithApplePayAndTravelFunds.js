module.exports = {
  changeConfirmation: {
    headerMessage: {
      key: 'BOOKING_CONFIRMATION',
      header: 'Your trip is booked!',
      body: 'Check in up to 24 hours in advance. The earlier you check in, the better your seat selection.',
      icon: 'POSITIVE',
      textColor: 'DEFAULT',
      backgroundColor: 'DEFAULT'
    },
    dates: {
      first: '2020-07-01',
      second: null
    },
    destinationDescription: 'Austin',
    failedPassengers: null,
    pnrs: [
      {
        passengers: [
          {
            displayName: 'Test User',
            accountNumber: '601545884',
            specialAssistanceMessage: null,
            hasAnyEarlyBird: false
          }
        ],
        recordLocator: 'NS43T6'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-07-01',
        flights: [
          {
            number: '5477',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:05',
        departureAirport: {
          name: 'Amarillo',
          state: 'TX',
          code: 'AMA',
          country: null
        },
        arrivalTime: '08:55',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengers: [
          {
            type: 'Passenger',
            count: 1,
            fareType: 'Business Select',
            bookingCode: null
          }
        ],
        stops: [
          {
            arrivalTime: null,
            departureTime: null,
            changePlanes: false,
            airport: {
              name: 'Dallas (Love Field)',
              state: 'TX',
              code: 'DAL',
              country: null
            }
          }
        ],
        isNextDayArrival: false,
        travelTime: '2h 50m'
      }
    ],
    billingInfo: {
      cardType: 'APPLE_PAY',
      cardHolderName: 'Test User',
      amountApplied: {
        amount: '289.50',
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
        expirationDate: '2021-06-30',
        appliedAmount: {
          amount: '128.48',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        displayName: 'Test User',
        fundIdentifier: 'NS3HQH'
      }
    ],
    changeTotals: [
      {
        item: 'Total Paid',
        amount: {
          amount: '218.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: {
          amount: '128.48',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: {
          amount: '346.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      youOwe: {
        item: 'Total Paid',
        fare: {
          amount: '218.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: null
    },
    shareDetails: {
      subject: 'Southwest Flight 5477 Amarillo to Austin',
      confirmationInfo: 'Confirmation #: NS43T6',
      passengerInfo: 'Passenger names: Tiertwo Withcompanion',
      flightInfo: [
        {
          header: 'Departing Flight: Wed, Jul 01, 2020',
          title: 'Southwest Flight 5477 Amarillo to Austin',
          flightInfo: 'Flight #: 5477',
          departureInfo: 'Departs: 06:05 AM AMA',
          departureDateTime: '2020-07-01T06:05:00.000-05:00',
          stops: ['Stop: Dallas (Love Field), TX. No plane change'],
          arrivalInfo: 'Arrives: 08:55 AM AUS',
          arrivalDateTime: '2020-07-01T08:55:00.000-05:00',
          travelTime: 'Travel time: 2hr 50 mins'
        }
      ]
    },
    _meta: {
      purchaseWithPoints: false,
      partialSuccess: false,
      analytics: null
    }
  }
};
