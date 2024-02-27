module.exports = {
  cancelReservationConfirmationPage: {
    recordLocator: 'CANMIX',
    passengers: [{ name: 'Age Verified Senior', accountNumber: '601005646' }],
    pointsToCreditTotal: null,
    pointsToCreditAccount: null,
    refundableFunds: { item: 'Total Credit', amount: '377.70', currencyCode: 'USD', currencySymbol: '$' },
    nonRefundableFunds: { item: 'Total Credit', amount: '362.16', currencyCode: 'USD', currencySymbol: '$' },
    nonRefundableExpirationDate: '2020-01-14',
    refundMessage:
      'Your request for a refund of $377.70 has been submitted. Your Travel Funds balance of $362.16 will be held for future use by the original passenger listed in the reservation. All travel involving Travel Funds from this ticket must be completed by the expiration date listed above. If utilizing Travel Funds with different expiration dates, the new reservation must be completed by the earliest expiration date applicable to any Travel Funds applied.'
  }
};
