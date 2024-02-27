const _ = require('lodash');

const FlightProductItemBuilder = require('test/builders/model/flightProductItemBuilder');

const dollarsUpgradeJsonData = require('mocks/templates/reservation/CHFRDU/prices');
const dollarsEvenJsonData = require('mocks/templates/reservation/CHFRDE/prices');
const dollarsUpgradeAfterDowngradeAndEnoughRTF = require('mocks/templates/reservation/9HW9MM/prices');
const dollarsSODAUpgradeJsonData = require('mocks/templates/reservation/SODAUP/prices');
const dollarsSODADowngradeJsonData = require('mocks/templates/reservation/SODADN/prices');
const dollarsUpgradeAfterDowngradeAndNotEnoughRTF = require('mocks/templates/reservation/9HW9ML/prices');
const dollarsEvenExchangeAfterDowngrade = require('mocks/templates/reservation/9HW9MN/prices');
const dollarsUpgradeWithFareProtection = require('mocks/templates/reservation/CHFOUF/prices');

class AirChangePriceApiJsonBuilder {
  constructor() {
    this.numberOfPassengers = 1;
    this.originalTicket = {};
    this.actionableOriginalTicket = {};
    this.priceDifference = {};
    this.pointsDifference = {};
    this.products = [];
    this.suppressChangeDisclaimerMessage = false;
  }

  withPointsDowngrade() {
    this.priceSearchTotals = {
      priceTotalAmountCents: 560,
      priceTotalAmountPoints: 26538,
      requestedAmountCents: 0,
      requestedAmountPoints: 26538,
      pointsPriceDetails: {
        redemptionPoints: 26538,
        discountedRedemptionPoints: 26538,
        segmentFees: [
          {
            passengerFacilityChargeCents: 0,
            securityFeeCents: 560,
            segmentFeeCents: 0
          }
        ]
      }
    };
    this.actionableOriginalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.originalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = {
      amountDue: 0,
      refundAmount: 11962
    };

    return this;
  }

  withDollarsFirstDowngrade() {
    this.priceSearchTotals = {
      priceTotalAmountCents: 96047,
      currencyPriceDetails: {
        baseFareCents: 85141,
        taxCents: 10906,
        discountedBaseFareCents: 85141,
        segmentFees: [
          {
            passengerFacilityChargeCents: 1800,
            securityFeeCents: 1120,
            segmentFeeCents: 1600
          }
        ]
      }
    };
    this.originalTicket = {
      availableCents: 262992,
      availablePoints: 0
    };
    this.actionableOriginalTicket = {
      availableCents: 262992,
      availablePoints: 0
    };
    this.priceDifference = {
      actionableRefundAmount: { nonrefundableAmountCents: 0, refundableAmountCents: 10898 },
      priceChangeType: 'OVERAGE',
      projectedTravelFundsAmountCents: 10898,
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 10898,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = undefined;

    return this;
  }

  withDollarsDowngrade() {
    this.priceSearchTotals = {
      priceTotalAmountCents: 96047,
      currencyPriceDetails: {
        baseFareCents: 85141,
        taxCents: 10906,
        discountedBaseFareCents: 85141,
        segmentFees: [
          {
            passengerFacilityChargeCents: 1800,
            securityFeeCents: 1120,
            segmentFeeCents: 1600
          }
        ]
      }
    };
    this.originalTicket = {
      availableCents: 262992,
      availablePoints: 0
    };
    this.actionableOriginalTicket = {
      availableCents: 202992,
      availablePoints: 0
    };
    this.priceDifference = {
      actionableRefundAmount: { nonrefundableAmountCents: 0, refundableAmountCents: 10898 },
      priceChangeType: 'OVERAGE',
      projectedTravelFundsAmountCents: 70898,
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 70898,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = undefined;

    return this;
  }

  withDollarsMixDowngrade() {
    this.withDollarsDowngrade();
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 400,
        nonrefundableAmountCents: 200
      },
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 400,
        nonrefundableAmountCents: 200
      }
    };

