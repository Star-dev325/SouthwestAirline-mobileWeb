module.exports = {
  changeConfirmation: {
    dates: { first: '2018-07-16', second: null },
    destinationDescription: 'Cancún',
    failedPassengers: null,
    pnrs: [
      {
        passengers: [{ displayName: 'Steven Jackie', accountNumber: '600648296' }],
        recordLocator: 'J5A8VC'
      }
    ],
    headerMessage: {
      backgroundColor: 'DEFAULT',
      body: 'If you are logged in, it will appear in your upcoming trips shortly. Business select was added to the following flights and passengers.',
      header: 'Great Choice!',
      icon: 'POSITIVE',
      key: 'BOOKING_UPSELL_CONFIRMATION_BUS',
      textColor: 'DEFAULT'
    },
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-07-16',
        flights: [
          { number: '2149', wifiOnBoard: true },
          { number: '1836', wifiOnBoard: true }
        ],
        departureTime: '06:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '12:15',
        arrivalAirport: { name: 'Cancun', state: null, code: 'CUN', country: 'Mexico' },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: null }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: { name: 'San Antonio', state: 'TX', code: 'SAT', country: null },
            arrivalTime: '07:05',
            departureTime: '09:45',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 15m'
      }
    ],
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: { amount: '27.40', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: '616 Main St', streetTwo: null, location: 'Brooklyn, NY US 75264' }
    },
    changeTotals: [
      {
        item: 'ORIGINAL PRICE',
        amount: { amount: '31,902', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '33.00', currencyCode: 'USD', currencySymbol: '$' }
      },
      {
        item: 'Total Paid',
        amount: null,
        tax: { amount: '27.40', currencyCode: 'USD', currencySymbol: '$' }
      },
      {
        item: 'Total Credit',
        amount: { amount: '4,680', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      }
    ],
    returnTravelFunds: null,
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '31,902', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '27,222', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '33.00', currencyCode: 'USD', currencySymbol: '$' }
      },
      nonRefundable: null,
      refundable: {
        item: 'Credit',
        fare: { amount: '4,680', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      youOwe: {
        item: 'Amount Due',
        fare: null,
        tax: { amount: '27.40', currencyCode: 'USD', currencySymbol: '$' }
      },
      totalDueNow: null,
      totalRefundability: {
        item: 'Credit',
        fare: { amount: '4,680', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }
      }
    },
    _links: {
      carBooking: {
        query: {
          'pickup-datetime': '2023-08-03T10:00',
          'pickup-location': 'ATL',
          'return-datetime': '2023-08-06T10:00',
          'return-location': 'ATL'
        }
      }
    },
    _meta: { purchaseWithPoints: true, partialSuccess: false, analytics: null }
  }
};
