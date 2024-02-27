module.exports = {
  changeConfirmation: {
    dates: { first: '2019-02-13', second: '2019-02-16' },
    destinationDescription: 'Boise',
    failedPassengers: null,
    pnrs: [{ passengers: [{ displayName: 'Kyrr Test', accountNumber: '601173823' }], recordLocator: 'CHDWDE' }],
    headerMessage: {
      backgroundColor: 'DEFAULT',
      body: 'If you are logged in, it will appear in your upcoming trips shortly. Business select was added to the following flights and passengers.',
      header: 'Your trip is booked!',
      icon: 'POSITIVE',
      key: 'BOOKING_UPSELL_CONFIRMATION_BUS',
      textColor: 'DEFAULT'
    },
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-02-13',
        flights: [
          { number: '1791', wifiOnBoard: true },
          { number: '1993', wifiOnBoard: true }
        ],
        departureTime: '17:45',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '23:30',
        arrivalAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: null }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: { name: 'San Antonio', state: 'TX', code: 'SAT', country: null },
            arrivalTime: null,
            departureTime: null,
            changePlanes: false
          },
          {
            airport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
            arrivalTime: '20:40',
            departureTime: '21:30',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 45m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-16',
        flights: [
          { number: '4141', wifiOnBoard: true },
          { number: '3871', wifiOnBoard: true }
        ],
        departureTime: '14:00',
        departureAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
        arrivalTime: '20:50',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: null }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: { name: 'Las Vegas', state: 'NV', code: 'LAS', country: null },
            arrivalTime: '14:40',
            departureTime: '16:15',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '5h 50m'
      }
    ],
    billingInfo: {
      cardType: null,
      lastFourDigits: null,
      cardHolderName: null,
      amountApplied: { amount: '0.00', currencyCode: 'USD', currencySymbol: null },
      billingAddress: null
    },
    changeTotals: [
      { item: 'Total Paid', amount: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }, tax: null }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '1,091.06', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '1,091.06', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      youOwe: { item: 'Total Paid', fare: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }, tax: null },
      totalRefundability: null
    },
    _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
  }
};
