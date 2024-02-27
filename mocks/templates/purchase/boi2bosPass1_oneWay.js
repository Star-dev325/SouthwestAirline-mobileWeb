module.exports = {
  flightConfirmationPage: {
    headerMessage: {
      key: 'BOOKING_CONFIRMATION',
      header: 'Your trip is booked!',
      body: 'Check in up to 24 hours in advance. The earlier you check in, the better your seat selection.',
      icon: 'POSITIVE',
      textColor: 'DEFAULT',
      backgroundColor: 'DEFAULT'
    },
    dates: { first: '2020-12-17', second: null },
    destinationDescription: 'Boston',
    failedPassengers: null,
    failedEarlyBird: null,
    pnrs: [
      {
        passengers: [
          {
            displayName: 'Cypressuser Cypressmiddle Cypresslastname I',
            accountNumber: null,
            specialAssistanceMessage: null,
            hasAnyEarlyBird: false
          }
        ],
        recordLocator: '26MBLI'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-12-17',
        flights: [
          { number: '463', wifiOnBoard: true },
          { number: '128', wifiOnBoard: true }
        ],
        departureTime: '06:55',
        departureAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
        arrivalTime: '19:00',
        arrivalAirport: { name: 'Boston Logan', state: 'MA', code: 'BOS', country: null },
        passengers: [{ type: 'Passenger', count: 1, fareType: 'Wanna Get Away', bookingCode: null }],
        stops: [
          {
            arrivalTime: '08:55',
            departureTime: '10:50',
            changePlanes: true,
            airport: { name: 'Phoenix', state: 'AZ', code: 'PHX', country: null }
          },
          {
            arrivalTime: null,
            departureTime: null,
            changePlanes: false,
            airport: { name: 'Chicago (Midway)', state: 'IL', code: 'MDW', country: null }
          }
        ],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.dev2.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '10h 5m'
      }
    ],
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '4113',
      cardHolderName: 'CypressUser CypressLastName',
      amountApplied: { amount: '359.01', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: 'Dallas', streetTwo: 'Irving', location: 'Dallas, TX US 75038' }
    },
    totals: {
      pointsTotal: null,
      moneyTotal: { amount: '359.01', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '308.38', currencyCode: 'USD', currencySymbol: '$' },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'US',
            description: 'U.S. Transportation Tax',
            fee: { amount: '23.13', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: { amount: '12.90', currencyCode: 'USD', currencySymbol: '$' }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
            fee: { amount: '9.00', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: { amount: '359.01', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: { moneyTotal: { amount: '359.01', currencyCode: 'USD', currencySymbol: '$' }, pointsTotal: null },
        earlyBirdPrice: null,
        earlyBirdPriceDetails: null,
        _meta: { discountedFare: false, recordLocator: '26MBLI', failedEarlyBird: false }
      },
      _meta: { purchaseWithPoints: false, partialSuccess: false, analytics: null }
    },
    shareDetails: {
      subject: 'Southwest Flight 463/128 Boise to Boston Logan',
      confirmationInfo: 'Confirmation #: 26MBLI',
      passengerInfo: 'Passenger names: Cypressuser Cypressmiddle Cypresslastname I',
      flightInfo: [
        {
          header: 'Departing Flight: Thu, Dec 17, 2020',
          title: 'Southwest Flight 463/128 Boise to Boston Logan',
          flightInfo: 'Flight #: 463/128',
          departureInfo: 'Departs: 06:55 AM BOI',
          departureDateTime: '2020-12-17T06:55:00.000-07:00',
          stops: ['Stop: Phoenix, AZ. Change planes', 'Stop: Chicago (Midway), IL. No plane change'],
          arrivalInfo: 'Arrives: 07:00 PM BOS',
          arrivalDateTime: '2020-12-17T19:00:00.000-05:00',
          travelTime: 'Travel time: 10hr 5 mins'
        }
      ]
    },
    autoProvisioningMessage: null,
    _links: {
      carBooking: {
        href: '/v1/mobile-misc/feature/cars/products',
        method: 'GET',
        query: {
          'pickup-location': 'BOS',
          'return-location': 'BOS',
          'pickup-datetime': '2020-12-17T19:00',
          'return-datetime': '2020-12-20T19:00'
        }
      }
    },
    _analytics: { 'air.fareTypeb1': 'WGA', 'air.fareProductIdb1': 'WGA', 'air.fareClassb1': 'W' }
  }
};
