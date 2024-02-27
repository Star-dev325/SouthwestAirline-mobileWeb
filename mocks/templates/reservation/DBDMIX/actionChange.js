module.exports = {
  recordLocator: 'DBDMIX',
  owningReservationSystem: 'SAAS',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
        middleName: '',
        suffix: ''
      },
      birthDate: '1991-04-28',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'NON_ELITE',
      loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER'
    },
    {
      secureFlightName: {
        firstName: 'JANE',
        lastName: 'SMITH',
        middleName: '',
        suffix: ''
      },
      birthDate: '1991-04-28',
      gender: 'F',
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
            departureDateTime: '2016-08-25T18:10:00.000-05:00',
            arrivalDateTime: '2016-08-25T21:25:00.000-05:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'MDW',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '341'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '341'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'MDW'
              }
            ],
            wifiAvailable: null,
            stopCities: ['STL']
          }
        ],
        durationMinutes: 195,
        originationDestinationId: '201608251810-0500,201608252125-0500|DAL-MDW|WN341',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Business Select',
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  receiptEmail: 'TEST@TEST.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false
};
