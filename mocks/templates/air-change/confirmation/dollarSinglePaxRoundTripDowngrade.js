module.exports = {
  changeConfirmation: {
    dates: { first: '2019-02-23', second: '2019-03-02' },
    destinationDescription: 'San Antonio',
    failedPassengers: null,
    pnrs: [{ passengers: [{ displayName: 'Charith Tangrila', accountNumber: '601425543' }], recordLocator: 'CHFRDD' }],
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
        departureDate: '2019-02-23',
        flights: [
          { number: '3352', wifiOnBoard: true },
          { number: '3651', wifiOnBoard: true }
        ],
        departureTime: '07:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '12:00',
        arrivalAirport: { name: 'San Antonio', state: 'TX', code: 'SAT', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: null }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [
          {
            airport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
            arrivalTime: '08:15',
            departureTime: '10:55',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '5h 0m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-03-02',
        flights: [
          { number: '4565', wifiOnBoard: true },
          { number: '329', wifiOnBoard: true }
        ],
        departureTime: '06:25',
        departureAirport: { name: 'San Antonio', state: 'TX', code: 'SAT', country: null },
        arrivalTime: '11:05',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Wanna Get Away', bookingCode: null }],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        stops: [
          {
            airport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
            arrivalTime: '07:25',
            departureTime: '10:00',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 40m'
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
        amount: { amount: '119.77', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '351.77', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '232.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: {
        item: 'Total Credit',
        fare: { amount: '119.77', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      youOwe: null,
      totalRefundability: {
        item: 'Total Credit',
        fare: { amount: '119.77', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      }
    },
    _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
  }
};
