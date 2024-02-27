// @flow
import _ from 'lodash';
import type { ChangeType, FareSummary } from 'src/airChange/flow-typed/airChange.types';
import type { PriceTotalPropsType } from 'src/shared/components/priceTotal';

type PriceTotalType = PriceTotalPropsType & {
  change?: ChangeType,
  fareSummary?: FareSummary,
  isPointsChange?: boolean
};

export default class PriceTotalBuilder {
  priceTotal: PriceTotalType = {
    totals: {
      adultFare: {
        baseFare: {
          discount: null,
          fare: {
            amount: '204.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          totalBaseFare: {
            amount: '204.45',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        },
        paxTypeTotal: {
          moneyTotal: {
            amount: '233.98',
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
            amount: '233.98',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengerCount: 1,
          points: null
        }
      },
      moneyTotal: {
        amount: '233.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      pointsTotal: null
    },
    isPointsChange: false
  };

  withMoneyTotal(totalAmount: string): PriceTotalBuilder {
    this.priceTotal.totals.moneyTotal = {
      amount: totalAmount,
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    return this;
  }

  withLapChild(): PriceTotalBuilder {
    this.priceTotal.totals.infantFare = {
      baseFare: {
        discount: null,
        fare: {
          amount: '104.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        totalBaseFare: {
          amount: '104.45',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      paxTypeTotal: {
        moneyTotal: {
          amount: '133.98',
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
          amount: '133.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        passengerCount: 1,
        points: null
      }
    };

    return this;
  }

  withEarlyBirdPriceDetails(): PriceTotalBuilder {
    _.set(this, 'priceTotal.totals.adultFare.earlyBirdPriceDetails', [
      {
        description: 'EarlyBird Check-In® (STL - HOU)',
        purchasedCount: 1,
        unitPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        total: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      }
    ]);

    return this;
  }

  withPointsTotal(): PriceTotalBuilder {
    this.priceTotal.totals.pointsTotal = {
      amount: '51,235',
      currencyCode: 'PTS'
    };

    return this;
  }

  withoutEarlyBirdPrice(): PriceTotalBuilder {
    this.priceTotal.totals = _.omit(this.priceTotal.totals, 'adultFare.earlyBirdPriceDetails');

    return this;
  }

  withEvenExchange(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      travelFunds: null,
      remainingTravelFunds: null,
      nonRefundable: null,
      refundable: null,
      totalRefundability: null,
      newAmountDue: {
        item: 'Amount due',
        fare: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalDueNow: null
    };
    this.priceTotal.change = {
      evenExchange: true,
      upGrade: false,
      downGrade: false
    };

    return this;
  }

  withUpgrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '596.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      nonRefundable: null,
      refundable: null,
      travelFunds: null,
      remainingTravelFunds: null,
      totalRefundability: null,
      newAmountDue: {
        item: 'Amount due',
        fare: {
          amount: '30.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalDueNow: null
    };
    this.priceTotal.change = {
      evenExchange: false,
      upGrade: true,
      downGrade: false
    };

    return this;
  }

  withRefundableDowngrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '506.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      totalRefundability: {
        item: 'Credit',
        fare: {
          amount: '60.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      nonRefundable: null,
      refundable: {
        item: 'Credit',
        fare: {
          amount: '60.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalDueNow: null,
      newAmountDue: null
    };
    this.priceTotal.change = {
      evenExchange: false,
      upGrade: false,
      downGrade: true
    };

    return this;
  }

  withNonRefundableDowngrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '506.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      totalRefundability: {
        item: `Credit`,
        fare: {
          amount: '60.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      travelFunds: null,
      remainingTravelFunds: null,
      nonRefundable: {
        item: `Credit`,
        fare: {
          amount: '60.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      refundable: null,
      totalDueNow: null,
      newAmountDue: null
    };
    this.priceTotal.change = {
      evenExchange: false,
      upGrade: false,
      downGrade: true
    };

    return this;
  }

  withRefundableAndNonRefundableDowngrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip cost',
        fare: {
          amount: '566.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      newTripCost: {
        item: 'New trip cost',
        fare: {
          amount: '506.58',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      tax: null,
      travelFunds: null,
      remainingTravelFunds: null,
      nonRefundable: {
        item: `Credit`,
        fare: {
          amount: '30.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      refundable: {
        item: 'Credit',
        fare: {
          amount: '30.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalRefundability: {
        item: 'Credit',
        fare: {
          amount: '60.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      totalDueNow: null,
      newAmountDue: null
    };
    this.priceTotal.change = {
      evenExchange: false,
      upGrade: false,
      downGrade: true
    };

    return this;
  }

  withPointUpgrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '15,149', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      tax: null,
      travelFunds: null,
      remainingTravelFunds: null,
      nonRefundable: null,
      refundable: null,
      totalRefundability: null,
      newAmountDue: {
        item: 'Amount due',
        fare: { amount: '12,335', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      totalDueNow: null
    };
    this.priceTotal.change = {
      evenExchange: false,
      upGrade: true,
      downGrade: false
    };
    this.priceTotal.isPointsChange = true;

    return this;
  }

  withPointDowngrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '2,479', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      tax: null,
      travelFunds: null,
      remainingTravelFunds: null,
      nonRefundable: null,
      refundable: {
        item: `Credit`,
        fare: { amount: '335', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      totalRefundability: {
        item: `Credit`,
        fare: { amount: '335', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      newAmountDue: null,
      totalDueNow: null
    };
    this.priceTotal.change = {
      evenExchange: false,
      upGrade: false,
      downGrade: true
    };
    this.priceTotal.isPointsChange = true;

    return this;
  }

  withPointEvenExchange(): PriceTotalBuilder {
    this.priceTotal.fareSummary = {
      originalTripCost: {
        item: 'Original trip total',
        fare: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      newTripCost: {
        item: 'New trip total',
        fare: { amount: '2,814', currencyCode: 'PTS', currencySymbol: null },
        tax: { amount: '5.60', currencyCode: 'USD', currencySymbol: '$' }
      },
      tax: null,
      travelFunds: null,
      remainingTravelFunds: null,
      nonRefundable: null,
      refundable: null,
      totalRefundability: null,
      newAmountDue: {
        item: 'Amount due',
        fare: { amount: '0', currencyCode: 'PTS', currencySymbol: null },
        tax: null
      },
      totalDueNow: null
    };
    this.priceTotal.change = {
      evenExchange: true,
      upGrade: false,
      downGrade: false
    };
    this.priceTotal.isPointsChange = true;

    return this;
  }

  withTaxUpgrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = _.merge({}, this.priceTotal.fareSummary, {
      newTripCost: {
        tax: { amount: '8.40', currencyCode: 'USD', currencySymbol: '$' }
      },
      newAmountDue: {
        tax: { amount: '2.80', currencyCode: 'USD', currencySymbol: '$' },
        item: 'Amount due'
      }
    });

    return this;
  }

  withSplitPayDowngrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = _.merge(this.priceTotal.fareSummary, {
      newTripCost: {
        item: 'New trip Total',
        fare: {
          amount: '107.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      originalTripCost: {
        item: 'Original trip Total',
        fare: {
          amount: '252.65',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        tax: null
      },
      refundable: {
        fare: {
          amount: '2,257',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        item: 'Credit',
        tax: {
          amount: '132.05',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      remainingTravelFunds: null,
      remainingTravelFundsDisclaimerText: null,
      totalRefundability: {
        fare: {
          amount: '2,257',
          currencyCode: 'PTS',
          currencySymbol: null
        },
        item: 'Credit',
        tax: {
          amount: '132.05',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      },
      totalDueNow: null,
      travelFunds: null,
      youOwe: null
    });
    this.priceTotal.change = {
      evenExchange: false,
      upGrade: false,
      downGrade: true
    };

    return this;
  }

  withTaxDowngrade(): PriceTotalBuilder {
    this.priceTotal.fareSummary = _.merge(this.priceTotal.fareSummary, {
      newTripCost: {
        tax: { amount: '4.20', currencyCode: 'USD', currencySymbol: '$' }
      },
      totalRefundability: {
        tax: { amount: '1.40', currencyCode: 'USD', currencySymbol: '$' },
        item: 'Credit'
      }
    });

    return this;
  }

  build(): PriceTotalType {
    return { ...this.priceTotal };
  }
}
