// @flow

import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import {
  firstName,
  lastName,
  rapidRewardsNumber,
  emailRules
} from 'src/shared/form/formValidators/sharedFieldValidatorRules';

const isRequired = true;

export default () => (formData: FormData) => {
  const fieldRules: FieldValidationRules = {
    firstName,
    lastName,
    rapidRewardsNumber: [{ isRequired }, ...rapidRewardsNumber()],
    recipientEmailAddress: [{ isRequired }, ...emailRules],
    additionalReceipt: emailRules
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};
