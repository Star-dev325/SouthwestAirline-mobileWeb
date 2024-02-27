import _ from 'lodash';
import { NEW_CREDIT_CARD_ID } from 'src/shared/constants/creditCardConstants';
import * as CreditCardTypes from 'src/shared/constants/creditCardTypes';
import { removeSeparator } from 'src/shared/helpers/separatorHelper';

const CREDIT_CARD_DEFAULT_REGEX = /^\d{16}(\d{3})?$/;
const CREDIT_CARD_VISA_13_OR_19_DIGIT_REGEX = /^4\d{12}(\d{3})?(\d{3})?$/;
const CREDIT_CARD_14_OR_19_DIGIT_REGEX = /^\d{14}(\d{5})?$/;
const CREDIT_CARD_15_OR_19_DIGIT_REGEX = /^\d{15}(\d{4})?$/;

export const CardTypeConfigs = [
  {
    type: CreditCardTypes.VISA.key,
    defs: [
      {
        startsWith: '4',
        reg: CREDIT_CARD_VISA_13_OR_19_DIGIT_REGEX
      }
    ]
  },
  {
    type: CreditCardTypes.MASTERCARD.key,
    defs: [
      {
        startsWith: '5',
        reg: CREDIT_CARD_DEFAULT_REGEX
      },
      {
        startsWith: '2',
        reg: CREDIT_CARD_DEFAULT_REGEX
      }
    ]
  },
  {
    type: CreditCardTypes.AMEX.key,
    defs: [
      {
        startsWith: '34',
        reg: CREDIT_CARD_15_OR_19_DIGIT_REGEX
      },
      {
        startsWith: '37',
        reg: CREDIT_CARD_15_OR_19_DIGIT_REGEX
      }
    ]
  },
  {
    type: CreditCardTypes.DISCOVER.key,
    defs: [
      {
        startsWith: '6',
        reg: CREDIT_CARD_DEFAULT_REGEX
      }
    ]
  },
  {
    type: CreditCardTypes.DINERS.key,
    defs: [
      {
        startsWith: '30',
        reg: CREDIT_CARD_DEFAULT_REGEX
      },
      {
        startsWith: '35',
        reg: CREDIT_CARD_DEFAULT_REGEX
      },
      {
        startsWith: '36',
        reg: CREDIT_CARD_14_OR_19_DIGIT_REGEX
      },
      {
        startsWith: '38',
        reg: CREDIT_CARD_DEFAULT_REGEX
      },
      {
        startsWith: '39',
        reg: CREDIT_CARD_DEFAULT_REGEX
      }
    ]
  },
  {
    type: CreditCardTypes.UATP.key,
    defs: [
      {
        startsWith: '1',
        reg: CREDIT_CARD_15_OR_19_DIGIT_REGEX
      }
    ]
  }
];

const getCardTypeConfig = (cardStr) =>
  _.find(CardTypeConfigs, (cardType) => !!_.find(cardType.defs, (def) => _.startsWith(cardStr, def.startsWith)));

export const getCardTypeName = (cardStr) => {
  const cardTypeConfig = getCardTypeConfig(cardStr);

  return cardTypeConfig ? CreditCardTypes[cardTypeConfig.type].name : '';
};

export const getCardType = (cardStr) => {
  const cardTypeConfig = getCardTypeConfig(cardStr);

  return cardTypeConfig ? cardTypeConfig.type : null;
};

export const isCardValid = (cardStr) => {
  const cardTypeConfig = getCardTypeConfig(cardStr);

  if (!cardTypeConfig) {
    return false;
  }

  const cardTypeDef = _.find(cardTypeConfig.defs, (def) => _.startsWith(cardStr, def.startsWith));

  return isDefMatch(cardTypeDef, cardStr);
};

export const doesCreditCardNeedCVV = (cardNumber) =>
  !!cardNumber && isCardValid(cardNumber) && getCardType(cardNumber) !== CreditCardTypes.UATP.key;

export const doesNewCreditCardNeedCVV = (cardString) => getCardType(cardString) !== CreditCardTypes.UATP.key;

export const getCardNameByType = (type) => {
  const cardConfig = CreditCardTypes[type];

  return cardConfig ? cardConfig['name'] : '';
};

export const getCardShortNameByType = (type) => {
  const cardConfig = CreditCardTypes[type];

  return cardConfig ? cardConfig['shortName'] : '';
};

