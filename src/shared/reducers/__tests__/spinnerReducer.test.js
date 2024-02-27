import * as SharedActions from 'src/shared/actions/sharedActions';
import SharedActionTypes from 'src/shared/actions/sharedActionTypes';
import { spinner } from 'src/shared/reducers/spinnerReducer';

const {
  SHARED__ASYNC_ACTION_FINISH,
  SHARED__ASYNC_ACTION_START,
  SHARED__ASYNC_CHAIN_CONTINUE,
  SHARED__ASYNC_CHAIN_FINISH,
  SHARED__ASYNC_CHAIN_INIT_TIMER,
  SHARED__ASYNC_CHAIN_START,
  SHARED__FORCE_HIDE_SPINNER,
  SHARED__HIDE_SPINNER_TEMPORARILY
} = SharedActionTypes;

describe('spinner', () => {
  it('should init state', () => {
    const state = spinner(undefined, {});

    expect(state).toEqual({
      asyncActionCount: 0,
      asyncChain: false,
      asyncChainTimerID: null,
      chainMessageCount: 0,
      chainMessageDuration: 5000,
      chainMessages: null,
      showSpinner: true,
      spinnerMessage: null
    });
  });

  it('should show spinner and inc the count when one api fetch start', () => {
    const state = spinner(
      {
        asyncActionCount: 0,
        showSpinner: false,
        spinnerMessage: null
      },
      {
        type: SHARED__ASYNC_ACTION_START
      }
    );

    expect(state).toEqual({
      asyncActionCount: 1,
      showSpinner: true,
      spinnerMessage: null
    });
  });

  it('should hide spinner and dec the count when one api fetch finish', () => {
    const state = spinner(
      {
        asyncActionCount: 1,
        showSpinner: true,
        spinnerMessage: null
      },
      {
        type: SHARED__ASYNC_ACTION_FINISH
      }
    );

    expect(state).toEqual({
      asyncActionCount: 0,
      showSpinner: false,
      spinnerMessage: null
    });
  });

  it('should not have negative count for the number of async calls', () => {
    const state = spinner({
      asyncActionCount: -1,
      showSpinner: true,
      spinnerMessage: null
    }, {
      type: SHARED__ASYNC_ACTION_FINISH
    });

    expect(state).toEqual({
      asyncActionCount: 0,
      showSpinner: false,
      spinnerMessage: null
    });
  });

  it('should hide spinner temporarily', () => {
    const state = spinner(
      {
        showSpinner: true,
        spinnerMessage: null
      },
      {
        type: SHARED__HIDE_SPINNER_TEMPORARILY
      }
    );

    expect(state).toEqual({
      showSpinner: false,
      spinnerMessage: null
    });
  });

  it('should force spinner to hide permanently', () => {
    const state = spinner(
      {
        asyncActionCount: 2,
        showSpinner: true,
        spinnerMessage: null
      },
      {
        pendingCallsCount: 3,
        type: SHARED__FORCE_HIDE_SPINNER
      }
    );

    expect(state).toEqual({
      asyncActionCount: 0,
      showSpinner: false,
      spinnerMessage: null
    });
  });

  describe('router change', () => {
    it('should stop spinner when router change and asyncActionCount is zero', () => {
      const state = spinner(
        {
          asyncActionCount: 0,
          showSpinner: true,
          spinnerMessage: null
        },
        SharedActions.routeChanged()
      );

      expect(state).toEqual({
        asyncActionCount: 0,
        showSpinner: false,
        spinnerMessage: null
      });
    });

    it('should not stop spinner when router change and asyncActionCount is greater than zero', () => {
      const state = spinner(
        {
          asyncActionCount: 1,
          showSpinner: true,
          spinnerMessage: null
        },
        SharedActions.routeChanged()
      );

      expect(state).toEqual({
        asyncActionCount: 1,
        showSpinner: true,
        spinnerMessage: null
      });
    });
  });

  it('should show spinner and spinnerMessage when one api fetch start and message specified', () => {
    const spinnerMessage = 'spinner message';
    const state = spinner(
      {
        asyncActionCount: 0,
        showSpinner: false,
        spinnerMessage: null
      },
      {
        spinnerMessage,
        type: SHARED__ASYNC_ACTION_START
      }
    );

    expect(state).toEqual({
      asyncActionCount: 1,
      showSpinner: true,
      spinnerMessage
    });
  });

  describe('async chains', () => {
    it('should start a chain with the given messages and duration', () => {
      const mockChainMessages = ['test', 'test2'];
      const mockChainMessageDuration = 1000;
      const mockState = { asyncActionCount: 0, showSpinner: false };
      const mockAction = {
        type: SHARED__ASYNC_CHAIN_START,
        chainMessageDuration: mockChainMessageDuration,
        chainMessages: mockChainMessages
      };

      expect(spinner(mockState, mockAction)).toEqual({
        asyncActionCount: 1,
        asyncChain: true,
        asyncChainTimerID: null,
        chainMessageCount: 0,
        chainMessageDuration: mockChainMessageDuration,
        chainMessages: mockChainMessages,
        showSpinner: true
      });
    });

    it('should start a chain message with the default message duration if none is provided', () => {
      const mockChainMessages = ['test', 'test2'];
      const mockState = { asyncActionCount: 0 };
      const mockAction = {
        chainMessageDuration: undefined,
        chainMessages: mockChainMessages,
        type: SHARED__ASYNC_CHAIN_START
      };

      expect(spinner(mockState, mockAction).chainMessageDuration).toEqual(5000);
    });

    it('should initiate the async chain timer ID', () => {
      const mockAsyncChainTimerID = -1;
      const mockState = { asyncChainTimerID: 0 };
      const mockAction = {
        asyncChainTimerID: mockAsyncChainTimerID,
        type: SHARED__ASYNC_CHAIN_INIT_TIMER
      };

      expect(spinner(mockState, mockAction)).toEqual({
        asyncChainTimerID: mockAsyncChainTimerID
      });
    });

    it('should clear all chain state when the chain finishes', () => {
      const mockState = { asyncActionCount: 1, showSpinner: true };
      const mockAction = { type: SHARED__ASYNC_CHAIN_FINISH };

      expect(spinner(mockState, mockAction)).toEqual({
        asyncActionCount: 0,
        asyncChain: false,
        asyncChainTimerID: null,
        chainMessageCount: 0,
        chainMessageDuration: 5000,
        chainMessages: null,
        showSpinner: false,
        spinnerMessages: null
      });
    });

    it('should move chain messages forward and retain the PID when a chain continues', () => {
      const mockAsyncChainTimerID = -1;
      const mockState = { chainMessageCount: 0 };
      const mockAction = {
        asyncChainTimerID: mockAsyncChainTimerID,
        type: SHARED__ASYNC_CHAIN_CONTINUE
      };

      expect(spinner(mockState, mockAction)).toEqual({
        asyncChainTimerID: mockAsyncChainTimerID,
        chainMessageCount: 1
      });
    });

    it('should clear all chain state when the chain finishes', () => {
      const mockState = { asyncActionCount: 1, showSpinner: true };
      const mockAction = { type: SHARED__ASYNC_CHAIN_FINISH };

      expect(spinner(mockState, mockAction)).toEqual({
        asyncActionCount: 0,
        asyncChain: false,
        asyncChainTimerID: null,
        chainMessageCount: 0,
        chainMessageDuration: 5000,
        chainMessages: null,
        showSpinner: false,
        spinnerMessages: null
      });
    });
  });

  it('should return same state when action is undefined', () => {
    const mockState = { test: 'test' };

    expect(spinner(mockState, undefined)).toEqual(mockState);
  });
});
