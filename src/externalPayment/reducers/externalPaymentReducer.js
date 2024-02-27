import _ from 'lodash';
import { combineReducers } from 'redux';
import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import ExternalPaymentActionTypes from 'src/externalPayment/actions/externalPaymentActionTypes';

const { ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS_SUCCESS } = AlternativeFormsOfPaymentActionTypes;

const {
  EXTERNAL_PAYMENT__COMPLETE_EXTERNAL_PAYMENT,
  EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT_FAILED,
  EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT_FAILED,
  EXTERNAL_PAYMENT__SET_DISPLAY_BUTTON
} = ExternalPaymentActionTypes;

const requestedAFPParams = (state = null, action = {}) => {
  switch (action.type) {
    case ALTERNATIVE_FORMS_OF_PAYMENT__RETRIEVE_PARAMS_SUCCESS: {
      return _.cloneDeep(action.response);
    }
    default:
      return state;
  }
};

const INITIAL_TOKEN_AVAILABILITY_STATE = {
  isAvailable: false
};

const tokenAvailability = (state = INITIAL_TOKEN_AVAILABILITY_STATE, action = {}) => {
  switch (action.type) {
    case EXTERNAL_PAYMENT__COMPLETE_EXTERNAL_PAYMENT: {
      return {
        isAvailable: _.get(action, 'response.code') === '201'
      };
    }
    default:
      return state;
  }
};

const INITIAL_BUTTON_STATE = false;

const displayButton = (state = INITIAL_BUTTON_STATE, action = {}) => {
  switch (action.type) {
    case EXTERNAL_PAYMENT__SET_UP_EXTERNAL_PAYMENT_FAILED:
    case EXTERNAL_PAYMENT__INITIATE_EXTERNAL_PAYMENT_FAILED: {
      return !INITIAL_BUTTON_STATE;
    }
    case EXTERNAL_PAYMENT__SET_DISPLAY_BUTTON: {
      return action.shouldDisplayButton;
    }
    default:
      return state;
  }
};

export default combineReducers({ requestedAFPParams, tokenAvailability, displayButton });
