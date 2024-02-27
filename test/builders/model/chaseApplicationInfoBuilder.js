// @flow
import _ from 'lodash';
import { CHASE_CREDIT_STATUS } from 'src/chase/constants/chaseConstants';
import type { ApplicationInfo } from 'src/airBooking/flow-typed/airBooking.types';

const { APPROVED, PENDING, DECLINED } = CHASE_CREDIT_STATUS;

export default class ChaseApplicationInfoBuilder {
  applicationInfo: ApplicationInfo = {
    chaseApplicationCompleted: true,
    chaseCreditStatus: APPROVED,
    credit: '2000',
    customer: {
      accountNumber: '12345678',
      firstName: 'Michael',
      lastName: 'Scott'
    },
    isApproved: true,
    isValidChaseSessionId: true
  }

  withDeclinedStatus() {
    _.set(this, 'applicationInfo.isApproved', false);
    _.set(this, 'applicationInfo.chaseCreditStatus', DECLINED);

    return this;
  }

  withPendingStatus() {
    _.set(this, 'applicationInfo.isApproved', false);
    _.set(this, 'applicationInfo.chaseCreditStatus', PENDING);

    return this;
  }

  withNoAccountNumber() {
    _.set(this, 'applicationInfo.customer.accountNumber', '');

    return this;
  }

  build() {
    return this.applicationInfo;
  }
}
