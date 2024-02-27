module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/R4ZGJ3',
  method: 'POST',
  cache: false,
  template: {
    checkInSessionToken: '...',
    checkInViewReservationPage: {
      pnr: { confirmationNumber: 'R4ZGJ3', passengers: ['Yang Lu'] },
      cards: [
        {
          dates: { first: '2017-09-06', second: null },
          destinationDescription: 'San Francisco',
          departureDate: '2017-09-06',
          departureAirport: 'LGA',
          departureTime: '07:25',
          arrivalAirport: 'SFO',
          arrivalTime: '20:25',
          hazmatCheckInDisclaimer:
            "By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.",
          flights: [
            {
              flightNumber: '388',
              hasWifi: true,
              originAirportCode: 'LGA',
              destinationAirportCode: 'LAX',
              destinationStationName: 'Los Angeles',
              departureDate: 'Sep 06'
            },
            {
              flightNumber: '1179',
              hasWifi: true,
              originAirportCode: 'LAX',
              destinationAirportCode: 'SFO',
              destinationStationName: 'San Francisco',
              departureDate: 'Sep 06'
            }
          ],
          travelTime: '16h 0m'
        }
      ],
      hazmatText:
        'Federal law forbids the carriage of hazardous materials such as aerosols, fireworks, lithium batteries and flammable liquids aboard the aircraft in your checked or carryon baggage. E-cigarettes are not permitted in checked baggage and must be transported in carryon baggage only.',
      _v1_infoNeededToCheckin: {
        href: '/v1/mobile/reservations/record-locator/R4ZGJ3/boarding-passes',
        method: 'POST',
        body: { names: [{ firstName: 'YANG', lastName: 'LU' }] }
      },
      _links: {
        checkIn: {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'POST',
          body: {
            recordLocator: 'R4ZGJ3',
            checkInSessionToken: '...',
            firstName: 'y',
            lastName: 'lu'
          }
        },
        travelDocuments: null,
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
  }
};