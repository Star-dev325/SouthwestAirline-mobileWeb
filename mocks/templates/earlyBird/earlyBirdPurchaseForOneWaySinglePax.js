module.exports = {
  earlyBirdConfirmationPage: {
    recordLocator: 'ABC123',
    earlyBirdPurchaseBounds: [
      {
        bound: {
          boundType: 'DEPARTING',
          flights: [
            {
              number: '123',
              wifiOnBoard: false
            },
            {
              number: '456',
              wifiOnBoard: true
            }
          ],
          travelTime: '2h 40m',
          departureDate: '2017-05-20',
          departureTime: '20:20',
          departureAirport: {
            code: 'DAL',
            name: 'Dallas (Love Field)',
            state: 'TX',
            country: null
          },
          stops: [
            {
              airport: {
                name: 'Nashville',
                code: 'BNA',
                state: 'TN',
                country: null
              },
              arrivalTime: null,
              changePlanes: false
            },
            {
              airport: {
                name: 'Chicago (Midway)',
                code: 'MDW',
                state: 'TX',
                country: null
              },
              arrivalTime: '11:50',
              departureTime: '15:50',
              changePlanes: true
            }
          ],
          arrivalTime: '22:25',
          arrivalAirport: {
            code: 'ATL',
            name: 'Atlanta',
            state: 'GA',
            country: null
          },
          isNextDayArrival: false,
          earlyBirdBoundPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          earlyBirdSubTotalPrice: {
            amount: '15.00',
            currencyCode: 'US',
            currencySymbol: '$'
          },
          passengers: [
            {
              name: 'Kevin Thompson'
            }
          ]
        }
      }
    ],
    earlyBirdTotalPrice: {
      amount: '45.00',
      currencyCode: 'US',
      currencySymbol: '$'
    },
    billingInfo: {
      cardType: 'VISA',
      lastFourDigits: '0002',
      cardHolderName: 'Kevin Thompson',
      amountApplied: {
        amount: '45.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      billingAddress: {
        streetOne: '100 Main Street',
        streetTwo: '',
        location: 'Dallas, TX US 75325'
      }
    },
    earlyBirdAnalytics: {
      recordLocator: 'ABC123',
      tripType: 'roundTrip',
      lengthOfStay: '2',
      bookingCurve: '31',
      outboundDate: '2018-05-19',
      outboundPrice: '15.00',
      outboundCityPair: 'DALMSP',
      outboundFareType: 'WGA',
      inboundDate: '2018-05-21',
      inboundPrice: '15.00',
      inboundCityPair: 'MSPDAL',
      inboundFareType: 'WGA',
      sourceOfSale: 'swabiz',
      numberOfPaxPurchased: '3',
      totalAmount: '45.00'
    }
  }
};
