module.exports = {
  changeConfirmation: {
    dates: { first: '2019-02-16', second: '2019-02-23' },
    destinationDescription: 'Houston',
    failedPassengers: null,
    pnrs: [{ passengers: [{ displayName: 'Kyrr Test', accountNumber: '601173823' }], recordLocator: 'CHFRPD' }],
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
        flights: [{ number: '4191', wifiOnBoard: true }],
        departureTime: '20:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '21:10',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: null }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 10m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-02-23',
        flights: [{ number: '893', wifiOnBoard: true }],
        departureTime: '06:30',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '07:35',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Anytime', bookingCode: null }],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
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
        amount: { amount: '3,990', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '32,987', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '28,997', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      nonRefundable: null,
      refundable: {
        item: 'Total Credit',
        fare: { amount: '3,990', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      youOwe: null,
      totalRefundability: {
        item: 'Total Credit',
        fare: { amount: '3,990', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      }
    },
    _meta: { purchaseWithPoints: true, partialSuccess: false, analytics: null }
  }
};
