module.exports = {
  viewReservationViewPage: {
    dates: { first: '2018-09-17', second: null },
    checkInIneligibilityReason: null,
    destinationDescription: 'Houston',
    originAirport: { name: 'Cancun', state: null, code: 'CUN', country: 'Mexico' },
    destinationAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Nonagev Nonagev',
        accountNumber: '600765863',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'U5NLCS',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: 'CANCELLED',
        departureStatusType: 'NEGATIVE',
        arrivalStatus: 'CANCELLED',
        arrivalStatusType: 'NEGATIVE',
        flights: [{ number: '308', wifiOnBoard: true }],
        travelTime: '2h 20m',
        departureDate: '2018-09-17',
        departureTime: '17:45',
        departureAirport: { name: 'Cancun', state: null, code: 'CUN', country: 'Mexico' },
        arrivalTime: '20:05',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'CUN - HOU',
    shareDetails: {
      subject: 'Southwest Flight 308 Cancun to Houston (Hobby)',
      confirmationInfo: 'Confirmation #: U5NLCS',
      passengerInfo: 'Passenger names: Nonagev Nonagev',
      flightInfo: [
        {
          header: 'Departing Flight: Mon, Sep 17, 2018',
          flightInfo: 'Flight #: 308',
          departureInfo: 'Departs: 05:45 PM CUN',
          stops: null,
          arrivalInfo: 'Arrives: 08:05 PM HOU',
          travelTime: 'Travel time: 2hr 20 mins'
        }
      ]
    },
    hasAnyCancelledFlights: true,
    isCheckInEligible: false,
    isCheckedIn: true,
    isInternational: true,
    isDynamicWaiver: true,
    isNonRevPnr: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/U5NLCS',
      method: 'GET',
      query: { action: 'CHANGE', 'first=name': 'NONAGEV', 'last-name': 'NONAGEV' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/U5NLCS',
      method: 'GET',
      query: { action: 'CHANGE', 'first=name': 'NONAGEV', 'last-name': 'NONAGEV' }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      earlyBird: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/U5NLCS',
        method: 'GET',
        query: { 'first=name': 'NONAGEV', 'last-name': 'NONAGEV' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/U5NLCS',
        method: 'GET',
        query: { 'first=name': 'NONAGEV', 'last-name': 'NONAGEV' }
      },
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/U5NLCS',
          method: 'GET',
          query: { action: 'CHANGE', 'first=name': 'NONAGEV', 'last-name': 'NONAGEV' }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};
