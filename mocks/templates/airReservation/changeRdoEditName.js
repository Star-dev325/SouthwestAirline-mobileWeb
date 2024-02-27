module.exports = {
  viewReservationViewPage: {
    dates: {
      first: '2020-04-23',
      second: null
    },
    messages: null,
    changeBlockedMessage: null,
    cancelBlockedMessage: null,
    checkInIneligibilityReason: null,
    greyBoxMessage: null,
    greyBoxPassengerMessage: null,
    destinationDescription: 'Atlanta',
    originAirport: {
      name: 'Austin',
      state: 'TX',
      code: 'AUS',
      country: null
    },
    destinationAirport: {
      name: 'Atlanta',
      state: 'GA',
      code: 'ATL',
      country: null
    },
    companion: null,
    passengers: [
      {
        name: 'Carol Biggs',
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
    dayOfTravelContactInfo: 'Text: 512-555-5555',
    confirmationNumber: 'RDO2CH',
    shouldShowAddEarlyBirdButton: true,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '448',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-800',
              numberOfSeats: 175,
              wifiSupported: true
            }
          },
          {
            number: '1594',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-800',
              numberOfSeats: 175,
              wifiSupported: true
            }
          }
        ],
        travelTime: '5h 10m',
        departureDate: '2020-04-23',
        departureTime: '05:15',
        departureAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        arrivalTime: '11:25',
        arrivalAirport: {
          name: 'Atlanta',
          state: 'GA',
          code: 'ATL',
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
              name: 'Chicago (Midway)',
              state: 'IL',
              code: 'MDW',
              country: null
            },
            arrivalTime: '07:45',
            departureTime: '08:30',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false
      }
    ],
    pageHeader: 'AUS - ATL',
    shareDetails: {
      subject: 'Southwest Flight 448/1594 Austin to Atlanta',
      confirmationInfo: 'Confirmation #: OPN9DY',
      passengerInfo: 'Passenger names: Carol Biggs',
      flightInfo: [
        {
          header: 'Departing Flight: Thu, Apr 23, 2020',
          title: 'Southwest Flight 448/1594 Austin to Atlanta',
          flightInfo: 'Flight #: 448/1594',
          departureInfo: 'Departs: 05:15 AM AUS',
          departureDateTime: '2020-04-23T05: 15:00.000-05:00',
          stops: ['Stop: Chicago (Midway), IL. Change planes'],
          arrivalInfo: 'Arrives: 11:25 AM ATL',
          arrivalDateTime: '2020-04-23T11: 25:00.000-04:00',
          travelTime: 'Travel time: 5hr 10 mins'
        }
      ]
    },
    viewReservationAnalytics: {
      recordLocator: 'RDO2CH',
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
        href: '/v1/mobile-air-booking/page/early-bird/RDO2CH',
        method: 'GET',
        query: {
          'first-name': 'Carol',
          'last-name': 'Biggs',
          'passenger-search-token':
            'KCv3bCnL5qe5-AI8sluqJZXBOMqPNc4qNIIMVfMhNOK-GnDlylq_MJXvBy8YQZQIIeb67wR6ltomMMZllF9mkVCdTELhIEYz0Ikk5m-1TTc-TjMdUxHM6Mu7H1ZZzo72x3hWUZ7159QVc8o_Jg=='
        }
      },
      change: {
        href: '/v1/mobile-air-booking/page/flights/change/current/RDO2CH',
        method: 'GET',
        query: {
          'first-name': 'Carol',
          'last-name': 'Biggs',
          'passenger-search-token':
            'KCv3bCnL5qe5-AI8sluqJZXBOMqPNc4qNIIMVfMhNOK-GnDlylq_MJXvBy8YQZQIIeb67wR6ltomMMZllF9mkVCdTELhIEYz0Ikk5m-1TTc-TjMdUxHM6Mu7H1ZZzo72x3hWUZ7159QVc8o_Jg=='
        }
      },
      reaccom: null,
      cancel: {
        href: '/v1/mobile-air-booking/page/cancel-reservation/RDO2CH',
        method: 'GET',
        query: {
          'first-name': 'Carol',
          'last-name': 'Biggs',
          'passenger-search-token':
            'KCv3bCnL5qe5-AI8sluqJZXBOMqPNc4qNIIMVfMhNOK-GnDlylq_MJXvBy8YQZQIIeb67wR6ltomMMZllF9mkVCdTELhIEYz0Ikk5m-1TTc-TjMdUxHM6Mu7H1ZZzo72x3hWUZ7159QVc8o_Jg=='
        }
      },
      viewStandbyList: null,
      checkIn: null,
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/RDO2CH',
        method: 'GET',
        query: {
          'passenger-search-token':
            'KCv3bCnL5qe5-AI8sluqJZXBOMqPNc4qNIIMVfMhNOK-GnDlylq_MJXvBy8YQZQIIeb67wR6ltomMMZllF9mkVCdTELhIEYz0Ikk5m-1TTc-TjMdUxHM6Mu7H1ZZzo72x3hWUZ7159QVc8o_Jg=='
        }
      },
      viewBoardingPassIssuance: null,
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/RDO2CH',
          method: 'GET',
          query: {
            'first-name': 'Carol',
            'last-name': 'Biggs',
            'passenger-reference': '2',
            'passenger-search-token':
              'g7ytdhZlhMB0TSwK3NonK_Xxme05_O9e9_R1DcJrxOVR_x2wfCRQExgIVFEMwIYXA_B1pExZPnGRKNMP-BtKqXGf9Ukj_VeBfeEJvl4ypbms8Wk1j0ZZJRVqmV_cdwh2tnETJktB1_7Y0Qgyog=='
          }
        }
      ],
      cancelBound: {
        href: '/v1/mobile-air-booking/page/flights/cancel-bound/RDO2CH',
        method: 'GET',
        query: {
          'passenger-search-token':
            'KCv3bCnL5qe5-AI8sluqJZXBOMqPNc4qNIIMVfMhNOK-GnDlylq_MJXvBy8YQZQIIeb67wR6ltomMMZllF9mkVCdTELhIEYz0Ikk5m-1TTc-TjMdUxHM6Mu7H1ZZzo72x3hWUZ7159QVc8o_Jg=='
        }
      }
    },
    hasUnaccompaniedMinor: false
  }
};
