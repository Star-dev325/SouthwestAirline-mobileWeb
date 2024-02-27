module.exports = {
  viewReservationViewPage: {
    pageHeader: 'MDW - DAL',
    dates: {
      first: '2017-08-15',
      second: null
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
        name: 'YANG LU',
        accountNumber: null,
        hasAnyEarlyBird: false
      }
    ],
    confirmationNumber: 'SDIBOR',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          {
            number: '724',
            wifiOnBoard: true
          }
        ],
        travelTime: '2h 10m',
        departureDate: '2017-08-15',
        departureTime: '06:00',
        departureAirport: {
          name: 'Chicago (Midway)',
          state: 'IL',
          code: 'MDW',
          country: null
        },
        arrivalTime: '08:10',
        arrivalAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
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
            number: '12',
            wifiOnBoard: true
          }
        ],
        travelTime: '2h 10m',
        departureDate: '2017-08-15',
        departureTime: '11:00',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '13:10',
        arrivalAirport: {
          name: 'Chicago (Midway)',
          state: 'IL',
          code: 'MDW',
          country: null
        },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        stops: [],
        isNextDayArrival: false
      }
    ],
    hasAnyCancelledFlights: false,
    isInternational: false,
    isDynamicWaiver: true,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/SDIBOR',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'YANG',
        'last-name': 'LU'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/SDIBOR',
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
      viewBoardingPassIssuance: {
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
        method: 'POST',
        body: {
          checkInSessionToken: 'checkInSessionToken',
          recordLocator: 'RMXAUA',
          firstName: 'HELEN',
          lastName: 'WANG',
          travelerID: ['123']
        }
      },
      viewBoardingPositions: null,
      editPNRPassengers: null
    }
  }
};
