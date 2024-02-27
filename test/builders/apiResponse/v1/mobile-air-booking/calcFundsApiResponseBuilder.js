export default class CalcFundsApiResponseBuilder {
  constructor() {
    this.response = {
      travelFunds: [
        {
          expirationDate: '2020-2-20',
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
        }
      ],
      balanceRemaining: {
        amount: '408.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totalFunds: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totals: {
        moneyTotal: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pointsTotal: null
      },
      fundsAppliedToken: 'funds-token'
    };
  }

  withTwoFundResponse() {
    this.response = {
      travelFunds: [
        {
          expirationDate: '2020-2-20',
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
          _links: {
            removeTravelFund: {
              body: {
                removalTravelFundId: '1'
              },
              href: '/fake/path',
              method: 'PUT'
            }
          }
        },
        {
          expirationDate: '2021-1-10',
          travelFundType: 'TRAVEL_FUNDS',
          displayName: 'Hank Hill',
          fundIdentifier: '123ABC',
          errorMessage: null,
          appliedAmount: {
            amount: '123.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          remainingAmount: {
            amount: '67.89',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: {
            removeTravelFund: {
              body: {
                removalTravelFundId: '2'
              },
              href: '/fake/path',
              method: 'PUT'
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
        amount: '408.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totals: {
        moneyTotal: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        pointsTotal: null
      },
      fundsAppliedToken: 'funds-token'
    };

    return this;
  }
  withOneFundSplitPayResponse() {
    this.response = {
      travelFunds: [
        {
          expirationDateString: null,
          travelFundType: 'SPLIT_PAYMENT',
          displayName: 'Cash + Points',
          fundIdentifier: '601704552',
          errorMessage: null,
          appliedAmount: {
            amount: '75.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          appliedPointsAmount: {
            amount: '5,250',
            currencyCode: 'PTS',
            currencySymbol: 'PTS'
          },
          pointsRemaining: 'Remaining balance 141,292 pts',
          remainingAmount: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: null
        }
      ],
      balanceRemaining: {
        amount: '322.35',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totalPointsApplied: {
        pointsApplied: {
          amount: '5,250',
          currencyCode: 'PTS',
          currencySymbol: 'PTS'
        },
        moneyApplied: {
          amount: '75.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      totalFunds: null,
      totals: {
        pointsTotal: null,
        moneyTotal: {
          amount: '397.35',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      fundsAppliedToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0',
      selectedSplitPay: 5250,
      taxesAndFees: [
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
          code: 'US',
          description: 'U.S. Transportation Tax',
          fee: {
            amount: '20.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          code: 'ZP',
          description: 'U.S. Flight Segment Tax',
          fee: {
            amount: '9.60',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          code: 'XF',
          description: 'U.S. Passenger Facility Chg',
          fee: {
            amount: '9.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      ],
      termsAndConditions: 'Cash + Points'
    };

    return this;
  }

  withTwoFundSplitPayResponse() {
    this.response = {
      travelFunds: [
        {
          expirationDate: '2040-12-31',
          expirationDateString: 'Expiration: None',
          travelFundType: 'TRAVEL_FUNDS',
          displayName: 'Alistprefcompanion Jones',
          fundIdentifier: '4XTCF7-9416',
          errorMessage: null,
          leisureFund: true,
          appliedAmount: {
            amount: '45.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          appliedPointsAmount: null,
          remainingAmount: {
            amount: '0.00',
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
          expirationDateString: null,
          travelFundType: 'SPLIT_PAYMENT',
          displayName: 'Cash + Points',
          fundIdentifier: '601704552',
          errorMessage: null,
          appliedAmount: {
            amount: '75.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          appliedPointsAmount: {
            amount: '5,250',
            currencyCode: 'PTS',
            currencySymbol: 'PTS'
          },
          pointsRemaining: 'Remaining balance 141,292 pts',
          remainingAmount: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          _links: null
        }
      ],
      balanceRemaining: {
        amount: '322.35',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      totalPointsApplied: {
        pointsApplied: {
          amount: '5,250',
          currencyCode: 'PTS',
          currencySymbol: 'PTS'
        },
        moneyApplied: {
          amount: '75.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      totalFunds: null,
      totals: {
        pointsTotal: null,
        moneyTotal: {
          amount: '397.35',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      fundsAppliedToken: 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0',
      selectedSplitPay: 5250,
      taxesAndFees: [
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
          code: 'US',
          description: 'U.S. Transportation Tax',
          fee: {
            amount: '20.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          code: 'ZP',
          description: 'U.S. Flight Segment Tax',
          fee: {
            amount: '9.60',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        {
          code: 'XF',
          description: 'U.S. Passenger Facility Chg',
          fee: {
            amount: '9.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        }
      ],
      termsAndConditions: 'Cash + Points'
    };

    return this;
  }

  build() {
    return this.response;
  }
}
