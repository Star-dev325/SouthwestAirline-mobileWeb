module.exports = {
  viewReservationViewPage: {
    pageHeader: 'DAL - MEX',
    dates: {
      first: '2017-08-31',
      second: null
    },
    dayOfTravelContactInfo: 'Text: 469-489-3989',
    checkInIneligibilityReason: 'MBP_UNAVAILABLE_INTL',
    destinationDescription: 'Mexico City',
    originAirport: {
      name: 'Dallas (Love Field)',
      state: 'TX',
      code: 'DAL',
      country: null
    },
    destinationAirport: {
      name: 'Mexico City',
      state: null,
      code: 'MEX',
      country: 'Mexico'
    },
    isSwabiz: false,
    standbyFlight: null,
    companion: null,
    passengers: [
      {
        name: 'AMBER AWESOME',
        accountNumber: null,
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: true,
        checkInIneligibilityReason: 'MBP_UNAVAILABLE_INTL',
        isCheckedIn: true,
        checkInEligible: true
      }
    ],
    confirmationNumber: 'INTCHC',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: 'ON TIME',
        departureStatusType: 'POSITIVE',
        arrivalStatus: 'ON TIME',
        arrivalStatusType: 'POSITIVE',
        flights: [
          {
            number: '33',
            wifiOnBoard: false
          },
          {
            number: '943',
            wifiOnBoard: true
          }
        ],
        travelTime: '6h 15m',
        departureDate: '2017-08-31',
        departureTime: '14:30',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '20:45',
        arrivalAirport: {
          name: 'Mexico City',
          state: null,
          code: 'MEX',
          country: 'Mexico'
        },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Wanna Get Away',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/wanna-get-away'
        },
        fareType: 'WannaGetAway',
        stops: [
          {
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            airport: {
              name: 'Houston (Hobby)',
              state: 'TX',
              code: 'HOU',
              country: null
            },
            arrivalTime: '15:35',
            departureTime: '18:40',
            changePlanes: true
          }
        ],
        isNextDayArrival: false
      }
    ],
    hasAnyCancelledFlights: false,
    isInternational: true,
    isDynamicWaiver: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/INTCHC',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'AMBER',
        'last-name': 'AWESOME'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/INTCHC',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'AMBER',
        'last-name': 'AWESOME'
      }
    },
    _links: {
      checkInSessionToken: '...',
      change: null,
      cancel: null,
      viewStandbyList: null,
      checkIn: null,
      viewBoardingPassIssuance: null,
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/GDSINT',
        method: 'GET',
        query: {
          'passenger-search-token':
            'gTySZe5zo-KNy5sMnJnjHvvA1DDQxR9pBV12VsoxCSeqdTLMY0q8odV2MHzl3gBwcUDcABs-G4kvjkvmvKedWtvItHx0oikgfydNA-upvh9SEhpyrh4AXKT1OzKUwuVqr3smep91uiRBsfCvTg'
        }
      },
      viewBoardingPositions: {
        href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
        method: 'POST',
        body: {
          recordLocator: 'INTCHC',
          'first-name': 'AMBER',
          'last-name': 'AWESOME'
        }
      },
      editPNRPassengers: [
        {
          href: '/v1/mobile-misc/page/view-reservation/passport-emergency-contact/INTCHC',
          method: 'GET',
          query: {
            'first-name': 'AMBER',
            'last-name': 'AWESOME',
            'passenger-reference': '2'
          }
        }
      ]
    },
    greyBoxPassengerMessage: {
      key: 'GREY_BOX_UNAVAILABLE_INTL',
      header: 'Airport check in required.',
      body: 'This flight is not eligible for Mobile Boarding Pass. Please visit a kiosk or ticket counter for your boarding passes.'
    },
    greyBoxMessage: null
  }
};
