const productDefinitions = require('mocks/templates//productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = ({ originationAirport, destinationAirport, departureDate, isPromoCodeApplied, promoCode }) => ({
  flightShoppingPage: {
    productDefinitions,
    promoCodeNotice: isPromoCodeApplied ? `Promo code ${promoCode.toUpperCase()} applied!` : null,
    disclaimerWithLinks:
      'All fares are rounded up to the nearest dollar and include  <a href="https://mobile.southwest.com/taxes-and-fees" target="_blank">Gov\'t taxes &amp; fees.</a>',
    pointsDisclaimer: null,
    outboundPage: {
      header: {
        airportInfo: `${destinationAirport} - ${originationAirport}`,
        selectedDate: departureDate,
        originAirport: originationAirport,
        destinationAirport
      },
      cards: [
        {
          departureTime: '06:55',
          arrivalTime: '19:00',
          duration: '10h 5m',
          stopDescription: '2 Stops, PHX',
          stopDescriptionOnSelect: '2 Stops, Change planes PHX',
          shortStopDescription: '2 Stops',
          stopCity: 'PHX',
          flightNumbers: '463/128',
          startingFromPrice: { amount: '360', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '360', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,851 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'oneWay_BOI2BOSPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '715', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,389 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxCT0ksUEhYLDIwMjAtMTItMTdUMDY6NTUtMDc6MDAsMjAyMC0xMi0xN1QwODo1NS0wNzowMCxXTixXTiw0NjMsNzNIfFlMNlksWSxQSFgsQk9TLDIwMjAtMTItMTdUMTA6NTAtMDc6MDAsMjAyMC0xMi0xN1QxOTowMC0wNTowMCxXTixXTiwxMjgsNzNXIiwicXVvdGVkUHJpY2UiOiI3MTQuMzAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssQk9JLFBIWCwyMDIwLTEyLTE3VDA2OjU1LTA3OjAwLDIwMjAtMTItMTdUMDg6NTUtMDc6MDAsV04sV04sNDYzLDczSHxLUDhLLEssUEhYLEJPUywyMDIwLTEyLTE3VDEwOjUwLTA3OjAwLDIwMjAtMTItMTdUMTk6MDAtMDU6MDAsV04sV04sMTI4LDczVyIsInF1b3RlZFByaWNlIjoiNzQ5Ljc3IiwiZmFyZVR5cGUiOiJCVVMifX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '750', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 8,063 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'oneWay_BOI2BOSPass1_USD',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'BOI:BOS:1:2020-12-17',
            durationMinutes: 605,
            numberOfStops: 2,
            startingFromAmount: 360,
            departureTime: '0655'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '07:15',
          arrivalTime: '23:30',
          duration: '14h 15m',
          stopDescription: '3 Stops, STL',
          stopDescriptionOnSelect: '3 Stops, Change planes STL',
          shortStopDescription: '3 Stops',
          stopCity: 'STL',
          flightNumbers: '1337/513',
          startingFromPrice: { amount: '364', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '364', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,851 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'oneWay_BOI2BOSPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '719', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,389 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxCT0ksU1RMLDIwMjAtMTItMTdUMDc6MTUtMDc6MDAsMjAyMC0xMi0xN1QxNjo0NS0wNjowMCxXTixXTiwxMzM3LDczV3xZTDZZLFksU1RMLEJPUywyMDIwLTEyLTE3VDIwOjAwLTA2OjAwLDIwMjAtMTItMTdUMjM6MzAtMDU6MDAsV04sV04sNTEzLDczVyIsInF1b3RlZFByaWNlIjoiNzE4LjYwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEJPSSxTVEwsMjAyMC0xMi0xN1QwNzoxNS0wNzowMCwyMDIwLTEyLTE3VDE2OjQ1LTA2OjAwLFdOLFdOLDEzMzcsNzNXfEtQOEssSyxTVEwsQk9TLDIwMjAtMTItMTdUMjA6MDAtMDY6MDAsMjAyMC0xMi0xN1QyMzozMC0wNTowMCxXTixXTiw1MTMsNzNXIiwicXVvdGVkUHJpY2UiOiI3NTQuMDciLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '755', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 8,063 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxCT0ksU1RMLDIwMjAtMTItMTdUMDc6MTUtMDc6MDAsMjAyMC0xMi0xN1QxNjo0NS0wNjowMCxXTixXTiwxMzM3LDczV3xLUDhLLEssU1RMLEJPUywyMDIwLTEyLTE3VDIwOjAwLTA2OjAwLDIwMjAtMTItMTdUMjM6MzAtMDU6MDAsV04sV04sNTEzLDczVyIsInF1b3RlZFByaWNlIjoiNzU0LjA3IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'BOI:BOS:3:2020-12-17',
            durationMinutes: 855,
            numberOfStops: 3,
            startingFromAmount: 364,
            departureTime: '0715'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '11:15',
          arrivalTime: '00:35',
          duration: '11h 20m',
          stopDescription: '2 Stops, DEN',
          stopDescriptionOnSelect: '2 Stops, Change planes DEN',
          shortStopDescription: '2 Stops',
          stopCity: 'DEN',
          flightNumbers: '631/275',
          startingFromPrice: { amount: '360', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '360', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,851 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'oneWay_BOI2BOSPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '715', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,389 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxCT0ksREVOLDIwMjAtMTItMTdUMTE6MTUtMDc6MDAsMjAyMC0xMi0xN1QxNTozNS0wNzowMCxXTixXTiw2MzEsNzNXfFlMNlksWSxERU4sQk9TLDIwMjAtMTItMTdUMTg6NDUtMDc6MDAsMjAyMC0xMi0xOFQwMDozNS0wNTowMCxXTixXTiwyNzUsNzNXIiwicXVvdGVkUHJpY2UiOiI3MTQuMzAiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssQk9JLERFTiwyMDIwLTEyLTE3VDExOjE1LTA3OjAwLDIwMjAtMTItMTdUMTU6MzUtMDc6MDAsV04sV04sNjMxLDczV3xLUDhLLEssREVOLEJPUywyMDIwLTEyLTE3VDE4OjQ1LTA3OjAwLDIwMjAtMTItMThUMDA6MzUtMDU6MDAsV04sV04sMjc1LDczVyIsInF1b3RlZFByaWNlIjoiNzQ5Ljc3IiwiZmFyZVR5cGUiOiJCVVMifX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '750', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 8,063 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxCT0ksREVOLDIwMjAtMTItMTdUMTE6MTUtMDc6MDAsMjAyMC0xMi0xN1QxNTozNS0wNzowMCxXTixXTiw2MzEsNzNXfEtQOEssSyxERU4sQk9TLDIwMjAtMTItMTdUMTg6NDUtMDc6MDAsMjAyMC0xMi0xOFQwMDozNS0wNTowMCxXTixXTiwyNzUsNzNXIiwicXVvdGVkUHJpY2UiOiI3NDkuNzciLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYboiToBosPass1',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'BOI:BOS:2:2020-12-17',
            durationMinutes: 680,
            numberOfStops: 2,
            startingFromAmount: 360,
            departureTime: '1115'
          },
          isNextDayArrival: true,
          hasLowestFare: false
        },
        {
          departureTime: '16:20',
          arrivalTime: '00:35',
          duration: '6h 15m',
          stopDescription: '1 Stop, DEN',
          stopDescriptionOnSelect: '1 Stop, Change planes DEN',
          shortStopDescription: '1 Stop',
          stopCity: 'DEN',
          flightNumbers: '1481/275',
          startingFromPrice: { amount: '355', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '355', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,851 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'oneWay_BOI2BOSPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '710', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,389 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJBTll8QURUfFlMNlksWSxCT0ksREVOLDIwMjAtMTItMTdUMTY6MjAtMDc6MDAsMjAyMC0xMi0xN1QxODowMC0wNzowMCxXTixXTiwxNDgxLDczV3xZTDZZLFksREVOLEJPUywyMDIwLTEyLTE3VDE4OjQ1LTA3OjAwLDIwMjAtMTItMThUMDA6MzUtMDU6MDAsV04sV04sMjc1LDczVyIsInF1b3RlZFByaWNlIjoiNzEwLjAwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEJPSSxERU4sMjAyMC0xMi0xN1QxNjoyMC0wNzowMCwyMDIwLTEyLTE3VDE4OjAwLTA3OjAwLFdOLFdOLDE0ODEsNzNXfEtQOEssSyxERU4sQk9TLDIwMjAtMTItMTdUMTg6NDUtMDc6MDAsMjAyMC0xMi0xOFQwMDozNS0wNTowMCxXTixXTiwyNzUsNzNXIiwicXVvdGVkUHJpY2UiOiI3NDUuNDciLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '746', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 8,063 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'eyJwcm9kdWN0SWQiOiJCVVN8QURUfEtQOEssSyxCT0ksREVOLDIwMjAtMTItMTdUMTY6MjAtMDc6MDAsMjAyMC0xMi0xN1QxODowMC0wNzowMCxXTixXTiwxNDgxLDczV3xLUDhLLEssREVOLEJPUywyMDIwLTEyLTE3VDE4OjQ1LTA3OjAwLDIwMjAtMTItMThUMDA6MzUtMDU6MDAsV04sV04sMjc1LDczVyIsInF1b3RlZFByaWNlIjoiNzQ1LjQ3IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'BOI:BOS:0:2020-12-17',
            durationMinutes: 375,
            numberOfStops: 1,
            startingFromAmount: 355,
            departureTime: '1620'
          },
          isNextDayArrival: true,
          hasLowestFare: true
        }
      ]
    },
    inboundPage: null,
    _links: {
      flightPricingPage: {
        href: '/v1/mobile-air-booking/page/flights/prices',
        method: 'POST',
        body: { adultPassengers: null, currency: 'USD', promoCodeToken: null, chaseSessionId: null }
      },
      fareDetails: {
        href: '/fare-details',
        labelText: 'Compare fare benefits',
        method: 'GET'
      }
    },
    _meta: { purchaseWithPoints: false, hasAdult: true, isPromoCodeApplied: false },
    _analytics: {
      userExperienceId: '4902845f-2521-4232-8e83-1b3dede94c07',
      requestId: '_a49Pp40RE6JphaBwXUiwg',
      channelId: 'mweb'
    }
  }
});
