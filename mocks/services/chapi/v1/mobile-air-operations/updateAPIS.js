const _ = require('lodash');
const passengerTemplate = require('mocks/templates/checkIn/passengersForCheckin');

const DocumentsType = {
  NATIONALITY: 'NATIONALITY',
  PERMANENT_RESIDENT_CARD: 'PERMANENT_RESIDENT_CARD',
  VISA: 'VISA',
  DESTINATION: 'DESTINATION',
  EMERGENCY_CONTACT: 'EMERGENCY_CONTACT',
  PASSPORT: 'PASSPORT'
};

const CountryVisaFree = {
  Portugal: 'PT',
  Italy: 'IT',
  Philippines: 'PH',
  Greece: 'GR',
  Canada: 'CA'
};

const CountryVisaRequired = {
  Argentina: 'AR',
  Russia: 'RU',
  Vietnam: 'VN',
  China: 'CN'
};

function isCountryVisaFree(countryISOCode) {
  return _.includes(_.values(CountryVisaFree), countryISOCode);
}

function isCountryVisaRequired(countryISOCode) {
  return _.includes(_.values(CountryVisaRequired), countryISOCode);
}

function needGreedCard(nationality, countryOfResidence) {
  return nationality !== 'US' && countryOfResidence === 'US';
}

function updateNationality(updateInfo, updatePassengerIndex) {
  const nationality = _.get(updateInfo, 'nationality.passportInformation.nationality');
  const countryOfResidence = _.get(updateInfo, 'nationality.passportInformation.countryOfResidence');

  if (needGreedCard(nationality, countryOfResidence)) {
    passengerTemplate[updatePassengerIndex].missingDocuments = [DocumentsType.PERMANENT_RESIDENT_CARD];
  } else if (isCountryVisaFree(nationality)) {
    passengerTemplate[updatePassengerIndex].missingDocuments = [DocumentsType.DESTINATION];
  } else if (isCountryVisaRequired(nationality)) {
    passengerTemplate[updatePassengerIndex].missingDocuments = [DocumentsType.VISA, DocumentsType.DESTINATION];
  } else {
    passengerTemplate[updatePassengerIndex].missingDocuments = [];
  }
}

