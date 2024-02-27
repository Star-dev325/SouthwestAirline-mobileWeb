// @flow
import _ from 'lodash';
import { NEW_CREDIT_CARD_ID, PAY_PAL_CARD_ID, APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { generateNewCreditCardInfo, generateUatpCardInfo } from 'src/shared/helpers/creditCardHelper';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';

import type {
  EarlyBirdBoundType,
  EarlyBirdPassengerType,
  EarlyBirdPurchaseType
} from 'src/earlyBird/flow-typed/earlyBird.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

const getSelectedPassengers = (formData: FormData, boundIndex: number, passengers: Array<EarlyBirdPassengerType>) => {
  const selectedPassengerIndexes = _.chain(formData)
    .pickBy((val, key) => val === true && _.startsWith(key, `bound_${boundIndex}`))
    .mapKeys((val, key) => Number.parseInt(key.split('_').pop()))
    .keys()
    .value();

  return passengers.filter((passenger, paxIndex) => selectedPassengerIndexes.includes(_.toString(paxIndex)));
};

export const filterSelectedPassengersFromEarlyBirdBounds = (
  bounds: Array<EarlyBirdBoundType>,
  formData: FormData
): Array<EarlyBirdBoundType> =>
  bounds
    .map((bound: EarlyBirdBoundType, boundIndex: number) => {
      const { boundType, passengers, ...others } = bound;
      const selectedPassengers = getSelectedPassengers(formData, boundIndex, passengers);

      return {
        passengers: selectedPassengers,
        boundType,
        ...others
      };
    })
    .filter((bound) => !_.isEmpty(bound.passengers));

export const generateEarlyBirdPurchaseRequestLink = (earlyBirdPurchase: EarlyBirdPurchaseType) => {
  const { formData, earlyBirdConfirmationPageLink, earlyBirdPurchaseInfo, payPal, applePayCard } = earlyBirdPurchase;
  const { paymentInfo, securityCode, receiptEmail } = formData;
  const { moneyTotalFare, productIds } = earlyBirdPurchaseInfo;
  const selectedCardId = _.get(paymentInfo, 'selectedCardId');
  const paypalToken = _.get(payPal, 'token');

  const payment = {
    moneyTotalFare,
    savedCreditCard: undefined,
    newCreditCard: undefined
  };

  switch (selectedCardId) {
    case NEW_CREDIT_CARD_ID:
      _.set(payment, 'newCreditCard', generateNewCreditCardInfo(paymentInfo));
      break;
    case PAY_PAL_CARD_ID:
      _.set(payment, 'paypal.paypalToken', paypalToken);
      break;
    case APPLE_PAY_CARD_ID:
      _.set(payment, 'newCreditCard', generateUatpCardInfo(applePayCard, APPLE_PAY.key));
      break;
    default:
      _.set(payment, 'savedCreditCard', { savedCreditCardId: selectedCardId, securityCode });
      break;
  }

  const body = { payment, productIds };

  receiptEmail && _.set(body, 'receiptEmail', receiptEmail);

  return _.merge({}, earlyBirdConfirmationPageLink, { body });
};
