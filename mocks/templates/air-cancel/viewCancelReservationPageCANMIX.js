module.exports = {
  viewCancelReservationPage: {
    recordLocator: 'CANMIX',
    receiptEmail: 'X224350@WNCO.COM',
    passengers: [{ name: 'Age Verified Senior', accountNumber: '601005646' }],
    associatedReservations: null,
    bounds: [
      {
        departureAirportCode: 'DAL',
        departureDate: '2019-01-25',
        departureDayOfWeek: 'Friday',
        departureTime: '06:25',
        arrivalAirportCode: 'SJC',
        arrivalTime: '09:50'
      },
      {
        departureAirportCode: 'SJC',
        departureDate: '2019-01-31',
        departureDayOfWeek: 'Thursday',
        departureTime: '07:00',
        arrivalAirportCode: 'DAL',
        arrivalTime: '12:30'
      }
    ],
    tripTotals: [{ amount: '739.86', currencyCode: 'USD', currencySymbol: '$' }],
    pointsToCreditTotal: null,
    pointsToCreditAccount: null,
    refundableFunds: { item: 'Credit', amount: '377.70', currencyCode: 'USD', currencySymbol: '$' },
    nonRefundableFunds: { item: 'Credit', amount: '362.16', currencyCode: 'USD', currencySymbol: '$' },
    isSwabiz: false,
    _links: {
      cancelPolicies: { href: '/cancellation-policy', method: 'GET' },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/CANMIX',
        method: 'DELETE',
        query: {
          'first-name': 'Age',
          'last-name': 'Senior',
          'receipt-email': 'X224350@WNCO.COM',
          'refund-requested': true,
          'boarding-pass-exists': false,
          'cancel-token': 'cancel-token'
        }
      }
    }
  }
};
