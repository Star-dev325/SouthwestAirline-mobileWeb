module.exports = {
  changeConfirmation: {
    dates: { first: '2019-03-09', second: null },
    destinationDescription: 'Dallas',
    failedPassengers: null,
    pnrs: [{ passengers: [{ displayName: 'Sumo Aprilmember', accountNumber: '600954642' }], recordLocator: 'DBDMIX' }],
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
        departureDate: '2019-03-09',
        flights: [{ number: '3591', wifiOnBoard: true }],
        departureTime: '06:05',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '07:10',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: null }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 5m'
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
      {
        item: 'Total Credit',
        amount: { amount: '33.08', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '233.08', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '90.08', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: {
        item: 'Total Credit',
        fare: { amount: '109.92', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      refundable: {
        item: 'Total Credit',
        fare: { amount: '33.08', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      youOwe: null,
      totalRefundability: {
        item: 'Total Credit',
        fare: { amount: '143.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      }
    },
    _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
  }
};
