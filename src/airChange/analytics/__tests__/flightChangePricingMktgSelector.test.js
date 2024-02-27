import _ from 'lodash';
import { flightChangePricingMktgSelector } from 'src/airChange/analytics/flightChangePricingMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightChangePricingMktgSelector', () => {
  it('should return an empty object for mktgData if "state.app.airChange.changePricingPage.response.mktg_data" does not exist', () => {
    const [mktgData] = flightChangePricingMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the mktg_data property', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.set({}, 'app.airChange.changePricingPage.response.mktg_data', mockData);
    const [mktgData] = flightChangePricingMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...mockData, ...globalMktgState });
  });

  it('should return an array containing the contents of the mktg_data property with page', () => {
    const mockData = { data: 'mock mktg_data' };
    const state_data = _.merge(
      _.set({}, 'app.airChange.changePricingPage.response.mktg_data', mockData),
      _.set({}, 'app.airChange.changePricingPage.response._meta.isUpgrade', true)
    );
    const [mktgData] = flightChangePricingMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...mockData, ...globalMktgState, ...ANALYTICS.REVIEW_PAGE });
  });
});
