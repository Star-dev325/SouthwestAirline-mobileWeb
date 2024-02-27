// @flow

import React from 'react';

import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import i18n from '@swa-ui/locale';

type Props = {
  recipientInfoText: string
};
const TransferRecipientFields = ({ recipientInfoText }: Props) => (
  <Fields type="grouped" label={i18n('TRANSFER_RECIPIENT_LABEL')}>
    <FormInputField name="firstName" placeholder={i18n('FIRST_NAME_PLACEHOLDER')} />
    <FormInputField name="lastName" placeholder={i18n('LAST_NAME_PLACEHOLDER')} />
    <FormInputField name="rapidRewardsNumber" placeholder={i18n('RR_PLACEHOLDER')} type="tel" />
    <p className="helper-text">{recipientInfoText}</p>
  </Fields>
);

export default TransferRecipientFields;
