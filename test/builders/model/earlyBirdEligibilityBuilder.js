// @flow
import _ from 'lodash';
import type { EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';

export default class earlyBirdEligibilityBuilder {
  earlyBirdEligibility: EarlyBirdEligibility = {
    adultProductsCount: '1',
    bounds: [
      {
        originDestinationAirports: 'DAL - HOU',
        flightNumbers: '#2674/2789',
        passengersGroups: [
          {
            canPurchaseEarlyBird: true,
            decisionDescription: '1 Adult',
            fareType: 'Wanna Get Away',
            price: {
              amount: '15.00',
              currencyCode: 'USD',
              currencySymbol: '$'
            },
            isAlist: false
          }
        ],
        isEligible: true,
        _meta: {
          products: {
            adult: {
              productId: 'eyJwcm9kdWN0SWQiOiJXR0F8QURUfE1MQVZETlJPLE0sQUxCLERBTCwyMDE4LTA3LTA4VDA2OjE1LTA0OjAwLDIwMTgtMDctMDhUMTI6MTAtMDU6MDAsV04sV04sMjY3NCw3M0h8TUxBVkROUk8sTSxEQUwsQVVTLDIwMTgtMDctMDhUMTU6MDUtMDU6MDAsMjAxOC0wNy0wOFQxNjowMC0wNTowMCxXTixXTiwyNzg5LDczVyIsInF1b3RlZFByaWNlIjoiMTk5LjkwIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsImZhcmVUeXBlIjoiV0dBIiwiZmFyZVByaWNpbmdUeXBlIjoiQURVTFQifQ==',
              passengerReference: ['3'],
              fare: {
                baseFare: {
                  amount: '15.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                totalTaxesAndFees: {
                  amount: '0.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                },
                totalFare: {
                  amount: '15.00',
                  currencyCode: 'USD',
                  currencySymbol: '$'
                }
              }
            }
          }
        }
      }
    ],
    totalPrice: {
      amount: '60.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    unitPrice: {
      amount: '15.00',
      currencyCode: 'USD',
      currencySymbol: '$',
      description: 'per passenger, each way'
    },
    ineligibilityReasons: [],
    _meta: {
      passengers: [
        {
          name: {
            firstName: 'Harry',
            lastName: 'Potter'
          },
          passengerReference: '2',
          accountNumber: '601534942',
          gender: 'M',
          dateOfBirth: '1983-04-16'
        }
      ]
    }
  };

  withEarlyBirdEligibility(amount: string = '15.00', adultPassengerReference: Array<string> = ['3']): * {
    const unitPrice = { amount, currencyCode: 'USD', currencySymbol: '$' };

    _.set(this, 'earlyBirdEligibility.totalPrice.amount', amount);
    !!adultPassengerReference && _.set(this, 'earlyBirdEligibility._meta.products.adult.fare.totalFare', unitPrice);
    _.set(this, 'earlyBirdEligibility.bounds[0]._meta.products.adult.passengerReference', adultPassengerReference);

    return this;
  }

  withEarlyBirdEligibilityNotEligibleToPurchase(): * {
    _.set(this, 'earlyBirdEligibility.bounds[0].isEligible', false);

    return this;
  }

  withoutPassengerReference(): * {
    this.earlyBirdEligibility = _.omit(this.earlyBirdEligibility, 'bounds[0]._meta.products.adult.passengerReference');

    return this;
  }

  build(): EarlyBirdEligibility {
    return this.earlyBirdEligibility;
  }
}
