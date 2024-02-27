import _ from 'lodash';
import { earlyBirdConfirmationMktgSelector } from 'src/earlyBird/analytics/earlyBirdConfirmationMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('earlyBirdConfirmationMktgSelector', () => {
  it('should return an empty object for mktgData if marketing data in earlyBird confirmation page does not exist', () => {
    const [mktgData] = earlyBirdConfirmationMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the marketing data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.earlyBird.confirmationPage.response.mktg_data', mockData);
    const [mktgData] = earlyBirdConfirmationMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData });
  });
});
