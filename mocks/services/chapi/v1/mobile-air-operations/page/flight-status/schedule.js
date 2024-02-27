module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/flight-status/schedule',
  method: 'GET',
  cache: false,
  template: () => ({
    flightSchedulesPage: {
      header: {
        tripDescription: 'ATL - AUS',
        date: '2017-05-23',
        from: 'Atlanta, GA (ATL)',
        to: 'Austin, TX (AUS)'
      },
      flights: [
        {
          flightNumbers: ['160', '1750'],
          departsTime: '07:00',
          arrivesTime: '09:50',
          stopDescription: '1 Stop, Change planes HOU',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'HOU',
                'departure-date': '2017-05-23',
                'flight-number1': '160',
                'origin-airport2': 'HOU',
                'destination-airport2': 'AUS',
                'flight-number2': '1750'
              }
            }
          }
        },
        {
          flightNumbers: ['1614'],
          departsTime: '09:10',
          arrivesTime: '11:45',
          stopDescription: '1 Stop, No plane change',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'AUS',
                'departure-date': '2017-05-23',
                'flight-number1': '1614'
              }
            }
          }
        },
        {
          flightNumbers: ['3078', '1334'],
          departsTime: '10:10',
          arrivesTime: '14:05',
          stopDescription: '1 Stop, Change planes DAL',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'DAL',
                'departure-date': '2017-05-23',
                'flight-number1': '3078',
                'origin-airport2': 'DAL',
                'destination-airport2': 'AUS',
                'flight-number2': '1334'
              }
            }
          }
        },
        {
          flightNumbers: ['1471'],
          departsTime: '11:40',
          arrivesTime: '13:05',
          stopDescription: 'Nonstop',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'AUS',
                'departure-date': '2017-05-23',
                'flight-number1': '1471'
              }
            }
          }
        },
        {
          flightNumbers: ['684', '1881'],
          departsTime: '12:15',
          arrivesTime: '15:50',
          stopDescription: '1 Stop, Change planes STL',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'STL',
                'departure-date': '2017-05-23',
                'flight-number1': '684',
                'origin-airport2': 'STL',
                'destination-airport2': 'AUS',
                'flight-number2': '1881'
              }
            }
          }
        },
        {
          flightNumbers: ['66', '32'],
          departsTime: '13:00',
          arrivesTime: '16:30',
          stopDescription: '1 Stop, Change planes DAL',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'DAL',
                'departure-date': '2017-05-23',
                'flight-number1': '66',
                'origin-airport2': 'DAL',
                'destination-airport2': 'AUS',
                'flight-number2': '32'
              }
            }
          }
        },
        {
          flightNumbers: ['36', '153'],
          departsTime: '13:15',
          arrivesTime: '17:30',
          stopDescription: '2 Stops, Change planes DAL',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'DAL',
                'departure-date': '2017-05-23',
                'flight-number1': '36',
                'origin-airport2': 'DAL',
                'destination-airport2': 'AUS',
                'flight-number2': '153'
              }
            }
          }
        },
        {
          flightNumbers: ['768', '32'],
          departsTime: '13:30',
          arrivesTime: '16:30',
          stopDescription: '1 Stop, Change planes DAL',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'DAL',
                'departure-date': '2017-05-23',
                'flight-number1': '768',
                'origin-airport2': 'DAL',
                'destination-airport2': 'AUS',
                'flight-number2': '32'
              }
            }
          }
        },
        {
          flightNumbers: ['768', '153'],
          departsTime: '13:30',
          arrivesTime: '17:30',
          stopDescription: '1 Stop, Change planes DAL',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'DAL',
                'departure-date': '2017-05-23',
                'flight-number1': '768',
                'origin-airport2': 'DAL',
                'destination-airport2': 'AUS',
                'flight-number2': '153'
              }
            }
          }
        },
        {
          flightNumbers: ['1201', '500'],
          departsTime: '13:35',
          arrivesTime: '16:15',
          stopDescription: '1 Stop, Change planes MSY',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'MSY',
                'departure-date': '2017-05-23',
                'flight-number1': '1201',
                'origin-airport2': 'MSY',
                'destination-airport2': 'AUS',
                'flight-number2': '500'
              }
            }
          }
        },
        {
          flightNumbers: ['652'],
          departsTime: '16:00',
          arrivesTime: '16:30',
          stopDescription: 'Nonstop',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'AUS',
                'departure-date': '2017-05-23',
                'flight-number1': '652'
              }
            }
          }
        },
        {
          flightNumbers: ['864'],
          departsTime: '17:55',
          arrivesTime: '23:10',
          stopDescription: '1 Stop, No plane change',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'AUS',
                'departure-date': '2017-05-23',
                'flight-number1': '864'
              }
            }
          }
        },
        {
          flightNumbers: ['901', '379'],
          departsTime: '19:05',
          arrivesTime: '22:55',
          stopDescription: '1 Stop, Change planes HOU',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'HOU',
                'departure-date': '2017-05-23',
                'flight-number1': '901',
                'origin-airport2': 'HOU',
                'destination-airport2': 'AUS',
                'flight-number2': '379'
              }
            }
          }
        },
        {
          flightNumbers: ['1828', '1919'],
          departsTime: '19:05',
          arrivesTime: '23:15',
          stopDescription: '1 Stop, Change planes DAL',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'DAL',
                'departure-date': '2017-05-23',
                'flight-number1': '1828',
                'origin-airport2': 'DAL',
                'destination-airport2': 'AUS',
                'flight-number2': '1919'
              }
            }
          }
        },
        {
          flightNumbers: ['3022'],
          departsTime: '20:00',
          arrivesTime: '21:20',
          stopDescription: 'Nonstop',
          arrivesNextDay: false,
          _links: {
            flightStatusDetail: {
              href: '/v1/mobile-air-operations/page/flight-status/details',
              method: 'GET',
              query: {
                'origin-airport1': 'ATL',
                'destination-airport1': 'AUS',
                'departure-date': '2017-05-23',
                'flight-number1': '3022'
              }
            }
          }
        }
      ]
    }
  })
};
