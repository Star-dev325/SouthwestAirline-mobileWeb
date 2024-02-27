import _ from 'lodash';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightCancelMktgSelector } from 'src/airCancel/analytics/flightCancelMktgSelector';
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';

describe('flightCancelMktgSelector', () => {
  const mockData = { data: 'mock mktg_data' };

  it('should return an empty object for mktgData if marketing data in air cancel does not exist', () => {
    const [mktgData] = flightCancelMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the marketing data property', () => {
    const state_data = _.set({}, 'app.airCancel.cancelBoundPage.response.mktg_data', mockData);
    const [mktgData] = flightCancelMktgSelector(state_data);

    expect(mktgData).toStrictEqual({ ...globalMktgState, ...mockData });
  });

  it('should return an array containing the contents of the mktg_data property with select passengers page data elements when splitPnrDetails is true', () => {
    const { page_name } = ANALYTICS.AIR_CANCEL_SELECT_PASSENGERS_PAGE;
    const satelliteTrack = 'otter';
    const expectedResult = [
      {
        ...globalMktgState,
        ...mockData,
        ...ANALYTICS.AIR_CANCEL_SELECT_PASSENGERS_PAGE
      },
      satelliteTrack,
      { page_name }
    ];
    const stateData = _.merge(
      _.set({}, 'app.airCancel.cancelBoundPage.response.mktg_data', mockData),
      _.set({}, 'app.airCancel.cancelBoundPage.response.splitPnrDetails', true)
    );
    const result = flightCancelMktgSelector(stateData);

    expect(result).toStrictEqual(expectedResult);
  });
});
