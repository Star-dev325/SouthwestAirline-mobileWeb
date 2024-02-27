const PassengerRefundInfoBuilder = require('test/builders/apiResponse/passengerRefundInfoBuilder');

class AirChangePurchaseApiJsonBuilder {
  constructor() {
    this.recordLocator = 'RHFNSW';
    this.accountNumber = '8798157375';
    this.travelFunds = {
      amountCents: 0
    };
  }

  withPointsUpgrade() {
    this.pointsRefund = {
      accountNumber: this.accountNumber,
      amountPoints: 4027
    };

    return this;
  }

  withPointsDowngrade() {
    this.pointsRefund = {
      accountNumber: this.accountNumber,
      amountPoints: 0
    };

    return this;
  }

  withPointsEvenExchange() {
    this.pointsRefund = {
      accountNumber: this.accountNumber,
      amountPoints: 0
    };

    return this;
  }

  withDollarsUpgrade() {
    this.travelFunds = {
      amountCents: 0
    };

    return this;
  }

  withDollarsDowngrade() {
    this.travelFunds = {
      amountCents: 13551,
      perPassenger: [
        new PassengerRefundInfoBuilder().withName('Mickey', 'Mouse').withAmountCents(1000).build()
      ]
    };

    return this;
  }

  withDollarsEvenExchange() {
    this.travelFunds = {
      amountCents: 0,
      perPassenger: []
    };

    return this;
  }

  build() {
    return {
      recordLocator: this.recordLocator,
      travelFunds: this.travelFunds,
      pointsRefund: this.pointsRefund
    };
  }
}

module.exports = AirChangePurchaseApiJsonBuilder;
