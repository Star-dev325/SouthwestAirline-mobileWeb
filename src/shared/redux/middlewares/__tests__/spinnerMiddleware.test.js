import i18n from '@swa-ui/locale';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import spinnerMiddleware from 'src/shared/redux/middlewares/spinnerMiddleware';

const { 
  SHARED__ASYNC_ACTION_FINISH,
  SHARED__ASYNC_ACTION_START, 
  SHARED__ASYNC_CHAIN_CONTINUE,
  SHARED__ASYNC_CHAIN_FINISH,
  SHARED__ASYNC_CHAIN_START
} = SharedActionTypes;

describe('spinnerMiddleware', () => {
  let dispatchStub;

  beforeEach(() => {
    dispatchStub = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger SharedActions.asyncActionStart when action have isFetching equal true', () => {
    spinnerMiddleware({ dispatch: dispatchStub })(() => {})({ isFetching: true });

    expect(dispatchStub).toHaveBeenCalledWith({ spinnerMessage: undefined, type: SHARED__ASYNC_ACTION_START });
  });

  it('should trigger SharedActions.fetchEnd when action have isFetching equal false', () => {
    spinnerMiddleware({ dispatch: dispatchStub })(() => {})({ isFetching: false });

    expect(dispatchStub).toHaveBeenCalledWith({ type: SHARED__ASYNC_ACTION_FINISH });
  });

  it('should do nothing when action do not have isFetching field', () => {
    spinnerMiddleware({ dispatch: dispatchStub })(() => {})({});

    expect(dispatchStub).not.toHaveBeenCalled();
  });

  describe('spinner with message', () => {
    it('should trigger SharedActions.asyncActionStart with spinnerMesssage when action have isFetching equal true and action type is AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE', () => {
      spinnerMiddleware({ dispatch: dispatchStub })(() => {})({
        isFetching: true,
        type: 'AIR_CHANGE__FETCH_REACCOM_CONFIRMATION_PAGE'
      });

      expect(dispatchStub).toHaveBeenCalledWith({
        spinnerMessage: i18n('SPINNER_MESSAGE__HANG_TIGHT'),
        type: SHARED__ASYNC_ACTION_START
      });
    });
  });

  describe('spinner with message chain', () => {
    const mockChainMessageDuration = 1000;
    let mockGetState;

    beforeEach(() => {
      mockGetState = jest.fn()
        .mockReturnValue(createMockStateWithAsyncChainValue(false))
        .mockReturnValueOnce(createMockStateWithAsyncChainValue(true))
        .mockReturnValueOnce(createMockStateWithAsyncChainValue(true));

      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should queue an async chain continue dispatch', () => {
      const mockAction = { type: SHARED__ASYNC_CHAIN_START };

      spinnerMiddleware({ 
        dispatch: dispatchStub,
        getState: mockGetState
      })(() => {})(mockAction);

      jest.runAllTimers();

      expect(dispatchStub).toHaveBeenCalledWith({
        asyncChainTimerID: expect.any(Number),
        type: SHARED__ASYNC_CHAIN_CONTINUE
      });
    });

    it('should wait for the async chain duration before dispatching a continue action', () => {
      const mockAction = { type: SHARED__ASYNC_CHAIN_START };

      jest.spyOn(global, 'setTimeout');

      spinnerMiddleware({ 
        dispatch: dispatchStub,
        getState: mockGetState
      })(() => {})(mockAction);

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), mockChainMessageDuration);

      jest.restoreAllMocks();
    });

    it('should continue to advance the async chain messages while the chain is active', () => {
      const mockAction = { type: SHARED__ASYNC_CHAIN_START };

      mockGetState.mockReturnValueOnce(createMockStateWithAsyncChainValue(true))
        .mockReturnValueOnce(createMockStateWithAsyncChainValue(true));

      spinnerMiddleware({ 
        dispatch: dispatchStub,
        getState: mockGetState
      })(() => {})(mockAction);

      jest.runAllTimers();
      jest.runAllTimers();

      expect(dispatchStub.mock.calls[1][0]).toEqual({
        asyncChainTimerID: expect.any(Number),
        type: SHARED__ASYNC_CHAIN_CONTINUE
      });
    });

    it('should clear any active timers with a chain finishes', () => {
      const mockAction = { type: SHARED__ASYNC_CHAIN_FINISH };
      const mockAsyncChainTimerID = -1;
      const mockGetState = () => ({
        app: { 
          spinner: { 
            asyncChainTimerID: mockAsyncChainTimerID
          } 
        }
      });

      jest.spyOn(global, 'clearTimeout');

      spinnerMiddleware({ 
        dispatch: dispatchStub,
        getState: mockGetState
      })(() => {})(mockAction);

      jest.runAllTimers();

      expect(clearTimeout).toHaveBeenCalledWith(mockAsyncChainTimerID);

      jest.restoreAllMocks();
    });

    const createMockStateWithAsyncChainValue = (asyncChain) => ({
      app: { 
        spinner: { 
          asyncChain, 
          chainMessageDuration: mockChainMessageDuration 
        } 
      }
    });
  });
});
