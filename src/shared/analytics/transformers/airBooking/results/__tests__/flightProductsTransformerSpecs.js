import * as FareProductsTransformer from 'src/shared/analytics/transformers/airBooking/results/fareProductsTransformer';
import { transformToFlightProducts } from 'src/shared/analytics/transformers/airBooking/results/flightProductsTransformer';
import { sandbox } from 'sinon';

const sinon = sandbox.create();
let transformToFareProductsStub;

describe('flightProductsTransformer', () => {
  const buildCard = (numberOfStops, fares = []) => ({
    fares,
    _meta: {
      numberOfStops
    }
  });

  it('should gracefully handle a null or undefined value for fares, such as when a flight has already departed', () => {
    expect(transformToFlightProducts(null)).to.eql([]);
    expect(transformToFlightProducts(undefined)).to.eql([]);
  });

  it('should transform cards into flightProducts with correct number of stops', () => {
    const cards = [buildCard(3)];

    expect(transformToFlightProducts(cards)[0].numberOfStops).to.equal(3);
  });

  it('should transform cards with fares into flightProducts with fareProducts', () => {
    const fares = [];
    const cards = [buildCard(3, fares)];

    transformToFareProductsStub = sinon.stub(FareProductsTransformer, 'transformToFareProducts');

    transformToFlightProducts(cards);

    expect(transformToFareProductsStub).to.be.called;
  });

  it('should transform an empty card array into an empty flightProducts array', () => {
    expect(transformToFlightProducts([])).to.be.empty;
  });

  it('should transform an empty cards object into an empty flightProducts', () => {
    expect(transformToFlightProducts({})).to.be.empty;
  });
});
