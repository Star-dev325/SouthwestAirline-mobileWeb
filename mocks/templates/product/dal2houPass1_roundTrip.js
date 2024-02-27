const productDefinitions = require('mocks/templates//productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = {
  flightShoppingPage: {
    productDefinitions,
    messages: [],
    showSgaMessage: false,
    promoCodeNotice: null,
    pointsDisclaimer: null,
    disclaimerWithLinks:
      'All fares are rounded up to the nearest dollar and include  <a href="https://mobile.southwest.com/taxes-and-fees" target="_blank">Gov\'t taxes &amp; fees.</a>',
    outboundPage: {
      header: { airportInfo: 'DAL - HOU', selectedDate: '2020-12-18', originAirport: 'DAL', destinationAirport: 'HOU' },
      cards: [
        {
          departureTime: '06:00',
          arrivalTime: '07:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1628',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:0:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0600'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '06:30',
          arrivalTime: '10:20',
          duration: '3h 50m',
          stopDescription: '1 Stop, MSY',
          stopDescriptionOnSelect: '1 Stop, Change planes MSY',
          shortStopDescription: '1 Stop',
          stopCity: 'MSY',
          flightNumbers: '121/1212',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'U1ksSE9VLDIwMjAtMTItMThUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMDoyMC0wNjowMCxXTixXTiwxMjEyLDczSCIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:20:2020-12-18',
            durationMinutes: 230,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '0630'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '07:00',
          arrivalTime: '08:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMDc6MDAtMDY6MDAsMjAyMC0xMi0xOFQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLERBTCxIT1UsMjAyMC0xMi0xOFQwNzowMC0wNjowMCwyMDIwLTEyLTE4VDA4OjEwLTA2OjAwLFdOLFdOLDEsNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMDc6MDAtMDY6MDAsMjAyMC0xMi0xOFQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:1:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0700'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '08:00',
          arrivalTime: '09:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '5',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMDg6MDAtMDY6MDAsMjAyMC0xMi0xOFQwOToxNS0wNjowMCxXTixXTiw1LDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLERBTCxIT1UsMjAyMC0xMi0xOFQwODowMC0wNjowMCwyMDIwLTEyLTE4VDA5OjE1LTA2OjAwLFdOLFdOLDUsNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMDg6MDAtMDY6MDAsMjAyMC0xMi0xOFQwOToxNS0wNjowMCxXTixXTiw1LDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:8:2020-12-18',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0800'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '08:10',
          arrivalTime: '11:00',
          duration: '2h 50m',
          stopDescription: '1 Stop, AUS',
          stopDescriptionOnSelect: '1 Stop, Change planes AUS',
          shortStopDescription: '1 Stop',
          stopCity: 'AUS',
          flightNumbers: '149/852',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsQVVTLDIwMjAtMTItMThUMDg6MTAtMDY6MDAsMjAyMC0xMi0xOFQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfFlMNlksWSxBVVMsSE9VLDIwMjAtMTItMThUMDk6NTUtMDY6MDAsMjAyMC0xMi0xOFQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI2OTUuMDgiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssREFMLEFVUywyMDIwLTEyLTE4VDA4OjEwLTA2OjAwLDIwMjAtMTItMThUMDk6MTAtMDY6MDAsV04sV04sMTQ5LDczV3xLUDhLLEssQVVTLEhPVSwyMDIwLTEyLTE4VDA5OjU1LTA2OjAwLDIwMjAtMTItMThUMTE6MDAtMDY6MDAsV04sV04sODUyLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMifX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsQVVTLDIwMjAtMTItMThUMDg6MTAtMDY6MDAsMjAyMC0xMi0xOFQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfEtQOEssSyxBVVMsSE9VLDIwMjAtMTItMThUMDk6NTUtMDY6MDAsMjAyMC0xMi0xOFQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:16:2020-12-18',
            durationMinutes: 170,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '0810'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '08:30',
          arrivalTime: '12:45',
          duration: '4h 15m',
          stopDescription: '1 Stop, ELP',
          stopDescriptionOnSelect: '1 Stop, Change planes ELP',
          shortStopDescription: '1 Stop',
          stopCity: 'ELP',
          flightNumbers: '570/1511',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '669', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsRUxQLDIwMjAtMTItMThUMDg6MzAtMDY6MDAsMjAyMC0xMi0xOFQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNIfFlMNkwsWSxFTFAsSE9VLDIwMjAtMTItMThUMTA6MDAtMDc6MDAsMjAyMC0xMi0xOFQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNjY4LjIwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLERBTCxFTFAsMjAyMC0xMi0xOFQwODozMC0wNjowMCwyMDIwLTEyLTE4VDA5OjIwLTA3OjAwLFdOLFdOLDU3MCw3M0h8TFA4TCxMLEVMUCxIT1UsMjAyMC0xMi0xOFQxMDowMC0wNzowMCwyMDIwLTEyLTE4VDEyOjQ1LTA2OjAwLFdOLFdOLDE1MTEsNzNXIiwicXVvdGVkUHJpY2UiOiI2OTguMzAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '699', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsRUxQLDIwMjAtMTItMThUMDg6MzAtMDY6MDAsMjAyMC0xMi0xOFQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNIfExQOEwsTCxFTFAsSE9VLDIwMjAtMTItMThUMTA6MDAtMDc6MDAsMjAyMC0xMi0xOFQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNjk4LjMwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:24:2020-12-18',
            durationMinutes: 255,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '0830'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '09:00',
          arrivalTime: '10:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '9',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMThUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLERBTCxIT1UsMjAyMC0xMi0xOFQwOTowMC0wNjowMCwyMDIwLTEyLTE4VDEwOjE1LTA2OjAwLFdOLFdOLDksNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:9:2020-12-18',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0900'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '09:25',
          arrivalTime: '13:30',
          duration: '4h 5m',
          stopDescription: '1 Stop, SAT',
          stopDescriptionOnSelect: '1 Stop, Change planes SAT',
          shortStopDescription: '1 Stop',
          stopCity: 'SAT',
          flightNumbers: '639/652',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsU0FULDIwMjAtMTItMThUMDk6MjUtMDY6MDAsMjAyMC0xMi0xOFQxMDozNS0wNjowMCxXTixXTiw2MzksNzNIfFlMNlksWSxTQVQsSE9VLDIwMjAtMTItMThUMTI6MjUtMDY6MDAsMjAyMC0xMi0xOFQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI2OTUuMDgiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssREFMLFNBVCwyMDIwLTEyLTE4VDA5OjI1LTA2OjAwLDIwMjAtMTItMThUMTA6MzUtMDY6MDAsV04sV04sNjM5LDczSHxLUDhLLEssU0FULEhPVSwyMDIwLTEyLTE4VDEyOjI1LTA2OjAwLDIwMjAtMTItMThUMTM6MzAtMDY6MDAsV04sV04sNjUyLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMifX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMThUMDk6MjUtMDY6MDAsMjAyMC0xMi0xOFQxMDozNS0wNjowMCxXTixXTiw2MzksNzNIfEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMThUMTI6MjUtMDY6MDAsMjAyMC0xMi0xOFQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:22:2020-12-18',
            durationMinutes: 245,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '0925'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:00',
          arrivalTime: '11:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '15',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMThUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:2:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1000'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '11:00',
          arrivalTime: '12:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '19',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:10:2020-12-18',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1100'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '12:00',
          arrivalTime: '13:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '21',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOFQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:11:2020-12-18',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1200'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '13:00',
          arrivalTime: '14:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '27',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMThUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:3:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1300'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '13:15',
          arrivalTime: '17:00',
          duration: '3h 45m',
          stopDescription: '1 Stop, MSY',
          stopDescriptionOnSelect: '1 Stop, Change planes MSY',
          shortStopDescription: '1 Stop',
          stopCity: 'MSY',
          flightNumbers: '571/2454',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTItMThUMTM6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfFlMNlksWSxNU1ksSE9VLDIwMjAtMTItMThUMTU6NDAtMDY6MDAsMjAyMC0xMi0xOFQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxNU1ksMjAyMC0xMi0xOFQxMzoxNS0wNjowMCwyMDIwLTEyLTE4VDE0OjM1LTA2OjAwLFdOLFdOLDU3MSw3M1d8S1A4SyxLLE1TWSxIT1UsMjAyMC0xMi0xOFQxNTo0MC0wNjowMCwyMDIwLTEyLTE4VDE3OjAwLTA2OjAwLFdOLFdOLDI0NTQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTItMThUMTM6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfEtQOEssSyxNU1ksSE9VLDIwMjAtMTItMThUMTU6NDAtMDY6MDAsMjAyMC0xMi0xOFQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:19:2020-12-18',
            durationMinutes: 225,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1315'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '13:25',
          arrivalTime: '16:15',
          duration: '2h 50m',
          stopDescription: '1 Stop, SAT',
          stopDescriptionOnSelect: '1 Stop, Change planes SAT',
          shortStopDescription: '1 Stop',
          stopCity: 'SAT',
          flightNumbers: '640/44',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsU0FULDIwMjAtMTItMThUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOFQxNDozMC0wNjowMCxXTixXTiw2NDAsNzNXfFlMNlksWSxTQVQsSE9VLDIwMjAtMTItMThUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNjoxNS0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjY5NS4wOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMThUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOFQxNDozMC0wNjowMCxXTixXTiw2NDAsNzNXfEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMThUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNjoxNS0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMThUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOFQxNDozMC0wNjowMCxXTixXTiw2NDAsNzNXfEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMThUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNjoxNS0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:17:2020-12-18',
            durationMinutes: 170,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1325'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '14:00',
          arrivalTime: '15:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '31',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNToxNS0wNjowMCxXTixXTiwzMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNToxNS0wNjowMCxXTixXTiwzMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNToxNS0wNjowMCxXTixXTiwzMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:12:2020-12-18',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1400'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '14:15',
          arrivalTime: '18:05',
          duration: '3h 50m',
          stopDescription: '1 Stop, SAT',
          stopDescriptionOnSelect: '1 Stop, Change planes SAT',
          shortStopDescription: '1 Stop',
          stopCity: 'SAT',
          flightNumbers: '260/706',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsU0FULDIwMjAtMTItMThUMTQ6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNToyNS0wNjowMCxXTixXTiwyNjAsN004fFlMNlksWSxTQVQsSE9VLDIwMjAtMTItMThUMTc6MDUtMDY6MDAsMjAyMC0xMi0xOFQxODowNS0wNjowMCxXTixXTiw3MDYsNzNXIiwicXVvdGVkUHJpY2UiOiI2OTUuMDgiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssREFMLFNBVCwyMDIwLTEyLTE4VDE0OjE1LTA2OjAwLDIwMjAtMTItMThUMTU6MjUtMDY6MDAsV04sV04sMjYwLDdNOHxLUDhLLEssU0FULEhPVSwyMDIwLTEyLTE4VDE3OjA1LTA2OjAwLDIwMjAtMTItMThUMTg6MDUtMDY6MDAsV04sV04sNzA2LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMifX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMThUMTQ6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNToyNS0wNjowMCxXTixXTiwyNjAsN004fEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMThUMTc6MDUtMDY6MDAsMjAyMC0xMi0xOFQxODowNS0wNjowMCxXTixXTiw3MDYsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:21:2020-12-18',
            durationMinutes: 230,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1415'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '15:00',
          arrivalTime: '16:20',
          duration: '1h 20m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '35',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNjoyMC0wNjowMCxXTixXTiwzNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNjoyMC0wNjowMCxXTixXTiwzNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNjoyMC0wNjowMCxXTixXTiwzNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:15:2020-12-18',
            durationMinutes: 80,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1500'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '15:15',
          arrivalTime: '18:20',
          duration: '3h 5m',
          stopDescription: '1 Stop, AUS',
          stopDescriptionOnSelect: '1 Stop, Change planes AUS',
          shortStopDescription: '1 Stop',
          stopCity: 'AUS',
          flightNumbers: '1717/502',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsQVVTLDIwMjAtMTItMThUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczV3xZTDZZLFksQVVTLEhPVSwyMDIwLTEyLTE4VDE3OjIwLTA2OjAwLDIwMjAtMTItMThUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczSCIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxBVVMsMjAyMC0xMi0xOFQxNToxNS0wNjowMCwyMDIwLTEyLTE4VDE2OjI1LTA2OjAwLFdOLFdOLDE3MTcsNzNXfEtQOEssSyxBVVMsSE9VLDIwMjAtMTItMThUMTc6MjAtMDY6MDAsMjAyMC0xMi0xOFQxODoyMC0wNjowMCxXTixXTiw1MDIsNzNIIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsQVVTLDIwMjAtMTItMThUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOFQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczV3xLUDhLLEssQVVTLEhPVSwyMDIwLTEyLTE4VDE3OjIwLTA2OjAwLDIwMjAtMTItMThUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczSCIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:18:2020-12-18',
            durationMinutes: 185,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1515'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '16:00',
          arrivalTime: '17:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '39',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOFQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:13:2020-12-18',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1600'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '16:30',
          arrivalTime: '20:45',
          duration: '4h 15m',
          stopDescription: '1 Stop, MSY',
          stopDescriptionOnSelect: '1 Stop, Change planes MSY',
          shortStopDescription: '1 Stop',
          stopCity: 'MSY',
          flightNumbers: '138/1309',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTItMThUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOFQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfFlMNlksWSxNU1ksSE9VLDIwMjAtMTItMThUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOFQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxNU1ksMjAyMC0xMi0xOFQxNjozMC0wNjowMCwyMDIwLTEyLTE4VDE3OjU1LTA2OjAwLFdOLFdOLDEzOCw3M1d8S1A4SyxLLE1TWSxIT1UsMjAyMC0xMi0xOFQxOToyNS0wNjowMCwyMDIwLTEyLTE4VDIwOjQ1LTA2OjAwLFdOLFdOLDEzMDksNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTItMThUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOFQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfEtQOEssSyxNU1ksSE9VLDIwMjAtMTItMThUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOFQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:25:2020-12-18',
            durationMinutes: 255,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1630'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '17:00',
          arrivalTime: '18:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '43',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMThUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOFQxODoxNS0wNjowMCxXTixXTiw0Myw3MzgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOFQxODoxNS0wNjowMCxXTixXTiw0Myw3MzgiLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOFQxODoxNS0wNjowMCxXTixXTiw0Myw3MzgiLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOFQxODoxNS0wNjowMCxXTixXTiw0Myw3MzgiLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:14:2020-12-18',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1700'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '18:00',
          arrivalTime: '19:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '47',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMThUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOFQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOFQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOFQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOFQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:4:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1800'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '18:00',
          arrivalTime: '22:10',
          duration: '4h 10m',
          stopDescription: '1 Stop, MSY',
          stopDescriptionOnSelect: '1 Stop, Change planes MSY',
          shortStopDescription: '1 Stop',
          stopCity: 'MSY',
          flightNumbers: '1646/849',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixEQUwsTVNZLDIwMjAtMTItMThUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOFQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczV3xWTEEwVjJILFYsTVNZLEhPVSwyMDIwLTEyLTE4VDIwOjQ1LTA2OjAwLDIwMjAtMTItMThUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTItMThUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOFQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczV3xZTDZZLFksTVNZLEhPVSwyMDIwLTEyLTE4VDIwOjQ1LTA2OjAwLDIwMjAtMTItMThUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxNU1ksMjAyMC0xMi0xOFQxODowMC0wNjowMCwyMDIwLTEyLTE4VDE5OjE1LTA2OjAwLFdOLFdOLDE2NDYsNzNXfEtQOEssSyxNU1ksSE9VLDIwMjAtMTItMThUMjA6NDUtMDY6MDAsMjAyMC0xMi0xOFQyMjoxMC0wNjowMCxXTixXTiw4NDksNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTItMThUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOFQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczV3xLUDhLLEssTVNZLEhPVSwyMDIwLTEyLTE4VDIwOjQ1LTA2OjAwLDIwMjAtMTItMThUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:23:2020-12-18',
            durationMinutes: 250,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1800'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '19:00',
          arrivalTime: '20:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '51',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMThUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOFQyMDoxMC0wNjowMCxXTixXTiw1MSw3MzgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOFQyMDoxMC0wNjowMCxXTixXTiw1MSw3MzgiLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOFQyMDoxMC0wNjowMCxXTixXTiw1MSw3MzgiLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOFQyMDoxMC0wNjowMCxXTixXTiw1MSw3MzgiLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:5:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1900'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '20:30',
          arrivalTime: '21:40',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '57',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_USD',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOFQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOFQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOFQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:6:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '2030'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '21:30',
          arrivalTime: '22:40',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '61',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMThUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOFQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMThUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOFQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOFQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMThUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOFQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:7:2020-12-18',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '2130'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        }
      ]
    },
    inboundPage: {
      header: { airportInfo: 'HOU - DAL', selectedDate: '2020-12-21', originAirport: 'HOU', destinationAirport: 'DAL' },
      cards: [
        {
          departureTime: '06:00',
          arrivalTime: '07:00',
          duration: '1h 0m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1636',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMVQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMVQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiNjg2LjI4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxEQUwsMjAyMC0xMi0yMVQwNjowMC0wNjowMCwyMDIwLTEyLTIxVDA3OjAwLTA2OjAwLFdOLFdOLDE2MzYsNzNXIiwicXVvdGVkUHJpY2UiOiI3MTYuMzgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMVQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiNzE2LjM4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:2:2020-12-21',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0600'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '07:00',
          arrivalTime: '08:05',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '4',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMVQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMVQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiNjg2LjI4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxEQUwsMjAyMC0xMi0yMVQwNzowMC0wNjowMCwyMDIwLTEyLTIxVDA4OjA1LTA2OjAwLFdOLFdOLDQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MTYuMzgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMVQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiNzE2LjM4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:7:2020-12-21',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0700'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '08:00',
          arrivalTime: '09:00',
          duration: '1h 0m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '8',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMVQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMVQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiNjg2LjI4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxEQUwsMjAyMC0xMi0yMVQwODowMC0wNjowMCwyMDIwLTEyLTIxVDA5OjAwLTA2OjAwLFdOLFdOLDgsNzNIIiwicXVvdGVkUHJpY2UiOiI3MTYuMzgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMVQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiNzE2LjM4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:3:2020-12-21',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0800'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '09:00',
          arrivalTime: '10:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '12',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:13:2020-12-21',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '0900'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:00',
          arrivalTime: '11:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '16',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:14:2020-12-21',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1000'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:55',
          arrivalTime: '14:05',
          duration: '3h 10m',
          stopDescription: '1 Stop, AUS',
          stopDescriptionOnSelect: '1 Stop, Change planes AUS',
          shortStopDescription: '1 Stop',
          stopCity: 'AUS',
          flightNumbers: '1212/2016',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixIT1UsQVVTLDIwMjAtMTItMjFUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMVQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xWTEEwVjJILFYsQVVTLERBTCwyMDIwLTEyLTIxVDEzOjA1LTA2OjAwLDIwMjAtMTItMjFUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjM0NS43MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsQVVTLDIwMjAtMTItMjFUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMVQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xZTDZZLFksQVVTLERBTCwyMDIwLTEyLTIxVDEzOjA1LTA2OjAwLDIwMjAtMTItMjFUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjY5NS4wOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjFUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMVQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xLUDhLLEssQVVTLERBTCwyMDIwLTEyLTIxVDEzOjA1LTA2OjAwLDIwMjAtMTItMjFUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjFUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMVQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xLUDhLLEssQVVTLERBTCwyMDIwLTEyLTIxVDEzOjA1LTA2OjAwLDIwMjAtMTItMjFUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:23:2020-12-21',
            durationMinutes: 190,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1055'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '11:00',
          arrivalTime: '12:15',
          duration: '1h 15m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '20',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:18:2020-12-21',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1100'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '12:00',
          arrivalTime: '13:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '24',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:15:2020-12-21',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1200'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '13:00',
          arrivalTime: '13:35',
          duration: '0h 35m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '9691',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxIT1UsREFMLDIwMjAtMTItMjFUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLEhPVSxEQUwsMjAyMC0xMi0yMVQxMzowMC0wNjowMCwyMDIwLTEyLTIxVDEzOjM1LTA2OjAwLFdOLFdOLDk2OTEsNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxIT1UsREFMLDIwMjAtMTItMjFUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMVQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:0:2020-12-21',
            durationMinutes: 35,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1300'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '13:00',
          arrivalTime: '14:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '28',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:16:2020-12-21',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1300'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '13:15',
          arrivalTime: '15:55',
          duration: '2h 40m',
          stopDescription: '1 Stop, SAT',
          stopDescriptionOnSelect: '1 Stop, Change planes SAT',
          shortStopDescription: '1 Stop',
          stopCity: 'SAT',
          flightNumbers: '1346/490',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixIT1UsU0FULDIwMjAtMTItMjFUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMVQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xWTEEwVjJILFYsU0FULERBTCwyMDIwLTEyLTIxVDE0OjUwLTA2OjAwLDIwMjAtMTItMjFUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsU0FULDIwMjAtMTItMjFUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMVQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xZTDZZLFksU0FULERBTCwyMDIwLTEyLTIxVDE0OjUwLTA2OjAwLDIwMjAtMTItMjFUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxTQVQsMjAyMC0xMi0yMVQxMzoxNS0wNjowMCwyMDIwLTEyLTIxVDE0OjE1LTA2OjAwLFdOLFdOLDEzNDYsNzNXfEtQOEssSyxTQVQsREFMLDIwMjAtMTItMjFUMTQ6NTAtMDY6MDAsMjAyMC0xMi0yMVQxNTo1NS0wNjowMCxXTixXTiw0OTAsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsU0FULDIwMjAtMTItMjFUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMVQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xLUDhLLEssU0FULERBTCwyMDIwLTEyLTIxVDE0OjUwLTA2OjAwLDIwMjAtMTItMjFUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:20:2020-12-21',
            durationMinutes: 160,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1315'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '14:00',
          arrivalTime: '15:10',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '32',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:17:2020-12-21',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1400'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '15:00',
          arrivalTime: '16:05',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '36',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:8:2020-12-21',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1500'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '15:15',
          arrivalTime: '18:15',
          duration: '3h 0m',
          stopDescription: '1 Stop, AUS',
          stopDescriptionOnSelect: '1 Stop, Change planes AUS',
          shortStopDescription: '1 Stop',
          stopCity: 'AUS',
          flightNumbers: '568/1718',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixIT1UsQVVTLDIwMjAtMTItMjFUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMVQxNjoxNS0wNjowMCxXTixXTiw1NjgsNzNXfFZMQTBWMkgsVixBVVMsREFMLDIwMjAtMTItMjFUMTc6MTAtMDY6MDAsMjAyMC0xMi0yMVQxODoxNS0wNjowMCxXTixXTiwxNzE4LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsQVVTLDIwMjAtMTItMjFUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMVQxNjoxNS0wNjowMCxXTixXTiw1NjgsNzNXfFlMNlksWSxBVVMsREFMLDIwMjAtMTItMjFUMTc6MTAtMDY6MDAsMjAyMC0xMi0yMVQxODoxNS0wNjowMCxXTixXTiwxNzE4LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMi0yMVQxNToxNS0wNjowMCwyMDIwLTEyLTIxVDE2OjE1LTA2OjAwLFdOLFdOLDU2OCw3M1d8S1A4SyxLLEFVUyxEQUwsMjAyMC0xMi0yMVQxNzoxMC0wNjowMCwyMDIwLTEyLTIxVDE4OjE1LTA2OjAwLFdOLFdOLDE3MTgsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjFUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMVQxNjoxNS0wNjowMCxXTixXTiw1NjgsNzNXfEtQOEssSyxBVVMsREFMLDIwMjAtMTItMjFUMTc6MTAtMDY6MDAsMjAyMC0xMi0yMVQxODoxNS0wNjowMCxXTixXTiwxNzE4LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:22:2020-12-21',
            durationMinutes: 180,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1515'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '16:00',
          arrivalTime: '17:05',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '40',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMVQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:9:2020-12-21',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1600'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '16:05',
          arrivalTime: '19:40',
          duration: '3h 35m',
          stopDescription: '1 Stop, SAT',
          stopDescriptionOnSelect: '1 Stop, Change planes SAT',
          shortStopDescription: '1 Stop',
          stopCity: 'SAT',
          flightNumbers: '200/1626',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixIT1UsU0FULDIwMjAtMTItMjFUMTY6MDUtMDY6MDAsMjAyMC0xMi0yMVQxNzowNS0wNjowMCxXTixXTiwyMDAsNzNXfFZMQTBWMkgsVixTQVQsREFMLDIwMjAtMTItMjFUMTg6NDAtMDY6MDAsMjAyMC0xMi0yMVQxOTo0MC0wNjowMCxXTixXTiwxNjI2LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsU0FULDIwMjAtMTItMjFUMTY6MDUtMDY6MDAsMjAyMC0xMi0yMVQxNzowNS0wNjowMCxXTixXTiwyMDAsNzNXfFlMNlksWSxTQVQsREFMLDIwMjAtMTItMjFUMTg6NDAtMDY6MDAsMjAyMC0xMi0yMVQxOTo0MC0wNjowMCxXTixXTiwxNjI2LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxTQVQsMjAyMC0xMi0yMVQxNjowNS0wNjowMCwyMDIwLTEyLTIxVDE3OjA1LTA2OjAwLFdOLFdOLDIwMCw3M1d8S1A4SyxLLFNBVCxEQUwsMjAyMC0xMi0yMVQxODo0MC0wNjowMCwyMDIwLTEyLTIxVDE5OjQwLTA2OjAwLFdOLFdOLDE2MjYsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsU0FULDIwMjAtMTItMjFUMTY6MDUtMDY6MDAsMjAyMC0xMi0yMVQxNzowNS0wNjowMCxXTixXTiwyMDAsNzNXfEtQOEssSyxTQVQsREFMLDIwMjAtMTItMjFUMTg6NDAtMDY6MDAsMjAyMC0xMi0yMVQxOTo0MC0wNjowMCxXTixXTiwxNjI2LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:25:2020-12-21',
            durationMinutes: 215,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1605'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '17:00',
          arrivalTime: '18:00',
          duration: '1h 0m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '44',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMVQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMVQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMVQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMVQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:4:2020-12-21',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1700'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '18:00',
          arrivalTime: '19:05',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '48',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMVQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMVQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMVQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMVQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:10:2020-12-21',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1800'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '18:20',
          arrivalTime: '21:35',
          duration: '3h 15m',
          stopDescription: '1 Stop, MSY',
          stopDescriptionOnSelect: '1 Stop, Change planes MSY',
          shortStopDescription: '1 Stop',
          stopCity: 'MSY',
          flightNumbers: '166/1104',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixIT1UsTVNZLDIwMjAtMTItMjFUMTg6MjAtMDY6MDAsMjAyMC0xMi0yMVQxOToyNS0wNjowMCxXTixXTiwxNjYsNzNXfFZMQTBWMkgsVixNU1ksREFMLDIwMjAtMTItMjFUMjA6MTAtMDY6MDAsMjAyMC0xMi0yMVQyMTozNS0wNjowMCxXTixXTiwxMTA0LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsTVNZLDIwMjAtMTItMjFUMTg6MjAtMDY6MDAsMjAyMC0xMi0yMVQxOToyNS0wNjowMCxXTixXTiwxNjYsNzNXfFlMNlksWSxNU1ksREFMLDIwMjAtMTItMjFUMjA6MTAtMDY6MDAsMjAyMC0xMi0yMVQyMTozNS0wNjowMCxXTixXTiwxMTA0LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxNU1ksMjAyMC0xMi0yMVQxODoyMC0wNjowMCwyMDIwLTEyLTIxVDE5OjI1LTA2OjAwLFdOLFdOLDE2Niw3M1d8S1A4SyxLLE1TWSxEQUwsMjAyMC0xMi0yMVQyMDoxMC0wNjowMCwyMDIwLTEyLTIxVDIxOjM1LTA2OjAwLFdOLFdOLDExMDQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsTVNZLDIwMjAtMTItMjFUMTg6MjAtMDY6MDAsMjAyMC0xMi0yMVQxOToyNS0wNjowMCxXTixXTiwxNjYsNzNXfEtQOEssSyxNU1ksREFMLDIwMjAtMTItMjFUMjA6MTAtMDY6MDAsMjAyMC0xMi0yMVQyMTozNS0wNjowMCxXTixXTiwxMTA0LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:24:2020-12-21',
            durationMinutes: 195,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1820'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '18:35',
          arrivalTime: '21:10',
          duration: '2h 35m',
          stopDescription: '1 Stop, AUS',
          stopDescriptionOnSelect: '1 Stop, Change planes AUS',
          shortStopDescription: '1 Stop',
          stopCity: 'AUS',
          flightNumbers: '1653/780',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixIT1UsQVVTLDIwMjAtMTItMjFUMTg6MzUtMDY6MDAsMjAyMC0xMi0yMVQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xWTEEwVjJILFYsQVVTLERBTCwyMDIwLTEyLTIxVDIwOjA1LTA2OjAwLDIwMjAtMTItMjFUMjE6MTAtMDY6MDAsV04sV04sNzgwLDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsQVVTLDIwMjAtMTItMjFUMTg6MzUtMDY6MDAsMjAyMC0xMi0yMVQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xZTDZZLFksQVVTLERBTCwyMDIwLTEyLTIxVDIwOjA1LTA2OjAwLDIwMjAtMTItMjFUMjE6MTAtMDY6MDAsV04sV04sNzgwLDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMi0yMVQxODozNS0wNjowMCwyMDIwLTEyLTIxVDE5OjI1LTA2OjAwLFdOLFdOLDE2NTMsNzNXfEtQOEssSyxBVVMsREFMLDIwMjAtMTItMjFUMjA6MDUtMDY6MDAsMjAyMC0xMi0yMVQyMToxMC0wNjowMCxXTixXTiw3ODAsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjFUMTg6MzUtMDY6MDAsMjAyMC0xMi0yMVQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xLUDhLLEssQVVTLERBTCwyMDIwLTEyLTIxVDIwOjA1LTA2OjAwLDIwMjAtMTItMjFUMjE6MTAtMDY6MDAsV04sV04sNzgwLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:19:2020-12-21',
            durationMinutes: 155,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1835'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '19:00',
          arrivalTime: '20:00',
          duration: '1h 0m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '52',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:5:2020-12-21',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1900'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '19:00',
          arrivalTime: '20:05',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '9572',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxIT1UsREFMLDIwMjAtMTItMjFUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLEhPVSxEQUwsMjAyMC0xMi0yMVQxOTowMC0wNjowMCwyMDIwLTEyLTIxVDIwOjA1LTA2OjAwLFdOLFdOLDk1NzIsNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxIT1UsREFMLDIwMjAtMTItMjFUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:11:2020-12-21',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '1900'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '19:05',
          arrivalTime: '21:55',
          duration: '2h 50m',
          stopDescription: '1 Stop, SAT',
          stopDescriptionOnSelect: '1 Stop, Change planes SAT',
          shortStopDescription: '1 Stop',
          stopCity: 'SAT',
          flightNumbers: '1709/694',
          startingFromPrice: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '346', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMQTBWMkgsVixIT1UsU0FULDIwMjAtMTItMjFUMTk6MDUtMDY6MDAsMjAyMC0xMi0yMVQyMDowNS0wNjowMCxXTixXTiwxNzA5LDczV3xWTEEwVjJILFYsU0FULERBTCwyMDIwLTEyLTIxVDIwOjU1LTA2OjAwLDIwMjAtMTItMjFUMjE6NTUtMDY6MDAsV04sV04sNjk0LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '696', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsU0FULDIwMjAtMTItMjFUMTk6MDUtMDY6MDAsMjAyMC0xMi0yMVQyMDowNS0wNjowMCxXTixXTiwxNzA5LDczV3xZTDZZLFksU0FULERBTCwyMDIwLTEyLTIxVDIwOjU1LTA2OjAwLDIwMjAtMTItMjFUMjE6NTUtMDY6MDAsV04sV04sNjk0LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxTQVQsMjAyMC0xMi0yMVQxOTowNS0wNjowMCwyMDIwLTEyLTIxVDIwOjA1LTA2OjAwLFdOLFdOLDE3MDksNzNXfEtQOEssSyxTQVQsREFMLDIwMjAtMTItMjFUMjA6NTUtMDY6MDAsMjAyMC0xMi0yMVQyMTo1NS0wNjowMCxXTixXTiw2OTQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '726', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsU0FULDIwMjAtMTItMjFUMTk6MDUtMDY6MDAsMjAyMC0xMi0yMVQyMDowNS0wNjowMCxXTixXTiwxNzA5LDczV3xLUDhLLEssU0FULERBTCwyMDIwLTEyLTIxVDIwOjU1LTA2OjAwLDIwMjAtMTItMjFUMjE6NTUtMDY6MDAsV04sV04sNjk0LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:21:2020-12-21',
            durationMinutes: 170,
            numberOfStops: 1,
            startingFromAmount: 346,
            departureTime: '1905'
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '20:00',
          arrivalTime: '20:45',
          duration: '0h 45m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '9689',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMjA6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '660', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,000 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNkwsWSxIT1UsREFMLDIwMjAtMTItMjFUMjA6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLEhPVSxEQUwsMjAyMC0xMi0yMVQyMDowMC0wNjowMCwyMDIwLTEyLTIxVDIwOjQ1LTA2OjAwLFdOLFdOLDk2ODksNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '690', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,536 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfExQOEwsTCxIT1UsREFMLDIwMjAtMTItMjFUMjA6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:1:2020-12-21',
            durationMinutes: 45,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '2000'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '20:30',
          arrivalTime: '21:35',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '54',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMVQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMVQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMVQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMVQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:12:2020-12-21',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '2030'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '22:00',
          arrivalTime: '23:00',
          duration: '1h 0m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '64',
          startingFromPrice: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '337', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 1,800 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjFUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '687', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 6,250 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjFUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '717', currencyCode: 'USD', currencySymbol: '$' },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: 'Earn 7,836 pts',
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPass1_roundTrip0SWQiOiJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjFUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMVQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:6:2020-12-21',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 337,
            departureTime: '2200'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        }
      ]
    },
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
      userExperienceId: '2efb5e88-cca1-4b4a-9d41-fdad0881f88b',
      requestId: 'hTAWU9uAQlaXgQW7E85F7w',
      channelId: 'mweb'
    }
  }
};
