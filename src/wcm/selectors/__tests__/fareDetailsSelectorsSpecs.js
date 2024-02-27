import FareDetailsBuilder from 'test/builders/model/fareDetailsBuilder';
import FareDetailsResponse from 'mocks/wcm/wcm/content/generated/data/feature_tables/fareDetails';
import { getFareDetails } from 'src/wcm/selectors/fareDetailsSelectors';

describe('FareDetailsSelectors', () => {
  it('should get fare details', () => {
    const result = getFareDetails().resultFunc(FareDetailsResponse);

    expect(result).to.deep.equal(new FareDetailsBuilder().build());
  });
});
