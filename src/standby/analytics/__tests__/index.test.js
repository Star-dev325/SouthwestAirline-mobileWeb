jest.mock('src/standby/analytics/selectStandbyPageMktgSelector', () => ({
  selectStandbyPageMktgSelector: jest.fn(() => standbySelectPageMktgdata)
}));

jest.mock('src/shared/analytics/helpers/analyticsHelper');

import StandbyActionTypes from 'src/standby/actions/standbyActionTypes';
import * as StandbyAnalytics from 'src/standby/analytics/index';
import * as AnalyticsHelper from 'src/shared/analytics/helpers/analyticsHelper';

const standbySelectPageMktgdata = 'flight change mktg data';

describe('index', () => {
  describe('standbySelectPageMktgdata', () => {
    it('should return the selectors used for the marketing data layer', () => {
      expect(
        StandbyAnalytics.dataLayerSelectorsForStandbyList[
          StandbyActionTypes.STANDBY__FETCH_CHECK_STANDBY_NEAR_AIRPORT_SUCCESS
        ]()
      ).toStrictEqual(standbySelectPageMktgdata);
    });
  });

  describe('generateStandbyStore', () => {
    it('should invoke generateUpdatedFlowStoreForAnalytics', () => {
      const actionListFlowMock = jest.spyOn(AnalyticsHelper, 'generateFlowActionListForAnalytics');
      const flowStoreMock = jest.spyOn(AnalyticsHelper, 'generateUpdatedFlowStoreForAnalytics').mockReturnValue(true);

      expect(
        StandbyAnalytics.generateStandbyStore({ init: 1 })
      ).toStrictEqual(true);

      expect(actionListFlowMock).toBeCalled();
      expect(flowStoreMock).toBeCalled();
    });
  });
});