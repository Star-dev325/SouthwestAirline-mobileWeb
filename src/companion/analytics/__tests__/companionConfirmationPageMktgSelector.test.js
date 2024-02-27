import _ from 'lodash';
import { companionConfirmationPageMktgSelector } from 'src/companion/analytics/companionConfirmationPageMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('companionConfirmationPageMktgSelector', () => {
  it('should return an empty object if companion confirmation page mktgdata does not exist', () => {
    const [mktgData] = companionConfirmationPageMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.companion.companionConfirmationPage.mktg_data', mockData);
    const [mktgData] = companionConfirmationPageMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData });
  });
});
