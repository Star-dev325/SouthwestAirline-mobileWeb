module.exports = {
  travelFunds: [
    {
      expirationDate: '2020-08-27',
      travelFundType: 'TRAVEL_FUNDS',
      displayName: 'Not Ben Lacy',
      fundIdentifier: 'ABC123-9215',
      errorMessage:
        'The name attached to this fund does not match the Passenger name. Please edit Passenger name or remove the fund.',
      appliedAmount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      remainingAmount: {
        amount: '1,393.56',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      _links: null
    }
  ],
  balanceRemaining: {
    amount: '83.00',
    currencyCode: 'USD',
    currencySymbol: '$'
  },
  totalFunds: {
    amount: '0.00',
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
