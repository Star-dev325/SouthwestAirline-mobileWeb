import _ from 'lodash';
import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightCancelConfirmationMktgSelector } from 'src/airCancel/analytics/flightCancelConfirmationMktgSelector';
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';

describe('flightCancelConfirmationMktgSelector', () => {
  it('should return an empty object for mktgData if marketing data in air cancel confirmation does not exist', () => {
    const [mktgData] = flightCancelConfirmationMktgSelector({});

    expect(mktgData).toStrictEqual(globalMktgState);
  });

  it('should return an array containing the contents of the marketing data property with cancel confirmation page data elements', () => {
    const mockData = { data: 'mock mktg_data' };
    const { page } = ANALYTICS.AIR_CANCEL_CONFIRMATION_PAGE;
    const satelliteTrack = 'otter';
    const expectedResult = [ { ...globalMktgState, ...mockData }, satelliteTrack, { page } ];
    const state_data = _.set({}, 'app.airCancel.cancelBoundConfirmationPage.response.mktg_data', mockData);
    const result = flightCancelConfirmationMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});
