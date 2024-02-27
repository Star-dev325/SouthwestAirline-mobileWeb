module.exports = {
  recordLocator: '9N2BMM',
  owningReservationSystem: 'SAAS',
  passengers: [
    {
      secureFlightName: {
        firstName: 'ANDREW',
        lastName: 'CLAW',
        middleName: '',
        suffix: ''
      },
      birthDate: '1970-09-28',
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
            departureDateTime: '2016-10-06T06:00:00.000-04:00',
            arrivalDateTime: '2016-10-06T08:55:00.000-04:00',
            originationAirportCode: 'BOS',
            destinationAirportCode: 'ATL',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3050'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '3050'
            },
            legs: [
              {
                originationAirportCode: 'BOS',
                destinationAirportCode: 'ATL'
              }
            ],
            wifiAvailable: null
          },
          {
            departureDateTime: '2016-10-06T09:55:00.000-04:00',
            arrivalDateTime: '2016-10-06T11:20:00.000-05:00',
            originationAirportCode: 'ATL',
            destinationAirportCode: 'AUS',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '312'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '312'
            },
            legs: [
              {
                originationAirportCode: 'ATL',
                destinationAirportCode: 'AUS'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 380,
        originationDestinationId: '201610060600-0400,201610061120-0500|BOS-ATL,ATL-AUS|WN3050,WN312',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
        soda: {
          sodaAffected: true,
          eligibleStartDate: '2016-10-04',
          eligibleEndDate: '2016-10-20',
          alternateOriginationAirportCodes: ['PVD', 'MHT'],
          alternateDestinationAirportCodes: []
        },
        _links: {
          deleteBoardingPass: null
        }
      }
    ]
  },
  receiptEmail: 'ATERRIS@EXAMPLE.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false
};
