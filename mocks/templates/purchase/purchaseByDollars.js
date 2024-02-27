module.exports = {
  flightConfirmationPage: {
    dates: { first: '2017-12-18', second: null },
    destinationDescription: 'Austin',
    failedPassengers: null,
    failedEarlyBird: null,
    pnrs: [
      { passengers: [{ displayName: 'Ron Biggs', accountNumber: null }], recordLocator: 'M8LQSV' },
      { passengers: [{ displayName: 'Yangjie Lu', accountNumber: null }], recordLocator: 'DKWDLS' }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2017-12-18',
        flights: [{ number: '1500', wifiOnBoard: true }],
        departureTime: '06:25',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalDate: '2017-12-18',
        arrivalTime: '07:25',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengers: [
          { type: 'Adult', count: 1, fareType: 'Anytime' },
          { type: 'Adult', count: 1, fareType: 'Anytime' }
        ],
        stops: [],
        isNextDayArrival: false,
        travelTime: '1h 0m'
      }
    ],
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: { amount: '446.16', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: '391 Main St', streetTwo: null, location: 'Brooklyn, NY US 33758' }
    },
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '194.21', currencyCode: 'USD', currencySymbol: '$' },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'US',
            description: 'Excise Taxes',
            fee: { amount: '14.57', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'Segment Fee',
            fee: { amount: '4.20', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'Passenger Facility Charge',
            fee: { amount: '4.50', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: null
        },
        _meta: { discountedFare: false }
      },
      seniorFare: {
        baseFare: {
          fare: { amount: '194.21', currencyCode: 'USD', currencySymbol: '$' },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'US',
            description: 'Excise Taxes',
            fee: { amount: '14.57', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'AY',
            description: 'Sept 11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'Segment Fee',
            fee: { amount: '4.20', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'Passenger Facility Charge',
            fee: { amount: '4.50', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '223.08', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: null
        },
        _meta: { discountedFare: false }
      },
      _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
    },
    _links: {
      carBooking: {
        href: '/v1/mobile-misc/feature/cars/products',
        method: 'GET',
        query: {
          'pickup-location': 'AUS',
          'return-location': 'AUS',
          'pickup-datetime': '2017-12-18T06:25',
          'return-datetime': '2017-12-21T06:25'
        }
      }
    }
  }
};
