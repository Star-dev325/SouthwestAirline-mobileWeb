module.exports = {
  standbyListPage: {
    header: {
      flightNumber: '2004',
      date: '2017-09-07',
      from: 'San Diego, CA (SAN)',
      to: 'New Orleans, LA (MSY)',
      hasWifi: true,
      departureTime: '06:40',
      arrivalTime: '12:15'
    },
    standbyList: [
      {
        isConfirmed: true,
        displayName: 'OTHER / TI'
      },
      {
        isConfirmed: false,
        displayName: 'ONVAC / SI',
        number: '1'
      },
      {
        isConfirmed: false,
        displayName: 'ESCAP / SI',
        number: '2'
      },
      {
        isConfirmed: false,
        displayName: 'DOE / JO',
        number: '3'
      },
      {
        isConfirmed: false,
        displayName: 'DOE / JA',
        number: '4'
      },
      {
        isConfirmed: false,
        displayName: 'DOE / JO',
        number: '5'
      },
      {
        isConfirmed: false,
        displayName: 'DOE / JO',
        number: '6'
      }
    ],
    disclaimerText:
      'Standby position subject to change without notice. Please see a Service Agent for full details of standby position. Seat availability is not guaranteed.',
    _links: {
      standbyListPolicies: {
        href: '/content/generated/data/overlays/standby_policies.json',
        method: 'GET'
      }
    }
  }
};
