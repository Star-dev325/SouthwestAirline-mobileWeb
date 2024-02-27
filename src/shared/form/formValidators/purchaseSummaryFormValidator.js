// @flow
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { securityCodeRule, getPhoneNumberRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import { isCurrencyAmountZero } from 'src/shared/helpers/travelFundsHelper';

import type { FieldValidationRules, FormData } from 'src/shared/form/flow-typed/form.types';
import type { CurrencyType, IrnInfoType } from 'src/shared/flow-typed/shared.types';

const isRequired = true;

export default ({
  declineNotifications,
  travelFundsBalanceRemaining,
  irnInfo
}: {
    declineNotifications: boolean,
    travelFundsBalanceRemaining: CurrencyType,
    irnInfo?: IrnInfoType
  }) =>
  (formData: FormData) => {
    const isZeroCardBalanceRemaining = isCurrencyAmountZero(travelFundsBalanceRemaining);
    const fieldRules: FieldValidationRules = {
      contactMethodContent: [{ isRequired: !declineNotifications }],
      paymentInfo: !isZeroCardBalanceRemaining ? [{ isRequired }] : [],
      securityCode: !isZeroCardBalanceRemaining ? [{ isRequired }, securityCodeRule] : [],
      travelFundsAddress: isZeroCardBalanceRemaining ? [{ isRequired }] : [],
      chasePhoneNumber: getPhoneNumberRule()
    };
    const formRules = {
      ...sharedFormValidators
    };

    if (irnInfo) {
      fieldRules.internalReferenceNumber = irnInfo.irnRequired ? [{ isRequired }] : [];
    }

    return executeValidators(formData, formRules, fieldRules);
  };
