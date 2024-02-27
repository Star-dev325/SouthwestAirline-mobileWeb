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
      header: { airportInfo: 'DAL - HOU', selectedDate: '2020-12-19', originAirport: 'DAL', destinationAirport: 'HOU' },
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMDY6MDAtMDY6MDAsMjAyMC0xMi0xOVQwNzoxMC0wNjowMCxXTixXTiwxNjI4LDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:1:2020-12-19',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTItMTlUMDY6MzAtMDY6MDAsMjAyMC0xMi0xOVQwNzo1MC0wNjowMCxXTixXTiwxMjEsNzNXfFlMNlksWSxNU1ksSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoyMC0wNjowMCxXTixXTiwxMjEyLDczSCIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxNU1ksMjAyMC0xMi0xOVQwNjozMC0wNjowMCwyMDIwLTEyLTE5VDA3OjUwLTA2OjAwLFdOLFdOLDEyMSw3M1d8S1A4SyxLLE1TWSxIT1UsMjAyMC0xMi0xOVQwOTowMC0wNjowMCwyMDIwLTEyLTE5VDEwOjIwLTA2OjAwLFdOLFdOLDEyMTIsNzNIIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTItMTlUMDY6MzAtMDY6MDAsMjAyMC0xMi0xOVQwNzo1MC0wNjowMCxXTixXTiwxMjEsNzNXfEtQOEssSyxNU1ksSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoyMC0wNjowMCxXTixXTiwxMjEyLDczSCIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:20:2020-12-19',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMDc6MDAtMDY6MDAsMjAyMC0xMi0xOVQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLERBTCxIT1UsMjAyMC0xMi0xOVQwNzowMC0wNjowMCwyMDIwLTEyLTE5VDA4OjEwLTA2OjAwLFdOLFdOLDEsNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMDc6MDAtMDY6MDAsMjAyMC0xMi0xOVQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:2:2020-12-19',
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
          startingFromPrice: null,
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: 'Unavailable',
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: null,
          _meta: {
            cardId: 'DAL:HOU:0:2020-12-19',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 0,
            departureTime: '0800'
          },
          isNextDayArrival: false,
          hasLowestFare: false
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsQVVTLDIwMjAtMTItMTlUMDg6MTAtMDY6MDAsMjAyMC0xMi0xOVQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfFlMNlksWSxBVVMsSE9VLDIwMjAtMTItMTlUMDk6NTUtMDY6MDAsMjAyMC0xMi0xOVQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI2OTUuMDgiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssREFMLEFVUywyMDIwLTEyLTE5VDA4OjEwLTA2OjAwLDIwMjAtMTItMTlUMDk6MTAtMDY6MDAsV04sV04sMTQ5LDczV3xLUDhLLEssQVVTLEhPVSwyMDIwLTEyLTE5VDA5OjU1LTA2OjAwLDIwMjAtMTItMTlUMTE6MDAtMDY6MDAsV04sV04sODUyLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMifX0=',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsQVVTLDIwMjAtMTItMTlUMDg6MTAtMDY6MDAsMjAyMC0xMi0xOVQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfEtQOEssSyxBVVMsSE9VLDIwMjAtMTItMTlUMDk6NTUtMDY6MDAsMjAyMC0xMi0xOVQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:16:2020-12-19',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsRUxQLDIwMjAtMTItMTlUMDg6MzAtMDY6MDAsMjAyMC0xMi0xOVQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNXfFlMNkwsWSxFTFAsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDc6MDAsMjAyMC0xMi0xOVQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNjY4LjIwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLERBTCxFTFAsMjAyMC0xMi0xOVQwODozMC0wNjowMCwyMDIwLTEyLTE5VDA5OjIwLTA3OjAwLFdOLFdOLDU3MCw3M1d8TFA4TCxMLEVMUCxIT1UsMjAyMC0xMi0xOVQxMDowMC0wNzowMCwyMDIwLTEyLTE5VDEyOjQ1LTA2OjAwLFdOLFdOLDE1MTEsNzNXIiwicXVvdGVkUHJpY2UiOiI2OTguMzAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsRUxQLDIwMjAtMTItMTlUMDg6MzAtMDY6MDAsMjAyMC0xMi0xOVQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNXfExQOEwsTCxFTFAsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDc6MDAsMjAyMC0xMi0xOVQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNjk4LjMwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:24:2020-12-19',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLERBTCxIT1UsMjAyMC0xMi0xOVQwOTowMC0wNjowMCwyMDIwLTEyLTE5VDEwOjE1LTA2OjAwLFdOLFdOLDksNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:9:2020-12-19',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsU0FULDIwMjAtMTItMTlUMDk6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMDozNS0wNjowMCxXTixXTiw2MzksNzNXfFlMNlksWSxTQVQsSE9VLDIwMjAtMTItMTlUMTI6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI2OTUuMDgiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssREFMLFNBVCwyMDIwLTEyLTE5VDA5OjI1LTA2OjAwLDIwMjAtMTItMTlUMTA6MzUtMDY6MDAsV04sV04sNjM5LDczV3xLUDhLLEssU0FULEhPVSwyMDIwLTEyLTE5VDEyOjI1LTA2OjAwLDIwMjAtMTItMTlUMTM6MzAtMDY6MDAsV04sV04sNjUyLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMifX0=',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMTlUMDk6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMDozNS0wNjowMCxXTixXTiw2MzksNzNXfEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMTlUMTI6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:22:2020-12-19',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:3:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:10:2020-12-19',
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
                productId: 'roundTrip_DAL2HOUPass8_USD',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:11:2020-12-19',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:4:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixEQUwsTVNZLDIwMjAtMTItMTlUMTM6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfFZMQTBWMkgsVixNU1ksSE9VLDIwMjAtMTItMTlUMTU6NDAtMDY6MDAsMjAyMC0xMi0xOVQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTItMTlUMTM6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfFlMNlksWSxNU1ksSE9VLDIwMjAtMTItMTlUMTU6NDAtMDY6MDAsMjAyMC0xMi0xOVQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxNU1ksMjAyMC0xMi0xOVQxMzoxNS0wNjowMCwyMDIwLTEyLTE5VDE0OjM1LTA2OjAwLFdOLFdOLDU3MSw3M1d8S1A4SyxLLE1TWSxIT1UsMjAyMC0xMi0xOVQxNTo0MC0wNjowMCwyMDIwLTEyLTE5VDE3OjAwLTA2OjAwLFdOLFdOLDI0NTQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTItMTlUMTM6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfEtQOEssSyxNU1ksSE9VLDIwMjAtMTItMTlUMTU6NDAtMDY6MDAsMjAyMC0xMi0xOVQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:19:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixEQUwsU0FULDIwMjAtMTItMTlUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOVQxNDozMC0wNjowMCxXTixXTiw2NDAsN004fFZMQTBWMkgsVixTQVQsSE9VLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoxNS0wNjowMCxXTixXTiw0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjM0NS43MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsU0FULDIwMjAtMTItMTlUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOVQxNDozMC0wNjowMCxXTixXTiw2NDAsN004fFlMNlksWSxTQVQsSE9VLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoxNS0wNjowMCxXTixXTiw0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjY5NS4wOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMTlUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOVQxNDozMC0wNjowMCxXTixXTiw2NDAsN004fEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoxNS0wNjowMCxXTixXTiw0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMTlUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOVQxNDozMC0wNjowMCxXTixXTiw2NDAsN004fEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoxNS0wNjowMCxXTixXTiw0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:17:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNToxNS0wNjowMCxXTixXTiwzMSw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNToxNS0wNjowMCxXTixXTiwzMSw3M0giLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNToxNS0wNjowMCxXTixXTiwzMSw3M0giLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNToxNS0wNjowMCxXTixXTiwzMSw3M0giLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:12:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixEQUwsU0FULDIwMjAtMTItMTlUMTQ6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNToyNS0wNjowMCxXTixXTiwyNjAsN004fFZMQTBWMkgsVixTQVQsSE9VLDIwMjAtMTItMTlUMTc6MDUtMDY6MDAsMjAyMC0xMi0xOVQxODowNS0wNjowMCxXTixXTiw3MDYsN004IiwicXVvdGVkUHJpY2UiOiIzNDUuNzAiLCJmYXJlVHlwZSI6IldHQSIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsU0FULDIwMjAtMTItMTlUMTQ6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNToyNS0wNjowMCxXTixXTiwyNjAsN004fFlMNlksWSxTQVQsSE9VLDIwMjAtMTItMTlUMTc6MDUtMDY6MDAsMjAyMC0xMi0xOVQxODowNS0wNjowMCxXTixXTiw3MDYsN004IiwicXVvdGVkUHJpY2UiOiI2OTUuMDgiLCJmYXJlVHlwZSI6IkFOWSIsImludGVybmF0aW9uYWwiOmZhbHNlLCJ1cHNlbGwiOnsicHJvZHVjdElkIjoiQlVTfEFEVHxLUDhLLEssREFMLFNBVCwyMDIwLTEyLTE5VDE0OjE1LTA2OjAwLDIwMjAtMTItMTlUMTU6MjUtMDY6MDAsV04sV04sMjYwLDdNOHxLUDhLLEssU0FULEhPVSwyMDIwLTEyLTE5VDE3OjA1LTA2OjAwLDIwMjAtMTItMTlUMTg6MDUtMDY6MDAsV04sV04sNzA2LDdNOCIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMifX0=',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsU0FULDIwMjAtMTItMTlUMTQ6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNToyNS0wNjowMCxXTixXTiwyNjAsN004fEtQOEssSyxTQVQsSE9VLDIwMjAtMTItMTlUMTc6MDUtMDY6MDAsMjAyMC0xMi0xOVQxODowNS0wNjowMCxXTixXTiw3MDYsN004IiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:21:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNjoyMC0wNjowMCxXTixXTiwzNSw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNjoyMC0wNjowMCxXTixXTiwzNSw3M0giLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNjoyMC0wNjowMCxXTixXTiwzNSw3M0giLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNjoyMC0wNjowMCxXTixXTiwzNSw3M0giLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:15:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixEQUwsQVVTLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczSHxWTEEwVjJILFYsQVVTLEhPVSwyMDIwLTEyLTE5VDE3OjIwLTA2OjAwLDIwMjAtMTItMTlUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsQVVTLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczSHxZTDZZLFksQVVTLEhPVSwyMDIwLTEyLTE5VDE3OjIwLTA2OjAwLDIwMjAtMTItMTlUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxBVVMsMjAyMC0xMi0xOVQxNToxNS0wNjowMCwyMDIwLTEyLTE5VDE2OjI1LTA2OjAwLFdOLFdOLDE3MTcsNzNIfEtQOEssSyxBVVMsSE9VLDIwMjAtMTItMTlUMTc6MjAtMDY6MDAsMjAyMC0xMi0xOVQxODoyMC0wNjowMCxXTixXTiw1MDIsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsQVVTLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczSHxLUDhLLEssQVVTLEhPVSwyMDIwLTEyLTE5VDE3OjIwLTA2OjAwLDIwMjAtMTItMTlUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:18:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:13:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixEQUwsTVNZLDIwMjAtMTItMTlUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOVQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfFZMQTBWMkgsVixNU1ksSE9VLDIwMjAtMTItMTlUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOVQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTItMTlUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOVQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfFlMNlksWSxNU1ksSE9VLDIwMjAtMTItMTlUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOVQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxNU1ksMjAyMC0xMi0xOVQxNjozMC0wNjowMCwyMDIwLTEyLTE5VDE3OjU1LTA2OjAwLFdOLFdOLDEzOCw3M1d8S1A4SyxLLE1TWSxIT1UsMjAyMC0xMi0xOVQxOToyNS0wNjowMCwyMDIwLTEyLTE5VDIwOjQ1LTA2OjAwLFdOLFdOLDEzMDksNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTItMTlUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOVQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfEtQOEssSyxNU1ksSE9VLDIwMjAtMTItMTlUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOVQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:25:2020-12-19',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOVQxODoxNS0wNjowMCxXTixXTiw0Myw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOVQxODoxNS0wNjowMCxXTixXTiw0Myw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOVQxODoxNS0wNjowMCxXTixXTiw0Myw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOVQxODoxNS0wNjowMCxXTixXTiw0Myw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:14:2020-12-19',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:5:2020-12-19',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixEQUwsTVNZLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczSHxWTEEwVjJILFYsTVNZLEhPVSwyMDIwLTEyLTE5VDIwOjQ1LTA2OjAwLDIwMjAtMTItMTlUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxEQUwsTVNZLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczSHxZTDZZLFksTVNZLEhPVSwyMDIwLTEyLTE5VDIwOjQ1LTA2OjAwLDIwMjAtMTItMTlUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLERBTCxNU1ksMjAyMC0xMi0xOVQxODowMC0wNjowMCwyMDIwLTEyLTE5VDE5OjE1LTA2OjAwLFdOLFdOLDE2NDYsNzNIfEtQOEssSyxNU1ksSE9VLDIwMjAtMTItMTlUMjA6NDUtMDY6MDAsMjAyMC0xMi0xOVQyMjoxMC0wNjowMCxXTixXTiw4NDksNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxEQUwsTVNZLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczSHxLUDhLLEssTVNZLEhPVSwyMDIwLTEyLTE5VDIwOjQ1LTA2OjAwLDIwMjAtMTItMTlUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:23:2020-12-19',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOVQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOVQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOVQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOVQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:6:2020-12-19',
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
                productId:
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:7:2020-12-19',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixEQUwsSE9VLDIwMjAtMTItMTlUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxEQUwsSE9VLDIwMjAtMTItMTlUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjY1OS40MCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxEQUwsSE9VLDIwMjAtMTItMTlUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjY4OS41MCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:8:2020-12-19',
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
      header: { airportInfo: 'HOU - DAL', selectedDate: '2020-12-22', originAirport: 'HOU', destinationAirport: 'DAL' },
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMlQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMlQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiNjg2LjI4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxEQUwsMjAyMC0xMi0yMlQwNjowMC0wNjowMCwyMDIwLTEyLTIyVDA3OjAwLTA2OjAwLFdOLFdOLDE2MzYsNzNXIiwicXVvdGVkUHJpY2UiOiI3MTYuMzgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMlQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiNzE2LjM4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:2:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMlQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMlQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiNjg2LjI4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxEQUwsMjAyMC0xMi0yMlQwNzowMC0wNjowMCwyMDIwLTEyLTIyVDA4OjA1LTA2OjAwLFdOLFdOLDQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MTYuMzgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMlQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiNzE2LjM4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:7:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMlQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMlQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiNjg2LjI4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxEQUwsMjAyMC0xMi0yMlQwODowMC0wNjowMCwyMDIwLTEyLTIyVDA5OjAwLTA2OjAwLFdOLFdOLDgsNzNIIiwicXVvdGVkUHJpY2UiOiI3MTYuMzgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMlQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiNzE2LjM4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:3:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:13:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:14:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixIT1UsQVVTLDIwMjAtMTItMjJUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMlQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xWTEEwVjJILFYsQVVTLERBTCwyMDIwLTEyLTIyVDEzOjA1LTA2OjAwLDIwMjAtMTItMjJUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjM0NS43MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsQVVTLDIwMjAtMTItMjJUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMlQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xZTDZZLFksQVVTLERBTCwyMDIwLTEyLTIyVDEzOjA1LTA2OjAwLDIwMjAtMTItMjJUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjY5NS4wOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjJUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMlQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xLUDhLLEssQVVTLERBTCwyMDIwLTEyLTIyVDEzOjA1LTA2OjAwLDIwMjAtMTItMjJUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjJUMTA6NTUtMDY6MDAsMjAyMC0xMi0yMlQxMTo1NS0wNjowMCxXTixXTiwxMjEyLDczV3xLUDhLLEssQVVTLERBTCwyMDIwLTEyLTIyVDEzOjA1LTA2OjAwLDIwMjAtMTItMjJUMTQ6MDUtMDY6MDAsV04sV04sMjAxNiw3M1ciLCJxdW90ZWRQcmljZSI6IjcyNS4xOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:23:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:18:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzoxMC0wNjowMCxXTixXTiwyNCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:15:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxIT1UsREFMLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLEhPVSxEQUwsMjAyMC0xMi0yMlQxMzowMC0wNjowMCwyMDIwLTEyLTIyVDEzOjM1LTA2OjAwLFdOLFdOLDk2OTEsNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxIT1UsREFMLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:0:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:16:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixIT1UsU0FULDIwMjAtMTItMjJUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xWTEEwVjJILFYsU0FULERBTCwyMDIwLTEyLTIyVDE0OjUwLTA2OjAwLDIwMjAtMTItMjJUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsU0FULDIwMjAtMTItMjJUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xZTDZZLFksU0FULERBTCwyMDIwLTEyLTIyVDE0OjUwLTA2OjAwLDIwMjAtMTItMjJUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxTQVQsMjAyMC0xMi0yMlQxMzoxNS0wNjowMCwyMDIwLTEyLTIyVDE0OjE1LTA2OjAwLFdOLFdOLDEzNDYsNzNXfEtQOEssSyxTQVQsREFMLDIwMjAtMTItMjJUMTQ6NTAtMDY6MDAsMjAyMC0xMi0yMlQxNTo1NS0wNjowMCxXTixXTiw0OTAsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsU0FULDIwMjAtMTItMjJUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xLUDhLLEssU0FULERBTCwyMDIwLTEyLTIyVDE0OjUwLTA2OjAwLDIwMjAtMTItMjJUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:20:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:17:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:8:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixIT1UsQVVTLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoxNS0wNjowMCxXTixXTiw1NjgsNzNXfFZMQTBWMkgsVixBVVMsREFMLDIwMjAtMTItMjJUMTc6MTAtMDY6MDAsMjAyMC0xMi0yMlQxODoxNS0wNjowMCxXTixXTiwxNzE4LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsQVVTLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoxNS0wNjowMCxXTixXTiw1NjgsNzNXfFlMNlksWSxBVVMsREFMLDIwMjAtMTItMjJUMTc6MTAtMDY6MDAsMjAyMC0xMi0yMlQxODoxNS0wNjowMCxXTixXTiwxNzE4LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMi0yMlQxNToxNS0wNjowMCwyMDIwLTEyLTIyVDE2OjE1LTA2OjAwLFdOLFdOLDU2OCw3M1d8S1A4SyxLLEFVUyxEQUwsMjAyMC0xMi0yMlQxNzoxMC0wNjowMCwyMDIwLTEyLTIyVDE4OjE1LTA2OjAwLFdOLFdOLDE3MTgsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoxNS0wNjowMCxXTixXTiw1NjgsNzNXfEtQOEssSyxBVVMsREFMLDIwMjAtMTItMjJUMTc6MTAtMDY6MDAsMjAyMC0xMi0yMlQxODoxNS0wNjowMCxXTixXTiwxNzE4LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:22:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:9:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixIT1UsU0FULDIwMjAtMTItMjJUMTY6MDUtMDY6MDAsMjAyMC0xMi0yMlQxNzowNS0wNjowMCxXTixXTiwyMDAsNzNXfFZMQTBWMkgsVixTQVQsREFMLDIwMjAtMTItMjJUMTg6NDAtMDY6MDAsMjAyMC0xMi0yMlQxOTo0MC0wNjowMCxXTixXTiwxNjI2LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsU0FULDIwMjAtMTItMjJUMTY6MDUtMDY6MDAsMjAyMC0xMi0yMlQxNzowNS0wNjowMCxXTixXTiwyMDAsNzNXfFlMNlksWSxTQVQsREFMLDIwMjAtMTItMjJUMTg6NDAtMDY6MDAsMjAyMC0xMi0yMlQxOTo0MC0wNjowMCxXTixXTiwxNjI2LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxTQVQsMjAyMC0xMi0yMlQxNjowNS0wNjowMCwyMDIwLTEyLTIyVDE3OjA1LTA2OjAwLFdOLFdOLDIwMCw3M1d8S1A4SyxLLFNBVCxEQUwsMjAyMC0xMi0yMlQxODo0MC0wNjowMCwyMDIwLTEyLTIyVDE5OjQwLTA2OjAwLFdOLFdOLDE2MjYsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsU0FULDIwMjAtMTItMjJUMTY6MDUtMDY6MDAsMjAyMC0xMi0yMlQxNzowNS0wNjowMCxXTixXTiwyMDAsNzNXfEtQOEssSyxTQVQsREFMLDIwMjAtMTItMjJUMTg6NDAtMDY6MDAsMjAyMC0xMi0yMlQxOTo0MC0wNjowMCxXTixXTiwxNjI2LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:25:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMlQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMlQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMlQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMlQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:4:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:10:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixIT1UsTVNZLDIwMjAtMTItMjJUMTg6MjAtMDY6MDAsMjAyMC0xMi0yMlQxOToyNS0wNjowMCxXTixXTiwxNjYsNzNXfFZMQTBWMkgsVixNU1ksREFMLDIwMjAtMTItMjJUMjA6MTAtMDY6MDAsMjAyMC0xMi0yMlQyMTozNS0wNjowMCxXTixXTiwxMTA0LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsTVNZLDIwMjAtMTItMjJUMTg6MjAtMDY6MDAsMjAyMC0xMi0yMlQxOToyNS0wNjowMCxXTixXTiwxNjYsNzNXfFlMNlksWSxNU1ksREFMLDIwMjAtMTItMjJUMjA6MTAtMDY6MDAsMjAyMC0xMi0yMlQyMTozNS0wNjowMCxXTixXTiwxMTA0LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxNU1ksMjAyMC0xMi0yMlQxODoyMC0wNjowMCwyMDIwLTEyLTIyVDE5OjI1LTA2OjAwLFdOLFdOLDE2Niw3M1d8S1A4SyxLLE1TWSxEQUwsMjAyMC0xMi0yMlQyMDoxMC0wNjowMCwyMDIwLTEyLTIyVDIxOjM1LTA2OjAwLFdOLFdOLDExMDQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsTVNZLDIwMjAtMTItMjJUMTg6MjAtMDY6MDAsMjAyMC0xMi0yMlQxOToyNS0wNjowMCxXTixXTiwxNjYsNzNXfEtQOEssSyxNU1ksREFMLDIwMjAtMTItMjJUMjA6MTAtMDY6MDAsMjAyMC0xMi0yMlQyMTozNS0wNjowMCxXTixXTiwxMTA0LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:24:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixIT1UsQVVTLDIwMjAtMTItMjJUMTg6MzUtMDY6MDAsMjAyMC0xMi0yMlQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xWTEEwVjJILFYsQVVTLERBTCwyMDIwLTEyLTIyVDIwOjA1LTA2OjAwLDIwMjAtMTItMjJUMjE6MTAtMDY6MDAsV04sV04sNzgwLDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsQVVTLDIwMjAtMTItMjJUMTg6MzUtMDY6MDAsMjAyMC0xMi0yMlQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xZTDZZLFksQVVTLERBTCwyMDIwLTEyLTIyVDIwOjA1LTA2OjAwLDIwMjAtMTItMjJUMjE6MTAtMDY6MDAsV04sV04sNzgwLDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxBVVMsMjAyMC0xMi0yMlQxODozNS0wNjowMCwyMDIwLTEyLTIyVDE5OjI1LTA2OjAwLFdOLFdOLDE2NTMsNzNXfEtQOEssSyxBVVMsREFMLDIwMjAtMTItMjJUMjA6MDUtMDY6MDAsMjAyMC0xMi0yMlQyMToxMC0wNjowMCxXTixXTiw3ODAsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsQVVTLDIwMjAtMTItMjJUMTg6MzUtMDY6MDAsMjAyMC0xMi0yMlQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xLUDhLLEssQVVTLERBTCwyMDIwLTEyLTIyVDIwOjA1LTA2OjAwLDIwMjAtMTItMjJUMjE6MTAtMDY6MDAsV04sV04sNzgwLDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:19:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:5:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxIT1UsREFMLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLEhPVSxEQUwsMjAyMC0xMi0yMlQxOTowMC0wNjowMCwyMDIwLTEyLTIyVDIwOjA1LTA2OjAwLFdOLFdOLDk1NzIsNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxIT1UsREFMLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:11:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMQTBWMkgsVixIT1UsU0FULDIwMjAtMTItMjJUMTk6MDUtMDY6MDAsMjAyMC0xMi0yMlQyMDowNS0wNjowMCxXTixXTiwxNzA5LDczV3xWTEEwVjJILFYsU0FULERBTCwyMDIwLTEyLTIyVDIwOjU1LTA2OjAwLDIwMjAtMTItMjJUMjE6NTUtMDY6MDAsV04sV04sNjk0LDczVyIsInF1b3RlZFByaWNlIjoiMzQ1LjcwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsU0FULDIwMjAtMTItMjJUMTk6MDUtMDY6MDAsMjAyMC0xMi0yMlQyMDowNS0wNjowMCxXTixXTiwxNzA5LDczV3xZTDZZLFksU0FULERBTCwyMDIwLTEyLTIyVDIwOjU1LTA2OjAwLDIwMjAtMTItMjJUMjE6NTUtMDY6MDAsV04sV04sNjk0LDczVyIsInF1b3RlZFByaWNlIjoiNjk1LjA4IiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8S1A4SyxLLEhPVSxTQVQsMjAyMC0xMi0yMlQxOTowNS0wNjowMCwyMDIwLTEyLTIyVDIwOjA1LTA2OjAwLFdOLFdOLDE3MDksNzNXfEtQOEssSyxTQVQsREFMLDIwMjAtMTItMjJUMjA6NTUtMDY6MDAsMjAyMC0xMi0yMlQyMTo1NS0wNjowMCxXTixXTiw2OTQsNzNXIiwicXVvdGVkUHJpY2UiOiI3MjUuMTgiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsU0FULDIwMjAtMTItMjJUMTk6MDUtMDY6MDAsMjAyMC0xMi0yMlQyMDowNS0wNjowMCxXTixXTiwxNzA5LDczV3xLUDhLLEssU0FULERBTCwyMDIwLTEyLTIyVDIwOjU1LTA2OjAwLDIwMjAtMTItMjJUMjE6NTUtMDY6MDAsV04sV04sNjk0LDczVyIsInF1b3RlZFByaWNlIjoiNzI1LjE4IiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:21:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMjA6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiMzM2LjkwIiwiZmFyZVR5cGUiOiJXR0EiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNkwsWSxIT1UsREFMLDIwMjAtMTItMjJUMjA6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiNjU5LjQwIiwiZmFyZVR5cGUiOiJBTlkiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZSwidXBzZWxsIjp7InByb2R1Y3RJZCI6IkJVU3xBRFR8TFA4TCxMLEhPVSxEQUwsMjAyMC0xMi0yMlQyMDowMC0wNjowMCwyMDIwLTEyLTIyVDIwOjQ1LTA2OjAwLFdOLFdOLDk2ODksNzNXIiwicXVvdGVkUHJpY2UiOiI2ODkuNTAiLCJmYXJlVHlwZSI6IkJVUyJ9fQ==',
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
                  'dal2houPass8_roundTripJCVVN8QURUfExQOEwsTCxIT1UsREFMLDIwMjAtMTItMjJUMjA6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiNjg5LjUwIiwiZmFyZVR5cGUiOiJCVVMiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:1:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:12:2020-12-22',
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
                  'dal2houPass8_roundTripJXR0F8QURUfFZMTjBWMkgsVixIT1UsREFMLDIwMjAtMTItMjJUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjMzNi45MCIsImZhcmVUeXBlIjoiV0dBIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPass8_roundTripJBTll8QURUfFlMNlksWSxIT1UsREFMLDIwMjAtMTItMjJUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjY4Ni4yOCIsImZhcmVUeXBlIjoiQU5ZIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2UsInVwc2VsbCI6dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIn19',
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
                  'dal2houPass8_roundTripJCVVN8QURUfEtQOEssSyxIT1UsREFMLDIwMjAtMTItMjJUMjI6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjcxNi4zOCIsImZhcmVUeXBlIjoiQlVTIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:6:2020-12-22',
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
      userExperienceId: 'e9606ef8-cbad-4356-b354-1ad23c29bd34',
      requestId: 'RKOQ3nlzQS2AUv89O3A0Mw',
      channelId: 'mweb'
    }
  }
};
