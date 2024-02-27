const productDefinitions = require('mocks/templates//productDefinitions');
const fareProductOptions = require('mocks/templates/fareProductOptions');

module.exports = ({ originationAirport, destinationAirport, departureDate, isPromoCodeApplied, promoCode }) => ({
  flightShoppingPage: {
    productDefinitions,
    promoCodeNotice: isPromoCodeApplied ? `Promo code ${promoCode.toUpperCase()} applied!` : null,
    pointsDisclaimer:
      'Reward travel is subject to payment of Government and airport-imposed taxes and fees and can vary based on your arrival and departure airports.',
    disclaimerWithLinks:
      'Reward travel is subject to payment of the government-imposed September 11th Security Fee of $5.60 per one-way trip.',
    outboundPage: {
      header: {
        airportInfo: `${destinationAirport} - ${originationAirport}`,
        selectedDate: departureDate,
        originAirport: originationAirport,
        destinationAirport
      },
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMDY6MDAtMDY6MDAsMjAyMC0xMi0xOVQwNzoxMC0wNjowMCxXTixXTiwxNjI4LDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMDY6MDAtMDY6MDAsMjAyMC0xMi0xOVQwNzoxMC0wNjowMCxXTixXTiwxNjI4LDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:1:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMTlUMDY6MzAtMDY6MDAsMjAyMC0xMi0xOVQwNzo1MC0wNjowMCxXTixXTiwxMjEsNzNXfFlGRjYsWSxNU1ksSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoyMC0wNjowMCxXTixXTiwxMjEyLDczSCIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMTlUMDY6MzAtMDY6MDAsMjAyMC0xMi0xOVQwNzo1MC0wNjowMCxXTixXTiwxMjEsNzNXfEtGRjgsSyxNU1ksSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoyMC0wNjowMCxXTixXTiwxMjEyLDczSCIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:20:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMDc6MDAtMDY6MDAsMjAyMC0xMi0xOVQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMDc6MDAtMDY6MDAsMjAyMC0xMi0xOVQwODoxMC0wNjowMCxXTixXTiwxLDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:2:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsQVVTLDIwMjAtMTItMTlUMDg6MTAtMDY6MDAsMjAyMC0xMi0xOVQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfFlGRjYsWSxBVVMsSE9VLDIwMjAtMTItMTlUMDk6NTUtMDY6MDAsMjAyMC0xMi0xOVQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI0ODc1MCIsImZhcmVUeXBlIjoiQU5ZUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsQVVTLDIwMjAtMTItMTlUMDg6MTAtMDY6MDAsMjAyMC0xMi0xOVQwOToxMC0wNjowMCxXTixXTiwxNDksNzNXfEtGRjgsSyxBVVMsSE9VLDIwMjAtMTItMTlUMDk6NTUtMDY6MDAsMjAyMC0xMi0xOVQxMTowMC0wNjowMCxXTixXTiw4NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI1MDkzNCIsImZhcmVUeXBlIjoiQlVTUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:16:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsRUxQLDIwMjAtMTItMTlUMDg6MzAtMDY6MDAsMjAyMC0xMi0xOVQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNXfFlGRjYsWSxFTFAsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDc6MDAsMjAyMC0xMi0xOVQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsRUxQLDIwMjAtMTItMTlUMDg6MzAtMDY6MDAsMjAyMC0xMi0xOVQwOToyMC0wNzowMCxXTixXTiw1NzAsNzNXfExGRjgsTCxFTFAsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDc6MDAsMjAyMC0xMi0xOVQxMjo0NS0wNjowMCxXTixXTiwxNTExLDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:24:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNDY4MDAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMDk6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMDoxNS0wNjowMCxXTixXTiw5LDczVyIsInF1b3RlZFByaWNlIjoiNDg5ODQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:9:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsU0FULDIwMjAtMTItMTlUMDk6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMDozNS0wNjowMCxXTixXTiw2MzksNzNXfFlGRjYsWSxTQVQsSE9VLDIwMjAtMTItMTlUMTI6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI0ODc1MCIsImZhcmVUeXBlIjoiQU5ZUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsU0FULDIwMjAtMTItMTlUMDk6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMDozNS0wNjowMCxXTixXTiw2MzksNzNXfEtGRjgsSyxTQVQsSE9VLDIwMjAtMTItMTlUMTI6MjUtMDY6MDAsMjAyMC0xMi0xOVQxMzozMC0wNjowMCxXTixXTiw2NTIsNzNXIiwicXVvdGVkUHJpY2UiOiI1MDkzNCIsImZhcmVUeXBlIjoiQlVTUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:22:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTA6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMToxMC0wNjowMCxXTixXTiwxNSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:3:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTE6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMjoxNS0wNjowMCxXTixXTiwxOSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:10:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTI6MDAtMDY6MDAsMjAyMC0xMi0xOVQxMzoxNS0wNjowMCxXTixXTiwyMSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:11:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTM6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNDoxMC0wNjowMCxXTixXTiwyNyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:4:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMTlUMTM6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfFlGRjYsWSxNU1ksSE9VLDIwMjAtMTItMTlUMTU6NDAtMDY6MDAsMjAyMC0xMi0xOVQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMTlUMTM6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNDozNS0wNjowMCxXTixXTiw1NzEsNzNXfEtGRjgsSyxNU1ksSE9VLDIwMjAtMTItMTlUMTU6NDAtMDY6MDAsMjAyMC0xMi0xOVQxNzowMC0wNjowMCxXTixXTiwyNDU0LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:19:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsU0FULDIwMjAtMTItMTlUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOVQxNDozMC0wNjowMCxXTixXTiw2NDAsN004fFlGRjYsWSxTQVQsSE9VLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoxNS0wNjowMCxXTixXTiw0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4NzUwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsU0FULDIwMjAtMTItMTlUMTM6MjUtMDY6MDAsMjAyMC0xMi0xOVQxNDozMC0wNjowMCxXTixXTiw2NDAsN004fEtGRjgsSyxTQVQsSE9VLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoxNS0wNjowMCxXTixXTiw0NCw3M1ciLCJxdW90ZWRQcmljZSI6IjUwOTM0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:17:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNToxNS0wNjowMCxXTixXTiwzMSw3M0giLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTQ6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNToxNS0wNjowMCxXTixXTiwzMSw3M0giLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:12:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsU0FULDIwMjAtMTItMTlUMTQ6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNToyNS0wNjowMCxXTixXTiwyNjAsN004fFlGRjYsWSxTQVQsSE9VLDIwMjAtMTItMTlUMTc6MDUtMDY6MDAsMjAyMC0xMi0xOVQxODowNS0wNjowMCxXTixXTiw3MDYsN004IiwicXVvdGVkUHJpY2UiOiI0ODc1MCIsImZhcmVUeXBlIjoiQU5ZUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsU0FULDIwMjAtMTItMTlUMTQ6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNToyNS0wNjowMCxXTixXTiwyNjAsN004fEtGRjgsSyxTQVQsSE9VLDIwMjAtMTItMTlUMTc6MDUtMDY6MDAsMjAyMC0xMi0xOVQxODowNS0wNjowMCxXTixXTiw3MDYsN004IiwicXVvdGVkUHJpY2UiOiI1MDkzNCIsImZhcmVUeXBlIjoiQlVTUkVEIiwiaW50ZXJuYXRpb25hbCI6ZmFsc2V9',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:21:2020-12-19',
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
                productId: 'oneWay_DAL2HOUPass1_PTS',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNjoyMC0wNjowMCxXTixXTiwzNSw3M0giLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTU6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNjoyMC0wNjowMCxXTixXTiwzNSw3M0giLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:15:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsQVVTLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczSHxWRkYyLFYsQVVTLEhPVSwyMDIwLTEyLTE5VDE3OjIwLTA2OjAwLDIwMjAtMTItMTlUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsQVVTLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczSHxZRkY2LFksQVVTLEhPVSwyMDIwLTEyLTE5VDE3OjIwLTA2OjAwLDIwMjAtMTItMTlUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsQVVTLDIwMjAtMTItMTlUMTU6MTUtMDY6MDAsMjAyMC0xMi0xOVQxNjoyNS0wNjowMCxXTixXTiwxNzE3LDczSHxLRkY4LEssQVVTLEhPVSwyMDIwLTEyLTE5VDE3OjIwLTA2OjAwLDIwMjAtMTItMTlUMTg6MjAtMDY6MDAsV04sV04sNTAyLDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:18:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMTlUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTY6MDAtMDY6MDAsMjAyMC0xMi0xOVQxNzoxNS0wNjowMCxXTixXTiwzOSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:13:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsTVNZLDIwMjAtMTItMTlUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOVQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfFZGRjIsVixNU1ksSE9VLDIwMjAtMTItMTlUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOVQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMTlUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOVQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfFlGRjYsWSxNU1ksSE9VLDIwMjAtMTItMTlUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOVQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMTlUMTY6MzAtMDY6MDAsMjAyMC0xMi0xOVQxNzo1NS0wNjowMCxXTixXTiwxMzgsNzNXfEtGRjgsSyxNU1ksSE9VLDIwMjAtMTItMTlUMTk6MjUtMDY6MDAsMjAyMC0xMi0xOVQyMDo0NS0wNjowMCxXTixXTiwxMzA5LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:25:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMTlUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOVQxODoxNS0wNjowMCxXTixXTiw0Myw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOVQxODoxNS0wNjowMCxXTixXTiw0Myw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTc6MDAtMDY6MDAsMjAyMC0xMi0xOVQxODoxNS0wNjowMCxXTixXTiw0Myw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:14:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxMC0wNjowMCxXTixXTiw0Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:5:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsTVNZLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczSHxWRkYyLFYsTVNZLEhPVSwyMDIwLTEyLTE5VDIwOjQ1LTA2OjAwLDIwMjAtMTItMTlUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiMjM0MDAiLCJmYXJlVHlwZSI6IldHQVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsTVNZLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczSHxZRkY2LFksTVNZLEhPVSwyMDIwLTEyLTE5VDIwOjQ1LTA2OjAwLDIwMjAtMTItMTlUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNDg3NTAiLCJmYXJlVHlwZSI6IkFOWVJFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfEtGRjgsSyxEQUwsTVNZLDIwMjAtMTItMTlUMTg6MDAtMDY6MDAsMjAyMC0xMi0xOVQxOToxNS0wNjowMCxXTixXTiwxNjQ2LDczSHxLRkY4LEssTVNZLEhPVSwyMDIwLTEyLTE5VDIwOjQ1LTA2OjAwLDIwMjAtMTItMTlUMjI6MTAtMDY6MDAsV04sV04sODQ5LDczVyIsInF1b3RlZFByaWNlIjoiNTA5MzQiLCJmYXJlVHlwZSI6IkJVU1JFRCIsImludGVybmF0aW9uYWwiOmZhbHNlfQ==',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:23:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMTlUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOVQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOVQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMTk6MDAtMDY6MDAsMjAyMC0xMi0xOVQyMDoxMC0wNjowMCxXTixXTiw1MSw3M0giLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:6:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMTlUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMjA6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMTo0MC0wNjowMCxXTixXTiw1Nyw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:7:2020-12-19',
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
                  'dal2houPointsPass1_oneWayJXR0FSRUR8RkZQfFZGRjIsVixEQUwsSE9VLDIwMjAtMTItMTlUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjIzNDAwIiwiZmFyZVR5cGUiOiJXR0FSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJBTllSRUR8RkZQfFlGRjYsWSxEQUwsSE9VLDIwMjAtMTItMTlUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ2ODAwIiwiZmFyZVR5cGUiOiJBTllSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
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
                  'dal2houPointsPass1_oneWayJCVVNSRUR8RkZQfExGRjgsTCxEQUwsSE9VLDIwMjAtMTItMTlUMjE6MzAtMDY6MDAsMjAyMC0xMi0xOVQyMjo0MC0wNjowMCxXTixXTiw2MSw3M1ciLCJxdW90ZWRQcmljZSI6IjQ4OTg0IiwiZmFyZVR5cGUiOiJCVVNSRUQiLCJpbnRlcm5hdGlvbmFsIjpmYWxzZX0=',
                ...fareProductOptions.fare3
              },
              hasLowestFare: false
            }
          ],
          _meta: {
            cardId: 'DAL:HOU:8:2020-12-19',
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
    inboundPage: null,
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
      userExperienceId: 'eede4a69-8541-4181-bc90-cedfeafda064',
      requestId: 'ZFkISX4STjG972Cwud3QbA',
      channelId: 'mweb'
    }
  }
});
