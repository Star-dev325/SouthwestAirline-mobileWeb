module.exports = {
  recordLocator: 'CHFRPU',
  owningReservationSystem: 'SAAS',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
        middleName: '',
        suffix: ''
      },
      birthDate: '1966-06-05',
      gender: 'M',
      accountNumber: '00008349157375',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'A_LIST_PREFERRED',
      loyaltyAccountType: 'RAPID_REWARDS_MEMBER'
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-07-01T05:15:00.000-04:00',
            arrivalDateTime: '2016-07-01T06:55:00.000-05:00',
            originationAirportCode: 'BOS',
            destinationAirportCode: 'MDW',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1196'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1196'
            },
            legs: [
              {
                originationAirportCode: 'BOS',
                destinationAirportCode: 'MDW'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 160,
        originationDestinationId: '201607010515-0400,201607010655-0500|BOS-MDW|WN1196',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
        _links: {
          deleteBoardingPass: null
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-07-15T05:20:00.000-05:00',
            arrivalDateTime: '2016-07-15T08:30:00.000-04:00',
            originationAirportCode: 'MDW',
            destinationAirportCode: 'BOS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2936'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2936'
            },
            legs: [
              {
                originationAirportCode: 'CHI',
                destinationAirportCode: 'BOS'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 130,
        originationDestinationId: '201607150520-0500,201607150830-0400|MDW-BOS|WN2936',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  receiptEmail: 'TEST@WNCO.COM',
  currencyType: 'Points',
  international: false,
  warnings: [],
  unaccompaniedMinor: false,
  purchaserInfo: {
    accountNumber: '8349157375'
  }
};
