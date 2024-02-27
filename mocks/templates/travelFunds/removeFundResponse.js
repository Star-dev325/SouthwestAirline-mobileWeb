module.exports = {
  travelFunds: [
    {
      expirationDate: '2020-12-31',
      travelFundType: 'LUV_VOUCHER',
      displayName: 'Southwest LUV Voucher',
      fundIdentifier: 'Voucher 2398',
      errorMessage: null,
      appliedAmount: {
        amount: '55.81',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '144.19',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: {
        removeTravelFund: {
          href: '/v1/mobile-air-booking/page/calculate-funds',
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
      fundIdentifier: 'XXXXXXXXXXXX-2619',
      errorMessage: null,
      appliedAmount: {
        amount: '27.19',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '32.81',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: {
        removeTravelFund: {
          href: '/v1/mobile-air-booking/page/calculate-funds',
          method: 'PUT',
          body: {
            removalTravelFundId: '2'
          }
        }
      }
    }
  ],
  balanceRemaining: {
    amount: '0.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  totalFunds: {
    amount: '83.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  totals: {
    pointsTotal: null,
    moneyTotal: {
      amount: '83.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    }
  },
  fundsAppliedToken: 'funds-token'
};
