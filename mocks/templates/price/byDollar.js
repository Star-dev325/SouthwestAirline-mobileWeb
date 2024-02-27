module.exports = {
  flightPricingPage: {
    acceptanceText1: 'Select cancel to change your flight selections.',
    acceptanceText2: 'By tapping continue, you accept the new price.',
    header: 'DAL - ATL (One Way)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2017-11-01',
        flights: [
          {
            number: '1504',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:30',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalDate: '2017-11-01',
        arrivalTime: '09:30',
        arrivalAirport: {
          name: 'Atlanta',
          state: 'GA',
          code: 'ATL',
          country: null
        },
        passengers: [
          {
            type: 'Passenger',
            count: 1,
            fareType: 'Wanna Get Away',
            bookingCode: 'D'
          }
        ],
        stops: [
          {
            airport: {
              name: 'Houston (Hobby)',
              state: 'TX',
              code: 'HOU',
              country: null
            },
            arrivalTime: '15:35',
            departureTime: '16:25',
            changePlanes: true
          }
        ],
        travelTime: '02:00',
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        isNextDayArrival: false
      }
    ],
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '233.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '204.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discount: {
            amount: '20.0',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          totalBaseFare: {
            amount: '184.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        taxesAndFees: [
          {
            description: 'Excise Taxes',
            fee: {
              amount: '15.33',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            description: 'Security Fee',
            fee: {
              amount: '5.60',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            description: 'Segment Fee',
            fee: {
              amount: '4.10',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            description: 'Passenger Facility Charge',
            fee: {
              amount: '4.50',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          }
        ],
        totalPerPassenger: {
          points: null,
          money: {
            amount: '233.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '233.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        }
      },
      seniorFare: null
    },
    fareRulesWithLinks:
      'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
    chaseBanner: null,
    billingAddress: null,
    _meta: {
      purchaseWithPoints: false,
      showRepriceNotification: false,
      newCardHasSufficientFunds: false,
      authorizeUser: false,
      internationalBooking: true
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
      loggedInPassengerInformation: {
        href: 'v1/mobile-misc/page/air-booking/passenger-information',
        method: 'GET'
      },
      savedCreditCards: null,
      earlyBirdPricing: {
        href: '/v1/mobile-air-booking/feature/earlybird/prices',
        method: 'POST',
        body: {
          adultPassengers: {
            productIds: [
              'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksREFMLEFVUywyMDE4LTA4LTE4VDA2OjAwLTA1OjAwLDIwMTgtMDgtMThUMDc6MTAtMDU6MDAsV04sV04sOTA0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjIyMi45OCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IkFOWSIsImZhcmVQcmljaW5nVHlwZSI6IkFEVUxUIn0='
            ]
          }
        }
      },
      companionPurchase: null
    }
  }
};
