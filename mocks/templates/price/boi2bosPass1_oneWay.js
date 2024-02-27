module.exports = {
  flightPricingPage: {
    message: null,
    header: 'BOI - BOS (One Way)',
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
        passengers: [{ type: 'Passenger', count: 1, fareType: 'Wanna Get Away', bookingCode: 'W' }],
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
        upsellBoundDetails: null,
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.dev2.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false,
        travelTime: '10h 5m',
        _links: { flightPricingUpsellSingleBound: null }
      }
    ],
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
        _meta: {
          discountedFare: false,
          selectedFares: [
            { boundType: 'DEPARTING', price: { amount: '359.01', currencyCode: 'USD', currencySymbol: '$' } }
          ]
        }
      }
    },
    chaseBanner: null,
    upsellDetails: null,
    upsellSuccessMessage: null,
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    billingAddress: null,
    _meta: {
      purchaseWithPoints: false,
      showRepriceNotification: false,
      newCardHasSufficientFunds: false,
      authorizeUser: false,
      internationalBooking: false,
      chase: null
    },
    _analytics: { 'air.fareTypeb1': 'WGA', 'air.fareProductIdb1': 'WGA', 'air.fareClassb1': 'W' },
    _links: {
      flightConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/purchase',
        method: 'POST',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        xphref: '/v1/mobile-air-booking/page/flights/express-purchase',
        body: {
          promoCodeToken: null,
          reservationGroups: [
            {
              passengerType: 'Adult',
              amountApplied: {
                totalBaseFare: { amount: '308.38', currencyCode: 'USD', currencySymbol: '$' },
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
                ]
              },
              productIds: ['oneWay_BOI2BOSPass1_USD']
            }
          ]
        }
      },
      loggedInPassengerInformation: null,
      savedCreditCards: null,
      earlyBirdPricing: {
        href: '/v1/mobile-air-booking/feature/earlybird/prices',
        method: 'POST',
        body: {
          adultPassengers: {
            productIds: ['oneWay_BOI2BOSPass1_USD']
          }
        }
      },
      calculateFunds: {
        href: '/v1/mobile-air-booking/page/calculate-funds',
        method: 'POST',
        body: {
          promoCodeToken: null,
          itineraryPricingToken: 'oneWay_BOI2BOSPass1_USD'
        }
      },
      flightPricingUpsellBothBounds: null
    },
    isEligibleForExpressCheckout: false
  },
  prefill: null
};
