class UpcomingTripsBuilder {
  constructor() {
    this.upcomingTripsPage = [];
  }

  withOneWayFlight() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-30',
        second: null
      },
      destinationDescription: 'Austin',
      confirmationNumber: 'RVCOMP',
      tripType: 'FLIGHT',
      pages: null,
      isWithin24Hours: false,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/RVCOMP',
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withOneWayFlightHasConnection() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2019-06-25',
        second: null
      },
      destinationDescription: 'San Diego',
      confirmationNumber: 'QK2VHU',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2019-06-25',
          departureTime: '10:55',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Tuesday',
          arrivalAirportCode: 'ELP',
          arrivalAirportDisplayName: 'El Paso, TX - ELP',
          arrivalTime: '11:25',
          arrivesNextDay: false,
          destinationDescription: 'El Paso',
          boardingGroup: 'A',
          boardingPosition: '16',
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: {
            gate: '7',
            departureStatus: 'ON TIME',
            departureStatusType: 'DEFAULT',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '10:55',
            actualArrivalTime: '11:25',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '704',
          bannerText: 'On Time',
          bannerType: 'DEFAULT',
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          departureDate: '2019-06-25',
          departureTime: '12:55',
          departureAirportCode: 'ELP',
          departureAirportDisplayName: 'El Paso, TX - ELP',
          departureDayOfWeek: 'Tuesday',
          arrivalAirportCode: 'SAN',
          arrivalAirportDisplayName: 'San Diego, CA - SAN',
          arrivalTime: '13:40',
          arrivesNextDay: false,
          destinationDescription: 'San Diego',
          boardingGroup: 'A',
          boardingPosition: '16',
          boardingTime: null,
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: {
            gate: 'GT1',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '12:55',
            actualArrivalTime: '13:40',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '423',
          bannerText: 'On Time',
          bannerType: 'POSITIVE',
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        checkInSessionToken: null,
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-air-booking/page/view-reservation/QK2VHU',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'AUTO',
            'last-name': 'KK'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QK2VHU',
          method: 'POST',
          body: {
            firstName: 'AUTO',
            lastName: 'KK',
            travelerID: ['2301DC6C0000F942']
          }
        },
        viewBoardingPositions: null,
        carReservationDetails: null,
        changeFlightPage: null
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  withRoundTripFlight() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-30',
        second: '2017-10-10'
      },
      destinationDescription: 'Austin',
      confirmationNumber: 'MNCWZA',
      tripType: 'FLIGHT',
      pages: null,
      isWithin24Hours: false,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/MNCWZA',
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withCheckinFlight(pnr = { recordLocator: 'QIP34B', firstName: 'STEVEN', lastName: 'JACKIE' }) {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-29',
        second: '2017-09-30'
      },
      destinationDescription: 'Austin',
      confirmationNumber: pnr.recordLocator,
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:35',
          departureAirportCode: 'ATL',
          departureAirportDisplayName: 'Atlanta, GA - ATL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'HOU',
          arrivalAirportDisplayName: 'Houston (Hobby), TX - HOU',
          arrivalTime: '07:35',
          arrivesNextDay: false,
          destinationDescription: 'Houston',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: 'C16',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:35',
            actualArrivalTime: '07:35',
            isNowBoarding: false,
            isCancelled: false
          },
          flightNumber: '123',
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '08:25',
          departureAirportCode: 'HOU',
          departureAirportDisplayName: 'Houston (Hobby), TX - HOU',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'AUS',
          arrivalAirportDisplayName: 'Austin, TX - AUS',
          arrivalTime: '09:15',
          arrivesNextDay: false,
          destinationDescription: 'Austin',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: '47',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '08:25',
            actualArrivalTime: '09:15',
            isNowBoarding: false,
            isCancelled: false
          },
          flightNumber: '345',
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          onStandbyList: false,
          departureDate: '2017-09-30',
          departureTime: '07:10',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Saturday',
          arrivalAirportCode: 'FLL',
          arrivalAirportDisplayName: 'Ft. Lauderdale, FL - FLL',
          arrivalTime: '11:00',
          arrivesNextDay: false,
          destinationDescription: 'Ft. Lauderdale',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: null,
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: null,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '07:10',
            actualArrivalTime: '11:00',
            isNowBoarding: false,
            isCancelled: false
          },
          flightNumber: '789',
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          onStandbyList: false,
          departureDate: '2017-09-30',
          departureTime: '12:20',
          departureAirportCode: 'FLL',
          departureAirportDisplayName: 'Ft. Lauderdale, FL - FLL',
          departureDayOfWeek: 'Saturday',
          arrivalAirportCode: 'ATL',
          arrivalAirportDisplayName: 'Atlanta, GA - ATL',
          arrivalTime: '14:10',
          arrivesNextDay: false,
          destinationDescription: 'Atlanta',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: null,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '12:20',
            actualArrivalTime: '14:10',
            isNowBoarding: false,
            isCancelled: false
          },
          flightNumber: '122',
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: `/v1/mobile-misc/page/view-reservation/${pnr.recordLocator}`,
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': pnr.firstName,
            'last-name': pnr.lastName
          }
        },
        checkInViewReservationPage: {
          href: `/v1/mobile-air-operations/page/check-in/${pnr.recordLocator}`,
          method: 'GET',
          query: {
            'first-name': pnr.firstName,
            'last-name': pnr.lastName
          }
        },
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withDepartedFlight() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-29',
        second: '2017-09-30'
      },
      destinationDescription: 'Houston',
      confirmationNumber: 'QIP34B',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:35',
          departureAirportCode: 'ATL',
          departureAirportDisplayName: 'Atlanta, GA - ATL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'HOU',
          arrivalAirportDisplayName: 'Houston (Hobby), TX - HOU',
          arrivalTime: '07:35',
          arrivesNextDay: false,
          destinationDescription: 'Houston',
          bannerText: 'Departed',
          bannerType: 'DEFAULT',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightNumber: '333',
          flightStatus: {
            gate: 'C16',
            departureStatus: 'DEPARTED',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:35',
            actualArrivalTime: '07:35',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          },
          greyBoxMessage: {
            key: 'DEPARTED_FLIGHT_KEY',
            header: null,
            body: 'This flight has departed.'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/QIP34B',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withDepartedFlightHasConnection() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2019-06-25',
        second: null
      },
      destinationDescription: 'San Diego',
      confirmationNumber: 'QK2VHU',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2019-06-25',
          departureTime: '10:55',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Tuesday',
          arrivalAirportCode: 'ELP',
          arrivalAirportDisplayName: 'El Paso, TX - ELP',
          arrivalTime: '11:25',
          arrivesNextDay: false,
          destinationDescription: 'El Paso',
          boardingGroup: 'A',
          boardingPosition: '16',
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: {
            key: 'DEPARTED_FLIGHT_KEY',
            header: null,
            body: 'This flight has departed.'
          },
          flightStatus: {
            gate: '7',
            departureStatus: 'DEPARTED',
            departureStatusType: 'DEFAULT',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '10:55',
            actualArrivalTime: '11:25',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '704',
          bannerText: 'Departed',
          bannerType: 'DEFAULT',
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          departureDate: '2019-06-25',
          departureTime: '12:55',
          departureAirportCode: 'ELP',
          departureAirportDisplayName: 'El Paso, TX - ELP',
          departureDayOfWeek: 'Tuesday',
          arrivalAirportCode: 'SAN',
          arrivalAirportDisplayName: 'San Diego, CA - SAN',
          arrivalTime: '13:40',
          arrivesNextDay: false,
          destinationDescription: 'San Diego',
          boardingGroup: 'A',
          boardingPosition: '16',
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: {
            key: 'DEPARTED_FLIGHT_KEY',
            header: null,
            body: 'This flight has departed.'
          },
          flightStatus: {
            gate: 'GT1',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '12:55',
            actualArrivalTime: '13:40',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '423',
          bannerText: 'On Time',
          bannerType: 'POSITIVE',
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        checkInSessionToken: null,
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-air-booking/page/view-reservation/QK2VHU',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'AUTO',
            'last-name': 'KK'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QK2VHU',
          method: 'POST',
          body: {
            firstName: 'AUTO',
            lastName: 'KK',
            travelerID: ['2301DC6C0000F942']
          }
        },
        viewBoardingPositions: null,
        carReservationDetails: null,
        changeFlightPage: null
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  withDelayedFlight() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-29',
        second: '2017-09-30'
      },
      destinationDescription: 'Austin',
      confirmationNumber: 'QIP34B',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '00:00',
          departureAirportCode: 'ATL',
          departureAirportDisplayName: 'Atlanta, GA - ATL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'HOU',
          arrivalAirportDisplayName: 'Houston (Hobby), TX - HOU',
          arrivalTime: '01:00',
          arrivesNextDay: false,
          destinationDescription: 'Houston',
          boardingGroup: null,
          boardingPosition: null,
          flightNumber: '333',
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          bannerText: 'Delayed',
          bannerType: 'NEGATIVE',
          flightStatus: {
            gate: 'C16',
            departureStatus: 'DELAYED',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '00:30',
            actualArrivalTime: '01:00',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/QIP34B',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withOnboardingDelayedFlight() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-29',
        second: null
      },
      destinationDescription: 'Chicago',
      confirmationNumber: 'QIQAJZ',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:00',
          departureAirportCode: 'DAL',
          departureAirportDisplayName: 'Dallas (Love Field), TX - DAL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'MDW',
          arrivalAirportDisplayName: 'Chicago (Midway), IL - MDW',
          arrivalTime: '08:00',
          arrivesNextDay: false,
          destinationDescription: 'Chicago',
          boardingGroup: 'A',
          boardingPosition: '20',
          flightNumber: '333',
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: '4',
            departureStatus: 'DELAYED',
            departureStatusType: 'NEGATIVE',
            arrivalStatus: 'DELAYED',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:10',
            departureAirportDisplayName: 'Chicago (Midway), IL - MDW',
            actualArrivalTime: '08:10',
            isNowBoarding: true,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          bannerType: 'POSITIVE',
          bannerText: 'Now Boarding',
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/QIQAJZ',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QIQAJZ',
          method: 'POST',
          body: {
            checkInSessionToken: null,
            firstName: 'STEVEN',
            lastName: 'JACKIE',
            travelerID: ['0000000000000001']
          }
        },
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withOnboardingViewBoardingPassFlight() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-29',
        second: null
      },
      destinationDescription: 'Chicago',
      confirmationNumber: 'QIQAJZ',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:00',
          departureAirportCode: 'DAL',
          departureAirportDisplayName: 'Dallas (Love Field), TX - DAL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'MDW',
          arrivalAirportDisplayName: 'Chicago (Midway), IL - MDW',
          arrivalTime: '08:10',
          arrivesNextDay: false,
          destinationDescription: 'Chicago',
          boardingGroup: 'A',
          boardingPosition: '20',
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightNumber: '333',
          flightStatus: {
            gate: '4',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:00',
            departureAirportDisplayName: 'Chicago (Midway), IL - MDW',
            actualArrivalTime: '08:10',
            isNowBoarding: true,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          bannerType: 'POSITIVE',
          bannerText: 'Now Boarding',
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/QIQAJZ',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
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
        carReservationDetails: null
      }
    });

    return this;
  }

  withMultiPax() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-29',
        second: null
      },
      destinationDescription: 'Newark',
      confirmationNumber: 'RMXAUA',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:00',
          departureAirportCode: 'MDW',
          departureAirportDisplayName: 'Chicago (Midway), IL - MDW',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'EWR',
          arrivalAirportDisplayName: 'New York/Newark, NJ - EWR',
          arrivalTime: '09:00',
          arrivesNextDay: false,
          destinationDescription: 'Newark',
          boardingGroup: 'A',
          boardingPosition: '20',
          checkInIneligibilityReason: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
          flightStatus: {
            gate: null,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:00',
            actualArrivalTime: '09:00',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          flightNumber: '179',
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/RMXAUA',
          method: 'GET',
          query: {
            'first-name': 'HELEN',
            'last-name': 'WANG'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: {
          href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
          method: 'POST',
          body: {
            checkInSessionToken: null,
            recordLocator: 'RMXAUA',
            firstName: 'HELEN',
            lastName: 'WANG'
          }
        },
        carReservationDetails: null
      }
    });

    return this;
  }

  withViewBoardingPositionFlight() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-29',
        second: null
      },
      destinationDescription: 'Newark',
      confirmationNumber: 'QIQNWQ',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:00',
          departureAirportCode: 'MDW',
          departureAirportDisplayName: 'Chicago (Midway), IL - MDW',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'EWR',
          arrivalAirportDisplayName: 'New York/Newark, NJ - EWR',
          arrivalTime: '09:00',
          arrivesNextDay: false,
          destinationDescription: 'Newark',
          boardingGroup: 'A',
          boardingPosition: '20',
          checkInIneligibilityReason: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
          flightStatus: {
            gate: null,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:00',
            actualArrivalTime: '09:00',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          flightNumber: '179',
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/QIQNWQ',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: {
          href: '/v1/mobile-air-operations/page/check-in/view-boarding-details',
          method: 'POST',
          body: {
            checkInSessionToken: null,
            recordLocator: 'QIQNWQ',
            firstName: 'STEVEN',
            lastName: 'JACKIE'
          }
        },
        carReservationDetails: null
      }
    });

    return this;
  }

  withSpaceAvailableStandby() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2020-10-28',
        second: '2020-10-30'
      },
      destinationDescription: 'Albany',
      confirmationNumber: '3JHHNO',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2020-10-28',
          departureTime: '06:00',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Wednesday',
          arrivalAirportCode: 'MCO',
          arrivalAirportDisplayName: 'Orlando, FL - MCO',
          arrivalTime: '09:30',
          arrivesNextDay: false,
          destinationDescription: 'Orlando',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: true,
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
                'record-locator': '3JHHNO',
                'first-name': 'JOHN',
                'last-name': 'DOE',
                'has-wifi': true
              },
              labelText:
                'To manage Nonrev reservations, visit mobile.swalife.com or ask a Southwest agent for assistance.'
            }
          },
          flightNumber: '212',
          bannerText: "You're on standby to MCO",
          bannerType: 'DEFAULT',
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          },
          isNonRevPnr: false,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false
        },
        {
          departureDate: '2020-10-28',
          departureTime: '10:25',
          departureAirportCode: 'MCO',
          departureAirportDisplayName: 'Orlando, FL - MCO',
          departureDayOfWeek: 'Wednesday',
          arrivalAirportCode: 'ALB',
          arrivalAirportDisplayName: 'Albany, NY - ALB',
          arrivalTime: '13:05',
          arrivesNextDay: false,
          destinationDescription: 'Albany',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: true,
          standbyFlight: {
            flightNumber: '234',
            departureTime: '10:25',
            arrivalTime: '13:05',
            arrivalAirportCode: 'ALB',
            hasWifi: true,
            viewStandbyList: {
              href: '/v1/mobile-air-operations/page/standby',
              method: 'GET',
              query: {
                'carrier-code': 'WN',
                'origin-airport': 'MCO',
                'destination-airport': 'ALB',
                'departure-date': '2020-10-28',
                'departure-time': '10:25',
                'arrival-time': '13:05',
                'flight-number': '234',
                'record-locator': '3JHHNO',
                'first-name': 'JOHN',
                'last-name': 'DOE',
                'has-wifi': true
              },
              labelText:
                'To manage Nonrev reservations, visit mobile.swalife.com or ask a Southwest agent for assistance.'
            }
          },
          flightNumber: '234',
          bannerText: "You're on standby to ALB",
          bannerType: 'DEFAULT',
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          },
          isNonRevPnr: false,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false
        },
        {
          departureDate: '2020-10-30',
          departureTime: '07:00',
          departureAirportCode: 'ALB',
          departureAirportDisplayName: 'Albany, NY - ALB',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'MCO',
          arrivalAirportDisplayName: 'Orlando, FL - MCO',
          arrivalTime: '10:00',
          arrivesNextDay: false,
          destinationDescription: 'Orlando',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: false,
          standbyFlight: null,
          flightNumber: '133',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false
        },
        {
          departureDate: '2020-10-30',
          departureTime: '10:35',
          departureAirportCode: 'MCO',
          departureAirportDisplayName: 'Orlando, FL - MCO',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'AUS',
          arrivalAirportDisplayName: 'Austin, TX - AUS',
          arrivalTime: '12:25',
          arrivesNextDay: false,
          destinationDescription: 'Austin',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: false,
          standbyFlight: null,
          flightNumber: '402',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        checkInSessionToken: null,
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
            'record-locator': '3JHHNO',
            'first-name': 'JOHN',
            'last-name': 'DOE',
            'has-wifi': true
          },
          labelText: 'To manage Nonrev reservations, visit mobile.swalife.com or ask a Southwest agent for assistance.'
        },
        viewReservationViewPage: {
          href: '/v1/mobile-air-booking/page/view-reservation/3JHHNO',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'JOHN',
            'last-name': 'DOE'
          }
        },
        checkInViewReservationPage: null,
        countdownCheckIn: null,
        viewBoardingPassIssuance: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/3JHHNO',
          method: 'POST',
          body: {
            firstName: 'JOHN',
            lastName: 'DOE',
            travelerID: ['2301CE560000AF2E']
          },
          labelText: 'Security document'
        },
        viewBoardingPositions: null,
        carReservationDetails: null,
        changeFlightPage: null
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  withSpaceAvailableNonRevStandby() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2020-10-28',
        second: '2020-10-30'
      },
      destinationDescription: 'Albany',
      confirmationNumber: '2IGGMN',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2020-10-28',
          departureTime: '06:00',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Wednesday',
          arrivalAirportCode: 'MCO',
          arrivalAirportDisplayName: 'Orlando, FL - MCO',
          arrivalTime: '09:30',
          arrivesNextDay: false,
          destinationDescription: 'Orlando',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: true,
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
                'has-wifi': true
              },
              labelText:
                'To manage Nonrev reservations, visit mobile.swalife.com or ask a Southwest agent for assistance.'
            }
          },
          flightNumber: '212',
          bannerText: "You're on standby to MCO",
          bannerType: 'DEFAULT',
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: {
            aircraftType: 'Boeing 737 MAX8',
            numberOfSeats: 175,
            wifiSupported: true
          },
          isNonRevPnr: true,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false
        },
        {
          departureDate: '2020-10-28',
          departureTime: '10:25',
          departureAirportCode: 'MCO',
          departureAirportDisplayName: 'Orlando, FL - MCO',
          departureDayOfWeek: 'Wednesday',
          arrivalAirportCode: 'ALB',
          arrivalAirportDisplayName: 'Albany, NY - ALB',
          arrivalTime: '13:05',
          arrivesNextDay: false,
          destinationDescription: 'Albany',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: true,
          standbyFlight: {
            flightNumber: '234',
            departureTime: '10:25',
            arrivalTime: '13:05',
            arrivalAirportCode: 'ALB',
            hasWifi: true,
            viewStandbyList: {
              href: '/v1/mobile-air-operations/page/standby',
              method: 'GET',
              query: {
                'carrier-code': 'WN',
                'origin-airport': 'MCO',
                'destination-airport': 'ALB',
                'departure-date': '2020-10-28',
                'departure-time': '10:25',
                'arrival-time': '13:05',
                'flight-number': '234',
                'record-locator': '2IGGMN',
                'first-name': 'JOHN',
                'last-name': 'DOE',
                'has-wifi': true
              },
              labelText:
                'To manage Nonrev reservations, visit mobile.swalife.com or ask a Southwest agent for assistance.'
            }
          },
          flightNumber: '234',
          bannerText: "You're on standby to ALB",
          bannerType: 'DEFAULT',
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: {
            aircraftType: 'Boeing 737-800',
            numberOfSeats: 175,
            wifiSupported: true
          },
          isNonRevPnr: true,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false
        },
        {
          departureDate: '2020-10-30',
          departureTime: '07:00',
          departureAirportCode: 'ALB',
          departureAirportDisplayName: 'Albany, NY - ALB',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'MCO',
          arrivalAirportDisplayName: 'Orlando, FL - MCO',
          arrivalTime: '10:00',
          arrivesNextDay: false,
          destinationDescription: 'Orlando',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: false,
          standbyFlight: null,
          flightNumber: '133',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false
        },
        {
          departureDate: '2020-10-30',
          departureTime: '10:35',
          departureAirportCode: 'MCO',
          departureAirportDisplayName: 'Orlando, FL - MCO',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'AUS',
          arrivalAirportDisplayName: 'Austin, TX - AUS',
          arrivalTime: '12:25',
          arrivesNextDay: false,
          destinationDescription: 'Austin',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: null,
          wifiOnBoard: false,
          standbyFlight: null,
          flightNumber: '402',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          aircraftInfo: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        checkInSessionToken: null,
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
            'has-wifi': true
          },
          labelText: 'To manage Nonrev reservations, visit mobile.swalife.com or ask a Southwest agent for assistance.'
        },
        viewReservationViewPage: {
          href: '/v1/mobile-air-booking/page/view-reservation/2IGGMN',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'JOHN',
            'last-name': 'DOE'
          }
        },
        checkInViewReservationPage: null,
        countdownCheckIn: null,
        viewBoardingPassIssuance: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/2IGGMN',
          method: 'POST',
          body: {
            firstName: 'JOHN',
            lastName: 'DOE',
            travelerID: ['2301CE560000AF2E']
          },
          labelText: 'Security document'
        },
        viewBoardingPositions: null,
        carReservationDetails: null,
        changeFlightPage: null
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  withCar() {
    this.upcomingTripsPage.push({
      isWithin24Hours: false,
      dates: {
        first: '2017-09-25',
        second: '2017-12-24'
      },
      destinationDescription: 'Atlanta',
      confirmationNumber: '08172185US0',
      tripType: 'CAR',
      pages: null,
      _links: {
        carReservationDetails: {
          href: 'v1/mobile-misc/feature/cars/reservation/08172185US0',
          method: 'GET',
          query: {
            'first-name': 'Cannon',
            'last-name': 'Biggs',
            'pickup-date': '2017-09-16'
          }
        },
        viewReservationViewPage: null,
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null
      }
    });

    return this;
  }

  addUpcomingTrip(upcomingTrip) {
    this.upcomingTripsPage.push(upcomingTrip);

    return this;
  }

  withUnaccompaniedMinor() {
    this.upcomingTripsPage.push({
      dates: { first: '2017-10-20', second: null },
      destinationDescription: 'Las Vegas',
      confirmationNumber: 'U8VBKZ',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-10-20',
          departureTime: '07:35',
          departureAirportCode: 'HOU',
          departureAirportDisplayName: 'Houston (Hobby), TX - HOU',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'LAS',
          arrivalAirportDisplayName: 'Las Vegas, NV - LAS',
          arrivalTime: '08:45',
          arrivesNextDay: false,
          destinationDescription: 'Las Vegas',
          boardingGroup: null,
          boardingPosition: null,
          checkInIneligibilityReason: 'MBP_UNAVAILABLE_UNACCOMPANIED_MINOR',
          flightStatus: {
            gate: null,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '07:35',
            actualArrivalTime: '08:45',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '179',
          bannerText: null,
          bannerType: null,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          },
          greyBoxMessage: {
            key: 'UNACCOMPANIED_MINOR_KEY',
            header: 'Assistance required',
            body: "Since you're an Unaccompanied Minor, we'll need some additional details from your travel documents. Visit a ticket counter to checkin."
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/U8VBKZ',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'ACCOMPANY',
            'last-name': 'MINOR'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withBetween36HoursAnd48Hours() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-30',
        second: null
      },
      destinationDescription: 'Austin',
      confirmationNumber: 'RVCOMP',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:35',
          departureAirportCode: 'ATL',
          departureAirportDisplayName: 'Atlanta, GA - ATL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'HOU',
          arrivalAirportDisplayName: 'Houston (Hobby), TX - HOU',
          arrivalTime: '07:35',
          arrivesNextDay: false,
          destinationDescription: 'Houston',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightNumber: '1416',
          flightStatus: {
            gate: 'C16',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:35',
            actualArrivalTime: '07:35',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: true,
          informationalMessaging: 'Check in begins 24 hours before departure.',
          informationalMessagingType: 'POSITIVE',
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: false,
      isWithin48Hours: true,
      _v1_infoNeededToAddEarlyBirdLink: {
        href: 'v1/mobile/reservations/record-locator/{PNR}',
        query: {
          action: 'EARLYBIRD',
          'first-name': 'STEVEN',
          'last-name': 'JACKIE'
        },
        method: 'GET'
      },
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/RVCOMP',
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withCancelledFlight() {
    this.upcomingTripsPage.push({
      _links: {
        carReservationDetails: null,
        changeFlightPage: {
          href: '/v1/mobile-air-booking/page/flights/change/current/TBCIK5',
          method: 'GET',
          query: {
            action: 'CHANGE',
            'first-name': 'Lee',
            'last-name': 'Ann'
          }
        },
        checkInViewReservationPage: null,
        optionsAndNextSteps: {
          href: 'doNotUse',
          labelText: 'Options and next steps',
          url: 'https://www.southwest.com/help/changes-and-cancellations/changing-cancelling-flights#southwest-cancels-flight?clk=TRPCRD_SWACNCL_NEXT'
        },
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/RVCOMP',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        viewStandbyList: null
      },
      _v1_infoNeededToAddEarlyBirdLink: {
        href: 'v1/mobile/reservations/record-locator/{PNR}',
        method: 'GET',
        query: {
          action: 'EARLYBIRD',
          'first-name': 'STEVEN',
          'last-name': 'JACKIE'
        }
      },
      confirmationNumber: 'TBCIK5',
      dates: {
        first: '2017-09-30',
        second: null
      },
      destinationDescription: 'Austin',
      isWithin24Hours: true,
      isWithin48Hours: true,
      pages: [{
        aircraftInfo: {
          aircraftType: 'Boeing 777'
        },
        arrivalAirportCode: 'HOU',
        arrivalAirportDisplayName: 'Houston (Hobby), TX - HOU',
        arrivalTime: '07:35',
        arrivesNextDay: false,
        bannerText: 'Cancelled',
        bannerType: 'NEGATIVE',
        boardingGroup: null,
        boardingPosition: null,
        boardingTime: 'Boards 05:15AM',
        checkInIneligibilityReason: null,
        departureAirportCode: 'ATL',
        departureAirportDisplayName: 'Atlanta, GA - ATL',
        departureDate: '2017-09-29',
        departureDayOfWeek: 'Friday',
        departureTime: '06:35',
        destinationDescription: 'Houston',
        flightNumber: '1416',
        flightStatus: {
          actualArrivalTime: '07:35',
          actualDepartureTime: '06:35',
          arrivalStatus: 'ON TIME',
          arrivalStatusType: 'POSITIVE',
          departureStatus: 'CANCELLED',
          departureStatusType: 'POSITIVE',
          gate: 'C16',
          isCancelled: true,
          isNowBoarding: false
        },
        informationalMessaging: null,
        informationalMessagingType: null,
        isCheckedIn: false,
        isCheckInEligible: true,
        isEBEligible: true,
        isInternational: false,
        isNonRevPnr: false,
        onStandbyList: false,
        showOptionsAndNextSteps: true,
        standbyFlight: null
      }],
      tripType: 'FLIGHT'
    });

    return this;
  }

  withCancelledInternationalFlight() {
    this.upcomingTripsPage.push({
      dates: { first: '2018-09-17', second: null },
      destinationDescription: 'Houston',
      confirmationNumber: 'U5NLCS',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2018-09-17',
          departureTime: '17:45',
          departureAirportCode: 'CUN',
          departureAirportDisplayName: 'Cancun, Mexico - CUN',
          departureDayOfWeek: 'Monday',
          arrivalAirportCode: 'HOU',
          arrivalAirportDisplayName: 'Houston (Hobby), TX - HOU',
          arrivalTime: '20:05',
          arrivesNextDay: false,
          destinationDescription: 'Houston',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: '',
            departureStatus: 'CANCELLED',
            departureStatusType: 'NEGATIVE',
            arrivalStatus: 'CANCELLED',
            arrivalStatusType: 'NEGATIVE',
            actualDepartureTime: null,
            actualArrivalTime: null,
            isNowBoarding: false,
            isCancelled: true
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '308',
          bannerText: 'Cancelled',
          bannerType: 'NEGATIVE',
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: true,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/U5NLCS',
          method: 'GET',
          query: { 'first-name': 'NONAGEV', 'last-name': 'NONAGEV' }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null,
        changeFlightPage: {
          href: '/v1/mobile-air-booking/page/flights/change/current/U5NLCS',
          method: 'GET',
          query: { action: 'CHANGE', 'first-name': 'NONAGEV', 'last-name': 'NONAGEV' }
        }
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  addGreaterThan24HoursTrip() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2017-09-28',
        second: '2017-10-5'
      },
      destinationDescription: 'Austin',
      confirmationNumber: 'LYJLJF',
      tripType: 'FLIGHT',
      pages: [
        {
          onStandbyList: false,
          departureDate: '2017-09-28',
          departureTime: '09:35',
          departureAirportCode: 'HOU',
          departureAirportDisplayName: 'Houston (Hobby), TX - HOU',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'ATL',
          arrivalAirportDisplayName: 'Atlanta, GA - ATL',
          arrivalTime: '11:35',
          arrivesNextDay: false,
          destinationDescription: 'Atlanta',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightNumber: '161',
          flightStatus: {
            gate: 'A16',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '09:35',
            actualArrivalTime: '11:35',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: false,
          informationalMessaging: null,
          informationalMessagingType: 'POSITIVE',
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          onStandbyList: false,
          departureDate: '2017-09-29',
          departureTime: '06:35',
          departureAirportCode: 'ATL',
          departureAirportDisplayName: 'Atlanta, GA - ATL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'AUS',
          arrivalAirportDisplayName: 'Austin, TX - AUS',
          arrivalTime: '07:35',
          arrivesNextDay: false,
          destinationDescription: 'Austin',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightNumber: '1416',
          flightStatus: {
            gate: 'C16',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '06:35',
            actualArrivalTime: '07:35',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: true,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: true,
          informationalMessaging: 'Check in begins 24 hours before departure.',
          informationalMessagingType: 'POSITIVE',
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          onStandbyList: false,
          departureDate: '2017-10-4',
          departureTime: '10:35',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'ATL',
          arrivalAirportDisplayName: 'Atlanta, GA - ATL',
          arrivalTime: '13:35',
          arrivesNextDay: false,
          destinationDescription: 'Atlanta',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightNumber: '162',
          flightStatus: {
            gate: 'C18',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '10:35',
            actualArrivalTime: '13:35',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: true,
          informationalMessaging: null,
          informationalMessagingType: 'POSITIVE',
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          onStandbyList: false,
          departureDate: '2017-10-05',
          departureTime: '13:35',
          departureAirportCode: 'ATL',
          departureAirportDisplayName: 'Atlanta, GA - ATL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'HOU',
          arrivalAirportDisplayName: 'Houston (Hobby), TX - HOU',
          arrivalTime: '15:35',
          arrivesNextDay: false,
          destinationDescription: 'Houston',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightNumber: '230',
          flightStatus: {
            gate: 'B16',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '13:35',
            actualArrivalTime: '15:35',
            isNowBoarding: false,
            isCancelled: false
          },
          standbyFlight: null,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isNonRevPnr: false,
          isEBEligible: true,
          informationalMessaging: null,
          informationalMessagingType: 'POSITIVE',
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _v1_infoNeededToAddEarlyBirdLink: {
        href: 'v1/mobile/reservations/record-locator/{PNR}',
        query: {
          action: 'EARLYBIRD',
          'first-name': 'STEVEN',
          'last-name': 'JACKIE'
        },
        method: 'GET'
      },
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/LYJLJF',
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        checkInViewReservationPage: {
          href: '/v1/mobile-air-operations/page/check-in/LYJLJF',
          method: 'GET',
          query: {
            'first-name': 'STEVEN',
            'last-name': 'JACKIE'
          }
        },
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      }
    });

    return this;
  }

  withCompanion() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2018-03-06',
        second: '2018-03-09'
      },
      destinationDescription: 'Austin',
      confirmationNumber: 'COMPAN',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2018-03-09',
          departureTime: '05:15',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'STL',
          arrivalAirportDisplayName: 'St. Louis, MO - STL',
          arrivalTime: '07:20',
          arrivesNextDay: false,
          destinationDescription: 'St. Louis',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: null,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '05:15',
            actualArrivalTime: '07:20',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: false,
          standbyFlight: null,
          flightNumber: '1776',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          departureDate: '2018-03-09',
          departureTime: '08:20',
          departureAirportCode: 'STL',
          departureAirportDisplayName: 'St. Louis, MO - STL',
          departureDayOfWeek: 'Friday',
          arrivalAirportCode: 'ATL',
          arrivalAirportDisplayName: 'Atlanta, GA - ATL',
          arrivalTime: '10:55',
          arrivesNextDay: false,
          destinationDescription: 'Atlanta',
          boardingGroup: null,
          boardingPosition: null,
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          flightStatus: {
            gate: null,
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '08:20',
            actualArrivalTime: '10:55',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: false,
          standbyFlight: null,
          flightNumber: '2101',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/COMPAN',
          labelText: "View/Manage",
          method: 'GET',
          query: {
            'first-name': 'JAB',
            'last-name': 'MET'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  withReaccomOneWay() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2018-04-14',
        second: '2018-04-17'
      },
      destinationDescription: 'Hartford',
      confirmationNumber: 'ERSS1A',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2019-04-13',
          departureTime: '07:00',
          departureAirportCode: 'BDL',
          departureAirportDisplayName: 'Hartford, CT',
          departureDayOfWeek: 'Saturday',
          arrivalAirportCode: 'AUS',
          arrivalAirportDisplayName: 'Austin, TX',
          arrivalTime: '07:20',
          arrivesNextDay: false,
          destinationDescription: 'Austin',
          boardingGroup: 'A',
          boardingPosition: '20',
          boardingTime: 'Boards 05:15AM',
          checkInIneligibilityReason: null,
          greyBoxMessage: null,
          flightStatus: {
            gate: 'A8',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '07:00',
            actualArrivalTime: '07:20',
            isNowBoarding: true,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '16',
          bannerText: 'A new flight has been booked for you',
          bannerType: 'NEGATIVE',
          informationalMessaging:
            'Your original flight was cancelled. Your new flight is below. To change it, tap Details.',
          informationalMessagingType: 'DEFAULT',
          isNonRevPnr: false,
          isCheckInEligible: true,
          isCheckedIn: true,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/ERSS1A',
          method: 'GET',
          query: {
            'first-name': 'TEST',
            'last-name': 'WANG'
          }
        },
        reaccom: {
          href: '/v1/mobile-air-booking/page/flights/reaccom/reservations/current/ERSS1A',
          method: 'GET',
          query: { 'first-name': 'Test', 'last-name': 'Wang' }
        },
        viewBoardingPassIssuance: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/ERSS1A',
          method: 'POST',
          body: {
            checkInSessionToken: null,
            firstName: 'TEST',
            lastName: 'WANG',
            travelerID: ['0000000000000001']
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  withViewReservationViewPage() {
    this.upcomingTripsPage.push({
      dates: {
        first: '2018-04-14',
        second: '2018-04-17'
      },
      destinationDescription: 'Hartford',
      confirmationNumber: 'CHGONE',
      tripType: 'FLIGHT',
      pages: [
        {
          departureDate: '2018-04-17',
          departureTime: '13:05',
          departureAirportCode: 'AUS',
          departureAirportDisplayName: 'Austin, TX - AUS',
          departureDayOfWeek: 'Tuesday',
          arrivalAirportCode: 'MCO',
          arrivalAirportDisplayName: 'Orlando, FL - MCO',
          arrivalTime: '19:10',
          arrivesNextDay: false,
          destinationDescription: 'Orlando',
          boardingGroup: null,
          boardingPosition: null,
          checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
          flightStatus: {
            gate: '9',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '13:05',
            actualArrivalTime: '19:10',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '16',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        },
        {
          departureDate: '2018-04-17',
          departureTime: '22:20',
          departureAirportCode: 'MCO',
          departureAirportDisplayName: 'Orlando, FL - MCO',
          departureDayOfWeek: 'Tuesday',
          arrivalAirportCode: 'BDL',
          arrivalAirportDisplayName: 'Hartford, CT - BDL',
          arrivalTime: '01:00',
          arrivesNextDay: true,
          destinationDescription: 'Hartford',
          boardingGroup: null,
          boardingPosition: null,
          checkInIneligibilityReason: 'MBP_UNAVAILABLE_VISIT_KIOSK_OR_COUNTER',
          flightStatus: {
            gate: '101',
            departureStatus: 'ON TIME',
            departureStatusType: 'POSITIVE',
            arrivalStatus: 'ON TIME',
            arrivalStatusType: 'POSITIVE',
            actualDepartureTime: '22:20',
            actualArrivalTime: '01:00',
            isNowBoarding: false,
            isCancelled: false
          },
          wifiOnBoard: true,
          standbyFlight: null,
          flightNumber: '5504',
          bannerText: null,
          bannerType: null,
          informationalMessaging: null,
          informationalMessagingType: null,
          isNonRevPnr: false,
          isCheckInEligible: false,
          isCheckedIn: false,
          isInternational: false,
          isEBEligible: false,
          aircraftInfo: {
            aircraftType: 'Boeing 777'
          }
        }
      ],
      isWithin24Hours: true,
      isWithin48Hours: true,
      _links: {
        viewStandbyList: null,
        viewReservationViewPage: {
          href: '/v1/mobile-misc/page/view-reservation/CHGONE',
          method: 'GET',
          query: {
            'first-name': 'TEST',
            'last-name': 'WANG'
          }
        },
        checkInViewReservationPage: null,
        viewBoardingPassIssuance: null,
        viewBoardingPositions: null,
        carReservationDetails: null
      },
      _v1_infoNeededToAddEarlyBirdLink: null
    });

    return this;
  }

  withViewUpgradedBoardingLink() {
    this.withViewBoardingPositionFlight();

    const upcomingTrip = { ...this.upcomingTripsPage[0] };
    const viewUpgradedBoarding = {
      body: {
        passengerSearchToken: 'testToken'
      },
      href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
      method: 'POST',
      labelText: 'Upgrade boarding position to A1 - A15'
    };

    upcomingTrip._links = { ...upcomingTrip._links, viewUpgradedBoarding };

    this.upcomingTripsPage[0] = upcomingTrip;

    return this;
  }

  withTrackCheckedBagsLink() {
    this.withDepartedFlight();

    const upcomingTrip = { ...this.upcomingTripsPage[0] };
    const trackCheckedBags = {
      url: 'https://qa-swa-smartnotify.smartsuite.aero/passengerDetails?clk=TRIPCARD_TRKBAGS',
      labelText: 'Track checked bags',
      href: 'doNotUse',
      query: {
        first_name: 'SINDHU',
        last_name: 'BEDARE',
        record_locator: '4C9VZE'
      }
    };

    upcomingTrip._links = { ...upcomingTrip._links, trackCheckedBags };

    this.upcomingTripsPage[0] = upcomingTrip;

    return this;
  }

  build() {
    return {
      upcomingTripsPage: this.upcomingTripsPage
    };
  }
}

module.exports = UpcomingTripsBuilder;
