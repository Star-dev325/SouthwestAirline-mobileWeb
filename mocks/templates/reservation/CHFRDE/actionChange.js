module.exports = {
  recordLocator: 'CHFRDE',
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
            departureDateTime: '2016-05-30T20:25:00.000-07:00',
            arrivalDateTime: '2016-05-30T21:25:00.000-07:00',
            originationAirportCode: 'LAS',
            destinationAirportCode: 'LAX',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2717'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2717'
            },
            legs: [
              {
                originationAirportCode: 'LAS',
                destinationAirportCode: 'LAX'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 60,
        originationDestinationId: '201605302025-0700,201605302125-0700|LAS-LAX|WN2717',
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
            departureDateTime: '2016-05-31T12:20:00.000-07:00',
            arrivalDateTime: '2016-05-31T13:25:00.000-07:00',
            originationAirportCode: 'LAX',
            destinationAirportCode: 'LAS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2989'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '2989'
            },
            legs: [
              {
                originationAirportCode: 'LAX',
                destinationAirportCode: 'LAS'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 65,
        originationDestinationId: '201605311220-0700,201605311325-0700|LAX-LAS|WN2989',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
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
