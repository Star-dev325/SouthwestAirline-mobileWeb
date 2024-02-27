import _ from 'lodash';
import CreditCardActionTypes from 'src/shared/actions/creditCardActionTypes';
import AirBookingActionTypes from 'src/airBooking/actions/airBookingActionTypes';

const savedCreditCardsInitialState = {
  primaryCard: null,
  otherCards: []
};

const savedCreditCardsReducer = (state = savedCreditCardsInitialState, action = {}) => {
  switch (action.type) {
    case CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_SUCCESS: {
      const { response } = action;

      return _.merge({}, savedCreditCardsInitialState, response);
    }

    case CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS:
    case AirBookingActionTypes.AIR_BOOKING__FETCH_SAVED_CREDIT_CARDS_AND_PASSENGER_INFO_SUCCESS: {
      const { paymentSavedCreditCardsPage } = action;

      return _.merge({}, savedCreditCardsInitialState, paymentSavedCreditCardsPage);
    }

    case CreditCardActionTypes.CREDIT_CARD__RESET_SAVED_CREDIT_CARDS: {
      return { ...savedCreditCardsInitialState };
    }

    default:
      return state;
  }
};

export default savedCreditCardsReducer;
