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
      first: '2020-07-03',
      second: null
    },
    destinationDescription: 'Charlotte',
    failedPassengers: null,
    pnrs: [
      {
        passengers: [
          {
            displayName: 'Test User',
            accountNumber: '601865003',
            specialAssistanceMessage: null,
            hasAnyEarlyBird: false
          }
        ],
        recordLocator: 'MPPKZE'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-07-03',
        flights: [
          {
            number: '5463',
            wifiOnBoard: true
          },
          {
            number: '171',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:35',
        departureAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        arrivalTime: '12:10',
        arrivalAirport: {
          name: 'Charlotte',
          state: 'NC',
          code: 'CLT',
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
            arrivalTime: '08:40',
            departureTime: '09:50',
            changePlanes: true,
            airport: {
              name: 'Nashville',
              state: 'TN',
              code: 'BNA',
              country: null
            }
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 35m'
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
    fundsApplied: null,
    changeTotals: [
      {
        item: 'Total Paid',
        amount: {
          amount: '0.00',
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
          amount: '252.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: {
          amount: '542.48',
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
          amount: '289.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: null
    },
    shareDetails: {
      subject: 'Southwest Flight 5463/171 Austin to Charlotte',
      confirmationInfo: 'Confirmation #: MPPKZE',
      passengerInfo: 'Passenger names: Test User',
      flightInfo: [
        {
          header: 'Departing Flight: Fri, Jul 03, 2020',
          title: 'Southwest Flight 5463/171 Austin to Charlotte',
          flightInfo: 'Flight #: 5463/171',
          departureInfo: 'Departs: 06:35 AM AUS',
          departureDateTime: '2020-07-03T06:35:00.000-05:00',
          stops: ['Stop: Nashville, TN. Change planes'],
          arrivalInfo: 'Arrives: 12:10 PM CLT',
          arrivalDateTime: '2020-07-03T12:10:00.000-04:00',
          travelTime: 'Travel time: 4hr 35 mins'
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
