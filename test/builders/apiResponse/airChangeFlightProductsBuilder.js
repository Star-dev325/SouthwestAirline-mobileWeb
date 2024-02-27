class AirChangeFlightProductsBuilder {
  constructor() {
    this.trips = [{
      travelDate: '2017-10-20',
      originationAirportCode: 'BNA',
      destinationAirportCode: 'DAL',
      lowestFareProduct: {
        fareType: 'Anytime',
        cents: 36598,
        points: 0
      },
      airProducts: [
        {
          durationMinutes: 220,
          segments: [
            {
              originationAirportCode: 'BNA',
              destinationAirportCode: 'HOU',
              marketingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '1743'
              },
              operatingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '1743'
              },
              departureDateTime: '2017-10-20T05:20',
              arrivalDateTime: '2017-10-20T07:25',
              numberOfStops: 0,
              stopAirportCodes: [],
              wifiAvailable: true
            },
            {
              originationAirportCode: 'HOU',
              destinationAirportCode: 'DAL',
              marketingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '8'
              },
              operatingCarrierInfo: {
                carrierCode: 'WN',
                flightNumber: '8'
              },
              departureDateTime: '2017-10-20T08:00',
              arrivalDateTime: '2017-10-20T09:00',
              numberOfStops: 0,
              stopAirportCodes: [],
              wifiAvailable: true
            }
          ],
          fareProducts: [
            {
              productId: 'S1pCUC9LWkJQfEFtZXJpY2EvQ2hpY2Fnb3wyMDE3MTAyMDA1MjAsMjAxNzEwMjAwOTAwfEJOQS1IT1UsSE9VLURBTHxXTjE3NDMsV044fEt8MzkwNTh8MzkwNTh8MTYwMHxBRFR8MXxXTjE3NDNCTkFIT1UyMDE3MTAyMC1XTjhIT1VEQUwyMDE3MTAyMHx8NzNXLDczVw==',
              fareType: 'Business Select',
              seatsAvailable: '8',
              unavailabilityReason: 'NONE',
              bookingCode: 'K',
              fareBasisCode: 'KZBP/KZBP',
              paxPricingType: 'ADT',
              currencyPrice: {
                totalFareCents: 39058,
                discountedTotalFareCents: 39058,
                accrualPoints: 4106
              }
            },
            {
              productId: 'WUwvWUx8QW1lcmljYS9DaGljYWdvfDIwMTcxMDIwMDUyMCwyMDE3MTAyMDA5MDB8Qk5BLUhPVSxIT1UtREFMfFdOMTc0MyxXTjh8WXwzNzQ1OHwzNzQ1OHwwfEFEVHwxfFdOMTc0M0JOQUhPVTIwMTcxMDIwLVdOOEhPVURBTDIwMTcxMDIwfHw3M1csNzNX',
              fareType: 'Anytime',
              seatsAvailable: '9',
              unavailabilityReason: 'NONE',
              bookingCode: 'Y',
              fareBasisCode: 'YL/YL',
              paxPricingType: 'ADT',
              currencyPrice: {
                totalFareCents: 37458,
                discountedTotalFareCents: 37458,
                accrualPoints: 3273
              }
            }
          ]
        }
      ]
    }];
  }

  build() {
    return {
      trips: this.trips,
      discountApplied: false,
      promoCodeApplied: false,
      promoCode: '',
      warnings: []
    };
  }
}

module.exports = AirChangeFlightProductsBuilder;
