// @flow

import _ from 'lodash';

import { removeSeparator } from 'src/shared/helpers/separatorHelper';
import { generateNewCreditCardInfo, generateUatpCardInfo } from 'src/shared/helpers/creditCardHelper';
import { isCurrencyAmountZero } from 'src/shared/helpers/travelFundsHelper';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';

import { NEW_CREDIT_CARD_ID, PAY_PAL_CARD_ID, APPLE_PAY_CARD_ID } from 'src/shared/constants/creditCardConstants';

import type { FlightChangeRequestDataType } from 'src/airChange/flow-typed/airChange.types';

export const generateChangeRequest = (
  flightChangeRequestData: FlightChangeRequestDataType,
  changeConfirmationPageLink: Link
) => {
  const {
    contactMethodInfo: { contactMethod, email, phoneNumber, phoneCountryCode, declineNotifications },
    paymentInfo,
    emailReceiptTo,
    moneyTotalFare,
    refundMethod,
    paymentRequired,
    securityCode,
    fundsAppliedToken,
    applePayCard
  } = flightChangeRequestData;
  const selectedCardId = _.get(paymentInfo, 'selectedCardId');

  const requestBody: { [string]: * } = { emailReceiptTo };
  const needContactMethod = _.toBoolean(declineNotifications);

  if (needContactMethod) {
    requestBody.declineNotifications = true;
  } else {
    requestBody.contactInformation = {
      email,
      phone: {
        countryCode: phoneCountryCode,
        number: removeSeparator(phoneNumber)
      },
      contactMethod
    };
  }

  if (!_.isEmpty(refundMethod)) {
    requestBody.refundMethod = refundMethod;
  }

  if (paymentRequired || fundsAppliedToken) {
    let pointsTotalBaseFare = _.get(flightChangeRequestData, 'flightPricingPage.totals.pointsTotal', null);
    let payment: { [string]: * } = { moneyTotalFare };

    pointsTotalBaseFare = pointsTotalBaseFare
      ? _.pick(pointsTotalBaseFare, ['amount', 'currencyCode'])
      : pointsTotalBaseFare;

    const purchasePaymentInfo = { moneyTotalFare, pointsTotalBaseFare };

    fundsAppliedToken && _.set(payment, 'fundToken', fundsAppliedToken);

    if (!isCurrencyAmountZero(moneyTotalFare)) {
      switch (selectedCardId) {
        case NEW_CREDIT_CARD_ID:
          payment.newCreditCard = generateNewCreditCardInfo(paymentInfo);
          break;
        case PAY_PAL_CARD_ID: {
          const paypalToken = _.get(flightChangeRequestData, 'payPal.token');

          payment.paypal = { paypalToken };
          break;
        }
        case APPLE_PAY_CARD_ID: {
          if (applePayCard && applePayCard.isNativeApplePay) {
            payment = _.merge({}, purchasePaymentInfo, applePayCard.purchaseRequest);
          } else {
            payment.newCreditCard = generateUatpCardInfo(applePayCard, APPLE_PAY.key);
          }
          break;
        }
        default: {
          payment.savedCreditCard = { savedCreditCardId: selectedCardId };
          break;
        }
      }
    }

    !_.isEmpty(securityCode) && _.set(payment, 'savedCreditCard.securityCode', securityCode);
    requestBody.payment = payment;
  }

  return _.merge({}, changeConfirmationPageLink, {
    body: requestBody
  });
};
