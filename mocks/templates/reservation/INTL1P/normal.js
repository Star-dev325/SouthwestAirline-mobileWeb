module.exports = {
  recordLocator: 'INTL1P',
  passengers: [
    {
      secureFlightName: {
        firstName: 'TOM',
        lastName: 'NELSON',
        middleName: '',
        suffix: ''
      },
      birthDate: '1969-01-07',
      gender: 'MALE',
      accountNumber: '8351157371',
      recordLocator: 'INTL1P',
      redressNumber: '',
      knownTravelerId: null,
      checkinEligibilities: [
        {
          checkinDocumentType: 'cleared',
          checkinDocumentReason: 'passengerSecureFlightStatusClear',
          boardingGroup: 'A',
          boardingPosition: '30',
          segmentId: '201512090845-0600,201512091200-0500|HOU-CUN|WN305',
          _links: {
            checkin: {
              href: '/reservations/record-locator/INTL1P/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: null,
          boardingPosition: null,
          segmentId: '201512121345-0500,201512121510-0600|CUN-HOU|WN306',
          _links: {
            checkin: null
          }
        }
      ],
      tier: 'A_LIST_PREFERRED',
      hasExtraSeat: false,
      hasInfant: false,
      passengerType: 'ADULT',
      travelerId: '2501E75D00000D36',
      specialConditions: [],
      missingApisInformation: [
        {
          category: 'NATIONALITY',
          message: 'Missing nationality'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            segmentId: '201512090845-0600,201512091200-0500|HOU-CUN|WN305',
            departureDateTime: '2015-12-09T08:45:00.000-06:00',
            arrivalDateTime: '2015-12-09T12:00:00.000-05:00',
            originationAirportCode: 'HOU',
            destinationAirportCode: 'CUN',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '305'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '305'
            },
            legs: [
              {
                originationAirportCode: 'HOU',
                destinationAirportCode: 'CUN'
              }
            ],
            wifiAvailable: null,
            flightStatus: {
              departureActualTime: '08:45:00.000',
              arrivalActualTime: '12:00:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '305',
              destinationAirportCode: 'CUN',
              originationAirportCode: 'HOU',
              departureDate: '2015-12-09',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '305',
              departureScheduledTime: '08:45:00.000',
              arrivalScheduledTime: '12:00:00.000',
              equipmentType: '73W'
            }
          }
        ],
        durationMinutes: 135,
        checkinDocumentReason: 'passengerSecureFlightStatusClear',
        checkinDocumentType: 'cleared',
        earlyBirdPurchased: false,
        fareType: null,
        _links: {
          checkin: {
            href: '/reservations/record-locator/INTL1P/boarding-passes',
            method: 'POST'
          }
        }
      },
      {
        segments: [
          {
            segmentId: '201512121345-0500,201512121510-0600|CUN-HOU|WN306',
            departureDateTime: '2015-12-12T13:45:00.000-05:00',
            arrivalDateTime: '2015-12-12T15:10:00.000-06:00',
            originationAirportCode: 'CUN',
            destinationAirportCode: 'HOU',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '306'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '306'
            },
            legs: [
              {
                originationAirportCode: 'CUN',
                destinationAirportCode: 'HOU'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 145,
        checkinDocumentReason: 'beforeCheckinWindowTime',
        checkinDocumentType: 'outsideCheckinTimeWindow',
        earlyBirdPurchased: false,
        fareType: null,
        _links: {
          checkin: null
        }
      }
    ]
  },
  international: true,
  warnings: [],
  unaccompaniedMinor: false
};
