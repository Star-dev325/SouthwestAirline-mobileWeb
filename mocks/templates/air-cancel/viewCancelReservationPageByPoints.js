module.exports = {
  viewCancelReservationPage: {
    recordLocator: 'RW9GUP',
    receiptEmail: 'ATERRIS@EXAMPLE.COM',
    passengers: [{ name: 'Charith Tangrila', accountNumber: '601425543' }],
    associatedReservations: null,
    bounds: [
      {
        departureAirportCode: 'AUS',
        departureDate: '2018-09-06',
        departureDayOfWeek: 'Thursday',
        departureTime: '06:00',
        arrivalAirportCode: 'DAL',
        arrivalTime: '06:50'
      }
    ],
    tripTotals: [
      { amount: '16,310', currencyCode: 'PTS', currencySymbol: null },
      {
        amount: '5.60',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    ],
    pointsToCreditTotal: { item: 'Credit', amount: '16,310', currencyCode: 'PTS', currencySymbol: null },
    pointsToCreditAccount: '601425543',
    refundableFunds: { item: 'Credit', amount: '2.60', currencyCode: 'USD', currencySymbol: '$' },
    nonRefundableFunds: { item: 'Credit', amount: '3.00', currencyCode: 'USD', currencySymbol: '$' },
    isSwabiz: false,
    _links: {
      cancelPolicies: { href: '/cancellation-policy', method: 'GET' },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/RW9GUP',
        method: 'DELETE',
        query: {
          firstName: 'Charith',
          lastName: 'Tangrila',
          refundRequested: true,
          boardingPassExists: false,
          receiptEmail: 'ATERRIS@EXAMPLE.COM',
          isInternational: false,
          'cancel-token': 'cancel-token'
        }
      }
    }
  }
};
