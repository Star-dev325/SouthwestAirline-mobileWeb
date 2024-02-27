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
    dates: { first: '2020-12-23', second: null },
    destinationDescription: 'Houston',
    failedPassengers: null,
    failedEarlyBird: null,
    pnrs: [
      {
        passengers: [
          {
            displayName: 'Eric Chavez JR',
            accountNumber: '601490374',
            specialAssistanceMessage: null,
            hasAnyEarlyBird: false
          }
        ],
        recordLocator: '2CC6LN'
      }
    ],
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2020-12-23',
        flights: [{ number: '1628', wifiOnBoard: true }],
        departureTime: '06:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '07:10',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengers: [{ type: 'Passenger', count: 1, fareType: 'Wanna Get Away', bookingCode: null }],
        stops: [],
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.dev5.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '1h 10m'
      }
    ],
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '4113',
      cardHolderName: 'Li Rui',
      amountApplied: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
      billingAddress: { streetOne: '40 Main St', streetTwo: null, location: 'Brooklyn, NY US 87620' }
    },
    totals: {
      pointsTotal: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
      moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
      adultFare: {
        baseFare: {
          fare: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
          }
        ],
        totalPerPassenger: {
          points: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          money: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
          pointsTotal: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null }
        },
        earlyBirdPrice: null,
        earlyBirdPriceDetails: null,
        _meta: { discountedFare: false, recordLocator: '2CC6LN', failedEarlyBird: false }
      },
      _meta: { purchaseWithPoints: true, partialSuccess: false, analytics: null }
    },
    shareDetails: {
      subject: 'Southwest Flight 1628 Dallas (Love Field) to Houston (Hobby)',
      confirmationInfo: 'Confirmation #: 2CC6LN',
      passengerInfo: 'Passenger names: Eric Chavez JR',
      flightInfo: [
        {
          header: 'Departing Flight: Wed, Dec 23, 2020',
          title: 'Southwest Flight 1628 Dallas (Love Field) to Houston (Hobby)',
          flightInfo: 'Flight #: 1628',
          departureInfo: 'Departs: 06:00 AM DAL',
          departureDateTime: '2020-12-23T06:00:00.000-06:00',
          stops: null,
          arrivalInfo: 'Arrives: 07:10 AM HOU',
          arrivalDateTime: '2020-12-23T07:10:00.000-06:00',
          travelTime: 'Travel time: 1hr 10 mins'
        }
      ]
    },
    autoProvisioningMessage: null,
    _links: {
      carBooking: {
        href: '/v1/mobile-misc/feature/cars/products',
        method: 'GET',
        query: {
          'pickup-location': 'HOU',
          'return-location': 'HOU',
          'pickup-datetime': '2020-12-23T07:30',
          'return-datetime': '2020-12-26T07:30'
        }
      }
    },
    _analytics: { 'air.fareTypeb1': 'WGA', 'air.fareProductIdb1': 'WGARED', 'air.fareClassb1': 'V' }
  }
};
