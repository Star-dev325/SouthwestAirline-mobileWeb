import _ from 'lodash';
import PricesBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/pricesBuilder';
import { getPricing as pricingSelector } from 'src/airBooking/analytics/pricingSelector';

describe('pricingSelector', () => {
  it('should return expected totals with discount for dollar booking', () => {
    const state = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder().build()
          }
        }
      }
    };
    const expectedTotalsByTaxType = {
      baseFareCents: '204.45',
      baseFarePoints: undefined,
      discountedBaseFareCents: '20.0',
      discountedBaseFarePoints: undefined,
      priceTotalAmountCents: '233.98',
      taxesAndFees: '29.53'
    };

    const pricing = pricingSelector(state);

    expect(pricing.adult.priceSearchTotals).to.deep.equal(expectedTotalsByTaxType);
  });

  it('should correctly return expected totals with paxtype PASSENGER', () => {
    const state = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder().build()
          }
        }
      }
    };
    const expectedTotalsByTaxType = {
      baseFareCents: '204.45',
      baseFarePoints: undefined,
      discountedBaseFareCents: '20.0',
      discountedBaseFarePoints: undefined,
      priceTotalAmountCents: '233.98',
      taxesAndFees: '29.53'
    };

    const pricing = pricingSelector(state);

    expect(pricing.adult.priceSearchTotals).to.deep.equal(expectedTotalsByTaxType);
  });

  it('should return expected totals without discount for dollar booking', () => {
    const state = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder().withNoDiscountForBaseFare('adult').build()
          }
        }
      }
    };

    const expectedTotalsByTaxType = {
      baseFareCents: '204.45',
      baseFarePoints: undefined,
      discountedBaseFareCents: '204.45',
      discountedBaseFarePoints: undefined,
      priceTotalAmountCents: '233.98',
      taxesAndFees: '29.53'
    };

    const pricing = pricingSelector(state);

    expect(pricing.adult.priceSearchTotals).to.deep.equal(expectedTotalsByTaxType);
  });

  it('should return expected totals with discount for points booking', () => {
    const paxType = 'adult';
    const state = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder().withPointsForBaseFare(paxType).withPointsForTotalPerPassenger(paxType).build()
          }
        }
      }
    };

    const expectedTotalsByTaxType = {
      baseFareCents: undefined,
      baseFarePoints: '204.45',
      discountedBaseFareCents: undefined,
      discountedBaseFarePoints: '20.0',
      priceTotalAmountCents: '233.98',
      taxesAndFees: '29.53'
    };

    const pricing = pricingSelector(state);

    expect(pricing.adult.priceSearchTotals).to.deep.equal(expectedTotalsByTaxType);
  });

  it('should return expected totals without discount for points booking', () => {
    const paxType = 'adult';

    const state = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder()
              .withPointsForBaseFare(paxType)
              .withPointsForTotalPerPassenger(paxType)
              .withNoDiscountForBaseFare(paxType)
              .build()
          }
        }
      }
    };

    const expectedTotalsByTaxType = {
      baseFareCents: undefined,
      baseFarePoints: '204.45',
      discountedBaseFareCents: undefined,
      discountedBaseFarePoints: '204.45',
      priceTotalAmountCents: '233.98',
      taxesAndFees: '29.53'
    };

    const pricing = pricingSelector(state);

    expect(pricing.adult.priceSearchTotals).to.deep.equal(expectedTotalsByTaxType);
  });

  it('should generate one way pricing', () => {
    const state = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder().build()
          }
        }
      },
      analytics: {
        AirBookingStore: {
          isChaseBannerShown: true,
          isChaseFlowCompleted: false
        }
      }
    };

    const pricing = pricingSelector(state);

    const expectedPricing = {
      adult: {
        inbound: undefined,
        outbound: {
          bookingCode: 'Q'
        },
        priceSearchTotals: {
          baseFareCents: '204.45',
          baseFarePoints: undefined,
          discountedBaseFareCents: '20.0',
          discountedBaseFarePoints: undefined,
          priceTotalAmountCents: '233.98',
          taxesAndFees: '29.53'
        }
      },
      flightNumber: '1504',
      chaseBannerShown: true,
      chaseFlowCompleted: undefined
    };

    expect(pricing).to.deep.equal(expectedPricing);
  });

  it('should generate round trip pricing', () => {
    const state = {
      app: {
        airBooking: {
          flightPricingPage: {
            response: new PricesBuilder().withRoundTrip().build()
          }
        }
      },
      analytics: {
        AirBookingStore: {
          isChaseBannerShown: false,
          isChaseFlowCompleted: true
        }
      }
    };

    const pricing = pricingSelector(state);

    const expectedPricing = {
      adult: {
        inbound: {
          bookingCode: 'Q'
        },
        outbound: {
          bookingCode: 'Q'
        },
        priceSearchTotals: {
          baseFareCents: '204.45',
          baseFarePoints: undefined,
          discountedBaseFareCents: '20.0',
          discountedBaseFarePoints: undefined,
          priceTotalAmountCents: '233.98',
          taxesAndFees: '29.53'
        }
      },
      flightNumber: '1504|1504',
      chaseBannerShown: false,
      chaseFlowCompleted: true
    };

    expect(pricing).to.deep.equal(expectedPricing);
  });

  context('flightNumber', () => {
    it('should set flightNumber for multiple flights', () => {
      const response = new PricesBuilder().build();
      const state = {};

      const flights = [{ number: 100 }, { number: 200 }, {}, { number: '' }, { number: 300 }];

      _.set(response, 'flightPricingPage.bounds[0].flights', flights);
      _.set(state, 'app.airBooking.flightPricingPage.response', response);

      const pricing = pricingSelector(state);

      expect(pricing.flightNumber).to.equal('100|200|300');
    });

    it('should set flightNumber for multiple flights for multiple bounds', () => {
      const response = new PricesBuilder().withRoundTrip().build();
      const state = {};

      const outboundFlights = [{ number: 100 }, { number: 200 }];
      const inboundFlights = [{ number: 300 }];

      _.set(response, 'flightPricingPage.bounds[0].flights', outboundFlights);
      _.set(response, 'flightPricingPage.bounds[1].flights', inboundFlights);
      _.set(response, 'flightPricingPage.bounds[2].flights', null);

      _.set(state, 'app.airBooking.flightPricingPage.response', response);

      const pricing = pricingSelector(state);

      expect(pricing.flightNumber).to.equal('100|200|300');
    });
  });

  context('taxesAndFees', () => {
    let response;
    let state;

    beforeEach(() => {
      response = new PricesBuilder().build();
      state = {
        analytics: {
          AirBookingStore: {
            isChaseBannerShown: true,
            isChaseFlowCompleted: false
          }
        }
      };
    });

    it('should set taxesAndFees total to 0.00 when taxes/fee array is empty', () => {
      _.set(response, 'flightPricingPage.totals.adultFare.taxesAndFees', []);
      _.set(state, 'app.airBooking.flightPricingPage.response', response);

      const pricing = pricingSelector(state);

      expect(pricing.adult.priceSearchTotals.taxesAndFees).to.equal('0.00');
    });

    it('should set taxesAndFees total to 0.00 when taxes/fee array is null', () => {
      _.set(response, 'flightPricingPage.totals.adultFare.taxesAndFees', null);
      _.set(state, 'app.airBooking.flightPricingPage.response', response);

      const pricing = pricingSelector(state);

      expect(pricing.adult.priceSearchTotals.taxesAndFees).to.equal('0.00');
    });
  });
});
