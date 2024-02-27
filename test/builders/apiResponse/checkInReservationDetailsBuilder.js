export default class CheckInReservationDetailsBuilder {
  constructor() {
    this.checkInSessionToken = 'checkInSessionToken';
    this.checkInViewReservationPage = {
      pnr: { confirmationNumber: 'V2Q6MT', passengers: ['Shelton Suen'] },
      cards: [{
        dates: { first: '2018-12-04', second: null },
        destinationDescription: 'Dallas',
        departureDate: '2018-12-04',
        departureAirport: 'CUN',
        departureTime: '16:20',
        arrivalAirport: 'DAL',
        arrivalTime: '20:25',
        hazmatCheckInDisclaimer: 'By tapping \'Check in\' you acknowledge that you understand the hazardous materials restrictions and penalties.',
        flights: [{
          flightNumber: '9347',
          hasWifi: true,
          originAirportCode: 'CUN',
          destinationAirportCode: 'MDW',
          destinationStationName: 'Chicago (Midway)',
          departureDate: 'Dec 04',
          departureGate: null,
          departureTime: '16:20'
        }, {
          flightNumber: '1934',
          hasWifi: true,
          originAirportCode: 'MDW',
          destinationAirportCode: 'DAL',
          destinationStationName: 'Dallas (Love Field)',
          departureDate: 'Dec 04',
          departureGate: null,
          departureTime: '18:05'
        }],
        travelTime: '5h 5m'
      }],
      hazmatText: 'Federal law forbids the carriage of hazardous materials such as aerosols, fireworks, lithium batteries and flammable liquids aboard the aircraft in your checked or carryon baggage. E-cigarettes are not permitted in checked baggage and must be transported in carryon baggage only.',
      _v1_infoNeededToCheckin: {
        href: '/v1/mobile/reservations/record-locator/V2Q6MT/boarding-passes',
        method: 'POST',
        body: { names: [{ firstName: 'SHELTON', lastName: 'SUEN' }] }
      },
      _links: {
        checkIn: {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'POST',
          body: {
            recordLocator: 'V2Q6MT',
            checkInSessionToken: 'checkInSessionToken',
            firstName: 'S',
            lastName: 'Suen'
          }
        },
        travelDocuments: [{
          href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
          method: 'POST',
          body: {
            recordLocator: 'V2Q6MT',
            travelerIdentifier: '2301CBA10000C173',
            firstName: 'SHELTON',
            lastName: 'SUEN',
            fullName: 'Shelton Suen',
            accountNumber: null
          },
          meta: { missingDocuments: ['NATIONALITY'] }
        }]
      }
    };

    this.prefillPassengerAPISDocuments = [{
      travelerIdentifier: '2301CBA10000C173',
      firstName: 'SHELTON',
      lastName: 'SUEN',
      passport: null,
      emergencyContact: null,
      permanentResidentCard: null,
      visa: null,
      destination: null
    }];
  }

  build() {
    return { ...this };
  }
}
