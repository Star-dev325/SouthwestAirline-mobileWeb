// @flow
import FareProductBuilder from 'test/builders/model/fareProductForChapiBuilder';

import type { FlightProductCard, FlightProductCurrencyType, FareProduct } from 'src/shared/flow-typed/shared.types';

export default class FlightProductBuilder {
  flightProduct: FlightProductCard;

  constructor(id: number = 0) {
    this.flightProduct = {
      departureTime: '19:35',
      arrivalTime: '21:25',
      duration: '3h 50m',
      isNextDayArrival: false,
      isOvernight: false,
      stopDescription: 'Nonstop',
      stopDescriptionOnSelect: 'Nonstop',
      shortStopDescription: 'Nonstop',
      stopCity: null,
      flightNumbers: '4827',
      startingFromPrice: {
        amount: '218',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      startingFromPricePointTax: null,
      startingFromPriceSeniorOnly: null,
      reasonIfUnavailable: null,
      discountedStartingFromPrice: {
        amount: '200',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      discountedStartingFromPriceTax: null,
      discountedStartingFromPriceSeniorOnly: null,
      startingFromPriceDiffPointsTax: null,
      startingFromPriceDifference: null,
      dynamicWaiverAvailabilityText: null,
      hasLowestFare: false,
      fares: [
        new FareProductBuilder()
          .withFareDescription('Wanna Get Away')
          .withPrice({
            amount: '218',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withPriceDifference({
            amount: '25',
            currencyCode: 'USD',
            currencySymbol: '$',
            sign: '-'
          })
          .withEarnPoints('Earn 1,138 pts')
          .withLimitedSeats('3 left')
          .build(),
        new FareProductBuilder()
          .withFareDescription('Anytime')
          .withPrice({
            amount: '499',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withPriceDifference({
            amount: '0',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withEarnPoints('Earn 4,510 pts')
          .build(),
        new FareProductBuilder()
          .withFareDescription('Business Select')
          .withPrice({
            amount: '521',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withPriceDifference({
            amount: '25',
            currencyCode: 'USD',
            currencySymbol: '$',
            sign: '+'
          })
          .withEarnPoints('Earn 5,658 pts')
          .build()
      ],
      _meta: {
        cardId: `DAL:SFO:${id}:2017-10-24`,
        durationMinutes: 230,
        numberOfStops: 0,
        startingFromAmount: 218,
        startingFromAmountSeniorOnly: 150,
        departureTime: '1935'
      },
      _links: {
        sameDayFlightDetails: {
          href: '/v1/mobile-air-operations/page/same-day/flight-details/2ROHD7',
          method: 'POST',
          body: {
            sameDayToken: '',
            flightIdentifier: ''
          }
        }
      }
    };
  }

  withFareDifference(
    startingFromPriceDifference: FlightProductCurrencyType,
    startingFromPriceDiffPointsTax?: FlightProductCurrencyType
  ): FlightProductBuilder {
    this.flightProduct.startingFromPriceDifference = startingFromPriceDifference;
    this.flightProduct.startingFromPriceDiffPointsTax = startingFromPriceDiffPointsTax;

    return this;
  }

  withLowestFlight(): FlightProductBuilder {
    this.flightProduct.hasLowestFare = true;

    return this;
  }

  withStopDescription({
    stopDescription,
    stopDescriptionOnSelect,
    shortStopDescription,
    stopCity
  }: *): FlightProductBuilder {
    this.flightProduct.stopDescription = stopDescription;
    this.flightProduct.stopDescriptionOnSelect = stopDescriptionOnSelect;
    this.flightProduct.shortStopDescription = shortStopDescription;
    this.flightProduct.stopCity = stopCity;

    return this;
  }

  withNextDayArrival(): FlightProductBuilder {
    this.flightProduct.departureTime = '23:35';
    this.flightProduct.arrivalTime = '02:25';
    this.flightProduct.isNextDayArrival = true;

    return this;
  }

  withOvernight(): FlightProductBuilder {
    this.flightProduct.departureTime = '23:00';
    this.flightProduct.arrivalTime = '04:00';
    this.flightProduct.isOvernight = true;

    return this;
  }

  withOvernightAndNextDayArrival(): FlightProductBuilder {
    this.flightProduct.departureTime = '23:00';
    this.flightProduct.arrivalTime = '04:00';
    this.flightProduct.isNextDayArrival = true;
    this.flightProduct.isOvernight = true;

    return this;
  }

  withAllFaresUnavailableWithReason(unavailableReason: string = 'Unavailable'): FlightProductBuilder {
    this.flightProduct.fares = null;
    this.flightProduct.reasonIfUnavailable = unavailableReason;
    this.flightProduct.startingFromPrice = null;

    return this;
  }

  withPoints(id: number = 0): FlightProductBuilder {
    this.flightProduct = {
      departureTime: '19:35',
      arrivalTime: '21:25',
      duration: '3h 50m',
      isNextDayArrival: false,
      stopDescription: 'Nonstop',
      stopDescriptionOnSelect: 'Nonstop',
      stopCity: null,
      shortStopDescription: 'Nonstop',
      flightNumbers: '3333',
      startingFromPrice: {
        amount: '19,000',
        currencyCode: 'PTS'
      },
      startingFromPricePointTax: {
        amount: '34.06',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      discountedStartingFromPrice: {
        amount: '18,000',
        currencyCode: 'PTS'
      },
      discountedStartingFromPriceTax: {
        amount: '34.06',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      startingFromPriceSeniorOnly: null,
      discountedStartingFromPriceSeniorOnly: null,
      startingFromPriceDiffPointsTax: null,
      startingFromPriceDifference: null,
      dynamicWaiverAvailabilityText: null,
      hasLowestFare: false,
      fares: [
        new FareProductBuilder()
          .withFareDescription('Wanna Get Away')
          .withPrice({
            amount: '19,000',
            currencyCode: 'PTS'
          })
          .withLowestFare()
          .withPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withPriceDifference({
            amount: '500',
            currencyCode: 'PTS',
            currencySymbol: null,
            sign: '-'
          })
          .withPriceDiffPointsTax({
            amount: '22.22',
            currencyCode: 'USD',
            currencySymbol: '$',
            sign: '-'
          })
          .withDiscountedPrice({
            amount: '18,000',
            currencyCode: 'PTS'
          })
          .withDiscountedPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withoutEarnPoints()
          .build(),
        new FareProductBuilder()
          .withFareDescription('Anytime')
          .withPrice({
            amount: '24,720',
            currencyCode: 'PTS'
          })
          .withPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withPriceDifference({
            amount: '0',
            currencyCode: 'PTS',
            currencySymbol: null
          })
          .withDiscountedPrice({
            amount: '23,000',
            currencyCode: 'PTS'
          })
          .withDiscountedPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withoutEarnPoints()
          .build(),
        new FareProductBuilder()
          .withFareDescription('Business Select')
          .withPrice({
            amount: '32,000',
            currencyCode: 'PTS'
          })
          .withPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withPriceDifference({
            amount: '50,000',
            currencyCode: 'PTS',
            currencySymbol: null,
            sign: '+'
          })
          .withPriceDiffPointsTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$',
            sign: '+'
          })
          .withDiscountedPrice({
            amount: '30,000',
            currencyCode: 'PTS'
          })
          .withDiscountedPricePointTax({
            amount: '34.06',
            currencyCode: 'USD',
            currencySymbol: '$'
          })
          .withoutEarnPoints()
          .build()
      ],
      reasonIfUnavailable: null,
      _meta: {
        cardId: `DAL:SFO:${id}:2017-10-24`,
        durationMinutes: 230,
        numberOfStops: 0,
        startingFromAmount: 218,
        departureTime: '1935'
      },
      _links: {
        sameDayFlightDetails: {
          href: '/v1/mobile-air-operations/page/same-day/flight-details/2ROHD7',
          method: 'POST',
          body: {
            sameDayToken: '',
            flightIdentifier: ''
          }
        }
      }
    };

    return this;
  }

  withDynamicWaiver(dynamicWaiverAvailabilityText: string = 'Available'): FlightProductBuilder {
    this.flightProduct.dynamicWaiverAvailabilityText = dynamicWaiverAvailabilityText;

    return this;
  }

  withAllFareClassesSoldOut(): FlightProductBuilder {
    this.flightProduct.reasonIfUnavailable = 'Sold out';
    this.flightProduct.startingFromPrice = null;
    this.flightProduct.fares = [];

    return this;
  }

  addFareProduct(fareProduct: FareProduct): FlightProductBuilder {
    this.flightProduct.fares && this.flightProduct.fares.push(fareProduct);

    return this;
  }

  withUnavailableFareInProductGroup(selectedProductId: string): FlightProductBuilder {
    const fares = [
      new FareProductBuilder()
        .withFareDescription('Wanna Get Away')
        .withPrice({
          amount: '218',
          currencyCode: 'USD',
          currencySymbol: '$'
        })
        .withEarnPoints('Earn 1,138 pts')
        .withProductId(selectedProductId)
        .build(),
      new FareProductBuilder()
        .withFareDescription('Anytime')
        .withPrice(null)
        .withEarnPoints('')
        .withReasonIfUnavailable('Unavailble')
        .build(),
      new FareProductBuilder()
        .withFareDescription('Business Select')
        .withPrice({
          amount: '521',
          currencyCode: 'USD',
          currencySymbol: '$'
        })
        .withEarnPoints('Earn 5,658 pts')
        .build()
    ];

    this.flightProduct.fares = fares;

    return this;
  }

  withStartingFromAmount(amount: number): FlightProductBuilder {
    this.flightProduct._meta.startingFromAmount = amount;

    return this;
  }

  withSameDayLabelText(): FlightProductBuilder {
    this.flightProduct.labelText = 'See options';
    this.flightProduct.startingFromPrice = null;

    return this;
  }

  build(): FlightProductCard {
    return { ...this.flightProduct };
  }
}
