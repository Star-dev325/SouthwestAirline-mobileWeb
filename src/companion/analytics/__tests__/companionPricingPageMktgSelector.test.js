import _ from 'lodash';
import { companionPricingPageMktgSelector } from 'src/companion/analytics/companionPricingPageMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('companionPricingPageMktgSelector', () => {
  it('should return an empty object if companion pricing page mktgdata does not exist', () => {
    const [mktgData] = companionPricingPageMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.companion.flightPricingPage.mktg_data', mockData);
    const [mktgData] = companionPricingPageMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData });
  });
});
