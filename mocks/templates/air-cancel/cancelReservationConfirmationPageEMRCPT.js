module.exports = {
  cancelReservationConfirmationPage: {
    messages: null,
    recordLocator: 'EMRCPT',
    passengers: [
      {
        name: 'John Cancel',
        accountNumber: '123456789'
      }
    ],
    pointsToCreditTotal: null,
    pointsToCreditAccount: null,
    refundableFunds: null,
    nonRefundableFunds: null,
    nonRefundableExpirationDate: null,
    refundMessage:
      'These funds will be released to the travel manager used to book this reservation. Please contact your travel manager with any questions.',
    receiptEmail: ['receipt@email.com']
  }
};
