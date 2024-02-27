const CheckInRetrieveBoardingPassBuilder = require("test/builders/apiResponse/v1/mobile-air-operations/page/check-in/checkInRetrieveBoardingPassBuilder");

module.exports = {
  path: '/chapi/v1/mobile-air-operations/page/check-in/retrieve-boarding-pass/2IGGMN',
  method: 'POST',
  cache: false,
  template: () => ({
    checkInRetrieveBoardingPassPage: {
      mobileBoardingPassViewPage: {
        messages: null,
        mobileBoardingPassView: [
          {
            adaptiveLink: 'https://wallet-api.urbanairship.com/v1/pass/adaptive/VzT6NSiqzE',
            barcodeString:
            'M1DOE%2FJOHN+JR+++++++++E2IGGMN+AUSMCOWN+0212+302Y00010001+748%3E6180+M++++BWN++++++++++++++2A+++++++++++++0++++WN+601330940++++++++++++%5E460MEQCIF%2Bgak6rP1DuUPDZLEW6E3dBf6Z68uzcTB6HpZFfI%2BwrAiBJ3zLgNpuiATyPGqEOkJh0u0pB28qKUcB%2FbmdP5aXa8Q%3D%3D',
            boardingGroup: null,
            boardingPassSSRs: null,
            boardingPosition: null,
            boardingTime: '05:30',
            confirmationNumber: '2IGGMN',
            departureDate: '2020-10-28',
            departureGate: null,
            departureTime: '06:00',
            destinationAirportCode: 'MCO',
            destinationAirportDescription: 'Orlando, FL',
            documentType: 'SECURITY_DOCUMENT',
            drinkCouponText: 'No',
            eligibleForDrinkCoupon: false,
            fareType: 'Non Revenue',
            flightNumber: '212',
            hasExtraSeat: false,
            hasTsaPreCheck: false,
            isInfant: false,
            isYoungTraveler: false,
            originAirportCode: 'AUS',
            originAirportDescription: 'Austin, TX',
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
            style: new CheckInRetrieveBoardingPassBuilder().getStyleObject('SECURITY DOCUMENT'),
            travelerSegmentIdentifier: '2301DE560001A00B'
          },
          {
            adaptiveLink: 'https://wallet-api.urbanairship.com/v1/pass/adaptive/BBA0c8FDZs',
            barcodeString:
            'M1DOE%2FJOHN+JR+++++++++E2IGGMN+MCOALBWN+0234+302Y00010001+748%3E6180+M++++BWN++++++++++++++2A+++++++++++++0++++WN+601330940++++++++++++%5E460MEUCIEsTY8LQj1emA4d0wHy72qpPHk9LWXjkXG99LkUGN8LOAiEAhkfzHCNf77seoltzdKlr5K9oamo0nawvPNJ1xM%2BTw14%3D',
            boardingGroup: null,
            boardingPassSSRs: null,
            boardingPosition: null,
            boardingTime: '09:55',
            confirmationNumber: '2IGGMN',
            departureDate: '2020-10-28',
            departureGate: null,
            departureTime: '10:25',
            destinationAirportCode: 'ALB',
            destinationAirportDescription: 'Albany, NY',
            documentType: 'SECURITY_DOCUMENT',
            drinkCouponText: 'No',
            eligibleForDrinkCoupon: false,
            fareType: 'Non Revenue',
            flightNumber: '234',
            hasExtraSeat: false,
            hasTsaPreCheck: false,
            isInfant: false,
            isYoungTraveler: false,
            originAirportCode: 'MCO',
            originAirportDescription: 'Orlando, FL',
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
            style: new CheckInRetrieveBoardingPassBuilder().getStyleObject('SECURITY DOCUMENT'),
            travelerSegmentIdentifier: '2301DE560001A00C'
          }
        ]
      }
    }
  })
};
