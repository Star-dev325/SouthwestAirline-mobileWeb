// @flow
import { SPLIT_PAY_CALC_FUNDS_HREF } from 'src/airBooking/constants/airBookingConstants';

import type { SplitPayPageResponseType } from 'src/airBooking/flow-typed/applyRapidRewards.types';

const travelFund = {
  _links: {
    removeTravelFund: {
      body: {
        removalTravelFundId: '1'
      },
      href: '/v1/mobile-air-booking/page/change/calculate-funds',
      method: 'PUT',
      xhref: 'string',
      xphref: 'string'
    }
  },
  appliedAmount: {
    amount: '28.93',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  appliedPointsAmount: null,
  displayName: 'Test User',
  errorMessage: null,
  expirationDate: '2021-06-26',
  expirationDateString: 'Expiration: None',
  fundIdentifier: '2XFR63-6659',
  leisureFund: true,
  remainingAmount: {
    amount: '0.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  travelFundType: 'TRAVEL_FUNDS'
};
const splitPayFund = {
  ...travelFund,
  appliedAmount: {
    amount: '117.50',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  appliedPointsAmount: {
    amount: '3,408',
    currencyCode: 'PTS',
    currencySymbol: 'PTS'
  },
  displayName: 'Cash + Points',
  travelFundType: 'SPLIT_PAYMENT',
  pointsRemaining: 'Remaining balance 96,592 pts'
};

export default class SplitPayPageBuilder {
  response: SplitPayPageResponseType = {
    balanceRemaining: {
      amount: '539.78',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    fundsAppliedToken: 'eyJhbGciOiJkaXIiLCJlbmMiO',
    selectedSplitPay: 0,
    splitPayPage: {
      splitPayOptions: [
        {
          fundIdentifier: 'utJ8jH2Cqfwcc69JmyMASg',
          pointsAmount: '6,815 points',
          revenueAmount: '$235.00 OFF',
          splitPayOptionPointsAmount: 6815
        },
        {
          fundIdentifier: 'Bg1rMJZNeQIx7MrPq4lu1g',
          pointsAmount: '3,408 points',
          revenueAmount: '$117.50 OFF',
          splitPayOptionPointsAmount: 3408
        },
        {
          fundIdentifier: 'pk8jBM08iZWDRY7C17wF-Q',
          pointsAmount: '1,704 points',
          revenueAmount: '$58.75 OFF',
          splitPayOptionPointsAmount: 1704
        }
      ],
      termsAndConditions:
        'Cash + Points bookings will not earn Points. Points will not be deducted from your account until you complete your purchase',
      _links: {
        calculateFunds: {
          href: '/v1/mobile-air-booking/page/calculate-funds/SPLIT_PAYMENT',
          method: 'POST',
          xhref: SPLIT_PAY_CALC_FUNDS_HREF,
          body: {
            promoCodeToken: null,
            itineraryPricingToken: 'MnLQ0jgtMAmuN6XpvzV1xA'
          },
          labelText: 'Apply points'
        }
      }
    },
    splitPayMessage: null,
    totals: {
      moneyTotal: {
        amount: '539.78',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsTotal: null
    },
    totalPointsApplied: null
  };

  withTotalPointsApplied() {
    this.response.totalPointsApplied = {
      moneyApplied: {
        amount: '117.50',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsApplied: {
        amount: '3,408',
        currencyCode: 'PTS',
        currencySymbol: 'PTS'
      }
    };

    return this;
  }

  withSplitPayMessage() {
    this.response.splitPayMessage = {
      body: '<b>You do not have enough points to use with cash + points at this time</b> \n\n For more information, visit our <a href="https://mobile.dev10.southwest.com/help" target="_blank">help center</a>',
      header: null,
      icon: 'NONE',
      key: 'NOT_ENOUGH_POINTS',
      textColor: 'DEFAULT'
    };

    return this;
  }

  withAppliedFunds() {
    this.response.travelFunds = [travelFund, splitPayFund];
    this.response.balanceRemaining = {
      ...this.response.balanceRemaining,
      amount: '393.35'
    };
    this.response.totalFunds = {
      amount: '28.93',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    return this;
  }

  withSelectedSplitPayFund() {
    this.response.selectedSplitPay = 3262;

    return this;
  }

  build(): SplitPayPageResponseType {
    return this.response;
  }
}
