module.exports = {
  travelFunds: [
    {
      expirationDate: '2020-08-27',
      travelFundType: 'TRAVEL_FUNDS',
      displayName: 'Ben Lacy',
      fundIdentifier: 'JO3GHK-9249',
      errorMessage: null,
      appliedAmount: {
        amount: '83.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '1,306.36',
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
      errorMessage: 'Funds not applied',
      appliedAmount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '60.00',
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
