module.exports = {
  viewEarlyBirdReservationPage: {
    recordLocator: 'NALVRY',
    receiptEmail: 'X12920@WNCO.COM',
    dates: {
      first: '2018-06-25',
      second: '2018-06-30'
    },
    destinationDescription: 'Austin',
    earlyBirdBounds: [
      {
        boundType: 'DEPARTING',
        flight: '461/1125',
        departureDate: '2018-06-25',
        departureTime: '06:00',
        departureAirportCode: 'DAL',
        arrivalTime: '09:10',
        arrivalAirportCode: 'AUS',
        earlyBirdBoundPrice: {
          amount: '15.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        passengers: [
          {
            name: 'HARRY POTTER',
            accountNumber: '601534942',
            canPurchaseEarlyBird: false,
            decisionDescription: 'A-List',
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fElMQTBQTlJPLEksREFMLEhPVSwyMDE4LTA2LTI1VDA2OjAwLTA1OjAwLDIwMTgtMDYtMjVUMDc6MDUtMDU6MDAsV04sV04sMTYyOCw3M1d8SUxBMFBOUk8sSSxIT1UsQVVTLDIwMTgtMDYtMjVUMDg6MjAtMDU6MDAsMjAxOC0wNi0yNVQwOToxMC0wNTowMCxXTixXTiwxOTQzLDczVyJ9'
            }
          },
          {
            name: 'TET TEST',
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fElMQTBQTlJPLEksREFMLEhPVSwyMDE4LTA2LTI1VDA2OjAwLTA1OjAwLDIwMTgtMDYtMjVUMDc6MDUtMDU6MDAsV04sV04sMTYyOCw3M1d8SUxBMFBOUk8sSSxIT1UsQVVTLDIwMTgtMDYtMjVUMDg6MjAtMDU6MDAsMjAxOC0wNi0yNVQwOToxMC0wNTowMCxXTixXTiwxOTQzLDczVyIsImZhcmUiOnsiYmFzZUZhcmUiOnsidmFsdWUiOiIxNS4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ0b3RhbFRheGVzQW5kRmVlcyI6eyJ2YWx1ZSI6IjAuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwidG90YWxGYXJlIjp7InZhbHVlIjoiMTUuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCJ9LCJwYXNzZW5nZXJSZWZlcmVuY2UiOiIzIiwic2VnbWVudFJlZmVyZW5jZXMiOlsiMSIsIjIiXSwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxMSJ9'
            }
          }
        ],
        isNextDayArrival: false
      },
      {
        boundType: 'RETURNING',
        flight: '461/1125',
        departureDate: '2018-06-30',
        departureTime: '06:05',
        departureAirportCode: 'AUS',
        arrivalTime: '07:00',
        arrivalAirportCode: 'DAL',
        earlyBirdBoundPrice: {
          amount: '12.50',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        passengers: [
          {
            name: 'HARRY POTTER',
            accountNumber: '601534942',
            canPurchaseEarlyBird: false,
            decisionDescription: 'A-List',
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fEpMTlZQTlIsSixBVVMsREFMLDIwMTgtMDYtMzBUMDY6MDUtMDU6MDAsMjAxOC0wNi0zMFQwNzowMC0wNTowMCxXTixXTiwyNzIzLDczVyJ9'
            }
          },
          {
            name: 'TET TEST',
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fEpMTlZQTlIsSixBVVMsREFMLDIwMTgtMDYtMzBUMDY6MDUtMDU6MDAsMjAxOC0wNi0zMFQwNzowMC0wNTowMCxXTixXTiwyNzIzLDczVyIsImZhcmUiOnsiYmFzZUZhcmUiOnsidmFsdWUiOiIxNS4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ0b3RhbFRheGVzQW5kRmVlcyI6eyJ2YWx1ZSI6IjAuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwidG90YWxGYXJlIjp7InZhbHVlIjoiMTUuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCJ9LCJwYXNzZW5nZXJSZWZlcmVuY2UiOiIzIiwic2VnbWVudFJlZmVyZW5jZXMiOlsiMyJdLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjEzIn0='
            }
          }
        ],
        isNextDayArrival: false
      }
    ],
    earlyBirdAnalytics: {
      recordLocator: 'NALVRY',
      tripType: 'roundTrip',
      lengthOfStay: '4',
      bookingCurve: '18',
      outboundEligiblePassengerCount: 1,
      outboundDate: '2018-06-25',
      outboundPrice: '15.00',
      outboundCityPair: 'DALAUS',
      outboundFareType: 'WGA',
      inboundEligiblePassengerCount: 1,
      inboundDate: '2018-06-30',
      inboundPrice: '15.00',
      inboundCityPair: 'AUSDAL',
      inboundFareType: 'WGA',
      sourceOfSale: 'MOBILE'
    },
    _links: {
      earlyBirdConfirmationPage: {
        href: '/v1/mobile-air-booking/page/early-bird/NALVRY',
        xhref: '/v1/mobile-air-booking/page/x-early-bird/NALVRY',
        method: 'POST',
        body: {
          firstName: 'Wen',
          lastName: 'Li',
          receiptEmail: 'ATERRIS@EXAMPLE.COM',
          recordLocator: 'NALVRY'
        }
      }
    }
  }
};
