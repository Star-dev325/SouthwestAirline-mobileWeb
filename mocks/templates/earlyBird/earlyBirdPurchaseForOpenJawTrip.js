module.exports = {
  earlyBirdConfirmationPage: {
    recordLocator: 'KUO3NN',
    earlyBirdPurchaseBounds: [
      {
        bound: {
          boundType: 'DEPARTING',
          flights: [
            {
              number: '2491',
              wifiOnBoard: true
            }
          ],
          travelTime: '1h 45m',
          departureDate: '2018-10-24',
          departureTime: '06:05',
          departureAirport: {
            name: 'Atlanta',
            state: 'GA',
            code: 'ATL',
            country: null
          },
          stops: [],
          arrivalTime: '07:50',
          arrivalAirport: {
            name: 'Baltimore/Washington',
            state: 'MD',
            code: 'BWI',
            country: null
          },
          earlyBirdBoundPrice: {
            amount: '20.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '20.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          passengers: [
            {
              name: 'Tang Liu'
            }
          ],
          isNextDayArrival: false
        }
      },
      {
        bound: {
          boundType: 'DEPARTING',
          flights: [
            {
              number: '2422',
              wifiOnBoard: true
            }
          ],
          travelTime: '3h 15m',
          departureDate: '2018-10-26',
          departureTime: '06:15',
          departureAirport: {
            name: 'Baltimore/Washington',
            state: 'MD',
            code: 'BWI',
            country: null
          },
          stops: [],
          arrivalTime: '08:30',
          arrivalAirport: {
            name: 'Dallas (Love Field)',
            state: 'TX',
            code: 'DAL',
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
              name: 'Tang Liu'
            }
          ],
          isNextDayArrival: false
        }
      }
    ],
    earlyBirdTotalPrice: {
      amount: '45.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '9999',
      cardHolderName: 'Li Rui',
      amountApplied: {
        amount: '45.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '677 Main St',
        streetTwo: null,
        location: 'Brooklyn, NY US 53605'
      }
    },
    earlyBirdPurchaseAnalytics: {
      recordLocator: 'KUO3NN',
      tripType: 'roundTrip',
      lengthOfStay: '2',
      bookingCurve: null,
      outboundDate: '2018-10-24',
      outboundPrice: '20.00',
      outboundCityPair: 'ATLBWI',
      outboundFareType: 'WGA',
      inboundDate: '2018-10-26',
      inboundPrice: '25.00',
      inboundCityPair: 'BWIDAL',
      inboundFareType: 'WGA',
      sourceOfSale: 'MOBILE',
      numberOfPaxPurchased: 2,
      totalAmount: '45.00'
    }
  }
};
