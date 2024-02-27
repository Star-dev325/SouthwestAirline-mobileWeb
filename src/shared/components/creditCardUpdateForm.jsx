// @flow

import React from 'react';
import dayjs from 'dayjs';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Fields from 'src/shared/components/fields';
import Form from 'src/shared/form/components/form';
import FormInputField from 'src/shared/form/fields/formInputField';
import CreditCardTypeAndNumber from 'src/shared/components/creditCardTypeAndNumber';
import CreditCardExpirationFields from 'src/shared/form/fields/creditCardExpirationFields';
import ContactInfoFields from 'src/shared/form/fields/contactInfoFields';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import paymentFormValidator from 'src/shared/form/formValidators/paymentFormValidator';
import withForm from 'src/shared/form/enhancers/withForm';
import i18n from '@swa-ui/locale';

import type { UpdateSavedCreditCardPage } from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  formData?: FormData,
  savedCreditCard: UpdateSavedCreditCardPage,
  onSubmit: (*) => void
};

class CreditCardUpdateForm extends React.Component<Props> {
  render() {
    const {
      formId,
      onSubmit,
      savedCreditCard: { type, lastFourDigits }
    } = this.props;

    return (
      <Form formId={formId} className="credit-card-update-form" onSubmit={onSubmit}>
        <PageHeaderWithButtons
          className="lineheight20"
          title="Edit Payment"
          rightButtons={[{ name: 'Done', type: 'submit' }]}
        />
        <Segments>
          <Segment>
            <Fields type="grouped" label={i18n('SHARED__SAVED_CREDIT_CARDS_TITLE__CREDIT_CARD_INFO_TITLE')}>
              <CreditCardTypeAndNumber creditCardType={type} lastFourDigitsOfCreditCard={lastFourDigits} />
              <FormInputField name="nameOnCard" placeholder={i18n('SHARED__PLACEHOLDER__NAME_ON_CARD')} />
            </Fields>
            <CreditCardExpirationFields names={['expiration']} />
            <ContactInfoFields
              names={[
                'isoCountryCode',
                'addressLine1',
                'addressLine2',
                'city',
                'stateProvinceRegion',
                'zipOrPostalCode'
              ]}
              label={i18n('SHARED__LABEL_BILLING_ADDRESS')}
              showPhoneNumber={false}
              showCountryCodeAsDropDown
            />
          </Segment>
        </Segments>
      </Form>
    );
  }
}

export default withForm({
  formValidator: paymentFormValidator,
  defaultValues: (props: Props) => {
    const { formData } = props;
    const { billingAddress, nameOnCard, expiryMonth, expiryYear } = props.savedCreditCard;
    const expirationDate = dayjs()
      .year(expiryYear)
      .month(expiryMonth - 1);

    return {
      ...billingAddress,
      nameOnCard,
      expiration: expirationDate.format('YYYY-MM'),
      ...formData
    };
  }
})(CreditCardUpdateForm);
