import _ from 'lodash';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightCancelRefundMktgSelector } from 'src/airCancel/analytics/flightCancelRefundMktgSelector';
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';

describe('flightCancelRefundMktgSelector', () => {
  it('should return an empty object for mktgData if marketing data in air cancel refund quote does not exist', () => {
    const [mktgData] = flightCancelRefundMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the marketing data property with cancel review page data elements', () => {
    const mockData = { data: 'mock mktg_data' };
    const { page } = ANALYTICS.AIR_CANCEL_REVIEW_PAGE;
    const satelliteTrack = 'otter';
    const expectedResult = [ { ...globalMktgState, ...mockData }, satelliteTrack, { page } ];
    const state_data = _.set({}, 'app.airCancel.cancelRefundQuotePage.response.mktg_data', mockData);
    const result = flightCancelRefundMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});