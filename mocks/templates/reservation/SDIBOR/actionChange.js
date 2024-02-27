module.exports = {
  recordLocator: 'SDIBOR',
  owningReservationSystem: 'SAAS',
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
      tier: 'NON_ELITE',
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER'
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
            wifiAvailable: null
          }
        ],
        durationMinutes: 115,
        originationDestinationId: '201607092000-0600,201607092255-0500|DEN-DAL|WN2526',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
        soda: {
          sodaAffected: false,
          eligibleStartDate: '2016-07-09',
          eligibleEndDate: '2016-07-26',
          alternateOriginationAirportCodes: ['SLC'],
          alternateDestinationAirportCodes: []
        },
        _links: {
          deleteBoardingPass: null
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
            wifiAvailable: null
          }
        ],
        durationMinutes: 120,
        originationDestinationId: '201607121235-0500,201607121335-0600|DAL-DEN|WN3173',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
        soda: {
          sodaAffected: true,
          eligibleStartDate: '2016-07-09',
          eligibleEndDate: '2016-07-26',
          alternateOriginationAirportCodes: [],
          alternateDestinationAirportCodes: ['SLC']
        },
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  receiptEmail: 'SDF@SFESF.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false
};
