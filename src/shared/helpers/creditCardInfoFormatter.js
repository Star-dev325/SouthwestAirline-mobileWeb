import _ from 'lodash';
import {
  RAPID_REWARDS_VISA_ID,
  APPLE_PAY_CARD_ID,
  PAY_PAL_CARD_ID,
  UPLIFT_CARD_ID
} from 'src/shared/constants/creditCardConstants';
import { RAPID_REWARDS_VISA, APPLE_PAY, PAYPAL, UPLIFT } from 'src/shared/constants/creditCardTypes';
import { getCardNameByType, getCardType } from 'src/shared/helpers/creditCardHelper';

const getShortDescriptionCard = (selectedCardId) => {
  switch (selectedCardId) {
    case RAPID_REWARDS_VISA_ID:
      return {
        name: RAPID_REWARDS_VISA.name,
        type: RAPID_REWARDS_VISA.key
      };
    case PAY_PAL_CARD_ID:
      return {
        name: PAYPAL.shortName,
        type: PAYPAL.key
      };
    case APPLE_PAY_CARD_ID:
      return {
        name: APPLE_PAY.shortName,
        type: APPLE_PAY.key
      };
    case UPLIFT_CARD_ID:
      return {
        name: UPLIFT.shortName,
        type: UPLIFT.key
      };
    default:
      return null;
  }
};

export const formatCreditCardPresentInfo = (paymentInfo, savedCreditCards = {}) => {
  const cards = _.concat(
    savedCreditCards.otherCards || [],
    savedCreditCards.primaryCard,
    savedCreditCards.ghostCards || []
  );
  const { selectedCardId } = paymentInfo;

  const selectedCard = _.find(cards, (card) => _.get(card, 'savedCreditCardId') === selectedCardId);

  if (selectedCard) {
    return selectedCard;
  }

  const shortDescriptionCard = getShortDescriptionCard(paymentInfo.selectedCardId);

  if (shortDescriptionCard) {
    return {
      savedCreditCardId: selectedCardId,
      ...shortDescriptionCard
    };
  }

  const creditCardType = getCardType(paymentInfo.cardNumber);
  const lastFourDigitsOfCreditCard = paymentInfo.cardNumber && paymentInfo.cardNumber.slice(-4);

  if (creditCardType && lastFourDigitsOfCreditCard) {
    return {
      savedCreditCardId: selectedCardId,
      type: creditCardType,
      name: getCardNameByType(creditCardType),
      lastFourDigits: lastFourDigitsOfCreditCard,
      isExpired: false
    };
  }

  return '';
};
