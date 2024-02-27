function RefundSummaryBuilder() {
  this.recordLocator = 'ABDEDF';
  this.perPassenger = [{
    secureFlightName: {
      firstName: 'AGE VERIFIED',
      lastName: 'SENIOR',
      middleName: '',
      suffix: ''
    }, amountCents: 0, expirationDate: '', ticketNumber: '00008398157375'
  }];
  this.refundMethod = 'CREDIT_CARD';
  this.currencyType = 'Points';
  this.nonRefundableCents = [13125];
  this.refundableCents = 222;
  this.totalPoints = 1111;
  this.expirationTime = '2/15/2016';
  this.RRNumber = '218312678612';

  this.withPerPassenger = function(perPassenger) {
    this.perPassenger = perPassenger;

    return this;
  };

  this.build = function() {
    return [{
      recordLocator: this.recordLocator,
      perPassenger: this.perPassenger,
      refundMethod: this.refundMethod,
      currencyType: this.currencyType,
      nonRefundableCents: this.nonRefundableCents,
      refundableCents: this.refundableCents,
      totalPoints: this.totalPoints,
      expirationTime: this.expirationTime,
      RRNumber: this.RRNumber
    }];
  };
}

module.exports = RefundSummaryBuilder;
