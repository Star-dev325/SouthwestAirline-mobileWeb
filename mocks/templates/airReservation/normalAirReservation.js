import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

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
        hasAnyEarlyBird: false,
        isCheckedIn: false
      }
    ],
    isSwabiz: false,
    confirmationNumber: 'VIWAIR',
    shouldShowAddEarlyBirdButton: true,
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
        isNextDayArrival: false,
        passengers: new ViewReservationBuilder().generateBoundPassengersList(1, 'Wanna Get Away') 
      }
    ],
    hasAnyCancelledFlights: false,
    isInternational: false,
    isDynamicWaiver: false,
    _v1_infoNeededToChange: {
      href: '/v1/mobile/reservations/record-locator/VIWAIR',
      method: 'GET',
      query: {
        action: 'CHANGE',
        'first-name': 'YANG',
        'last-name': 'LU'
      }
    },
    _v1_infoNeededToCancel: {
      href: '/v1/mobile/reservations/record-locator/VIWAIR',
      method: 'GET',
      query: {
        action: 'CANCEL',
        'first-name': 'YANG',
        'last-name': 'LU'
      }
    },
    _links: {
      checkInSessionToken: '...',
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/VIWAIR',
        method: 'GET',
        query: { 'first-name': 'Yang', 'last-name': 'Lu' }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/VIWAIR',
        method: 'GET',
        query: { 'first-name': 'Yang', 'last-name': 'Lu' }
      },
      checkIn: null,
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      editPNRPassengers: null
    }
  }
};
