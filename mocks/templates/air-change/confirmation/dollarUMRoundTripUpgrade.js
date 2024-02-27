module.exports = {
  changeConfirmation: {
    dates: { first: '2019-02-12', second: '2019-02-15' },
    destinationDescription: 'Indianapolis',
    failedPassengers: null,
    pnrs: [
      { passengers: [{ displayName: 'Unaccompanied Minor', accountNumber: '601178900' }], recordLocator: 'CHFUMN' }
    ],
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
        departureDate: '2019-02-12',
        flights: [{ number: '1150', wifiOnBoard: true }],
        departureTime: '11:05',
        departureAirport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
        arrivalTime: '15:30',
        arrivalAirport: { name: 'Indianapolis', state: 'IN', code: 'IND', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: null }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '2h 25m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-15',
        flights: [{ number: '1326', wifiOnBoard: true }],
        departureTime: '11:00',
        departureAirport: { name: 'Indianapolis', state: 'IN', code: 'IND', country: null },
        arrivalTime: '11:50',
        arrivalAirport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: null }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '2h 50m'
      }
    ],
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '4113',
      cardHolderName: 'Li Rui',
      amountApplied: { amount: '17.80', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: '428 Main St', streetTwo: null, location: 'Brooklyn, NY US 42971' }
    },
    changeTotals: [
      {
        item: 'Total Paid',
        amount: { amount: '17.80', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '838.36', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '856.16', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      youOwe: { item: 'Total Paid', fare: { amount: '17.80', currencyCode: 'USD', currencySymbol: '$' }, tax: null },
      totalRefundability: null
    },
    _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
  }
};
