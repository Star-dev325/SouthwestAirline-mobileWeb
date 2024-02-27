import _ from 'lodash';

export default class CancelBoundConfirmationPageBuilder {
  constructor() {
    this.cancelBoundConfirmationPage = {
      headerMessage: {
        key: 'CANCEL_BOUND_CONFIRMATION_HEADER',
        header: 'Your cancellation was successful.',
        body: null,
        icon: 'POSITIVE',
        textColor: 'DEFAULT'
      },
      messages: null,
      recordLocator: 'LKLMBO',
      receiptEmail: 'KYLE.DIXON@WNCO.COM',
      passengers: [{
        name: 'Teresa A Kintzel',
        accountNumber: '601826912'
      }],
      cancelledBounds: [{
        departureAirportCode: 'DAL',
        departureDate: '2020-06-24',
        departureDayOfWeek: 'Wednesday',
        departureTime: '06:10',
        arrivalAirportCode: 'ATL',
        arrivalTime: '09:15',
        productId: 'BUS||LP8L,L,DAL,ATL,2020-06-24T06:10-05:00,2020-06-24T09:15-04:00,WN,WN,5281,7M8',
        checkInEligible: false
      }],
      remainingBounds: [{
        departureAirportCode: 'ATL',
        departureDate: '2020-06-25',
        departureDayOfWeek: 'Thursday',
        departureTime: '06:15',
        arrivalAirportCode: 'DAL',
        arrivalTime: '09:10',
        productId: 'BUS||KP8K,K,ATL,AUS,2020-06-25T06:15-04:00,2020-06-25T07:30-05:00,WN,WN,5402,73W|KP8K,K,AUS,DAL,2020-06-25T08:10-05:00,2020-06-25T09:10-05:00,WN,WN,15,7M8',
        checkInEligible: false
      }],
      pointsToCreditTotal: null,
      pointsToCreditAccount: null,
      refundableFunds: {
        item: 'Total Credit',
        amount: '638.10',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      guestPasses: null,
      nonRefundableFunds: null,
      refundMessage: 'Your request for a refund of $638.10 has been submitted.',
      nonRefundableExpirationDate: null,
      _analytics: {
        recordLocator: 'LKLMBO',
        gdsTicketType: null,
        tripType: 'roundTrip',
        daysToTrip: '6',
        multiPax: null,
        boundsInPnr: '2',
        boundsAvailable: '2',
        boundsCancelled: '1',
        isInternational: false,
        isSwabiz: false
      },
      _links: {
        checkIn: null
      },
      allowBookAnotherFlight: true
    };
  }

  withPTSAndCreditOnCard() {
    this.cancelBoundConfirmationPage.pointsToCreditTotal = {
      item: 'Total Credit',
      amount: '52,884',
      currencyCode: 'PTS',
      currencySymbol: null
    };
    this.cancelBoundConfirmationPage.pointsToCreditAccount = '601826912';
    this.cancelBoundConfirmationPage.refundableFunds = {
      item: 'Total Credit',
      amount: '5.60',
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    this.cancelBoundConfirmationPage.nonRefundableFunds = null;
    this.cancelBoundConfirmationPage.refundMessage = 'Your request of a refund of 52,884 points has been submitted. Your request for a refund of $5.60 has been submitted.';

    return this;
  }

  cancelAllRT() {
    this.cancelBoundConfirmationPage.cancelledBounds = [{
      departureAirportCode: 'DAL',
      departureDate: '2020-06-24',
      departureDayOfWeek: 'Wednesday',
      departureTime: '06:10',
      arrivalAirportCode: 'ATL',
      arrivalTime: '09:15',
      productId: 'BUS||LP8L,L,DAL,ATL,2020-06-24T06:10-05:00,2020-06-24T09:15-04:00,WN,WN,5281,7M8',
      checkInEligible: false
    }, {
      departureAirportCode: 'ATL',
      departureDate: '2020-06-25',
      departureDayOfWeek: 'Thursday',
      departureTime: '06:15',
      arrivalAirportCode: 'DAL',
      arrivalTime: '09:10',
      productId: 'BUS||KP8K,K,ATL,AUS,2020-06-25T06:15-04:00,2020-06-25T07:30-05:00,WN,WN,5402,73W|KP8K,K,AUS,DAL,2020-06-25T08:10-05:00,2020-06-25T09:10-05:00,WN,WN,15,7M8',
      checkInEligible: false
    }];
    this.cancelBoundConfirmationPage.remainingBounds = [];
    this.cancelBoundConfirmationPage.headerMessage = {
      key: 'CANCEL_BOUND_PNR_CONFIRMATION_HEADER',
      header: 'Your trip was cancelled.',
      body: 'This flight won\'t be the same without you!',
      icon: 'POSITIVE',
      textColor: 'DEFAULT'
    };

    return this;
  }

  withMessages(count = 1) {
    this.cancelBoundConfirmationPage.messages = [];

    _.times(count, (index) => {
      const message = {
        key: `key-string-${index}`,
        header: `Header Message #${index}`,
        body: `Body Message #${index}`,
        icon: 'icon-string',
        textColor: 'text-color-string',
        note: 'note-string'
      };

      this.cancelBoundConfirmationPage.messages.push(message);
    });

    return this;
  }

  withLongPassengerName(name) {
    this.cancelBoundConfirmationPage = _.cloneDeep(this.cancelBoundConfirmationPage);
    this.cancelBoundConfirmationPage.passengers[0] = {
      name,
      accountNumber: '601005646'
    };

    return this;
  }

  withMultiPax() {
    this.cancelBoundConfirmationPage.passengers.push({
      name: 'Bear Tangrila',
      accountNumber: null
    });

    return this;
  }

  withHoldFunds() {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      refundableFunds: this.cancelBoundConfirmationPage.nonRefundableFunds,
      nonRefundableFunds: this.cancelBoundConfirmationPage.refundableFunds,
      nonRefundableExpirationDate: '2020-06-25',
      refundMessage: 'Your Travel Funds will be held for future use by the original passenger listed in the reservation. All travel involving Travel Funds from this ticket must be completed by the expiration date listed above. If utilizing Travel Funds with different expiration dates, the new reservation must be completed by the earliest expiration date applicable to any Travel Funds applied.'
    });

    return this;
  }

