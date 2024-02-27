module.exports = {
  viewReservationViewPage: {
    dates: { first: '2019-01-12', second: null },
    checkInIneligibilityReason: null,
    destinationDescription: 'Belize City',
    originAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
    destinationAirport: { name: 'Belize City', state: null, code: 'BZE', country: 'Belize' },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Age Verified Senior',
        accountNumber: '601005646',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'MTCO7D',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [{ number: '837', wifiOnBoard: true }],
        travelTime: '2h 20m',
        departureDate: '2019-01-12',
        departureTime: '10:55',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '13:15',
        arrivalAirport: { name: 'Belize City', state: null, code: 'BZE', country: 'Belize' },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'HOU - BZE',
    shareDetails: {
      subject: 'Southwest Flight 837 Houston (Hobby) to Belize City',
      confirmationInfo: 'Confirmation #: MTCO7D',
      passengerInfo: 'Passenger names: Age Verified Senior',
      flightInfo: [
        {
          header: 'Departing Flight: Sat, Jan 12, 2019',
          title: 'Southwest Flight 837 Houston (Hobby) to Belize City',
          flightInfo: 'Flight #: 837',
          departureInfo: 'Departs: 10:55 AM HOU',
          departureDateTimeUtc: '2019-01-12T10:55:00',
          stops: null,
          arrivalInfo: 'Arrives: 01:15 PM BZE',
          arrivalDateTimeUtc: '2019-01-12T13:15:00',
          travelTime: 'Travel time: 2hr 20 mins'
        }
      ]
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: false,
    isCheckedIn: false,
    isInternational: true,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    isSwabiz: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/MTCO7D',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'a', 'last-name': 'senior' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/MTCO7D',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'a', 'last-name': 'senior' }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      earlyBird: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/MTCO7D',
        method: 'GET',
        query: { 'first-name': 'Age', 'last-name': 'Senior' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/MTCO7D',
        method: 'GET',
        query: { 'first-name': 'Age', 'last-name': 'Senior' }
      },
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/MTCO7D',
          method: 'GET',
          query: { 'first-name': 'Age', 'last-name': 'Senior', 'passenger-reference': '2' }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};
