module.exports = {
  viewReservationViewPage: {
    dates: { first: '2018-06-19', second: '2018-06-21' },
    checkInIneligibilityReason: null,
    destinationDescription: 'Albuquerque',
    originAirport: { name: 'Albany', state: 'NY', code: 'ALB', country: null },
    destinationAirport: { name: 'Albuquerque', state: 'NM', code: 'ABQ', country: null },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Bear Liu',
        accountNumber: null,
        passengerReference: '3',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      },
      {
        name: 'Qianqian Wang',
        accountNumber: null,
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'NALVRY',
    shouldShowAddEarlyBirdButton: true,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '497', wifiOnBoard: true },
          { number: '2239', wifiOnBoard: true }
        ],
        travelTime: '7h 5m',
        departureDate: '2018-06-19',
        departureTime: '05:35',
        departureAirport: { name: 'Albany', state: 'NY', code: 'ALB', country: null },
        arrivalTime: '10:40',
        arrivalAirport: { name: 'Albuquerque', state: 'NM', code: 'ABQ', country: null },
        passengerTypeCounts: { adult: 2 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Baltimore/Washington', state: 'MD', code: 'BWI', country: null },
            arrivalTime: '06:50',
            departureTime: '08:25',
            changePlanes: true,
            missingAirportDetails: false
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
          { number: '603', wifiOnBoard: true },
          { number: '223', wifiOnBoard: true }
        ],
        travelTime: '8h 40m',
        departureDate: '2018-06-21',
        departureTime: '06:45',
        departureAirport: { name: 'Albuquerque', state: 'NM', code: 'ABQ', country: null },
        arrivalTime: '17:25',
        arrivalAirport: { name: 'Albany', state: 'NY', code: 'ALB', country: null },
        passengerTypeCounts: { adult: 2 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'RETURNING',
        standbyFlight: null,
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Denver', state: 'CO', code: 'DEN', country: null },
            arrivalTime: '07:55',
            departureTime: '08:55',
            changePlanes: false,
            missingAirportDetails: false
          },
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Baltimore/Washington', state: 'MD', code: 'BWI', country: null },
            arrivalTime: '14:20',
            departureTime: '16:05',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'ALB - ABQ',
    shareDetails: {
      subject: 'Southwest Flight 497 Albany to Albuquerque',
      confirmationInfo: 'Confirmation #: NALVRY',
      passengerInfo: 'Passenger names: Bear Liu, Qianqian Wang',
      flightInfo: [
        {
          header: 'Departing Flight: Tue, Jun 19, 2018',
          flightInfo: 'Flight #: 497/2239',
          departureInfo: 'Departs: 05:35 AM ALB',
          stops: ['Stop: Baltimore/Washington, MD. Change planes'],
          arrivalInfo: 'Arrives: 10:40 AM ABQ',
          travelTime: 'Travel time: 7hr 5 mins'
        },
        {
          header: 'Returning Flight: Thu, Jun 21, 2018',
          flightInfo: 'Flight #: 603/223',
          departureInfo: 'Departs: 06:45 AM ABQ',
          stops: ['Stop: Denver, CO. No plane change', 'Stop: Baltimore/Washington, MD. Change planes'],
          arrivalInfo: 'Arrives: 05:25 PM ALB',
          travelTime: 'Travel time: 8hr 40 mins'
        }
      ]
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: false,
    isCheckedIn: false,
    isInternational: false,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/NALVRY',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'q', 'last-name': 'wang' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/NALVRY',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'q', 'last-name': 'wang' }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/NALVRY',
        method: 'GET',
        query: { 'first-name': 'Bear', 'last-name': 'Liu' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/NALVRY',
        method: 'GET',
        query: { 'first-name': 'Bear', 'last-name': 'Liu' }
      },
      earlyBird: {
        href: '/v1/mobile-air-booking/page/early-bird/NALVRY',
        method: 'GET',
        query: {
          ['first-name']: 'Mike',
          ['last-name']: 'Tangrila'
        }
      },
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: null
    },
    hasUnaccompaniedMinor: false
  }
};
