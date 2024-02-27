module.exports = {
  viewReservationViewPage: {
    dates: { first: '2017-09-19', second: '2017-09-22' },
    checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
    destinationDescription: 'Houston',
    originAirport: { name: 'Cabo San Lucas/Los Cabos', state: null, code: 'SJD', country: 'MX' },
    destinationAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'FANG FANG',
        accountNumber: null,
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
        checkInEligible: true,
        isCheckedIn: false,
        isCheckInEligible: false
      }
    ],
    confirmationNumber: 'INTEMT',
    shouldShowAddEarlyBirdButton: true,
    bounds: [
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          { number: '896', wifiOnBoard: true },
          { number: '1196', wifiOnBoard: true }
        ],
        travelTime: '9h 20m',
        departureDate: '2017-09-19',
        departureTime: '08:25',
        departureAirport: { name: 'Cabo San Lucas/Los Cabos', state: null, code: 'SJD', country: 'MX' },
        arrivalTime: '18:45',
        arrivalAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'DEPARTING',
        stops: [
          {
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            airport: { name: 'Los Angeles', state: 'CA', code: 'LAX', country: null },
            arrivalTime: '10:05',
            departureTime: '13:25',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      },
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '1597', wifiOnBoard: true },
          { number: '630', wifiOnBoard: true }
        ],
        travelTime: '8h 15m',
        departureDate: '2017-09-22',
        departureTime: '08:20',
        departureAirport: { name: 'Houston (Hobby)', state: 'TX', code: 'HOU', country: null },
        arrivalTime: '15:35',
        arrivalAirport: { name: 'Cabo San Lucas/Los Cabos', state: null, code: 'SJD', country: 'MX' },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'RETURNING',
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Orange County/Santa Ana', state: 'CA', code: 'SNA', country: null },
            arrivalTime: '09:40',
            departureTime: '12:20',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'SJD - HOU',
    hasAnyCancelledFlights: false,
    isCheckInEligible: true,
    isCheckedIn: false,
    isInternational: true,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/INTEMT',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'f', 'last-name': 'fang' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/INTEMT',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'f', 'last-name': 'fang' }
    },
    _links: {
      checkInSessionToken: '...',
      change: null,
      cancel: null,
      viewStandbyList: null,
      checkIn: {
        href: '/v1/mobile-air-operations/page/check-in/INTEMT',
        method: 'GET',
        query: { 'first-name': 'f', 'last-name': 'fang' }
      },
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/INTEMT',
          method: 'GET',
          query: { 'first-name': 'FANG', 'last-name': 'FANG', 'passenger-reference': '2' }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};
