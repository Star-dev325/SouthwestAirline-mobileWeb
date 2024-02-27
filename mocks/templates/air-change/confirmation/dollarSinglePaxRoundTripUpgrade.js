module.exports = {
  changeConfirmation: {
    dates: { first: '2019-02-16', second: '2019-02-23' },
    destinationDescription: 'Austin',
    failedPassengers: null,
    pnrs: [{ passengers: [{ displayName: 'Sumo Aprilmember', accountNumber: '600954642' }], recordLocator: 'CHFRDU' }],
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
        departureDate: '2019-02-16',
        flights: [
          { number: '2326', wifiOnBoard: true },
          { number: '4092', wifiOnBoard: true }
        ],
        departureTime: '06:15',
        departureAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        arrivalTime: '09:25',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: null }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [
          {
            airport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
            arrivalTime: '07:35',
            departureTime: '08:30',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 10m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-23',
        flights: [{ number: '1465', wifiOnBoard: true }],
        departureTime: '07:40',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '10:45',
        arrivalAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: null }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '2h 5m'
      }
    ],
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: { amount: '22.00', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: '694 Main St', streetTwo: null, location: 'Brooklyn, NY US 34284' }
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
        fare: { amount: '816.86', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '838.86', currencyCode: 'USD', currencySymbol: '$' },
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
