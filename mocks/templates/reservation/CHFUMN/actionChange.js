module.exports = {
  recordLocator: 'CHFUMN',
  owningReservationSystem: 'SAAS',
  passengers: [
    {
      secureFlightName: {
        firstName: 'UNACC',
        lastName: 'MINOR',
        middleName: '',
        suffix: ''
      },
      birthDate: '2008-04-06',
      gender: 'F',
      accountNumber: '00026135157370',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'NON_ELITE',
      loyaltyAccountType: 'RAPID_REWARDS_MEMBER'
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-06-27T05:55:00.000-07:00',
            arrivalDateTime: '2016-06-27T06:55:00.000-07:00',
            originationAirportCode: 'LAS',
            destinationAirportCode: 'LAX',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1163'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1163'
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
        originationDestinationId: '201606270555-0700,201606270655-0700|LAS-LAX|WN1163',
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
            departureDateTime: '2016-07-05T05:35:00.000-07:00',
            arrivalDateTime: '2016-07-05T06:45:00.000-07:00',
            originationAirportCode: 'LAX',
            destinationAirportCode: 'LAS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3506'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3506'
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
        durationMinutes: 70,
        originationDestinationId: '201607050535-0700,201607050645-0700|LAX-LAS|WN3506',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  receiptEmail: 'AAA@AAA.AAA',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: true
};
