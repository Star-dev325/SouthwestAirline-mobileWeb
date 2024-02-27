jest.mock('src/shared/api/accountsApi', () => ({
  createAccount: jest.fn().mockResolvedValue({}),
  getSecurityQuestions: jest.fn().mockResolvedValue({
    securityQuestions: [
      'What was the color of your first car?',
      'What was the color of your favorite ice cream flavor?'
    ]
  })
}));
jest.mock('src/shared/helpers/hapticFeedbackHelper', () => ({
  playHapticFeedback: jest.fn()
}));
jest.mock('src/shared/helpers/urlHelper', () => ({
  ...jest.requireActual('src/shared/helpers/urlHelper'),
  getNormalizedRoute: jest.fn().mockReturnValue('/enroll')
}));

import * as EnrollActions from 'src/enroll/actions/enrollActions';
import EnrollActionTypes from 'src/enroll/actions/enrollActionTypes';
import AccountActionTypes from 'src/shared/actions/accountActionTypes';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as HapticFeedbackHelper from 'src/shared/helpers/hapticFeedbackHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';
import createMockStore from 'test/unit/helpers/createMockStore';

const mockStore = createMockStore();

describe('EnrollActions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSecurityQuestions', () => {
    const securityQuestions = [
      'What was the color of your first car?',
      'What was the color of your favorite ice cream flavor?'
    ];

    it('should dispatch fetch security questions success when chapi call succeeds', () =>
      store.dispatch(EnrollActions.getSecurityQuestions()).then(() => {
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS
          },
          {
            isFetching: false,
            response: securityQuestions,
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS_SUCCESS
          }
        ]);
      })
    );

    it('should dispatch fetch security questions success and return an empty array when chapi call succeeds and no securityQuestions are in the response', () => {
      AccountsApi.getSecurityQuestions.mockResolvedValueOnce({});

      return store.dispatch(EnrollActions.getSecurityQuestions()).then(() => {
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS
          },
          {
            isFetching: false,
            response: [],
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS_SUCCESS
          }
        ]);
      });
    });

    it('should dispatch fetch security questions success and return an empty array when chapi call succeeds but the response is undefined', () => {
      AccountsApi.getSecurityQuestions.mockResolvedValueOnce(undefined);

      return store.dispatch(EnrollActions.getSecurityQuestions()).then(() => {
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS
          },
          {
            isFetching: false,
            response: [],
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS_SUCCESS
          }
        ]);
      });
    });

    it('should dispatch fetch security questions failed when chapi call fails', () => {
      AccountsApi.getSecurityQuestions.mockRejectedValueOnce();

      return store.dispatch(EnrollActions.getSecurityQuestions()).then(() => {
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS
          },
          {
            isFetching: false,
            type: EnrollActionTypes.ENROLL__FETCH_SECURITY_QUESTIONS_FAILED
          }
        ]);
      });
    });
  });

  describe('createUserAccount', () => {
    it('should dispatch save account number when chapi call succeeds', () => {
      const response = { accountNumber: '601005646' };

      AccountsApi.createAccount.mockResolvedValue(response);

      return store.dispatch(EnrollActions.createUserAccount({})).then(() => {
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            request: {},
            type: EnrollActionTypes.ENROLL__CREATE_ACCOUNT
          },
          {
            accountNumber: response.accountNumber,
            type: AccountActionTypes.ACCOUNT__SAVE_ACCOUNT_NUMBER
          },
          {
            isFetching: false,
            response,
            type: EnrollActionTypes.ENROLL__CREATE_ACCOUNT_SUCCESS
          },
          {
            flowName: 'enroll',
            status: 'completed',
            type: 'SET_FLOW_STATUS'
          },
          {
            payload: {
              args: [getNormalizedRoute({ routeName: 'confirmation' })],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ]);
      });
    });

    it('should play haptic feedback when create account succeeds', () =>
      store.dispatch(EnrollActions.createUserAccount({})).then(() => {
        expect(HapticFeedbackHelper.playHapticFeedback).toHaveBeenCalled();
      })
    );

    it('should dispatch create account failed when chapi call fails', () => {
      AccountsApi.createAccount.mockRejectedValueOnce();

      return store.dispatch(EnrollActions.createUserAccount({})).then(() => {
        expect(store.getActions()).toEqual([
          {
            isFetching: true,
            request: {},
            type: EnrollActionTypes.ENROLL__CREATE_ACCOUNT
          },
          {
            isFetching: false,
            type: EnrollActionTypes.ENROLL__CREATE_ACCOUNT_FAILED
          }
        ]);
      });
    });
  });
});
