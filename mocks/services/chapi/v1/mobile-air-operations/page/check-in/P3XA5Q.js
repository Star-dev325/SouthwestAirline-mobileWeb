module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/P3XA5Q',
  method: 'GET',
  cache: false,
  template: () => ({
    checkInViewReservationPage: {
      pnr: {
        confirmationNumber: 'P3XA5Q',
        passengers: ['HELEN WANG', 'ANDREW TERRIS', 'ANDREW AESOME']
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
        href: '/v1/mobile/reservations/record-locator/P3XA5Q/boarding-passes',
        method: 'POST',
        body: {
          names: [
            { firstName: 'HELEN', lastName: 'WANG' },
            { firstName: 'ANDREW', lastName: 'TERRIS' },
            { firstName: 'ANDREW', lastName: 'AWESOME' }
          ]
        }
      },
      _links: {
        checkIn: {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'POST',
          body: {
            recordLocator: 'P3XA5Q',
            checkInSessionToken: 'JWTSessionToken...',
            firstName: 'helen',
            lastName: 'wang'
          }
        },
        travelDocuments: [
          {
            href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
            method: 'POST',
            body: {
              recordLocator: 'P3XA5Q',
              travelerIdentifier: '2401C9790000B806',
              checkInSessionToken: 'JWTSessionToken...',
              firstName: 'HELEN',
              lastName: 'WANG'
            },
            meta: { missingDocuments: ['EMERGENCY_CONTACT'] }
          },
          {
            href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
            method: 'POST',
            body: {
              recordLocator: 'P3XA5Q',
              travelerIdentifier: '2401C9790000B809',
              checkInSessionToken: 'JWTSessionToken...',
              firstName: 'ANDREW',
              lastName: 'TERRIS'
            },
            meta: { missingDocuments: ['VISA'] }
          },
          {
            href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
            method: 'POST',
            body: {
              recordLocator: 'P3XA5Q',
              travelerIdentifier: '2401C9790000B80A',
              checkInSessionToken: 'JWTSessionToken...',
              firstName: 'ANDREW',
              lastName: 'AWESOME'
            },
            meta: { missingDocuments: ['NATIONALITY'] }
          }
        ]
      }
    },
    prefillPassengerAPISDocuments: null
  })
};
