class CompanionFlightPricingPageBuilder {
  constructor() {
    this.flightPricingPage = {
      flightPricingPage: {
        header: 'AUS - ATL (Round Trip)',
        bounds: [
          {
            boundType: 'DEPARTING',
            departureDate: '2018-03-02',
            flights: [
              {
                number: '1728',
                wifiOnBoard: true
              },
              {
                number: '497',
                wifiOnBoard: true
              }
            ],
            departureTime: '05:40',
            departureAirport: {
              name: 'Austin',
              state: 'TX',
              code: 'AUS',
              country: null
            },
            arrivalDate: '2018-03-02',
            arrivalTime: '11:35',
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
                fareType: 'Companion',
                bookingCode: 'S'
              }
            ],
            stops: [
              {
                airport: {
                  name: 'Orlando',
                  state: 'FL',
                  code: 'MCO',
                  country: null
                },
                arrivalTime: '09:05',
                departureTime: '10:00',
                changePlanes: true
              }
            ],
            fareProductDetails: {
              label: 'Companion',
              fareRulesUrl: 'https://mobile.southwest.com/fare-rules/companion'
            },
            isNextDayArrival: false,
            travelTime: '4h 55m'
          },
          {
            boundType: 'RETURNING',
            departureDate: '2018-03-05',
            flights: [
              {
                number: '1752',
                wifiOnBoard: true
              },
              {
                number: '5857',
                wifiOnBoard: true
              }
            ],
            departureTime: '06:00',
            departureAirport: {
              name: 'Atlanta',
              state: 'GA',
              code: 'ATL',
              country: null
            },
            arrivalDate: '2018-03-05',
            arrivalTime: '09:00',
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
                fareType: 'Companion',
                bookingCode: 'S'
              }
            ],
            stops: [
              {
                airport: {
                  name: 'Dallas (Love Field)',
                  state: 'TX',
                  code: 'DAL',
                  country: null
                },
                arrivalTime: '07:15',
                departureTime: '08:00',
                changePlanes: true
              }
            ],
            fareProductDetails: {
              label: 'Companion',
              fareRulesUrl: 'https://mobile.southwest.com/fare-rules/companion'
            },
            isNextDayArrival: false,
            travelTime: '4h 0m'
          }
        ],
        totals: {
          pointsTotal: null,
          moneyTotal: {
            amount: '11.20',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          adultFare: {
            baseFare: {
              fare: {
                amount: '0.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discount: null,
              totalBaseFare: null
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
                code: 'AY',
                description: 'Sept 11 Security Fee',
                fee: {
                  amount: '11.20',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }
            ],
            totalPerPassenger: {
              points: null,
              money: {
                amount: '11.20',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              passengerCount: 1
            },
            paxTypeTotal: {
              moneyTotal: {
                amount: '11.20',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              pointsTotal: null
            }
          }
        },
        fareRulesWithLinks: 'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
        chaseBanner: null,
        billingAddress: null,
        _meta: {
          purchaseWithPoints: false,
          showRepriceNotification: false,
          newCardHasSufficientFunds: false,
          authorizeUser: false,
          internationalBooking: false
        },
        _links: {
          flightConfirmationPage: {
            href: '/v1/mobile-air-booking/page/flights/x-purchase',
            method: 'POST',
            body: {
              promoCodeToken: null,
              reservationGroups: [
                {
                  sponsorRecordLocator: 'K9ZTCX',
                  passengerType: 'Adult',
                  amountApplied: {
                    totalBaseFare: {
                      amount: '0.00',
                      currencyCode: 'USD',
                      currencySymbol: '$'
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
                        code: 'AY',
                        description: 'Sept 11 Security Fee',
                        fee: {
                          amount: '11.20',
                          currencyCode: 'USD',
                          currencySymbol: '$'
                        }
                      }
                    ]
                  },
                  productIds: [
                    'eyJwcm9kdWN0SWQiOiJDT01QQU5JT058RkZQfFhDQyxYLEFVUyxNQ08sMjAxOC0wMy0wMlQwNTo0MC0wNjowMCwyMDE4LTAzLTAyVDA5OjA1LTA1OjAwLFdOLFdOLDE3MjgsNzNXfFhDQyxYLE1DTyxBVEwsMjAxOC0wMy0wMlQxMDowMC0wNTowMCwyMDE4LTAzLTAyVDExOjM1LTA1OjAwLFdOLFdOLDQ5Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjAiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                    'eyJwcm9kdWN0SWQiOiJDT01QQU5JT058RkZQfFhDQyxYLEFUTCxEQUwsMjAxOC0wMy0wNVQwNjowMC0wNTowMCwyMDE4LTAzLTA1VDA3OjE1LTA2OjAwLFdOLFdOLDE3NTIsNzNXfFhDQyxYLERBTCxBVVMsMjAxOC0wMy0wNVQwODowMC0wNjowMCwyMDE4LTAzLTA1VDA5OjAwLTA2OjAwLFdOLFdOLDU4NTcsNzNXIiwicXVvdGVkUHJpY2UiOiIwIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9'
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
                  'eyJwcm9kdWN0SWQiOiJDT01QQU5JT058RkZQfFhDQyxYLEFVUyxEQUwsMjAxOC0wNC0wOVQwNTo1MC0wNTowMCwyMDE4LTA0LTA5VDA2OjUwLTA1OjAwLFdOLFdOLDE4ODQsNzNXIiwicXVvdGVkUHJpY2UiOiIwIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiQ09NUEFOSU9OIiwiZmFyZVByaWNpbmdUeXBlIjoiUE9JTlRTIn0='
                ]
              }
            }
          },
          chaseInstantCreditCard: null
        },
        isEligibleForExpressCheckout: false
      }
    };
  }

  withOneWay() {
    this.flightPricingPage = {
      flightPricingPage: {
        header: 'ATL - AUS (One Way)',
        bounds: [
          {
            boundType: 'DEPARTING',
            departureDate: '2018-03-20',
            flights: [
              {
                number: '1898',
                wifiOnBoard: false
              },
              {
                number: '2113',
                wifiOnBoard: true
              }
            ],
            departureTime: '06:05',
            departureAirport: {
              name: 'Atlanta',
              state: 'GA',
              code: 'ATL',
              country: null
            },
            arrivalTime: '09:25',
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
                fareType: 'Companion',
                bookingCode: 'Y'
              }
            ],
            fareProductDetails: {
              label: 'Companion',
              fareRulesUrl: 'https://mobile.southwest.com/fare-rules/companion'
            },
            stops: [
              {
                airport: {
                  name: 'Houston (Hobby)',
                  state: 'TX',
                  code: 'HOU',
                  country: null
                },
                arrivalTime: '07:20',
                departureTime: '08:35',
                changePlanes: true
              }
            ],
            isNextDayArrival: false,
            travelTime: '4h 20m'
          }
        ],
        totals: {
          pointsTotal: null,
          moneyTotal: {
            amount: '5.60',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          adultFare: {
            baseFare: {
              fare: {
                amount: '0.00',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              discount: null,
              totalBaseFare: null
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
                code: 'AY',
                description: 'Sept 11 Security Fee',
                fee: {
                  amount: '5.60',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }
            ],
            totalPerPassenger: {
              points: null,
              money: {
                amount: '5.60',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              passengerCount: 1
            },
            paxTypeTotal: {
              moneyTotal: {
                amount: '5.60',
                currencyCode: 'USD',
                currencySymbol: '$'
              },
              pointsTotal: null
            }
          }
        },
        fareRulesWithLinks: 'Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
        chaseBanner: null,
        billingAddress: null,
        _meta: {
          purchaseWithPoints: false,
          showRepriceNotification: false,
          newCardHasSufficientFunds: false,
          authorizeUser: false,
          internationalBooking: false,
          chase: null
        },
        _links: {
          flightConfirmationPage: {
            href: '/v1/mobile-air-booking/page/flights/x-purchase',
            method: 'POST',
            body: {
              promoCodeToken: null,
              reservationGroups: [
                {
                  sponsorRecordLocator: 'O67PUL',
                  passengerType: 'Adult',
                  amountApplied: {
                    totalBaseFare: {
                      amount: '0.00',
                      currencyCode: 'USD',
                      currencySymbol: '$'
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
                        code: 'AY',
                        description: 'Sept 11 Security Fee',
                        fee: {
                          amount: '5.60',
                          currencyCode: 'USD',
                          currencySymbol: '$'
                        }
                      }
                    ]
                  },
                  productIds: [
                    'eyJwcm9kdWN0SWQiOiJDT01QQU5JT058RkZQfFhDQyxYLEFUTCxIT1UsMjAxOC0wMy0yMFQwNjowNS0wNDowMCwyMDE4LTAzLTIwVDA3OjIwLTA1OjAwLFdOLFdOLDE4OTgsNzMzfFhDQyxYLEhPVSxBVVMsMjAxOC0wMy0yMFQwODozNS0wNTowMCwyMDE4LTAzLTIwVDA5OjI1LTA1OjAwLFdOLFdOLDIxMTMsNzNIIiwicXVvdGVkUHJpY2UiOiIwIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiQ09NUEFOSU9OIiwiZmFyZVByaWNpbmdUeXBlIjoiUE9JTlRTIn0='
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
                  'eyJwcm9kdWN0SWQiOiJDT01QQU5JT058RkZQfFhDQyxYLEFVUyxEQUwsMjAxOC0wNC0wOVQwNTo1MC0wNTowMCwyMDE4LTA0LTA5VDA2OjUwLTA1OjAwLFdOLFdOLDE4ODQsNzNXIiwicXVvdGVkUHJpY2UiOiIwIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiQ09NUEFOSU9OIiwiZmFyZVByaWNpbmdUeXBlIjoiUE9JTlRTIn0='
                ]
              }
            }
          },
          chaseInstantCreditCard: null
        },
        isEligibleForExpressCheckout: false
      },
      prefill: null
    };

    return this;
  }

  build() {
    return this.flightPricingPage;
  }
}

module.exports = CompanionFlightPricingPageBuilder;
