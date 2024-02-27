const _ = require('lodash');

class CheckInConfirmationBuilder {
  constructor() {
    this.checkInConfirmationPage = {
      flights: [
        {
          boundIndex: 0,
          gate: null,
          passengers: [
            {
              name: 'Michael Joseph',
              hasPrecheck: false,
              boardingGroup: 'A',
              boardingPosition: '24',
              mobileBoardingPassEligible: true,
              mobileBoardingPassIneligibilityErrorCode: '',
              checkedIn: true,
              confirmationNumber: 'SLNTCC',
              travelerID: '0000000000000001',
              travelerSegmentIdentifier: '2301DC520002823E',
              _links: null
            }
          ],
          flightNumber: '4',
          hasWifi: true,
          travelTime: '5h 5m',
          departureTime: '03:12',
          originAirportCode: 'DAL'
        }
      ],
      _links: {
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
        viewAllBoardingPasses: null
      }
    };
  }

  withViewAllBoardingPassesLink(labelText = 'View all boarding passes') {
    this.checkInConfirmationPage._links.viewAllBoardingPasses = {
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QPZ9GG',
      method: 'POST',
      body: {
        firstName: 'TY',
        lastName: 'KU',
        travelerID: ['2301CC6D0000E194', '2301CC6D0000E196']
      },
      labelText,
      nonSequentialPositionsMessage: null
    };

    return this;
  }

  withFlightDuration(duration) {
    this.checkInConfirmationPage.flights[0].travelTime = duration;

    return this;
  }

  withDepartureTime(departureTime, flightIndex = 0) {
    this.checkInConfirmationPage.flights[flightIndex].departureTime = departureTime;

    return this;
  }

  withFlightNumber(flightNumber) {
    this.checkInConfirmationPage.flights[0].flightNumber = flightNumber;

    return this;
  }

  withMultipleFlights() {
    return this.withFlights([
      {
        boundIndex: 0,
        gate: null,
        passengers: null,
        flightNumber: '4',
        hasWifi: true,
        travelTime: '5h 5m',
        originAirportCode: 'DAL'
      },
      {
        boundIndex: 1,
        gate: null,
        passengers: null,
        flightNumber: '200',
        hasWifi: true,
        travelTime: '2h 5m',
        originAirportCode: 'AUS'
      }
    ]);
  }

  withFlightWithConnection() {
    return this.withFlights([
      {
        boundIndex: 0,
        gate: null,
        flightNumber: '123',
        hasWifi: true,
        travelTime: '0h 50m',
        departureTime: '11:11',
        originAirportCode: 'DAL',
        destinationAirportCode: 'PHX'
      },
      {
        boundIndex: 1,
        gate: null,
        flightNumber: '321',
        hasWifi: true,
        travelTime: '2h 0m',
        departureTime: '11:12',
        originAirportCode: 'PHX',
        destinationAirportCode: 'SFO'
      }
    ]);
  }

  withIneligibleViewPassengerBoardingPass(passengerIndex) {
    _.forEach(this.checkInConfirmationPage.flights, (flight) => {
      flight.passengers[passengerIndex]._links = {
        viewPassengerBoardingPass: null
      };
    });

    return this;
  }

  withViewPassengerBoardingPass(labelText = 'Boarding pass') {
    this._doForAllPassengers((passenger, idx) => {
      passenger._links = {
        viewPassengerBoardingPass: {
          href: `/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/${passenger.confirmationNumber}`,
          method: 'POST',
          body: {
            firstName: passenger.firstName,
            lastName: passenger.lastName,
            travelerID: [`${passenger.travelerID || idx}`]
          },
          labelText
        }
      };
    });

    return this;
  }

  withBoardingPassAndPassengerName(firstName, lastName) {
    this.withViewPassengerBoardingPass();
    this._doForAllPassengers((passenger) => {
      passenger._links.viewPassengerBoardingPass = {
        ...passenger._links.viewPassengerBoardingPass,
        body: {
          firstName,
          lastName
        }
      };
    });

    return this;
  }

  withHealthDocument() {
    this._doForAllPassengers((passenger) => {
      passenger._links = {
        healthDocument: {
          href: 'https://southwest.salesforce.com/healthDocs',
          url: 'https://southwest.salesforce.com/healthDocs',
          labelText: 'View Health Documents'
        }
      };
      passenger.greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_HEALTH_DOCUMENTS',
        header: 'Information required for travel',
        body: 'Health documentation is required before you can receive your boarding pass'
      };
    });

