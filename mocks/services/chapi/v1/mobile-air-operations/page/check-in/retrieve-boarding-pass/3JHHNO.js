module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/3JHHNO',
  method: 'POST',
  cache: false,
  template: () => ({
    checkInRetrieveBoardingPassPage: {
      mobileBoardingPassViewPage: {
        messages: null,
        mobileBoardingPassView: [
          {
            passenger: {
              name: {
                firstName: 'JOHN',
                lastName: 'DOE',
                middleName: null
              },
              accountNumber: '601330940',
              rrTier: 'NONE',
              rrTierDescription: '--',
              travelerId: '2301CE560000AF2E'
            },
            flightNumber: '212',
            travelerSegmentIdentifier: '2301DE560001A00B',
            originAirportCode: 'AUS',
            originAirportDescription: 'Austin, TX',
            destinationAirportCode: 'MCO',
            destinationAirportDescription: 'Orlando, FL',
            departureDate: '2020-10-28',
            confirmationNumber: '2IGGMN',
            boardingGroup: null,
            boardingPosition: null,
            fareType: 'Wanna Get Away',
            departureGate: null,
            boardingTime: '05:30',
            departureTime: '06:00',
            hasTsaPreCheck: false,
            hasExtraSeat: false,
            eligibleForDrinkCoupon: false,
            drinkCouponText: 'No',
            barcodeString:
              'M1DOE%2FJOHN+JR+++++++++E2IGGMN+AUSMCOWN+0212+302Y00010001+748%3E6180+M++++BWN++++++++++++++2A+++++++++++++0++++WN+601330940++++++++++++%5E460MEQCIF%2Bgak6rP1DuUPDZLEW6E3dBf6Z68uzcTB6HpZFfI%2BwrAiBJ3zLgNpuiATyPGqEOkJh0u0pB28qKUcB%2FbmdP5aXa8Q%3D%3D',
            adaptiveLink: 'https://wallet-api.urbanairship.com/v1/pass/adaptive/VzT6NSiqzE',
            boardingPassSSRs: null,
            documentType: 'SECURITY_DOCUMENT',
            isYoungTraveler: false,
            isInfant: false
          },
          {
            passenger: {
              name: {
                firstName: 'JOHN',
                lastName: 'DOE',
                middleName: null
              },
              accountNumber: '601330940',
              rrTier: 'NONE',
              rrTierDescription: '--',
              travelerId: '2301CE560000AF2E'
            },
            flightNumber: '234',
            travelerSegmentIdentifier: '2301DE560001A00C',
            originAirportCode: 'MCO',
            originAirportDescription: 'Orlando, FL',
            destinationAirportCode: 'ALB',
            destinationAirportDescription: 'Albany, NY',
            departureDate: '2020-10-28',
            confirmationNumber: '2IGGMN',
            boardingGroup: null,
            boardingPosition: null,
            fareType: 'Wanna Get Away',
            departureGate: null,
            boardingTime: '09:55',
            departureTime: '10:25',
            hasTsaPreCheck: false,
            hasExtraSeat: false,
            eligibleForDrinkCoupon: false,
            drinkCouponText: 'No',
            barcodeString:
              'M1DOE%2FJOHN+JR+++++++++E2IGGMN+MCOALBWN+0234+302Y00010001+748%3E6180+M++++BWN++++++++++++++2A+++++++++++++0++++WN+601330940++++++++++++%5E460MEUCIEsTY8LQj1emA4d0wHy72qpPHk9LWXjkXG99LkUGN8LOAiEAhkfzHCNf77seoltzdKlr5K9oamo0nawvPNJ1xM%2BTw14%3D',
            adaptiveLink: 'https://wallet-api.urbanairship.com/v1/pass/adaptive/BBA0c8FDZs',
            boardingPassSSRs: null,
            documentType: 'SECURITY_DOCUMENT',
            isYoungTraveler: false,
            isInfant: false
          }
        ]
      }
    }
  })
};
