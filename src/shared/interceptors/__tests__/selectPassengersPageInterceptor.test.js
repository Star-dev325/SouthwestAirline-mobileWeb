jest.mock('src/shared/routeUtils/routeStateHelper');
jest.mock('src/shared/actions/flowStatusActions');

import { AIR_CHANGE_SPLIT_PNR_FLOW_NAME } from 'src/airChange/constants/airChangeConstants';
import { airChangeRoutes } from 'src/airChange/constants/airChangeRoutes.js';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import selectPassengersPageInterceptor from 'src/shared/interceptors/selectPassengersPageInterceptor';
import * as RouteStateHelper from 'src/shared/routeUtils/routeStateHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();

describe('selectPassengersPageInterceptor', () => {
  const airChangeSplitPnrFlowStatus = {
    app: {
      flowStatus: {
        airChangeSplitPnr: 'completed'
      }
    }
  };
  const { CLEAR_FLOW_STATUS } = FlowStatusActionTypes;
  const clearFlowStatusAction = { type: CLEAR_FLOW_STATUS };
  const mockState = {
    backFrom: {
      pathname: airChangeRoutes.view.canonicalPath
    },
    pathname: airChangeRoutes.selectPassengers
  };
  const selectPassengersPagePath = '/air/change/select-passengers.html';
  let clearFlowStatusMock;
  let getStateMock;
  let mockInterceptorContext;
  let pushMock;
  let store;

  beforeEach(() => {
    clearFlowStatusMock = jest.spyOn(FlowStatusActions, 'clearFlowStatus').mockReturnValue(clearFlowStatusAction);
    jest.spyOn(RouteStateHelper, 'getCurrentRouteState').mockReturnValue({ ...mockState });
    getStateMock = jest.fn().mockReturnValue(airChangeSplitPnrFlowStatus);
    pushMock = jest.fn();
    store = {
      ...mockStore(),
      getState: getStateMock
    };
    mockInterceptorContext = {
      history: {
        push: pushMock
      },
      store
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('redirect to view reservation page and clear flow status for airChangeSplitPnr', () => {
    it('when airChangeSplitPnrFlowStatus is completed and coming back from select flight page and current path is select pax page', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');
      const result = selectPassengersPageInterceptor(selectPassengersPagePath)(mockInterceptorContext);

      result.interceptor();

      expect(pushMock).toHaveBeenCalledWith('/air/manage-reservation/');
      expect(store.getActions()).toMatchObject([clearFlowStatusAction]);
      expect(clearFlowStatusMock).toHaveBeenCalledWith(AIR_CHANGE_SPLIT_PNR_FLOW_NAME);
    });

    it('when airChangeSplitPnrFlowStatus is undefined', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/change');

      getStateMock.mockReturnValue({
        app: {
          flowStatus: {
            airChangeSplitPnr: undefined
          }
        }
      });

      const result = selectPassengersPageInterceptor(selectPassengersPagePath)(mockInterceptorContext);

      result.interceptor();

      expect(pushMock).toHaveBeenCalledWith('/air/manage-reservation/');
      expect(store.getActions()).toMatchObject([clearFlowStatusAction]);
      expect(clearFlowStatusMock).toHaveBeenCalledWith(AIR_CHANGE_SPLIT_PNR_FLOW_NAME);
    });
  });

  describe('not redirect to view reservation page and clear flow status for airChangeSplitPnr', () => {
    it('when airChangeSplitPnrFlowStatus is not completed', () => {
      getStateMock.mockReturnValue({
        app: {
          flowStatus: {
            airChangeSplitPnr: 'in_progress'
          }
        }
      });

      const result = selectPassengersPageInterceptor(selectPassengersPagePath)(mockInterceptorContext);

      expect(result).toEqual(undefined);
      expect(pushMock).not.toHaveBeenCalled();
      expect(store.getActions()).toMatchObject([]);
      expect(clearFlowStatusMock).not.toHaveBeenCalled();
    });

    it('when coming back from other than select flight page', () => {
      jest.spyOn(RouteStateHelper, 'getCurrentRouteState').mockReturnValue({
        ...mockState,
        backFrom: {
          pathname: '/test'
        }
      });

      const result = selectPassengersPageInterceptor(selectPassengersPagePath)(mockInterceptorContext);

      expect(result).toEqual(undefined);
      expect(pushMock).not.toHaveBeenCalled();
      expect(store.getActions()).toMatchObject([]);
      expect(clearFlowStatusMock).not.toHaveBeenCalled();
    });

    it('when current path is not select passengers page', () => {
      jest.spyOn(RouteStateHelper, 'getCurrentRouteState').mockReturnValue({
        ...mockState,
        pathname: '/test'
      });

      const result = selectPassengersPageInterceptor(selectPassengersPagePath)(mockInterceptorContext);

      expect(result).toEqual(undefined);
      expect(pushMock).not.toHaveBeenCalled();
      expect(store.getActions()).toMatchObject([]);
      expect(clearFlowStatusMock).not.toHaveBeenCalled();
    });
  });
});
