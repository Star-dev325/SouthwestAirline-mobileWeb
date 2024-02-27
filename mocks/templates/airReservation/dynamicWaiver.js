module.exports = {
  viewReservationViewPage: {
    pageHeader: 'MDW - DAL',
    dates: {
      first: '2017-09-01',
      second: '2017-09-10'
    },
    checkInIneligibilityReason: null,
    destinationDescription: 'Dallas',
    originAirport: {
      name: 'Chicago (Midway)',
      state: 'IL',
      code: 'MDW',
      country: null
    },
    destinationAirport: {
      name: 'Dallas (Love Field)',
      state: 'TX',
      code: 'DAL',
      country: null
    },
    companion: null,
    passengers: [
      {
        name: 'AMBER AWESOME',
        accountNumber: null,
        passengerReference: '2',
        hasAnyEarlyBird: true
      },
      {
        name: 'JANE SMITH',
        accountNumber: null,
        passengerReference: '3',
        hasAnyEarlyBird: true
      }
    ],
    confirmationNumber: 'KGH38R',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '543',
            wifiOnBoard: true
          },
          {
            number: '1684',
            wifiOnBoard: true
          }
        ],
        travelTime: '3h 50m',
        departureDate: '2017-09-01',
        departureTime: '05:35',
        departureAirport: {
          name: 'Chicago (Midway)',
          state: 'IL',
          code: 'MDW',
          country: null
        },
        arrivalTime: '09:25',
        arrivalAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        passengerTypeCounts: { adult: 2 },
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        fareType: 'BusinessSelect',
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: {
              name: 'Nashville',
              state: 'TN',
              code: 'BNA',
              country: null
            },
            arrivalTime: '06:55',
            departureTime: '07:35',
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
          {
            number: '4887',
            wifiOnBoard: true
          },
          {
            number: '4249',
            wifiOnBoard: true
          }
        ],
        travelTime: '4h 5m',
        departureDate: '2017-09-10',
        departureTime: '18:35',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '22:40',
        arrivalAirport: {
          name: 'Chicago (Midway)',
          state: 'IL',
          code: 'MDW',
          country: null
        },
        passengerTypeCounts: { adult: 2 },
        fareProductDetails: {
          label: 'Business Select',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/business-select'
        },
        fareType: 'BusinessSelect',
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: {
              name: 'Nashville',
              state: 'TN',
              code: 'BNA',
              country: null
            },
            arrivalTime: '20:20',
            departureTime: '21:15',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      }
    ],
    hasAnyCancelledFlights: false,
    isInternational: false,
    isDynamicWaiver: true,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/KGH38R',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'AMBER',
        'last-name': 'AWESOME'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/KGH38R',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'AMBER',
        'last-name': 'AWESOME'
      }
    },
    _links: {
      checkInSessionToken: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/SAVBOJ',
        method: 'GET',
        query: {
          'first-name': 'Cannon',
          'last-name': 'Janusz'
        }
      },
      cancel: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      editPNRPassengers: null
    }
  }
};
