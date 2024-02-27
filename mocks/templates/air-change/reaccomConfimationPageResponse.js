module.exports = {
  reaccomConfirmation: {
    headerMessage: {
      key: 'REACCOM_CONFIRMATION',
      header: 'Your trip is booked!',
      body: 'Check in up to 24 hours in advance. The earlier you check in, the better your seat selection.',
      icon: 'POSITIVE',
      textColor: 'DEFAULT',
      backgroundColor: 'DEFAULT'
    },
    messages: null,
    dates: {
      first: '2019-11-21',
      second: '2019-11-25'
    },
    destinationDescription: 'Austin',
    passengers: [
      {
        displayName: 'Amber Awesome',
        accountNumber: '601725003',
        specialAssistanceMessage: null
      }
    ],
    recordLocator: 'REACC2',
    bounds: [
      {
        boundType: 'DEPARTING',
        departureDate: '2019-10-19',
        flights: [
          {
            number: '1338',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-800',
              numberOfSeats: 175,
              wifiSupported: true
            }
          },
          {
            number: '2346',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }
        ],
        departureTime: '12:15',
        departureAirport: {
          name: 'Atlanta',
          state: 'GA',
          code: 'ATL',
          country: null
        },
        arrivalTime: '15:50',
        arrivalAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        passengerCount: '1 Passenger',
        stops: [
          {
            arrivalTime: '13:40',
            departureTime: '14:55',
            changePlanes: true,
            airport: {
              name: 'Houston (Hobby)',
              state: 'TX',
              code: 'HOU',
              country: null
            }
          }
        ],
        isNextDayArrival: false,
        travelTime: '4h 35m'
      },
      {
        boundType: 'RETURNING',
        departureDate: '2019-11-25',
        flights: [
          {
            number: '1316',
            wifiOnBoard: true,
            aircraftInfo: {
              aircraftType: 'Boeing 737-700',
              numberOfSeats: 143,
              wifiSupported: true
            }
          }
        ],
        departureTime: '14:45',
        departureAirport: {
          name: 'Austin',
          state: 'TX',
          code: 'AUS',
          country: null
        },
        arrivalTime: '17:55',
        arrivalAirport: {
          name: 'Atlanta',
          state: 'GA',
          code: 'ATL',
          country: null
        },
        passengerCount: '1 Passenger',
        stops: [],
        isNextDayArrival: false,
        travelTime: '2h 10m'
      }
    ]
  }
};
