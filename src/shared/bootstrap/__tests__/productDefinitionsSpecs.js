import { getProductDefinitions } from 'src/shared/bootstrap/productDefinitions';

describe('Product Definitions Bootstrap function', () => {
  it('should prefer data from state', () => {
    const state = {
      app: {
        productDefinitions: {
          products: [
            {
              primaryThemeColor: 'red'
            }
          ]
        }
      }
    };

    expect(getProductDefinitions(state).products[0].primaryThemeColor).to.eq('red');
  });

  it('should fallback to data from bootstrap', () => {
    const state = {
      app: {
        productDefinitions: {}
      }
    };

    expect(getProductDefinitions(state).products[0].primaryThemeColor).to.eq('primary-yellow');
  });
});
