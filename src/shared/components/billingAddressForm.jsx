// @flow
import React from 'react';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import i18n from '@swa-ui/locale';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import ContactInfoFields from 'src/shared/form/fields/contactInfoFields';
import billingAddressFormValidator from 'src/shared/form/formValidators/billingAddressFormValidator';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  initialFormData?: FormData,
  goBack: () => void,
  onSubmit: () => void
};

class BillingAddressForm extends React.Component<Props> {
  render() {
    const { formId, goBack, onSubmit } = this.props;

    return (
      <Form formId={formId} onSubmit={onSubmit} className="billing-info-form">
        <PageHeaderWithButtons
          title={i18n('SHARED__ADD__BILLING__ADDRESS')}
          leftButtons={[{ name: i18n('SHARED__BUTTON_TEXT__CANCEL'), onClick: goBack }]}
          rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__DONE'), type: 'submit' }]}
        />
        <Segments>
          <Segment>
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
              label={i18n('SHARED__BILLING_INFO__BILLING_ADDRESS')}
              supportModifyCountryCode
            />
          </Segment>
        </Segments>
      </Form>
    );
  }
}

export default withForm({
  autoClearFormData: true,
  formValidator: billingAddressFormValidator,
  defaultValues: (props: Props) => {
    const { initialFormData } = props;

    if (initialFormData) return initialFormData;

    return {
      isoCountryCode: 'US',
      phoneCountryCode: 'US'
    };
  }
})(BillingAddressForm);
