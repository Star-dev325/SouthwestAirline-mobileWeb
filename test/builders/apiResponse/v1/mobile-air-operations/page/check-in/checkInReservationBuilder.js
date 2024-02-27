'use strict';

const _ = require('lodash');

class ReservationBuilder {
  constructor() {
    this.checkInViewReservationPage = {
      pnr: {
        confirmationNumber: 'R4ZGJ3',
        passengers: ['BOBO XU']
      },
      cards: [
        {
          dates: {
            first: '2016-10-20',
            second: null
          },
          destinationDescription: 'New York',
          departureDate: '2016-10-20',
          departureAirport: 'DAL',
          departureTime: '06:20',
          arrivalAirport: 'LGA',
          arrivalTime: '23:40',
          hazmatCheckInDisclaimer: `By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.`,
          flights: [
            {
              flightNumber: '3122',
              hasWifi: true
            }
          ],
          travelTime: '3h 20m'
        }
      ],
      hazmatText:
        'Federal law forbids the carriage of hazardous materials such as aerosols, fireworks, lithium batteries and flammable liquids aboard the aircraft in your checked or carryon baggage. E-cigarettes are not permitted in checked baggage and must be transported in carryon baggage only.',
      _v1_infoNeededToCheckin: {
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          names: [{ firstName: 'HELEN', lastName: 'WANG' }]
        }
      },
      _links: null
    };
    this.checkInSessionToken = 'jwtencodedsessiontoken';
    this.prefillPassengerAPISDocuments = [
      {
        travelerIdentifier: 'TRAVELERID1',
        firstName: 'Amber',
        lastName: 'Awesome',
        passport: {
          lastFourPassportNumber: '1234',
          passportIssuedBy: 'US',
          nationality: 'US',
          passportExpirationDate: '2035-11-10',
          countryOfResidence: 'US'
        },
        emergencyContact: null,
        permanentResidentCard: null,
        visa: null,
        destination: null,
        suppressEmergencyContact: false,
        passengerLabel: 'PASSENGER'
      }
    ];
  }

  withMultipleCards() {
    this.checkInViewReservationPage.cards.push({
      dates: {
        first: '2016-10-20',
        second: null
      },
      destinationDescription: 'Boston',
      departureDate: '2016-10-20',
      departureAirport: 'LGA',
      departureTime: '10:20',
      arrivalAirport: 'BOS',
      arrivalTime: '11:10',
      hazmatCheckInDisclaimer: `By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.`,
      flights: [
        {
          flightNumber: '3444',
          hasWifi: true
        }
      ],
      travelTime: '50m'
    });

    return this;
  }

  withPassengers(passengers) {
    this.checkInViewReservationPage.pnr.passengers = passengers || [];
    this.checkInViewReservationPage._v1_infoNeededToCheckin.body.names = _.map(passengers, (passenger) => ({
      firstName: passenger.split(' ')[0],
      lastName: passenger.split(' ')[1]
    }));

    return this;
  }

  withCheckInLinks() {
    const firstPassenger = _.head(this.checkInViewReservationPage.pnr.passengers);
    const firstName = firstPassenger.split(' ')[0];
    const lastName = firstPassenger.split(' ')[1];

    this.checkInViewReservationPage._links = {
      checkIn: {
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          recordLocator: this.checkInViewReservationPage.pnr.confirmationNumber,
          firstName,
          lastName
        }
      }
    };

    return this;
  }

  withLinks(links) {
    this.checkInViewReservationPage._links = links || {
      checkIn: {
        href: '/v1/mobile-air-operations/page/check-in',
        method: 'POST',
        body: {
          recordLocator: 'OHBKZZ',
          checkInSessionToken: 'justtestit',
          firstName: 'helen',
          lastName: 'wang',
          travelerIdentifier: 'TRAVELERID1'
        }
      },
      travelDocuments: [
        {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'POST',
          body: {
            recordLocator: 'OHBKZZ',
            firstName: 'helen',
            lastName: 'wang',
            fullName: 'Helen Wang',
            travelerIdentifier: 'TRAVELERID1'
          },
          meta: {
            missingDocuments: ['NATIONALITY']
          }
        }
      ]
    };

    return this;
  }

  withNoWcmInfo() {
    this.checkInViewReservationPage.cards.forEach((card) => {
      card.hazmatCheckInDisclaimer = '';
    });
    this.checkInViewReservationPage.hazmatText = '';

    return this;
  }

  withTravelDocuments(travelDocuments) {
    this.checkInViewReservationPage._links.travelDocuments = travelDocuments;

    return this;
  }

  withRecordLocator(recordLocator) {
    this.checkInViewReservationPage.pnr.confirmationNumber = recordLocator;

    return this;
  }

  withPrefillPassengerAPISDocuments(prefillPassengerAPISDocuments) {
    this.prefillPassengerAPISDocuments = prefillPassengerAPISDocuments || [
      {
        travelerIdentifier: 'TRAVELERID1',
        firstName: 'Amber',
        lastName: 'Awesome',
        passport: {
          lastFourPassportNumber: '1234',
          passportIssuedBy: 'US',
          nationality: 'US',
          passportExpirationDate: '2035-11-10',
          countryOfResidence: 'US'
        },
        emergencyContact: null,
        permanentResidentCard: null,
        visa: null,
        destination: null,
        suppressEmergencyContact: false,
        passengerLabel: 'PASSENGER'
      }
    ];

    return this.prefillPassengerAPISDocuments;
  }

  withPrefillPassengerAndLapChildAPISDocuments() {
    this.prefillPassengerAPISDocuments = this.prefillPassengerAPISDocuments.push({
      travelerIdentifier: 'TRAVELERID1',
      firstName: 'Baby',
      lastName: 'Bond',
      passport: {
        lastFourPassportNumber: '7654',
        passportIssuedBy: 'US',
        nationality: 'US',
        passportExpirationDate: '2035-11-10',
        countryOfResidence: 'US'
      },
      emergencyContact: null,
      permanentResidentCard: null,
      visa: null,
      destination: null,
      suppressEmergencyContact: true,
      passengerLabel: 'LAP CHILD'
    });

    return this;
  }

  build() {
    return {
      checkInViewReservationPage: this.checkInViewReservationPage,
      checkInSessionToken: this.checkInSessionToken,
      prefillPassengerAPISDocuments: this.prefillPassengerAPISDocuments
    };
  }
}

module.exports = ReservationBuilder;
