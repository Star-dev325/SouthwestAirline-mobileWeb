module.exports = {
  recordLocator: '8LWAML',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
        middleName: '',
        suffix: ''
      },
      birthDate: '1980-04-03',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      checkinEligibilities: [
        {
          checkinDocumentType: 'cleared',
          checkinDocumentReason: 'passengerSecureFlightStatusClear',
          boardingGroup: 'A',
          boardingPosition: '17',
          segmentId: '201604271315-0500,201604271405-0500|DAL-AUS|WN3246',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'cleared',
          checkinDocumentReason: 'passengerSecureFlightStatusClear',
          boardingGroup: 'A',
          boardingPosition: '19',
          segmentId: '201604271500-0500,201604271630-0500|AUS-CUN|WN4653',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201604301200-0500,201604301330-0500|CUN-AUS|WN4916',
          _links: {
            checkin: null
          }
        },
        {
          checkinDocumentType: 'outsideCheckinTimeWindow',
          checkinDocumentReason: 'beforeCheckinWindowTime',
          boardingGroup: '',
          boardingPosition: '',
          segmentId: '201604301515-0500,201604301610-0500|AUS-DAL|WN1513',
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
          status: 'INTL_RESERVATION',
          priceCents: 0,
          originationDestinationId: '201604271315-0500,201604271630-0500|DAL-AUS,AUS-CUN|WN3246,WN4653'
        },
        {
          earlyBirdProductId: null,
          status: 'INTL_RESERVATION',
          priceCents: 0,
          originationDestinationId: '201604301200-0500,201604301610-0500|CUN-AUS,AUS-DAL|WN4916,WN1513'
        }
      ]
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-04-27T13:15:00.000-05:00',
            arrivalDateTime: '2016-04-27T14:05:00.000-05:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'AUS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3246'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3246'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'AUS'
              }
            ],
            wifiAvailable: null,
            segmentId: '201604271315-0500,201604271405-0500|DAL-AUS|WN3246'
          },
          {
            departureDateTime: '2016-04-27T15:00:00.000-05:00',
            arrivalDateTime: '2016-04-27T16:30:00.000-05:00',
            originationAirportCode: 'AUS',
            destinationAirportCode: 'CUN',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '4653'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '4653'
            },
            legs: [
              {
                originationAirportCode: 'AUS',
                destinationAirportCode: 'CUN'
              }
            ],
            wifiAvailable: null,
            segmentId: '201604271500-0500,201604271630-0500|AUS-CUN|WN4653'
          }
        ],
        durationMinutes: 195,
        originationDestinationId: '201604271315-0500,201604271630-0500|DAL-AUS,AUS-CUN|WN3246,WN4653',
        checkinDocumentReason: 'passengerSecureFlightStatusClear',
        checkinDocumentType: 'cleared',
        earlyBirdPurchased: false,
        warnings: [
          {
            code: 503500157,
            message:
              'Sorry! Flight Status is currently unavailable. Please try again in a few minutes. for segment index 0',
            httpStatusCode: 'SERVICE_UNAVAILABLE',
            requestId: '-Esr2QgSSw6y42R5m7rZTQ-API'
          },
          {
            code: 503500157,
            message:
              'Sorry! Flight Status is currently unavailable. Please try again in a few minutes. for segment index 1',
            httpStatusCode: 'SERVICE_UNAVAILABLE',
            requestId: '-Esr2QgSSw6y42R5m7rZTQ-API'
          }
        ],
        fareType: 'Wanna Get Away',
        _links: {
          checkin: null
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-04-30T12:00:00.000-05:00',
            arrivalDateTime: '2016-04-30T13:30:00.000-05:00',
            originationAirportCode: 'CUN',
            destinationAirportCode: 'AUS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '4916'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '4916'
            },
            legs: [
              {
                originationAirportCode: 'CUN',
                destinationAirportCode: 'AUS'
              }
            ],
            wifiAvailable: null,
            segmentId: '201604301200-0500,201604301330-0500|CUN-AUS|WN4916'
          },
          {
            departureDateTime: '2016-04-30T15:15:00.000-05:00',
            arrivalDateTime: '2016-04-30T16:10:00.000-05:00',
            originationAirportCode: 'AUS',
            destinationAirportCode: 'DAL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1513'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1513'
            },
            legs: [
              {
                originationAirportCode: 'AUS',
                destinationAirportCode: 'DAL'
              }
            ],
            wifiAvailable: null,
            segmentId: '201604301515-0500,201604301610-0500|AUS-DAL|WN1513'
          }
        ],
        durationMinutes: 250,
        originationDestinationId: '201604301200-0500,201604301610-0500|CUN-AUS,AUS-DAL|WN4916,WN1513',
        checkinDocumentReason: 'beforeCheckinWindowTime',
        checkinDocumentType: 'outsideCheckinTimeWindow',
        earlyBirdPurchased: false,
        fareType: 'Wanna Get Away',
        _links: {
          checkin: null
        }
      }
    ]
  },
  currencyType: 'Dollars',
  international: true,
  warnings: [],
  unaccompaniedMinor: false,
  _links: {
    retrieveForCancel: null,
    retrieveForChange: null,
    retrieveForBuyEarlyBird: null,
    companionReservations: null
  }
};
