// @flow
import React from 'react';
import dayjs from 'dayjs';

import Fields from 'src/shared/components/fields';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import FormInputField from 'src/shared/form/fields/formInputField';
import withFields from 'src/shared/form/enhancers/withFields';
import i18n from '@swa-ui/locale';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  showPreviousYears?: boolean,
  formData: FormData,
  isWebView?: boolean
};

const CreditCardExpirationFields = (props: Props) => {
  const {
    formData: { expiration },
    showPreviousYears,
    isWebView,
    ...restProps
  } = props;
  const now = dayjs();
  const creditCardExpirationDate = dayjs(expiration);
  const creditCardExpirationIsInThePast = creditCardExpirationDate.isBefore(now);

  const current =
    showPreviousYears && creditCardExpirationIsInThePast ? creditCardExpirationDate.toDate() : now.toDate();
  const defaultExpirationDate = new Date().setFullYear(current.getFullYear() + 1);
  const maxExpirationDate = new Date().setFullYear(current.getFullYear() + 20);

  return (
    <Fields type="grouped" label="EXPIRATION DATE">
      {isWebView ? (
        <FormInputField
          name="expiration"
          placeholder={i18n('SHARED__PLACEHOLDER__CARD_EXPIRATION_DATE')}
          type="tel"
          maxLength={7}
          pattern="[0-9]*"
          mask={'99/9999'}
          maskChar={null}
        />
      ) : (
        <FormDatePickerField
          name="expiration"
          fields={['month', 'year']}
          min={current}
          max={maxExpirationDate}
          defaultDate={defaultExpirationDate}
          showPreviousYears={showPreviousYears}
          {...restProps}
        />
      )}
    </Fields>
  );
};

export default withFields(CreditCardExpirationFields);
