module.exports = {
  recordLocator: 'CHFCHK',
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
            departureDateTime: '2017-05-17T05:30:00.000-07:00',
            arrivalDateTime: '2017-05-17T06:35:00.000-07:00',
            originationAirportCode: 'LAS',
            destinationAirportCode: 'LAX',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3900'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3900'
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
        durationMinutes: 65,
        originationDestinationId: '201605170530-0700,201605170635-0700|LAS-LAX|WN3900',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
        _links: {
          deleteBoardingPass: {
            href: '/v1/air-travel/reservations/record-locator/CHFCHK/boarding-passes?first-name=XN&last-name=LIU&origination-destination-id[]=201605170530-0700,201605170635-0700|LAS-LAX|WN3900'
          }
        }
      },
      {
        segments: [
          {
            departureDateTime: '2016-05-20T07:20:00.000-07:00',
            arrivalDateTime: '2016-05-20T08:25:00.000-07:00',
            originationAirportCode: 'LAX',
            destinationAirportCode: 'LAS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3704'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3704'
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
        originationDestinationId: '201605200720-0700,201605200825-0700|LAX-LAS|WN3704',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
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
