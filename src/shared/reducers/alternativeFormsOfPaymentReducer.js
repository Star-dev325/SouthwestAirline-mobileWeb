// @flow
import _ from 'lodash';

import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';

import { INITIAL_AVAILABILITY } from 'src/shared/constants/alternativeFormsOfPaymentConstants';

import type { AfpAvailability } from 'src/shared/flow-typed/shared.types';

const {
  ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS,
  ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_SUCCESS,
  ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_SUCCESS
} = AlternativeFormsOfPaymentActionTypes;

const getAvailabilityForAfp = (availabilities: Array<AfpAvailability>, paymentMethod: string) =>
  _.find(availabilities, (availability) => availability && availability.paymentMethod === paymentMethod) ||
  INITIAL_AVAILABILITY;

export const afpAvailability = (state: * = INITIAL_AVAILABILITY, action: * = {}, paymentMethod: string = '') => {
  switch (action.type) {
    case ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_SUCCESS:
      return getAvailabilityForAfp(action.response, paymentMethod);

    case ALTERNATIVE_FORMS_OF_PAYMENT__FETCH_AVAILABILITY_FAILED:
    case ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY:
      return INITIAL_AVAILABILITY;

    case ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_SUCCESS:
      return {
        ...getAvailabilityForAfp(action.response, paymentMethod),
        lastUpdateFailed: INITIAL_AVAILABILITY.lastUpdateFailed
      };

    case ALTERNATIVE_FORMS_OF_PAYMENT__UPDATE_AVAILABILITY_FAILED:
      return {
        ...state,
        lastUpdateFailed: !INITIAL_AVAILABILITY.lastUpdateFailed
      };

    case ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT:
      return {
        ...state,
        isActive: state.paymentMethod === paymentMethod,
        hasError: INITIAL_AVAILABILITY.hasError
      };

    case ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED:
      return {
        ...state,
        isActive: INITIAL_AVAILABILITY.isActive
      };

    case ALTERNATIVE_FORMS_OF_PAYMENT__INTEGRATION_FAILED:
      return {
        ...state,
        hasError: !INITIAL_AVAILABILITY.hasError
      };

    case ALTERNATIVE_FORMS_OF_PAYMENT__RELOAD_AND_SUBMIT_SUCCESS:
      return {
        ...state,
        isActive: state.paymentMethod === paymentMethod
      };

    default:
      return state;
  }
};
