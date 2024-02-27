module.exports = {
  viewReservationViewPage: {
    dates: { first: '2019-02-06', second: '2019-02-09' },
    checkInIneligibilityReason: null,
    destinationDescription: 'Boise',
    originAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
    destinationAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
    companion: null,
    passengers: [
      {
        name: 'Kyrr Test',
        accountNumber: '601173823',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: true,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: true,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'CHDWDE',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          { number: '859', wifiOnBoard: true },
          { number: '975', wifiOnBoard: true }
        ],
        travelTime: '8h 40m',
        departureDate: '2019-02-06',
        departureTime: '06:00',
        departureAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        arrivalTime: '13:40',
        arrivalAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
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
            airport: { name: 'San Diego', state: 'CA', code: 'SAN', country: null },
            arrivalTime: '07:15',
            departureTime: '10:30',
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
          { number: '5513', wifiOnBoard: true },
          { number: '4902', wifiOnBoard: true }
        ],
        travelTime: '6h 30m',
        departureDate: '2019-02-09',
        departureTime: '07:15',
        departureAirport: { name: 'Boise', state: 'ID', code: 'BOI', country: null },
        arrivalTime: '14:45',
        arrivalAirport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
        boundType: 'RETURNING',
        standbyFlight: null,
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Phoenix', state: 'AZ', code: 'PHX', country: null },
            arrivalTime: '09:20',
            departureTime: '11:25',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'DAL - BOI',
    shareDetails: {
      subject: 'Southwest Flight 859 Dallas (Love Field) to Boise',
      confirmationInfo: 'Confirmation #: CHDWDE',
      passengerInfo: 'Passenger names: Kyrr Test',
      flightInfo: [
        {
          header: 'Departing Flight: Wed, Feb 06, 2019',
          title: 'Southwest Flight 859/975 Dallas (Love Field) to Boise',
          flightInfo: 'Flight #: 859/975',
          departureInfo: 'Departs: 06:00 AM DAL',
          departureDateTimeUtc: '2019-02-06T06:00:00',
          stops: ['Stop: San Diego, CA. Change planes'],
          arrivalInfo: 'Arrives: 01:40 PM BOI',
          arrivalDateTimeUtc: '2019-02-06T13:40:00',
          travelTime: 'Travel time: 8hr 40 mins'
        },
        {
          header: 'Returning Flight: Sat, Feb 09, 2019',
          title: 'Southwest Flight 5513/4902 Boise to Dallas (Love Field)',
          flightInfo: 'Flight #: 5513/4902',
          departureInfo: 'Departs: 07:15 AM BOI',
          departureDateTimeUtc: '2019-02-09T07:15:00',
          stops: ['Stop: Phoenix, AZ. Change planes'],
          arrivalInfo: 'Arrives: 02:45 PM DAL',
          arrivalDateTimeUtc: '2019-02-09T14:45:00',
          travelTime: 'Travel time: 6hr 30 mins'
        }
      ]
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: true,
    isCheckedIn: false,
    isInternational: false,
    isDynamicWaiver: true,
    isNonRevPnr: false,
    isSwabiz: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/CHDWDE',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'k', 'last-name': 'Test' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/CHDWDE',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'k', 'last-name': 'Test' }
    },
    _v1_infoNeededToAddCompanion: {
      href: '/v1/air-reservations/reservations/record-locator/CHDWDE/companion-reservation/prices',
      method: 'GET',
      query: { 'first-name': 'k', 'last-name': 'Test' }
    },
    _links: {
      checkInSessionToken: '...',
      earlyBird: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/CHDWDE',
        method: 'GET',
        query: { 'first-name': 'Kyrr', 'last-name': 'Test' }
      },
      cancelBound: {
        href: '/v1/mobile-air-booking/page/flights/cancel-bound/CHDWDE',
        method: 'GET',
        query: { 'first-name': 'Kyrr', 'last-name': 'Test' }
      },
      viewStandbyList: null,
      checkIn: {
        href: '/v1/mobile-air-operations/page/check-in/CHDWDE',
        method: 'GET',
        query: { 'first-name': 'k', 'last-name': 'Test' }
      },
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: {
        href: '/v1/mobile-air-booking/page/flights/prices/CHDWDE/companion',
        method: 'POST',
        body: { companionPricingRequestToken: '...' }
      },
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/CHDWDE',
          method: 'GET',
          query: { 'first-name': 'Kyrr', 'last-name': 'Test', 'passenger-reference': '2' }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};
