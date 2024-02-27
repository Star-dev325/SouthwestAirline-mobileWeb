// @flow
import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';
import productDefinitions from 'mocks/templates/productDefinitions';

import type { FlightProductCard } from 'src/shared/flow-typed/shared.types';
import type { FlightShoppingPageType, FlightShoppingPageResponseType } from 'src/airBooking/flow-typed/airBooking.types';

class ProductsBuilder {
  flightShoppingPage: FlightShoppingPageType = {
    promoCodeNotice: null,
    disclaimerWithLinks: null,
    outboundPage: {
      header: {
        airportInfo: 'DAL - AUS',
        selectedDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
        originAirport: 'DAL',
        destinationAirport: 'AUS'
      },
      cards: [
        new FlightProductBuilder(0).withLowestFlight().build(),
        new FlightProductBuilder(1).build(),
        new FlightProductBuilder().withPoints(2).withLowestFlight().build(),
        new FlightProductBuilder(3).withStopDescription({
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU'
        }).build(),
        new FlightProductBuilder(4).withStopDescription({
          stopDescription: '1 Stop, HOU',
          stopDescriptionOnSelect: '1 Stop, change planes HOU',
          shortStopDescription: '1 Stop',
          stopCity: 'HOU'
        }).withLowestFlight().withNextDayArrival().build(),
        new FlightProductBuilder(5).withAllFaresUnavailableWithReason('Airplane Is Tired').build(),
        new FlightProductBuilder(6).withOvernight().build()
      ]
    },
    inboundPage: null,
    _links: {
      flightPricingPage: {
        href: 'v1/flights/prices',
        method: 'POST',
        body: {
          adultPassengers: null,
          currency: 'USD',
          promoCodeToken: null,
          chaseSessionId: null
        }
      },
      fareDetails: { href: '/fare-details', labelText: 'Compare fare benefits', method: 'GET' }
    },
    messages: [],
    showSgaMessage: false,
    _meta: {
      purchaseWithPoints: false,
      hasAdult: true,
      isPromoCodeApplied: false
    },
    _analytics: {
      userExperienceId: '4cf580d1-5396-43f5-b6f2-c483b4cc747d',
      requestId: 'pUnA_VM0SbCWV_lhjLbVDQ',
      channelId: 'mweb'
    }
  };

  withSelectedData(selectedDate: string): ProductsBuilder {
    const setSelectedDate = (boundType) => {
      if (_.get(this.flightShoppingPage, `${boundType}.header.selectedDate`)) {
        _.set(this.flightShoppingPage, `${boundType}.header.selectedDate`, selectedDate);
      }
    };

    setSelectedDate('outboundPage');
    setSelectedDate('inboundPage');

    return this;
  }

  withValidPromoCode(): ProductsBuilder {
    this.flightShoppingPage._meta.isPromoCodeApplied = true;
    this.flightShoppingPage.promoCodeNotice = 'Promo code MWEBTESTPR applied!';

    return this;
  }

  withInvalidPromoCode(): ProductsBuilder {
    this.flightShoppingPage._meta.isPromoCodeApplied = false;
    this.flightShoppingPage.promoCodeNotice = 'Oops! The promotion code entered was not recognized.';

    return this;
  }

  withSGAMessage(): ProductsBuilder {
    this.flightShoppingPage.messages = [
      {
        key: 'MESSAGE_GOVERNMENT_APPROVAL',
        icon: 'WARNING',
        textColor: 'DEFAULT',
        header: 'Subject to Government Approval',
        body: 'Southwest is currently awaiting government approval for this route. We anticipate approval to be granted shortly with no impact to your travel plans.'
      }
    ];
    this.flightShoppingPage.showSgaMessage = true;

    return this;
  }

  withOutboundPage(
    departureDate: Dayjs = dayjs().add(7, 'day'),
    flightProducts: Array<FlightProductCard> = [
      new FlightProductBuilder(0).build(),
      new FlightProductBuilder(1).build()
    ]): ProductsBuilder {
    this.flightShoppingPage.outboundPage = {
      header: {
        airportInfo: 'DAL - AUS',
        selectedDate: departureDate.format('YYYY-MM-DD'),
        originAirport: 'DAL',
        destinationAirport: 'AUS'
      },
      cards: flightProducts
    };

    return this;
  }

  withInboundPage(departureDate: Dayjs = dayjs().add(11, 'day')): ProductsBuilder {
    this.flightShoppingPage.inboundPage = {
      header: {
        airportInfo: 'AUS - DAL',
        selectedDate: departureDate.format('YYYY-MM-DD'),
        originAirport: 'AUS',
        destinationAirport: 'DAL'
      },
      cards: [
        new FlightProductBuilder(0).build(),
        new FlightProductBuilder(1).build()
      ]
    };

    return this;
  }

  withProductDefinitions() {
    this.flightShoppingPage.productDefinitions = {
      ...productDefinitions,
      products: productDefinitions.products.filter(product => product.id !== 'PLU')
    };

    return this;
  }

  withAdult(hasAdult: boolean = true): ProductsBuilder {
    this.flightShoppingPage._meta.hasAdult = hasAdult;

    return this;
  }

  build(): FlightShoppingPageResponseType {
    return {
      flightShoppingPage: this.flightShoppingPage
    };
  }
}

export default ProductsBuilder;
