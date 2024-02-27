module.exports = {
  viewReservationViewPage: {
    dates: { first: '2019-01-19', second: null },
    checkInIneligibilityReason: null,
    destinationDescription: 'Albuquerque',
    originAirport: { name: 'Albany', state: 'NY', code: 'ALB', country: null },
    destinationAirport: { name: 'Albuquerque', state: 'NM', code: 'ABQ', country: null },
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Qianqian Wang',
        accountNumber: '601141461',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'CANONE',
    shouldShowAddEarlyBirdButton: true,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '2029', wifiOnBoard: true },
          { number: '3087', wifiOnBoard: true }
        ],
        travelTime: '7h 25m',
        departureDate: '2019-01-19',
        departureTime: '05:50',
        departureAirport: { name: 'Albany', state: 'NY', code: 'ALB', country: null },
        arrivalTime: '11:15',
        arrivalAirport: { name: 'Albuquerque', state: 'NM', code: 'ABQ', country: null },
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
            airport: { name: 'Chicago (Midway)', state: 'IL', code: 'MDW', country: null },
            arrivalTime: '07:25',
            departureTime: '09:00',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'ALB - ABQ',
    shareDetails: {
      subject: 'Southwest Flight 2029 Albany to Albuquerque',
      confirmationInfo: 'Confirmation #: CANONE',
      passengerInfo: 'Passenger names: Qianqian Wang',
      flightInfo: [
        {
          header: 'Departing Flight: Sat, Jan 19, 2019',
          title: 'Southwest Flight 2029/3087 Albany to Albuquerque',
          flightInfo: 'Flight #: 2029/3087',
          departureInfo: 'Departs: 05:50 AM ALB',
          departureDateTimeUtc: '2019-01-19T05:50:00',
          stops: ['Stop: Chicago (Midway), IL. Change planes'],
          arrivalInfo: 'Arrives: 11:15 AM ABQ',
          arrivalDateTimeUtc: '2019-01-19T11:15:00',
          travelTime: 'Travel time: 7hr 25 mins'
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
      href: '/v1/mobile/reservations/record-locator/CANONE',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'Q', 'last-name': 'Wang' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/CANONE',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'Q', 'last-name': 'Wang' }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      earlyBird: null,
      change: null,
      cancel: null,
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/CANONE',
          method: 'GET',
          query: { 'first-name': 'Qianqian', 'last-name': 'Wang', 'passenger-reference': '2' }
        }
      ]
    },
    hasUnaccompaniedMinor: false,
    greyBoxPassengerMessage: null,
    greyBoxMessage: {
      key: 'GREY_BOX_UNAVAILABLE_FLIGHT_CLOSED',
      header: 'Contact us at 1-800-I-FLY-SWA to modify your reservation',
      body: null
    }
  }
};
