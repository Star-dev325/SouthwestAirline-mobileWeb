import ViewReservationBuilder from 'test/builders/model/viewReservationBuilder';

module.exports = {
  viewReservationViewPage: {
    dates: {
      first: '2020-10-28',
      second: '2020-10-30'
    },
    messages: null,
    changeBlockedMessage: null,
    cancelBlockedMessage: null,
    checkInIneligibilityReason: null,
    greyBoxMessage: {
      key: 'GREY_BOX_UNAVAILABLE_NON_REVENUE_SPACE_AVAILABLE',
      header: null,
      body: 'To manage Nonrev reservations, visit mobile.swalife.com or ask a Southwest agent for assistance.'
    },
    greyBoxPassengerMessage: null,
    destinationDescription: 'Albany',
    originAirport: {
      name: 'Austin',
      state: 'TX',
      code: 'AUS',
      country: null
    },
    destinationAirport: {
      name: 'Albany',
      state: 'NY',
      code: 'ALB',
      country: null
    },
    companion: null,
    passengers: [
      {
        name: 'John Doe JR',
        accountNumber: '601330940',
        passengerReference: '2',
        hasAnyEarlyBird: false,
        hasCompletePassportInfo: false,
        checkInIneligibilityReason: null,
        isCheckedIn: true,
        isCheckInEligible: true,
        isUnaccompaniedMinor: false
      }
    ],
    dayOfTravelContactInfo: 'None',
    confirmationNumber: '2IGGMN',
    shouldShowAddEarlyBirdButton: false,
    bounds: [
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '212',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737 MAX8',
              numberOfSeats: 175,
              wifiSupported: true
            }
          },
          {
            number: '234',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-800',
              numberOfSeats: 175,
              wifiSupported: true
            }
          }
        ],
        travelTime: '6h 5m',
        departureDate: '2020-10-28',
        departureTime: '06:00',
        departureAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        arrivalTime: '13:05',
        arrivalAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        passengerTypeCounts: {
          adult: 1
        },
        fareType: 'Unavailable',
        boundType: 'DEPARTING',
        standbyFlight: {
          flightNumber: '212',
          departureTime: '06:00',
          arrivalTime: '09:30',
          arrivalAirportCode: 'MCO',
          hasWifi: true,
          viewStandbyList: {
            href: '/v1/mobile-air-operations/page/standby',
            method: 'GET',
            query: {
              'carrier-code': 'WN',
              'origin-airport': 'AUS',
              'destination-airport': 'MCO',
              'departure-date': '2020-10-28',
              'departure-time': '06:00',
              'arrival-time': '09:30',
              'flight-number': '212',
              'record-locator': '2IGGMN',
              'first-name': 'JOHN',
              'last-name': 'DOE',
              'has-wifi': true,
              'passenger-search-token':
                '6njyyNUtaz4ST2NdPu9uZ_n10x69PtrRpnbIRjXUthUAIXQKCarRpfz6IOerndgHdXhd1KbXcWEFmZ2cnzu6FU70623uqb1xdpTjjc72BBTt5nol5zPUpeaFLA3UMf9xhoT8XcAPbswogw=='
            }
          }
        },
        fareProductDetails: {
          label: 'Unavailable',
          fareRulesUrl: '/fare-rules/'
        },
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: {
              name: 'Orlando',
              state: 'FL',
              code: 'MCO',
              country: null
            },
            arrivalTime: '09:30',
            departureTime: '10:25',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false,
        passengers: new ViewReservationBuilder().generateBoundPassengersList(1, 'Unavailable') 
      },
      {
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '133',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          },
          {
            number: '402',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-800',
              numberOfSeats: 175,
              wifiSupported: true
            }
          }
        ],
        travelTime: '6h 25m',
        departureDate: '2020-10-30',
        departureTime: '07:00',
        departureAirport: {
          name: 'Albany',
          state: 'NY',
          code: 'ALB',
          country: null
        },
        arrivalTime: '12:25',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengerTypeCounts: {
          adult: 1
        },
        fareType: 'Unavailable',
        boundType: 'RETURNING',
        standbyFlight: null,
        fareProductDetails: {
          label: 'Unavailable',
          fareRulesUrl: '/fare-rules/'
        },
        stops: [
          {
            departureStatus: null,
            departureStatusType: null,
            arrivalStatus: null,
            arrivalStatusType: null,
            airport: {
              name: 'Orlando',
              state: 'FL',
              code: 'MCO',
              country: null
            },
            arrivalTime: '10:00',
            departureTime: '10:35',
            changePlanes: true,
            missingAirportDetails: false
          }
        ],
        isNextDayArrival: false,
        passengers: new ViewReservationBuilder().generateBoundPassengersList(1, 'Unavailable') 
      }
    ],
    pageHeader: 'AUS - ALB',
    shareDetails: {
      subject: 'Southwest Flight 212/234 Austin to Albany',
      confirmationInfo: 'Confirmation #: 2IGGMN',
      passengerInfo: 'Passenger names: John Doe JR',
      flightInfo: [
        {
          header: 'Departing Flight: Wed, Oct 28, 2020',
          title: 'Southwest Flight 212/234 Austin to Albany',
          flightInfo: 'Flight #: 212/234',
          departureInfo: 'Departs: 06:00 AM AUS',
          departureDateTime: '2020-10-28T06:00:00.000-05:00',
          stops: ['Stop: Orlando, FL. Change planes'],
          arrivalInfo: 'Arrives: 01:05 PM ALB',
          arrivalDateTime: '2020-10-28T13:05:00.000-04:00',
          travelTime: 'Travel time: 6hr 5 mins'
        },
        {
          header: 'Returning Flight: Fri, Oct 30, 2020',
          title: 'Southwest Flight 133/402 Albany to Austin',
          flightInfo: 'Flight #: 133/402',
          departureInfo: 'Departs: 07:00 AM ALB',
          departureDateTime: '2020-10-30T07:00:00.000-04:00',
          stops: ['Stop: Orlando, FL. Change planes'],
          arrivalInfo: 'Arrives: 12:25 PM AUS',
          arrivalDateTime: '2020-10-30T12:25:00.000-05:00',
          travelTime: 'Travel time: 6hr 25 mins'
        }
      ]
    },
    viewReservationAnalytics: {
      recordLocator: '2IGGMN',
      gdsTicketType: null,
      tripType: 'roundTrip',
      daysToTrip: '1',
      multipax: null,
      isInternational: false,
      isSwabiz: false
    },
    checkinCountdownTimeStamp: null,
    hasAnyCancelledFlights: false,
    isCheckInEligible: true,
    isCheckedIn: false,
    isInternational: false,
    isDynamicWaiver: false,
    isNonRevPnr: true,
    isSwabiz: false,
    _links: {
      checkInSessionToken: 'longToken',
      earlyBird: null,
      change: null,
      reaccom: null,
      cancel: null,
      viewStandbyList: {
        href: '/v1/mobile-air-operations/page/standby',
        method: 'GET',
        query: {
          'carrier-code': 'WN',
          'origin-airport': 'AUS',
          'destination-airport': 'MCO',
          'departure-date': '2020-10-28',
          'departure-time': '06:00',
          'arrival-time': '09:30',
          'flight-number': '212',
          'record-locator': '2IGGMN',
          'first-name': 'JOHN',
          'last-name': 'DOE',
          'has-wifi': true,
          'passenger-search-token':
            'NN8F-y0IWgayXPCAjLXKlMrcizOaJ_xfcMB5S6TZzWPexebm7OHWRMHaZ-FaLYtDxwhT26IQBUTXxYwT-McJ3owlbdunIF7R7VjH_aMhmq8HObEkf_JeYFCVvjjCnhF4X4yVItTF28J8xQ=='
        }
      },
      checkIn: null,
      countdownCheckIn: null,
      contactInformation: {
        href: '/v1/mobile-air-booking/page/view-reservation/contact-info/2IGGMN',
        method: 'GET',
        query: {
          'passenger-search-token':
            'NN8F-y0IWgayXPCAjLXKlMrcizOaJ_xfcMB5S6TZzWPexebm7OHWRMHaZ-FaLYtDxwhT26IQBUTXxYwT-McJ3owlbdunIF7R7VjH_aMhmq8HObEkf_JeYFCVvjjCnhF4X4yVItTF28J8xQ=='
        }
      },
      viewBoardingPassIssuance: {
        href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/2IGGMN',
        method: 'POST',
        body: {
          firstName: 'JOHN',
          lastName: 'DOE',
          passengerSearchToken:
            'BYjMVefxJ0NWHlDsa-qztnJoonGhxrmlRkBSncTa_U9IYHk1IdDwB1HTGwkxh_wPEAZ3XWZv4vXxOwt4Wsf0dpyBXSJUKxw-7fis8Yma-DqBeSa-B6yYSzpM5s8vGjSILiDczMePxGeHPw==',
          travelerID: ['2301CE560000AF2E']
        },
        labelText: 'Security document'
      },
      viewBoardingPositions: null,
      addCompanion: null,
      editPNRPassengers: [
        {
          href: '/v1/mobile-air-booking/page/view-reservation/edit-pnr-passenger/2IGGMN',
          method: 'GET',
          query: {
            'first-name': 'John',
            'last-name': 'Doe',
            'passenger-reference': '2',
            'passenger-search-token':
              '2r7LASXpwyzZH_nUeAZQhhsTHtFA41S0mY04mCFHfl2RGFXv5E3Xa0oiTNzle35E0ctzMkwBTHuYKZjVTRpzFJ37d6VR18mrpsRAPKSCOgOGE-HAJlzZnhO9uswU5YSomWx_om7DOf_29w=='
          }
        }
      ],
      cancelBound: null
    },
    hasUnaccompaniedMinor: false,
    _analytics: {
      'air.odout': 'AUSALB',
      'air.odrtn': 'ALBAUS'
    }
  }
};
