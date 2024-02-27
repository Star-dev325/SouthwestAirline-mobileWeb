import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

class transformedReservationDetailResponseBuilder {
  constructor() {
    this.pageHeader = 'DAL - ATL';
    this.dayOfTravelContactInfo = 'Text: 555-555-5555';
    this.date = 'Jul 25 - 27';
    this.isInternational = false;
    this.isNonRevPnr = false;
    this.messages = [{
      body: 'test',
      header: 'test',
      icon: 'test',
      key: 'test'
    }];
    this.destinationDescription = 'Atlanta';
    this.originAirport = 'Dallas (Love), TX';
    this.destinationAirport = 'Atlanta, GA';
    this.companion = null;
    this.fareRulesWithLinks = '*Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.';
    this.headerMessages = {
      backgroundColor: 'DEFAULT',
      body: 'If you are logged in, it will appear in your upcoming trips shortly. Business select was added to the following flights and passengers.',
      header: 'Great Choice!',
      icon: 'POSITIVE',
      key: 'BOOKING_UPSELL_CONFIRMATION_BUS',
      textColor: 'DEFAULT'
    };
    this.passengers = [
      {
        name: 'Audrey Hepburn',
        accountNumber: '123456789',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        isCheckedIn: false,
        passengerReference: '2'
      }
    ];
    this.confirmationNumber = 'KLV394';
    this.bounds = [{
      departureStatus: null,
      departureStatusType: null,
      arrivalStatus: null,
      arrivalStatusType: null,
      flights: [
        {
          number: '233',
          wifiOnBoard: false
        }
      ],
      travelTime: '1h 55m',
      departureDate: '2017-07-25',
      departureTime: '07:35',
      departureAirport: {
        name: 'Dallas (Love)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      arrivalTime: '12:30',
      boundType: 'DEPARTING',
      arrivalAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      passengerTypeCounts: {
        adult: 1
      },
      fareProductDetails: {
        label: 'Anytime',
        fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
      },
      fareType: 'Anytime',
      passengerFareTypeInfo: {
        adult: {
          passengerCount: 1,
          passengerType: 'adult',
          fareLabel: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        }
      },
      stops: [],
      isNextDayArrival: false,
      passengers: new ViewReservationBuilder().generateBoundPassengersList(1, 'Anytime')
    }];
    this.shouldShowAddEarlyBirdButton = false;
    this.isDynamicWaiver = false;
    this.greyBoxMessage = null;
    this.greyBoxPassengerMessage = null;
    this.hasAnyCancelledFlights = false;
    this.isCheckedIn = false;
    this.isSwabiz = false;
    this.viewReservationAnalytics = {
      gdsTicketType: null,
      isInternational: false,
      isSwabiz: false,
      recordLocator: 'KLV394'
    };
    this._analytics = {
      'air.odout': 'DALATL',
      'air.odret': 'ATLDAL'
    };
    this._v1_infoNeededToCancel = {
      href: '/v1/mobile/reservations/record-locator/KLV394',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'AUDREY',
        'last-name': 'HEPBURN'
      }
    };
    this._v1_infoNeededToChange = {
      href: '/v1/mobile/reservations/record-locator/JAXNZG',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'QIANQIAN',
        'last-name': 'WANG'
      }
    };
    this._links = {
      change: {
        url: 'change-link',
        query: { 'first-name': 'AUDREY', 'last-name': 'HEPBURN' }
      },
      cancel: {
        url: 'cancel-link'
      },
      cancelBound: {
        url: 'cancelBound-link'
      },
      checkIn: {
        url: 'checkIn-link'
      },
      upgradeMyFlight: {
        "body": {
          "passengerSearchToken": "passenger-search-token"
        },
        href: '/v1/mobile-air-booking/page/upgrade/4O88R8',
        method: 'POST'
      },
      viewBoardingPassIssuance: {
        url: 'viewBoardingPassIssuance-link'
      },
      viewBoardingPositions: {
        url: 'viewBoardingPositions-link'
      }
    };
  }

  withInternationalFlight() {
    this.isInternational = true;
    this.pageHeader = 'DAL - CTU';
    this.destinationDescription = 'Chengdu';
    this.destinationAirport = 'Chengdu, China';
    this.viewReservationAnalytics = {
      gdsTicketType: null,
      isInternational: true,
      isSwabiz: false,
      recordLocator: 'KLV394'
    };
    this._analytics = {
      'air.odout': 'DALCTU',
      'air.odret': 'CTUDAL',
      'pnr.isinternational': '1'
    };
    this.bounds = [{
      departureStatus: null,
      departureStatusType: null,
      arrivalStatus: null,
      arrivalStatusType: null,
      flights: [
        {
          number: '233',
          wifiOnBoard: false
        }
      ],
      travelTime: '1h 55m',
      boundType: 'DEPARTING',
      departureDate: '2017-07-25',
      departureTime: '07:35',
      departureAirport: {
        name: 'Dallas (Love)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      arrivalTime: '08:30',
      arrivalAirport: {
        name: 'Chengdu',
        state: null,
        code: 'CTU',
        country: 'China'
      },
      passengerTypeCounts: {
        adult: 1
      },
      fareProductDetails: {
        label: 'Anytime',
        fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
      },
      fareType: 'Anytime',
      passengerFareTypeInfo: {
        adult: {
          passengerCount: 1,
          passengerType: 'adult',
          fareLabel: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        }
      },
      stops: [],
      isNextDayArrival: true,
      passengers: new ViewReservationBuilder().generateBoundPassengersList(1, 'Anytime')
    }];

    return this;
  }

  build() {
    return {
      greyBoxMessage: this.greyBoxMessage,
      greyBoxPassengerMessage: this.greyBoxPassengerMessage,
      hasAnyCancelledFlights: this.hasAnyCancelledFlights,
      isCheckedIn: this.isCheckedIn,
      isSwabiz: this.isSwabiz,
      pageHeader: this.pageHeader,
      dayOfTravelContactInfo: this.dayOfTravelContactInfo,
      date: this.date,
      fareRulesWithLinks: this.fareRulesWithLinks,
      headerMessages: this.headerMessages,
      isInternational: this.isInternational,
      hasUnaccompaniedMinor: false,
      isCheckInEligible: true,
      isNonRevPnr: this.isNonRevPnr,
      messages: this.messages,
      destinationDescription: this.destinationDescription,
      originAirport: this.originAirport,
      destinationAirport: this.destinationAirport,
      companion: this.companion,
      passengers: this.passengers,
      confirmationNumber: this.confirmationNumber,
      bounds: this.bounds,
      shouldShowAddEarlyBirdButton: this.shouldShowAddEarlyBirdButton,
      isDynamicWaiver: this.isDynamicWaiver,
      viewReservationAnalytics: this.viewReservationAnalytics,
      _analytics: this._analytics,
      _v1_infoNeededToCancel: this._v1_infoNeededToCancel,
      _v1_infoNeededToChange: this._v1_infoNeededToChange,
      _links: this._links

    };
  }
}

module.exports = transformedReservationDetailResponseBuilder;
