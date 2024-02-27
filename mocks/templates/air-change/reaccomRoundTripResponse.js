module.exports = {
  viewReservationViewPage: {
    dates: {
      first: '2019-11-13',
      second: '2019-11-14'
    },
    messages: [
      {
        key: 'REACCOM_VIEW_RESERVATION',
        header: 'We rebooked you on a new flight.',
        body: "You may change this flight free of charge. We're sincerely sorry for any inconvenience. If you checked bags, we'll make every effort to reroute your luggage with your new itinerary.",
        icon: 'WARNING',
        textColor: 'DEFAULT'
      }
    ],
    checkInIneligibilityReason: null,
    greyBoxMessage: null,
    greyBoxPassengerMessage: null,
    destinationDescription: 'Austin',
    originAirport: {
      name: 'Dallas (Love Field)',
      state: 'TX',
      code: 'DAL',
      country: null
    },
    destinationAirport: {
      name: 'Austin',
      state: 'TX',
      code: 'AUS',
      country: null
    },
    companion: null,
    passengers: [
      {
        name: 'Tessa Test',
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
    dayOfTravelContactInfo: 'Text: 214-310-1800',
    confirmationNumber: 'REACC2',
    shouldShowAddEarlyBirdButton: true,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '750',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }
        ],
        travelTime: '1h 0m',
        departureDate: '2019-11-13',
        departureTime: '20:30',
        departureAirport: {
          name: 'Dallas (Love Field)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '21:30',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
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
            number: '973',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }
        ],
        travelTime: '1h 5m',
        departureDate: '2019-11-14',
        departureTime: '17:50',
        departureAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        arrivalTime: '18:55',
        arrivalAirport: {
          name: 'Dallas (Love)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        passengerTypeCounts: { adult: 1 },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
        boundType: 'DEPARTING',
        standbyFlight: null,
        stops: [],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'DAL - AUS',
    shareDetails: {
      subject: 'Southwest Flight 750 Dallas (Love Field) to Austin',
      confirmationInfo: 'Confirmation #: REACC2',
      passengerInfo: 'Passenger names: Tessa Test',
      flightInfo: [
        {
          header: 'Departing Flight: Wed, Nov 13, 2019',
          title: 'Southwest Flight 750 Dallas (Love Field) to Austin',
          flightInfo: 'Flight #: 750',
          departureInfo: 'Departs: 08:30 PM DAL',
          departureDateTime: '2019-11-13T20:30:00.000-06:00',
          stops: null,
          arrivalInfo: 'Arrives: 09:30 PM AUS',
          arrivalDateTime: '2019-11-13T21:30:00.000-06:00',
          travelTime: 'Travel time: 1hr 0 mins'
        },
        {
          header: 'Departing Flight: Thu, Nov 14, 2019',
          title: 'Southwest Flight 973 Austin to Houston (Hobby)',
          flightInfo: 'Flight #: 973',
          departureInfo: 'Departs: 05:50 PM AUS',
          departureDateTime: '2019-11-14T17:50:00.000-06:00',
          stops: null,
          arrivalInfo: 'Arrives: 06:55 PM DAL',
          arrivalDateTime: '2019-11-14T18:55:00.000-06:00',
          travelTime: 'Travel time: 1hr 5 mins'
        }
      ]
    },
    viewReservationAnalytics: {
      recordLocator: 'REACC2',
      gdsTicketType: null,
      isInternational: false,
      isSwabiz: false
    },
    hasAnyCancelledFlights: false,
    isCheckInEligible: false,
    isCheckedIn: false,
    isInternational: false,
    isDynamicWaiver: false,
    isNonRevPnr: false,
    isSwabiz: false,
    _links: {
      checkInSessionToken: null,
      earlyBird: {
        href: '/v1/mobile-air-booking/page/early-bird/REACC2',
        method: 'GET',
        query: {
          'first-name': 'Tessa',
          'last-name': 'Test'
        }
      },
      change: null,
      reaccom: {
        href: '/v1/mobile-air-booking/page/flights/reaccom/reservations/current/REACC2',
        method: 'GET',
        query: {
          'first-name': 'Tessa',
          'last-name': 'Test'
        }
      },
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/REACC2',
        method: 'GET',
        query: {
          'first-name': 'Tessa',
          'last-name': 'Test'
        }
      },
      viewStandbyList: null,
      checkIn: null,
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/REACC2',
        method: 'GET',
        query: {
          'passenger-search-token':
            'ml20A2q6lQiahrorkg6Lkvv2hWrD3w4avjgQ6yILedp3vhXCBsgLCtXaWhJBxVtLTfEI31uZGHju9t5DgMuhKHdPeNxdwwaV_0Pg3XY_xtZzQmdq78B_NcoUcgQfqadc5gW_JdfebNK7_Yl-'
        }
      },
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/REACC2',
          method: 'GET',
          query: {
            'first-name': 'Tessa',
            'last-name': 'Test',
            'passenger-reference': '2',
            'passenger-search-token':
              'HhSScWFfNJRdYrOpmjQKB0abq-g1LKLnNenwOVh7Kdb_poWTfjd7OpxH74BKee9pIj_Iyf-OQSOW8X7zeyMBnQ582bJmaZpK6Alyv6Spvd60OBwQhcQs5lLLe4_PMVbITqdGGh-NARiUa_HC'
          }
        }
      ]
    },
    hasUnaccompaniedMinor: false
  }
};
