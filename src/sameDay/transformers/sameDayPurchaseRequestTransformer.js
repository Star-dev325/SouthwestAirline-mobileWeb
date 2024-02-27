// @flow
import type { AmountDue, SameDayConfirmationRequest } from 'src/sameDay/flow-typed/sameDay.types';
import { APPLE_PAY_CARD_ID, NEW_CREDIT_CARD_ID, PAY_PAL_CARD_ID } from 'src/shared/constants/creditCardConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import type { FormData } from 'src/shared/form/flow-typed/form.types';
import { generateNewCreditCardInfo, generateUatpCardInfo } from 'src/shared/helpers/creditCardHelper';

export const generateSameDayConfirmationRequest = (
  formData: FormData,
  sameDayConfirmationRequest: SameDayConfirmationRequest,
  amountDue?: ?AmountDue
) => {
  const { fare, tax } = amountDue || {};
  const { applePayCard, paymentInfo, payPal, recipientEmail, refundMethod, securityCode = null } = formData ?? {};
  const newCreditCard = paymentInfo && generateNewCreditCardInfo(paymentInfo);
  const selectedCardId = paymentInfo?.selectedCardId;
  const savedCreditCard = {
    intentToStore: paymentInfo?.intentToStore || false,
    savedCreditCardId: paymentInfo?.selectedCardId || [],
    securityCode
  };

  const { token: paypalToken } = payPal || {};

  let cardInfo;

  switch (selectedCardId) {
    case NEW_CREDIT_CARD_ID:
      cardInfo = { newCreditCard: newCreditCard };
      break;
    case PAY_PAL_CARD_ID:
      cardInfo = { paypal: { paypalToken: paypalToken } };
      break;
    case APPLE_PAY_CARD_ID:
      if (applePayCard && applePayCard.isNativeApplePay) {
        cardInfo = { newCreditCard: applePayCard.purchaseRequest.newCreditCard };
      } else {
        cardInfo = { newCreditCard: generateUatpCardInfo(applePayCard, APPLE_PAY.key) };
      }
      break;
    default:
      cardInfo = { savedCreditCard: savedCreditCard, savedCreditCardSelected: true };
      break;
  }

  const paymentData = !refundMethod &&
    (tax || fare) && {
    moneyTotalFare: parseFloat(tax?.amount) > 0 ? tax : fare,
    ...cardInfo
  };

  const requestPayload = paymentData
    ? { ...sameDayConfirmationRequest.body, payment: paymentData, recipientEmail: recipientEmail ?? null, refundMethod }
    : { ...sameDayConfirmationRequest.body, recipientEmail: recipientEmail ?? null, refundMethod };

  return { ...sameDayConfirmationRequest, body: requestPayload };
};
