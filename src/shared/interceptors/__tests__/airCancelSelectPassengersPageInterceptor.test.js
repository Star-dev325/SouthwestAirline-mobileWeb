jest.mock('src/shared/actions/flowStatusActions', () => ({
  clearFlowStatus: jest.fn()
}));
jest.mock('src/shared/routeUtils/routeStateHelper');

import { AIR_CANCEL_SPLIT_PNR_FLOW_NAME } from 'src/airCancel/constants/airCancelConstants';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import FlowStatusActionTypes from 'src/shared/actions/flowStatusActionTypes';
import airCancelSelectPassengersPageInterceptor from 'src/shared/interceptors/airCancelSelectPassengersPageInterceptor';
import { getCurrentRouteState } from 'src/shared/routeUtils/routeStateHelper';
import * as AppSelector from 'src/shared/selectors/appSelector';
import createMockStore from 'test/unit/helpers/configureMockStore';

const mockStore = createMockStore();

describe('airCancelSelectPassengersPageInterceptor', () => {
  const airCancelSelectPassengersPagePath = '/air/cancel-reservation/select-passengers.html';
  const airCancelSplitPnrFlowStatus = {
    app: {
      flowStatus: {
        airCancelSplitPnr: 'completed'
      }
    }
  };
  const { CLEAR_FLOW_STATUS } = FlowStatusActionTypes;
  const clearFlowStatusAction = { type: CLEAR_FLOW_STATUS };
  const mockState = {
    backFrom: {
      pathname: '/air/cancel/:recordLocator/select-bound'
    },
    pathname: '/air/cancel-reservation/select-passengers.html'
  };
  let getStateStub;
  let mockInterceptorContext;
  let pushStub;
  let store;

  beforeEach(() => {
    getCurrentRouteState.mockReturnValue({ ...mockState });
    getStateStub = jest.fn().mockReturnValue(airCancelSplitPnrFlowStatus);
    FlowStatusActions.clearFlowStatus.mockReturnValue(clearFlowStatusAction);
    pushStub = jest.fn();
    store = {
      ...mockStore(),
      getState: getStateStub
    };
    mockInterceptorContext = {
      history: {
        push: pushStub
      },
      store
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('redirect to view reservation page and clear flow status for airCancelSplitPnr', () => {
    describe('when airCancelSplitPnrFlowStatus is completed and current path is select pax page and', () => {
      it('when coming back from select flight page', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
        const result = airCancelSelectPassengersPageInterceptor(airCancelSelectPassengersPagePath)(
          mockInterceptorContext
        );

        result.interceptor();

        expect(pushStub).toHaveBeenCalledWith('/view-reservation');
        expect(store.getActions()).toMatchObject([clearFlowStatusAction]);
        expect(FlowStatusActions.clearFlowStatus).toHaveBeenCalledWith(AIR_CANCEL_SPLIT_PNR_FLOW_NAME);
      });

      it('when coming back from review flight page', () => {
        jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
        getCurrentRouteState.mockReturnValue({
          ...mockState,
          backFrom: {
            pathname: '/air/cancel/:recordLocator'
          }
        });

        const result = airCancelSelectPassengersPageInterceptor(airCancelSelectPassengersPagePath)(
          mockInterceptorContext
        );

        result.interceptor();

        expect(pushStub).toHaveBeenCalledWith('/view-reservation');
        expect(store.getActions()).toMatchObject([clearFlowStatusAction]);
        expect(FlowStatusActions.clearFlowStatus).toHaveBeenCalledWith(AIR_CANCEL_SPLIT_PNR_FLOW_NAME);
      });
    });
  });

  describe('not redirect to view reservation page and clear flow status for airCancelSplitPnr', () => {
    it('when airCancelSplitPnrFlowStatus is not completed', () => {
      jest.spyOn(AppSelector, 'getCurrentAppFlow').mockReturnValue('air/cancel');
      getStateStub.mockReturnValue({
        app: {
          flowStatus: {
            airCancelSplitPnr: 'in_progress'
          }
        }
      });

      const result = airCancelSelectPassengersPageInterceptor(airCancelSelectPassengersPagePath)(
        mockInterceptorContext
      );

      expect(result).toEqual(undefined);
      expect(pushStub).not.toHaveBeenCalled();
      expect(store.getActions()).toMatchObject([]);
      expect(FlowStatusActions.clearFlowStatus).not.toHaveBeenCalled();
    });

    it('when coming back from other than select flight page', () => {
      getCurrentRouteState.mockReturnValue({
        ...mockState,
        backFrom: {
          pathname: '/test'
        }
      });

      const result = airCancelSelectPassengersPageInterceptor(airCancelSelectPassengersPagePath)(
        mockInterceptorContext
      );

      expect(result).toEqual(undefined);
      expect(pushStub).not.toHaveBeenCalled();
      expect(store.getActions()).toMatchObject([]);
      expect(FlowStatusActions.clearFlowStatus).not.toHaveBeenCalled();
    });

    it('when current path is not select passengers page', () => {
      getCurrentRouteState.mockReturnValue({
        ...mockState,
        pathname: '/test'
      });

      const result = airCancelSelectPassengersPageInterceptor(airCancelSelectPassengersPagePath)(
        mockInterceptorContext
      );

      expect(result).toEqual(undefined);
      expect(pushStub).not.toHaveBeenCalled();
      expect(store.getActions()).toMatchObject([]);
      expect(FlowStatusActions.clearFlowStatus).not.toHaveBeenCalled();
    });
  });
});
