import _ from 'lodash';
import { earlyBirdSelectFlightMktgSelector } from 'src/earlyBird/analytics/earlyBirdSelectFlightMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('earlyBirdSelectFlightMktgSelector', () => {
  it('should return an empty object for mktgData if marketing data in earlyBird detail page does not exist', () => {
    const [mktgData] = earlyBirdSelectFlightMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the marketing data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.earlyBird.detailPage.response.mktg_data', mockData);
    const [mktgData] = earlyBirdSelectFlightMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData });
  });
});
