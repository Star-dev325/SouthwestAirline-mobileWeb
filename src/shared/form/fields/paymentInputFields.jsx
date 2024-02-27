// @flow
import React from 'react';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormInputMaskField from 'src/shared/form/fields/formInputMaskField';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import CreditCardExpirationFields from 'src/shared/form/fields/creditCardExpirationFields';
import ContactInfoFields from 'src/shared/form/fields/contactInfoFields';
import { sitePaths } from 'src/shared/constants/siteLinks';
import withFields from 'src/shared/form/enhancers/withFields';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';
import SecurityCodeInputField from 'src/shared/form/fields/securityCodeInputField';
import i18n from '@swa-ui/locale';

type Props = {
  showSaveCCButton?: boolean,
  supportModifyCountryCode?: boolean,
  showSecurityCode?: boolean,
  onCreditCardChange: (*) => void,
  isWebView?: boolean
};

const PaymentInputFields = (props: Props) => {
  const { showSaveCCButton, supportModifyCountryCode, showSecurityCode, onCreditCardChange, isWebView } = props;

  return (
    <Segments>
      <Segment>
        <Fields type="grouped" label={i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__CREDIT_CARD_INFO_TITLE')}>
          <FormInputMaskField
            name="cardNumber"
            type="tel"
            placeholder="Card Num."
            className="card-number"
            onChange={onCreditCardChange}
            {...getMaskProps({ rule: '9', repeat: 19 })}
          />
          <SecurityCodeInputField
            className="security-code purchase-summary-security-code--input-field"
            showWarningIcon={false}
            shouldShowSecurityInputField={showSecurityCode}
          />
          <FormInputField name="nameOnCard" placeholder="Name on card" />
        </Fields>
        <CreditCardExpirationFields names={['expiration']} isWebView={isWebView} />
        <a className="payment-form--accept-forms" target="_blank" href={sitePaths.formsOfPaymentOverlay}>
          {i18n('SHARED__PAYMENT_LINKS__PAYMENT_FORMS')}
        </a>
        <ContactInfoFields
          names={[
            'isoCountryCode',
            'addressLine1',
            'addressLine2',
            'city',
            'stateProvinceRegion',
            'zipOrPostalCode',
            'phoneNumber',
            'phoneCountryCode'
          ]}
          label="BILLING ADDRESS"
          supportModifyCountryCode={supportModifyCountryCode}
        />
        {showSaveCCButton && (
          <div>
            <FormCheckboxField name="intentToStore" className="saved-credit-cards--checkbox-field" clickableChildren>
              {i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__SAVE_CREDIT_CARD_FOR_FUTURE_USE')}
            </FormCheckboxField>
            <div className="switch-radio-field--description">
              {i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__CREDIT_CARD_SAVE_UPON_PURCHASE')}
            </div>
          </div>
        )}
      </Segment>
    </Segments>
  );
};

PaymentInputFields.defaultProps = {
  showSecurityCode: true
};

export default withFields(PaymentInputFields);
