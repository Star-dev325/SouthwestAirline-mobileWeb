module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/2IGGMN',
  method: 'POST',
  cache: false,
  template: {
    checkInSessionToken: 'longToken',
    checkInViewReservationPage: {
      pnr: {
        confirmationNumber: '2IGGMN',
        passengers: ['John Doe']
      },
      cards: [
        {
          dates: {
            first: '2020-10-28',
            second: null
          },
          destinationDescription: 'Albany',
          departureDate: '2020-10-28',
          departureAirport: 'AUS',
          departureTime: '06:00',
          arrivalAirport: 'ALB',
          arrivalTime: '13:05',
          hazmatCheckInDisclaimer:
            "By tapping 'Check in' you acknowledge that you understand the hazardous materials restrictions and penalties.",
          flights: [
            {
              flightNumber: '212',
              hasWifi: true,
              originAirportCode: 'AUS',
              destinationAirportCode: 'MCO',
              destinationStationName: 'Orlando',
              departureDate: 'Oct 28',
              departureGate: null,
              departureTime: '06:00'
            },
            {
              flightNumber: '234',
              hasWifi: true,
              originAirportCode: 'MCO',
              destinationAirportCode: 'ALB',
              destinationStationName: 'Albany',
              departureDate: 'Oct 28',
              departureGate: null,
              departureTime: '10:25'
            }
          ],
          travelTime: '6h 5m'
        }
      ],
      hazmatText:
        'Federal law forbids the carriage of hazardous materials such as aerosols, fireworks, lithium batteries and flammable liquids aboard the aircraft in your checked or carryon baggage. E-cigarettes are not permitted in checked baggage and must be transported in carryon baggage only.',
      _analytics: {
        'checkin.odout': 'AUSALB'
      },
      _links: {
        checkIn: {
          href: '/v1/mobile-air-operations/page/check-in',
          method: 'POST',
          body: {
            recordLocator: '2IGGMN',
            checkInSessionToken: 'longToken',
            firstName: 'john',
            lastName: 'doe',
            passengerSearchToken:
              'BzqCCiLk6LiMpoFfqfmtSHEgvwh0dmGtkg-J7evu0uAUjKr6fpNa5s8jL-cjb51Bx8gk9V_GpNogTnqHKocXR0Ktgl4H3g4n8c7GZtapL5z2decFq78f1r7-YY3owKH9hCA_nkq3W5X_1Q=='
          }
        },
        travelDocuments: null
      }
    },
    prefillPassengerAPISDocuments: null
  }
};
