// @flow
import _ from 'lodash';
import earlyBirdConfirmationPageResponse from 'mocks/templates/earlyBird/earlyBirdPurchaseForOneWaySinglePax';
import type { EarlyBirdConfirmationPageType } from 'src/earlyBird/flow-typed/earlyBird.types';

type EarlyBirdConfirmationPageBuilderType = {
  earlyBirdConfirmationPage: EarlyBirdConfirmationPageType
}

export default class EarlyBirdConfirmationPageBuilder {
  earlyBirdConfirmationPage: EarlyBirdConfirmationPageType = _.cloneDeep(earlyBirdConfirmationPageResponse.earlyBirdConfirmationPage);

  withRoundTrip(): EarlyBirdConfirmationPageBuilderType {
    this.earlyBirdConfirmationPage.earlyBirdPurchaseBounds = [
      {
        bound: {
          boundType: 'DEPARTING',
          flights: [
            {
              number: '123',
              wifiOnBoard: false
            },
            {
              number: '456',
              wifiOnBoard: true
            }
          ],
          travelTime: '2h 40m',
          departureDate: '2017-05-20',
          departureTime: '20:20',
          departureAirport: {
            code: 'DAL',
            name: 'Dallas (Love Field)',
            state: 'TX',
            country: null
          },
          stops: [
            {
              airport: {
                name: 'Nashville',
                code: 'BNA',
                state: 'TN',
                country: null
              },
              arrivalTime: null,
              changePlanes: false
            },
            {
              airport: {
                name: 'Chicago (Midway)',
                code: 'MDW',
                state: 'TX',
                country: null
              },
              arrivalTime: '11:50',
              departureTime: '15:50',
              changePlanes: true
            }
          ],
          arrivalTime: '22:25',
          arrivalAirport: {
            code: 'ATL',
            name: 'Atlanta',
            state: 'GA',
            country: null
          },
          isNextDayArrival: false,
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          passengers: [
            {
              name: 'Kevin Thompson'
            }
          ]
        }
      },
      {
        bound: {
          boundType: 'RETURNING',
          flights: [
            {
              number: '123',
              wifiOnBoard: false
            },
            {
              number: '456',
              wifiOnBoard: true
            }
          ],
          travelTime: '2h 40m',
          departureDate: '2017-05-20',
          departureTime: '20:20',
          departureAirport: {
            code: 'DAL',
            name: 'Dallas (Love Field)',
            state: 'TX',
            country: null
          },
          stops: [
            {
              airport: {
                name: 'Nashville',
                code: 'BNA',
                state: 'TN',
                country: null
              },
              arrivalTime: null,
              changePlanes: false
            },
            {
              airport: {
                name: 'Chicago (Midway)',
                code: 'MDW',
                state: 'TX',
                country: null
              },
              arrivalTime: '11:50',
              departureTime: '15:50',
              changePlanes: true
            }
          ],
          arrivalTime: '22:25',
          arrivalAirport: {
            code: 'ATL',
            name: 'Atlanta',
            state: 'GA',
            country: null
          },
          isNextDayArrival: false,
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          passengers: [{
            name: 'Yang Zeng'
          }]
        }
      }
    ];

    return this;
  }

  withApplePay(): EarlyBirdConfirmationPageBuilderType {
    this.earlyBirdConfirmationPage.billingInfo = {
      amountApplied: {
        amount: '45.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '441 Main St',
        streetTwo: 'Apt 123',
        location: 'Brooklyn, NY US 57508'
      },
      cardType: 'APPLE_PAY',
      cardHolderName: 'Li Rui',
      lastFourDigits: '1234',
      afpCardType: 'Visa'
    };

    return this;
  }

  withHalfRoundTrip(): EarlyBirdConfirmationPageBuilderType {
    this.earlyBirdConfirmationPage.earlyBirdPurchaseBounds = [
      {
        bound: {
          boundType: 'DEPARTING',
          flights: [
            {
              number: '123',
              wifiOnBoard: false
            },
            {
              number: '456',
              wifiOnBoard: true
            }
          ],
          travelTime: '2h 40m',
          departureDate: '2017-05-20',
          departureTime: '20:20',
          departureAirport: {
            code: 'DAL',
            name: 'Dallas (Love Field)',
            state: 'TX',
            country: null
          },
          stops: [
            {
              airport: {
                name: 'Nashville',
                code: 'BNA',
                state: 'TN',
                country: null
              },
              arrivalTime: null,
              changePlanes: false
            },
            {
              airport: {
                name: 'Chicago (Midway)',
                code: 'MDW',
                state: 'TX',
                country: null
              },
              arrivalTime: '11:50',
              departureTime: '15:50',
              changePlanes: true
            }
          ],
          arrivalTime: '22:25',
          arrivalAirport: {
            code: 'ATL',
            name: 'Atlanta',
            state: 'GA',
            country: null
          },
          isNextDayArrival: false,
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          passengers: [
            {
              name: 'Kevin Thompson'
            }
          ]
        }
      },
      {
        bound: {
          boundType: 'RETURNING',
          flights: [
            {
              number: '123',
              wifiOnBoard: false
            },
            {
              number: '456',
              wifiOnBoard: true
            }
          ],
          travelTime: '2h 40m',
          departureDate: '2017-05-20',
          departureTime: '20:20',
          departureAirport: {
            code: 'DAL',
            name: 'Dallas (Love Field)',
            state: 'TX',
            country: null
          },
          stops: [
            {
              airport: {
                name: 'Nashville',
                code: 'BNA',
                state: 'TN',
                country: null
              },
              arrivalTime: null,
              changePlanes: false
            },
            {
              airport: {
                name: 'Chicago (Midway)',
                code: 'MDW',
                state: 'TX',
                country: null
              },
              arrivalTime: '11:50',
              departureTime: '15:50',
              changePlanes: true
            }
          ],
          arrivalTime: '22:25',
          arrivalAirport: {
            code: 'ATL',
            name: 'Atlanta',
            state: 'GA',
            country: null
          },
          isNextDayArrival: false,
          earlyBirdBoundPrice: {
            amount: '0.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '0.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          passengers: []
        }
      }
    ];

    return this;
  }

  build(): EarlyBirdConfirmationPageType {
    return this.earlyBirdConfirmationPage;
  }
}
