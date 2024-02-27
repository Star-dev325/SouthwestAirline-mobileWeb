module.exports = {
  recordLocator: '5TDH6O',
  owningReservationSystem: 'ALTEA',
  passengers: [
    {
      secureFlightName: {
        firstName: 'TANG',
        lastName: 'ZHEN',
        middleName: '',
        suffix: ''
      },
      birthDate: '2002-04-07',
      gender: 'F',
      accountNumber: '',
      redressNumber: '',
      knownTravelerId: '',
      tier: 'NON_ELITE',
      loyaltyAccountType: 'UNKNOWN'
    }
  ],
  itinerary: {
    originationDestinations: [
      {
        segments: [
          {
            departureDateTime: '2016-11-02T06:40:00.000-05:00',
            arrivalDateTime: '2016-11-02T07:10:00.000-07:00',
            originationAirportCode: 'DAL',
            destinationAirportCode: 'PHX',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1157'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '1157'
            },
            legs: [
              {
                originationAirportCode: 'DAL',
                destinationAirportCode: 'PHX'
              }
            ],
            wifiAvailable: null
          },
          {
            departureDateTime: '2016-11-02T08:10:00.000-07:00',
            arrivalDateTime: '2016-11-02T10:25:00.000-06:00',
            originationAirportCode: 'PHX',
            destinationAirportCode: 'ABQ',
            operatingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '322'
            },
            marketingCarrierInfo: {
              carrierCode: 'WN',
              flightNumber: '322'
            },
            legs: [
              {
                originationAirportCode: 'PHX',
                destinationAirportCode: 'ABQ'
              }
            ],
            wifiAvailable: null
          }
        ],
        durationMinutes: 285,
        originationDestinationId: '201611020640-0500,201611021025-0600|DAL-PHX,PHX-ABQ|WN1157,WN322',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Business Select',
        soda: {
          sodaAffected: true,
          eligibleStartDate: '2016-10-19',
          eligibleEndDate: '2016-11-16',
          alternateOriginationAirportCodes: [],
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
