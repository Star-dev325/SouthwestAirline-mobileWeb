module.exports = {
  viewReservationViewPage: {
    pageHeader: 'DAL - HOU',
    dates: {
      first: '2017-08-31',
      second: null
    },
    checkInIneligibilityReason: null,
    destinationDescription: 'Houston',
    originAirport: {
      name: 'Dallas (Love Field)',
      state: 'TX',
      code: 'DAL',
      country: null
    },
    destinationAirport: {
      name: 'Houston (Hobby)',
      state: 'TX',
      code: 'HOU',
      country: null
    },
    passengers: [
      {
        name: 'QIANQIAN WANG',
        accountNumber: '601141461',
        hasAnyEarlyBird: true,
        isCheckedIn: false
      }
    ],
    confirmationNumber: 'R8GDQZ',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        boundType: 'DEPARTING',
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '3',
            wifiOnBoard: true
          }
        ],
        travelTime: '1h 5m',
        departureDate: '2017-08-31',
        departureTime: '07:30',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '08:35',
        arrivalAirport: {
          name: 'Houston (Hobby)',
          state: 'TX',
          code: 'HOU',
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
    isDynamicWaiver: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/R8GDQZ',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'QIANQIAN',
        'last-name': 'WANG'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/R8GDQZ',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'QIANQIAN',
        'last-name': 'WANG'
      }
    },
    _v1_infoNeededToAddCompanion: {
      href: '/v1/air-reservations/reservations/record-locator/R8GDQZ/companion-reservation/prices',
      method: 'GET',
      query: {
        'first-name': 'QIANQIAN',
        'last-name': 'WANG'
      }
    },
    _links: {
      checkInSessionToken: null,
      change: null,
      cancel: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      editPNRPassengers: null
    }
  }
};
