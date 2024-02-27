module.exports = {
  viewReservationViewPage: {
    dates: { first: '2018-03-06', second: '2018-03-09' },
    checkInIneligibilityReason: null,
    destinationDescription: 'Austin',
    originAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
    destinationAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
    standbyFlight: null,
    companion: { confirmationNumber: 'COMPAN' },
    passengers: [
      {
        name: 'Jab Met',
        accountNumber: '600597056',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'COMPAN',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          { number: '1752', wifiOnBoard: true },
          { number: '5857', wifiOnBoard: true }
        ],
        travelTime: '4h 0m',
        departureDate: '2018-03-06',
        departureTime: '06:00',
        departureAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
        arrivalTime: '09:00',
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
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: { name: 'Dallas (Love Field)', state: 'TX', code: 'DAL', country: null },
            arrivalTime: '07:15',
            departureTime: '08:00',
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
          { number: '1776', wifiOnBoard: true },
          { number: '2101', wifiOnBoard: true }
        ],
        travelTime: '4h 40m',
        departureDate: '2018-03-09',
        departureTime: '05:15',
        departureAirport: { name: 'Austin', state: 'TX', code: 'AUS', country: null },
        arrivalTime: '10:55',
        arrivalAirport: { name: 'Atlanta', state: 'GA', code: 'ATL', country: null },
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
            airport: { name: 'St. Louis', state: 'MO', code: 'STL', country: null },
            arrivalTime: '07:20',
            departureTime: '08:20',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'ATL - AUS',
    shareDetails: {
      subject: 'Southwest Flight 1752 Atlanta to Austin',
      confirmationInfo: 'Confirmation #: COMPAN',
      passengerInfo: 'Passenger names: Jab Met',
      flightInfo: [
        {
          header: 'Departing Flight: Tue, Mar 06, 2018',
          flightInfo: 'Flight #: 1752/5857',
          departureInfo: 'Departs: 06:00 AM ATL',
          stops: ['Stop: Dallas (Love Field), TX. Change planes'],
          arrivalInfo: 'Arrives: 09:00 AM AUS',
          travelTime: 'Travel time: 4hr 0 mins'
        },
        {
          header: 'Returning Flight: Fri, Mar 09, 2018',
          flightInfo: 'Flight #: 1776/2101',
          departureInfo: 'Departs: 05:15 AM AUS',
          stops: ['Stop: St. Louis, MO. Change planes'],
          arrivalInfo: 'Arrives: 10:55 AM ATL',
          travelTime: 'Travel time: 4hr 40 mins'
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
      href: '/v1/mobile/reservations/record-locator/COMPAN',
      method: 'GET',
      query: { action: 'CHANGE', 'first-name': 'JAB', 'last-name': 'MET' }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/COMPAN',
      method: 'GET',
      query: { action: 'CANCEL', 'first-name': 'JAB', 'last-name': 'MET' }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      change: null,
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/COMPAN',
        method: 'GET',
        query: { 'first-name': 'Jab', 'last-name': 'Met' }
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
