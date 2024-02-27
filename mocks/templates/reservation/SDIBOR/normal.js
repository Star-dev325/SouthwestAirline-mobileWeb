module.exports = {
  recordLocator: 'SDIBOR',
  passengers: [
    {
      secureFlightName: {
        firstName: 'XN',
        lastName: 'LIU',
        middleName: '',
        suffix: ''
      },
      birthDate: '1948-01-03',
      gender: 'M',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'boardingPass',
          checkinDocumentReason: 'withinCheckinTimeWindow',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201607092000-0600,201607092255-0500|DEN-DAL|WN2526',
          _links: {
            checkin: {
              href: '/reservations/record-locator/SDIBOR/boarding-passes',
              method: 'POST'
            }
          }
        },
        {
          checkinDocumentType: 'airportCheckinRequired',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201607121235-0500,201607121335-0600|DAL-DEN|WN3173',
          _links: {
            checkin: null
          }
        }
      ],
      tier: 'NON_ELITE',
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
      earlyBirdEligibilities: [
        {
          earlyBirdProductId: null,
          status: 'TIME_WINDOW_CLOSED',
          priceCents: 0,
          originationDestinationId: '201607092000-0600,201607092255-0500|DEN-DAL|WN2526'
        },
        {
          earlyBirdProductId: 'REFMfDIwMTYtMDUtMTJ8MzE3M3xYTnx8TElVfHwxNTAw',
          status: 'ELIGIBLE',
          priceCents: 1500,
          originationDestinationId: '201607121235-0500,201607121335-0600|DAL-DEN|WN3173'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-07-09T20:00:00.000-06:00',
            arrivalDateTime: '2016-07-09T22:55:00.000-05:00',
            originationAirportCode: 'DEN',
            destinationAirportCode: 'DAL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2526'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2526'
            },
            legs: [
              {
                originationAirportCode: 'DEN',
                destinationAirportCode: 'DAL'
              }
            ],
            wifiAvailable: false,
            segmentId: '201607092000-0600,201607092255-0500|DEN-DAL|WN2526'
          }
        ],
        durationMinutes: 115,
        originationDestinationId: '201607092000-0600,201607092255-0500|DEN-DAL|WN2526',
        checkinDocumentReason: 'withinCheckinTimeWindow',
        checkinDocumentType: 'boardingPass',
        warnings: [
          {
            code: 500599101,
            message: 'Sorry! We were unable to process your request at this time. Please try again.',
            httpStatusCode: 'INTERNAL_SERVER_ERROR',
            requestId: 'ROM1pshhRh69x6_on66rtQ-API'
          }
        ],
        fareType: 'Wanna Get Away',
        _links: {
          checkin: {
            href: '/reservations/record-locator/SDIBOR/boarding-passes',
            method: 'POST'
          }
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-07-12T12:35:00.000-05:00',
            arrivalDateTime: '2016-07-12T13:35:00.000-06:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'DEN',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3173'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3173'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'DEN'
              }
            ],
            wifiAvailable: false,
            segmentId: '201607121235-0500,201607121335-0600|DAL-DEN|WN3173'
          }
        ],
        durationMinutes: 120,
        originationDestinationId: '201607121235-0500,201607121335-0600|DAL-DEN|WN3173',
        checkinDocumentReason: 'beforeCheckinWindowTime',
        checkinDocumentType: 'airportCheckinRequired',
        fareType: 'Wanna Get Away',
        _links: null
      }
    ]
  },
  receiptEmail: 'SDF@SFESF.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false,
  _links: {
    retrieveForCancel: {
      href: '/v1/mobile/reservations/record-locator/SDIBOR?first-name=x&last-name=liu&action=CANCEL',
      method: 'GET'
    },
    retrieveForChange: {
      href: '/v1/mobile/reservations/record-locator/SDIBOR?first-name=x&last-name=liu&action=CHANGE',
      method: 'GET'
    },
    retrieveForBuyEarlyBird: {
      href: '/v1/mobile/reservations/record-locator/SDIBOR?first-name=x&last-name=liu&action=EARLYBIRD',
      method: 'GET'
    },
    companionReservations: null
  }
};
