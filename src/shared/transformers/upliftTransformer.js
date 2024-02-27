// @flow

import _ from 'lodash';

import type { CeptorCallbackResponse } from 'src/shared/flow-typed/shared.types';

export const toUpliftCard = (response: CeptorCallbackResponse) => {
  const token = {
    number: _.get(response, 'paymentData.cardNumber'),
    expirationMonth: formatMonth(_.get(response, 'paymentData.expiryMonth')),
    expirationYear: _.get(response, 'paymentData.expiryYear')
  };

  const billingAddress = {
    isoCountryCode: _.get(response, 'paymentData.billingInfo.countryCode'),
    stateProvinceRegion: _.get(response, 'paymentData.billingInfo.administrativeArea'),
    zipOrPostalCode: _.get(response, 'paymentData.billingInfo.postalCode'),
    addressLine1: _.chain(response).get('paymentData.billingInfo.addressLines').head().value(),
    addressLine2: _.chain(response).get('paymentData.billingInfo.addressLines').nth(1).value(),
    city: _.get(response, 'paymentData.billingInfo.locality'),
    firstName: _.get(response, 'paymentData.billingInfo.givenName'),
    lastName: _.get(response, 'paymentData.billingInfo.familyName')
  };

  return { token, billingAddress };
};

const formatMonth = (expirationMonth: number) => (expirationMonth ? `0${expirationMonth}`.slice(-2) : '');
