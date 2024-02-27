module.exports = {
  recordLocator: '35BBDH',
  owningReservationSystem: 'ALTEA',
  passengers: [
    {
      secureFlightName: {
        firstName: 'YANGJIE',
        lastName: 'LU',
        middleName: '',
        suffix: ''
      },
      birthDate: '1980-02-08',
      gender: 'FEMALE',
      accountNumber: null,
      recordLocator: '35BBDH',
      redressNumber: '',
      knownTravelerId: null,
      checkinEligibilities: [
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'tooCloseToDeparture',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201610280545-0500,201610280855-0400|AUS-ATL|WN190',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'cleared',
          checkinDocumentReason: 'passengerSecureFlightStatusClear',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201610281130-0400,201610281300-0400|ATL-AUA|WN3031',
          _links: {
            checkin: {
              href: '/reservations/record-locator/35BBDH/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201610311330-0400,201610311500-0400|AUA-ATL|WN3283',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201610311730-0400,201610311855-0500|ATL-AUS|WN814',
          _links: {
            checkin: null
          }
        }
      ],
      hasExtraSeat: false,
      hasInfant: false,
      passengerType: 'ADULT',
      travelerId: '2301C8A200005AE2',
      specialConditions: [],
      apis: {
        apisDocuments: [
          {
            documentType: 'RESIDENCE_ADDRESS',
            addresses: [
              {
                addressType: 'OTHER',
                country: 'USA'
              }
            ]
          },
          {
            documentType: 'PASSPORT',
            docNumber: 'DSH283829929',
            expirationDate: '2019-02-09',
            issueCountry: 'USA'
          }
        ],
        nationality: 'USA'
      },
      missingApisInformation: [
        {
          category: 'EMERGENCY_CONTACT',
          message: 'Emergency contact name required'
        },
        {
          category: 'EMERGENCY_CONTACT',
          message: 'Emergency contact telephone number required'
        },
        {
          category: 'EMERGENCY_CONTACT',
          message: 'Emergency contact telephone no country code required'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-10-28T05:45:00.000-05:00',
            arrivalDateTime: '2016-10-28T08:55:00.000-04:00',
            originationAirportCode: 'AUS',
            destinationAirportCode: 'ATL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '190'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '190'
            },
            legs: [
              {
                originationAirportCode: 'AUS',
                destinationAirportCode: 'ATL'
              }
            ],
            wifiAvailable: null,
            segmentId: '201610280545-0500,201610280855-0400|AUS-ATL|WN190',
            flightStatus: {
              departureActualTime: '05:45:00.000',
              arrivalActualTime: '08:55:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '190',
              destinationAirportCode: 'ATL',
              originationAirportCode: 'AUS',
              departureDate: '2016-10-28',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '190',
              departureScheduledTime: '05:45:00.000',
              arrivalScheduledTime: '08:55:00.000',
              equipmentType: '73W'
            }
          },
          {
            departureDateTime: '2016-10-28T11:30:00.000-04:00',
            arrivalDateTime: '2016-10-28T13:00:00.000-04:00',
            originationAirportCode: 'ATL',
            destinationAirportCode: 'AUA',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3031'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3031'
            },
            legs: [
              {
                originationAirportCode: 'ATL',
                destinationAirportCode: 'AUA'
              }
            ],
            wifiAvailable: null,
            segmentId: '201610281130-0400,201610281300-0400|ATL-AUA|WN3031',
            flightStatus: {
              departureActualTime: '11:30:00.000',
              arrivalActualTime: '13:00:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '3031',
              destinationAirportCode: 'AUA',
              originationAirportCode: 'ATL',
              departureDate: '2016-10-28',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '3031',
              departureScheduledTime: '11:30:00.000',
              arrivalScheduledTime: '13:00:00.000',
              equipmentType: '7M7'
            }
          }
        ],
        durationMinutes: 375,
        checkinDocumentReason: 'tooCloseToDeparture',
        checkinDocumentType: 'outsideCheckinTimeWindow',
        earlyBirdPurchased: false,
        fareType: null,
        _links: {
          checkin: null
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-10-31T13:30:00.000-04:00',
            arrivalDateTime: '2016-10-31T15:00:00.000-04:00',
            originationAirportCode: 'AUA',
            destinationAirportCode: 'ATL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3283'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3283'
            },
            legs: [
              {
                originationAirportCode: 'AUA',
                destinationAirportCode: 'ATL'
              }
            ],
            wifiAvailable: null,
            segmentId: '201610311330-0400,201610311500-0400|AUA-ATL|WN3283'
          },
          {
            departureDateTime: '2016-10-31T17:30:00.000-04:00',
            arrivalDateTime: '2016-10-31T18:55:00.000-05:00',
            originationAirportCode: 'ATL',
            destinationAirportCode: 'AUS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '814'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '814'
            },
            legs: [
              {
                originationAirportCode: 'ATL',
                destinationAirportCode: 'AUS'
              }
            ],
            wifiAvailable: null,
            segmentId: '201610311730-0400,201610311855-0500|ATL-AUS|WN814'
          }
        ],
        durationMinutes: 385,
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