    return this;
  }

  withDollarsChangeHasNoAmountDueAndNothingRefundable() {// For probably SODA case
    this.withDollarsDowngrade();

    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };

    return this;
  }

  withDollarsUpgradeAfterDowngradeAndEnoughRTF() {
    _.merge(this, dollarsUpgradeAfterDowngradeAndEnoughRTF);

    return this;
  }

  withDollarsUpgradeAfterDowngradeAndUseAllRTF() {
    _.merge(this, dollarsUpgradeAfterDowngradeAndEnoughRTF);

    this.priceDifference.projectedTravelFundsAmountCents = 0;

    return this;
  }

  withDollarsUpgradeAfterDowngradeAndNotEnoughRTF() {
    _.merge(this, dollarsUpgradeAfterDowngradeAndNotEnoughRTF);

    return this;
  }

  withDollarEvenExchangeAfterDowngrade() {
    _.merge(this, dollarsEvenExchangeAfterDowngrade);

    return this;
  }

  withAmountDueCents(amountDueCents) {
    this.priceDifference.amountDueCents = amountDueCents;

    return this;
  }

  withPointsUpgrade() {
    this.priceSearchTotals = {
      priceTotalAmountCents: 560,
      priceTotalAmountPoints: 26538,
      requestedAmountCents: 0,
      requestedAmountPoints: 26538,
      pointsPriceDetails: {
        redemptionPoints: 26538,
        discountedRedemptionPoints: 26538,
        segmentFees: [
          {
            passengerFacilityChargeCents: 0,
            securityFeeCents: 560,
            segmentFeeCents: 0
          }
        ]
      }
    };
    this.actionableOriginalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.originalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = {
      amountDue: 14578,
      refundAmount: 0
    };

    return this;
  }

  withPointsUpgradeAndNeedRefundAmountCents() {
    this.priceSearchTotals = {
      priceTotalAmountCents: 560,
      priceTotalAmountPoints: 41652,
      requestedAmountCents: 0,
      requestedAmountPoints: 41652,
      pointsPriceDetails: {
        redemptionPoints: 41652,
        discountedRedemptionPoints: 41652,
        segmentFees: [
          {
            passengerFacilityChargeCents: 0,
            securityFeeCents: 560,
            segmentFeeCents: 0
          }
        ]
      }
    };
    this.actionableOriginalTicket = {
      availableCents: 1120,
      availablePoints: 29700
    };
    this.originalTicket = {
      availableCents: 1120,
      availablePoints: 29700
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 560,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 560,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = {
      amountDue: 11952,
      refundAmount: 0
    };

    return this;
  }

  withPointsDowngradeAndNeedAmountDueCents() {
    this.products = [{
      productId: 'WXxBbWVyaWNhL0xvc19BbmdlbGVzfDIwMTYwNTExMDUzMCwyMDE2MDUxMTA2MzV8TEFTLUxBWHxXTjM5MDB8WXxGRlB8NzNX',
      bookingCode: 'Y',
      totalCents: 560,
      pointsPriceDetails: {
        redemptionPoints: 20826,
        discountedRedemptionPoints: 20826,
        segmentFees: [{
          passengerFacilityChargeCents: 0,
          securityFeeCents: 560,
          segmentFeeCents: 0
        }]
      }
    }, {
      productId: 'S3xBbWVyaWNhL0xvc19BbmdlbGVzfDIwMTYwNTEyMDgxNSwyMDE2MDUxMjA5MjB8TEFYLUxBU3xXTjIwNzB8S3xGRlB8',
      bookingCode: 'K',
      totalCents: 560,
      pointsPriceDetails: {
        redemptionPoints: 26777,
        discountedRedemptionPoints: 26777,
        segmentFees: [{
          passengerFacilityChargeCents: 0,
          securityFeeCents: 560,
          segmentFeeCents: 0
        }]
      }
    }];
    this.actionableOriginalTicket = {
      availableCents: 1120,
      availablePoints: 29700
    };
    this.originalTicket = {
      availableCents: 1120,
      availablePoints: 29700
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 560,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = {
      amountDue: 0,
      refundAmount: 3400
    };

    return this;
  }

  withDollarsUpgrade() {
    _.merge(this, dollarsUpgradeJsonData);
    this.pointsDifference = undefined;

    return this;
  }

  withDollarsSODAUpgrade() {
    _.merge(this, dollarsSODAUpgradeJsonData);
    this.pointsDifference = undefined;
    this.priceSearchTotals.verifyPriceChange = true;

    return this;
  }

  withDollarsSODADowngrade() {
    _.merge(this, dollarsSODADowngradeJsonData);
    this.pointsDifference = undefined;

    return this;
  }

  withDollarsFareProtection() {
    this.priceSearchTotals = {
      priceTotalAmountCents: 21298,
      priceTotalAmountPoints: 0,
      requestedAmountCents: 21298,
      requestedAmountPoints: 0,
      currencyPriceDetails: {
        baseFareCents: 20000,
        taxCents: 1298,
        discountedBaseFareCents: 20000,
        segmentFees: [
          {
            passengerFacilityChargeCents: 1000,
            securityFeeCents: 200,
            segmentFeeCents: 98
          }
        ]
      }
    };
    this.actionableOriginalTicket = {
      availableCents: 26299,
      availablePoints: 0
    };
    this.originalTicket = {
      availableCents: 26299,
      availablePoints: 0
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 0,
      changeFareProtectionCents: 100,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = undefined;

    return this;
  }

  withDollarsUpgradeFareProtection() {
    _.merge(this, dollarsUpgradeWithFareProtection);

    return this;
  }

  withDollarsEvenExchange() {
    _.merge(this, dollarsEvenJsonData);
    this.pointsDifference = undefined;

    return this;
  }

  withPointsEvenExchange() {
    this.products = [
      {
        totalCents: 560,
        pointsPriceDetails: {
          redemptionPoints: 26538,
          discountedRedemptionPoints: 26538,
          segmentFees: [
            {
              passengerFacilityChargeCents: 0,
              securityFeeCents: 560,
              segmentFeeCents: 0
            },
            {
              passengerFacilityChargeCents: 0,
              securityFeeCents: 0,
              segmentFeeCents: 0
            }
          ]
        }
      }
    ];
    this.actionableOriginalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.originalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = {
      amountDue: 0,
      refundAmount: 0
    };

    return this;
  }

  withNumberOfPassengers(numberOfPassengers) {
    this.numberOfPassengers = numberOfPassengers;

    return this;
  }

  roundTripWithPointsDowngrade() {
    this.priceSearchTotals = {
      priceTotalAmountCents: 1120,
      priceTotalAmountPoints: 53076,
      requestedAmountCents: 1120,
      requestedAmountPoints: 53076,
      pointsPriceDetails: {
        redemptionPoints: 53076,
        discountedRedemptionPoints: 53076,
        segmentFees: [
          {
            passengerFacilityChargeCents: 0,
            securityFeeCents: 560,
            segmentFeeCents: 0
          }
        ]
      }
    };
    this.actionableOriginalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.originalTicket = {
      availableCents: 560,
      availablePoints: 38500
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 0,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = {
      amountDue: 0,
      refundAmount: 11962
    };

    return this;
  }

  withAdultInboundOnly() {
    this.products = [
      new FlightProductItemBuilder().build()
    ];
    this.actionableOriginalTicket = {
      availableCents: 26299,
      availablePoints: 0
    };
    this.originalTicket = {
      availableCents: 26299,
      availablePoints: 0
    };
    this.priceDifference = {
      actionableRefundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      },
      amountDueCents: 4875,
      refundAmount: {
        refundableAmountCents: 0,
        nonrefundableAmountCents: 0
      }
    };
    this.pointsDifference = undefined;

    return this;
  }

  withChangeDisclaimerMessageSuppressed() {
    this.suppressChangeDisclaimerMessage = true;

    return this;
  }

  build() {
    const priceProducts = {
      priceSearchTotals: this.priceSearchTotals,
      numberOfPassengers: this.numberOfPassengers,
      priceDifference: this.priceDifference,
      originalTicket: this.originalTicket,
      actionableOriginalTicket: this.actionableOriginalTicket,
      suppressChangeDisclaimerMessage: this.suppressChangeDisclaimerMessage
    };

    !_.isEmpty(this.pointsDifference) && (priceProducts.pointsDifference = this.pointsDifference);

    return priceProducts;
  }
}

module.exports = AirChangePriceApiJsonBuilder;
