import _ from 'lodash';

export default class ChangeApplyTravelFundsPageBuilder {
  constructor() {
    this.response = {
      travelFunds: [
        {
          expirationDate: '2020-02-20',
          travelFundType: 'TRAVEL_FUNDS',
          displayName: 'Hank Hill',
          fundIdentifier: 'ABC123',
          errorMessage: null,
          appliedAmount: {
            amount: '408.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          remainingAmount: {
            amount: '30.70',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: null
        },
        {
          expirationDate: '2021-02-27',
          travelFundType: 'LUV_VOUCHER',
          displayName: 'Southwest LUV Voucher',
          fundIdentifier: 'Voucher 3130',
          errorMessage: null,
          appliedAmount: {
            amount: '57.70',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          remainingAmount: {
            amount: '142.30',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: {
            removeTravelFund: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'PUT',
              body: {
                removalTravelFundId: '1'
              }
            }
          }
        },
        {
          travelFundType: 'GIFT_CARD',
          displayName: 'Southwest Gift Card',
          fundIdentifier: 'XXXXXXXXXXXX-3916',
          errorMessage: 'Funds not applied',
          appliedAmount: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          remainingAmount: {
            amount: '500.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: {
            removeTravelFund: {
              href: '/v1/mobile-air-booking/page/change/calculate-funds',
              method: 'PUT',
              body: {
                removalTravelFundId: '2'
              }
            }
          }
        }
      ],
      balanceRemaining: {
        amount: '91.02',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totalFunds: {
        amount: '408.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totals: {
        moneyTotal: {
          amount: '500.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pointsTotal: null
      },
      fundsAppliedToken: 'funds-token'
    };
  }

  withNoTFApplied() {
    _.set(this.response, 'travelFunds', []);
    _.set(this.response, 'balanceRemaining', null);
    _.set(this.response, 'totalFunds', null);
    _.set(this.response, 'totals', null);

    return this;
  }

  withDollarsUpgrade() {
    _.set(this.response, 'totals.moneyTotal', {
      amount: '500.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    });
    _.set(this.response, 'balanceRemaining', {
      amount: '91.02',
      currencyCode: 'USD',
      currencySymbol: '$'
    });

    return this;
  }

  withPointsUpgrade() {
    _.set(this.response, 'totals.pointsTotal', {
      item: 'Amount Due',
      amount: '7,000',
      currencyCode: 'PTS',
      currencySymbol: null
    });

    return this;
  }

  withPointsDowngrade() {
    _.set(this.response, 'totals.pointsTotal', {
      item: 'Credit',
      amount: '8,000',
      currencyCode: 'PTS',
      currencySymbol: null
    });

    return this;
  }

  withNoExpirationDateTextFundsApplied() {
    this.response.travelFunds[0].expirationDateString = 'Expiration: None';

    return this;
  }

  build() {
    return this.response;
  }
}
