import _ from 'lodash';

export default class ViewReservationForCancelBuilder {
  constructor() {
    this.viewCancelReservationPage = {
      messages: null,
      recordLocator: 'OUM6H3',
      receiptEmail: 'X224350@WNCO.COM',
      requireEmailReceipt: false,
      passengers: [
        {
          name: 'Age Senior',
          accountNumber: '601005646'
        }
      ],
      associatedReservations: null,
      bounds: [
        {
          departureAirportCode: 'DAL',
          departureDate: '2018-09-01',
          departureDayOfWeek: 'Saturday',
          departureTime: '07:10',
          arrivalAirportCode: 'AUS',
          arrivalTime: '08:05'
        }
      ],
      tripTotals: [
        {
          amount: '159.98',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      ],
      pointsToCreditTotal: null,
      pointsToCreditAccount: null,
      refundableFunds: {
        item: 'Credit',
        amount: '59.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      nonRefundableFunds: {
        item: 'Credit',
        amount: '100.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      isSwabiz: false,
      viewForCancelAnalytics: {},
      _links: {
        cancelPolicies: {
          href: '/cancellation-policy',
          method: 'GET'
        },
        cancel: {
          href: '/v1/mobile-air-booking/page/cancel-reservation/OUM6H3',
          method: 'DELETE',
          query: {
            firstName: 'Age',
            lastName: 'Senior',
            refundRequested: false,
            boardingPassExists: false,
            receiptEmail: 'X224350@WNCO.COM',
            isInternational: false,
            'cancel-token': 'cancel-token'
          }
        }
      }
    };
  }

  withOnlyRefundableFunds() {
    this.viewCancelReservationPage = _.merge({}, this.viewCancelReservationPage, {
      refundableFunds: {
        item: 'Credit',
        amount: '159.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      nonRefundableFunds: null
    });

    return this;
  }

  withOnlyNonRefundableFunds() {
    this.viewCancelReservationPage = _.merge({}, this.viewCancelReservationPage, {
      refundableFunds: null,
      nonRefundableFunds: {
        item: 'Credit',
        amount: '159.98',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    });

    return this;
  }

  withMultiplePassengers() {
    this.viewCancelReservationPage = _.merge({}, this.viewCancelReservationPage, {
      passengers: [
        {
          name: 'Age Senior',
          accountNumber: '601005646'
        },
        {
          name: 'Andrew Zhen',
          accountNumber: null
        }
      ]
    });

    return this;
  }

  withRoundTrip() {
    this.viewCancelReservationPage = _.merge({}, this.viewCancelReservationPage, {
      bounds: [
        {
          departureAirportCode: 'ALB',
          departureDate: '2018-09-15',
          departureDayOfWeek: 'Saturday',
          departureTime: '16:35',
          arrivalAirportCode: 'BWI',
          arrivalTime: '17:50'
        },
        {
          departureAirportCode: 'BWI',
          departureDate: '2018-09-15',
          departureDayOfWeek: 'Saturday',
          departureTime: '19:25',
          arrivalAirportCode: 'AUS',
          arrivalTime: '21:50'
        }
      ]
    });

    return this;
  }

  withNoRefundAvailableMessage() {
    this.viewCancelReservationPage = _.merge({}, this.viewCancelReservationPage, {
      messages: [
        {
          key: 'ERROR__CANCEL_NO_REFUND_AVAILABLE',
          header: 'Travel Funds held by travel manager.',
          body: 'Upon cancellation, these funds will be issued to the traveler manager who booked the reservation on your behalf. Please contact your Travel Manager for further information regarding these funds.'
        }
      ]
    });

    return this;
  }

  withEmailRequired() {
    this.viewCancelReservationPage = _.merge({}, this.viewCancelReservationPage, {
      requireEmailReceipt: true
    });

    return this;
  }

  build() {
    return {
      viewCancelReservationPage: this.viewCancelReservationPage
    };
  }
}
