import chaseReducers from 'src/chase/reducers/chaseReducers';
import ChaseActionTypes from 'src/chase/actions/chaseActionTypes';
import ChaseApplicationInfoBuilder from 'test/builders/model/chaseApplicationInfoBuilder';

describe('chaseReducers', () => {
  const applicationInfoMock = new ChaseApplicationInfoBuilder().build();
  const applicationInfo = { applicationInfo: applicationInfoMock };
  const defaultResult = {
    applicationInfo: {},
    isChaseExistingCardMember: null,
    shouldRetryInstantCreditsCall: false
  };
  const otherAction = { type: 'other' };
  let defaultState;

  beforeEach(() => {
    defaultState = chaseReducers(undefined, undefined, undefined);
  });

  context('applicationInfo', () => {
    it('should set application info when CHASE__FETCH_APPLICATION_STATUS_SUCCESS', () => {
      const expectedResult = {
        ...applicationInfo,
        isChaseExistingCardMember: null,
        shouldRetryInstantCreditsCall: false
      };
      const action = {
        type: ChaseActionTypes.CHASE__FETCH_APPLICATION_STATUS_SUCCESS,
        response: {
          ...applicationInfo
        }
      };
      const updatedState = chaseReducers(defaultState, action);

      expect(updatedState).to.deep.equal(expectedResult);
    });

    it('should reset application info when CHASE__RESET_CHASE_APPLICATION_INFO', () => {
      const action = {
        type: ChaseActionTypes.CHASE__RESET_CHASE_APPLICATION_INFO
      };
      const updatedState = chaseReducers(defaultState, action);

      expect(updatedState).to.deep.equal({ ...defaultResult });
    });
  });

  context('setIsChaseExistingCardMember', () => {
    it('should set isChaseExistingCardMember when setIsChaseExistingCardMember triggered', () => {
      const action = {
        type: ChaseActionTypes.CHASE__SET_CHASE_EXISTING_CARD_MEMBER,
        isChaseExistingCardMember: true
      };
      const state = chaseReducers(undefined, action);

      expect(state.isChaseExistingCardMember).to.deep.equal(true);
    });
  });

  context('shouldRetryInstantCreditsCall', () => {
    const state = { ...applicationInfo };

    context('when CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL', () => {
      context('when shouldSetRetryInstantCreditsCall action is true', () => {
        it('should return true', () => {
          const expectedResult = {
            ...applicationInfo,
            isChaseExistingCardMember: null,
            shouldRetryInstantCreditsCall: true
          };
          const action = {
            type: ChaseActionTypes.CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL,
            shouldSetRetryInstantCreditsCall: true
          };
          const updatedState = chaseReducers(state, action);

          expect(updatedState).to.deep.equal(expectedResult);
        });
      });

      context('when shouldSetRetryInstantCreditsCall action is false', () => {
        it('should return false', () => {
          const expectedResult = {
            ...applicationInfo,
            isChaseExistingCardMember: null,
            shouldRetryInstantCreditsCall: false
          };
          const action = {
            type: ChaseActionTypes.CHASE__SET_SHOULD_RETRY_INSTANT_CREDITS_CALL,
            shouldSetRetryInstantCreditsCall: false
          };
          const updatedState = chaseReducers(state, action);

          expect(updatedState).to.deep.equal(expectedResult);
        });
      });
    });

    context('when CHASE__FETCH_APPLICATION_STATUS_FAILED', () => {
      it('should return true', () => {
        const expectedResult = {
          ...applicationInfo,
          isChaseExistingCardMember: null,
          shouldRetryInstantCreditsCall: true
        };
        const action = {
          type: ChaseActionTypes.CHASE__FETCH_APPLICATION_STATUS_FAILED
        };
        const updatedState = chaseReducers(state, action);

        expect(updatedState).to.deep.equal(expectedResult);
      });
    });

    context('when CHASE__RESET_CHASE_APPLICATION_INFO', () => {
      it('should return false', () => {
        const action = {
          type: ChaseActionTypes.CHASE__RESET_CHASE_APPLICATION_INFO
        };
        const updatedState = chaseReducers(state, action);

        expect(updatedState).to.deep.equal({ ...defaultResult });
      });
    });

    context('when state and action are undefined', () => {
      it('should return defaultState', () => {
        expect(defaultState).to.deep.equal(defaultResult);
      });
    });

    context('when action is not matched', () => {
      it('should return defaultState', () => {
        const updatedState = chaseReducers(defaultState, { otherAction });

        expect(updatedState).to.deep.equal(defaultResult);
      });
    });
  });
});
