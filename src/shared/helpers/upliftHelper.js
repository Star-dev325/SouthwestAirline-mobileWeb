// @flow

import _ from 'lodash';

import type { UpliftCardWithFormData } from 'src/shared/flow-typed/shared.types';

export const getNewUpliftCard = (prevCard: ?UpliftCardWithFormData, newCard: ?UpliftCardWithFormData) => {
  const fieldsToValidate = ['token', 'billingAddress', 'formData'];

  const isValidCard = _.hasAll(newCard, fieldsToValidate);
  const isNewCard = !_.isEqual(_.pick(prevCard, fieldsToValidate), _.pick(newCard, fieldsToValidate));

  return isValidCard && isNewCard ? newCard : null;
};
