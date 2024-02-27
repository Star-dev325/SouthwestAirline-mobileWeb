module.exports = {
  changeConfirmation: {
    dates: { first: '2019-01-27', second: '2019-01-29' },
    destinationDescription: 'Austin',
    failedPassengers: null,
    pnrs: [
      { passengers: [{ displayName: 'Age Verified Senior', accountNumber: '601005646' }], recordLocator: 'PNTYFX' }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-01-27',
        flights: [
          { number: '1459', wifiOnBoard: true },
          { number: '4566', wifiOnBoard: true }
        ],
        departureTime: '07:05',
        departureAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        arrivalTime: '10:20',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: null }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [
          {
            airport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
            arrivalTime: '08:25',
            departureTime: '09:15',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 15m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-01-29',
        flights: [
          { number: '1623', wifiOnBoard: true },
          { number: '1598', wifiOnBoard: true }
        ],
        departureTime: '05:50',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '11:25',
        arrivalAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: null }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [
          {
            airport: { name: 'St. Louis', state: 'MO', code: 'STL', country: null },
            arrivalTime: '07:45',
            departureTime: '08:45',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 35m'
      }
    ],
    headerMessage: {
      backgroundColor: 'DEFAULT',
      body: 'If you are logged in, it will appear in your upcoming trips shortly. Business select was added to the following flights and passengers.',
      header: 'Your trip is booked!',
      icon: 'POSITIVE',
      key: 'BOOKING_UPSELL_CONFIRMATION_BUS',
      textColor: 'DEFAULT'
    },
    billingInfo: {
      cardType: 'UATP',
      lastFourDigits: '8911',
      cardHolderName: 'Li Rui',
      amountApplied: { amount: '22.00', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: '599 Main St', streetTwo: null, location: 'Brooklyn, NY US 44859' }
    },
    changeTotals: [
      {
        item: 'Total Paid',
        amount: { amount: '22.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '825.56', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '847.56', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      youOwe: { item: 'Total Paid', fare: { amount: '22.00', currencyCode: 'USD', currencySymbol: '$' }, tax: null },
      totalRefundability: null
    },
    _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
  }
};