module.exports = [
  {
    path: '/chapi/v1/mobile-air-operations/page/check-in/MISAPI',
    method: 'POST',
    cache: false,
    template: passengerTemplate,
    container: {
      checkInSessionToken: 'JWTSessionToken...',
      checkInViewReservationPage: {
        pnr: {
          confirmationNumber: 'MISAPI',
          passengers: (params, query, data) =>
            _.map(data, (passenger) => `${passenger.firstName} ${passenger.lastName}`)
        },
        cards: [
          {
            dates: { first: '2017-05-31', second: '2017-06-03' },
            destinationDescription: 'Dallas',
            departureDate: '2017-05-31',
            departureAirport: 'AUA',
            departureTime: '07:10',
            arrivalAirport: 'DAL',
            arrivalTime: '10:05',
            hazmatCheckInDisclaimer: `By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.`,
            flights: [
              { flightNumber: '2010', hasWifi: false },
              { flightNumber: '12', hasWifi: false }
            ],
            travelTime: '02h 55m'
          },
          {
            dates: { first: '2017-05-31', second: '2017-06-03' },
            destinationDescription: 'Aruba',
            departureDate: '2017-06-03',
            departureAirport: 'DAL',
            departureTime: '06:30',
            arrivalAirport: 'AUA',
            arrivalTime: '09:40',
            hazmatCheckInDisclaimer: `By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.`,
            flights: [
              { flightNumber: '201', hasWifi: true },
              { flightNumber: '2930', hasWifi: true }
            ],
            travelTime: '03h 10m'
          }
        ],
        hazmatText:
          'Federal law forbids the carriage of hazardous materials such as aerosols, fireworks, lithium batteries and flammable liquids aboard the aircraft in your checked or carryon baggage. E-cigarettes are not permitted in checked baggage and must be transported in carryon baggage only.',
        _v1_infoNeededToCheckin: {
          href: '/v1/mobile/reservations/record-locator/MISAPI/boarding-passes',
          method: 'POST',
          body: {
            names: (params, query, data) =>
              _.chain(data)
                .head()
                .thru((value) => ({
                  firstName: value.firstName,
                  lastName: value.lastName
                }))
                .value()
          }
        },
        _links: {
          checkIn: {
            href: '/v1/mobile-air-operations/page/check-in',
            method: 'POST',
            body: (params, query, data) =>
              _.chain(data)
                .head()
                .thru((value) => ({
                  recordLocator: 'MISAPI',
                  checkInSessionToken: 'JWTSessionToken...',
                  firstName: value.firstName,
                  lastName: value.lastName
                }))
                .value()
          },
          travelDocuments: (params, query, data) =>
            _.map(data, (passenger) => {
              const { travelerIdentifier, firstName, lastName, missingDocuments } = passenger;
              const meta = _.isEmpty(missingDocuments) ? {} : { missingDocuments };

              return {
                href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
                method: 'POST',
                body: {
                  recordLocator: 'MISAPI',
                  travelerIdentifier,
                  firstName,
                  lastName,
                  fullName: `${firstName} ${lastName}`
                },
                meta
              };
            })
        }
      },
      prefillPassengerAPISDocuments: (params, body, data) =>
        _.map(data, (passenger) => {
          const {
            travelerIdentifier,
            firstName,
            lastName,
            passport,
            emergencyContact,
            permanentResidentCard,
            visa,
            destination
          } = passenger;

          return {
            travelerIdentifier,
            firstName,
            lastName,
            passport: passport || null,
            emergencyContact: emergencyContact || null,
            permanentResidentCard: permanentResidentCard || null,
            visa: visa || null,
            destination: destination || null
          };
        })
    }
  },
  {
    path: '/chapi/v1/mobile-air-operations/feature/check-in/travel-documents',
    method: 'POST',
    cache: false,
    callback: (req, res, next) => {
      const travelDocumentsUpdate = _.get(req, 'body.travelDocumentsUpdate');
      const recordLocator = _.get(travelDocumentsUpdate, 'recordLocator');

      const hasNationality = _.has(travelDocumentsUpdate, 'nationality');

      if (recordLocator === 'MISAPI') {
        const updatePassengerIndex = _.findIndex(passengerTemplate, {
          travelerIdentifier: travelDocumentsUpdate.travelerIdentifier
        });

        if (hasNationality) {
          updateNationality(travelDocumentsUpdate, updatePassengerIndex);
        } else {
          passengerTemplate[updatePassengerIndex].missingDocuments = [];
        }
      }
      next();
    },
    render: (req, res) => {
      const travelDocumentsUpdate = _.get(req, 'body.travelDocumentsUpdate');
      const recordLocator = _.get(travelDocumentsUpdate, 'recordLocator');
      const firstName = _.get(travelDocumentsUpdate, 'firstName');
      const lastName = _.get(travelDocumentsUpdate, 'lastName');
      const updatedPassenger = _.find(passengerTemplate, {
        travelerIdentifier: travelDocumentsUpdate.travelerIdentifier
      });

      const missingDocuments = _.get(updatedPassenger, 'missingDocuments');
      const travelerIdentifier = _.get(updatedPassenger, 'travelerIdentifier');

      const travelDocuments = _.isEmpty(missingDocuments)
        ? null
        : {
          href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
          method: 'POST',
          body: {
            recordLocator,
            travelerIdentifier,
            checkInSessionToken: 'JWTsessionToken...'
          },
          meta: { missingDocuments }
        };
      const checkIn = _.isEmpty(missingDocuments)
        ? {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'POST',
          body: {
            recordLocator,
            checkInSessionToken: 'JWTsessionToken...',
            firstName,
            lastName
          }
        }
        : null;

      res.send({
        checkInSessionToken: 'JWTSessionToken...',
        travelDocumentsNeeded: {
          _links: {
            travelDocuments,
            checkIn
          }
        }
      });
    }
  }
];
