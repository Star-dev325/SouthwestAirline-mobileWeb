// @flow
import { push } from 'connected-react-router';
import enrollActionTypes, { apiActionCreator } from 'src/enroll/actions/enrollActionTypes';
import { saveAccountNumber } from 'src/shared/actions/accountActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as AccountsApi from 'src/shared/api/accountsApi';
import { STATUS } from 'src/shared/constants/flowConstants';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { CreateUserAccountType } from 'src/shared/flow-typed/shared.types';

const { ENROLL__CREATE_ACCOUNT, ENROLL__FETCH_SECURITY_QUESTIONS } = enrollActionTypes;

const { fetchSecurityQuestions, fetchSecurityQuestionsFailed, fetchSecurityQuestionsSuccess } = apiActionCreator(
  ENROLL__FETCH_SECURITY_QUESTIONS
);

export const getSecurityQuestions = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchSecurityQuestions());

  return AccountsApi.getSecurityQuestions()
    .then((res) => dispatch(fetchSecurityQuestionsSuccess(res?.securityQuestions ?? [])))
    .catch((error) => dispatch(fetchSecurityQuestionsFailed(error)));
};

const { createAccount, createAccountSuccess, createAccountFailed } = apiActionCreator(ENROLL__CREATE_ACCOUNT);

export const createUserAccount = (request: CreateUserAccountType) => (dispatch: ReduxDispatch<*>) => {
  dispatch(createAccount(request));

  return AccountsApi.createAccount(request)
    .then((res) => {
      dispatch(saveAccountNumber(res?.accountNumber));
      dispatch(createAccountSuccess(res));
      dispatch(FlowStatusActions.setFlowStatus('enroll', STATUS.COMPLETED));
      dispatch(push(getNormalizedRoute({ routeName: 'confirmation' })));
      playHapticFeedback();
    })
    .catch((error) => dispatch(createAccountFailed(error)));
};
