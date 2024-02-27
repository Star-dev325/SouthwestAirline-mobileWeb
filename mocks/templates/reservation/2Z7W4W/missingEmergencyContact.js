module.exports = {
  recordLocator: '2Z7W4W',
  passengers: [
    {
      secureFlightName: {
        firstName: 'JIM',
        lastName: 'COLLINS',
        middleName: '',
        suffix: ''
      },
      birthDate: '1969-04-08',
      gender: 'MALE',
      accountNumber: '8348157370',
      recordLocator: '2Z7W4W',
      redressNumber: '',
      knownTravelerId: null,
      checkinEligibilities: [
        {
          checkinDocumentType: 'cleared',
          checkinDocumentReason: 'passengerSecureFlightStatusClear',
          boardingGroup: null,
          boardingPosition: null,
          segmentId: '201601080630-0600,201601080930-0500|DAL-ATL|WN2846',
          _links: {
            checkin: {
              href: '/reservations/record-locator/2Z7W4W/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'cleared',
          checkinDocumentReason: 'passengerSecureFlightStatusClear',
          boardingGroup: null,
          boardingPosition: null,
          segmentId: '201601081115-0500,201601081405-0500|ATL-CUN|WN1134',
          _links: {
            checkin: {
              href: '/reservations/record-locator/2Z7W4W/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: null,
          boardingPosition: null,
          segmentId: '201601171845-0500,201601172010-0600|CUN-HOU|WN308',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: null,
          boardingPosition: null,
          segmentId: '201601172200-0600,201601172255-0600|HOU-DAL|WN64',
          _links: {
            checkin: null
          }
        }
      ],
      tier: 'A_LIST_PREFERRED',
      hasExtraSeat: false,
      hasInfant: false,
      passengerType: 'ADULT',
      travelerId: '2501E77A0000232E',
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
            docNumber: '11111111',
            expirationDate: '2029-03-18',
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
            segmentId: '201601080630-0600,201601080930-0500|DAL-ATL|WN2846',
            departureDateTime: '2016-01-08T06:30:00.000-06:00',
            arrivalDateTime: '2016-01-08T09:30:00.000-05:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'ATL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2846'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2846'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'ATL'
              }
            ],
            wifiAvailable: null,
            flightStatus: {
              departureActualTime: '06:30:00.000',
              arrivalActualTime: '09:30:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '2846',
              destinationAirportCode: 'ATL',
              originationAirportCode: 'DAL',
              departureDate: '2016-01-08',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '2846',
              departureScheduledTime: '06:30:00.000',
              arrivalScheduledTime: '09:30:00.000',
              equipmentType: '73W'
            }
          },
          {
            segmentId: '201601081115-0500,201601081405-0500|ATL-CUN|WN1134',
            departureDateTime: '2016-01-08T11:15:00.000-05:00',
            arrivalDateTime: '2016-01-08T14:05:00.000-05:00',
            originationAirportCode: 'ATL',
            destinationAirportCode: 'CUN',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1134'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1134'
            },
            legs: [
              {
                originationAirportCode: 'ATL',
                destinationAirportCode: 'CUN'
              }
            ],
            wifiAvailable: null,
            flightStatus: {
              departureActualTime: '11:15:00.000',
              arrivalActualTime: '14:05:00.000',
              arrivalGate: null,
              departureGate: null,
              arrivalStatus: 'On Time',
              departureStatus: 'On Time',
              willAdviseArrival: false,
              willAdviseDeparture: false,
              wifiOnBoard: 'false',
              marketingFlightNumber: '1134',
              destinationAirportCode: 'CUN',
              originationAirportCode: 'ATL',
              departureDate: '2016-01-08',
              marketingCarrierCode: 'WN',
              operatingCarrierCode: 'WN',
              operatingFlightNumber: '1134',
              departureScheduledTime: '11:15:00.000',
              arrivalScheduledTime: '14:05:00.000',
              equipmentType: '73W'
            }
          }
        ],
        durationMinutes: 395,
        checkinDocumentReason: 'passengerSecureFlightStatusClear',
        checkinDocumentType: 'cleared',
        earlyBirdPurchased: false,
        fareType: null,
        _links: {
          checkin: {
            href: '/reservations/record-locator/2Z7W4W/boarding-passes',
            method: 'POST'
          }
        }
      },
      {
        segments: [
          {
            segmentId: '201601171845-0500,201601172010-0600|CUN-HOU|WN308',
            departureDateTime: '2016-01-17T18:45:00.000-05:00',
            arrivalDateTime: '2016-01-17T20:10:00.000-06:00',
            originationAirportCode: 'CUN',
            destinationAirportCode: 'HOU',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '308'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '308'
            },
            legs: [
              {
                originationAirportCode: 'CUN',
                destinationAirportCode: 'HOU'
              }
            ],
            wifiAvailable: null
          },
          {
            segmentId: '201601172200-0600,201601172255-0600|HOU-DAL|WN64',
            departureDateTime: '2016-01-17T22:00:00.000-06:00',
            arrivalDateTime: '2016-01-17T22:55:00.000-06:00',
            originationAirportCode: 'HOU',
            destinationAirportCode: 'DAL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '64'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '64'
            },
            legs: [
              {
                originationAirportCode: 'HOU',
                destinationAirportCode: 'DAL'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 310,
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
