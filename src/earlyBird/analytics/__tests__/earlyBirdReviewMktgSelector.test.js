import _ from 'lodash';
import { earlyBirdReviewMktgSelector } from 'src/earlyBird/analytics/earlyBirdReviewMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('earlyBirdReviewMktgSelector', () => {
  it('should return an empty object for mktgData if marketing data in earlyBird on purchase page load does not exist', () => {
    const [mktgData] = earlyBirdReviewMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the marketing data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.earlyBird.reviewPage.mktg_data', mockData);
    const [mktgData] = earlyBirdReviewMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData });
  });
});