const isDefMatch = (def, cardStr) => {
  if (!def) {
    return false;
  } else if (def.length) {
    return cardStr.length === def.length;
  } else if (def.reg) {
    return def.reg.test(cardStr);
  }
};

export const getDefaultSelectedPaymentInfo = (paymentSavedCreditCards) => {
  const { primaryCard, ghostCards, ghostCardRequired } = paymentSavedCreditCards;
  const paymentInfo =
    primaryCard && primaryCard.savedCreditCardId ? { selectedCardId: primaryCard.savedCreditCardId } : {};

  if (_.size(ghostCards) === 1) {
    paymentInfo.selectedCardId = ghostCards[0].savedCreditCardId;
    paymentInfo.selectedGhostCardId = ghostCards[0].savedCreditCardId;
  } else if (ghostCardRequired) {
    paymentInfo.selectedCardId = undefined;
  }

  return paymentInfo;
};

export const needToSaveForPrimary = (paymentInfo, savedCreditCards) => {
  const primaryCardExists = !!savedCreditCards.primaryCard;
  const otherSavedCardsExist = !!savedCreditCards.otherCards;
  const intentToStore = !!_.get(paymentInfo, 'intentToStore', false);

  return !primaryCardExists && !otherSavedCardsExist && intentToStore;
};

export const splitNameOnCard = (nameOnCard) => {
  const trimmedNameOnCard = _.trim(nameOnCard);

  return {
    firstNameOnCard: _.head(trimmedNameOnCard.split(' ')),
    lastNameOnCard: _.last(trimmedNameOnCard.split(' '))
  };
};

export const generateNewCreditCardInfo = (paymentInfo) => {
  const {
    nameOnCard,
    addressLine1,
    addressLine2,
    city,
    stateProvinceRegion,
    zipOrPostalCode,
    phoneNumber,
    isoCountryCode,
    securityCode,
    cardNumber,
    expiration,
    intentToStore,
    isPrimary
  } = paymentInfo;

  const creditCardType = getCardType(cardNumber);

  const nameOnCardArray = _.chain(nameOnCard).split(' ').reject(_.isEmpty).value();

  const newCardInfo = {
    billingContactInfo: {
      firstName: _.first(nameOnCardArray),
      lastName: _.last(nameOnCardArray),
      address: {
        addressLine1,
        addressLine2: _.isEmpty(addressLine2) ? null : addressLine2,
        city,
        stateProvinceRegion,
        zipOrPostalCode,
        isoCountryCode
      },
      phoneNumber: removeSeparator(phoneNumber)
    },
    creditCardType,
    cardNumber,
    expiration,
    intentToStore: !!intentToStore,
    isPrimary
  };

  !_.isEmpty(securityCode) && (newCardInfo.securityCode = securityCode);

  return newCardInfo;
};

export const generateUatpCardInfo = (uatpCardInfo, digitalPaymentType) => {
  const { token, billingAddress } = uatpCardInfo || {};
  const { digitalTransactionId, expirationYear, expirationMonth, number } = token || {};
  const {
    isoCountryCode,
    stateProvinceRegion,
    zipOrPostalCode,
    addressLine1,
    addressLine2,
    city,
    firstName,
    lastName
  } = billingAddress || {};

  return {
    billingContactInfo: {
      address: {
        addressLine1,
        addressLine2,
        city,
        isoCountryCode,
        stateProvinceRegion,
        zipOrPostalCode
      },
      firstName,
      lastName
    },
    cardNumber: number,
    creditCardType: CreditCardTypes.UATP.key,
    digitalPaymentType,
    digitalTransactionId,
    expiration: `${expirationYear}-${expirationMonth}`
  };
};

export const isSavedCreditCardThatRequiresCVV = (payment, requireSecurityCodeForSaveCreditCard) =>
  !_.isEmpty(_.get(payment, 'selectedCardId')) &&
  _.get(payment, 'selectedCardId') !== NEW_CREDIT_CARD_ID &&
  _.get(payment, 'creditCardType') !== CreditCardTypes.UATP.key &&
  _.get(payment, 'creditCardType') !== CreditCardTypes.INSTANT_CREDIT_RAPID_REWARDS_VISA.key &&
  requireSecurityCodeForSaveCreditCard;
