module.exports = {
  recordLocator: 'CHFOUF',
  owningReservationSystem: 'SAAS',
  passengers: [
    {
      secureFlightName: { firstName: 'ROBERT', lastName: 'MICHAEL', middleName: '', suffix: '' },
      birthDate: '2002-04-28',
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
            departureDateTime: '2017-01-18T09:00:00.000-08:00',
            arrivalDateTime: '2017-01-18T10:00:00.000-08:00',
            originationAirportCode: 'LAS',
            destinationAirportCode: 'SNA',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '1724' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '1724' },
            legs: [{ originationAirportCode: 'LAS', destinationAirportCode: 'SNA' }],
            wifiAvailable: null
          }
        ],
        durationMinutes: 60,
        originationDestinationId: '201701180900-0800,201701181000-0800|LAS-SNA|WN1724',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Business Select',
        _links: { deleteBoardingPass: null }
      },
      {
        segments: [
          {
            departureDateTime: '2017-03-10T12:05:00.000-08:00',
            arrivalDateTime: '2017-03-10T13:05:00.000-08:00',
            originationAirportCode: 'SNA',
            destinationAirportCode: 'LAS',
            operatingCarrierInfo: { carrierCode: 'WN', flightNumber: '4644' },
            marketingCarrierInfo: { carrierCode: 'WN', flightNumber: '4644' },
            legs: [{ originationAirportCode: 'SNA', destinationAirportCode: 'LAS' }],
            wifiAvailable: null
          }
        ],
        durationMinutes: 60,
        originationDestinationId: '201703101205-0800,201703101305-0800|SNA-LAS|WN4644',
        checkinDocumentReason: null,
        checkinDocumentType: null,
        fareType: 'Business Select',
        _links: { deleteBoardingPass: null }
      }
    ]
  },
  receiptEmail: 'X226298@WNCO.COM',
  currencyType: 'Dollars',
  international: false,
  warnings: [],
  unaccompaniedMinor: false
};
