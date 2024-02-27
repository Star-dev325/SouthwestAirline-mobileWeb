// @flow
import _ from 'lodash';
import type { Passenger } from 'src/shared/flow-typed/shared.types';
import validator from 'src/shared/form/formValidators/validator';

export const isInformationCompletedForExpressCheckout = (passengerDetailsPage: Passenger): boolean => {
  const { firstName, lastName, dateOfBirth, gender } = passengerDetailsPage || {};

  return !_.isEmpty(firstName) && !_.isEmpty(lastName) && !_.isEmpty(dateOfBirth) && validator.isValidGender(gender);
};
