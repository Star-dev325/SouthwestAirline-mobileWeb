// @flow

import _ from 'lodash';

import type { ApplePayCardWithFormData } from 'src/shared/flow-typed/shared.types';

export const getNewApplePayCard = (prevCard: ?ApplePayCardWithFormData, newCard: ?ApplePayCardWithFormData) => {
  const { isNativeApplePay } = newCard || {};

  const fieldsToValidate = getFieldsToValidate(isNativeApplePay);
  const isNewCard = !_.isEqual(_.pick(prevCard, fieldsToValidate), _.pick(newCard, fieldsToValidate));

  return getIsApplePayCardValid(newCard) && isNewCard ? newCard : null;
};

export const getIsApplePayCardValid = (applePayCard: ?ApplePayCardWithFormData) => {
  const { isNativeApplePay } = applePayCard || {};

  return _.hasAll(applePayCard, [...getFieldsToValidate(isNativeApplePay), 'formData']);
};

const getFieldsToValidate = (isNativeApplePay) =>
  (isNativeApplePay ? ['purchaseRequest'] : ['token', 'billingAddress']);
