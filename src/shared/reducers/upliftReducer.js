import _ from 'lodash';
import { combineReducers } from 'redux';

import AlternativeFormsOfPaymentActionTypes from 'src/shared/actions/alternativeFormsOfPaymentActionTypes';

import { INITIAL_AVAILABILITY, PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { afpAvailability } from 'src/shared/reducers/alternativeFormsOfPaymentReducer';

const INITIAL_CARD = null;

const {
  ALTERNATIVE_FORMS_OF_PAYMENT__SAVE_FORM_DATA,
  ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED,
  ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS
} = AlternativeFormsOfPaymentActionTypes;

const upliftAvailability = (state = INITIAL_AVAILABILITY, action = {}) =>
  _.cloneDeep(afpAvailability(state, action, PAYMENT_METHODS.UPLIFT));

const upliftCard = (state = INITIAL_CARD, action = {}) => {
  switch (action.type) {
    case ALTERNATIVE_FORMS_OF_PAYMENT__SAVE_FORM_DATA: {
      const formData = _.pick(action, ['formData']);

      return formData;
    }

    case ALTERNATIVE_FORMS_OF_PAYMENT__RESET_AVAILABILITY:
    case ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_FAILED:
      return INITIAL_CARD;

    case ALTERNATIVE_FORMS_OF_PAYMENT__INITIATE_PAYMENT_SUCCESS: {
      if (action.response.paymentMethod === PAYMENT_METHODS.UPLIFT) {
        return {
          ...state,
          ..._.pick(action.response.uatpCard, ['token', 'billingAddress'])
        };
      } else {
        return state;
      }
    }

    default:
      return state;
  }
};

export default combineReducers({ upliftAvailability, upliftCard });
