module.exports = {
  viewReservationViewPage: {
    dates: { first: '2019-01-25', second: '2019-01-31' },
    checkInIneligibilityReason: null,
    destinationDescription: 'San Jose',
    originAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
    destinationAirport: { name: 'San Jose', state: 'CA', code: 'SJC', country: null },
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
    confirmationNumber: 'CANMIX',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '1757', wifiOnBoard: true },
          { number: '1424', wifiOnBoard: true }
        ],
        travelTime: '5h 25m',
        departureDate: '2019-01-25',
        departureTime: '06:25',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '09:50',
        arrivalAirport: { name: 'San Jose', state: 'CA', code: 'SJC', country: null },
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
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Las Vegas', state: 'NV', code: 'LAS', country: null },
            arrivalTime: '07:25',
            departureTime: '08:20',
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
        flights: [{ number: '575', wifiOnBoard: true }],
        travelTime: '3h 30m',
        departureDate: '2019-01-31',
        departureTime: '07:00',
        departureAirport: { name: 'San Jose', state: 'CA', code: 'SJC', country: null },
        arrivalTime: '12:30',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'RETURNING',
        standbyFlight: null,
        stops: [],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'DAL - SJC',
    shareDetails: {
      subject: 'Southwest Flight 1757 Dallas (Love Field) to San Jose',
      confirmationInfo: 'Confirmation #: CANMIX',
      passengerInfo: 'Passenger names: Age Verified Senior',
      flightInfo: [
        {
          header: 'Departing Flight: Fri, Jan 25, 2019',
          title: 'Southwest Flight 1757/1424 Dallas (Love Field) to San Jose',
          flightInfo: 'Flight #: 1757/1424',
          departureInfo: 'Departs: 06:25 AM DAL',
          departureDateTimeUtc: '2019-01-25T06:25:00',
          stops: ['Stop: Las Vegas, NV. Change planes'],
          arrivalInfo: 'Arrives: 09:50 AM SJC',
          arrivalDateTimeUtc: '2019-01-25T09:50:00',
          travelTime: 'Travel time: 5hr 25 mins'
        },
        {
          header: 'Returning Flight: Thu, Jan 31, 2019',
          title: 'Southwest Flight 575 San Jose to Dallas (Love Field)',
          flightInfo: 'Flight #: 575',
          departureInfo: 'Departs: 07:00 AM SJC',
          departureDateTimeUtc: '2019-01-31T07:00:00',
          stops: null,
          arrivalInfo: 'Arrives: 12:30 PM DAL',
          arrivalDateTimeUtc: '2019-01-31T12:30:00',
          travelTime: 'Travel time: 3hr 30 mins'
        }
      ]
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: false,
    isCheckedIn: false,
    isInternational: false,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    isSwabiz: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/CANMIX',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'A', 'last-name': 'Senior' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/CANMIX',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'A', 'last-name': 'Senior' }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      earlyBird: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/CANMIX',
        method: 'GET',
        query: { 'first-name': 'Age', 'last-name': 'Senior' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/CANMIX',
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
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/CANMIX',
          method: 'GET',
          query: { 'first-name': 'Age', 'last-name': 'Senior', 'passenger-reference': '2' }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};
