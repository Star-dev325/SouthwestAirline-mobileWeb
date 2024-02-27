module.exports = {
  flightPricingPage: {
    acceptanceText1: 'Select cancel to change your flight selections.',
    acceptanceText2: 'By tapping continue, you accept the new price.',
    header: 'SFO - LAX (One Way)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2017-11-15',
        flights: [
          {
            number: '1157',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:25',
        departureAirport: {
          name: 'San Francisco',
          state: 'CA',
          code: 'SFO',
          country: null
        },
        arrivalDate: '2017-11-15',
        arrivalTime: '07:50',
        arrivalAirport: {
          name: 'Los Angeles',
          state: 'CA',
          code: 'LAX',
          country: null
        },
        passengers: [
          {
            type: 'Passenger',
            count: 2,
            fareType: 'Anytime',
            bookingCode: 'Q'
          }
        ],
        stops: [],
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        isNextDayArrival: false,
        travelTime: '1h 25m'
      }
    ],
    totals: {
      pointsTotal: {
        amount: '30,192',
        currencyCode: 'PTS'
      },
      moneyTotal: {
        amount: '11.20',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '19,049',
            currencyCode: 'PTS'
          },
          discount: {
            amount: '953',
            currencyCode: 'PTS'
          },
          totalBaseFare: {
            amount: '18,096',
            currencyCode: 'PTS'
          }
        },
        taxesAndFees: [
          {
            code: 'US',
            description: 'Excise Taxes',
            fee: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'US',
            description: 'Passenger Facility Charge',
            fee: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'US',
            description: 'Segment Fee',
            fee: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'AY',
            description: 'Security Fee',
            fee: {
              amount: '5.60',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        totalPerPassenger: {
          points: {
            amount: '19,049',
            currencyCode: 'PTS'
          },
          money: {
            amount: '5.60',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 2
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '11.20',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: {
            amount: '30,192',
            currencyCode: 'PTS'
          }
        }
      },
      seniorFare: null
    },
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    chaseBanner: null,
    billingAddress: null,
    _meta: {
      purchaseWithPoints: true,
      showRepriceNotification: true,
      newCardHasSufficientFunds: false,
      authorizeUser: true,
      internationalBooking: false
    },
    _links: {
      flightConfirmationPage: {
        href: '/v1/mobile-air-booking/page/flights/purchase',
        method: 'POST',
        xhref: '/v1/mobile-air-booking/page/flights/x-purchase',
        body: {
          promoCodeToken: null,
          reservationGroups: [
            {
              passengerType: 'Adult',
              amountApplied: {
                totalBaseFare: {
                  amount: '194.21',
                  currencyCode: 'USD',
                  currencySymbol: '$'
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
                ]
              },
              productIds: [
                'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksREFMLEFVUywyMDE3LTEyLTE4VDA2OjI1LTA2OjAwLDIwMTctMTItMThUMDc6MjUtMDY6MDAsV04sV04sMTUwMCw3M1ciLCJxdW90ZWRQcmljZSI6IjIyMy4wOCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ=='
              ]
            }
          ]
        }
      },
      loggedInPassengerInformation: null,
      savedCreditCards: null,
      earlyBirdPricing: null,
      chaseInstantCreditCard: null
    },
    isEligibleForExpressCheckout: false
  }
};
