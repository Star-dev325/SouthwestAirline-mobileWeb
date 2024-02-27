// @flow
import _ from 'lodash';
import { generateNewCreditCardInfo, generateUatpCardInfo } from 'src/shared/helpers/creditCardHelper';
import { NEW_CREDIT_CARD_ID, PAY_PAL_CARD_ID, APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';

import type { UpgradedBoardingPurchaseType } from 'src/upgradedBoarding/flow-typed/upgradedBoarding.types';

export const generateUpgradedBoardingRequestLink = (upgradedBoardingPurchase: UpgradedBoardingPurchaseType) => {
  const {
    formData,
    upgradedBoardingConfirmationPageLink,
    moneyTotal: moneyTotalFare,
    payPal,
    applePayCard
  } = upgradedBoardingPurchase;

  const {
    paymentInfo: { selectedCardId },
    paymentInfo,
    receiptEmail,
    securityCode
  } = formData;
  const paypalToken = _.get(payPal, 'token');
  let payment = { moneyTotalFare };
  const purchasePaymentInfo = { moneyTotalFare };

  switch (selectedCardId) {
    case NEW_CREDIT_CARD_ID:
      _.set(payment, 'newCreditCard', generateNewCreditCardInfo(paymentInfo));
      break;
    case PAY_PAL_CARD_ID:
      _.set(payment, 'paypal.paypalToken', paypalToken);
      break;
    case APPLE_PAY_CARD_ID:
      if (applePayCard && applePayCard.isNativeApplePay) {
        payment = _.merge({}, purchasePaymentInfo, applePayCard.purchaseRequest);
      } else {
        _.set(payment, 'newCreditCard', generateUatpCardInfo(applePayCard, APPLE_PAY.key));
      }
      break;
    default:
      _.set(payment, 'savedCreditCard', { savedCreditCardId: selectedCardId, securityCode });
      break;
  }

  const productIds = Object.keys(formData).filter((productId) => formData[productId] === true);
  const body = { payment, productIds };

  receiptEmail && _.set(body, 'receiptEmail', receiptEmail);

  return _.merge({}, upgradedBoardingConfirmationPageLink, { body });
};
