import transformToDefaultValues from 'src/earlyBird/transformers/earlyBirdDetailFormDefaultValuesTransformer';
import EarlyBirdBoundsBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/earlybird/earlyBirdBoundsBuilder';

describe('transformToDefaultValues', () => {
  it('should return earlyBird passenger checkbox value as true when this passenger can purchase earlyBird', () => {
    const earlyBirdBounds = new EarlyBirdBoundsBuilder().build();

    expect(transformToDefaultValues(earlyBirdBounds)).to.be.deep.equal({
      bound_0_ebPaxCheckBox_0: true,
      bound_0_ebPaxCheckBox_1: false,
      bound_1_ebPaxCheckBox_0: true,
      bound_1_ebPaxCheckBox_1: false
    });
  });
});
