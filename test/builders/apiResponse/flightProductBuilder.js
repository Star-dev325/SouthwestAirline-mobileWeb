module.exports = function flightProductBuilder() {
  this.pnr = 'HRGL3G';
  this.firstName = 'Mengli';
  this.lastName = 'Ding';
  this.deleteBoardingPass = null;
  this.refundableAmountCents = 19198;
  this.nonrefundableAmountCents = 123;
  this.accountNumber = 1231231;
  this.amountPoints = 23789;
  this.originationDestinations = [{
    segments: [{
      departureDateTime: '2016-01-06T22:20:00.000-06:00',
      arrivalDateTime: '2016-01-06T23:15:00.000-06:00',
      originationAirportCode: 'DAL',
      destinationAirportCode: 'AUS',
      operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '2407' },
      marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '2407' },
      legs: [{ originationAirportCode: 'DAL', destinationAirportCode: 'AUS' }],
      wifiAvailable: null
    }],
    durationMinutes: 55,
    originationDestinationId: '201601062220-0600,201601062315-0600|DAL-AUS|WN2407',
    checkinDocumentReason: null,
    checkinDocumentType: null,
    fareType: 'Anytime',
    _links: { deleteBoardingPass: this.deleteBoardingPass }
  }
  ];
  this.passengers = [{
    secureFlightName: { firstName: this.firstName, lastName: this.lastName, middleName: '', suffix: '' },
    birthDate: '1991-04-28',
    gender: 'F',
    accountNumber: '',
    redressNumber: '',
    knownTravelerId: '',
    tier: 'NON_ELITE',
    loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER'
  }];
  this.companionReservations = [];

  this.withCompanionReservations = function(companionReservations) {
    this.companionReservations = companionReservations;

    return this;
  };

  this.withPnr = function(pnr) {
    this.pnr = pnr;

    return this;
  };

  this.withRefundableAmountCents = function(refundableAmountCents) {
    this.refundableAmountCents = refundableAmountCents;

    return this;
  };

  this.withNonrefundableAmountCents = function(nonrefundableAmountCents) {
    this.nonrefundableAmountCents = nonrefundableAmountCents;

    return this;
  };

  this.withAccountNumber = function(accountNumber) {
    this.accountNumber = accountNumber;

    return this;
  };

  this.withAmountPoints = function(amountPoints) {
    this.amountPoints = amountPoints;

    return this;
  };

  this.withOneOriginDestination = function(originDestination) {
    this.originationDestinations = [originDestination];

    return this;
  };

  this.build = function() {
    return {
      recordLocator: this.pnr,
      passengers: this.passengers,
      itinerary: {
        originationDestinations: this.originationDestinations
      },
      receiptEmail: 'TEST@TEST.COM',
      currencyType: 'Dollars',
      international: false,
      availableFunds: {
        refundableAmountCents: this.refundableAmountCents,
        nonrefundableAmountCents: this.nonrefundableAmountCents
      },
      pointsRefund: {
        accountNumber: this.accountNumber,
        amountPoints: this.amountPoints
      },
      crossReferenceAssociations: [],
      warnings: [],
      unaccompaniedMinor: false,
      _links: {
        retrieveForCancel: null,
        retrieveForChange: null,
        retrieveForBuyEarlyBird: null,
        cancelReservation: {
          href: '/v1/mobile/reservations/manage/record-locator/HRGL3G?first-name=a&last-name=awesome&refund-requested=(true|false)',
          method: 'DELETE'
        },
        companionReservations: this.companionReservations
      }
    };
  };
};
