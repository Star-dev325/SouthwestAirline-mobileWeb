import { transformToFareProducts } from 'src/shared/analytics/transformers/airBooking/results/fareProductsTransformer';

describe('fareProductsTransformer', () => {
  it('should transform a fare with discounted price', () => {
    const fares = [
      {
        fareDescription: 'Wanna Get Away',
        price: { amount: 100.0 },
        discountedPrice: { amount: 50.0 },
        _meta: {
          fareType: 'WANNA_GET_AWAY'
        }
      }
    ];

    expect(transformToFareProducts(fares)[0].discountedFareValue).to.equal(50.0);
  });

  it('should transform an empty fares array into an empty fareProducts array', () => {
    expect(transformToFareProducts([])).to.be.empty;
  });

  it('should transform when price is null (when sold out fare)', () => {
    const fares = [
      {
        fareDescription: 'Wanna Get Away',
        price: null,
        _meta: {
          fareType: 'WANNA_GET_AWAY'
        }
      }
    ];

    expect(transformToFareProducts(fares)[0].discountedFareValue).to.equal(0.0);
  });
});
