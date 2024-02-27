export default {
  recordLocator: 'BLKLST',
  passengers: [
    {
      secureFlightName: { firstName: 'BANDIT', lastName: 'YELLOW', middleName: '', suffix: '' },
      birthDate: '1990-09-06',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: 'A',
          boardingPosition: '16',
          segmentId: '201504281840-0500,201504281915-0700|DAL-PHX|WN44',
          _links: { checkin: { href: '/reservations/record-locator/BLKLST/boarding-passes', method: 'POST' } }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201505012005-0700,201505020020-0500|PHX-DAL|WN892',
          _links: { checkin: null }
        }
      ]
    },
    {
      secureFlightName: { firstName: 'JANE', lastName: 'SMITH', middleName: '', suffix: '' },
      birthDate: '1990-04-28',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: 'A',
          boardingPosition: '17',
          segmentId: '201504281840-0500,201504281915-0700|DAL-PHX|WN44',
          _links: { checkin: { href: '/reservations/record-locator/BLKLST/boarding-passes', method: 'POST' } }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201505012005-0700,201505020020-0500|PHX-DAL|WN892',
          _links: { checkin: null }
        }
      ]
    },
    {
      secureFlightName: { firstName: 'RACHEL', lastName: 'PLUMS', middleName: '', suffix: '' },
      birthDate: '2007-11-20',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'passengerOnWatchList',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201504281840-0500,201504281915-0700|DAL-PHX|WN44',
          _links: { checkin: null }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201505012005-0700,201505020020-0500|PHX-DAL|WN892',
          _links: { checkin: null }
        }
      ]
    },
    {
      secureFlightName: { firstName: 'JOHN', lastName: 'WILLIAMS', middleName: '', suffix: '' },
      birthDate: '1990-04-28',
      gender: 'M',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: 'A',
          boardingPosition: '18',
          segmentId: '201504281840-0500,201504281915-0700|DAL-PHX|WN44',
          _links: { checkin: { href: '/reservations/record-locator/BLKLST/boarding-passes', method: 'POST' } }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201505012005-0700,201505020020-0500|PHX-DAL|WN892',
          _links: { checkin: null }
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2015-04-28T18:40:00.000-05:00',
            arrivalDateTime: '2015-04-28T19:15:00.000-07:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'PHX',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '44' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '44' },
            legs: [{ originationAirportCode: 'DAL', destinationAirportCode: 'PHX' }],
            wifiAvailable: true
          }
        ],
        durationMinutes: 155,
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        _links: { checkin: { href: '/reservations/record-locator/BLKLST/boarding-passes', method: 'POST' } }
      },
      {
        segments: [
          {
            departureDateTime: '2025-05-01T20:05:00.000-07:00',
            arrivalDateTime: '2025-05-02T00:20:00.000-05:00',
            originationAirportCode: 'PHX',
            destinationAirportCode: 'DAL',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '892' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '892' },
            legs: [{ originationAirportCode: 'PHX', destinationAirportCode: 'DAL' }],
            wifiAvailable: false
          },
          {
            departureDateTime: '2025-05-03T08:05:00.000-07:00',
            arrivalDateTime: '2025-05-04T00:20:00.000-05:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'AUS',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '888' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '888' },
            legs: [{ originationAirportCode: 'DAL', destinationAirportCode: 'AUS' }],
            wifiAvailable: false
          }
        ],
        durationMinutes: 135,
        checkinDocumentReason: 'beforeCheckinWindowTime',
        checkinDocumentType: 'airportCheckinRequired',
        _links: { checkin: null }
      }
    ]
  },
  receiptEmail: 'TEST@TEST.COM'
};
