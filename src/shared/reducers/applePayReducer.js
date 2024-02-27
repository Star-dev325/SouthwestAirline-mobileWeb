import _ from 'lodash';
import { combineReducers } from 'redux';

import { decodeMessage } from 'src/shared/helpers/webViewHelper';

import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';
import WebViewActionTypes from 'src/shared/actions/webViewActionTypes';

import { INITIAL_AVAILABILITY, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { afpAvailability } from 'src/shared/reducers/alternativeFormsOfPaymentReducer';

const INITIAL_CARD = null;

const {
  ALTERNATIVE_FORMS_OF_PAYMENT__SAVE_FORM_DATA,
  ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS
} = AlternativeFormsOfPaymentActionTypes;

const { WEB_VIEW__HANDLE_APPLE_PAY } = WebViewActionTypes;

const applePayAvailability = (state = INITIAL_AVAILABILITY, action = {}) =>
  _.cloneDeep(afpAvailability(state, action, PAYMENT_METHODS.APPLE_PAY));

const applePayCard = (state = INITIAL_CARD, action = {}) => {
  switch (action.type) {
    case ALTERNATIVE_FORMS_OF_PAYMENT__SAVE_FORM_DATA:
      return _.pick(action, ['formData']);

    case ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY:
    case ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED:
      return INITIAL_CARD;

    case ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS: {
      if (action.response.paymentMethod === PAYMENT_METHODS.APPLE_PAY) {
        return {
          ...state,
          ..._.pick(action.response.uatpCard, ['token', 'billingAddress']),
          isNativeApplePay: false
        };
      } else {
        return state;
      }
    }

    case WEB_VIEW__HANDLE_APPLE_PAY:
      return {
        ...state,
        purchaseRequest: decodeMessage(action.request),
        isNativeApplePay: true
      };

    default:
      return state;
  }
};

export default combineReducers({ applePayAvailability, applePayCard });
