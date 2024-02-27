const _ = require('lodash');

class UpcomingTripBuilder {
  constructor() {
    this.recordLocator = 'ABC123';
    this.firstName = 'STEVEN';
    this.lastName = 'JACKIE';
    this.model = {
      _links: {
        carReservationDetails: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/STMXQ6',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'ITEST',
            'last-name': 'WANG'
          }
        },
        checkInViewReservationPage: {
          href: '/v1/mobile-air-operations/page/check-in/QIP34B',
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        }
      },
      confirmationNumber: 'STMXQ6',
      dates: {
        first: '2017-10-12',
        second: '2017-10-14'
      },
      destinationDescription: 'Austin',
      isWithin24Hours: true,
      isWithin48Hours: true,
      pages: [
        {
          arrivalAirportCode: 'AUS',
          arrivalAirportDisplayName: 'Austin, TX - AUS',
          arrivalTime: '09:55',
          arrivesNextDay: false,
          bannerText: null,
          bannerType: null,
          boardingGroup: null,
          boardingPosition: null,
          checkInIneligibilityReason: 'MBP_UNAVAILABLE_STANDBY',
          departureAirportCode: 'DAL',
          departureAirportDisplayName: 'Dallas (Love Field), TX - DAL',
          departureDate: '2017-10-12',
          departureDayOfWeek: 'Thursday',
          departureTime: '09:00',
          destinationDescription: 'Austin',
          flightNumber: '726',
          flightStatus: {
            actualArrivalTime: '09:55',
            actualDepartureTime: '09:00',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            gate: null,
            isCancelled: false,
            isNowBoarding: false
          },
          isCheckInEligible: false,
          isEBEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          onStandbyList: false,
          standbyFlight: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      tripType: 'FLIGHT',
      _v1_infoNeededToAddEarlyBirdLink: null
    };
  }

  with2SegmentsOnBound() {
    this.model = _.cloneDeep(this.model);
    this.model.pages = [
      {
        arrivalAirportCode: 'AUS',
        arrivalAirportDisplayName: 'Austin, TX - AUS',
        arrivalTime: '09:55',
        arrivesNextDay: false,
        bannerText: null,
        bannerType: null,
        boardingGroup: null,
        boardingPosition: null,
        checkInIneligibilityReason: 'MBP_UNAVAILABLE_STANDBY',
        departureAirportCode: 'DAL',
        departureAirportDisplayName: 'Dallas (Love Field), TX - DAL',
        departureDate: '2017-10-12',
        departureDayOfWeek: 'Thursday',
        departureTime: '09:00',
        destinationDescription: 'Austin',
        flightNumber: '726',
        flightStatus: {
          actualArrivalTime: '09:55',
          actualDepartureTime: '09:00',
          arrivalStatus: 'ON TIME',
          arrivalStatusType: 'POSITIVE',
          departureStatus: 'ON TIME',
          departureStatusType: 'POSITIVE',
          gate: null,
          isCancelled: false,
          isNowBoarding: false
        },
        isCheckInEligible: false,
        isCheckedIn: false,
        isInternational: false,
        isNonRevPnr: false,
        isEBEligible: false,
        onStandbyList: false,
        standbyFlight: null,
        aircraftInfo: {
          aircraftType: 'Boeing 777'
        }
      },
      {
        arrivalAirportCode: 'AUS',
        arrivalAirportDisplayName: 'Austin, TX - AUS',
        arrivalTime: '09:55',
        arrivesNextDay: false,
        bannerText: null,
        bannerType: null,
        boardingGroup: null,
        boardingPosition: null,
        checkInIneligibilityReason: 'MBP_UNAVAILABLE_STANDBY',
        departureAirportCode: 'DAL',
        departureAirportDisplayName: 'Dallas (Love Field), TX - DAL',
        departureDate: '2017-10-12',
        departureDayOfWeek: 'Thursday',
        departureTime: '09:00',
        destinationDescription: 'Austin',
        flightNumber: '726',
        flightStatus: {
          actualArrivalTime: '09:55',
          actualDepartureTime: '09:00',
          arrivalStatus: 'ON TIME',
          arrivalStatusType: 'POSITIVE',
          departureStatus: 'ON TIME',
          departureStatusType: 'POSITIVE',
          gate: null,
          isCancelled: false,
          isNowBoarding: false
        },
        isCheckInEligible: false,
        isCheckedIn: false,
        isInternational: false,
        isNonRevPnr: false,
        isEBEligible: false,
        onStandbyList: false,
        standbyFlight: null,
        aircraftInfo: {
          aircraftType: 'Boeing 777'
        }
      }
    ];

    return this;
  }

  withStandby() {
    this.model = _.cloneDeep(this.model);
    this.model.pages[0].standbyFlight = {
      arrivalAirportCode: 'AUS',
      arrivalTime: '09:55',
      departureTime: '09:00',
      flightNumber: '726',
      hasWifi: true,
      viewStandbyList: {
        href: '/v1/mobile-air-operations/page/standby',
        method: 'GET',
        query: {
          'arrival-time': '09:55',
          'carrier-code': 'WN',
          'departure-date': '2017-10-12',
          'departure-time': '09:00',
          'destination-airport': 'AUS',
          'first-name': 'ITEST',
          'flight-number': '726',
          'has-wifi': true,
          'last-name': 'WANG',
          'origin-airport': 'DAL',
          'record-locator': 'STMXQ6'
        }
      }
    };

    return this;
  }

