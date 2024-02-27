import ProductsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/flights/productsBuilder';
import {
  getNextFlightShoppingPageParams,
  getFirstShoppingPageParams,
  generateFlightShoppingPages
} from 'src/airBooking/helpers/flightShoppingPageHelper';
import FakeClock from 'test/unit/helpers/fakeClock';

describe('flightShoppingPageHelper', () => {
  afterEach(() => {
    FakeClock.restore();
  });
  context('getNextFlightShoppingPageParams', () => {
    it('should get inbound page params when user booking flight with round trip', () => {
      const params = getNextFlightShoppingPageParams(
        { paxType: 'adult', direction: 'outbound' },
        {
          inboundPage: {},
          _meta: { hasAdult: true }
        }
      );

      expect(params).to.deep.equal({ paxType: 'adult', direction: 'inbound' });
    });

    it('should get undefined when user on last page', () => {
      expect(
        getNextFlightShoppingPageParams(
          { paxType: 'adult', direction: 'outbound' },
          {
            _meta: { hasAdult: true }
          }
        )
      ).to.be.undefined;
      expect(
        getNextFlightShoppingPageParams(
          { paxType: 'adult', direction: 'inbound' },
          {
            inboundPage: {},
            _meta: { hasAdult: true }
          }
        )
      ).to.be.undefined;
    });
  });

  context('getFirstShoppingPageParams', () => {
    it('should return adult outbound when booking with adult', () => {
      const searchRequest = {
        numberOfAdults: 1
      };

      expect(getFirstShoppingPageParams(searchRequest)).to.deep.equal({ paxType: 'adult', direction: 'outbound' });
    });
  });

  context('generateFlightShoppingPages', () => {
    it('should generate 1 page when booking one way flight with adult only', () => {
      const response = new ProductsBuilder().withAdult().build();
      const pages = generateFlightShoppingPages(response);

      expect(pages).to.have.lengthOf(1);
      expect(pages[0].paxType).to.be.equal('adult');
      expect(pages[0].direction).to.be.equal('outbound');
    });

    it('should generate 2 pages when booking round trip flight with adult only', () => {
      const response = new ProductsBuilder().withInboundPage().withAdult().build();
      const pages = generateFlightShoppingPages(response);

      expect(pages).to.have.lengthOf(2);
      expect(pages[0].paxType).to.be.equal('adult');
      expect(pages[0].direction).to.be.equal('outbound');
      expect(pages[0].cards).to.be.not.undefined;
      expect(pages[1].paxType).to.be.equal('adult');
      expect(pages[1].direction).to.be.equal('inbound');
      expect(pages[1].cards).to.be.not.undefined;
    });
  });
});