  withNoExpirationDateTextFunds() {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      refundableFunds: this.cancelBoundConfirmationPage.nonRefundableFunds,
      nonRefundableFunds: this.cancelBoundConfirmationPage.refundableFunds,
      nonRefundableExpirationDate: null,
      expirationDateString: 'Expiration: None',
      refundMessage: 'Your Travel Funds will be held for future use by the original passenger listed in the reservation.'
    });

    return this;
  }

  withViewTravelFunds() {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      refundableFunds: this.cancelBoundConfirmationPage.nonRefundableFunds,
      nonRefundableFunds: this.cancelBoundConfirmationPage.refundableFunds,
      nonRefundableExpirationDate: '2020-06-25',
      refundMessage: 'Your Travel Funds will be held for future use by the original passenger listed in the reservation. All travel involving Travel Funds from this ticket must be completed by the expiration date listed above. If utilizing Travel Funds with different expiration dates, the new reservation must be completed by the earliest expiration date applicable to any Travel Funds applied.',
      _links: {
        checkTravelFunds: {
          href: '/test-url',
          labelText: 'View Travel Funds'
        }
      }
    });

    return this;
  }

  cancelInboundInsteadOfOB() {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      cancelledBounds: this.cancelBoundConfirmationPage.remainingBounds,
      remainingBounds: this.cancelBoundConfirmationPage.cancelledBounds
    });

    return this;
  }

  withNoPassengers() {
    this.cancelBoundConfirmationPage.passengers = [];

    return this;
  }

  withCustomRefundMessage(customRefundMessage) {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      refundMessage: customRefundMessage
    });

    return this;
  }

  withNoReceiptEmail() {
    this.cancelBoundConfirmationPage.receiptEmail = null;

    return this;
  }

  setRemainingBounds() {
    this.cancelBoundConfirmationPage.remainingBounds = [];

    return this;
  }

  withCheckInLink() {
    const checkIn = {
      href: '/v1/mobile-air-operations/page/check-in/LKLMBO',
      method: 'GET',
      query: {
        'first-name': 'TERESA',
        'last-name': 'KINTZEL',
        'passenger-search-token': 'og7Gc2LKmSGVEXyiCoKYVkfuO07Thdh9H9r95D2PVFkdokZyOJ8CfZLBML_zQp2JH-DdBRFRsjcgKwWcRVnUq-PXW1q0J9R_FkkdHw3yr4JfZHTZ-mH97Q5CWcUu1oqEEJayVjTXDReNFRZG_doHMA=='
      }
    };

    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      _links: {
        checkIn
      },
      allowBookAnotherFlight: true
    });

    return this;
  }

  withNonRev(dollarAmount = '0.00') {
    this.cancelBoundConfirmationPage.refundableFunds = {
      item: 'Total Credit',
      amount: dollarAmount,
      currencyCode: 'USD',
      currencySymbol: '$'
    };
    this.cancelBoundConfirmationPage.guestPasses = {
      amount: null,
      currencyCode: null,
      currencySymbol: null,
      item: 'Nonrevenue Guest Pass(es)',
      itemSubText: 'Refunded to Employee`s account'
    },
    this.cancelBoundConfirmationPage.allowBookAnotherFlight = false;
    this.refundMessage = 'Your request for a refund of $0.00 has been submitted.';

    return this;
  }

  withGuestPassesAndAllowBookAnotherFlightFalse(dollarAmount = '0.00') {
    const checkIn = {
      href: '/v1/mobile-air-operations/page/check-in/LKLMBO',
      method: 'GET',
      query: {
        'first-name': 'TERESA',
        'last-name': 'KINTZEL',
        'passenger-search-token': 'og7Gc2LKmSGVEXyiCoKYVkfuO07Thdh9H9r95D2PVFkdokZyOJ8CfZLBML_zQp2JH-DdBRFRsjcgKwWcRVnUq-PXW1q0J9R_FkkdHw3yr4JfZHTZ-mH97Q5CWcUu1oqEEJayVjTXDReNFRZG_doHMA=='
      }
    };

    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      _links: {
        checkIn
      } });
    this.cancelBoundConfirmationPage.refundableFunds = {
      item: 'Total Credit',
      amount: dollarAmount,
      currencyCode: 'USD',
      currencySymbol: '$',
      itemSubText: 'Refunded to Method of Payment'
    };
    this.cancelBoundConfirmationPage.guestPasses = {
      amount: null,
      currencyCode: null,
      currencySymbol: null,
      item: 'Nonrevenue Guest Pass(es)',
      itemSubText: 'Refunded to Employee`s account'
    },
    this.cancelBoundConfirmationPage.allowBookAnotherFlight = false;
    this.refundMessage = 'Your request for a refund of $0.00 has been submitted.';

    return this;
  }

  withAllowBookAnotherFlightFlag(dollarAmount = '0.00') {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      _links: {
        checkIn: false
      }
    });
    this.cancelBoundConfirmationPage.refundableFunds = {
      item: 'Total Credit',
      amount: dollarAmount,
      currencyCode: 'USD',
      currencySymbol: '$',
      itemSubText: 'Refund to method of payment'
    };
    this.cancelBoundConfirmationPage.allowBookAnotherFlight = true;
    this.cancelBoundConfirmationPage.guestPasses = {
      amount: null,
      currencyCode: null,
      currencySymbol: null,
      item: 'Nonrevenue Guest Pass(es)',
      itemSubText: 'Refunded to Employee`s account'

    },
    this.refundMessage = 'Your request for a refund of $0.00 has been submitted.';

    return this;
  }

  withAllowBookAnotherFlightFalse(dollarAmount = '0.00') {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      _links: {
        checkIn: false
      }
    });
    this.cancelBoundConfirmationPage.refundableFunds = {
      item: 'Total Credit',
      amount: dollarAmount,
      currencyCode: 'USD',
      currencySymbol: '$',
      itemSubText: 'Refund to Card'
    };
    this.cancelBoundConfirmationPage.allowBookAnotherFlight = false;
    this.cancelBoundConfirmationPage.guestPasses = null;
    this.refundMessage = 'Your request for a refund of $0.00 has been submitted.';

    return this;
  }

  withAllowBookAnotherFlight(dollarAmount = '0.00') {
    this.cancelBoundConfirmationPage = _.merge({}, this.cancelBoundConfirmationPage, {
      _links: {
        checkIn: false
      }
    });
    this.cancelBoundConfirmationPage.refundableFunds = {
      item: 'Total Credit',
      amount: dollarAmount,
      currencyCode: 'USD',
      currencySymbol: '$',
      itemSubText: 'Refund to method of payment'
    };
    this.cancelBoundConfirmationPage.allowBookAnotherFlight = true;
    this.cancelBoundConfirmationPage.guestPasses = {
      amount: null,
      currencyCode: null,
      currencySymbol: null,
      item: 'Nonrevenue Guest Pass(es)',
      itemSubText: 'Refunded to Employee`s account'

    },
    this.refundMessage = 'Your request for a refund of $0.00 has been submitted.';

    return this;
  }

  withSplitPnrConfirmationLabel() {
    this.cancelBoundConfirmationPage = {
      ...this.cancelBoundConfirmationPage,
      recordLocatorLabel: 'NEW CONFIRMATION #'
    };

    return this;
  }

  build() {
    return {
      cancelBoundConfirmationPage: this.cancelBoundConfirmationPage
    };
  }
}
