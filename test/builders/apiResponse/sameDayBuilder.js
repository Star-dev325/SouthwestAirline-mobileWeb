// @flow
import SortingOptions from 'src/shared/constants/sortingOptions';

import type { SameDayShopping } from 'src/sameDay/flow-typed/sameDay.types';

const STANDBY_AMOUNT = {
  amount: '0',
  currencyCode: 'USD',
  currencySymbol: '$',
  sign: null
};

class SameDayShoppingPageResponseBuilder {
  sameDayShoppingPage: SameDayShopping;

  constructor() {
    this.sameDayShoppingPage = {
      sameDayShoppingInformation: {
        currentReservation: {
          date: '2022-09-27',
          departsTime: '15:30',
          arrivesTime: '18:30',
          flightTime: '3h 0m',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flight: '439',
          isNextDayArrival: false
        },
        header: {
          airportInfo: 'PHX - DEN',
          originAirport: 'PHX',
          destinationAirport: 'DEN',
          flightType: 'Departure'
        },
        flightListText: 'Please choose from the following flights:',
        appliedSortAndFilterData: {},
        cards: [
          {
            departureTime: '10:00',
            arrivalTime: '13:00',
            duration: '3h 0m',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            hasLowestFare: null,
            reasonIfUnavailable: null,
            stopDescriptionOnSelect: '',
            flightNumbers: '140',
            labelText: 'See options',
            standbyAmount: STANDBY_AMOUNT,
            standbyUnavailableText: null,
            changeUnavailableText: null,
            startingFromPriceDifference: {
              amount: '20',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            startingFromPriceDiffPointsTax: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            fares: [
              {
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null,
                fareType: null,
                priceDifference: {
                  amount: '20',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                priceDiffPointsTax: null,
                _meta: {
                  fareType: '',
                  productId:
                    'eyJzdGFuZEJ5UHJvZHVjdCI6IGZhbHNlLCJmbGlnaHRJZGVudGlmaWVyIjogIldOMTQwUEhYREVOMjAyMjExMDIiLCJkZXBhcnRzVGltZSI6ICIxMDowMCIsICJhcnJpdmVzVGltZSI6ICIxMzowMCIsImZyb21BaXJwb3J0Q29kZSI6ICJQSFgiLCJ0b0FpcnBvcnRDb2RlIjogIkRFTiIsImZsaWdodE51bWJlcnMiOiAiMTQwIiwiZmFyZUZhbWlseSI6ICJXR0EiLCJhbW91bnREdWUiOiAiMjAuMDAiLCJjdXJyZW5jeSI6ICJVU0QifQ==',
                  fareProductId: 'WGA'
                }
              },
              {
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null,
                fareType: null,
                priceDifference: {
                  amount: '30',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                priceDiffPointsTax: null,
                _meta: {
                  fareType: '',
                  productId:
                    'eyJzdGFuZEJ5UHJvZHVjdCI6IGZhbHNlLCJmbGlnaHRJZGVudGlmaWVyIjogIldOMTQwUEhYREVOMjAyMjExMDIiLCJkZXBhcnRzVGltZSI6ICIxMDowMCIsICJhcnJpdmVzVGltZSI6ICIxMzowMCIsImZyb21BaXJwb3J0Q29kZSI6ICJQSFgiLCJ0b0FpcnBvcnRDb2RlIjogIkRFTiIsImZsaWdodE51bWJlcnMiOiAiMTQwIiwiZmFyZUZhbWlseSI6ICJQTFUiLCJhbW91bnREdWUiOiAiMzAuMDAiLCJjdXJyZW5jeSI6ICJVU0QifQ==',
                  fareProductId: 'PLU'
                }
              },
              {
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null,
                fareType: null,
                priceDifference: {
                  amount: '50',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                priceDiffPointsTax: null,
                _meta: {
                  fareType: '',
                  productId:
                    'eyJzdGFuZEJ5UHJvZHVjdCI6IGZhbHNlLCJmbGlnaHRJZGVudGlmaWVyIjogIldOMTQwUEhYREVOMjAyMjExMDIiLCJkZXBhcnRzVGltZSI6ICIxMDowMCIsICJhcnJpdmVzVGltZSI6ICIxMzowMCIsImZyb21BaXJwb3J0Q29kZSI6ICJQSFgiLCJ0b0FpcnBvcnRDb2RlIjogIkRFTiIsImZsaWdodE51bWJlcnMiOiAiMTQwIiwiZmFyZUZhbWlseSI6ICJBTlkiLCJhbW91bnREdWUiOiAiNTAuMDAiLCJjdXJyZW5jeSI6ICJVU0QifQ==',
                  fareProductId: 'ANY'
                }
              },
              {
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null,
                priceDifference: {
                  amount: '90',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                priceDiffPointsTax: null,
                _meta: {
                  fareType: '',
                  productId:
                    'eyJzdGFuZEJ5UHJvZHVjdCI6IGZhbHNlLCJmbGlnaHRJZGVudGlmaWVyIjogIldOMTQwUEhYREVOMjAyMjExMDIiLCJkZXBhcnRzVGltZSI6ICIxMDowMCIsICJhcnJpdmVzVGltZSI6ICIxMzowMCIsImZyb21BaXJwb3J0Q29kZSI6ICJQSFgiLCJ0b0FpcnBvcnRDb2RlIjogIkRFTiIsImZsaWdodE51bWJlcnMiOiAiMTQwIiwiZmFyZUZhbWlseSI6ICJCVVMiLCJhbW91bnREdWUiOiAiOTAuMDAiLCJjdXJyZW5jeSI6ICJVU0QifQ==',
                  fareProductId: 'BUS'
                }
              }
            ],
            isNextDayArrival: false,
            _meta: {
              standbyProductId: 'productId2',
              startingFromAmount: 20,
              cardId: 'PHX:DEN:1:2023-01-20',
              durationMinutes: 240,
              numberOfStops: 0,
              departureTime: '1000'
            },
            _links: {
              sameDayFlightDetails: {
                href: '/v1/mobile-air-operations/page/same-day/flight-details/3RK3J9',
                method: 'POST',
                body: {
                  sameDayToken:
                    'eyJyZWNvcmRMb2NhdG9yIjoiM1JLM0o5IiwicmVjaXBpZW50RW1haWwiOiJURVNUSU5HMTIzNEBURVNULkNPTSIsInNhbWVEYXlCb3VuZFNlbGVjdGlvbnMiOlt7ImZsaWdodFR5cGUiOiJEZXBhcnR1cmUiLCJvcmlnaW5hbERhdGUiOiIyMDIzLTAxLTIwIiwiZnJvbUFpcnBvcnQiOiJIb25vbHVsdSAoT2FodSksIEhJIChITkwpIiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0IjoiS2FodWx1aSAoTWF1aSksIEhJIChPR0cpIiwidG9BaXJwb3J0Q29kZSI6Ik9HRyIsImZsaWdodCI6IjEwNzYiLCJ0aW1lRGVwYXJ0cyI6IjA3OjQ1IiwidGltZUFycml2ZXMiOiIwODozMCIsImJvdW5kUmVmZXJlbmNlIjoiV04xMDc2SE5MT0dHMjAyMzAxMjAiLCJpc1NlbGVjdGFibGUiOnRydWV9XSwic2FtZURheVRva2VuRmxpZ2h0cyI6W3siYm91bmRSZWZlcmVuY2UiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsImZsaWdodFRpbWUiOiIyMDIzLTAxLTIwVDA3OjQ1OjAwLTEwOjAwIiwic3RvcERlc2NyaXB0aW9uIjoiTm9uc3RvcCIsIm5leHREYXlBcnJpdmFsIjpmYWxzZSwic2FtZURheVRva2VuRmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsImRlcGFydHVyZURhdGVUaW1lIjoiMjAyMy0wMS0yMFQwNzo0NTowMC0xMDowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMjMtMDEtMjBUMDg6MzA6MDAtMTA6MDAifV19XSwic2FtZURheVRva2VuVHJhdmVsZXJzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXIiOiI2MTBCNTE4NTAwMDE0QTZFIiwicGFzc2VuZ2VyVHlwZSI6IkEiLCJzYW1lRGF5VG9rZW5UcmF2ZWxlck5hbWUiOnsic3RydWN0dXJlZE5hbWUiOnsiZmlyc3ROYW1lIjoiQUJEVUwiLCJsYXN0TmFtZSI6IldBSEFCIn19LCJhY2NvdW50TnVtYmVyIjpudWxsLCJzYW1lRGF5VG9rZW5Cb2FyZGluZ0JvdW5kcyI6W3siYm91bmRSZWZlcmVuY2UiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsInNhbWVEYXlUb2tlbkJvYXJkaW5nU2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsInRyYXZlbGVyU2VnbWVudElkZW50aWZpZXIiOiI2MDBCQjE4NjAwMDAyQjcwIn1dfV19XX0=',
                  flightIdentifier: 'flightIdentifier2'
                }
              }
            }
          },
          {
            departureTime: '10:00',
            arrivalTime: '13:00',
            duration: '1h 0m',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '140',
            labelText: '$0',
            standbyAmount: STANDBY_AMOUNT,
            standbyUnavailableText: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            dynamicWaiverAvailabilityText: null,
            startingFromPricePointTax: null,
            startingFromPrice: null,
            hasLowestFare: null,
            reasonIfUnavailable: null,
            changeUnavailableText: 'Sold out',
            stopDescription: '',
            stopDescriptionOnSelect: '',
            startingFromPriceDifference: null,
            startingFromPriceDiffPointsTax: null,
            fares: [
              {
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId1',
                  fareProductId: 'PLU',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              },
              {
                priceDifference: {
                  amount: '20',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId2',
                  fareProductId: 'BUS',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              }
            ],
            isNextDayArrival: false,
            _meta: {
              productId: null,
              fareProductId: null,
              standbyProductId: 'standbyProductId2',
              cardId: '',
              durationMinutes: null,
              numberOfStops: null,
              startingFromAmount: null,
              departureTime: ''
            },
            _links: {
              sameDayFlightDetails: {
                href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
                method: 'POST',
                body: {
                  sameDayToken: '',
                  flightIdentifier: 'flightIdentifier1'
                }
              }
            }
          },
          {
            departureTime: '10:00',
            arrivalTime: '13:00',
            duration: '1h 0m',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '140',
            labelText: '$0',
            standbyAmount: STANDBY_AMOUNT,
            standbyUnavailableText: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            dynamicWaiverAvailabilityText: null,
            startingFromPricePointTax: null,
            startingFromPrice: null,
            hasLowestFare: null,
            reasonIfUnavailable: null,
            changeUnavailableText: 'Sold out',
            stopDescription: '',
            stopDescriptionOnSelect: '',
            fares: [
              {
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId1',
                  fareProductId: 'PLU',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              },
              {
                priceDifference: {
                  amount: '20',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId2',
                  fareProductId: 'BUS',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              }
            ],
            isNextDayArrival: false,
            _meta: {
              productId: null,
              fareProductId: null,
              standbyProductId: 'standbyProductId2',
              cardId: '',
              durationMinutes: null,
              numberOfStops: null,
              startingFromAmount: null,
              departureTime: ''
            },
            _links: {
              sameDayFlightDetails: {
                href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
                method: 'POST',
                body: {
                  sameDayToken: '',
                  flightIdentifier: 'flightIdentifier1'
                }
              }
            }
          },
          {
            departureTime: '11:00',
            arrivalTime: '14:00',
            duration: '3h 0m',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '150',
            labelText: 'See options',
            standbyUnavailableText: 'See agent',
            changeUnavailableText: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            dynamicWaiverAvailabilityText: null,
            startingFromPricePointTax: null,
            startingFromPrice: null,
            hasLowestFare: null,
            reasonIfUnavailable: null,
            stopDescription: '',
            stopDescriptionOnSelect: '',
            startingFromPriceDifference: {
              amount: '15',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            startingFromPriceDiffPointsTax: {
              amount: '60',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            fares: [
              {
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId1',
                  fareProductId: 'PLU',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              }
            ],
            isNextDayArrival: false,
            _meta: {
              productId: null,
              fareProductId: null,
              standbyProductId: 'standbyProductId2',
              cardId: '',
              durationMinutes: null,
              numberOfStops: null,
              startingFromAmount: null,
              departureTime: ''
            },
            _links: {
              sameDayFlightDetails: {
                href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
                method: 'POST',
                body: {
                  sameDayToken: '',
                  flightIdentifier: 'flightIdentifier2'
                }
              }
            }
          },
          {
            departureTime: '12:00',
            arrivalTime: '14:00',
            duration: '1h 0m',
            stopDescription: '1 Stop, MSY',
            stopDescriptionOnSelect: '1 Stop, Change planes MSY',
            shortStopDescription: '1 Stop',
            stopCity: 'MSY',
            flightNumbers: '212/9591',
            labelText: '$0',
            standbyAmount: STANDBY_AMOUNT,
            standbyUnavailableText: null,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            dynamicWaiverAvailabilityText: null,
            startingFromPricePointTax: null,
            startingFromPrice: null,
            hasLowestFare: null,
            reasonIfUnavailable: null,
            changeUnavailableText: null,
            startingFromPriceDifference: {
              amount: '10',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            startingFromPriceDiffPointsTax: null,
            fares: [
              {
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId1',
                  fareProductId: 'PLU',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              },
              {
                priceDifference: {
                  amount: '20',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: '+'
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId2',
                  fareProductId: 'BUS',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              }
            ],
            isNextDayArrival: false,
            _meta: {
              productId: null,
              fareProductId: null,
              standbyProductId: 'standbyProductId2',
              cardId: '',
              durationMinutes: null,
              numberOfStops: null,
              startingFromAmount: null,
              departureTime: ''
            },
            _links: {
              sameDayFlightDetails: {
                href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
                method: 'POST',
                body: {
                  sameDayToken: '',
                  flightIdentifier: 'flightIdentifier2'
                }
              }
            }
          },
          {
            departureTime: '14:00',
            arrivalTime: '16:00',
            duration: '3h 0m',
            shortStopDescription: 'Nonstop',
            stopCity: null,
            flightNumbers: '835/2910',
            labelText: 'See options',
            standbyAmount: STANDBY_AMOUNT,
            discountedStartingFromPrice: null,
            discountedStartingFromPriceTax: null,
            dynamicWaiverAvailabilityText: null,
            startingFromPricePointTax: null,
            startingFromPrice: null,
            hasLowestFare: null,
            reasonIfUnavailable: null,
            stopDescription: '',
            stopDescriptionOnSelect: '',
            startingFromPriceDifference: null,
            startingFromPriceDiffPointsTax: {
              amount: '50',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '-'
            },
            fares: [
              {
                priceDifference: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                priceDiffPointsTax: {
                  amount: '0',
                  currencyCode: 'USD',
                  currencySymbol: '$',
                  sign: null
                },
                _meta: {
                  productId: 'productId1',
                  fareProductId: 'PLU',
                  standbyProductId: null,
                  fareType: ''
                },
                discountedPrice: null,
                discountedPricePointTax: null,
                earnPoints: null,
                fareDescription: '',
                limitedSeats: null,
                price: null,
                pricePointTax: null,
                reasonIfUnavailable: null
              }
            ],
            isNextDayArrival: false,
            _meta: {
              productId: null,
              fareProductId: null,
              standbyProductId: 'standbyProductId2',
              cardId: '',
              durationMinutes: null,
              numberOfStops: null,
              startingFromAmount: null,
              departureTime: ''
            },
            _links: {
              sameDayFlightDetails: {
                href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
                method: 'POST',
                body: {
                  sameDayToken: '',
                  flightIdentifier: ''
                }
              }
            }
          }
        ],
        expandedDetails: {
          allowSameDayChange: true,
          changeDescription: 'We will move you to the new flight',
          changeDetailsLabelText: 'SEATS AVAILABLE',
          changeLabel: 'Confirmed Seat',
          disclaimerWithLinks:
            'All fares are rounded up to the nearest dollar and include <a href="https://mobile.dev9.southwest.com/taxes-and-fees"target="_blank">Gov\'t taxes &amp; fees.</a>',
          standbyDescription: 'We will keep your current flight until you board the new standby flight',
          standbyDetailsLabelText: 'CURRENTLY LISTED',
          standbyLabel: 'Standby',
          tierMessageWithLinks: 'tier message',
          allFlightsFilteredOutText:
            'No flights are available online.\nPlease see an agent if you have any questions.'
        },
        confirmBaggageMessage: {
          key: 'SAME_DAY_CONFIRM_BAGGAGE_MESSAGE',
          header: 'Your baggage may arrive with your originally scheduled flight',
          body: "We will make every effort to get your checked baggage on your next flight, however, it may already be on it's way to your destination.",
          icon: 'NONE',
          textColor: 'DEFAULT'
        },
        productDefinitions: {
          products: [
            {
              id: 'WGA',
              label: 'Wanna Get Away',
              stylizedLabel: null,
              productId: 'WGA',
              primaryThemeColor: 'primary-yellow',
              inverseThemeColor: 'primary-dark-blue',
              primaryThemeHexColor: null,
              inverseThemeHexColor: null,
              rowOrder: 1,
              features: [
                {
                  icon: 'plus',
                  label: '2 free checked bags',
                  suffix: '1'
                },
                {
                  icon: 'plus',
                  label: 'No fees to change or cancel',
                  suffix: '3'
                },
                {
                  icon: 'plus',
                  label: 'Flight credit if you cancel',
                  suffix: '4'
                }
              ]
            },
            {
              id: 'PLU',
              label: 'Wanna Get Away Plus',
              stylizedLabel: [
                {
                  primaryLabelColor: 'primary-dark-blue',
                  label: 'Wanna Get Away',
                  inverseLabelColor: 'neutral-white',
                  font: null
                },
                {
                  primaryLabelColor: 'primary-red',
                  label: ' plus',
                  inverseLabelColor: 'neutral-white',
                  font: 'Fairwater Script'
                }
              ],
              productId: 'PLU',
              primaryThemeColor: 'primary-red',
              inverseThemeColor: 'neutral-white',
              primaryThemeHexColor: null,
              inverseThemeHexColor: null,
              rowOrder: 2,
              features: [
                {
                  icon: null,
                  label: 'All the benefits of Wanna Get Away and:',
                  suffix: null
                },
                {
                  icon: 'plus',
                  label: 'Same-day confirmed change',
                  suffix: '6'
                },
                {
                  icon: 'plus',
                  label: 'Same-day standby list',
                  suffix: '6'
                },
                {
                  icon: 'plus',
                  label: 'Transferable flight credit',
                  suffix: '5'
                }
              ]
            },
            {
              id: 'ANY',
              label: 'Anytime',
              stylizedLabel: null,
              productId: 'ANY',
              primaryThemeColor: 'secondary-light-blue',
              inverseThemeColor: 'primary-dark-blue',
              primaryThemeHexColor: null,
              inverseThemeHexColor: null,
              rowOrder: 3,
              features: [
                {
                  icon: null,
                  label: 'All the benefits of Wanna Get Away Plus and:',
                  suffix: null
                },
                {
                  icon: 'plus',
                  label: 'Refundable',
                  suffix: '7'
                },
                {
                  icon: 'plus',
                  label: 'EarlyBird Check-in',
                  suffix: '9'
                },
                {
                  icon: 'plus',
                  label: 'Priority Lane',
                  suffix: '8'
                },
                {
                  icon: 'plus',
                  label: 'Express Lane',
                  suffix: '8'
                }
              ]
            },
            {
              id: 'BUS',
              label: 'Business Select',
              stylizedLabel: null,
              productId: 'BUS',
              primaryThemeColor: 'primary-blue',
              inverseThemeColor: 'neutral-white',
              primaryThemeHexColor: null,
              inverseThemeHexColor: null,
              rowOrder: 4,
              features: [
                {
                  icon: null,
                  label: 'All the benefits of Anytime and:',
                  suffix: null
                },
                {
                  icon: 'plus',
                  label: 'Priority Boarding A1-A15',
                  suffix: null
                },
                {
                  icon: 'plus',
                  label: 'Premium drink (on flights 176 miles or more)',
                  suffix: '5'
                }
              ]
            }
          ],
          highlightedFeatures: [
            {
              icon: 'Suitcase',
              label: 'First 2 Bags Fly Free',
              suffix: '��*'
            },
            {
              icon: 'DollarCircle',
              label: 'No Change Fees',
              suffix: '**'
            }
          ],
          disclaimers: [
            {
              icon: null,
              label:
                '<a href="https://mobile.southwest.com/baggage-restrictions" target="_blank">* Weight and size limits apply.</a>',
              suffix: null
            },
            {
              icon: null,
              label: '** Fare difference may apply.',
              suffix: null
            }
          ]
        },
        _links: {
          sameDayPricing: {
            href: '/v1/mobile-air-operations/page/same-day/pricing/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: 'token',
              boundReference: 'bound2',
              productId: 'productId2'
            }
          },
          fareDetailsJson: {
            href: '/content/generated/data/feature_tables/fareDetails.json',
            labelText: 'Compare Fare Details',
            method: 'GET'
          }
        },
        _meta: {
          purchaseWithPoints: false
        },
        standbyBaggageMessage: null,
        shoppingDisclaimers: [
          {
            icon: 'info',
            label: 'Additional taxes may apply to the dollar amounts shown below.'
          }
        ],
        standbyListFAQs: {
          linkIcon: '',
          linkPrefixText: '',
          linkSuffixClickableText: 'View standby FAQs',
          modalDetails: {
            buttons: [
              {
                action: {
                  type: 'DISMISS',
                  value: ''
                },
                buttonText: 'Got it',
                type: 'Primary'
              },
              {
                action: {
                  type: 'LINK',
                  value: 'https://www.southwest.com/airfare-types-benefits/sameday-standbychange'
                },
                buttonText: 'See more standby FAQs',
                type: 'Secondary'
              }
            ],
            infoList: [
              {
                icon: 'bullet',
                text: 'Same day standby is only allowed on flights that depart <b>earlier</b> than your original itinerary. You cannot standby for flights that depart after your original departure time.'
              },
              {
                icon: 'bullet',
                text: 'You can standby from a non-stop to a non-stop (including direct flights with no connections)'
              },
              {
                icon: 'bullet',
                text: 'You can standby from a connecting flight to another connecting flight if the midpoint does not change'
              },
              {
                icon: 'bullet',
                text: 'You cannot standby on a connecting trip if you are holding inventory on a non-stop. Vice versa, you cannot standby for a non-stop trip if you were originally holding inventory on a connecting flight'
              },
              {
                icon: 'bullet',
                text: 'Your <b>original</b> trip must be at least 30 minutes before departure in order to standby on other trips.'
              },
              {
                icon: 'bullet',
                text: 'Your <b>standby</b> flight must be at least 30 minutes before departure in order to choose for standby travel'
              }
            ],
            title: 'Listing for Standby has finally landed, but you may have to see an agent to list for them.'
          }
        }
      },
      sameDayFlightDetails: {
        flightIdentifier1: {
          flightLegs: [
            {
              changeDetailsLabelDescription: 'DAL to ABQ - 50',
              standbyDetailsLabelDescription: 'DAL to ABQ - 10'
            }
          ]
        },
        flightIdentifier2: {
          flightLegs: [
            {
              changeDetailsLabelDescription: 'DAL to ABQ - 33',
              standbyDetailsLabelDescription: 'DAL to ABQ - 4'
            },
            {
              changeDetailsLabelDescription: 'DAL to ABQ - 27',
              standbyDetailsLabelDescription: 'DAL to ABQ - 14'
            }
          ]
        }
      }
    };
  }

  withFlightType(flightType: string) {
    this.sameDayShoppingPage.sameDayShoppingInformation.header.flightType = flightType;

    return this;
  }

  withNextDayArrival() {
    this.sameDayShoppingPage.sameDayShoppingInformation.currentReservation.isNextDayArrival = true;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].isNextDayArrival = true;

    return this;
  }

  withOvernight() {
    this.sameDayShoppingPage.sameDayShoppingInformation.currentReservation.isNextDayArrival = true;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].isNextDayArrival = true;
    this.sameDayShoppingPage.sameDayShoppingInformation.currentReservation.isOvernight = true;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].isOvernight = true;

    return this;
  }

  withStopDescription() {
    this.sameDayShoppingPage.sameDayShoppingInformation.currentReservation.shortStopDescription = '1 Stop';
    this.sameDayShoppingPage.sameDayShoppingInformation.currentReservation.stopCity = 'HOU';
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].shortStopDescription = '1 Stop';
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].stopCity = 'HOU';

    return this;
  }

  withDoubleConnects() {
    this.sameDayShoppingPage.sameDayShoppingInformation.currentReservation = {
      arrivesTime: '17:40',
      date: '2023-09-28',
      departsTime: '06:00',
      flight: '3672/403/1725',
      flightTime: '9h 40m',
      isNextDayArrival: false,
      isOvernight: false,
      shortStopDescription: '2 Stops',
      stopCity: 'DEN, BNA',
      stopDescription: '2 Stops, DEN, BNA'
    };
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].flightNumbers = '3642/403/1725';

    return this;
  }

  withDoubleConnectsMaxFlightLength() {
    this.sameDayShoppingPage.sameDayShoppingInformation.currentReservation = {
      arrivesTime: '17:40',
      date: '2023-09-28',
      departsTime: '06:00',
      flight: '3672/4032/1725',
      flightTime: '9h 40m',
      isNextDayArrival: false,
      isOvernight: false,
      shortStopDescription: '2 Stops',
      stopCity: 'DEN, BNA',
      stopDescription: '2 Stops, DEN, BNA'
    };

    return this;
  }

  withOutOriginAirport() {
    this.sameDayShoppingPage.sameDayShoppingInformation.header.originAirport = '';

    return this;
  }

  withOutDestinationAirport() {
    this.sameDayShoppingPage.sameDayShoppingInformation.header.destinationAirport = '';

    return this;
  }

  withOutCards() {
    this.sameDayShoppingPage.sameDayShoppingInformation.cards = [];

    return this;
  }

  withCardsWithoutFareMetaProductId() {
    this.sameDayShoppingPage.sameDayShoppingInformation.cards = [
      {
        departureTime: '10:00',
        arrivalTime: '13:00',
        duration: '3h 0m',
        shortStopDescription: 'Nonstop',
        stopCity: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        hasLowestFare: null,
        reasonIfUnavailable: null,
        stopDescriptionOnSelect: '',
        flightNumbers: '140',
        labelText: 'See options',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: null,
        changeUnavailableText: null,
        startingFromPriceDifference: {
          amount: '20',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: '+'
        },
        startingFromPriceDiffPointsTax: {
          amount: '0',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: null
        },
        fares: [
          {
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null,
            fareType: null,
            priceDifference: {
              amount: '20',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: null,
            _meta: {
              fareType: '',
              fareProductId: 'WGA'
            }
          },
          {
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null,
            fareType: null,
            priceDifference: {
              amount: '30',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: null,
            _meta: {
              fareType: '',
              fareProductId: 'PLU'
            }
          },
          {
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null,
            fareType: null,
            priceDifference: {
              amount: '50',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: null,
            _meta: {
              fareType: '',
              productId: '',
              fareProductId: 'ANY'
            }
          },
          {
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null,
            priceDifference: {
              amount: '90',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: null,
            _meta: {
              fareType: '',
              fareProductId: 'BUS'
            }
          }
        ],
        isNextDayArrival: false,
        _meta: {
          standbyProductId:
            'eyJzdGFuZEJ5UHJvZHVjdCI6IHRydWUsImZsaWdodElkZW50aWZpZXIiOiAiV04xNDBQSFhERU4yMDIyMTEwMiIsImRlcGFydHNUaW1lIjogIjEwOjAwIiwgImFycml2ZXNUaW1lIjogIjEzOjAwIiwiZnJvbUFpcnBvcnRDb2RlIjogIlBIWCIsInRvQWlycG9ydENvZGUiOiAiREVOIiwiZmxpZ2h0TnVtYmVycyI6ICIxNDAiLCJmYXJlRmFtaWx5IjogbnVsbCwiYW1vdW50RHVlIjogIjAuMDAiLCJjdXJyZW5jeSI6ICJVU0QifQ==',
          startingFromAmount: 20,
          cardId: 'PHX:DEN:1:2023-01-20',
          durationMinutes: 240,
          numberOfStops: 0,
          departureTime: '1000'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/page/same-day/flight-details/3RK3J9',
            method: 'POST',
            body: {
              sameDayToken:
                'eyJyZWNvcmRMb2NhdG9yIjoiM1JLM0o5IiwicmVjaXBpZW50RW1haWwiOiJURVNUSU5HMTIzNEBURVNULkNPTSIsInNhbWVEYXlCb3VuZFNlbGVjdGlvbnMiOlt7ImZsaWdodFR5cGUiOiJEZXBhcnR1cmUiLCJvcmlnaW5hbERhdGUiOiIyMDIzLTAxLTIwIiwiZnJvbUFpcnBvcnQiOiJIb25vbHVsdSAoT2FodSksIEhJIChITkwpIiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0IjoiS2FodWx1aSAoTWF1aSksIEhJIChPR0cpIiwidG9BaXJwb3J0Q29kZSI6Ik9HRyIsImZsaWdodCI6IjEwNzYiLCJ0aW1lRGVwYXJ0cyI6IjA3OjQ1IiwidGltZUFycml2ZXMiOiIwODozMCIsImJvdW5kUmVmZXJlbmNlIjoiV04xMDc2SE5MT0dHMjAyMzAxMjAiLCJpc1NlbGVjdGFibGUiOnRydWV9XSwic2FtZURheVRva2VuRmxpZ2h0cyI6W3siYm91bmRSZWZlcmVuY2UiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsImZsaWdodFRpbWUiOiIyMDIzLTAxLTIwVDA3OjQ1OjAwLTEwOjAwIiwic3RvcERlc2NyaXB0aW9uIjoiTm9uc3RvcCIsIm5leHREYXlBcnJpdmFsIjpmYWxzZSwic2FtZURheVRva2VuRmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsImRlcGFydHVyZURhdGVUaW1lIjoiMjAyMy0wMS0yMFQwNzo0NTowMC0xMDowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMjMtMDEtMjBUMDg6MzA6MDAtMTA6MDAifV19XSwic2FtZURheVRva2VuVHJhdmVsZXJzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXIiOiI2MTBCNTE4NTAwMDE0QTZFIiwicGFzc2VuZ2VyVHlwZSI6IkEiLCJzYW1lRGF5VG9rZW5UcmF2ZWxlck5hbWUiOnsic3RydWN0dXJlZE5hbWUiOnsiZmlyc3ROYW1lIjoiQUJEVUwiLCJsYXN0TmFtZSI6IldBSEFCIn19LCJhY2NvdW50TnVtYmVyIjpudWxsLCJzYW1lRGF5VG9rZW5Cb2FyZGluZ0JvdW5kcyI6W3siYm91bmRSZWZlcmVuY2UiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsInNhbWVEYXlUb2tlbkJvYXJkaW5nU2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjEwNzZITkxPR0cyMDIzMDEyMCIsInRyYXZlbGVyU2VnbWVudElkZW50aWZpZXIiOiI2MDBCQjE4NjAwMDAyQjcwIn1dfV19XX0=',
              flightIdentifier: 'WN140PHXDEN20221102'
            }
          }
        }
      }
    ];

    return this;
  }

  withCards() {
    this.sameDayShoppingPage.sameDayShoppingInformation.cards = [
      {
        departureTime: '06:45',
        arrivalTime: '10:45',
        duration: '4h 0m',
        stopDescription: '1 Stop, ELP',
        stopDescriptionOnSelect: '1 Stop, Change planes ELP',
        shortStopDescription: '1 Stop',
        stopCity: 'ELP',
        flightNumbers: '523/993',
        labelText: '$0',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: '',
        startingFromPricePointTax: null,
        reasonIfUnavailable: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        fares: [
          {
            priceDifference: {
              amount: '30',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '80',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId1',
              fareProductId: 'PLU',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          },
          {
            priceDifference: {
              amount: '90',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '100',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId2',
              fareProductId: 'BUS',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          }
        ],
        _meta: {
          productId: null,
          fareProductId: null,
          standbyProductId: 'standbyProductId2',
          cardId: '',
          durationMinutes: 240,
          numberOfStops: 1,
          startingFromAmount: 20,
          departureTime: '645'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: '',
              flightIdentifier: ''
            }
          }
        },
        isNextDayArrival: false,
        hasLowestFare: false
      },
      {
        departureTime: '07:10',
        arrivalTime: '08:15',
        duration: '1h 5m',
        stopDescription: 'Nonstop',
        stopDescriptionOnSelect: 'Nonstop',
        shortStopDescription: 'Nonstop',
        stopCity: null,
        flightNumbers: '1757',
        labelText: '$0',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: '',
        startingFromPricePointTax: null,
        reasonIfUnavailable: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        fares: [
          {
            priceDifference: {
              amount: '30',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId1',
              fareProductId: 'PLU',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          },
          {
            priceDifference: {
              amount: '20',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '0',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId2',
              fareProductId: 'BUS',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          }
        ],
        _meta: {
          productId: null,
          fareProductId: null,
          standbyProductId: 'standbyProductId2',
          cardId: '',
          durationMinutes: 65,
          numberOfStops: 0,
          startingFromAmount: -6,
          departureTime: '710'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: '',
              flightIdentifier: ''
            }
          }
        },
        isNextDayArrival: false,
        hasLowestFare: true
      },
      {
        departureTime: '10:00',
        arrivalTime: '13:00',
        duration: '3h 0m',
        labelText: '$0',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: '',
        startingFromPricePointTax: null,
        reasonIfUnavailable: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        flightNumbers: '1234',
        stopDescriptionOnSelect: 'Stop',
        fares: [
          {
            priceDifference: {
              amount: '191',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '200',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId1',
              fareProductId: 'PLU',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          },
          {
            priceDifference: {
              amount: '90',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '100',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId2',
              fareProductId: 'BUS',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          }
        ],
        _meta: {
          productId: null,
          fareProductId: null,
          standbyProductId: 'standbyProductId2',
          cardId: '',
          durationMinutes: 180,
          numberOfStops: 0,
          startingFromAmount: -6,
          departureTime: '1000'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: '',
              flightIdentifier: ''
            }
          }
        },
        isNextDayArrival: false,
        hasLowestFare: true
      },
      {
        departureTime: '10:10',
        arrivalTime: '15:20',
        duration: '5h 10m',
        stopDescription: '2 Stop, ABQ, CCU',
        stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
        shortStopDescription: '2 Stop',
        stopCity: 'ABQ',
        flightNumbers: '2161/2376',
        labelText: '$0',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: '',
        startingFromPricePointTax: null,
        reasonIfUnavailable: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        fares: [
          {
            priceDifference: {
              amount: '30',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '80',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId1',
              fareProductId: 'PLU',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          },
          {
            priceDifference: {
              amount: '90',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '100',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId2',
              fareProductId: 'BUS',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          }
        ],
        _meta: {
          productId: null,
          fareProductId: null,
          standbyProductId: 'standbyProductId2',
          cardId: '',
          durationMinutes: 310,
          numberOfStops: 2,
          startingFromAmount: -11,
          departureTime: '1010'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: '',
              flightIdentifier: ''
            }
          }
        },
        isNextDayArrival: false,
        hasLowestFare: false
      },
      {
        departureTime: '10:10',
        arrivalTime: '15:10',
        duration: '5h 0m',
        stopDescription: '2 Stop, ABQ, CCU',
        stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
        shortStopDescription: '2 Stop',
        stopCity: 'ABQ',
        flightNumbers: '2161/2376',
        labelText: '$0',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: '',
        startingFromPricePointTax: null,
        reasonIfUnavailable: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        fares: [
          {
            priceDifference: {
              amount: '30',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '80',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId1',
              fareProductId: 'PLU',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          },
          {
            priceDifference: {
              amount: '90',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '100',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId2',
              fareProductId: 'BUS',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          }
        ],
        _meta: {
          productId: null,
          fareProductId: null,
          standbyProductId: 'standbyProductId2',
          cardId: '',
          durationMinutes: 300,
          numberOfStops: 2,
          startingFromAmount: 100,
          departureTime: '1010'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: '',
              flightIdentifier: ''
            }
          }
        },
        isNextDayArrival: false,
        hasLowestFare: false
      },
      {
        departureTime: '10:55',
        arrivalTime: '16:00',
        duration: '5h 5m',
        stopDescription: '1 Stop, ATL',
        stopDescriptionOnSelect: '1 Stop, Change planes ATL',
        shortStopDescription: '1 Stop',
        stopCity: 'ATL',
        flightNumbers: '973/1323',
        labelText: '$0',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: '',
        startingFromPricePointTax: null,
        reasonIfUnavailable: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        fares: [
          {
            priceDifference: {
              amount: '30',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '80',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId1',
              fareProductId: 'PLU',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          },
          {
            priceDifference: {
              amount: '90',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '100',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId2',
              fareProductId: 'BUS',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          }
        ],
        _meta: {
          productId: null,
          fareProductId: null,
          standbyProductId: 'standbyProductId2',
          cardId: '',
          durationMinutes: 605,
          numberOfStops: 1,
          startingFromAmount: 0,
          departureTime: '1055'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: '',
              flightIdentifier: ''
            }
          }
        },
        isNextDayArrival: false,
        hasLowestFare: false
      },
      {
        departureTime: '11:10',
        arrivalTime: '13:35',
        duration: '2h 25m',
        stopDescription: '1 Stop, HOU',
        stopDescriptionOnSelect: '1 Stop, Change planes HOU',
        shortStopDescription: '1 Stop',
        stopCity: 'HOU',
        flightNumbers: '1329/9691',
        labelText: '$0',
        standbyAmount: STANDBY_AMOUNT,
        standbyUnavailableText: '',
        startingFromPricePointTax: null,
        reasonIfUnavailable: null,
        discountedStartingFromPrice: null,
        discountedStartingFromPriceTax: null,
        fares: [
          {
            priceDifference: {
              amount: '30',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '80',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId1',
              fareProductId: 'PLU',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          },
          {
            priceDifference: {
              amount: '90',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '100',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: null
            },
            _meta: {
              productId: 'productId2',
              fareProductId: 'BUS',
              standbyProductId: null,
              fareType: ''
            },
            discountedPrice: null,
            discountedPricePointTax: null,
            earnPoints: null,
            fareDescription: '',
            limitedSeats: null,
            price: null,
            pricePointTax: null,
            reasonIfUnavailable: null
          }
        ],
        _meta: {
          productId: null,
          fareProductId: null,
          standbyProductId: 'standbyProductId2',
          cardId: '',
          durationMinutes: 145,
          numberOfStops: 1,
          startingFromAmount: null,
          departureTime: '1110'
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
            method: 'POST',
            body: {
              sameDayToken: '',
              flightIdentifier: ''
            }
          }
        },
        isNextDayArrival: false,
        hasLowestFare: false
      }
    ];

    return this;
  }

  withSortedCards(sortBy: SortingOptions = SortingOptions.DURATION_MINUTES) {
    if (sortBy === SortingOptions.DURATION_MINUTES) {
      this.sameDayShoppingPage.sameDayShoppingInformation.cards = [
        {
          departureTime: '07:10',
          arrivalTime: '08:15',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1757',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '20',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '710'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
    
        {
          departureTime: '11:10',
          arrivalTime: '13:35',
          duration: '2h 25m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '1329/9691',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 145,
            numberOfStops: 1,
            startingFromAmount: null,
            departureTime: '1110'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:00',
          arrivalTime: '13:00',
          duration: '3h 0m',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          flightNumbers: '1234',
          stopDescriptionOnSelect: 'Stop',
          fares: [
            {
              priceDifference: {
                amount: '191',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '200',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 180,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '1000'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '06:45',
          arrivalTime: '10:45',
          duration: '4h 0m',
          stopDescription: '1 Stop, ELP',
          stopDescriptionOnSelect: '1 Stop, Change planes ELP',
          shortStopDescription: '1 Stop',
          stopCity: 'ELP',
          flightNumbers: '523/993',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 240,
            numberOfStops: 1,
            startingFromAmount: 20,
            departureTime: '645'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:10',
          arrivalTime: '15:10',
          duration: '5h 0m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 300,
            numberOfStops: 2,
            startingFromAmount: 100,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:10',
          arrivalTime: '15:20',
          duration: '5h 10m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 310,
            numberOfStops: 2,
            startingFromAmount: -11,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:55',
          arrivalTime: '16:00',
          duration: '5h 5m',
          stopDescription: '1 Stop, ATL',
          stopDescriptionOnSelect: '1 Stop, Change planes ATL',
          shortStopDescription: '1 Stop',
          stopCity: 'ATL',
          flightNumbers: '973/1323',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 605,
            numberOfStops: 1,
            startingFromAmount: 0,
            departureTime: '1055'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        }
      ];
    }

    if (sortBy === SortingOptions.NUMBER_OF_STOPS) {
      this.sameDayShoppingPage.sameDayShoppingInformation.cards = [
        {
          departureTime: '07:10',
          arrivalTime: '08:15',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1757',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '20',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '710'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:00',
          arrivalTime: '13:00',
          duration: '3h 0m',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          flightNumbers: '1234',
          stopDescriptionOnSelect: 'Stop',
          fares: [
            {
              priceDifference: {
                amount: '191',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '200',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 180,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '1000'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '06:45',
          arrivalTime: '10:45',
          duration: '4h 0m',
          stopDescription: '1 Stop, ELP',
          stopDescriptionOnSelect: '1 Stop, Change planes ELP',
          shortStopDescription: '1 Stop',
          stopCity: 'ELP',
          flightNumbers: '523/993',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 240,
            numberOfStops: 1,
            startingFromAmount: 20,
            departureTime: '645'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:55',
          arrivalTime: '16:00',
          duration: '5h 5m',
          stopDescription: '1 Stop, ATL',
          stopDescriptionOnSelect: '1 Stop, Change planes ATL',
          shortStopDescription: '1 Stop',
          stopCity: 'ATL',
          flightNumbers: '973/1323',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 605,
            numberOfStops: 1,
            startingFromAmount: 0,
            departureTime: '1055'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '11:10',
          arrivalTime: '13:35',
          duration: '2h 25m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '1329/9691',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 145,
            numberOfStops: 1,
            startingFromAmount: null,
            departureTime: '1110'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:10',
          arrivalTime: '15:20',
          duration: '5h 10m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 310,
            numberOfStops: 2,
            startingFromAmount: -11,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:10',
          arrivalTime: '15:10',
          duration: '5h 0m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 300,
            numberOfStops: 2,
            startingFromAmount: 100,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        }
      ];
    }

    if (sortBy === SortingOptions.DEPARTURE_TIME) {
      this.sameDayShoppingPage.sameDayShoppingInformation.cards = [
        {
          departureTime: '06:45',
          arrivalTime: '10:45',
          duration: '4h 0m',
          stopDescription: '1 Stop, ELP',
          stopDescriptionOnSelect: '1 Stop, Change planes ELP',
          shortStopDescription: '1 Stop',
          stopCity: 'ELP',
          flightNumbers: '523/993',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 240,
            numberOfStops: 1,
            startingFromAmount: 20,
            departureTime: '645'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '07:10',
          arrivalTime: '08:15',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1757',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '20',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '710'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:00',
          arrivalTime: '13:00',
          duration: '3h 0m',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          flightNumbers: '1234',
          stopDescriptionOnSelect: 'Stop',
          fares: [
            {
              priceDifference: {
                amount: '191',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '200',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 180,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '1000'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:10',
          arrivalTime: '15:10',
          duration: '5h 0m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 300,
            numberOfStops: 2,
            startingFromAmount: 100,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:10',
          arrivalTime: '15:20',
          duration: '5h 10m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 310,
            numberOfStops: 2,
            startingFromAmount: -11,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:55',
          arrivalTime: '16:00',
          duration: '5h 5m',
          stopDescription: '1 Stop, ATL',
          stopDescriptionOnSelect: '1 Stop, Change planes ATL',
          shortStopDescription: '1 Stop',
          stopCity: 'ATL',
          flightNumbers: '973/1323',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 605,
            numberOfStops: 1,
            startingFromAmount: 0,
            departureTime: '1055'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '11:10',
          arrivalTime: '13:35',
          duration: '2h 25m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '1329/9691',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 145,
            numberOfStops: 1,
            startingFromAmount: null,
            departureTime: '1110'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        }
      ];
    }

    if (sortBy === SortingOptions.STARTING_FROM_AMOUNT) {
      this.sameDayShoppingPage.sameDayShoppingInformation.cards = [
        {
          departureTime: '10:10',
          arrivalTime: '15:20',
          duration: '5h 10m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 310,
            numberOfStops: 2,
            startingFromAmount: -11,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '07:10',
          arrivalTime: '08:15',
          duration: '1h 5m',
          stopDescription: 'Nonstop',
          stopDescriptionOnSelect: 'Nonstop',
          shortStopDescription: 'Nonstop',
          stopCity: null,
          flightNumbers: '1757',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '20',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '0',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 65,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '710'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:00',
          arrivalTime: '13:00',
          duration: '3h 0m',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          flightNumbers: '1234',
          stopDescriptionOnSelect: 'Stop',
          fares: [
            {
              priceDifference: {
                amount: '191',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '200',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 180,
            numberOfStops: 0,
            startingFromAmount: -6,
            departureTime: '1000'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: true
        },
        {
          departureTime: '10:55',
          arrivalTime: '16:00',
          duration: '5h 5m',
          stopDescription: '1 Stop, ATL',
          stopDescriptionOnSelect: '1 Stop, Change planes ATL',
          shortStopDescription: '1 Stop',
          stopCity: 'ATL',
          flightNumbers: '973/1323',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 605,
            numberOfStops: 1,
            startingFromAmount: 0,
            departureTime: '1055'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '11:10',
          arrivalTime: '13:35',
          duration: '2h 25m',
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, Change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU',
          flightNumbers: '1329/9691',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 145,
            numberOfStops: 1,
            startingFromAmount: null,
            departureTime: '1110'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '06:45',
          arrivalTime: '10:45',
          duration: '4h 0m',
          stopDescription: '1 Stop, ELP',
          stopDescriptionOnSelect: '1 Stop, Change planes ELP',
          shortStopDescription: '1 Stop',
          stopCity: 'ELP',
          flightNumbers: '523/993',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 240,
            numberOfStops: 1,
            startingFromAmount: 20,
            departureTime: '645'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        },
        {
          departureTime: '10:10',
          arrivalTime: '15:10',
          duration: '5h 0m',
          stopDescription: '2 Stop, ABQ, CCU',
          stopDescriptionOnSelect: '2 Stop, Change planes ABQ',
          shortStopDescription: '2 Stop',
          stopCity: 'ABQ',
          flightNumbers: '2161/2376',
          labelText: '$0',
          standbyAmount: STANDBY_AMOUNT,
          standbyUnavailableText: '',
          startingFromPricePointTax: null,
          reasonIfUnavailable: null,
          discountedStartingFromPrice: null,
          discountedStartingFromPriceTax: null,
          fares: [
            {
              priceDifference: {
                amount: '30',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              priceDiffPointsTax: {
                amount: '80',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId1',
                fareProductId: 'PLU',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            },
            {
              priceDifference: {
                amount: '90',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: '+'
              },
              priceDiffPointsTax: {
                amount: '100',
                currencyCode: 'USD',
                currencySymbol: '$',
                sign: null
              },
              _meta: {
                productId: 'productId2',
                fareProductId: 'BUS',
                standbyProductId: null,
                fareType: ''
              },
              discountedPrice: null,
              discountedPricePointTax: null,
              earnPoints: null,
              fareDescription: '',
              limitedSeats: null,
              price: null,
              pricePointTax: null,
              reasonIfUnavailable: null
            }
          ],
          _meta: {
            productId: null,
            fareProductId: null,
            standbyProductId: 'standbyProductId2',
            cardId: '',
            durationMinutes: 300,
            numberOfStops: 2,
            startingFromAmount: 100,
            departureTime: '1010'
          },
          _links: {
            sameDayFlightDetails: {
              href: '/v1/mobile-air-operations/feature/same-day/details/2UIXQR',
              method: 'POST',
              body: {
                sameDayToken: '',
                flightIdentifier: ''
              }
            }
          },
          isNextDayArrival: false,
          hasLowestFare: false
        }
      ];
    }

    return this;
  }

  withAppliedSortAndFilterData(sortBy: SortingOptions = SortingOptions.DEPARTURE_TIME) {
    this.sameDayShoppingPage.sameDayShoppingInformation.appliedSortAndFilterData = { sortby: sortBy };

    return this;
  }

  withStandbyUnavailableText() {
    this.sameDayShoppingPage.sameDayShoppingInformation.expandedDetails.standbyLabel = 'Stand by';
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].standbyUnavailableText = 'See agent';
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].standbyAmount = null;

    return this;
  }

  withChangeUnavailableText() {
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].changeUnavailableText = 'Sold Out';

    return this;
  }

  withoutAllowSameDayChange() {
    this.sameDayShoppingPage.sameDayShoppingInformation.expandedDetails.allowSameDayChange = false;
    this.sameDayShoppingPage.sameDayShoppingInformation.expandedDetails.standbyLabel = 'Stand by';
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[2].standbyAmount = null;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[4].standbyAmount = null;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[2].standbyUnavailableText = 'See agent';
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[4].standbyUnavailableText = 'See agent';

    return this;
  }

  withAllowSameDayChangeAndLabelSubText() {
    this.sameDayShoppingPage.sameDayShoppingInformation.shoppingDisclaimers = undefined;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards.forEach((card) => {
      card.standbyLabelSubText = 'Taxes may apply';
    });

    return this;
  }

  withoutConfirmBaggageMessage() {
    this.sameDayShoppingPage.sameDayShoppingInformation.confirmBaggageMessage = null;

    return this;
  }

  withoutStandbyPricing() {
    delete this.sameDayShoppingPage.sameDayShoppingInformation.cards[0]._meta.standbyProductId;
    this.sameDayShoppingPage.sameDayShoppingInformation._links = {};

    return this;
  }

  withoutValues() {
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].changeUnavailableText = null;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].standbyUnavailableText = null;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].standbyAmount = null;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].startingFromPriceDifference = null;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards[0].startingFromPriceDiffPointsTax = null;
  }

  withPointsBooking() {
    this.sameDayShoppingPage.sameDayShoppingInformation._meta.purchaseWithPoints = true;
    this.sameDayShoppingPage.sameDayShoppingInformation.cards = [
      {
        departureTime: '11:25',
        arrivalTime: '12:25',
        duration: '1h 0m',
        shortStopDescription: 'Nonstop',
        stopCity: null,
        flightNumbers: '1448',
        labelText: 'See options',
        standbyLabelText: '0',
        standbyUnavailableText: null,
        standbyLabelSubText: 'Taxes may apply',
        changeUnavailableText: null,
        standbyAmount: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: '',
          sign: null
        },
        startingFromPriceDifference: {
          amount: '771',
          currencyCode: 'PTS',
          currencySymbol: '',
          sign: '-'
        },
        startingFromPriceDiffPointsTax: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: '+'
        },
        fares: [
          {
            priceDifference: {
              amount: '771',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '-'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTE6MjUiLCJhcnJpdmVzVGltZSI6IjEyOjI1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNDQ4IiwiZmFyZUZhbWlseSI6IldHQSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0Ijp0cnVlLCJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJmbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTQ0OEhOTElUTzIwMjMxMTA4IiwiZmxpZ2h0TnVtYmVyIjoiMTQ0OCIsIm1hcmtldGluZ0NhcnJpZXIiOiJXTiIsIm9wZXJhdGluZ0NhcnJpZXIiOiJXTiIsIm51bWJlck9mU3RvcHMiOjAsImRlcGFydHVyZSI6eyJhaXJwb3J0Q29kZSI6IkhOTCIsImxvY2FsRGF0ZVRpbWUiOiIyMDIzLTExLTA4VDExOjI1OjAwLTEwOjAwIn0sImFycml2YWwiOnsiYWlycG9ydENvZGUiOiJJVE8iLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMjoyNTowMC0xMDowMCJ9fV0sImZsaWdodE9mZmVyIjp7Im9mZmVySWQiOiIxIiwib2ZmZXJUeXBlIjoiQ09ORklSTUVEIiwib2ZmZXJQcmljZSI6eyJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOi03NzEsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsfSwiZmFyZUZhbWlseSI6IldHQSIsInRyYXZlbGVyUHJpY2VzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXJzIjpbIjYxMEJBMkE4MDAwMENCNzciXSwidHJhdmVsZXJUeXBlIjoiQURVTFQiLCJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOi03NzEsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsLCJmYXJlRGV0YWlsc0J5U2VnbWVudCI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTQ0OEhOTElUTzIwMjMxMTA4IiwiYm9va2luZ0NsYXNzIjoiWiIsImZhcmVCYXNpcyI6IlpZTkZGMkgifV19XX19',
              fareProductId: 'WGA'
            }
          },
          {
            priceDifference: {
              amount: '0',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTE6MjUiLCJhcnJpdmVzVGltZSI6IjEyOjI1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNDQ4IiwiZmFyZUZhbWlseSI6IlBMVSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjE0NDgiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMToyNTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTI6MjU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiMyIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJQTFUiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IloiLCJmYXJlQmFzaXMiOiJaWU5GRjRRIn1dfV19fQ==',
              fareProductId: 'PLU'
            }
          },
          {
            priceDifference: {
              amount: '773',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTE6MjUiLCJhcnJpdmVzVGltZSI6IjEyOjI1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNDQ4IiwiZmFyZUZhbWlseSI6IkFOWSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjE0NDgiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMToyNTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTI6MjU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiNCIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10Ijo3NzMsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsfSwiZmFyZUZhbWlseSI6IkFOWSIsInRyYXZlbGVyUHJpY2VzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXJzIjpbIjYxMEJBMkE4MDAwMENCNzciXSwidHJhdmVsZXJUeXBlIjoiQURVTFQiLCJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjc3MywiY3VycmVuY3kiOiJQIn19LCJhZGRDb2xsZWN0IjpudWxsLCJyZWZ1bmQiOm51bGwsImZhcmVEZXRhaWxzQnlTZWdtZW50IjpbeyJmbGlnaHRJZGVudGlmaWVyIjoiV04xNDQ4SE5MSVRPMjAyMzExMDgiLCJib29raW5nQ2xhc3MiOiJaIiwiZmFyZUJhc2lzIjoiWllORkY2QiJ9XX1dfX0=',
              fareProductId: 'ANY'
            }
          },
          {
            priceDifference: {
              amount: '3,862',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTE6MjUiLCJhcnJpdmVzVGltZSI6IjEyOjI1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNDQ4IiwiZmFyZUZhbWlseSI6IkJVUyIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjE0NDgiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMToyNTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTI6MjU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiNSIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjozODYyLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJCVVMiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjozODYyLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IkIiLCJmYXJlQmFzaXMiOiJCWU5GRjhaIn1dfV19fQ==',
              fareProductId: 'BUS'
            }
          }
        ],
        isNextDayArrival: false,
        isOvernight: false,
        _meta: {
          standbyProductId:
            'eyJzdGFuZEJ5UHJvZHVjdCI6dHJ1ZSwiZmxpZ2h0SWRlbnRpZmllciI6IldOMTQ0OEhOTElUTzIwMjMxMTA4IiwiZGVwYXJ0c1RpbWUiOiIxMToyNSIsImFycml2ZXNUaW1lIjoiMTI6MjUiLCJmcm9tQWlycG9ydENvZGUiOiJITkwiLCJ0b0FpcnBvcnRDb2RlIjoiSVRPIiwiZmxpZ2h0TnVtYmVycyI6IjE0NDgiLCJmYXJlRmFtaWx5IjoiUExVIiwiY3VycmVuY3kiOiJQVFMiLCJjcmVkaXQiOmZhbHNlLCJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJmbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTQ0OEhOTElUTzIwMjMxMTA4IiwiZmxpZ2h0TnVtYmVyIjoiMTQ0OCIsIm1hcmtldGluZ0NhcnJpZXIiOiJXTiIsIm9wZXJhdGluZ0NhcnJpZXIiOiJXTiIsIm51bWJlck9mU3RvcHMiOjAsImRlcGFydHVyZSI6eyJhaXJwb3J0Q29kZSI6IkhOTCIsImxvY2FsRGF0ZVRpbWUiOiIyMDIzLTExLTA4VDExOjI1OjAwLTEwOjAwIn0sImFycml2YWwiOnsiYWlycG9ydENvZGUiOiJJVE8iLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMjoyNTowMC0xMDowMCJ9fV0sImZsaWdodE9mZmVyIjp7Im9mZmVySWQiOiIyIiwib2ZmZXJUeXBlIjoiU0FNRV9EQVlfU1RBTkRCWSIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJQTFUiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE0NDhITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IloiLCJmYXJlQmFzaXMiOiJaWU5GRjRRIn1dfV19fQ==',
          cardId: 'HNL:ITO:1:2023-11-08',
          durationMinutes: 60,
          numberOfStops: 0,
          departureTime: '1125',
          startingFromAmount: -771,
          hasStandby: true,
          hasChange: true,
          isNonStop: true
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/page/same-day/flight-details/3BQV7C',
            method: 'POST',
            body: {
              sameDayToken:
                'eyJyZWNvcmRMb2NhdG9yIjoiM0JRVjdDIiwicmVjaXBpZW50RW1haWwiOiJFMTA5NjA5QFdOQ08uQ09NIiwic2FtZURheUJvdW5kU2VsZWN0aW9ucyI6W3siZmxpZ2h0VHlwZSI6IkRlcGFydHVyZSIsIm9yaWdpbmFsRGF0ZSI6IjIwMjMtMTEtMDgiLCJmcm9tQWlycG9ydCI6Ikhvbm9sdWx1IChPYWh1KSwgSEkgKEhOTCkiLCJmcm9tQWlycG9ydENvZGUiOiJITkwiLCJ0b0FpcnBvcnQiOiJIaWxvIChIYXdhaWkgSXNsYW5kKSwgSEkgKElUTykiLCJ0b0FpcnBvcnRDb2RlIjoiSVRPIiwiZmxpZ2h0IjoiMjQ4NiIsInRpbWVEZXBhcnRzIjoiMTk6MjUiLCJ0aW1lQXJyaXZlcyI6IjIwOjI1IiwiYm91bmRSZWZlcmVuY2UiOiJXTjI0ODZITkxJVE8yMDIzMTEwOCIsImlzU2VsZWN0YWJsZSI6dHJ1ZX1dLCJzYW1lRGF5VG9rZW5GbGlnaHRzIjpbeyJib3VuZFJlZmVyZW5jZSI6IldOMjQ4NkhOTElUTzIwMjMxMTA4IiwiZmxpZ2h0VGltZSI6IjIwMjMtMTEtMDhUMTk6MjU6MDAtMTA6MDAiLCJzdG9wRGVzY3JpcHRpb24iOiJOb25zdG9wIiwic3RvcENpdHkiOm51bGwsIm5leHREYXlBcnJpdmFsIjpmYWxzZSwic2FtZURheVRva2VuRmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjI0ODZITkxJVE8yMDIzMTEwOCIsImRlcGFydHVyZURhdGVUaW1lIjoiMjAyMy0xMS0wOFQxOToyNTowMC0xMDowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMjA6MjU6MDAtMTA6MDAifV19XSwic2FtZURheVRva2VuVHJhdmVsZXJzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXIiOiI2MTBCQTJBODAwMDBDQjc3IiwicGFzc2VuZ2VyVHlwZSI6IkEiLCJzYW1lRGF5VG9rZW5UcmF2ZWxlck5hbWUiOnsic3RydWN0dXJlZE5hbWUiOnsiZmlyc3ROYW1lIjoiTUlHVUVMIiwibGFzdE5hbWUiOiJDUlVaIn19LCJhY2NvdW50TnVtYmVyIjoiNjAxOTIyMDE2Iiwic2FtZURheVRva2VuQm9hcmRpbmdCb3VuZHMiOlt7ImJvdW5kUmVmZXJlbmNlIjoiV04yNDg2SE5MSVRPMjAyMzExMDgiLCJzYW1lRGF5VG9rZW5Cb2FyZGluZ1NlZ21lbnRzIjpbeyJmbGlnaHRJZGVudGlmaWVyIjoiV04yNDg2SE5MSVRPMjAyMzExMDgiLCJ0cmF2ZWxlclNlZ21lbnRJZGVudGlmaWVyIjoiNjAwQzYyQUEwMDAwRUMyNCJ9XSwiaGFzQUJhZyI6ZmFsc2UsImhhc0luYWN0aXZlQmFnIjpmYWxzZX1dfV0sInRyaXBUeXBlIjoiT1ciLCJwdXJjaGFzZXJBY2NvdW50TnVtYmVyIjoiNjAxOTIyMDE2In0=',
              flightIdentifier: 'WN1448HNLITO20231108'
            }
          }
        },
        mktg_data: {
          standby_message: '0',
          confirmed_message: '-771',
          air_bound1_flightnumber: '1448',
          air_bound1_lengthofflight: '60',
          air_bound1_time: '11:25',
          air_bound1_stops: '0',
          air_bound1_stoptype: 'nonstop'
        }
      },
      {
        departureTime: '13:45',
        arrivalTime: '14:45',
        duration: '1h 0m',
        shortStopDescription: 'Nonstop',
        stopCity: null,
        flightNumbers: '1763',
        labelText: 'See options',
        standbyLabelText: '0',
        standbyUnavailableText: null,
        standbyLabelSubText: 'Taxes may apply',
        changeUnavailableText: null,
        standbyAmount: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: '',
          sign: null
        },
        startingFromPriceDifference: {
          amount: '6983',
          currencyCode: 'PTS',
          currencySymbol: '',
          sign: '+'
        },
        startingFromPriceDiffPointsTax: {
          amount: '0.00',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: '+'
        },
        fares: [
          {
            priceDifference: {
              amount: '771',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '-'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTM6NDUiLCJhcnJpdmVzVGltZSI6IjE0OjQ1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNzYzIiwiZmFyZUZhbWlseSI6IldHQSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0Ijp0cnVlLCJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJmbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTc2M0hOTElUTzIwMjMxMTA4IiwiZmxpZ2h0TnVtYmVyIjoiMTc2MyIsIm1hcmtldGluZ0NhcnJpZXIiOiJXTiIsIm9wZXJhdGluZ0NhcnJpZXIiOiJXTiIsIm51bWJlck9mU3RvcHMiOjAsImRlcGFydHVyZSI6eyJhaXJwb3J0Q29kZSI6IkhOTCIsImxvY2FsRGF0ZVRpbWUiOiIyMDIzLTExLTA4VDEzOjQ1OjAwLTEwOjAwIn0sImFycml2YWwiOnsiYWlycG9ydENvZGUiOiJJVE8iLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxNDo0NTowMC0xMDowMCJ9fV0sImZsaWdodE9mZmVyIjp7Im9mZmVySWQiOiIxIiwib2ZmZXJUeXBlIjoiQ09ORklSTUVEIiwib2ZmZXJQcmljZSI6eyJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOi03NzEsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsfSwiZmFyZUZhbWlseSI6IldHQSIsInRyYXZlbGVyUHJpY2VzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXJzIjpbIjYxMEJBMkE4MDAwMENCNzciXSwidHJhdmVsZXJUeXBlIjoiQURVTFQiLCJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOi03NzEsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsLCJmYXJlRGV0YWlsc0J5U2VnbWVudCI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTc2M0hOTElUTzIwMjMxMTA4IiwiYm9va2luZ0NsYXNzIjoiWiIsImZhcmVCYXNpcyI6IlpZTkZGMkgifV19XX19',
              fareProductId: 'WGA'
            }
          },
          {
            priceDifference: {
              amount: '0',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTM6NDUiLCJhcnJpdmVzVGltZSI6IjE0OjQ1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNzYzIiwiZmFyZUZhbWlseSI6IlBMVSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjE3NjMiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMzo0NTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTQ6NDU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiMyIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJQTFUiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IloiLCJmYXJlQmFzaXMiOiJaWU5GRjRRIn1dfV19fQ==',
              fareProductId: 'PLU'
            }
          },
          {
            priceDifference: {
              amount: '773',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTM6NDUiLCJhcnJpdmVzVGltZSI6IjE0OjQ1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNzYzIiwiZmFyZUZhbWlseSI6IkFOWSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjE3NjMiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMzo0NTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTQ6NDU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiNCIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10Ijo3NzMsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsfSwiZmFyZUZhbWlseSI6IkFOWSIsInRyYXZlbGVyUHJpY2VzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXJzIjpbIjYxMEJBMkE4MDAwMENCNzciXSwidHJhdmVsZXJUeXBlIjoiQURVTFQiLCJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjc3MywiY3VycmVuY3kiOiJQIn19LCJhZGRDb2xsZWN0IjpudWxsLCJyZWZ1bmQiOm51bGwsImZhcmVEZXRhaWxzQnlTZWdtZW50IjpbeyJmbGlnaHRJZGVudGlmaWVyIjoiV04xNzYzSE5MSVRPMjAyMzExMDgiLCJib29raW5nQ2xhc3MiOiJaIiwiZmFyZUJhc2lzIjoiWllORkY2QiJ9XX1dfX0=',
              fareProductId: 'ANY'
            }
          },
          {
            priceDifference: {
              amount: '3,862',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTM6NDUiLCJhcnJpdmVzVGltZSI6IjE0OjQ1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIxNzYzIiwiZmFyZUZhbWlseSI6IkJVUyIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjE3NjMiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxMzo0NTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTQ6NDU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiNSIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjozODYyLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJCVVMiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjozODYyLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IkIiLCJmYXJlQmFzaXMiOiJCWU5GRjhaIn1dfV19fQ==',
              fareProductId: 'BUS'
            }
          }
        ],
        isNextDayArrival: false,
        isOvernight: false,
        _meta: {
          standbyProductId:
            'eyJzdGFuZEJ5UHJvZHVjdCI6dHJ1ZSwiZmxpZ2h0SWRlbnRpZmllciI6IldOMTc2M0hOTElUTzIwMjMxMTA4IiwiZGVwYXJ0c1RpbWUiOiIxMzo0NSIsImFycml2ZXNUaW1lIjoiMTQ6NDUiLCJmcm9tQWlycG9ydENvZGUiOiJITkwiLCJ0b0FpcnBvcnRDb2RlIjoiSVRPIiwiZmxpZ2h0TnVtYmVycyI6IjE3NjMiLCJmYXJlRmFtaWx5IjoiUExVIiwiY3VycmVuY3kiOiJQVFMiLCJjcmVkaXQiOmZhbHNlLCJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJmbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMTc2M0hOTElUTzIwMjMxMTA4IiwiZmxpZ2h0TnVtYmVyIjoiMTc2MyIsIm1hcmtldGluZ0NhcnJpZXIiOiJXTiIsIm9wZXJhdGluZ0NhcnJpZXIiOiJXTiIsIm51bWJlck9mU3RvcHMiOjAsImRlcGFydHVyZSI6eyJhaXJwb3J0Q29kZSI6IkhOTCIsImxvY2FsRGF0ZVRpbWUiOiIyMDIzLTExLTA4VDEzOjQ1OjAwLTEwOjAwIn0sImFycml2YWwiOnsiYWlycG9ydENvZGUiOiJJVE8iLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxNDo0NTowMC0xMDowMCJ9fV0sImZsaWdodE9mZmVyIjp7Im9mZmVySWQiOiIyIiwib2ZmZXJUeXBlIjoiU0FNRV9EQVlfU1RBTkRCWSIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJQTFUiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjE3NjNITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IloiLCJmYXJlQmFzaXMiOiJaWU5GRjRRIn1dfV19fQ==',
          cardId: 'HNL:ITO:2:2023-11-08',
          durationMinutes: 60,
          numberOfStops: 0,
          departureTime: '1345',
          startingFromAmount: -771,
          hasStandby: true,
          hasChange: true,
          isNonStop: true
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/page/same-day/flight-details/3BQV7C',
            method: 'POST',
            body: {
              sameDayToken:
                'eyJyZWNvcmRMb2NhdG9yIjoiM0JRVjdDIiwicmVjaXBpZW50RW1haWwiOiJFMTA5NjA5QFdOQ08uQ09NIiwic2FtZURheUJvdW5kU2VsZWN0aW9ucyI6W3siZmxpZ2h0VHlwZSI6IkRlcGFydHVyZSIsIm9yaWdpbmFsRGF0ZSI6IjIwMjMtMTEtMDgiLCJmcm9tQWlycG9ydCI6Ikhvbm9sdWx1IChPYWh1KSwgSEkgKEhOTCkiLCJmcm9tQWlycG9ydENvZGUiOiJITkwiLCJ0b0FpcnBvcnQiOiJIaWxvIChIYXdhaWkgSXNsYW5kKSwgSEkgKElUTykiLCJ0b0FpcnBvcnRDb2RlIjoiSVRPIiwiZmxpZ2h0IjoiMjQ4NiIsInRpbWVEZXBhcnRzIjoiMTk6MjUiLCJ0aW1lQXJyaXZlcyI6IjIwOjI1IiwiYm91bmRSZWZlcmVuY2UiOiJXTjI0ODZITkxJVE8yMDIzMTEwOCIsImlzU2VsZWN0YWJsZSI6dHJ1ZX1dLCJzYW1lRGF5VG9rZW5GbGlnaHRzIjpbeyJib3VuZFJlZmVyZW5jZSI6IldOMjQ4NkhOTElUTzIwMjMxMTA4IiwiZmxpZ2h0VGltZSI6IjIwMjMtMTEtMDhUMTk6MjU6MDAtMTA6MDAiLCJzdG9wRGVzY3JpcHRpb24iOiJOb25zdG9wIiwic3RvcENpdHkiOm51bGwsIm5leHREYXlBcnJpdmFsIjpmYWxzZSwic2FtZURheVRva2VuRmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjI0ODZITkxJVE8yMDIzMTEwOCIsImRlcGFydHVyZURhdGVUaW1lIjoiMjAyMy0xMS0wOFQxOToyNTowMC0xMDowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMjA6MjU6MDAtMTA6MDAifV19XSwic2FtZURheVRva2VuVHJhdmVsZXJzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXIiOiI2MTBCQTJBODAwMDBDQjc3IiwicGFzc2VuZ2VyVHlwZSI6IkEiLCJzYW1lRGF5VG9rZW5UcmF2ZWxlck5hbWUiOnsic3RydWN0dXJlZE5hbWUiOnsiZmlyc3ROYW1lIjoiTUlHVUVMIiwibGFzdE5hbWUiOiJDUlVaIn19LCJhY2NvdW50TnVtYmVyIjoiNjAxOTIyMDE2Iiwic2FtZURheVRva2VuQm9hcmRpbmdCb3VuZHMiOlt7ImJvdW5kUmVmZXJlbmNlIjoiV04yNDg2SE5MSVRPMjAyMzExMDgiLCJzYW1lRGF5VG9rZW5Cb2FyZGluZ1NlZ21lbnRzIjpbeyJmbGlnaHRJZGVudGlmaWVyIjoiV04yNDg2SE5MSVRPMjAyMzExMDgiLCJ0cmF2ZWxlclNlZ21lbnRJZGVudGlmaWVyIjoiNjAwQzYyQUEwMDAwRUMyNCJ9XSwiaGFzQUJhZyI6ZmFsc2UsImhhc0luYWN0aXZlQmFnIjpmYWxzZX1dfV0sInRyaXBUeXBlIjoiT1ciLCJwdXJjaGFzZXJBY2NvdW50TnVtYmVyIjoiNjAxOTIyMDE2In0=',
              flightIdentifier: 'WN1763HNLITO20231108'
            }
          }
        },
        mktg_data: {
          standby_message: '0',
          confirmed_message: '-771',
          air_bound1_flightnumber: '1763',
          air_bound1_lengthofflight: '60',
          air_bound1_time: '13:45',
          air_bound1_stops: '0',
          air_bound1_stoptype: 'nonstop'
        }
      },
      {
        departureTime: '17:15',
        arrivalTime: '18:15',
        duration: '1h 0m',
        shortStopDescription: 'Nonstop',
        stopCity: null,
        flightNumbers: '3258',
        labelText: 'See options',
        standbyLabelText: '0',
        standbyUnavailableText: null,
        standbyLabelSubText: 'Taxes may apply',
        changeUnavailableText: null,
        standbyAmount: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: '',
          sign: null
        },
        startingFromPriceDifference: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: '',
          sign: null
        },
        startingFromPriceDiffPointsTax: {
          amount: '11.99',
          currencyCode: 'USD',
          currencySymbol: '$',
          sign: '+'
        },
        fares: [
          {
            priceDifference: {
              amount: '771',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '-'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTc6MTUiLCJhcnJpdmVzVGltZSI6IjE4OjE1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIzMjU4IiwiZmFyZUZhbWlseSI6IldHQSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0Ijp0cnVlLCJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJmbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMzI1OEhOTElUTzIwMjMxMTA4IiwiZmxpZ2h0TnVtYmVyIjoiMzI1OCIsIm1hcmtldGluZ0NhcnJpZXIiOiJXTiIsIm9wZXJhdGluZ0NhcnJpZXIiOiJXTiIsIm51bWJlck9mU3RvcHMiOjAsImRlcGFydHVyZSI6eyJhaXJwb3J0Q29kZSI6IkhOTCIsImxvY2FsRGF0ZVRpbWUiOiIyMDIzLTExLTA4VDE3OjE1OjAwLTEwOjAwIn0sImFycml2YWwiOnsiYWlycG9ydENvZGUiOiJJVE8iLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxODoxNTowMC0xMDowMCJ9fV0sImZsaWdodE9mZmVyIjp7Im9mZmVySWQiOiIxIiwib2ZmZXJUeXBlIjoiQ09ORklSTUVEIiwib2ZmZXJQcmljZSI6eyJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOi03NzEsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsfSwiZmFyZUZhbWlseSI6IldHQSIsInRyYXZlbGVyUHJpY2VzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXJzIjpbIjYxMEJBMkE4MDAwMENCNzciXSwidHJhdmVsZXJUeXBlIjoiQURVTFQiLCJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOi03NzEsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsLCJmYXJlRGV0YWlsc0J5U2VnbWVudCI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMzI1OEhOTElUTzIwMjMxMTA4IiwiYm9va2luZ0NsYXNzIjoiWiIsImZhcmVCYXNpcyI6IlpZTkZGMkgifV19XX19',
              fareProductId: 'WGA'
            }
          },
          {
            priceDifference: {
              amount: '0',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: null
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTc6MTUiLCJhcnJpdmVzVGltZSI6IjE4OjE1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIzMjU4IiwiZmFyZUZhbWlseSI6IlBMVSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjMyNTgiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxNzoxNTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTg6MTU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiMyIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJQTFUiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IloiLCJmYXJlQmFzaXMiOiJaWU5GRjRRIn1dfV19fQ==',
              fareProductId: 'PLU'
            }
          },
          {
            priceDifference: {
              amount: '773',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTc6MTUiLCJhcnJpdmVzVGltZSI6IjE4OjE1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIzMjU4IiwiZmFyZUZhbWlseSI6IkFOWSIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjMyNTgiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxNzoxNTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTg6MTU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiNCIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10Ijo3NzMsImN1cnJlbmN5IjoiUCJ9fSwiYWRkQ29sbGVjdCI6bnVsbCwicmVmdW5kIjpudWxsfSwiZmFyZUZhbWlseSI6IkFOWSIsInRyYXZlbGVyUHJpY2VzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXJzIjpbIjYxMEJBMkE4MDAwMENCNzciXSwidHJhdmVsZXJUeXBlIjoiQURVTFQiLCJiYWxhbmNlIjp7Im1vbmV0YXJ5QW1vdW50cyI6eyJiYXNlRmFyZSI6bnVsbCwidG90YWxUYXhlcyI6bnVsbCwidG90YWxGZWVzIjpudWxsLCJ0b3RhbEFtdCI6MC4wMCwiY3VycmVuY3kiOiJVU0QifSwibG95YWx0eUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjc3MywiY3VycmVuY3kiOiJQIn19LCJhZGRDb2xsZWN0IjpudWxsLCJyZWZ1bmQiOm51bGwsImZhcmVEZXRhaWxzQnlTZWdtZW50IjpbeyJmbGlnaHRJZGVudGlmaWVyIjoiV04zMjU4SE5MSVRPMjAyMzExMDgiLCJib29raW5nQ2xhc3MiOiJaIiwiZmFyZUJhc2lzIjoiWllORkY2QiJ9XX1dfX0=',
              fareProductId: 'ANY'
            }
          },
          {
            priceDifference: {
              amount: '3,862',
              currencyCode: 'PTS',
              currencySymbol: '',
              sign: '+'
            },
            priceDiffPointsTax: {
              amount: '0.00',
              currencyCode: 'USD',
              currencySymbol: '$',
              sign: '+'
            },
            _meta: {
              productId:
                'eyJzdGFuZEJ5UHJvZHVjdCI6ZmFsc2UsImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImRlcGFydHNUaW1lIjoiMTc6MTUiLCJhcnJpdmVzVGltZSI6IjE4OjE1IiwiZnJvbUFpcnBvcnRDb2RlIjoiSE5MIiwidG9BaXJwb3J0Q29kZSI6IklUTyIsImZsaWdodE51bWJlcnMiOiIzMjU4IiwiZmFyZUZhbWlseSI6IkJVUyIsImN1cnJlbmN5IjoiUFRTIiwiY3JlZGl0IjpmYWxzZSwicGF5bWVudFJlcXVpcmVkIjpmYWxzZSwiZmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImZsaWdodE51bWJlciI6IjMyNTgiLCJtYXJrZXRpbmdDYXJyaWVyIjoiV04iLCJvcGVyYXRpbmdDYXJyaWVyIjoiV04iLCJudW1iZXJPZlN0b3BzIjowLCJkZXBhcnR1cmUiOnsiYWlycG9ydENvZGUiOiJITkwiLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxNzoxNTowMC0xMDowMCJ9LCJhcnJpdmFsIjp7ImFpcnBvcnRDb2RlIjoiSVRPIiwibG9jYWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMTg6MTU6MDAtMTA6MDAifX1dLCJmbGlnaHRPZmZlciI6eyJvZmZlcklkIjoiNSIsIm9mZmVyVHlwZSI6IkNPTkZJUk1FRCIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjozODYyLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJCVVMiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjozODYyLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IkIiLCJmYXJlQmFzaXMiOiJCWU5GRjhaIn1dfV19fQ==',
              fareProductId: 'BUS'
            }
          }
        ],
        isNextDayArrival: false,
        isOvernight: false,
        _meta: {
          standbyProductId:
            'eyJzdGFuZEJ5UHJvZHVjdCI6dHJ1ZSwiZmxpZ2h0SWRlbnRpZmllciI6IldOMzI1OEhOTElUTzIwMjMxMTA4IiwiZGVwYXJ0c1RpbWUiOiIxNzoxNSIsImFycml2ZXNUaW1lIjoiMTg6MTUiLCJmcm9tQWlycG9ydENvZGUiOiJITkwiLCJ0b0FpcnBvcnRDb2RlIjoiSVRPIiwiZmxpZ2h0TnVtYmVycyI6IjMyNTgiLCJmYXJlRmFtaWx5IjoiUExVIiwiY3VycmVuY3kiOiJQVFMiLCJjcmVkaXQiOmZhbHNlLCJwYXltZW50UmVxdWlyZWQiOmZhbHNlLCJmbGlnaHRTZWdtZW50cyI6W3siZmxpZ2h0SWRlbnRpZmllciI6IldOMzI1OEhOTElUTzIwMjMxMTA4IiwiZmxpZ2h0TnVtYmVyIjoiMzI1OCIsIm1hcmtldGluZ0NhcnJpZXIiOiJXTiIsIm9wZXJhdGluZ0NhcnJpZXIiOiJXTiIsIm51bWJlck9mU3RvcHMiOjAsImRlcGFydHVyZSI6eyJhaXJwb3J0Q29kZSI6IkhOTCIsImxvY2FsRGF0ZVRpbWUiOiIyMDIzLTExLTA4VDE3OjE1OjAwLTEwOjAwIn0sImFycml2YWwiOnsiYWlycG9ydENvZGUiOiJJVE8iLCJsb2NhbERhdGVUaW1lIjoiMjAyMy0xMS0wOFQxODoxNTowMC0xMDowMCJ9fV0sImZsaWdodE9mZmVyIjp7Im9mZmVySWQiOiIyIiwib2ZmZXJUeXBlIjoiU0FNRV9EQVlfU1RBTkRCWSIsIm9mZmVyUHJpY2UiOnsiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbH0sImZhcmVGYW1pbHkiOiJQTFUiLCJ0cmF2ZWxlclByaWNlcyI6W3sidHJhdmVsZXJJZGVudGlmaWVycyI6WyI2MTBCQTJBODAwMDBDQjc3Il0sInRyYXZlbGVyVHlwZSI6IkFEVUxUIiwiYmFsYW5jZSI6eyJtb25ldGFyeUFtb3VudHMiOnsiYmFzZUZhcmUiOm51bGwsInRvdGFsVGF4ZXMiOm51bGwsInRvdGFsRmVlcyI6bnVsbCwidG90YWxBbXQiOjAuMDAsImN1cnJlbmN5IjoiVVNEIn0sImxveWFsdHlBbW91bnRzIjp7ImJhc2VGYXJlIjpudWxsLCJ0b3RhbFRheGVzIjpudWxsLCJ0b3RhbEZlZXMiOm51bGwsInRvdGFsQW10IjowLCJjdXJyZW5jeSI6IlAifX0sImFkZENvbGxlY3QiOm51bGwsInJlZnVuZCI6bnVsbCwiZmFyZURldGFpbHNCeVNlZ21lbnQiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjMyNThITkxJVE8yMDIzMTEwOCIsImJvb2tpbmdDbGFzcyI6IloiLCJmYXJlQmFzaXMiOiJaWU5GRjRRIn1dfV19fQ==',
          cardId: 'HNL:ITO:3:2023-11-08',
          durationMinutes: 60,
          numberOfStops: 0,
          departureTime: '1715',
          startingFromAmount: -771,
          hasStandby: true,
          hasChange: true,
          isNonStop: true
        },
        _links: {
          sameDayFlightDetails: {
            href: '/v1/mobile-air-operations/page/same-day/flight-details/3BQV7C',
            method: 'POST',
            body: {
              sameDayToken:
                'eyJyZWNvcmRMb2NhdG9yIjoiM0JRVjdDIiwicmVjaXBpZW50RW1haWwiOiJFMTA5NjA5QFdOQ08uQ09NIiwic2FtZURheUJvdW5kU2VsZWN0aW9ucyI6W3siZmxpZ2h0VHlwZSI6IkRlcGFydHVyZSIsIm9yaWdpbmFsRGF0ZSI6IjIwMjMtMTEtMDgiLCJmcm9tQWlycG9ydCI6Ikhvbm9sdWx1IChPYWh1KSwgSEkgKEhOTCkiLCJmcm9tQWlycG9ydENvZGUiOiJITkwiLCJ0b0FpcnBvcnQiOiJIaWxvIChIYXdhaWkgSXNsYW5kKSwgSEkgKElUTykiLCJ0b0FpcnBvcnRDb2RlIjoiSVRPIiwiZmxpZ2h0IjoiMjQ4NiIsInRpbWVEZXBhcnRzIjoiMTk6MjUiLCJ0aW1lQXJyaXZlcyI6IjIwOjI1IiwiYm91bmRSZWZlcmVuY2UiOiJXTjI0ODZITkxJVE8yMDIzMTEwOCIsImlzU2VsZWN0YWJsZSI6dHJ1ZX1dLCJzYW1lRGF5VG9rZW5GbGlnaHRzIjpbeyJib3VuZFJlZmVyZW5jZSI6IldOMjQ4NkhOTElUTzIwMjMxMTA4IiwiZmxpZ2h0VGltZSI6IjIwMjMtMTEtMDhUMTk6MjU6MDAtMTA6MDAiLCJzdG9wRGVzY3JpcHRpb24iOiJOb25zdG9wIiwic3RvcENpdHkiOm51bGwsIm5leHREYXlBcnJpdmFsIjpmYWxzZSwic2FtZURheVRva2VuRmxpZ2h0U2VnbWVudHMiOlt7ImZsaWdodElkZW50aWZpZXIiOiJXTjI0ODZITkxJVE8yMDIzMTEwOCIsImRlcGFydHVyZURhdGVUaW1lIjoiMjAyMy0xMS0wOFQxOToyNTowMC0xMDowMCIsImFycml2YWxEYXRlVGltZSI6IjIwMjMtMTEtMDhUMjA6MjU6MDAtMTA6MDAifV19XSwic2FtZURheVRva2VuVHJhdmVsZXJzIjpbeyJ0cmF2ZWxlcklkZW50aWZpZXIiOiI2MTBCQTJBODAwMDBDQjc3IiwicGFzc2VuZ2VyVHlwZSI6IkEiLCJzYW1lRGF5VG9rZW5UcmF2ZWxlck5hbWUiOnsic3RydWN0dXJlZE5hbWUiOnsiZmlyc3ROYW1lIjoiTUlHVUVMIiwibGFzdE5hbWUiOiJDUlVaIn19LCJhY2NvdW50TnVtYmVyIjoiNjAxOTIyMDE2Iiwic2FtZURheVRva2VuQm9hcmRpbmdCb3VuZHMiOlt7ImJvdW5kUmVmZXJlbmNlIjoiV04yNDg2SE5MSVRPMjAyMzExMDgiLCJzYW1lRGF5VG9rZW5Cb2FyZGluZ1NlZ21lbnRzIjpbeyJmbGlnaHRJZGVudGlmaWVyIjoiV04yNDg2SE5MSVRPMjAyMzExMDgiLCJ0cmF2ZWxlclNlZ21lbnRJZGVudGlmaWVyIjoiNjAwQzYyQUEwMDAwRUMyNCJ9XSwiaGFzQUJhZyI6ZmFsc2UsImhhc0luYWN0aXZlQmFnIjpmYWxzZX1dfV0sInRyaXBUeXBlIjoiT1ciLCJwdXJjaGFzZXJBY2NvdW50TnVtYmVyIjoiNjAxOTIyMDE2In0=',
              flightIdentifier: 'WN3258HNLITO20231108'
            }
          }
        },
        mktg_data: {
          standby_message: '0',
          confirmed_message: '-771',
          air_bound1_flightnumber: '3258',
          air_bound1_lengthofflight: '60',
          air_bound1_time: '17:15',
          air_bound1_stops: '0',
          air_bound1_stoptype: 'nonstop'
        }
      }
    ];

    return this;
  }

  withOutDisclaimer() {
    this.sameDayShoppingPage.sameDayShoppingInformation.shoppingDisclaimers = undefined;

    return this;
  }

  withOutStandbyListFAQs() {
    this.sameDayShoppingPage.sameDayShoppingInformation.standbyListFAQs = undefined;

    return this;
  }

  build() {
    return this.sameDayShoppingPage;
  }
}

export default SameDayShoppingPageResponseBuilder;
