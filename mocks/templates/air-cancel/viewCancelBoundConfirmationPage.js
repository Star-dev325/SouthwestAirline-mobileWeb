module.exports = {
  cancelBoundConfirmationPage: {
    headerMessage: {
      key: 'CANCEL_BOUND_CONFIRMATION_HEADER',
      header: 'Your cancellation was successful.',
      body: null,
      icon: 'POSITIVE',
      textColor: 'DEFAULT'
    },
    messages: null,
    recordLocator: 'EMRCPT',
    receiptEmail: 'S@S.COM',
    passengers: [
      {
        name: 'John Cancel',
        accountNumber: '601048265'
      }
    ],
    cancelledBounds: [
      {
        departureAirportCode: 'ATL',
        departureDate: '2020-08-13',
        departureDayOfWeek: 'Thursday',
        departureTime: '06:05',
        arrivalAirportCode: 'AUS',
        arrivalTime: '09:25',
        productId:
          'WGA||VLA0V2H,V,ATL,HOU,2020-08-13T06:05-04:00,2020-08-13T07:10-05:00,WN,WN,2651,7M8|VLA0V2H,V,HOU,AUS,2020-08-13T08:30-05:00,2020-08-13T09:25-05:00,WN,WN,235,73W',
        checkInEligible: true
      }
    ],
    remainingBounds: [
      {
        departureAirportCode: 'AUS',
        departureDate: '2020-08-16',
        departureDayOfWeek: 'Sunday',
        departureTime: '05:35',
        arrivalAirportCode: 'ATL',
        arrivalTime: '11:00',
        productId:
          'WGA||VLA0V2H,V,AUS,STL,2020-08-16T05:35-05:00,2020-08-16T07:40-05:00,WN,WN,2980,7M8|VLA0V2H,V,STL,ATL,2020-08-16T08:25-05:00,2020-08-16T11:00-04:00,WN,WN,4837,73W',
        checkInEligible: false
      }
    ],
    pointsToCreditTotal: null,
    pointsToCreditAccount: null,
    refundableFunds: null,
    nonRefundableFunds: {
      item: 'Total Credit',
      amount: '314.60',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    nonRefundableExpirationDate: null,
    refundMessage:
      'Your Travel Funds will be held for future use by the original passenger listed in the reservation. All travel involving Travel Funds from this ticket must be completed by the expiration date listed above. If utilizing Travel Funds with different expiration dates, the new reservation must be completed by the earliest expiration date applicable to any Travel Funds applied.',
    _analytics: {
      recordLocator: 'EMRCPT',
      gdsTicketType: null,
      tripType: 'roundTrip',
      daysToTrip: '1',
      multiPax: null,
      isInternational: false,
      isSwabiz: false,
      boundsinpnr: '2',
      boundsavailable: '2',
      boundscancelled: '1'
    },
    _links: {
      checkIn: {
        body: {
          firstName: 'John',
          lastName: 'Cancel',
          passengerSearchToken:
            'BzqCCiLk6LiMpoFfqfmtSHEgvwh0dmGtkg-J7evu0uAUjKr6fpNa5s8jL-cjb51Bx8gk9V_GpNogTnqHKocXR0Ktgl4H3g4n8c7GZtapL5z2decFq78f1r7-YY3owKH9hCA_nkq3W5X_1Q=='
        },
        href: '/v1/mobile-air-operations/page/check-in/R4ZGJ3',
        method: 'POST'
      }
    }
  },
  isNonRevPnr: null
};
