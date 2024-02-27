module.exports = {
  viewReservationViewPage: {
    _links: {
      cancel: null,
      change: null,
      checkIn: {
        href: '/v1/mobile-air-operations/page/check-in/STMXQ6',
        method: 'GET',
        query: {
          'first-name': 'a',
          'last-name': 'awosome'
        }
      },
      checkInSessionToken: '',
      editPNRPassengers: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      viewStandbyList: {
        href: '/v1/mobile-air-operations/page/standby',
        method: 'GET',
        query: {
          'arrival-time': '06:55',
          'carrier-code': 'WN',
          'departure-date': '2017-11-16',
          'departure-time': '06:00',
          'destination-airport': 'MDW',
          'first-name': 'AMBER',
          'flight-number': '1479',
          'has-wifi': true,
          'last-name': 'AWESOME',
          'origin-airport': 'ATL',
          'record-locator': 'STMXQ6'
        }
      }
    },
    _v1_infoNeededToAddCompanion: null,
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/STMXQ6',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'a',
        'last-name': 'awosome'
      }
    },
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/STMXQ6',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'a',
        'last-name': 'awosome'
      }
    },
    bounds: [
      {
        arrivalAirport: {
          code: 'OAK',
          country: null,
          name: 'Oakland',
          state: 'CA'
        },
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        arrivalTime: '11:05',
        boundType: 'DEPARTING',
        departureAirport: {
          code: 'ATL',
          country: null,
          name: 'Atlanta',
          state: 'GA'
        },
        departureDate: '2017-11-16',
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        departureTime: '06:00',
        flights: [
          {
            number: '1479',
            wifiOnBoard: true
          },
          {
            number: '654',
            wifiOnBoard: true
          }
        ],
        isNextDayArrival: false,
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Unavailable',
          fareRulesUrl: '/fare-rules'
        },
        fareType: 'Unavailable',
        standbyFlight: {
          arrivalAirportCode: 'MDW',
          arrivalTime: '06:55',
          departureTime: '06:00',
          flightNumber: '1479',
          hasWifi: true,
          viewStandbyList: {
            href: '/v1/mobile-air-operations/page/standby',
            method: 'GET',
            query: {
              'arrival-time': '06:55',
              'carrier-code': 'WN',
              'departure-date': '2017-11-16',
              'departure-time': '06:00',
              'destination-airport': 'MDW',
              'first-name': 'AMBER',
              'flight-number': '1479',
              'has-wifi': true,
              'last-name': 'AWESOME',
              'origin-airport': 'ATL',
              'record-locator': 'STMXQ6'
            }
          }
        },
        stops: [
          {
            airport: {
              code: 'MDW',
              country: null,
              name: 'Chicago (Midway)',
              state: 'IL'
            },
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            arrivalTime: '06:55',
            changePlanes: true,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            departureTime: '08:15'
          }
        ],
        travelTime: '8h 5m'
      },
      {
        arrivalAirport: {
          code: 'ATL',
          country: null,
          name: 'Atlanta',
          state: 'GA'
        },
        arrivalStatus: null,
        arrivalStatusType: null,
        arrivalTime: '19:15',
        boundType: 'RETURNING',
        departureAirport: {
          code: 'OAK',
          country: null,
          name: 'Oakland',
          state: 'CA'
        },
        departureDate: '2017-11-18',
        departureStatus: null,
        departureStatusType: null,
        departureTime: '11:45',
        flights: [
          {
            number: '2215',
            wifiOnBoard: true
          }
        ],
        isNextDayArrival: false,
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Unavailable',
          fareRulesUrl: '/fare-rules'
        },
        fareType: 'Unavailable',
        standbyFlight: {
          arrivalAirportCode: 'ATL',
          arrivalTime: '08:55',
          departureTime: '06:00',
          flightNumber: '1479',
          hasWifi: true,
          viewStandbyList: {
            href: '/v1/mobile-air-operations/page/standby',
            method: 'GET',
            query: {
              'arrival-time': '08:55',
              'carrier-code': 'WN',
              'departure-date': '2017-11-16',
              'departure-time': '06:00',
              'destination-airport': 'ATL',
              'first-name': 'AMBER',
              'flight-number': '1479',
              'has-wifi': true,
              'last-name': 'AWESOME',
              'origin-airport': 'ATL',
              'record-locator': 'STMXQ6'
            }
          }
        },
        stops: [],
        travelTime: '4h 30m'
      }
    ],
    checkInIneligibilityReason: null,
    companion: null,
    confirmationNumber: 'STMXQ6',
    dates: {
      first: '2017-11-16',
      second: '2017-11-18'
    },
    destinationAirport: {
      code: 'OAK',
      country: null,
      name: 'Oakland',
      state: 'CA'
    },
    destinationDescription: 'Oakland',
    hasAnyCancelledFlights: false,
    hasUnaccompaniedMinor: false,
    isCheckInEligible: true,
    isCheckedIn: false,
    isDynamicWaiver: false,
    isInternational: false,
    isNonRevPnr: false,
    originAirport: {
      code: 'ATL',
      country: null,
      name: 'Atlanta',
      state: 'GA'
    },
    pageHeader: 'ATL - OAK',
    passengers: [
      {
        accountNumber: null,
        checkInIneligibilityReason: null,
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: true,
        isCheckInEligible: true,
        isCheckedIn: false,
        isUnaccompaniedMinor: false,
        name: 'Amber Awesome',
        passengerReference: '2'
      }
    ],
    shouldShowAddEarlyBirdButton: true,
    standbyFlight: {
      arrivalAirportCode: 'MDW',
      arrivalTime: '06:55',
      departureTime: '06:00',
      flightNumber: '1479',
      hasWifi: true,
      viewStandbyList: null
    }
  }
};
