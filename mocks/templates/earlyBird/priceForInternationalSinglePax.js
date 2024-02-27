module.exports = {
  viewEarlyBirdReservationPage: {
    recordLocator: 'KTZM9Q',
    receiptEmail: 'ATERRIS@EXAMPLE.COM',
    dates: {
      first: '2018-10-24',
      second: '2018-10-26'
    },
    destinationDescription: 'Cancun',
    earlyBirdBounds: [
      {
        boundType: 'DEPARTING',
        flight: '2491/1607',
        departureDate: '2018-10-24',
        departureTime: '06:05',
        departureAirportCode: 'ATL',
        arrivalTime: '11:35',
        arrivalAirportCode: 'CUN',
        earlyBirdBoundPrice: {
          amount: '25.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        passengers: [
          {
            name: 'Paul Liu',
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fFRMQTdQTlJMLFQsQVRMLEJXSSwyMDE4LTEwLTI0VDA2OjA1LTA0OjAwLDIwMTgtMTAtMjRUMDc6NTAtMDQ6MDAsV04sV04sMjQ5MSw3M1d8VExBN1BOUkwsVCxCV0ksQ1VOLDIwMTgtMTAtMjRUMDg6NDUtMDQ6MDAsMjAxOC0xMC0yNFQxMTozNS0wNTowMCxXTixXTiwxNjA3LDdNOCIsImZhcmUiOnsiYmFzZUZhcmUiOnsidmFsdWUiOiIyNS4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ0b3RhbFRheGVzQW5kRmVlcyI6eyJ2YWx1ZSI6IjAuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwidG90YWxGYXJlIjp7InZhbHVlIjoiMjUuMDAiLCJjdXJyZW5jeUNvZGUiOiJVU0QifSwiZmFyZVR5cGUiOiJOT05ESVNDT1VOVCJ9LCJwYXNzZW5nZXJSZWZlcmVuY2UiOiIyIiwic2VnbWVudFJlZmVyZW5jZXMiOlsiMSIsIjIiXSwiaXRpbmVyYXJ5UHJpY2VSZWZlcmVuY2UiOiIxMCJ9'
            }
          }
        ],
        isNextDayArrival: false
      },
      {
        boundType: 'RETURNING',
        flight: '306/2460',
        departureDate: '2018-10-26',
        departureTime: '11:55',
        departureAirportCode: 'CUN',
        arrivalTime: '20:15',
        arrivalAirportCode: 'ATL',
        earlyBirdBoundPrice: {
          amount: '25.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          description: null
        },
        passengers: [
          {
            name: 'Paul Liu',
            accountNumber: null,
            canPurchaseEarlyBird: true,
            decisionDescription: null,
            _meta: {
              productId:
                'eyJwcm9kdWN0SWQiOiJXR0F8fFRMQTdQTlJMLFQsQ1VOLEhPVSwyMDE4LTEwLTI2VDExOjU1LTA1OjAwLDIwMTgtMTAtMjZUMTQ6MTUtMDU6MDAsV04sV04sMzA2LDczV3xUTEE3UE5STCxULEhPVSxBVEwsMjAxOC0xMC0yNlQxNzoxNS0wNTowMCwyMDE4LTEwLTI2VDIwOjE1LTA0OjAwLFdOLFdOLDI0NjAsNzNXIiwiZmFyZSI6eyJiYXNlRmFyZSI6eyJ2YWx1ZSI6IjI1LjAwIiwiY3VycmVuY3lDb2RlIjoiVVNEIn0sInRvdGFsVGF4ZXNBbmRGZWVzIjp7InZhbHVlIjoiMC4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJ0b3RhbEZhcmUiOnsidmFsdWUiOiIyNS4wMCIsImN1cnJlbmN5Q29kZSI6IlVTRCJ9LCJmYXJlVHlwZSI6Ik5PTkRJU0NPVU5UIn0sInBhc3NlbmdlclJlZmVyZW5jZSI6IjIiLCJzZWdtZW50UmVmZXJlbmNlcyI6WyIzIiwiNCJdLCJpdGluZXJhcnlQcmljZVJlZmVyZW5jZSI6IjExIn0='
            }
          }
        ],
        isNextDayArrival: false
      }
    ],
    earlyBirdAnalytics: {
      recordLocator: 'KTZM9Q',
      tripType: 'roundTrip',
      lengthOfStay: '2',
      bookingCurve: '7',
      outboundEligiblePassengerCount: 1,
      outboundDate: '2018-10-24',
      outboundPrice: '25.00',
      outboundCityPair: 'ATLCUN',
      outboundFareType: 'WGA',
      inboundEligiblePassengerCount: 1,
      inboundDate: '2018-10-26',
      inboundPrice: '25.00',
      inboundCityPair: 'CUNATL',
      inboundFareType: 'WGA',
      sourceOfSale: 'MOBILE'
    },
    _links: {
      earlyBirdConfirmationPage: {
        href: '/v1/mobile-air-booking/page/early-bird/KTZM9Q',
        method: 'POST',
        xhref: '/v1/mobile-air-booking/page/x-early-bird/KTZM9Q',
        body: {
          firstName: 'p',
          lastName: 'liu',
          receiptEmail: 'ATERRIS@EXAMPLE.COM',
          recordLocator: 'KTZM9Q'
        }
      }
    }
  }
};
