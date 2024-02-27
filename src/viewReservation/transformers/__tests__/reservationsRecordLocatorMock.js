export default {
  recordLocator: 'HG9ODC',
  passengers: [
    {
      secureFlightName: {
        firstName: 'JUDY',
        lastName: 'JOHNSON',
        middleName: '',
        suffix: ''
      },
      birthDate: '1973-03-05',
      gender: 'F',
      hasPassportInfo: true,
      accountNumber: '00008350157373',
      redressNumber: '',
      knownTravelerId: '',
      passengerReference: '2',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201512081910-0600,201512082000-0700|DAL-ABQ|WN2890',
          _links: {
            checkin: {
              href: '/reservations/record-locator/HG9ODC/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201512121025-0700,201512121300-0600|ABQ-DAL|WN3275',
          _links: {
            checkin: null
          }
        }
      ],
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: 'QVVTfDIwMTUtMTItMzF8MTY5fEtBVEV8SkVSUll8VFNBVEJ8fDEyNTA=',
          status: 'ELIGIBLE',
          priceCents: 1250,
          originationDestinationId: '201512310530-0600,201512311150-0500|AUS-BWI,BWI-BOS|WN169,WN3487'
        },
        {
          earlyBirdProductId: 'Qk9TfDIwMTYtMDEtMDJ8NTk1N3xLQVRFfEpFUlJZfFRTQVRCfHwxMjUw',
          status: 'ELIGIBLE',
          priceCents: 1250,
          originationDestinationId: '201601020715-0500,201601021250-0600|BOS-BWI,BWI-AUS|WN5957,WN6477'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2015-12-08T19:10:00.000-06:00',
            arrivalDateTime: '2015-12-08T20:00:00.000-07:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'ABQ',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2890'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2890'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'HOU'
              },
              {
                originationAirportCode: 'HOU',
                destinationAirportCode: 'ABQ'
              }
            ],
            wifiAvailable: true,
            segmentId: '201512081910-0600,201512082000-0700|DAL-ABQ|WN2890',
            flightStatus: {
              departureActualTime: '19:10:00.000',
              arrivalActualTime: '20:00:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '2890',
              destinationAirportCode: 'ABQ',
              originationAirportCode: 'DAL',
              departureDate: '2015-12-08',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '2890',
              departureScheduledTime: '19:10:00.000',
              arrivalScheduledTime: '20:00:00.000',
              equipmentType: '73W'
            }
          }
        ],
        durationMinutes: 110,
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        fareType: 'Anytime',
        originDestinationId: '201512081910-0600,201512082000-0700|DAL-ABQ|WN2890',
        _links: {
          checkin: {
            href: '/reservations/record-locator/HG9ODC/boarding-passes',
            method: 'POST'
          }
        }
      },
      {
        segments: [
          {
            departureDateTime: '2015-12-12T10:25:00.000-07:00',
            arrivalDateTime: '2015-12-12T11:00:00.000-06:00',
            originationAirportCode: 'ABQ',
            destinationAirportCode: 'DAL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3275'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3275'
            },
            legs: [
              {
                originationAirportCode: 'ABQ',
                destinationAirportCode: 'AUS'
              }
            ],
            wifiAvailable: false,
            segmentId: '201512121025-0700,201512121300-0600|ABQ-DAL|WN3275'
          },
          {
            departureDateTime: '2015-12-12T11:25:00.000-07:00',
            arrivalDateTime: '2015-12-12T12:00:00.000-06:00',
            originationAirportCode: 'AUS',
            destinationAirportCode: 'DAL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3276'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3276'
            },
            legs: [
              {
                originationAirportCode: 'AUS',
                destinationAirportCode: 'DAL'
              }
            ],
            wifiAvailable: false,
            segmentId: '201512121025-0700,201512121300-0600|ABQ-DAL|WN3275'
          }
        ],
        durationMinutes: 95,
        checkinDocumentReason: 'beforeCheckinWindowTime',
        checkinDocumentType: 'airportCheckinRequired',
        fareType: 'Anytime',
        originDestinationId: '201512121025-0700,201512121300-0600|ABQ-DAL|WN3275',
        _links: {
          checkin: {
            href: '/reservations/record-locator/HEGL37/boarding-passes',
            method: 'POST'
          }
        }
      }
    ]
  },
  receiptEmail: 'E97419@WNCO.COM',
  international: false,
  warnings: [],
  unaccompaniedMinor: false
};
