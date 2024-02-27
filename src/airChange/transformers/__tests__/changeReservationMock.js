export default {
  recordLocator: 'HYHODU',
  passengers: [
    {
      secureFlightName: { firstName: 'XIANNING', lastName: 'LIU', middleName: '', suffix: '' },
      birthDate: '1948-02-03',
      gender: 'M',
      accountNumber: '00021840157371',
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
            departureDateTime: '2016-03-01T13:15:00.000-08:00',
            arrivalDateTime: '2016-03-01T21:05:00.000-05:00',
            originationAirportCode: 'SAN',
            destinationAirportCode: 'BWI',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '2066' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '2066' },
            legs: [{ originationAirportCode: 'SAN', destinationAirportCode: 'BWI' }],
            wifiAvailable: null
          },
          {
            departureDateTime: '2016-03-01T22:15:00.000-05:00',
            arrivalDateTime: '2016-03-01T23:35:00.000-05:00',
            originationAirportCode: 'BWI',
            destinationAirportCode: 'BOS',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '2459' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '2459' },
            legs: [{ originationAirportCode: 'BWI', destinationAirportCode: 'BOS' }],
            wifiAvailable: null
          }
        ],
        durationMinutes: 440,
        originationDestinationId: '201603011315-0800,201603012335-0500|SAN-BWI,BWI-BOS|WN2066,WN2459',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Anytime',
        _links: { deleteBoardingPass: null }
      },
      {
        segments: [
          {
            departureDateTime: '2016-03-04T13:25:00.000-05:00',
            arrivalDateTime: '2016-03-04T19:00:00.000-07:00',
            originationAirportCode: 'BOS',
            destinationAirportCode: 'PHX',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '575' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '575' },
            legs: [{ originationAirportCode: 'BOS', destinationAirportCode: 'PHX' }],
            wifiAvailable: null
          },
          {
            departureDateTime: '2016-03-04T20:00:00.000-07:00',
            arrivalDateTime: '2016-03-04T20:10:00.000-08:00',
            originationAirportCode: 'PHX',
            destinationAirportCode: 'SAN',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '1598' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '1598' },
            legs: [{ originationAirportCode: 'PHX', destinationAirportCode: 'SAN' }],
            wifiAvailable: null
          }
        ],
        durationMinutes: 585,
        originationDestinationId: '201603041325-0500,201603042010-0800|BOS-PHX,PHX-SAN|WN575,WN1598',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Wanna Get Away',
        _links: { deleteBoardingPass: null }
      }
    ]
  },
  receiptEmail: 'S@SB.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false
};
