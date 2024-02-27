module.exports = {
  recordLocator: 'CHFRDF',
  owningReservationSystem: 'SAAS',
  passengers: [
    {
      secureFlightName: {
        firstName: 'AMBER',
        lastName: 'AWESOME',
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
            departureDateTime: '2016-06-10T14:05:00.000-05:00',
            arrivalDateTime: '2016-06-10T15:00:00.000-05:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'OKC',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '26'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '26'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'OKC'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 55,
        originationDestinationId: '201606101405-0500,201606101500-0500|DAL-OKC|WN26',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
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
