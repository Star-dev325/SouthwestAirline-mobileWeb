// @flow
import { CHASE_CREDIT_STATUS } from 'src/chase/constants/chaseConstants';
import type { ChaseInstantCreditResponseType } from 'src/chase/flow-typed/chase.types';

export const toApplicationInfo = (response: ChaseInstantCreditResponseType) => {
  const { APPROVED, PENDING, DECLINED } = CHASE_CREDIT_STATUS;
  const { creditLimit: credit = '0', creditStatus: chaseCreditStatus = '', customer = {} } = response;
  const isApproved = chaseCreditStatus === APPROVED;
  const chaseApplicationCompleted = isApproved || chaseCreditStatus === PENDING || chaseCreditStatus === DECLINED;
  const { customerNumber: accountNumber = '', firstName = '', lastName = '' } = customer;

  const applicationInfo = {
    chaseApplicationCompleted,
    chaseCreditStatus,
    credit,
    customer: {
      accountNumber,
      firstName,
      lastName
    },
    isApproved,
    isValidChaseSessionId: true
  };

  return applicationInfo;
};
