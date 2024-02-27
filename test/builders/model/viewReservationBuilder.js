const _ = require('lodash');

class ViewReservationBuilder {
  constructor() {
    this.viewReservationViewPage = {
      dayOfTravelContactInfo: 'Text: 555-555-5555',
      greyBoxMessage: null,
      greyBoxPassengerMessage: null,
      dates: {
        first: '2017-07-25',
        second: '2017-07-27'
      },
      isDynamicWaiver: false,
      isInternational: false,
      messages: [
        {
          key: 'test',
          icon: 'test',
          header: 'test',
          body: 'test'
        }
      ],
      hasUnaccompaniedMinor: false,
      isCheckInEligible: true,
      isNonRevPnr: false,
      destinationDescription: 'Atlanta',
      originAirport: {
        name: 'Dallas (Love)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      pageHeader: 'DAL - ATL',
      destinationAirport: {
        name: 'Atlanta',
        state: 'GA',
        code: 'ATL',
        country: null
      },
      companion: null,
      passengers: [
        {
          name: 'Audrey Hepburn',
          accountNumber: '123456789',
          hasAnyEarlyBird: false,
          isCheckedIn: false,
          hasCompletePassportInfo: false,
          passengerReference: '2'
        }
      ],
      confirmationNumber: 'KLV394',
      bounds: [
        {
          boundType: 'DEPARTING',
          departureStatus: null,
          departureStatusType: null,
          arrivalStatus: null,
          arrivalStatusType: null,
          flights: [
            {
              number: '233',
              wifiOnBoard: false
            }
          ],
          travelTime: '1h 55m',
          departureDate: '2017-07-25',
          departureTime: '07:35',
          departureAirport: {
            name: 'Dallas (Love)',
            state: 'TX',
            code: 'DAL',
            country: null
          },
          arrivalTime: '12:30',
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          passengerTypeCounts: {
            adult: 1
          },
          fareProductDetails: {
            label: 'Anytime',
            fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
          },
          fareType: 'Anytime',
          stops: [],
          isNextDayArrival: false,
          passengers: this.generateBoundPassengersList(1, 'Anytime')
        }
      ],
      headerMessages: {
        backgroundColor: 'DEFAULT',
        body: 'If you are logged in, it will appear in your upcoming trips shortly. Business select was added to the following flights and passengers.',
        header: 'Great Choice!',
        icon: 'POSITIVE',
        key: 'BOOKING_UPSELL_CONFIRMATION_BUS',
        textColor: 'DEFAULT'
      },
      fareRulesWithLinks:
        '*Please read <a href="https://mobile.southwest.com/fare-rules" target="_blank">fare rules</a> associated with purchase.',
      shouldShowAddEarlyBirdButton: false,
      hasAnyCancelledFlights: false,
      isCheckedIn: false,
      isSwabiz: false,
      viewReservationAnalytics: {
        gdsTicketType: null,
        isInternational: false,
        isSwabiz: false,
        recordLocator: 'KLV394'
      },
      _analytics: {
        'air.odout': 'DALATL',
        'air.odret': 'ATLDAL'
      },
      _v1_infoNeededToCancel: {
        href: '/v1/mobile/reservations/record-locator/KLV394',
        method: 'GET',
        query: {
          action: 'CANCEL',
          'first-name': 'AUDREY',
          'last-name': 'HEPBURN'
        }
      },
      _v1_infoNeededToChange: {
        href: '/v1/mobile/reservations/record-locator/JAXNZG',
        method: 'GET',
        query: {
          action: 'CHANGE',
          'first-name': 'QIANQIAN',
          'last-name': 'WANG'
        }
      },
      _links: {
        viewBoardingPassIssuance: { url: 'viewBoardingPassIssuance-link' },
        viewBoardingPositions: { url: 'viewBoardingPositions-link' },
        checkIn: { url: 'checkIn-link' },
        change: { url: 'change-link', query: { 'first-name': 'AUDREY', 'last-name': 'HEPBURN' } },
        cancel: { url: 'cancel-link' },
        cancelBound: { url: 'cancelBound-link' },
        upgradeMyFlight: {
          href: '/v1/mobile-air-booking/page/upgrade/4O88R8',
          method: 'POST',
          body: {
            passengerSearchToken: 'passenger-search-token'
          }
        }
      }
    };
  }

  withBoardingPassIssuanceLink() {
    this.viewReservationViewPage = _.cloneDeep(this.viewReservationViewPage);
    this.viewReservationViewPage._links.viewBoardingPositions = null;
    this.viewReservationViewPage._links.checkInViewReservationPage = null;
    this.viewReservationViewPage._links.viewBoardingPassIssuance = {
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
      method: 'POST',
      body: {
        checkInSessionToken: null,
        recordLocator: 'KLV394',
        firstName: 'Wen',
        lastName: 'Li',
        travelerID: ['123']
      }
    };

    return this;
  }

  withCompanionInfo() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      companion: {
        confirmationNumber: 'KLV111',
        firstName: 'Wen',
        lastName: 'Li',
        name: 'Wen Li'
      }
    });

    return this;
  }

  withInternationalFlight() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      isInternational: true,
      destinationDescription: 'Chengdu',
      originAirport: {
        name: 'Dallas (Love)',
        state: 'TX',
        code: 'DAL',
        country: null
      },
      destinationAirport: {
        name: 'Chengdu',
        state: null,
        code: 'CTU',
        country: 'China'
      },
      pageHeader: 'DAL - CTU',
      bounds: [
        {
          departureStatus: null,
          departureStatusType: null,
          arrivalStatus: null,
          arrivalStatusType: null,
          flights: [
            {
              number: '233',
              wifiOnBoard: false
            }
          ],
          travelTime: '1h 55m',
          departureDate: '2017-07-25',
          departureTime: '07:35',
          departureAirport: {
            name: 'Dallas (Love)',
            state: 'TX',
            code: 'DAL',
            country: null
          },
          arrivalTime: '08:30',
          arrivalAirport: {
            name: 'Chengdu',
            state: null,
            code: 'CTU',
            country: 'China'
          },
          passengerTypeCounts: {
            adult: 1
          },
          fareProductDetails: {
            label: 'Anytime',
            fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
          },
          fareType: 'Anytime',
          stops: [],
          isNextDayArrival: true
        }
      ],
      viewReservationAnalytics: {
        gdsTicketType: null,
        isInternational: true,
        isSwabiz: false,
        recordLocator: 'KLV394'
      },
      _analytics: {
        'air.odout': 'DALCTU',
        'air.odret': 'CTUDAL',
        'pnr.isinternational': '1'
      }
    });

    return this;
  }

  withDayOfTravelContactInfo() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      reservationContactInformation: {
        messages: [
          {
            key: 'UPDATE_CONTACT_METHOD_MESSAGE',
            header: null,
            body: 'A Reservation may only contain one contact method. By providing your contact information you are granting Southwest Airlines permission to send operational information on your flights.',
            icon: 'NONE',
            textColor: 'DEFAULT'
          }
        ],
        primaryContactMethod: 'MAIL',
        contactEmail: {
          email: 'DIANA.MARTINEZ@WNCO.COM',
          preferredLanguage: 'EN'
        },
        contactPhone: null,
        contactTextMessagePhone: null,
        internationalDeclineNotifications: false,
        contactInformationAnalytics: {
          recordLocator: 'P9XQVN',
          gdsTicketType: null,
          isInternational: false,
          isSwabiz: false
        },
        isInternational: false,
        _links: {
          contactInformation: {
            href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
            method: 'POST',
            body: {
              passengerSearchToken:
                '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ',
              contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a'
            }
          }
        }
      },
      _links: {
        contactInformation: {
          href: '/v1/mobile-air-booking/page/view-reservation/contact-info',
          method: 'POST',
          body: {
            passengerSearchToken:
              '3HKiWDSeCp0wYUgJQoCR7DMftbspgp9Y5Mw3Qen7OJZJ7F2_R_MTOHcVNHoKJiIZbNbI52u60eq5qey7tdC88G0WK4QmdlM1HePoKbN72mpTD7b-EJpvaiV6o_P6H-vwA7U0gwxp5PrW8dtQ',
            contactInfoToken: 'eyJwbnIiOnsiY29uZmlybWF0a'
          }
        }
      }
    });

    return this;
  }

  withViewForSameDayPage() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      viewForSameDayPage: {
        boundSelectionMessage:
          'If you need to change or fly standby for both of your eligible flights, please make one change at a time.',
        boundSelections: [
          {
            flightType: 'Departure',
            originalDate: '2022-08-11',
            fromAirport: 'Denver, CO - DEN',
            fromAirportCode: 'DEN',
            toAirport: 'Phoenix, AZ - PHX',
            toAirportCode: 'PHX',
            flight: '1933',
            timeDeparts: '08:30',
            timeArrives: '09:30',
            boundReference: 'bound1',
            isSelectable: true
          },
          {
            flightType: 'Return',
            originalDate: '2022-08-11',
            fromAirport: 'Phoenix, AZ - PHX',
            fromAirportCode: 'PHX',
            toAirport: 'Denver, CO - DEN',
            toAirportCode: 'DEN',
            flight: '439',
            timeDeparts: '15:30',
            timeArrives: '18:30',
            boundReference: 'bound2',
            isSelectable: true
          }
        ],
        _meta: {
          showBoundSelection: true
        },
        _links: {
          sameDayShopping: {
            href: '/v1/mobile-air-operations/page/same-day/shopping/28DIXX',
            method: 'POST',
            body: {
              sameDayToken: 'string',
              boundReference: 'string'
            }
          }
        }
      }
    });

    return this;
  }

  withViewForSameDayPageFalseBoundSelection() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      viewForSameDayPage: {
        boundSelectionMessage:
          'If you need to change or fly standby for both of your eligible flights, please make one change at a time.',
        boundSelections: [
          {
            flightType: 'Departure',
            originalDate: '2022-08-11',
            fromAirport: 'Denver, CO - DEN',
            fromAirportCode: 'DEN',
            toAirport: 'Phoenix, AZ - PHX',
            toAirportCode: 'PHX',
            flight: '1933',
            timeDeparts: '08:30',
            timeArrives: '09:30',
            boundReference: 'bound1',
            isSelectable: true
          }
        ],
        _meta: {
          showBoundSelection: false
        },
        _links: {
          sameDayShopping: {
            href: '/v1/mobile-air-operations/page/same-day/shopping/28DIXX',
            method: 'POST',
            body: {
              sameDayToken: 'string',
              boundReference: 'string'
            }
          }
        }
      }
    });

    return this;
  }

  withReaccom() {
    _.get(this, 'viewReservationViewPage.messages', []).push({
      key: 'REACCOM_VIEW_RESERVATION',
      icon: 'reaccomIcon',
      header: "We've rebooked you on a new flight.",
      body: "You may change this flight free of charge. We're sincerely sorry for any inconvenience. If you checked bags, we'll make every effort to reroute your luggage with your new itinerary."
    });
    _.set(this, 'viewReservationViewPage._links', {
      change: null,
      reaccom: { url: 'reaccom-link' }
    });

    return this;
  }

  withDeplayedStops() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      bounds: [
        {
          boundType: 'DEPARTING',
          departureStatus: 'DELAYED',
          departureStatusType: 'NEGATIVE',
          arrivalStatus: 'DELAYED',
          arrivalStatusType: 'NEGATIVE',
          flights: [
            {
              number: '233',
              wifiOnBoard: false
            }
          ],
          travelTime: '1h 55m',
          departureDate: '2017-07-25',
          departureTime: '07:35',
          actualDepartureTime: '07:50',
          departureAirport: {
            name: 'Dallas (Love)',
            state: 'TX',
            code: 'DAL',
            country: null
          },
          arrivalTime: '12:30',
          actualArrivalTime: '12:45',
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          passengerTypeCounts: {
            adult: 1
          },
          fareProductDetails: {
            label: 'Anytime',
            fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
          },
          fareType: 'Anytime',
          stops: [
            {
              airport: { name: 'Houston', state: 'TX', code: 'HOU', country: null },
              code: 'DAL',
              country: null,
              name: 'Houston',
              state: 'TX',
              arrivalStatus: 'DELAYED',
              arrivalStatusType: 'NEGATIVE',
              arrivalTime: '08:15',
              actualArrivalTime: '08:20',
              changePlanes: true,
              departureStatus: 'ON TIME',
              departureStatusType: 'POSITIVE',
              departureTime: '09:20',
              actualDepartureTime: '09:20',
              missingAirportDetails: false,
              isOvernight: false
            }
          ],
          isNextDayArrival: false
        }
      ]
    });

    return this;
  }

  withDelayedFlight() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      bounds: [
        {
          boundType: 'DEPARTING',
          departureStatus: 'DELAYED',
          departureStatusType: 'NEGATIVE',
          arrivalStatus: 'DELAYED',
          arrivalStatusType: 'NEGATIVE',
          flights: [
            {
              number: '233',
              wifiOnBoard: false
            }
          ],
          travelTime: '1h 55m',
          departureDate: '2017-07-25',
          departureTime: '07:35',
          actualDepartureTime: '07:50',
          departureAirport: {
            name: 'Dallas (Love)',
            state: 'TX',
            code: 'DAL',
            country: null
          },
          arrivalTime: '12:30',
          actualArrivalTime: '12:45',
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          passengerTypeCounts: {
            adult: 1
          },
          fareProductDetails: {
            label: 'Anytime',
            fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
          },
          fareType: 'Anytime',
          stops: [],
          isNextDayArrival: false
        }
      ]
    });

    return this;
  }

  with24HourOnTimeFlight() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      bounds: [
        {
          boundType: 'DEPARTING',
          departureStatus: 'ON TIME',
          departureStatusType: 'POSITIVE',
          arrivalStatus: 'ON TIME',
          arrivalStatusType: 'POSITIVE',
          flights: [
            {
              number: '233',
              wifiOnBoard: false
            }
          ],
          travelTime: '1h 55m',
          departureDate: '2017-07-25',
          departureTime: '07:35',
          actualDepartureTime: '07:35',
          departureAirport: {
            name: 'Dallas (Love)',
            state: 'TX',
            code: 'DAL',
            country: null
          },
          arrivalTime: '12:30',
          actualArrivalTime: '12:30',
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          passengerTypeCounts: {
            adult: 1
          },
          fareProductDetails: {
            label: 'Anytime',
            fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
          },
          fareType: 'Anytime',
          stops: [],
          isNextDayArrival: false
        }
      ]
    });

    return this;
  }

  withDynamicWaiver() {
    _.set(this, 'viewReservationViewPage.isDynamicWaiver', true);

    return this;
  }

  withEarlyBird() {
    _.set(this, 'viewReservationViewPage.passengers.0.hasAnyEarlyBird', true);

    return this;
  }

  withCOS() {
    _.set(this, 'viewReservationViewPage.passengers.0.hasExtraSeat', true);

    return this;
  }

  withoutChangeLink() {
    _.set(this, 'viewReservationViewPage._links.change', null);

    return this;
  }

  withoutCancelLink() {
    _.set(this, 'viewReservationViewPage._links.cancel', null);

    return this;
  }

  withoutCancelBoundLink() {
    _.set(this, 'viewReservationViewPage._links.cancelBound', null);

    return this;
  }

  withEditNameSuccessMessage() {
    _.get(this, 'viewReservationViewPage.messages', []).push({
      key: 'EDIT_NAME_CONFIRMATION_VIEW_RESERVATION',
      header: null,
      body: 'Be on the lookout for an email with your updated information!',
      icon: 'SUCCESS',
      textColor: 'DEFAULT'
    });

    return this;
  }

  withCheckedIn() {
    _.set(this, 'viewReservationViewPage.isCheckedIn', true);
    _.set(this, 'viewReservationViewPage.passengers[0].isCheckedIn', true);

    return this;
  }

  withCheckedInMultipleFlights(isCheckedIn = true) {
    _.set(this, 'viewReservationViewPage.isCheckedIn', isCheckedIn);
    _.set(this, 'viewReservationViewPage.passengers[0].isCheckedIn', isCheckedIn);
    _.set(this, 'viewReservationViewPage.bounds[0].flights', [
      { number: '233', wifiOnBoard: false },
      { number: '968', wifiOnBoard: false }
    ]);

    return this;
  }

  withoutPassangerSearchToken() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      confirmationNumber: '',
      _links: {
        upgradeMyFlight: ''
      }
    });

    return this;
  }

  withUpsellDetails() {
    const upsellDetails = {
      upsellToProductId: 'BUS',
      offerTitle: 'Upgrade your flights to Business Select®',
      offerText: 'to unlock these great benefits',
      offerIcon: 'bestseats',
      offerFeatures: [
        {
          icon: 'check',
          label: 'A1-A15 Priority Boarding'
        },
        {
          icon: 'check',
          label: 'Fly By® priority and security lanes',
          suffixl: '1'
        },
        {
          icon: 'check',
          label: 'A complimentary premium drink'
        },
        {
          icon: 'check',
          label: '12 Rapid Rewards® points per Dollar',
          suffixl: '1'
        },
        {
          icon: 'check',
          label: 'Refundable flights',
          suffixl: '1'
        },
        {
          icon: 'check',
          label: 'Same-day changes',
          suffixl: '1'
        }
      ]
    };

    _.set(this, 'viewReservationViewPage.upsellDetails', upsellDetails);

    return this;
  }

  withLapChild() {
    this.viewReservationViewPage.passengers[0].lapInfant = { name: 'Bob Sapp' };

    return this;
  }

  withSameDayStandBy() {
    _.set(this, 'viewReservationViewPage._links.sameDayUpdates', {
      href: '/v1/mobile-air-operations/page/same-day/4ENWXX',
      method: 'POST',
      body: {
        passengerSearchToken:
          'DiP1aMwftceY4qdxOYj_nnNGJX0YFN1S2MzSTzImhWXOgCjxzvyVC4IxTc4sclK_ImTFcwoS0AbjZpGPA1Z5Y09cPPeLGUWY2ZKpbZfoOPrb7T-vZ8JHlYHnb85UbRd3R5p2MP-YnJdGJSJS'
      },
      labelText: 'Same-day change and standby'
    });

    return this;
  }

  withCheckedInMultipleBounds(isCheckedIn = true) {
    _.set(this, 'viewReservationViewPage.isCheckedIn', isCheckedIn);
    _.set(this, 'viewReservationViewPage.passengers[0].isCheckedIn', isCheckedIn);
    _.set(this, 'viewReservationViewPage.bounds', [
      {
        boundType: 'DEPARTING',
        departureStatus: null,
        departureStatusType: null,
        arrivalStatus: null,
        arrivalStatusType: null,
        flights: [
          {
            number: '233',
            wifiOnBoard: false
          }
        ],
        travelTime: '1h 55m',
        departureDate: '2017-07-25',
        departureTime: '07:35',
        departureAirport: {
          name: 'Dallas (Love)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        arrivalTime: '12:30',
        arrivalAirport: {
          name: 'Atlanta',
          state: 'GA',
          code: 'ATL',
          country: null
        },
        passengerTypeCounts: {
          adult: 1
        },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
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
            number: '968',
            wifiOnBoard: false
          },
          {
            number: '722',
            wifiOnBoard: false
          }
        ],
        travelTime: '1h 55m',
        departureDate: '2017-07-26',
        departureTime: '10:45',
        departureAirport: {
          name: 'Atlanta',
          state: 'GA',
          code: 'ATL',
          country: null
        },
        arrivalTime: '12:30',
        arrivalAirport: {
          name: 'Dallas (Love)',
          state: 'TX',
          code: 'DAL',
          country: null
        },
        passengerTypeCounts: {
          adult: 1
        },
        fareProductDetails: {
          label: 'Anytime',
          fareRulesUrl: 'https://mobile.southwest.com/fare-rules/anytime'
        },
        fareType: 'Anytime',
        stops: [],
        isNextDayArrival: false
      }
    ]);

    return this;
  }

  withEnhancedStandbyPage() {
    this.viewReservationViewPage.flightReservation = {
      isNonRevPnr: true,
      _links: {
        cancelBound: { href: '/v1/mobile-air-booking/page/flights/cancel-bound/2HS5JP', method: 'GET', query: {} }
      }
    };

    return this;
  }

  generateBoundPassengersList(count, fareType) {
    return [{ count, type: 'Passenger', fareType }];
  }

  withOvernightIndicator() {
    this.viewReservationViewPage = _.merge({}, this.viewReservationViewPage, {
      bounds: [
        {
          departureStatus: null,
          departureStatusType: null,
          arrivalStatus: null,
          arrivalStatusType: null,
          flights: [
            {
              number: '1384',
              wifiOnBoard: true,
              aircraftInfo: {
                aircraftType: 'Boeing 737 MAX8',
                numberOfSeats: 175,
                wifiSupported: true
              }
            },
            {
              number: '2233',
              wifiOnBoard: true,
              aircraftInfo: {
                aircraftType: 'Boeing 737-700',
                numberOfSeats: 143,
                wifiSupported: true
              }
            }
          ],
          travelTime: '9h 20m',
          departureDate: '2023-04-17',
          departureTime: '21:10',
          departureAirport: {
            name: 'Seattle/Tacoma',
            state: 'WA',
            code: 'SEA',
            country: null
          },
          arrivalTime: '08:30',
          arrivalAirport: {
            name: 'Omaha',
            state: 'NE',
            code: 'OMA',
            country: null
          },
          passengerTypeCounts: {
            adult: 1
          },
          passengers: [
            {
              type: 'Passenger',
              count: 1,
              fareType: 'Wanna Get Away'
            }
          ],
          boundType: 'DEPARTING',
          standbyFlight: null,
          fareProductDetails: {
            label: 'Wanna Get Away',
            fareRulesUrl: 'https://mobile.dev5.southwest.com/fare-rules/wanna-get-away',
            fareProductId: 'WGA'
          },
          stops: [
            {
              departureStatus: null,
              departureStatusType: null,
              arrivalStatus: null,
              arrivalStatusType: null,
              airport: {
                name: 'Denver',
                state: 'CO',
                code: 'DEN',
                country: null
              },
              arrivalTime: '00:45',
              departureTime: '06:00',
              changePlanes: true,
              missingAirportDetails: false,
              isOvernight: true,
              isNextDayArrival: true
            }
          ],
          isNextDayArrival: true
        }
      ]
    });

    return this;
  }

  withDisruptedFLIXBoundMessage() {
    this.viewReservationViewPage.bounds[0] =
      { ...this.viewReservationViewPage.bounds[0],
        disruptedBoundMessage: {
          icon: 'WARNING',
          label: 'Departing flight canceled'
        }
      };

    return this;
  }

  withDisruptedOPRBoundMessage() {
    this.viewReservationViewPage.bounds[0] =
      { ...this.viewReservationViewPage.bounds[0],
        disruptedBoundMessage: {
          icon: 'green-circle-check',
          label: 'New departing flight'
        }
      };

    return this;
  }

  withOptionsAndNextSteps() {
    this.viewReservationViewPage = {
      ...this.viewReservationViewPage,
      _links: {
        ...this.viewReservationViewPage._links,
        optionsAndNextSteps: {
          href: 'doNotUse',
          labelText: 'Options and next steps',
          url: 'https://www.southwest.com/help/changes-and-cancellations/changing-cancelling-flights#southwest-cancels-flight?clk=TRPCRD_SWACNCL_NEXT'
        }
      }
    };

    return this;
  }

  withGreyBoxMessage() {
    this.viewReservationViewPage = {
      ...this.viewReservationViewPage,
      greyBoxMessage: {
        'key': '*GREY_BOX_UNAVAILABLE_FLIGHT_SUSPENDED_TEXT*',
        'header': '',
        'body': 'We are working to rebook you on the next available flight, no need to take action. It may take up to 10 minutes to receive your new flight details.Please tap the "Options and Next Steps" button above for more details.'
      }
    };

    return this;
  }

  withEarlyBirdPurchased() {
    this.viewReservationViewPage.bounds[0] =
      { ...this.viewReservationViewPage.bounds[0],
        earlyBirdPurchased: {
          icon: 'earlyBird',
          iconColor: 'primary-yellow',
          label: 'EarlyBird Check-In®',
          passengerLabel: 'PASSENGER(S)',
          passengersList: ['Mable Phillips', 'Tom Jerry', 'Benny Hill']
        }
      };

    return this;
  }

  build() {
    return {
      viewReservationViewPage: this.viewReservationViewPage
    };
  }
}

module.exports = ViewReservationBuilder;
