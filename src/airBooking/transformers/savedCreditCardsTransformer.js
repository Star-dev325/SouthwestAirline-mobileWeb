import _ from 'lodash';
import EditModeBottomButtonConstants from 'src/shared/form/constants/editModeBottomButtonConstants';

const { PRIMARY, UPDATE, DELETE } = EditModeBottomButtonConstants;

export const toEditModeButtonStatus = (savedCreditCards, selectedCardIds) => {
  const selectedCreditCardCount = selectedCardIds.length;

  let isPrimaryButtonEnabled = false;

  if (selectedCreditCardCount === 1) {
    const isPrimaryCard = _.get(savedCreditCards, 'primaryCard.savedCreditCardId') === selectedCardIds[0];
    const isValidOtherCard = !!_.find(
      savedCreditCards.otherCards,
      (creditCard) => creditCard.savedCreditCardId === selectedCardIds[0] && !creditCard.isExpired
    );

    isPrimaryButtonEnabled = !isPrimaryCard && isValidOtherCard;
  }

  return {
    [PRIMARY]: isPrimaryButtonEnabled,
    [UPDATE]: selectedCreditCardCount === 1,
    [DELETE]: selectedCreditCardCount > 0
  };
};
