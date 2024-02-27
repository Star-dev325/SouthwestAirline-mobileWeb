import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { emailRules, getPhoneNumberRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';

const isRequired = true;

export default () => (formData) => {
  const isUS = formData.phoneCountryCode === '1';
  const fieldRules = {
    contactMethod: [{ isRequired }],
    phoneNumber: getPhoneNumberRule(isUS),
    email: [{ isRequired }, ...emailRules]
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};
