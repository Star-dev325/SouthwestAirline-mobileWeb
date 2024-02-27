import _ from 'lodash';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightChangeMktgSelector } from 'src/airChange/analytics/flightChangeMktgSelector';
import { ANALYTICS } from 'src/airChange/constants/airChangeConstants';

describe('flightChangeMktgSelector', () => {
  const mockData = { data: 'mock mktg_data' };
  const satelliteTrack = 'otter';

  it('should return an empty object for mktgData if "state.app.airChange.changeFlightPage.response.mktg_data" does not exist', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...ANALYTICS.SELECT_BOUND_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.SELECT_BOUND_PAGE.page
      }
    ];
    const result = flightChangeMktgSelector({});

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with select flight page data elements when splitPnrDetails is false', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.SELECT_BOUND_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.SELECT_BOUND_PAGE.page
      }
    ];
    const state_data = _.set({}, 'app.airChange.changeFlightPage.response.mktg_data', mockData);
    const result = flightChangeMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });

  it('should return an array containing the contents of the mktg_data property with select passengers page data elements when splitPnrDetails is true', () => {
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.SELECT_PASSENGERS_PAGE
      },
      satelliteTrack,
      {
        page: ANALYTICS.SELECT_PASSENGERS_PAGE.page
      }
    ];
    const state_data = _.merge(
      _.set({}, 'app.airChange.changeFlightPage.response.mktg_data', mockData),
      _.set({}, 'app.airChange.changeFlightPage.response.splitPnrDetails', true)
    );
    const result = flightChangeMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});
