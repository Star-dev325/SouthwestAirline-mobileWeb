import _ from 'lodash';
import { flightChangeShoppingMktgSelector } from 'src/airChange/analytics/flightChangeShoppingMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';

describe('flightChangeShoppingMktgSelector', () => {
  it('should return an empty object for mktgData if "state.app.airChange.changeShoppingPage.response.mktg_data does not exist', () => {
    const [mktgData] = flightChangeShoppingMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.airChange.changeShoppingPage.response.mktg_data', mockData);
    const [mktgData] = flightChangeShoppingMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData });
  });
});
