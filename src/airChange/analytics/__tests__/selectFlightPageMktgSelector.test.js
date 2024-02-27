import _ from 'lodash';
import { selectFlightPageMktgSelector } from 'src/airChange/analytics/selectFlightPageMktgSelector';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('selectFlightPageMktgSelector', () => {
  it('should merge mktg_data properties from CHAPI with hard coded analytics properties', () => {
    const mockMktgDataFromCHAPI = {
      test_mktg_data: 'mock data'
    };
    const mockState = _.set({}, 'app.airChange.changeFlightPage.response.mktg_data', mockMktgDataFromCHAPI);
    const satelliteTrack = 'otter';
    const expectedResult = [
      {
        ...ANALYTICS.SELECT_BOUND_PAGE,
        ...mockMktgDataFromCHAPI,
        ...globalMktgState
      },
      satelliteTrack,
      { page: ANALYTICS.SELECT_BOUND_PAGE.page }
    ];
    const result = selectFlightPageMktgSelector(mockState);

    expect(result).toStrictEqual(expectedResult);
  });
});
