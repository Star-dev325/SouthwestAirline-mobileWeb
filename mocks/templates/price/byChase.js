module.exports = {
  flightPricingPage: {
    header: 'DAL - AUS (One Way)',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2018-08-18',
        flights: [
          {
            number: '9044',
            wifiOnBoard: true
          }
        ],
        departureTime: '06:00',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '07:10',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengers: [
          {
            type: 'Passenger',
            count: 1,
            fareType: 'Anytime',
            bookingCode: 'Y'
          }
        ],
        stops: [],
        isNextDayArrival: false,
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        travelTime: '1h 10m'
      }
    ],
    totals: {
      pointsTotal: null,
      moneyTotal: {
        amount: '222.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      adultFare: {
        baseFare: {
          fare: {
            amount: '194.21',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          discount: null,
          totalBaseFare: null
        },
        taxesAndFees: [
          {
            code: 'US',
            description: 'U.S. Transportation Tax',
            fee: {
              amount: '14.57',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'AY',
            description: 'U.S. 9/11 Security Fee',
            fee: {
              amount: '5.60',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'ZP',
            description: 'U.S. Flight Segment Tax',
            fee: {
              amount: '4.10',
              currencyCode: 'USD',
              currencySymbol: '$'
            }
          },
          {
            code: 'XF',
            description: 'U.S. Passenger Facility Chg',
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
            amount: '222.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '222.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          pointsTotal: null
        },
        _meta: {
          discountedFare: false,
          selectedFares: [
            {
              boundType: 'DEPARTING',
              price: {
                amount: '222.98',
                currencyCode: 'USD',
                currencySymbol: '$'
              }
            }
          ]
        }
      }
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
      internationalBooking: false,
      chase: {
        newCardHasSufficientFunds: true,
        isApproved: true,
        isValidChaseSessionId: true,
        chaseApplicationCompleted: true
      }
    },
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
                totalBaseFare: {
                  amount: '194.21',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                taxesAndFees: [
                  {
                    code: 'US',
                    description: 'U.S. Transportation Tax',
                    fee: {
                      amount: '14.57',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'AY',
                    description: 'U.S. 9/11 Security Fee',
                    fee: {
                      amount: '5.60',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'ZP',
                    description: 'U.S. Flight Segment Tax',
                    fee: {
                      amount: '4.10',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  },
                  {
                    code: 'XF',
                    description: 'U.S. Passenger Facility Chg',
                    fee: {
                      amount: '4.50',
                      currencyCode: 'USD',
                      currencySymbol: '$'
                    }
                  }
                ]
              },
              productIds: [
                'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksREFMLEFVUywyMDE4LTA4LTE4VDA2OjAwLTA1OjAwLDIwMTgtMDgtMThUMDc6MTAtMDU6MDAsV04sV04sOTA0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjIyMi45OCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IkFOWSIsImZhcmVQcmljaW5nVHlwZSI6IkFEVUxUIn0='
              ]
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
            productIds: [
              'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMLFksREFMLEFVUywyMDE4LTA4LTE4VDA2OjAwLTA1OjAwLDIwMTgtMDgtMThUMDc6MTAtMDU6MDAsV04sV04sOTA0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjIyMi45OCIsImludGVybmF0aW9uYWwiOmZhbHNlLCJmYXJlVHlwZSI6IkFOWSIsImZhcmVQcmljaW5nVHlwZSI6IkFEVUxUIn0='
            ]
          }
        }
      }
    },
    isEligibleForExpressCheckout: false
  },
  prefill: {
    chaseCardHolder: {
      firstName: 'Test',
      middleName: 'T',
      lastName: 'Tester',
      accountNumber: ''
    }
  }
};
