class FlightStatusDetailsBuilder {
  constructor() {
    this.header = {
      tripDescription: 'Flight 1632 / 1781',
      date: '2017-04-09',
      from: 'Austin, TX (AUS)',
      to: 'Atlanta, GA (ATL)'
    };
    this.flightCards = [
      {
        legs: [
          {
            flightNumber: '205',
            departure: {
              airport: 'ATL',
              status: 'ON TIME',
              actualTime: '08:55',
              originalTime: '06:20',
              gate: 'G21',
              statusType: 'POSITIVE'
            },
            arrival: {
              airport: 'HOU',
              status: 'DEPARTED',
              actualTime: '13:55',
              originalTime: '07:20',
              gate: 'N/A',
              isNextDay: true,
              statusType: 'POSITIVE'
            },
            isNowBoarding: true
          }
        ]
      }
    ];
    this.sharedDetails = {
      flightInfo: {
        title: 'Flight 930 / 12 on Mon, Mar 2',
        departureInfo: 'Austin(AUS) 6:30 AM',
        departureDateTime: '2020-03-02T06:30:00.000-06:00',
        arrivalInfo: 'Dallas(DAL) 10:05 AM',
        arrivalDateTime: '2020-03-02T10:05:00.000-06:00',
        stationImage: 'https://mobile.dev4.southwest.com/content/mkt/images/airport_info/DAL_airport_info.jpg'
      },
      _links: {
        flightStatusDetail: {
          href: '/v1/mobile-air-operations/page/flight-status/details',
          method: 'GET',
          query: {
            'flight-keys': '2023-05-16%3ASFODEN3717%7C2023-05-17%3ADENLGA528'
          }
        }
      }
    };

    return this;
  }

  withConnectingFlight() {
    this.header = {
      tripDescription: 'Flight 101 / 205',
      date: '2017-04-09',
      from: 'Austin, TX (AUS)',
      to: 'Atlanta, GA (ATL)'
    };
    this.flightCards = [
      {
        legs: [
          {
            flightNumber: '100',
            departure: {
              airport: 'ATL',
              status: 'ON TIME',
              actualTime: '08:55',
              originalTime: '06:20',
              gate: 'G21',
              statusType: 'POSITIVE'
            },
            arrival: {
              airport: 'MSY',
              status: 'DEPARTED',
              actualTime: '13:55',
              originalTime: '07:20',
              gate: 'N/A',
              isNextDay: true,
              statusType: 'POSITIVE'
            },
            isNowBoarding: false
          },
          {
            flightNumber: '205',
            departure: {
              airport: 'MSY',
              status: 'ON TIME',
              actualTime: '08:55',
              originalTime: '06:20',
              gate: 'G21',
              statusType: 'POSITIVE'
            },
            arrival: {
              airport: 'HOU',
              status: 'DEPARTED',
              actualTime: '13:55',
              originalTime: '07:20',
              gate: 'N/A',
              isNextDay: true,
              statusType: 'POSITIVE'
            },
            isNowBoarding: false
          }
        ]
      }
    ];
    this.sharedDetails = {
      flightInfo: {
        title: 'Flight 930 / 12 on Mon, Mar 2',
        departureInfo: 'Austin(AUS) 6:30 AM',
        departureDateTime: '2020-03-02T06:30:00.000-06:00',
        arrivalInfo: 'Dallas(DAL) 10:05 AM',
        arrivalDateTime: '2020-03-02T10:05:00.000-06:00',
        stationImage: 'https://mobile.dev4.southwest.com/content/mkt/images/airport_info/DAL_airport_info.jpg'
      },
      _links: {
        flightStatusDetail: {
          href: '/v1/mobile-air-operations/page/flight-status/details',
          method: 'GET',
          query: {
            'flight-keys': '2023-05-16%3ASFODEN3717%7C2023-05-17%3ADENLGA528'
          }
        }
      }
    };

    return this;
  }

  withOvernight() {
    this.flightCards = [
      {
        legs: [
          {
            flightNumber: '205',
            departure: {
              airport: 'ATL',
              status: 'ON TIME',
              actualTime: '08:55',
              originalTime: '06:20',
              gate: 'G21',
              isOvernight: true,
              statusType: 'POSITIVE'
            },
            arrival: {
              airport: 'HOU',
              status: 'DEPARTED',
              actualTime: '13:55',
              originalTime: '07:20',
              gate: 'N/A',
              isNextDay: true,
              statusType: 'POSITIVE'
            },
            isNowBoarding: true
          }
        ]
      }
    ];

    return this;
  }

  build() {
    return {
      flightStatusDetailsPage: {
        header: this.header,
        flightCards: this.flightCards,
        shareDetails: this.sharedDetails
      }
    };
  }
}

module.exports = FlightStatusDetailsBuilder;
