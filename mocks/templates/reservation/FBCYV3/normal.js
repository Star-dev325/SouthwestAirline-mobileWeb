module.exports = {
  recordLocator: 'FBCYV3',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
        middleName: '',
        suffix: ''
      },
      birthDate: '1990-04-28',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201504070615-0500,201504070705-0500|AUS-HOU|WN3167',
          _links: {
            checkin: {
              href: '/reservations/record-locator/FBCYV3/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201504070745-0500,201504070920-0600|HOU-DEN|WN1628',
          _links: {
            checkin: {
              href: '/reservations/record-locator/FBCYV3/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201504091225-0600,201504091545-0500|DEN-HOU|WN1927',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201504091705-0500,201504091755-0500|HOU-AUS|WN706',
          _links: {
            checkin: null
          }
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            segmentId: '201504070615-0500,201504070705-0500|AUS-HOU|WN3167',
            departureDateTime: '2015-04-07T06:15:00.000-05:00',
            arrivalDateTime: '2015-04-07T07:05:00.000-05:00',
            originationAirportCode: 'AUS',
            destinationAirportCode: 'HOU',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3167'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3167'
            },
            legs: [
              {
                originationAirportCode: 'AUS',
                destinationAirportCode: 'HOU'
              }
            ],
            wifiAvailable: false
          },
          {
            segmentId: '201504070745-0500,201504070920-0600|HOU-DEN|WN1628',
            departureDateTime: '2015-04-07T07:45:00.000-05:00',
            arrivalDateTime: '2015-04-07T09:20:00.000-06:00',
            originationAirportCode: 'HOU',
            destinationAirportCode: 'DEN',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1628'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1628'
            },
            legs: [
              {
                originationAirportCode: 'HOU',
                destinationAirportCode: 'DEN'
              }
            ],
            wifiAvailable: true
          }
        ],
        durationMinutes: 245,
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        _links: {
          checkin: {
            href: '/reservations/record-locator/FBCYV3/boarding-passes',
            method: 'POST'
          }
        }
      },
      {
        segments: [
          {
            segmentId: '201504091225-0600,201504091545-0500|DEN-HOU|WN1927',
            departureDateTime: '2015-04-09T12:25:00.000-06:00',
            arrivalDateTime: '2015-04-09T15:45:00.000-05:00',
            originationAirportCode: 'DEN',
            destinationAirportCode: 'HOU',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1927'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1927'
            },
            legs: [
              {
                originationAirportCode: 'DEN',
                destinationAirportCode: 'HOU'
              }
            ],
            wifiAvailable: true
          },
          {
            segmentId: '201504091705-0500,201504091755-0500|HOU-AUS|WN706',
            departureDateTime: '2015-04-09T17:05:00.000-05:00',
            arrivalDateTime: '2015-04-09T17:55:00.000-05:00',
            originationAirportCode: 'HOU',
            destinationAirportCode: 'AUS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '706'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '706'
            },
            legs: [
              {
                originationAirportCode: 'HOU',
                destinationAirportCode: 'AUS'
              }
            ],
            wifiAvailable: false
          }
        ],
        durationMinutes: 270,
        checkinDocumentReason: 'beforeCheckinWindowTime',
        checkinDocumentType: 'airportCheckinRequired',
        _links: {
          checkin: null
        }
      }
    ]
  },
  receiptEmail: 'TEST@TEST.COM'
};
