import _ from 'lodash';
import { NEW_CREDIT_CARD_ID } from 'src/shared/constants/creditCardConstants';

export const getShouldSaveCreditCard = (paymentInfo) => _.chain(paymentInfo).get('intentToStore').toBoolean().value();

export const shouldShowBackToTopButtonForWAPI = (paymentInfo, savedCreditCards, isLoggedIn) => {
  const useNewCreditCard = !_.get(paymentInfo, 'selectedCardId');
  const hasMoreThanOneSavedCreditCards = _.result(savedCreditCards, 'length', 0) > 0;

  return isLoggedIn && hasMoreThanOneSavedCreditCards && useNewCreditCard;
};

export const shouldShowBackToTopButton = (selectedCardId, savedCreditCards, isLoggedIn) => {
  const useNewCreditCard = selectedCardId === NEW_CREDIT_CARD_ID;
  const hasMoreThanOneSavedCreditCards = !!_.get(savedCreditCards, 'primaryCard');

  return isLoggedIn && hasMoreThanOneSavedCreditCards && useNewCreditCard;
};
