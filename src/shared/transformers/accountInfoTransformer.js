import _ from 'lodash';
import { groupCreditCards } from 'src/shared/transformers/savedCreditCardsTransformer';

export const transformToPaymentInfo = (savedCreditCards) => {
  if (_.isEmpty(savedCreditCards)) {
    return undefined;
  }

  const { primaryCard, rapidRewardsCard } = groupCreditCards(savedCreditCards);
  const selectedCard = rapidRewardsCard ? rapidRewardsCard : primaryCard;

  const {
    savedCreditCardId,
    lastFourDigitsOfCreditCard,
    creditCardType,
    cardHolder: { firstName, lastName },
    billingAddress: { addressLine1, addressLine2, city, stateProvinceRegion, zipOrPostalCode, isoCountryCode }
  } = selectedCard;

  return {
    selectedCardId: savedCreditCardId,
    creditCardType,
    lastFourDigitsOfCreditCard,
    nameOnCard: `${firstName} ${lastName}`,
    addressLine1,
    addressLine2,
    city,
    stateProvinceRegion,
    zipOrPostalCode,
    isoCountryCode
  };
};
