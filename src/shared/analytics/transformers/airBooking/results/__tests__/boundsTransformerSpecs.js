import sinonModule from 'sinon';
import { transformToBounds } from 'src/shared/analytics/transformers/airBooking/results/boundsTransformer';
import * as FlightProductsTransformer from 'src/shared/analytics/transformers/airBooking/results/flightProductsTransformer';

const sinon = sinonModule.sandbox.create();

describe('transformToBounds', () => {
  const expectedEmptyBounds = {
    flightProducts: []
  };
  const getBoundsPage = () => ({
    cards: []
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should transform flightShoppingPage outboundsPage to results outbounds', () => {
    expect(transformToBounds(getBoundsPage())).to.be.deep.equal(expectedEmptyBounds);
  });

  it('should transform flightShoppingPage outboundsPage to results outbounds and to call FlightProducts transformer', () => {
    const transformToFlightProductsStub = sinon.stub(FlightProductsTransformer, 'transformToFlightProducts');

    transformToBounds(getBoundsPage());
    expect(transformToFlightProductsStub).to.be.called;
  });

  it('should return empty bounds when flightShoppingBounds is undefined', () => {
    expect(transformToBounds(undefined)).to.deep.equal(expectedEmptyBounds);
  });

  it('should return empty bounds when flightShoppingBounds is empty', () => {
    expect(transformToBounds({})).to.deep.equal(expectedEmptyBounds);
  });
});
