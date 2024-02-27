import { transformToSelectedProducts } from 'src/airBooking/transformers/selectedProductsTransformer';

describe('selectedProductsTransformer', () => {
  it('should transform to selectedProducts', () => {
    const selectedProducts = transformToSelectedProducts({
      selectedProducts: {},
      paxType: 'adult',
      direction: 'outbound',
      fareProductId: 'productId',
      flightCardIndex: 0
    });

    expect(selectedProducts).to.deep.equal({
      adult: {
        outbound: {
          fareProductId: 'productId',
          flightCardIndex: 0
        }
      }
    });
  });
});
