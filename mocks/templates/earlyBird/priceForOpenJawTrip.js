module.exports = {
  viewEarlyBirdReservationPage: {
    recordLocator: 'KUO3NN',
    receiptEmail: 'ATERRIS@EXAMPLE.COM',
    dates: {
      first: '2018-10-24',
      second: '2018-10-26'
    },
    destinationDescription: 'Dallas (Love Field)',
    earlyBirdBounds: [
      {
        boundType: 'DEPARTING',
        flight: '2491',
        departureDate: '2018-10-24',
        departureTime: '06:05',
        departureAirportCode: 'ATL',
        arrivalTime: '07:50',
        arrivalAirportCode: 'BWI',
        earlyBirdBoundPrice: {
          amount: '20.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        passengers: [
          {
            name: 'Tang Liu',
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fFJMTjdQTlIsUixBVEwsQldJLDIwMTgtMTAtMjRUMDY6MDUtMDQ6MDAsMjAxOC0xMC0yNFQwNzo1MC0wNDowMCxXTixXTiwyNDkxLDczVyIsImZhcmUiOnsiYmFzZUZhcmUiOnsidmFsdWUiOiIyMC4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ0b3RhbFRheGVzQW5kRmVlcyI6eyJ2YWx1ZSI6IjAuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwidG90YWxGYXJlIjp7InZhbHVlIjoiMjAuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCJ9LCJwYXNzZW5nZXJSZWZlcmVuY2UiOiIyIiwic2VnbWVudFJlZmVyZW5jZXMiOlsiMSJdLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEwIn0='
            }
          }
        ],
        isNextDayArrival: false
      },
      {
        boundType: 'DEPARTING',
        flight: '2422',
        departureDate: '2018-10-26',
        departureTime: '06:15',
        departureAirportCode: 'BWI',
        arrivalTime: '08:30',
        arrivalAirportCode: 'DAL',
        earlyBirdBoundPrice: {
          amount: '25.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        passengers: [
          {
            name: 'Tang Liu',
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fFpMTjNUTkYsWixCV0ksREFMLDIwMTgtMTAtMjZUMDY6MTUtMDQ6MDAsMjAxOC0xMC0yNlQwODozMC0wNTowMCxXTixXTiwyNDIyLDczVyIsImZhcmUiOnsiYmFzZUZhcmUiOnsidmFsdWUiOiIyNS4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ0b3RhbFRheGVzQW5kRmVlcyI6eyJ2YWx1ZSI6IjAuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwidG90YWxGYXJlIjp7InZhbHVlIjoiMjUuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCJ9LCJwYXNzZW5nZXJSZWZlcmVuY2UiOiIyIiwic2VnbWVudFJlZmVyZW5jZXMiOlsiNCJdLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjExIn0='
            }
          }
        ],
        isNextDayArrival: false
      }
    ],
    earlyBirdAnalytics: {
      recordLocator: 'KUO3NN',
      tripType: 'roundTrip',
      lengthOfStay: '1',
      bookingCurve: '7',
      outboundEligiblePassengerCount: 1,
      outboundDate: '2018-10-24',
      outboundPrice: '20.00',
      outboundCityPair: 'ATLBWI',
      outboundFareType: 'WGA',
      inboundEligiblePassengerCount: 1,
      inboundDate: '2018-10-26',
      inboundPrice: '25.00',
      inboundCityPair: 'BWIDAL',
      inboundFareType: 'WGA',
      sourceOfSale: 'MOBILE'
    },
    _links: {
      earlyBirdConfirmationPage: {
        href: '/v1/mobile-air-booking/page/early-bird/KUO3NN',
        method: 'POST',
        xhref: '/v1/mobile-air-booking/page/x-early-bird/KUO3NN',
        body: {
          firstName: 't',
          lastName: 'liu',
          receiptEmail: 'ATERRIS@EXAMPLE.COM',
          recordLocator: 'KUO3NN'
        }
      }
    }
  }
};
