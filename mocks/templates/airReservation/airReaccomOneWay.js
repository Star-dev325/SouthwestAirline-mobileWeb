module.exports = {
  viewReservationViewPage: {
    dates: { first: '2018-04-14', second: '2018-04-17' },
    checkInIneligibilityReason: null,
    destinationDescription: 'Hartford',
    originAirport: { name: 'Hartford', state: 'CT', code: 'BDL', country: null },
    destinationAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Test Wang',
        accountNumber: '601143885',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: true,
        checkInIneligibilityReason: null,
        isCheckedIn: true,
        isCheckInEligible: true,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'ERSS1A',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          { number: '4751', wifiOnBoard: true },
          { number: '3399', wifiOnBoard: true }
        ],
        travelTime: '6h 20m',
        departureDate: '2018-04-14',
        departureTime: '14:30',
        departureAirport: { name: 'Hartford', state: 'CT', code: 'BDL', country: null },
        arrivalTime: '19:50',
        arrivalAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [
          {
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            airport: { name: 'Orlando', state: 'FL', code: 'MCO', country: null },
            arrivalTime: '17:20',
            departureTime: '18:05',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false
      },
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          { number: '16', wifiOnBoard: true },
          { number: '5504', wifiOnBoard: true }
        ],
        travelTime: '10h 55m',
        departureDate: '2018-04-17',
        departureTime: '13:05',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '01:00',
        arrivalAirport: { name: 'Hartford', state: 'CT', code: 'BDL', country: null },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
        boundType: 'RETURNING',
        standbyFlight: null,
        stops: [
          {
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            airport: { name: 'St. Louis', state: 'MO', code: 'STL', country: null },
            arrivalTime: '15:05',
            departureTime: '15:50',
            changePlanes: false,
            missingAirportDetails: false
          },
          {
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            airport: { name: 'Orlando', state: 'FL', code: 'MCO', country: null },
            arrivalTime: '19:10',
            departureTime: '22:20',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: true
      }
    ],
    pageHeader: 'AUS - BDL',
    shareDetails: {
      subject: 'Southwest Flight 4751 Hartford to Austin',
      confirmationInfo: 'Confirmation #: S73RIW',
      passengerInfo: 'Passenger names: Test Wang',
      flightInfo: [
        {
          header: 'Departing Flight: Sat, Apr 14, 2018',
          flightInfo: 'Flight #: 4751/3399',
          departureInfo: 'Departs: 02:30 PM BDL',
          stops: ['Stop: Orlando, FL. Change planes'],
          arrivalInfo: 'Arrives: 07:50 PM AUS',
          travelTime: 'Travel time: 6hr 20 mins'
        },
        {
          header: 'Returning Flight: Tue, Apr 17, 2018',
          flightInfo: 'Flight #: 16/5504',
          departureInfo: 'Departs: 01:05 PM AUS',
          stops: ['Stop: St. Louis, MO. No plane change', 'Stop: Orlando, FL. Change planes'],
          arrivalInfo: 'Arrives: 01:00 AM BDL',
          travelTime: 'Travel time: 10hr 55 mins'
        }
      ]
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: false,
    isCheckedIn: true,
    isInternational: false,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/ERSS1A',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'TEST', 'last-name': 'WANG' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/ERSS1A',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'TEST', 'last-name': 'WANG' }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      change: null,
      cancel: null,
      reaccom: {
        href: '/v1/mobile-air-booking/page/flights/reaccom/reservations/current/ERSS1A',
        method: 'GET',
        query: { 'first-name': 'Test', 'last-name': 'Wang' }
      },
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: null,
      viewBoardingPassIssuance: {
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
        method: 'POST',
        body: {
          checkInSessionToken: null,
          firstName: 'TEST',
          lastName: 'WANG',
          travelerID: ['0000000000000001']
        }
      }
    },
    messages: [
      {
        key: 'REACCOM_VIEW_RESERVATION',
        header: 'We rebooked you on a new flight.',
        body: "You may change this flight free of charge. We're sincerely sorry for any inconvenience. If you checked bags, we'll make every effort to reroute your luggage with your new itinerary.",
        icon: 'WARNING',
        textColor: 'DEFAULT',
        note: null
      }
    ],
    hasUnaccompaniedMinor: false
  }
};
