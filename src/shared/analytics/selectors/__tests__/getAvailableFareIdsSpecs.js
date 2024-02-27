import _ from 'lodash';
import { getAvailableFareIds } from 'src/shared/analytics/selectors/getAvailableFareIds';
import { getProductDefinitions } from 'src/shared/bootstrap/productDefinitions';

describe('getAvailableFareIds', () => {
  const products = [...getProductDefinitions().products];
  const mockState = _.set({}, 'app.productDefinitions.products', products);

  it('should return a map of fare ids that match the id of each product within the .products member of the object returned by getProductDefinitions() sorted in reverse', () => {
    const result = getAvailableFareIds(mockState);
    const expectedResult = ['WGA', 'ANY', 'BUS'];

    expect(expectedResult).to.eql(result);
  });

  it('should insert the value of SPECIAL_CASE_FARE_ID at the second to last position if it does not already contain it', () => {
    const result = getAvailableFareIds(mockState);
    const expectedResult = ['WGA', 'ANY', 'BUS'];

    expect(expectedResult).to.eql(result);
  });

  it('should use the default config settings provided in /shared/bootstrap/productDefinitions.js if no state is provided', () => {
    const result = getAvailableFareIds();
    const expectedResult = ['WGA', 'ANY', 'BUS'];

    expect(expectedResult).to.eql(result);
  });
});
