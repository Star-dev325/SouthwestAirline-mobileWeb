// @flow
import type { PriceDetailsPropsType } from 'src/airBooking/components/priceDetails';
import type { PassengerFare, MoneyTotalType } from 'src/shared/flow-typed/shared.types';
import type { EarlyBirdEligibility } from 'src/airBooking/flow-typed/airBooking.types';

import EarlyBirdEligibilityBuilder from 'test/builders/model/earlyBirdEligibilityBuilder';

export default class priceDetailsBuilder {
  adultPassengerType: string = 'Passenger';
  lapChildPassengerType: string = 'Lap Child';
  adultFare: PassengerFare = {
    baseFare: {
      discount: {
        amount: '4.45',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      fare: {
        amount: '204.45',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totalBaseFare: {
        amount: '200.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    },
    paxTypeTotal: {
      moneyTotal: {
        amount: '228.53',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsTotal: null
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
      money: {
        amount: '228.53',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      passengerCount: 1,
      points: null
    }
  };
  moneyTotal: MoneyTotalType = {
    amount: '228.53',
    currencyCode: 'USD',
    currencySymbol: '$'
  };
  earlyBirdEligibility: ?EarlyBirdEligibility = null;

  withoutDiscount(): PriceDetailsPropsType {
    this.adultFare.baseFare.discount = null;

    return this;
  }

  withoutTotalBaseFare(): PriceDetailsPropsType {
    this.adultFare.baseFare.totalBaseFare = null;

    return this;
  }

  withPoint(): PriceDetailsPropsType {
    this.adultFare = {
      baseFare: {
        fare: { amount: '51,235', currencyCode: 'PTS' },
        discount: { amount: '1,235', currencyCode: 'PTS' },
        totalBaseFare: { amount: '50,000', currencyCode: 'PTS' }
      },
      taxesAndFees: [{
        code: 'US',
        description: 'Excise Taxes',
        fee: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }
      }, {
        code: 'US',
        description: 'Excise Taxes',
        fee: { amount: '0.00', currencyCode: 'USD', currencySymbol: '$' }
      }, {
        code: 'AY',
        description: 'Security Fee',
        fee: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      }],
      totalPerPassenger: {
        points: { amount: '100,000', currencyCode: 'PTS' },
        money: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' },
        passengerCount: 2
      },
      paxTypeTotal: {
        moneyTotal: { amount: '11.20', currencyCode: 'USD', currencySymbol: '$' },
        pointsTotal: { amount: '100,000', currencyCode: 'PTS' }
      }
    };

    return this;
  }

  withEarlyBird(): PriceDetailsPropsType {
    this.adultFare.earlyBirdPriceDetails = [{
      purchasedCount: 1,
      description: 'EarlyBird Check-In® (ATL/MDW)',
      unitPrice: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' },
      total: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' }
    }];

    return this;
  }

  withEBPurchasedCountIsZero(): PriceDetailsPropsType {
    this.adultFare.earlyBirdPriceDetails = [{
      purchasedCount: 0,
      description: 'EarlyBird Check-In® (ATL/MDW)',
      unitPrice: { amount: '15.00', currencyCode: 'USD', currencySymbol: '$' },
      total: { amount: '00.00', currencyCode: 'USD', currencySymbol: '$' }
    }];

    return this;
  }

  withEarlyBirdEligibility(amount: string = '15.00', adultPassengerReference: Array<string> = ['3']): PriceDetailsPropsType {
    this.earlyBirdEligibility = new EarlyBirdEligibilityBuilder().withEarlyBirdEligibility(amount, adultPassengerReference).build();

    return this;
  }

  build(): PriceDetailsPropsType {
    return {
      adultPassengerType: this.adultPassengerType,
      adultFare: this.adultFare,
      lapChildPassengerType: this.lapChildPassengerType,
      earlyBirdEligibility: this.earlyBirdEligibility,
      showEarlyBirdInFareBreakdown: true,
      moneyTotal: this.moneyTotal
    };
  }
}
