module.exports = {
  viewReservationViewPage: {
    pageHeader: 'DAL - HOU',
    dates: {
      first: '2017-08-31',
      second: null
    },
    greyBoxMessage: null,
    greyBoxPassengerMessage: null,
    dayOfTravelContactInfo: 'Text: 469-489-3989',
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
    companion: {
      confirmationNumber: 'JAYHZQ'
    },
    passengers: [
      {
        name: 'QIANQIAN WANG',
        accountNumber: '601141461',
        hasAnyEarlyBird: true,
        isCheckedIn: false
      }
    ],
    confirmationNumber: 'JAXNZG',
    shouldShowAddEarlyBirdButton: true,
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
      href: '/v1/mobile/reservations/record-locator/JAXNZG',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'QIANQIAN',
        'last-name': 'WANG'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/JAXNZG',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'QIANQIAN',
        'last-name': 'WANG'
      }
    },
    _links: {
      checkInSessionToken: null,
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/JAXNZG',
        method: 'GET',
        query: { 'first-name': 'YANG', 'last-name': 'LU' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/JAXNZG',
        method: 'GET',
        query: { 'first-name': 'YANG', 'last-name': 'LU' }
      },
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/KSC7ZD',
        method: 'GET',
        query: {
          'passenger-search-token':
            'gTySZe5zo-KNy5sMnJnjHvvA1DDQxR9pBV12VsoxCSeqdTLMY0q8odV2MHzl3gBwcUDcABs-G4kvjkvmvKedWtvItHx0oikgfydNA-upvh9SEhpyrh4AXKT1OzKUwuVqr3smep91uiRBsfCvTg'
        }
      },
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      editPNRPassengers: null
    }
  }
};