  withEnhancedStandby() {
    this.withStandby().model;
    this.model.pages[0].standbyFlight = {
      ...this.model.pages[0].standbyFlight,
      enhancedStandbyList: {
        body: { standbyToken: 'enhanced-standby-token' },
        href: '/v1/mobile-air-operations/page/standby/STMXQ6',
        labelText: 'View standby list',
        method: 'POST'
      },
      enhancedStandbyListMessage: 'Enhanced standby list message'
    };

    return this;
  }

  withCheckInEligible() {
    this.model = _.cloneDeep(this.model);
    _.forEach(this.model.pages, (page) => {
      page.isCheckInEligible = true;
    });

    return this;
  }

  withCheckedIn(isCheckedIn) {
    this.model = _.cloneDeep(this.model);
    _.forEach(this.model.pages, (page) => {
      page.isCheckedIn = isCheckedIn;
    });

    return this;
  }

  withMobileBoardingPassEligible() {
    this.model = _.cloneDeep(this.model);
    _.forEach(this.model.pages, (page) => {
      page.checkInIneligibilityReason = null;
    });

    return this;
  }

  withIsWithin24Hours(isWithin24Hours) {
    this.model = _.cloneDeep(this.model);
    this.model.isWithin24Hours = isWithin24Hours;

    return this;
  }

  withIsWithin48Hours(isWithin48Hours) {
    this.model = _.cloneDeep(this.model);
    this.model.isWithin48Hours = isWithin48Hours;

    return this;
  }

  withRecordLocator(recordLocator) {
    this.model = _.cloneDeep(this.model);
    this.recordLocator = recordLocator;
    this.model.confirmationNumber = recordLocator;

    return this;
  }

  withFlightStatus(flightStatusAttributes = {}) {
    const defaultStatus = {
      actualArrivalTime: '09:55',
      actualDepartureTime: '09:00',
      arrivalStatus: 'ON TIME',
      arrivalStatusType: 'POSITIVE',
      departureStatus: 'ON TIME',
      departureStatusType: 'POSITIVE',
      gate: null,
      isCancelled: false,
      isNowBoarding: false
    };

    this.model = _.cloneDeep(this.model);
    _.forEach(this.model.pages, (page) => {
      page.flightStatus = {
        ...defaultStatus,
        ...flightStatusAttributes
      };
    });

    return this;
  }

  withBoardingPositions(boardingPositions) {
    this.model = _.cloneDeep(this.model);
    const numberOfBoardingPositions = boardingPositions.length;

    _.forEach(this.model.pages, (page, index) => {
      page.boardingPosition = boardingPositions[index % numberOfBoardingPositions].position;
      page.boardingGroup = boardingPositions[index % numberOfBoardingPositions].group;
    });

    return this;
  }

  withPassengerName(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    return this;
  }

  withBoardingPassIssuanceLink(labelText = 'Boarding pass') {
    this.model = _.cloneDeep(this.model);
    this.model._links.viewBoardingPositions = null;
    this.model._links.checkInViewReservationPage = null;
    this.model._links.viewBoardingPassIssuance = {
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
      method: 'POST',
      body: {
        checkInSessionToken: null,
        recordLocator: this.recordLocator,
        firstName: this.firstName,
        lastName: this.lastName,
        travelerID: ['123']
      },
      labelText
    };

    return this;
  }

  withBoardingPositionsLink() {
    this.model = _.cloneDeep(this.model);
    this.model._links.viewBoardingPass = null;
    this.model._links.checkInViewReservationPage = null;
    this.model._links.viewBoardingPositions = {
      href: '/v1/mobile-air-operations/page/check-in',
      method: 'POST',
      body: {
        checkInSessionToken: null,
        firstName: this.firstName,
        lastName: this.lastName,
        recordLocator: this.recordLocator
      }
    };

    return this;
  }

  withChangeLink() {
    this.model = _.cloneDeep(this.model);
    this.model._links.changeFlightPage = {
      href: '/v1/mobile-air-booking/page/flights/change/current/TBCIK5',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'Lee',
        'last-name': 'Ann'
      }
    };

    return this;
  }

  withNonRev(isNonRevPnr) {
    this.model = _.cloneDeep(this.model);
    this.model.pages[0].isNonRevPnr = isNonRevPnr;

    if (isNonRevPnr) {
      this.model.pages[0].bannerText = 'You are on standby to ATL';
      this.model.pages[0].bannerType = 'DEFAULT';
      // TODO: delete this.model._links.checkInViewReservationPage = null;
      this.model.pages[0].isCheckInEligible = false;
    }

    return this;
  }

  withBannerTypeAndText(bannerType, bannerText) {
    this.model = _.cloneDeep(this.model);
    this.model.pages[0].bannerType = bannerType;
    this.model.pages[0].bannerText = bannerText;

    return this;
  }

  withInternational() {
    this.model = _.cloneDeep(this.model);
    this.model.pages[0].isInternational = true;

    return this;
  }

  withCheckInIneligibilityReason(reason) {
    this.model = _.cloneDeep(this.model);
    this.model.pages[0].checkInIneligibilityReason = reason;

    return this;
  }

  withNonPages() {
    this.model.pages = null;

    return this;
  }

  withOvernight() {
    this.model.pages[0].isOvernight = true;

    return this;
  }

  withoutOvernight() {
    this.model.pages[0].isOvernight = false;

    return this;
  }

  build() {
    if (this.model._links.viewReservationViewPage) {
      this.model._links.viewReservationViewPage.query['first-name'] = this.firstName;
      this.model._links.viewReservationViewPage.query['last-name'] = this.lastName;
    }

    return this.model;
  }
}

module.exports = UpcomingTripBuilder;
