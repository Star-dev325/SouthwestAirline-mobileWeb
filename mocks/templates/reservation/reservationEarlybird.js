module.exports = function reservationEarlyBirdTemplates(recordLocator, firstName, lastName) {
  return {
    recordLocator,
    owningReservationSystem: 'SAAS',
    passengers: [
      {
        secureFlightName: {
          firstName,
          lastName,
          middleName: '',
          suffix: ''
        },
        birthDate: '1933-12-04',
        gender: 'F',
        accountNumber: '',
        redressNumber: '',
        knownTravelerId: '',
        tier: 'NON_ELITE',
        loyaltyAccountType: 'NON_RAPID_REWARDS_MEMBER',
        earlyBirdEligibilities: [
          {
            earlyBirdProductId: 'REFMfDIwMTYtMTAtMjJ8MTA2NHxBTkRSRVd8fFRFUlJJU3x8MTUwMA==',
            status: 'ELIGIBLE',
            priceCents: 1500,
            originationDestinationId: '201610220805-0500,201610220900-0500|DAL-AUS|WN1064'
          }
        ]
      }
    ],
    itinerary: {
      originationDestinations: [
        {
          segments: [
            {
              departureDateTime: '2016-10-22T08:05:00.000-05:00',
              arrivalDateTime: '2016-10-22T09:00:00.000-05:00',
              originationAirportCode: 'DAL',
              destinationAirportCode: 'AUS',
              operatingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '1064'
              },
              marketingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '1064'
              },
              legs: [
                {
                  originationAirportCode: 'DAL',
                  destinationAirportCode: 'AUS'
                }
              ],
              wifiAvailable: null
            }
          ],
          durationMinutes: 55,
          originationDestinationId: '201610220805-0500,201610220900-0500|DAL-AUS|WN1064',
          checkinDocumentReason: null,
          checkinDocumentType: null,
          fareType: 'Anytime',
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
};
