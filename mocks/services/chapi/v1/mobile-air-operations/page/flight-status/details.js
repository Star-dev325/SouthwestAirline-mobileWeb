module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/flight-status/details',
  method: 'GET',
  cache: false,
  template: () => ({
    flightStatusDetailsPage: {
      header: {
        tripDescription: 'Flight 1750 / 160',
        date: '2017-05-23',
        from: 'Atlanta, GA (ATL)',
        to: 'Austin, TX (AUS)'
      },
      flightCards: [
        {
          legs: [
            {
              flightNumber: '1750',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700'
              },
              departure: {
                airport: 'HOU',
                status: 'ON TIME',
                statusType: 'POSITIVE',
                actualTime: '09:00',
                originalTime: '09:00',
                gate: 'N/A'
              },
              arrival: {
                airport: 'AUS',
                status: 'ON TIME',
                statusType: 'POSITIVE',
                actualTime: '09:50',
                originalTime: '09:50',
                gate: 'N/A',
                isNextDay: false
              },
              isNowBoarding: false
            }
          ],
          _links: {}
        },
        {
          legs: [
            {
              flightNumber: '160',
              aircraftInfo: {
                aircraftType: 'Boeing 737-700'
              },
              departure: {
                airport: 'ATL',
                status: 'ON TIME',
                statusType: 'POSITIVE',
                actualTime: '07:00',
                originalTime: '07:00',
                gate: 'N/A'
              },
              arrival: {
                airport: 'HOU',
                status: 'ON TIME',
                statusType: 'POSITIVE',
                actualTime: '08:10',
                originalTime: '08:10',
                gate: 'N/A',
                isNextDay: false
              },
              isNowBoarding: false
            }
          ],
          _links: {
            createNotification: {
              href: '/v1/mobile-air-operations/feature/flights/statuses/subscriptions',
              method: 'POST',
              body: {
                originationAirportCode: 'ATL',
                destinationAirportCode: 'HOU',
                scheduledDate: '2017-05-23',
                scheduledFlightNumber: '160'
              }
            }
          }
        }
      ]
    }
  })
};
