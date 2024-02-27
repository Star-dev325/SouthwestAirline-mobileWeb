import _ from 'lodash';
import {
  isActive,
  isReLoginPointsBooking,
  reLoginCallbackFunctions,
  retryFunctions,
  reLoginLocation,
  reLoginModalOptions
} from 'src/login/reducers/reLoginModalReducer';
import ReLoginActionTypes from 'src/login/actions/reLoginActionTypes';

describe('reLoginModalReducer', () => {
  describe('isActive', () => {
    it('should return default state when action is undefined', () => {
      expect(isActive()).toBeFalsy();
    });

    it('should set correct state for showing modal', () => {
      const state = isActive(
        { isActive: false },
        {
          type: ReLoginActionTypes.SHOW_RE_LOGIN_MODAL
        }
      );

      expect(state).toBeTruthy();
    });

    it('should set correct state', () => {
      const state = isActive(
        { isActive: true },
        {
          type: ReLoginActionTypes.HIDE_RE_LOGIN_MODAL
        }
      );

      expect(state).toBeFalsy();
    });
  });

  describe('isReLoginPointsBooking', () => {
    it('should return default state when action is undefined', () => {
      expect(isReLoginPointsBooking()).toEqual(false);
    });

    it('should return true', () => {
      const state = isReLoginPointsBooking(
        {},
        {
          type: ReLoginActionTypes.IS_RE_LOGIN_POINTS_BOOKING
        }
      );

      expect(state).toEqual(true);
    });
  });

  describe('reLoginCallbackFunctions', () => {
    it('should initialize', () => {
      const state = reLoginCallbackFunctions({}, { type: ReLoginActionTypes.SET_RE_LOGIN_CALLBACK_FUNCTIONS });

      expect(state).toEqual({});
    });

    it('should return default state when action is undefined', () => {
      expect(reLoginCallbackFunctions()).toEqual({});
    });

    it('should set correct state', () => {
      const callbackFunctions = {
        callBackFunction: _.noop
      };
      const state = reLoginCallbackFunctions(
        {},
        {
          type: ReLoginActionTypes.SET_RE_LOGIN_CALLBACK_FUNCTIONS,
          reLoginCallbackFunctions: callbackFunctions
        }
      );

      expect(state).toEqual(callbackFunctions);
    });
  });

  describe('retryFunctions', () => {
    it('should initialize', () => {
      const state = retryFunctions({}, { type: ReLoginActionTypes.RETRY_FUNCTIONS });

      expect(state).toEqual([]);
    });

    it('should return default state when action is undefined', () => {
      expect(retryFunctions()).toEqual([]);
    });

    it('should set correct state', () => {
      const state = retryFunctions([], {
        type: ReLoginActionTypes.SHOW_RE_LOGIN_MODAL,
        retryFunction: _.noop
      });

      expect(state).toEqual([_.noop]);
    });
  });

  describe('reLoginLocation', () => {
    it('should return default state when action is undefined', () => {
      expect(reLoginLocation()).toEqual('');
    });

    it('should set correct state', () => {
      const state = reLoginLocation(
        {},
        {
          type: ReLoginActionTypes.SET_RE_LOGIN_CALLBACK_FUNCTIONS,
          reLoginLocation: 'locations/path'
        }
      );

      expect(state).toEqual('locations/path');
    });
  });

  describe('reLoginModalOptions', () => {
    it('should initialize', () => {
      const state = reLoginModalOptions({}, { type: ReLoginActionTypes.SHOW_RE_LOGIN_MODAL });

      expect(state).toEqual({});
    });

    it('should return default state when action is undefined', () => {
      expect(reLoginModalOptions()).toEqual({});
    });

    it('should set correct state', () => {
      const modalOptions = { hasCancelButton: true };
      const state = reLoginModalOptions(
        {},
        {
          type: ReLoginActionTypes.SHOW_RE_LOGIN_MODAL,
          reLoginModalOptions: modalOptions
        }
      );

      expect(state).toEqual(modalOptions);
    });
  });
});
