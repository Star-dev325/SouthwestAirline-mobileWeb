import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

module.exports = {
  viewCancelReservationPage: {
    messages: [
      {
        key: 'ERROR__CANCEL_NO_REFUND_AVAILABLE',
        header: 'Travel Funds will be held by travel manager.',
        body: 'Upon cancellation, these funds will be issued to the traveler manager who booked the reservation on your behalf. Please contact your Travel Manager for further information regarding these funds.',
        icon: 'WARNING',
        textColor: 'DEFAULT'
      }
    ],
    recordLocator: 'EMRCPT',
    requireEmailReceipt: true,
    receiptEmail: 'receipt@email.com',
    passengers: [
      {
        name: 'John Cancel',
        accountNumber: '123456789'
      }
    ],
    associatedReservations: null,
    bounds: [
      {
        departureAirportCode: 'OAK',
        departureDate: '2019-11-22',
        departureDayOfWeek: 'Friday',
        departureTime: '10:45',
        arrivalAirportCode: 'SAN',
        arrivalTime: '12:20',
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        passengers: new ViewReservationBuilder().generateBoundPassengersList(1, 'Anytime')
      }
    ],
    tripTotals: null,
    pointsToCreditTotal: null,
    pointsToCreditAccount: null,
    refundableFunds: null,
    nonRefundableFunds: null,
    viewForCancelAnalytics: {
      recordLocator: 'ABC123',
      gdsTicketType: 'GDS|GDS',
      isInternational: false,
      isSwabiz: false
    },
    isSwabiz: false,
    _links: {
      cancelPolicies: {
        href: '/cancellation-policy',
        method: 'GET'
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/EMRCPT',
        method: 'DELETE',
        query: {
          'first-name': 'John',
          'last-name': 'Cancel',
          'receipt-email': null,
          'refund-requested': null,
          'boarding-pass-exists': false,
          'cancel-token': 'token'
        }
      }
    }
  }
};