    return this;
  }

  withViewUpgradedBoarding() {
    this._doForAllPassengers((passenger) => {
      passenger._links = {
        ...passenger._links,
        viewUpgradedBoarding: {
          body: {
            passengerSearchToken: 'testToken'
          },
          href: 'v1/mobile-air-operations/page/upgraded-boarding/4TY8HO',
          method: 'POST',
          labelText: 'Upgrade boarding position to A1 - A15'
        }
      };
    });

    return this;
  }

  withIneligibleBoardingPass() {
    this._doForAllPassengers((passenger) => {
      passenger.mobileBoardingPassEligible = false;
      passenger.mobileBoardingPassIneligibilityErrorCode = 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE';
      passenger.greyBoxMessage = {
        key: 'GREY_BOX_UNAVAILABLE_HELD_BOARDING_PASS',
        header: 'This flight is not eligible for Mobile Boarding Pass.',
        body: 'Please visit Southwest.com, a kiosk, or a ticket counter for your boarding passes.'
      };
    });

    return this;
  }

  withBoardingPassIssuanceLink() {
    this.checkInConfirmationPage._links.viewBoardingPassIssuance = {
      href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass',
      method: 'POST',
      body: {
        checkInSessionToken: 'checkInSessionToken',
        firstName: 'MICHAEL',
        lastName: 'JOSEPH',
        travelerID: ['0000000000000001']
      }
    };

    return this;
  }

  withoutBoardingPassLink() {
    return this.withCheckInIneligibilityReason('MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE');
  }

  withCheckInIneligibilityReason(reason) {
    this.checkInConfirmationPage._links.viewBoardingPassIssuance = null;
    this._doForAllPassengers((passenger) => {
      passenger.mobileBoardingPassEligible = false;
      passenger.mobileBoardingPassIneligibilityErrorCode = reason;
    });

    return this;
  }

  withNotCheckedIn() {
    this._doForAllPassengers((passenger) => {
      passenger.checkedIn = false;
    });

    return this;
  }

  withPassengers(passengers) {
    _.forEach(this.checkInConfirmationPage.flights, (flight) => {
      flight.passengers = passengers;
    });

    return this;
  }

  withPassengersByCount(count = 1) {
    const passengers = [
      this.createPassengerInfo({
        name: 'Michael Joseph',
        firstName: 'Michael',
        lastName: 'Joseph',
        boardingGroup: 'A',
        boardingPosition: '24',
        confirmationNumber: 'SLNTCC',
        travelerID: '0000000000000001',
        travelerSegmentIdentifier: '2301DC520002823E'
      }),
      this.createPassengerInfo({
        name: 'Jackie Robinson',
        firstName: 'Jackie',
        lastName: 'Robinson',
        boardingGroup: 'A',
        boardingPosition: '27',
        confirmationNumber: 'SLNTCC',
        travelerID: '0000000000000002',
        travelerSegmentIdentifier: '2301DC5200028240'
      }),
      this.createPassengerInfo({
        name: 'Bob Bobster',
        firstName: 'Bob',
        lastName: 'Bobster',
        boardingGroup: 'A',
        boardingPosition: '29',
        confirmationNumber: 'SLNTCC',
        travelerID: '0000000000000003',
        travelerSegmentIdentifier: '2301DC5200028241'
      }),
      this.createPassengerInfo({
        name: 'Tim Timster',
        firstName: 'Tim',
        lastName: 'Timster',
        boardingGroup: 'A',
        boardingPosition: '30',
        confirmationNumber: 'SLNTCC',
        travelerID: '0000000000000004',
        travelerSegmentIdentifier: '2301DC5200028242'
      })
    ];
    const selectedPassengers = passengers.slice(0, count);

    this.withPassengers(selectedPassengers);

    return this;
  }

  withMessages(messages) {
    this.checkInConfirmationPage.messages = messages;

    return this;
  }

  withFlights(flights) {
    const oldPassengers = this.checkInConfirmationPage.flights[0].passengers;

    this.checkInConfirmationPage.flights = flights;

    return this.withPassengers(oldPassengers);
  }

  withRecordLocator(recordLocator) {
    this._doForAllPassengers((passenger) => {
      passenger.confirmationNumber = recordLocator;
    });
    this.checkInConfirmationPage._links.viewBoardingPassIssuance.body.recordLocator = recordLocator;

    return this;
  }

  withPassengerName({ firstName, lastName }) {
    this.checkInConfirmationPage.flights[0].passengers[0].name = `${firstName} ${lastName}`;
    this.checkInConfirmationPage._links.viewBoardingPassIssuance.body.firstName = firstName;
    this.checkInConfirmationPage._links.viewBoardingPassIssuance.body.lastName = lastName;
    this.checkInConfirmationPage._links.viewBoardingPassIssuance.body.firstName = firstName;
    this.checkInConfirmationPage._links.viewBoardingPassIssuance.body.lastName = lastName;

    return this;
  }

  withTitle({ body, icon, key, textColor }) {
    this.checkInConfirmationPage.title = {
      body,
      icon,
      key,
      textColor
    };

    return this;
  }

  withFlightsAndIneligiblePassenger() {
    this.checkInConfirmationPage = {
      messages: null,
      title: null,
      flights: [
        {
          boundIndex: 0,
          segmentType: 'DEPARTING',
          departureTime: '05:40',
          gate: null,
          passengers: [
            {
              name: 'Ty Ku',
              hasPrecheck: false,
              boardingGroup: 'A',
              boardingPosition: '16',
              mobileBoardingPassEligible: false,
              mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
              greyBoxMessage: null,
              specialAssistanceMessage: null,
              travelerSegmentIdentifier: '2301DC6D0001F8E2',
              travelerID: '2301CC6D0000E194',
              checkedIn: true,
              confirmationNumber: 'QPZ9GG',
              _links: {
                viewPassengerBoardingPass: {
                  href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QPZ9GG',
                  method: 'POST',
                  body: {
                    firstName: 'TY',
                    lastName: 'KU',
                    travelerID: ['2301CC6D0000E194']
                  }
                }
              }
            },
            {
              name: 'Test Tester',
              hasPrecheck: false,
              boardingGroup: 'A',
              boardingPosition: '17',
              mobileBoardingPassEligible: false,
              mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
              greyBoxMessage: {
                key: 'GREY_BOX_UNAVAILABLE_HELD_BOARDING_PASS',
                header: 'This flight is not eligible for Mobile Boarding Pass.',
                body: 'Please visit Southwest.com, a kiosk, or a ticket counter for your boarding passes.'
              },
              specialAssistanceMessage: {
                key: 'DISABILITIES_SPECIAL_ASSISTANCE_MESSAGE',
                body: 'Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.',
                icon: 'WARNING'
              },
              travelerSegmentIdentifier: '2301DC6D0001F8E3',
              travelerID: '2301CC6D0000E195',
              checkedIn: true,
              confirmationNumber: 'QPZ9GG',
              _links: null
            },
            {
              name: 'Tst Tstr',
              hasPrecheck: false,
              boardingGroup: 'A',
              boardingPosition: '18',
              mobileBoardingPassEligible: false,
              mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
              greyBoxMessage: null,
              specialAssistanceMessage: {
                key: 'DISABILITIES_SPECIAL_ASSISTANCE_MESSAGE',
                body: 'Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.',
                icon: 'WARNING'
              },
              travelerSegmentIdentifier: '2301DC6D0001F8E4',
              travelerID: '2301CC6D0000E196',
              checkedIn: true,
              confirmationNumber: 'QPZ9GG',
              _links: {
                viewPassengerBoardingPass: {
                  href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QPZ9GG',
                  method: 'POST',
                  body: {
                    firstName: 'TST',
                    lastName: 'TSTR',
                    travelerID: ['2301CC6D0000E196']
                  }
                }
              }
            }
          ],
          originAirportCode: 'SAT',
          destinationAirportCode: 'PHX',
          flightNumber: '2555',
          hasWifi: true,
          travelTime: '2h 20m'
        },
        {
          boundIndex: 0,
          segmentType: 'CHANGE_PLANES',
          departureTime: '06:55',
          gate: null,
          passengers: [
            {
              name: 'Ty Ku',
              hasPrecheck: false,
              boardingGroup: 'A',
              boardingPosition: '18',
              mobileBoardingPassEligible: false,
              mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
              greyBoxMessage: null,
              specialAssistanceMessage: null,
              travelerSegmentIdentifier: '2301DC6D0001F8E6',
              travelerID: '2301CC6D0000E194',
              checkedIn: true,
              confirmationNumber: 'QPZ9GG',
              _links: {
                viewPassengerBoardingPass: {
                  href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QPZ9GG',
                  method: 'POST',
                  body: {
                    firstName: 'TY',
                    lastName: 'KU',
                    travelerID: ['2301CC6D0000E194']
                  }
                }
              }
            },
            {
              name: 'Test Tester',
              hasPrecheck: false,
              boardingGroup: 'A',
              boardingPosition: '19',
              mobileBoardingPassEligible: false,
              mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
              greyBoxMessage: {
                key: 'GREY_BOX_UNAVAILABLE_HELD_BOARDING_PASS',
                header: 'This flight is not eligible for Mobile Boarding Pass.',
                body: 'Please visit Southwest.com, a kiosk, or a ticket counter for your boarding passes.'
              },
              specialAssistanceMessage: {
                key: 'DISABILITIES_SPECIAL_ASSISTANCE_MESSAGE',
                body: 'Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.',
                icon: 'WARNING'
              },
              travelerSegmentIdentifier: '2301DC6D0001F8E7',
              travelerID: '2301CC6D0000E195',
              checkedIn: true,
              confirmationNumber: 'QPZ9GG',
              _links: null
            },
            {
              name: 'Tst Tstr',
              hasPrecheck: false,
              boardingGroup: 'A',
              boardingPosition: '20',
              mobileBoardingPassEligible: false,
              mobileBoardingPassIneligibilityErrorCode: 'MBP_UNAVAILABLE_USE_OTHER_SELF_SERVICE',
              greyBoxMessage: null,
              specialAssistanceMessage: {
                key: 'DISABILITIES_SPECIAL_ASSISTANCE_MESSAGE',
                body: 'Assistance Requested. Please inform a Southwest Airlines Representative upon arrival at the airport.',
                icon: 'WARNING'
              },
              travelerSegmentIdentifier: '2301DC6D0001F8E8',
              travelerID: '2301CC6D0000E196',
              checkedIn: true,
              confirmationNumber: 'QPZ9GG',
              _links: {
                viewPassengerBoardingPass: {
                  href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QPZ9GG',
                  method: 'POST',
                  body: {
                    firstName: 'TST',
                    lastName: 'TSTR',
                    travelerID: ['2301CC6D0000E196']
                  }
                }
              }
            }
          ],
          originAirportCode: 'PHX',
          destinationAirportCode: 'SAN',
          flightNumber: '2369',
          hasWifi: true,
          travelTime: '1h 10m'
        }
      ],
      _v1_infoNeededToViewBoardingPasses: null,
      _links: {
        checkInSessionToken: null,
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
        viewAllBoardingPasses: {
          href: '/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/QPZ9GG',
          method: 'POST',
          body: {
            firstName: 'TY',
            lastName: 'KU',
            travelerID: ['2301CC6D0000E194', '2301CC6D0000E196']
          },
          nonSequentialPositionsMessage: null
        }
      }
    };

    return this;
  }

  withOvernight() {
    this.checkInConfirmationPage.flights[0].isOvernight = true;

    return this;
  }

  withLapInfants() {
    const additionalPassengerBoardingInfo = {
      hasPrecheck: false,
      boardingGroup: 'A',
      boardingPosition: '24',
      mobileBoardingPassEligible: true,
      mobileBoardingPassIneligibilityErrorCode: null,
      checkedIn: true,
      confirmationNumber: 'SLNTCC',
      travelerID: '0000000000000001',
      travelerSegmentIdentifier: '2301DC520002823E',
      _links: null
    };

    const passengers = [
      {
        name: 'Michael Joseph',
        hasInfant: true,
        isInfant: false,
        firstName: 'Michael',
        lastName: 'Joseph',
        ...additionalPassengerBoardingInfo
      },
      {
        name: 'Michael Baby',
        isInfant: true,
        firstName: 'Michael',
        lastName: 'Joseph',
        ...additionalPassengerBoardingInfo
      },
      {
        name: 'Jackie Robinson',
        hasInfant: true,
        isInfant: false,
        firstName: 'Jackie',
        lastName: 'Robinson',
        ...additionalPassengerBoardingInfo
      },
      {
        name: 'Jackie Baby',
        isInfant: true,
        firstName: 'Michael',
        lastName: 'Joseph',
        ...additionalPassengerBoardingInfo
      }
    ];

    this.withPassengers(passengers);

    return this;
  }

  createPassengerInfo({
    name,
    hasInfant = false,
    isInfant = false,
    firstName,
    lastName,
    hasPrecheck = false,
    boardingGroup = '',
    boardingPosition = '',
    mobileBoardingPassEligible = true,
    mobileBoardingPassIneligibilityErrorCode = null,
    checkedIn = true,
    confirmationNumber = '',
    travelerID = '',
    travelerSegmentIdentifier = '',
    _links = null
  }) {
    const passenger = {
      name,
      hasInfant,
      isInfant,
      firstName,
      lastName,
      hasPrecheck,
      boardingGroup,
      boardingPosition,
      mobileBoardingPassEligible,
      mobileBoardingPassIneligibilityErrorCode,
      checkedIn,
      confirmationNumber,
      travelerID,
      travelerSegmentIdentifier,
      _links
    };

    return passenger;
  }

  build() {
    return {
      checkInConfirmationPage: this.checkInConfirmationPage
    };
  }

  _doForAllPassengers(fn) {
    _.forEach(this.checkInConfirmationPage.flights, (flight) => {
      _.forEach(flight.passengers, fn);
    });
  }
}

module.exports = CheckInConfirmationBuilder;
