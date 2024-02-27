const productDefinitions = require('mocks/templates//productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = {
  flightShoppingPage: {
    productDefinitions,
    messages: [],
    showSgaMessage: false,
    promoCodeNotice: null,
    pointsDisclaimer:
      'Reward travel is subject to payment of Government and airport-imposed taxes and fees and can vary based on your arrival and departure airports.',
    disclaimerWithLinks:
      'Reward travel is subject to payment of the government-imposed September 11th Security Fee of $5.60 per one-way trip.',
    outboundPage: {
      header: { airportInfo: 'DAL - HOU', selectedDate: '2020-12-22', originAirport: 'DAL', destinationAirport: 'HOU' },
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMlQwNzoxMC0wNjowMCxXTixXTiwxNjI4LDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMDY6MDAtMDY6MDAsMjAyMC0xMi0yMlQwNzoxMC0wNjowMCxXTixXTiwxNjI4LDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:0:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMjJUMDY6MzAtMDY6MDAsMjAyMC0xMi0yMlQwNzo1MC0wNjowMCxXTixXTiwxMjEsNzNXfFlGRjYsWSxNU1ksSE9VLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoyMC0wNjowMCxXTixXTiwxMjEyLDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMjJUMDY6MzAtMDY6MDAsMjAyMC0xMi0yMlQwNzo1MC0wNjowMCxXTixXTiwxMjEsNzNXfEtGRjgsSyxNU1ksSE9VLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoyMC0wNjowMCxXTixXTiwxMjEyLDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:20:2020-12-22',
            durationMinutes: 230,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '0630'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMlQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMDc6MDAtMDY6MDAsMjAyMC0xMi0yMlQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:1:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMlQwOToxNS0wNjowMCxXTixXTiw1LDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMDg6MDAtMDY6MDAsMjAyMC0xMi0yMlQwOToxNS0wNjowMCxXTixXTiw1LDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:8:2020-12-22',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsQVVTLDIwMjAtMTItMjJUMDg6MTAtMDY6MDAsMjAyMC0xMi0yMlQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfFlGRjYsWSxBVVMsSE9VLDIwMjAtMTItMjJUMDk6NTUtMDY6MDAsMjAyMC0xMi0yMlQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNIIiwicXVvdGVkUHJpY2UiOiI0ODc1MCIsImZhcmVUeXBlIjoiQU5ZUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsQVVTLDIwMjAtMTItMjJUMDg6MTAtMDY6MDAsMjAyMC0xMi0yMlQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfEtGRjgsSyxBVVMsSE9VLDIwMjAtMTItMjJUMDk6NTUtMDY6MDAsMjAyMC0xMi0yMlQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNIIiwicXVvdGVkUHJpY2UiOiI1MDkzNCIsImZhcmVUeXBlIjoiQlVTUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:16:2020-12-22',
            durationMinutes: 170,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '0810'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsRUxQLDIwMjAtMTItMjJUMDg6MzAtMDY6MDAsMjAyMC0xMi0yMlQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNXfFlGRjYsWSxFTFAsSE9VLDIwMjAtMTItMjJUMTA6MDAtMDc6MDAsMjAyMC0xMi0yMlQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsRUxQLDIwMjAtMTItMjJUMDg6MzAtMDY6MDAsMjAyMC0xMi0yMlQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNXfExGRjgsTCxFTFAsSE9VLDIwMjAtMTItMjJUMTA6MDAtMDc6MDAsMjAyMC0xMi0yMlQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:24:2020-12-22',
            durationMinutes: 255,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '0830'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMDk6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:9:2020-12-22',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsU0FULDIwMjAtMTItMjJUMDk6MjUtMDY6MDAsMjAyMC0xMi0yMlQxMDozNS0wNjowMCxXTixXTiw2MzksNzNXfFlGRjYsWSxTQVQsSE9VLDIwMjAtMTItMjJUMTI6MjUtMDY6MDAsMjAyMC0xMi0yMlQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNIIiwicXVvdGVkUHJpY2UiOiI0ODc1MCIsImZhcmVUeXBlIjoiQU5ZUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsU0FULDIwMjAtMTItMjJUMDk6MjUtMDY6MDAsMjAyMC0xMi0yMlQxMDozNS0wNjowMCxXTixXTiw2MzksNzNXfEtGRjgsSyxTQVQsSE9VLDIwMjAtMTItMjJUMTI6MjUtMDY6MDAsMjAyMC0xMi0yMlQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNIIiwicXVvdGVkUHJpY2UiOiI1MDkzNCIsImZhcmVUeXBlIjoiQlVTUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:22:2020-12-22',
            durationMinutes: 245,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '0925'
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
          flightNumbers: '15',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMToxMC0wNjowMCxXTixXTiwxNSw3MzgiLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTA6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMToxMC0wNjowMCxXTixXTiwxNSw3MzgiLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:2:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMjoxNS0wNjowMCxXTixXTiwxOSw3M0giLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTE6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMjoxNS0wNjowMCxXTixXTiwxOSw3M0giLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:10:2020-12-22',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTI6MDAtMDY6MDAsMjAyMC0xMi0yMlQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:11:2020-12-22',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTM6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:3:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMjJUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfFlGRjYsWSxNU1ksSE9VLDIwMjAtMTItMjJUMTU6NDAtMDY6MDAsMjAyMC0xMi0yMlQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMjJUMTM6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfEtGRjgsSyxNU1ksSE9VLDIwMjAtMTItMjJUMTU6NDAtMDY6MDAsMjAyMC0xMi0yMlQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:19:2020-12-22',
            durationMinutes: 225,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1315'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsU0FULDIwMjAtMTItMjJUMTM6MjUtMDY6MDAsMjAyMC0xMi0yMlQxNDozMC0wNjowMCxXTixXTiw2NDAsNzNXfFlGRjYsWSxTQVQsSE9VLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoxNS0wNjowMCxXTixXTiw0NCw3MzgiLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsU0FULDIwMjAtMTItMjJUMTM6MjUtMDY6MDAsMjAyMC0xMi0yMlQxNDozMC0wNjowMCxXTixXTiw2NDAsNzNXfEtGRjgsSyxTQVQsSE9VLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoxNS0wNjowMCxXTixXTiw0NCw3MzgiLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:17:2020-12-22',
            durationMinutes: 170,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1325'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNToxNS0wNjowMCxXTixXTiwzMSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNToxNS0wNjowMCxXTixXTiwzMSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:12:2020-12-22',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsU0FULDIwMjAtMTItMjJUMTQ6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNToyNS0wNjowMCxXTixXTiwyNjAsNzNXfFlGRjYsWSxTQVQsSE9VLDIwMjAtMTItMjJUMTc6MDUtMDY6MDAsMjAyMC0xMi0yMlQxODowNS0wNjowMCxXTixXTiw3MDYsNzNXIiwicXVvdGVkUHJpY2UiOiI0ODc1MCIsImZhcmVUeXBlIjoiQU5ZUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsU0FULDIwMjAtMTItMjJUMTQ6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNToyNS0wNjowMCxXTixXTiwyNjAsNzNXfEtGRjgsSyxTQVQsSE9VLDIwMjAtMTItMjJUMTc6MDUtMDY6MDAsMjAyMC0xMi0yMlQxODowNS0wNjowMCxXTixXTiw3MDYsNzNXIiwicXVvdGVkUHJpY2UiOiI1MDkzNCIsImZhcmVUeXBlIjoiQlVTUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:21:2020-12-22',
            durationMinutes: 230,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1415'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId: 'roundTrip_DAL2HOUPass1_PTS',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNjoyMC0wNjowMCxXTixXTiwzNSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTU6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNjoyMC0wNjowMCxXTixXTiwzNSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:15:2020-12-22',
            durationMinutes: 80,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsQVVTLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczV3xWRkYyLFYsQVVTLEhPVSwyMDIwLTEyLTIyVDE3OjIwLTA2OjAwLDIwMjAtMTItMjJUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczSCIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsQVVTLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczV3xZRkY2LFksQVVTLEhPVSwyMDIwLTEyLTIyVDE3OjIwLTA2OjAwLDIwMjAtMTItMjJUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczSCIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsQVVTLDIwMjAtMTItMjJUMTU6MTUtMDY6MDAsMjAyMC0xMi0yMlQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczV3xLRkY4LEssQVVTLEhPVSwyMDIwLTEyLTIyVDE3OjIwLTA2OjAwLDIwMjAtMTItMjJUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczSCIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:18:2020-12-22',
            durationMinutes: 185,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1515'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMjJUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTY6MDAtMDY6MDAsMjAyMC0xMi0yMlQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:13:2020-12-22',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsTVNZLDIwMjAtMTItMjJUMTY6MzAtMDY6MDAsMjAyMC0xMi0yMlQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNIfFZGRjIsVixNU1ksSE9VLDIwMjAtMTItMjJUMTk6MjUtMDY6MDAsMjAyMC0xMi0yMlQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMjJUMTY6MzAtMDY6MDAsMjAyMC0xMi0yMlQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNIfFlGRjYsWSxNU1ksSE9VLDIwMjAtMTItMjJUMTk6MjUtMDY6MDAsMjAyMC0xMi0yMlQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMjJUMTY6MzAtMDY6MDAsMjAyMC0xMi0yMlQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNIfEtGRjgsSyxNU1ksSE9VLDIwMjAtMTItMjJUMTk6MjUtMDY6MDAsMjAyMC0xMi0yMlQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:25:2020-12-22',
            durationMinutes: 255,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1630'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMjJUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMlQxODoxNS0wNjowMCxXTixXTiw0Myw3M0giLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMlQxODoxNS0wNjowMCxXTixXTiw0Myw3M0giLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTc6MDAtMDY6MDAsMjAyMC0xMi0yMlQxODoxNS0wNjowMCxXTixXTiw0Myw3M0giLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:14:2020-12-22',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:4:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsTVNZLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczV3xWRkYyLFYsTVNZLEhPVSwyMDIwLTEyLTIyVDIwOjQ1LTA2OjAwLDIwMjAtMTItMjJUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczV3xZRkY2LFksTVNZLEhPVSwyMDIwLTEyLTIyVDIwOjQ1LTA2OjAwLDIwMjAtMTItMjJUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMjJUMTg6MDAtMDY6MDAsMjAyMC0xMi0yMlQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczV3xLRkY4LEssTVNZLEhPVSwyMDIwLTEyLTIyVDIwOjQ1LTA2OjAwLDIwMjAtMTItMjJUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:23:2020-12-22',
            durationMinutes: 250,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1800'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMTk6MDAtMDY6MDAsMjAyMC0xMi0yMlQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:5:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMjJUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMjA6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:6:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMjJUMjE6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMjJUMjE6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMjJUMjE6MzAtMDY6MDAsMjAyMC0xMi0yMlQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:7:2020-12-22',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '2130'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        }
      ]
    },
    inboundPage: {
      header: { airportInfo: 'HOU - DAL', selectedDate: '2020-12-25', originAirport: 'HOU', destinationAirport: 'DAL' },
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMDY6MDAtMDY6MDAsMjAyMC0xMi0yNVQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMDY6MDAtMDY6MDAsMjAyMC0xMi0yNVQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMDY6MDAtMDY6MDAsMjAyMC0xMi0yNVQwNzowMC0wNjowMCxXTixXTiwxNjM2LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:2:2020-12-25',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMDc6MDAtMDY6MDAsMjAyMC0xMi0yNVQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMDc6MDAtMDY6MDAsMjAyMC0xMi0yNVQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMDc6MDAtMDY6MDAsMjAyMC0xMi0yNVQwODowNS0wNjowMCxXTixXTiw0LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:7:2020-12-25',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMDg6MDAtMDY6MDAsMjAyMC0xMi0yNVQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMDg6MDAtMDY6MDAsMjAyMC0xMi0yNVQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMDg6MDAtMDY6MDAsMjAyMC0xMi0yNVQwOTowMC0wNjowMCxXTixXTiw4LDczSCIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:3:2020-12-25',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '0800'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '08:25',
          arrivalTime: '12:25',
          duration: '4h 0m',
          stopDescription: '1 Stop, SAT',
          stopDescriptionOnSelect: '1 Stop, Change planes SAT',
          shortStopDescription: '1 Stop',
          stopCity: 'SAT',
          flightNumbers: '3186/855',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsU0FULDIwMjAtMTItMjVUMDg6MjUtMDY6MDAsMjAyMC0xMi0yNVQwOToyNS0wNjowMCxXTixXTiwzMTg2LDczV3xWRkYyLFYsU0FULERBTCwyMDIwLTEyLTI1VDExOjE1LTA2OjAwLDIwMjAtMTItMjVUMTI6MjUtMDY6MDAsV04sV04sODU1LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsU0FULDIwMjAtMTItMjVUMDg6MjUtMDY6MDAsMjAyMC0xMi0yNVQwOToyNS0wNjowMCxXTixXTiwzMTg2LDczV3xZRkY2LFksU0FULERBTCwyMDIwLTEyLTI1VDExOjE1LTA2OjAwLDIwMjAtMTItMjVUMTI6MjUtMDY6MDAsV04sV04sODU1LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsU0FULDIwMjAtMTItMjVUMDg6MjUtMDY6MDAsMjAyMC0xMi0yNVQwOToyNS0wNjowMCxXTixXTiwzMTg2LDczV3xLRkY4LEssU0FULERBTCwyMDIwLTEyLTI1VDExOjE1LTA2OjAwLDIwMjAtMTItMjVUMTI6MjUtMDY6MDAsV04sV04sODU1LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:23:2020-12-25',
            durationMinutes: 240,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '0825'
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMDk6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMDk6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMDk6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMDoxMC0wNjowMCxXTixXTiwxMiw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:13:2020-12-25',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTA6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTA6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTA6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMToxMC0wNjowMCxXTixXTiwxNiw3M0giLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:14:2020-12-25',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '1000'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:55',
          arrivalTime: '14:10',
          duration: '3h 15m',
          stopDescription: '1 Stop, AUS',
          stopDescriptionOnSelect: '1 Stop, Change planes AUS',
          shortStopDescription: '1 Stop',
          stopCity: 'AUS',
          flightNumbers: '1812/2466',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsQVVTLDIwMjAtMTItMjVUMTA6NTUtMDY6MDAsMjAyMC0xMi0yNVQxMTo1NS0wNjowMCxXTixXTiwxODEyLDczV3xWRkYyLFYsQVVTLERBTCwyMDIwLTEyLTI1VDEzOjEwLTA2OjAwLDIwMjAtMTItMjVUMTQ6MTAtMDY6MDAsV04sV04sMjQ2Niw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsQVVTLDIwMjAtMTItMjVUMTA6NTUtMDY6MDAsMjAyMC0xMi0yNVQxMTo1NS0wNjowMCxXTixXTiwxODEyLDczV3xZRkY2LFksQVVTLERBTCwyMDIwLTEyLTI1VDEzOjEwLTA2OjAwLDIwMjAtMTItMjVUMTQ6MTAtMDY6MDAsV04sV04sMjQ2Niw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsQVVTLDIwMjAtMTItMjVUMTA6NTUtMDY6MDAsMjAyMC0xMi0yNVQxMTo1NS0wNjowMCxXTixXTiwxODEyLDczV3xLRkY4LEssQVVTLERBTCwyMDIwLTEyLTI1VDEzOjEwLTA2OjAwLDIwMjAtMTItMjVUMTQ6MTAtMDY6MDAsV04sV04sMjQ2Niw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:22:2020-12-25',
            durationMinutes: 195,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1055'
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
          flightNumbers: '20',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTE6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTE6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTE6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMjoxNS0wNjowMCxXTixXTiwyMCw3M0giLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:18:2020-12-25',
            durationMinutes: 75,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '1100'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '11:30',
          arrivalTime: '12:40',
          duration: '1h 10m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '22',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTE6MzAtMDY6MDAsMjAyMC0xMi0yNVQxMjo0MC0wNjowMCxXTixXTiwyMiw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTE6MzAtMDY6MDAsMjAyMC0xMi0yNVQxMjo0MC0wNjowMCxXTixXTiwyMiw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTE6MzAtMDY6MDAsMjAyMC0xMi0yNVQxMjo0MC0wNjowMCxXTixXTiwyMiw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:15:2020-12-25',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '1130'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '12:15',
          arrivalTime: '16:40',
          duration: '4h 25m',
          stopDescription: '1 Stop, MSY',
          stopDescriptionOnSelect: '1 Stop, Change planes MSY',
          shortStopDescription: '1 Stop',
          stopCity: 'MSY',
          flightNumbers: '1443/572',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsTVNZLDIwMjAtMTItMjVUMTI6MTUtMDY6MDAsMjAyMC0xMi0yNVQxMzoyNS0wNjowMCxXTixXTiwxNDQzLDczV3xWRkYyLFYsTVNZLERBTCwyMDIwLTEyLTI1VDE1OjEwLTA2OjAwLDIwMjAtMTItMjVUMTY6NDAtMDY6MDAsV04sV04sNTcyLDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsTVNZLDIwMjAtMTItMjVUMTI6MTUtMDY6MDAsMjAyMC0xMi0yNVQxMzoyNS0wNjowMCxXTixXTiwxNDQzLDczV3xZRkY2LFksTVNZLERBTCwyMDIwLTEyLTI1VDE1OjEwLTA2OjAwLDIwMjAtMTItMjVUMTY6NDAtMDY6MDAsV04sV04sNTcyLDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsTVNZLDIwMjAtMTItMjVUMTI6MTUtMDY6MDAsMjAyMC0xMi0yNVQxMzoyNS0wNjowMCxXTixXTiwxNDQzLDczV3xLRkY4LEssTVNZLERBTCwyMDIwLTEyLTI1VDE1OjEwLTA2OjAwLDIwMjAtMTItMjVUMTY6NDAtMDY6MDAsV04sV04sNTcyLDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:24:2020-12-25',
            durationMinutes: 265,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1215'
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTM6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTM6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxIT1UsREFMLDIwMjAtMTItMjVUMTM6MDAtMDY6MDAsMjAyMC0xMi0yNVQxMzozNS0wNjowMCxXTixXTiw5NjkxLDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:0:2020-12-25',
            durationMinutes: 35,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTM6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTM6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTM6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNDoxMC0wNjowMCxXTixXTiwyOCw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:16:2020-12-25',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsU0FULDIwMjAtMTItMjVUMTM6MTUtMDY6MDAsMjAyMC0xMi0yNVQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xWRkYyLFYsU0FULERBTCwyMDIwLTEyLTI1VDE0OjUwLTA2OjAwLDIwMjAtMTItMjVUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsU0FULDIwMjAtMTItMjVUMTM6MTUtMDY6MDAsMjAyMC0xMi0yNVQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xZRkY2LFksU0FULERBTCwyMDIwLTEyLTI1VDE0OjUwLTA2OjAwLDIwMjAtMTItMjVUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsU0FULDIwMjAtMTItMjVUMTM6MTUtMDY6MDAsMjAyMC0xMi0yNVQxNDoxNS0wNjowMCxXTixXTiwxMzQ2LDczV3xLRkY4LEssU0FULERBTCwyMDIwLTEyLTI1VDE0OjUwLTA2OjAwLDIwMjAtMTItMjVUMTU6NTUtMDY6MDAsV04sV04sNDkwLDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:20:2020-12-25',
            durationMinutes: 160,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1315'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTQ6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNToxMC0wNjowMCxXTixXTiwzMiw3TTgiLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:17:2020-12-25',
            durationMinutes: 70,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '1400'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '14:40',
          arrivalTime: '19:05',
          duration: '4h 25m',
          stopDescription: '1 Stop, ELP',
          stopDescriptionOnSelect: '1 Stop, Change planes ELP',
          shortStopDescription: '1 Stop',
          stopCity: 'ELP',
          flightNumbers: '792/1144',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsRUxQLDIwMjAtMTItMjVUMTQ6NDAtMDY6MDAsMjAyMC0xMi0yNVQxNTo0MC0wNzowMCxXTixXTiw3OTIsNzNXfFZGRjIsVixFTFAsREFMLDIwMjAtMTItMjVUMTY6MjUtMDc6MDAsMjAyMC0xMi0yNVQxOTowNS0wNjowMCxXTixXTiwxMTQ0LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsRUxQLDIwMjAtMTItMjVUMTQ6NDAtMDY6MDAsMjAyMC0xMi0yNVQxNTo0MC0wNzowMCxXTixXTiw3OTIsNzNXfFlGRjYsWSxFTFAsREFMLDIwMjAtMTItMjVUMTY6MjUtMDc6MDAsMjAyMC0xMi0yNVQxOTowNS0wNjowMCxXTixXTiwxMTQ0LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsRUxQLDIwMjAtMTItMjVUMTQ6NDAtMDY6MDAsMjAyMC0xMi0yNVQxNTo0MC0wNzowMCxXTixXTiw3OTIsNzNXfEtGRjgsSyxFTFAsREFMLDIwMjAtMTItMjVUMTY6MjUtMDc6MDAsMjAyMC0xMi0yNVQxOTowNS0wNjowMCxXTixXTiwxMTQ0LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:25:2020-12-25',
            durationMinutes: 265,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1440'
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTU6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTU6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTU6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNjowNS0wNjowMCxXTixXTiwzNiw3M0giLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:8:2020-12-25',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          flightNumbers: '1825/1718',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsQVVTLDIwMjAtMTItMjVUMTU6MTUtMDY6MDAsMjAyMC0xMi0yNVQxNjoxNS0wNjowMCxXTixXTiwxODI1LDczV3xWRkYyLFYsQVVTLERBTCwyMDIwLTEyLTI1VDE3OjEwLTA2OjAwLDIwMjAtMTItMjVUMTg6MTUtMDY6MDAsV04sV04sMTcxOCw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsQVVTLDIwMjAtMTItMjVUMTU6MTUtMDY6MDAsMjAyMC0xMi0yNVQxNjoxNS0wNjowMCxXTixXTiwxODI1LDczV3xZRkY2LFksQVVTLERBTCwyMDIwLTEyLTI1VDE3OjEwLTA2OjAwLDIwMjAtMTItMjVUMTg6MTUtMDY6MDAsV04sV04sMTcxOCw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsQVVTLDIwMjAtMTItMjVUMTU6MTUtMDY6MDAsMjAyMC0xMi0yNVQxNjoxNS0wNjowMCxXTixXTiwxODI1LDczV3xLRkY4LEssQVVTLERBTCwyMDIwLTEyLTI1VDE3OjEwLTA2OjAwLDIwMjAtMTItMjVUMTg6MTUtMDY6MDAsV04sV04sMTcxOCw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:21:2020-12-25',
            durationMinutes: 180,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1515'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTY6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTY6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTY6MDAtMDY6MDAsMjAyMC0xMi0yNVQxNzowNS0wNjowMCxXTixXTiw0MCw3TTgiLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:9:2020-12-25',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '1600'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTc6MDAtMDY6MDAsMjAyMC0xMi0yNVQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTc6MDAtMDY6MDAsMjAyMC0xMi0yNVQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTc6MDAtMDY6MDAsMjAyMC0xMi0yNVQxODowMC0wNjowMCxXTixXTiw0NCw3TTgiLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:4:2020-12-25',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTg6MDAtMDY6MDAsMjAyMC0xMi0yNVQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTg6MDAtMDY6MDAsMjAyMC0xMi0yNVQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTg6MDAtMDY6MDAsMjAyMC0xMi0yNVQxOTowNS0wNjowMCxXTixXTiw0OCw3TTgiLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:10:2020-12-25',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '1800'
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '18:35',
          arrivalTime: '21:10',
          duration: '2h 35m',
          stopDescription: '1 Stop, AUS',
          stopDescriptionOnSelect: '1 Stop, Change planes AUS',
          shortStopDescription: '1 Stop',
          stopCity: 'AUS',
          flightNumbers: '1653/2403',
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsQVVTLDIwMjAtMTItMjVUMTg6MzUtMDY6MDAsMjAyMC0xMi0yNVQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xWRkYyLFYsQVVTLERBTCwyMDIwLTEyLTI1VDIwOjA1LTA2OjAwLDIwMjAtMTItMjVUMjE6MTAtMDY6MDAsV04sV04sMjQwMyw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsQVVTLDIwMjAtMTItMjVUMTg6MzUtMDY6MDAsMjAyMC0xMi0yNVQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xZRkY2LFksQVVTLERBTCwyMDIwLTEyLTI1VDIwOjA1LTA2OjAwLDIwMjAtMTItMjVUMjE6MTAtMDY6MDAsV04sV04sMjQwMyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsQVVTLDIwMjAtMTItMjVUMTg6MzUtMDY6MDAsMjAyMC0xMi0yNVQxOToyNS0wNjowMCxXTixXTiwxNjUzLDczV3xLRkY4LEssQVVTLERBTCwyMDIwLTEyLTI1VDIwOjA1LTA2OjAwLDIwMjAtMTItMjVUMjE6MTAtMDY6MDAsV04sV04sMjQwMyw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:19:2020-12-25',
            durationMinutes: 155,
            numberOfStops: 1,
            startingFromAmount: 23400,
            departureTime: '1835'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTk6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTk6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMTk6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDowMC0wNjowMCxXTixXTiw1Miw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:5:2020-12-25',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMTk6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMTk6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxIT1UsREFMLDIwMjAtMTItMjVUMTk6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDowNS0wNjowMCxXTixXTiw5NTcyLDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:11:2020-12-25',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 23400,
            departureTime: '1900'
          },
          isNextDayArrival: false,
          hasLowestFare: true
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMjA6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '46,800', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMjA6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '48,984', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfExGRjgsTCxIT1UsREFMLDIwMjAtMTItMjVUMjA6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMDo0NS0wNjowMCxXTixXTiw5Njg5LDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:1:2020-12-25',
            durationMinutes: 45,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMjA6MzAtMDY6MDAsMjAyMC0xMi0yNVQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMjA6MzAtMDY6MDAsMjAyMC0xMi0yNVQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMjA6MzAtMDY6MDAsMjAyMC0xMi0yNVQyMTozNS0wNjowMCxXTixXTiw1NCw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:12:2020-12-25',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
          startingFromPrice: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
          startingFromPricePointTax: null,
          dynamicWaiver: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              fareDescription: 'Wanna Get Away',
              limitedSeats: null,
              price: { amount: '23,400', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripRUR8RkZQfFZGRjIsVixIT1UsREFMLDIwMjAtMTItMjVUMjI6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare1
              },
              hasLowestFare: true
            },
            {
              fareDescription: 'Anytime',
              limitedSeats: null,
              price: { amount: '48,750', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripllSRUR8RkZQfFlGRjYsWSxIT1UsREFMLDIwMjAtMTItMjVUMjI6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare2
              },
              hasLowestFare: false
            },
            {
              fareDescription: 'Business Select',
              limitedSeats: null,
              price: { amount: '50,934', currencyCode: 'PTS', currencySymbol: null },
              discountedPrice: null,
              pricePointTax: null,
              discountedPricePointTax: null,
              earnPoints: null,
              reasonIfUnavailable: null,
              _meta: {
                productId:
                  'dal2houPointsPass1_roundTripNSRUR8RkZQfEtGRjgsSyxIT1UsREFMLDIwMjAtMTItMjVUMjI6MDAtMDY6MDAsMjAyMC0xMi0yNVQyMzowMC0wNjowMCxXTixXTiw2NCw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'HOU:DAL:6:2020-12-25',
            durationMinutes: 60,
            numberOfStops: 0,
            startingFromAmount: 23400,
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
        body: { adultPassengers: null, currency: 'PTS', promoCodeToken: null, chaseSessionId: null }
      },
      fareDetails: {
        href: '/fare-details',
        labelText: 'Compare fare benefits',
        method: 'GET'
      }
    },
    _meta: { purchaseWithPoints: true, hasAdult: true, isPromoCodeApplied: false },
    _analytics: {
      userExperienceId: 'ead042a7-c2a2-4ce4-b759-ef8522312307',
      requestId: 'qEIDS8blS9yUQqsFtMYLQA',
      channelId: 'mweb'
    }
  }
};
