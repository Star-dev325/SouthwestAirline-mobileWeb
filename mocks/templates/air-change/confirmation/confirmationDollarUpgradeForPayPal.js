module.exports = {
  changeConfirmation: {
    dates: { first: '2018-12-28', second: '2018-12-29' },
    destinationDescription: 'Austin',
    failedPassengers: null,
    pnrs: [{ passengers: [{ displayName: 'Yang Lu', accountNumber: '601421214' }], recordLocator: 'JIRBOJ' }],
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
        departureDate: '2018-12-28',
        flights: [
          { number: '3362', wifiOnBoard: true },
          { number: '5750', wifiOnBoard: true }
        ],
        departureTime: '05:30',
        departureAirport: { name: 'Albany', state: 'NY', code: 'ALB', country: null },
        arrivalTime: '10:45',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: null }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [
          {
            airport: { name: 'Baltimore/Washington', state: 'MD', code: 'BWI', country: null },
            arrivalTime: '06:55',
            departureTime: '07:55',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '6h 15m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2018-12-29',
        flights: [
          { number: '2701', wifiOnBoard: true },
          { number: '5292', wifiOnBoard: true }
        ],
        departureTime: '07:05',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '16:35',
        arrivalAirport: { name: 'Albany', state: 'NY', code: 'ALB', country: null },
        passengers: [{ type: 'Adult', count: 1, fareType: 'Business Select', bookingCode: null }],
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        stops: [
          {
            airport: { name: 'Nashville', state: 'TN', code: 'BNA', country: null },
            arrivalTime: null,
            departureTime: null,
            changePlanes: false
          },
          {
            airport: { name: 'Chicago (Midway)', state: 'IL', code: 'MDW', country: null },
            arrivalTime: '11:30',
            departureTime: '13:50',
            changePlanes: true
          }
        ],
        isNextDayArrival: false,
        travelTime: '8h 30m'
      }
    ],
    billingInfo: {
      cardType: 'PAYPAL',
      lastFourDigits: '6052',
      cardHolderName: 'Andy Gough',
      amountApplied: { amount: '483.76', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: '1 Main St', streetTwo: null, location: 'San Jose, CA US 95131' }
    },
    changeTotals: [
      {
        item: 'Total Paid',
        amount: { amount: '483.76', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      }
    ],
    fareSummary: {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '730.00', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '1,213.76', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      nonRefundable: null,
      refundable: null,
      youOwe: {
        item: 'Total Paid',
        fare: { amount: '483.76', currencyCode: 'USD', currencySymbol: '$' },
        tax: null
      },
      totalRefundability: null
    },
    _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
  }
};
