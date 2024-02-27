// @flow
import _ from 'lodash';

import type { CurrencyType, FareProduct } from 'src/shared/flow-typed/shared.types';

const fareDescriptionMap = {
  'Wanna Get Away': 'WGA',
  Anytime: 'ANY',
  'Business Select': 'BUS',
  Companion: 'COMPANION',
  Unavailable: '???'
};

const fareIdMap = {
  WANNA_GET_AWAY: 'WGA',
  ANYTIME: 'ANY',
  BUSINESS_SELECT: 'BUS'
};

export default class FareProductBuilder {
  fareProduct: FareProduct = {
    discountedPrice: null,
    discountedPricePointTax: null,
    earnPoints: 'Earn 2,316 pts',
    fareDescription: 'Wanna Get Away',
    limitedSeats: null,
    price: {
      amount: '428.98',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    priceDifference: null,
    priceDiffPointsTax: null,
    pricePointTax: null,
    reasonIfUnavailable: null,
    hasLowestFare: false,
    _meta: {
      fareProductId: 'WGA',
      fareType: 'WANNA_GET_AWAY',
      productId: 'WGA|ADT|LLN3PNR,L,AUS,BOS,2017-10-26T12:40-05:00,2017-10-26T17:40-04:00,WN,WN,198,73H'
    }
  };

  withReasonIfUnavailable(unavailableReason: string): FareProductBuilder {
    this.fareProduct.reasonIfUnavailable = unavailableReason;

    return this;
  }

  withFareDescription(fare: string): FareProductBuilder {
    this.fareProduct.fareDescription = fare;
    this.fareProduct._meta.fareType = _.flowRight(_.toUpper, _.snakeCase)(fare);
    this.fareProduct._meta.fareProductId = fareIdMap[this.fareProduct._meta.fareType] || fareDescriptionMap[fare] || '???';

    return this;
  }

  withLowestFare(): FareProductBuilder {
    this.fareProduct.hasLowestFare = true;

    return this;
  }

  withProductId(productId: string): FareProductBuilder {
    this.fareProduct._meta.productId = productId;

    return this;
  }

  withLimitedSeats(limitedSeats: string): FareProductBuilder {
    this.fareProduct.limitedSeats = limitedSeats;

    return this;
  }

  withPrice(price: ?CurrencyType): FareProductBuilder {
    this.fareProduct.price = price;

    return this;
  }

  withPricePointTax(pricePointTax: CurrencyType): FareProductBuilder {
    this.fareProduct.pricePointTax = pricePointTax;

    return this;
  }

  withPriceDifference(priceDifference: ?CurrencyType): FareProductBuilder {
    this.fareProduct.priceDifference = priceDifference;

    return this;
  }

  withPriceDiffPointsTax(priceDiffPointsTax: ?CurrencyType): FareProductBuilder {
    this.fareProduct.priceDiffPointsTax = priceDiffPointsTax;

    return this;
  }

  withEarnPoints(earnPoints: string): FareProductBuilder {
    this.fareProduct.earnPoints = earnPoints;

    return this;
  }

  withoutEarnPoints(): FareProductBuilder {
    this.fareProduct.earnPoints = null;

    return this;
  }

  withDiscountedPrice(discountedPrice: CurrencyType): FareProductBuilder {
    this.fareProduct.discountedPrice = discountedPrice;

    return this;
  }

  withDiscountedPricePointTax(discountedPricePointTax: CurrencyType): FareProductBuilder {
    this.fareProduct.discountedPricePointTax = discountedPricePointTax;

    return this;
  }

  build(): FareProduct {
    return { ...this.fareProduct };
  }
}
