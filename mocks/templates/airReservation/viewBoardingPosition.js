module.exports = {
  viewReservationViewPage: {
    pageHeader: 'MDW - BNA',
    dates: {
      first: '2017-08-15',
      second: null
    },
    checkInIneligibilityReason: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
    destinationDescription: 'Nashville',
    originAirport: {
      name: 'Chicago (Midway)',
      state: 'IL',
      code: 'MDW',
      country: null
    },
    destinationAirport: {
      name: 'Nashville',
      state: 'TN',
      code: 'BNA',
      country: null
    },
    companion: null,
    passengers: [
      {
        name: 'YANG LU',
        accountNumber: null,
        hasAnyEarlyBird: false
      },
      {
        name: 'PAUL TANGRILA',
        accountNumber: null,
        hasAnyEarlyBird: false
      }
    ],
    confirmationNumber: 'J5LOZM',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          {
            number: '357',
            wifiOnBoard: true
          }
        ],
        travelTime: '1h 20m',
        departureDate: '2017-08-15',
        departureTime: '05:35',
        departureAirport: {
          name: 'Chicago (Midway)',
          state: 'IL',
          code: 'MDW',
          country: null
        },
        arrivalTime: '06:55',
        arrivalAirport: {
          name: 'Nashville',
          state: 'TN',
          code: 'BNA',
          country: null
        },
        passengerTypeCounts: { adult: 2 },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
        stops: [],
        isNextDayArrival: false
      },
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          {
            number: '1684',
            wifiOnBoard: true
          },
          {
            number: '16',
            wifiOnBoard: false
          },
          {
            number: '289',
            wifiOnBoard: true
          }
        ],
        travelTime: '7h 45m',
        departureDate: '2017-08-15',
        departureTime: '07:35',
        departureAirport: {
          name: 'Nashville',
          state: 'TN',
          code: 'BNA',
          country: null
        },
        arrivalTime: '15:20',
        arrivalAirport: {
          name: 'Chicago (Midway)',
          state: 'IL',
          code: 'MDW',
          country: null
        },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
        stops: [
          {
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            airport: {
              name: 'Dallas (Love Field)',
              state: 'TX',
              code: 'DAL',
              country: null
            },
            arrivalTime: '09:25',
            departureTime: '11:35',
            changePlanes: true
          },
          {
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            airport: {
              name: 'St. Louis',
              state: 'MO',
              code: 'STL',
              country: null
            },
            arrivalTime: '13:15',
            departureTime: '14:15',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      }
    ],
    hasAnyCancelledFlights: false,
    isInternational: false,
    isDynamicWaiver: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/J5LOZM',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'YANG',
        'last-name': 'LU'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/J5LOZM',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'YANG',
        'last-name': 'LU'
      }
    },
    _links: {
      checkInSessionToken: '...',
      change: null,
      cancel: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: {
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        method: 'POST',
        body: {
          recordLocator: 'J5LOZM',
          firstName: 'YANG',
          lastName: 'LU'
        }
      },
      editPNRPassengers: null
    }
  }
};
