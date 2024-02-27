// @flow
import _ from 'lodash';

import type { CeptorCallbackResponse } from 'src/shared/flow-typed/shared.types';

export const toApplePayCard = (response: CeptorCallbackResponse, digitalTransactionId: *) => {
  const cardTypeAndLastFourDigits = _.get(response, 'paymentData.lastFourDigits');
  const [cardType, lastFourDigits] = _.split(cardTypeAndLastFourDigits, ' ');

  const token = {
    cardType,
    digitalTransactionId,
    expirationMonth: _.get(response, 'paymentData.expiryMonth'),
    expirationYear: _.get(response, 'paymentData.expiryYear'),
    lastFourDigits,
    number: _.get(response, 'paymentData.cardNumber')
  };

  const billingAddress = {
    addressLine1: _.chain(response).get('paymentData.billingInfo.addressLines').head().value(),
    addressLine2: _.chain(response).get('paymentData.billingInfo.addressLines').nth(1).value(),
    city: _.get(response, 'paymentData.billingInfo.locality'),
    firstName: _.get(response, 'paymentData.billingInfo.givenName'),
    isoCountryCode: _.get(response, 'paymentData.billingInfo.countryCode'),
    lastName: _.get(response, 'paymentData.billingInfo.familyName'),
    stateProvinceRegion: _.get(response, 'paymentData.billingInfo.administrativeArea'),
    zipOrPostalCode: _.get(response, 'paymentData.billingInfo.postalCode')
  };

  return { billingAddress, isNativeApplePay: false, token };
};
