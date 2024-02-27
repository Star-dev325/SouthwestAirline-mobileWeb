module.exports = {
  viewReservationViewPage: {
    dates: {
      first: '2018-05-21',
      second: '2018-05-24'
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
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'Aaa Aaa',
        accountNumber: null,
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: false,
        isCheckInEligible: false,
        isUnaccompaniedMinor: false
      }
    ],
    confirmationNumber: 'OPENJW',
    shouldShowAddEarlyBirdButton: true,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '65',
            wifiOnBoard: true
          }
        ],
        travelTime: '1h 0m',
        departureDate: '2018-05-21',
        departureTime: '06:00',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '07:00',
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
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [],
        isNextDayArrival: false
      },
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '1817',
            wifiOnBoard: true
          },
          {
            number: '1911',
            wifiOnBoard: true
          }
        ],
        travelTime: '4h 50m',
        departureDate: '2018-05-24',
        departureTime: '07:25',
        departureAirport: {
          name: 'Houston (Hobby)',
          state: 'TX',
          code: 'HOU',
          country: null
        },
        arrivalTime: '13:15',
        arrivalAirport: {
          name: 'Philadelphia',
          state: 'PA',
          code: 'PHL',
          country: null
        },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        boundType: 'DEPARTING',
        standbyFlight: null,
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
            arrivalTime: '09:15',
            departureTime: '10:20',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'DAL - HOU',
    shareDetails: {
      subject: 'Southwest Flight 65 Dallas (Love Field) to Houston (Hobby)',
      confirmationInfo: 'Confirmation #: OPENJW',
      passengerInfo: 'Passenger names: Aaa Aaa',
      flightInfo: [
        {
          header: 'Departing Flight: Mon, May 21, 2018',
          flightInfo: 'Flight #: 65',
          departureInfo: 'Departs: 06:00 AM DAL',
          stops: null,
          arrivalInfo: 'Arrives: 07:00 AM HOU',
          travelTime: 'Travel time: 1hr 0 mins'
        },
        {
          header: 'Departing Flight: Thu, May 24, 2018',
          flightInfo: 'Flight #: 1817/1911',
          departureInfo: 'Departs: 07:25 AM HOU',
          stops: ['Stop: Nashville, TN. Change planes'],
          arrivalInfo: 'Arrives: 01:15 PM PHL',
          travelTime: 'Travel time: 4hr 50 mins'
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
      href: '/v1/mobile/reservations/record-locator/OPENJW',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'a',
        'last-name': 'aaa'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/OPENJW',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'a',
        'last-name': 'aaa'
      }
    },
    _v1_infoNeededToAddCompanion: null,
    _links: {
      checkInSessionToken: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/OPENJW',
        method: 'GET',
        query: {
          'first-name': 'Aaa',
          'last-name': 'Aaa'
        }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/OPENJW',
        method: 'GET',
        query: {
          'first-name': 'Aaa',
          'last-name': 'Aaa'
        }
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
