import { globalMktgState } from 'mocks/templates/globalMarketingSelectorData';
import { flightCancelSelectBoundMktgSelector } from 'src/airCancel/analytics/flightCancelSelectBoundMktgSelector';
import { ANALYTICS } from 'src/airCancel/constants/airCancelConstants';

describe('flightCancelSelectBoundMktgSelector', () => {
  it('should return an array containing the contents of the marketing data property with cancel select bound page data elements', () => {
    const mockData = { data: 'mock mktg_data' };
    const { page } = ANALYTICS.AIR_CANCEL_SELECT_BOUND_PAGE;
    const satelliteTrack = 'otter';
    const expectedResult = [ { ...globalMktgState, ...ANALYTICS.AIR_CANCEL_SELECT_BOUND_PAGE, ...mockData }, satelliteTrack, { page } ];
    const state_data = {
      app: {
        airCancel: {
          cancelBoundPage: {
            response: {
              mktg_data: mockData
            }
          }
        }
      }
    };
    const result = flightCancelSelectBoundMktgSelector(state_data);

    expect(result).toStrictEqual(expectedResult);
  });
});
