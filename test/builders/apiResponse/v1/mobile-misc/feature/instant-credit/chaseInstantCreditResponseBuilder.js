// @flow
import _ from 'lodash';
import { CHASE_CREDIT_STATUS } from 'src/chase/constants/chaseConstants';
import type { ChaseInstantCreditResponseType } from 'src/chase/flow-typed/chase.types';

const { APPROVED, PENDING, DECLINED } = CHASE_CREDIT_STATUS;

export default class ChaseInstantCreditResponseBuilder {
  response: ChaseInstantCreditResponseType = {
    creditStatus: APPROVED,
    creditLimit: '2000',
    expirationDate: '2024-07',
    customer: {
      firstName: 'Michael',
      middleName: null,
      lastName: 'Scott',
      customerNumber: '602056571',
      dateOfBirthFormatted: null,
      emailAddress: 'michaelscott@fakeemail.com',
      primaryAddress: {
        line1: '300 Lackawanna Avenue',
        line2: null,
        city: 'Scranton',
        state: 'PA',
        zipOrPostalCode: '18503',
        countryCode: 'US'
      },
      phone: {
        homePhoneNumber: null,
        mobilePhoneNumber: null,
        businessPhoneNumber: null
      }
    }
  }

  withDeclinedStatus() {
    _.set(this, 'response.creditStatus', DECLINED);

    return this;
  }

  withPendingStatus() {
    _.set(this, 'response.creditStatus', PENDING);

    return this;
  }

  withNoAccountNumber() {
    _.set(this, 'response.customer.accountNumber', '');

    return this;
  }

  withCreditLimit(creditLimit: string) {
    _.set(this, 'response.creditLimit', creditLimit);

    return this;
  }

  build() {
    return this.response;
  }
}
