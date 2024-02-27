module.exports = {
  recordLocator: 'F7KYIN',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
        middleName: '',
        suffix: ''
      },
      birthDate: '1974-01-30',
      gender: 'M',
      accountNumber: '00000600619261',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201503190600-0500,201503190920-0600|DAL-DEN|WN1628',
          _links: {
            checkin: {
              href: '/reservations/record-locator/F7KYIN/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201503191150-0600,201503191350-0600|DEN-BOI|WN1901',
          _links: {
            checkin: {
              href: '/reservations/record-locator/F7KYIN/boarding-passes',
              method: 'POST'
            }
          }
        }
      ]
    }
  ],
  unaccompaniedMinor: false,
  international: false,
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            segmentId: '201503190600-0500,201503190920-0600|DAL-DEN|WN1628',
            departureDateTime: '2015-03-19T06:00:00.000-05:00',
            arrivalDateTime: '2015-03-19T09:20:00.000-06:00',
            originationAirportCode: 'DAL',
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
                originationAirportCode: 'DAL',
                destinationAirportCode: 'HOU'
              },
              {
                originationAirportCode: 'HOU',
                destinationAirportCode: 'DEN'
              }
            ],
            wifiAvailable: true
          },
          {
            segmentId: '201503191150-0600,201503191350-0600|DEN-BOI|WN1901',
            departureDateTime: '2015-03-19T11:50:00.000-06:00',
            arrivalDateTime: '2015-03-19T13:50:00.000-06:00',
            originationAirportCode: 'DEN',
            destinationAirportCode: 'BOI',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1901'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1901'
            },
            legs: [
              {
                originationAirportCode: 'DEN',
                destinationAirportCode: 'BOI'
              }
            ],
            wifiAvailable: false
          }
        ],
        durationMinutes: 530,
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        _links: {
          checkin: {
            href: '/reservations/record-locator/F7KYIN/boarding-passes',
            method: 'POST'
          }
        }
      }
    ]
  },
  receiptEmail: 'JHOWELL@THOUGHTWORKS.COM'
};
