// @flow

import _ from 'lodash';
import { UATP } from 'src/shared/constants/creditCardTypes';

import type { PaymentSavedCreditCards } from 'src/shared/flow-typed/shared.types';

export function isSavedCreditCardThatRequiresCVV(savedCreditCards: PaymentSavedCreditCards, selectedCardId: string) {
  const selectedCard = _.chain([])
    .concat(savedCreditCards.otherCards, savedCreditCards.primaryCard)
    .find(['savedCreditCardId', selectedCardId])
    .value();

  return !!(
    savedCreditCards.requireSecurityCode &&
    selectedCard &&
    !selectedCard.cvvVerified &&
    selectedCard.type !== UATP.key
  );
}
