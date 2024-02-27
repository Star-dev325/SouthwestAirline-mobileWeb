import dayjs from 'dayjs';
import {
  generateCalendarStrip,
  getCalendarReturnAndDepartureDate,
  getCalendarReturnAndDepartureDateForReaccom,
  sortCardsBy,
  generatePricingRequest
} from 'src/shared/helpers/shoppingPageHelper';
import FakeClock from 'test/unit/helpers/fakeClock';
import FlightBoundPageBuilder from 'test/builders/model/flightBoundPageBuilder';
import FlightProductBuilder from 'test/builders/model/flightProductBuilder';

describe('shoppingPageHelper', () => {
  const departDate = '2018-05-04';
  const returnDate = '2018-05-05';
  const lastBookableDate = '2018-11-03';

  beforeEach(() => {
    FakeClock.setTimeTo(`${departDate}T00:00:00.000`);
  });

  afterEach(() => {
    FakeClock.restore();
  });

  context('calendar strip', () => {
    context('generateCalendarStrip', () => {
      it('should generate correct calender strip for outbound', () => {
        const result = generateCalendarStrip({
          isOutbound: true,
          departDate,
          returnDate,
          lastBookableDate
        });

        expect(result).to.deep.equal({
          defaultSelectedDate: departDate,
          popupDate: returnDate,
          startDate: dayjs(),
          endDate: dayjs(lastBookableDate)
        });
      });

      it('should generate correct calender strip for inbound', () => {
        const result = generateCalendarStrip({
          isOutbound: false,
          departDate,
          returnDate,
          lastBookableDate
        });

        expect(result).to.deep.equal({
          defaultSelectedDate: returnDate,
          popupDate: '',
          startDate: dayjs(departDate),
          endDate: dayjs(lastBookableDate)
        });
      });
    });

    context('getCalendarReturnAndDepartureDate', () => {
      it('should get the new return and departure date when direction is outbound and isOverrideEndDate is true', () => {
        const params = {
          direction: 'outbound',
          newDate: '2018-05-16',
          isOverrideEndDate: true,
          defaultReturnDate: '2018-05-10'
        };
        const returnAndDepartureDate = getCalendarReturnAndDepartureDate(params);
        const expectedResult = { departureDate: '2018-05-16', returnDate: '2018-05-16' };

        expect(returnAndDepartureDate).to.deep.equal(expectedResult);
      });

      it('should not override return and departure date when direction is outbound and isOverrideEndDate is false', () => {
        const params = {
          direction: 'outbound',
          newDate: '2018-05-16',
          isOverrideEndDate: false,
          defaultReturnDate: '2018-05-10'
        };
        const returnAndDepartureDate = getCalendarReturnAndDepartureDate(params);
        const expectedResult = { departureDate: '2018-05-16', returnDate: '2018-05-10' };

        expect(returnAndDepartureDate).to.deep.equal(expectedResult);
      });

      it('should not override return date when direction is inbound', () => {
        const params = {
          direction: 'inbound',
          newDate: '2018-05-16',
          isOverrideEndDate: false,
          defaultReturnDate: '2018-05-10'
        };
        const returnAndDepartureDate = getCalendarReturnAndDepartureDate(params);
        const expectedResult = { returnDate: '2018-05-16' };

        expect(returnAndDepartureDate).to.deep.equal(expectedResult);
      });
    });

    context('getCalendarReturnAndDepartureDateForReaccom', () => {
      it('should get the new return and departure date when direction is outbound and isOverrideEndDate is true', () => {
        const params = {
          direction: 'outbound',
          newDate: '2018-05-16',
          isOverrideEndDate: true,
          defaultReturnDate: '2018-05-10'
        };
        const reaccomProduct = getCalendarReturnAndDepartureDateForReaccom(params);
        const expectedResult = {
          body: {
            outbound: { date: '2018-05-16' },
            inbound: { date: '2018-05-16' }
          }
        };

        expect(reaccomProduct).to.deep.equal(expectedResult);
      });

      it('should not override return and departure date when direction is outbound and isOverrideEndDate is false', () => {
        const params = {
          direction: 'outbound',
          newDate: '2018-05-16',
          isOverrideEndDate: false,
          defaultReturnDate: '2018-05-10'
        };
        const reaccomProduct = getCalendarReturnAndDepartureDateForReaccom(params);
        const expectedResult = {
          body: {
            outbound: { date: '2018-05-16' },
            inbound: { date: '2018-05-10' }
          }
        };

        expect(reaccomProduct).to.deep.equal(expectedResult);
      });

      it('should only populate outbound when direction is outbound and isOverrideEndDate is false', () => {
        const params = {
          direction: 'outbound',
          newDate: '2018-05-16',
          isOverrideEndDate: false,
          defaultReturnDate: undefined
        };
        const reaccomProduct = getCalendarReturnAndDepartureDateForReaccom(params);
        const expectedResult = {
          body: {
            outbound: { date: '2018-05-16' }
          }
        };

        expect(reaccomProduct).to.deep.equal(expectedResult);
      });

      it('should populate return date when direction is inbound', () => {
        const params = {
          direction: 'inbound',
          newDate: '2018-05-16',
          isOverrideEndDate: false,
          defaultReturnDate: '2018-05-10'
        };
        const reaccomProduct = getCalendarReturnAndDepartureDateForReaccom(params);
        const expectedResult = {
          body: {
            inbound: { date: '2018-05-16' }
          }
        };

        expect(reaccomProduct).to.deep.equal(expectedResult);
      });
    });
  });

  context('sortBy', () => {
    it('should re-order the cards when sortBy is called', () => {
      const page = new FlightBoundPageBuilder()
        .addProductCard(new FlightProductBuilder().withStartingFromAmount(100).build())
        .build();

      expect(page.cards[0]._meta.startingFromAmount).to.deep.equal(218);
      expect(page.cards[1]._meta.startingFromAmount).to.deep.equal(218);
      expect(page.cards[2]._meta.startingFromAmount).to.deep.equal(100);

      const cards = sortCardsBy(page.cards, 'startingFromAmount');

      expect(cards[0]._meta.startingFromAmount).to.deep.equal(100);
      expect(cards[1]._meta.startingFromAmount).to.deep.equal(218);
      expect(cards[2]._meta.startingFromAmount).to.deep.equal(218);
    });
  });

  context('generate pricing request', () => {
    it('should generate pricing request when selecting outbound on one way', () => {
      const changePricing = {
        href: 'url',
        method: 'POST',
        body: {
          boundReference: ['boundReferenceA']
        }
      };
      const selectedProducts = {
        outbound: {
          fareProductId: 'outboundFareId',
          flightCardIndex: 0
        }
      };

      const pricingRequest = generatePricingRequest(changePricing, selectedProducts);

      expect(pricingRequest).to.deep.equal({
        href: 'url',
        method: 'POST',
        body: {
          changeRequests: [
            {
              boundReference: 'boundReferenceA',
              productId: 'outboundFareId'
            }
          ]
        }
      });
    });

    it('should generate pricing request when selecting outbound on round trip', () => {
      const changePricing = {
        href: 'url',
        method: 'POST',
        body: {
          boundReference: ['boundReferenceA', 'boundReferenceB']
        }
      };
      const selectedProducts = {
        outbound: {
          fareProductId: 'outboundFareId',
          flightCardIndex: 0
        }
      };

      const pricingRequest = generatePricingRequest(changePricing, selectedProducts);

      expect(pricingRequest).to.deep.equal({
        href: 'url',
        method: 'POST',
        body: {
          changeRequests: [
            {
              boundReference: 'boundReferenceA',
              productId: 'outboundFareId'
            },
            {
              boundReference: 'boundReferenceB'
            }
          ]
        }
      });
    });

    it('should generate pricing request when selecting inbound on round trip', () => {
      const changePricing = {
        href: 'url',
        method: 'POST',
        body: {
          boundReference: ['boundReferenceA', 'boundReferenceB']
        }
      };
      const selectedProducts = {
        inbound: {
          fareProductId: 'inboundFareId',
          flightCardIndex: 0
        }
      };

      const pricingRequest = generatePricingRequest(changePricing, selectedProducts);

      expect(pricingRequest).to.deep.equal({
        href: 'url',
        method: 'POST',
        body: {
          changeRequests: [
            {
              boundReference: 'boundReferenceA'
            },
            {
              boundReference: 'boundReferenceB',
              productId: 'inboundFareId'
            }
          ]
        }
      });
    });

    it('should generate pricing request when selecting both bounds from round trip', () => {
      const changePricing = {
        href: 'url',
        method: 'POST',
        body: {
          boundReference: ['boundReferenceA', 'boundReferenceB']
        }
      };
      const selectedProducts = {
        outbound: {
          fareProductId: 'outboundFareId',
          flightCardIndex: 0
        },
        inbound: {
          fareProductId: 'inboundFareId',
          flightCardIndex: 1
        }
      };

      const pricingRequest = generatePricingRequest(changePricing, selectedProducts);

      expect(pricingRequest).to.deep.equal({
        href: 'url',
        method: 'POST',
        body: {
          changeRequests: [
            {
              boundReference: 'boundReferenceA',
              productId: 'outboundFareId'
            },
            {
              boundReference: 'boundReferenceB',
              productId: 'inboundFareId'
            }
          ]
        }
      });
    });
  });
});
