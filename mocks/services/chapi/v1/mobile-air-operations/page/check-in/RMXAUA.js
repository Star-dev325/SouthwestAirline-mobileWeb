module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/RMXAUA',
  method: 'POST',
  cache: false,
  template: () => ({
    checkInSessionToken: 'mockCheckInSessionToken',
    checkInViewReservationPage: {
      pnr: {
        confirmationNumber: 'RMXAUA',
        passengers: ['HELEN WANG', 'ANDREW TERRIS']
      },
      cards: [
        {
          dates: { first: '2017-05-31', second: '2017-06-03' },
          destinationDescription: 'Dallas',
          departureDate: '2017-05-31',
          departureAirport: 'AUS',
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
          destinationDescription: 'Austin',
          departureDate: '2017-06-03',
          departureAirport: 'DAL',
          departureTime: '06:30',
          arrivalAirport: 'AUS',
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
        href: '/v1/mobile/reservations/record-locator/RMXAUA/boarding-passes',
        method: 'POST',
        body: {
          names: [
            { firstName: 'HELEN', lastName: 'WANG' },
            { firstName: 'ANDREW', lastName: 'TERRIS' }
          ]
        }
      },
      _links: {
        checkIn: {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'POST',
          body: {
            recordLocator: 'RMXAUA',
            checkInSessionToken: '...',
            firstName: 'helen',
            lastName: 'wang'
          }
        },
        travelDocuments: [
          {
            href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
            method: 'POST',
            body: {
              recordLocator: 'RMXAUA',
              travelerIdentifier: '2401C9790000B809',
              checkInSessionToken: '...'
            },
            meta: { missingDocuments: [] }
          },
          {
            href: '/v1/mobile-air-operations/feature/check-in/travel-documents',
            method: 'POST',
            body: {
              recordLocator: 'RMXAUA',
              travelerIdentifier: '2401C9790000B80A',
              checkInSessionToken: '...'
            },
            meta: { missingDocuments: [] }
          }
        ],
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
        }
      }
    },
    prefillPassengerAPISDocuments: null
  })
};
