// @flow

import React, { useState } from 'react';

import withForm from 'src/shared/form/enhancers/withForm';
import Form from 'src/shared/form/components/form';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import Fields from 'src/shared/components/fields';
import PriceTotalLine from 'src/shared/components/priceTotalLine';

import TransferRecipientFields from 'src/travelFunds/components/transferRecipientFields';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormTextAreaField from 'src/shared/form/fields/formTextAreaField';
import i18n from '@swa-ui/locale';
import transferTravelFundsFormValidator from 'src/shared/form/formValidators/transferTravelFundsFormValidator';

import type { CurrencyType } from 'src/shared/flow-typed/shared.types';

type Props = {
  formId: string,
  onSubmit: () => void,
  onSubmitLabel: string,
  receiptEmailAddress: string,
  transferableAmount: CurrencyType,
  recipientInfoText: string,
  personalMsgMaxChar: number
};

const TransferTravelFundsForm = (props: Props) => {
  const {
    formId,
    onSubmit,
    onSubmitLabel,
    receiptEmailAddress,
    transferableAmount,
    personalMsgMaxChar,
    recipientInfoText
  } = props;

  const [personalMessage, setPersonalMessage] = useState('');
  const [remainingChars, setRemainingChars] = useState(personalMsgMaxChar);

  const _onPersonalMessageChange = (event) => {
    const value = event.target.value.substring(0, personalMsgMaxChar);
    const inputLength = value.length;

    setPersonalMessage(value);
    setRemainingChars(personalMsgMaxChar - inputLength);
  };

  return (
    <Form formId={formId} className="transfer-travel-funds-form" onSubmit={onSubmit}>
      <Segments>
        <Segment>
          <TransferRecipientFields recipientInfoText={recipientInfoText} />

          <Fields type="grouped" label={i18n('RECIPIENT_EMAIL_ADDRESS_LABEL')}>
            <FormInputField
              name="recipientEmailAddress"
              placeholder={i18n('RECIPIENT_EMAIL_ADDRESS_PLACEHOLDER')}
              type="email"
            />
          </Fields>

          <Fields
            type="grouped"
            label={i18n('PERSONAL_MESSAGE_LABEL')}
            secondaryLabel={`${remainingChars} ${i18n('PERSONAL_MESSAGE_CHARACTERS_LEFT')}`}
          >
            <FormTextAreaField
              name="personalMessage"
              onMessageChange={_onPersonalMessageChange}
              placeholder={i18n('PERSONAL_MESSAGE_PLACEHOLDER')}
              rowCount={6}
              maxLength={personalMsgMaxChar}
              value={personalMessage}
            />
            <p className="helper-text">{i18n('PERSONAL_MESSAGE_HELPER_TEXT')}</p>
          </Fields>

          <Fields type="grouped" label={i18n('AUTO_RECEIPT_LABEL')}>
            <p className="helper-text">{i18n('AUTO_RECEIPT_HELPER_TEXT')}</p>
            <p className="helper-text receipt-email">{receiptEmailAddress}</p>
          </Fields>

          <Fields type="grouped" label={i18n('ADDITIONAL_RECEIPT_LABEL')}>
            <FormInputField
              name="additionalReceipt"
              placeholder={i18n('ADDITIONAL_RECEIPT_PLACEHOLDER')}
              type="email"
            />
          </Fields>
        </Segment>

        <Segment color="blue" inverted>
          <div className="price-total">
            <div className="price-total--info">
              <PriceTotalLine type="total" title={i18n('TRANSFER_AMOUNT_TITLE')} total={transferableAmount} />
            </div>
          </div>

          <div className="purchase-disclaimer">{i18n('TRAVEL_FUNDS_TRANSFER_DISCLAIMER')}</div>
          <Button className="transfer-travel-funds-button" size="huge" type="submit" fluid>
            {onSubmitLabel}
          </Button>
        </Segment>
      </Segments>
    </Form>
  );
};

export default withForm({
  formValidator: transferTravelFundsFormValidator
})(TransferTravelFundsForm);
