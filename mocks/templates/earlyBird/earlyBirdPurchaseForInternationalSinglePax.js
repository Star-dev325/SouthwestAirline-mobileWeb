module.exports = {
  earlyBirdConfirmationPage: {
    recordLocator: 'KTZM9Q',
    earlyBirdPurchaseBounds: [
      {
        bound: {
          boundType: 'DEPARTING',
          flights: [
            {
              number: '2491',
              wifiOnBoard: true
            },
            {
              number: '1607',
              wifiOnBoard: true
            }
          ],
          travelTime: '6h 30m',
          departureDate: '2018-10-24',
          departureTime: '06:05',
          departureAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          stops: [
            {
              airport: {
                name: 'Baltimore/Washington',
                state: 'MD',
                code: 'BWI',
                country: null
              },
              arrivalTime: '07:50',
              departureTime: '08:45',
              changePlanes: true
            }
          ],
          arrivalTime: '11:35',
          arrivalAirport: {
            name: 'Cancun',
            state: null,
            code: 'CUN',
            country: 'Mexico'
          },
          earlyBirdBoundPrice: {
            amount: '25.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '25.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengers: [
            {
              name: 'Paul Liu'
            }
          ],
          isNextDayArrival: false
        }
      },
      {
        bound: {
          boundType: 'RETURNING',
          flights: [
            {
              number: '306',
              wifiOnBoard: true
            },
            {
              number: '2460',
              wifiOnBoard: true
            }
          ],
          travelTime: '7h 20m',
          departureDate: '2018-10-26',
          departureTime: '11:55',
          departureAirport: {
            name: 'Cancun',
            state: null,
            code: 'CUN',
            country: 'Mexico'
          },
          stops: [
            {
              airport: {
                name: 'Houston (Hobby)',
                state: 'TX',
                code: 'HOU',
                country: null
              },
              arrivalTime: '14:15',
              departureTime: '17:15',
              changePlanes: true
            }
          ],
          arrivalTime: '20:15',
          arrivalAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          earlyBirdBoundPrice: {
            amount: '25.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '25.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengers: [
            {
              name: 'Paul Liu'
            }
          ],
          isNextDayArrival: false
        }
      }
    ],
    earlyBirdTotalPrice: {
      amount: '50.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: {
        amount: '50.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '893 Main St',
        streetTwo: null,
        location: 'Brooklyn, NY US 24266'
      }
    },
    earlyBirdPurchaseAnalytics: {
      recordLocator: 'KTZM9Q',
      tripType: 'roundTrip',
      lengthOfStay: '2',
      bookingCurve: null,
      outboundDate: '2018-10-24',
      outboundPrice: '25.00',
      outboundCityPair: 'ATLCUN',
      outboundFareType: 'WGA',
      inboundDate: '2018-10-26',
      inboundPrice: '25.00',
      inboundCityPair: 'CUNATL',
      inboundFareType: 'WGA',
      sourceOfSale: 'MOBILE',
      numberOfPaxPurchased: 2,
      totalAmount: '50.00'
    }
  }
};
