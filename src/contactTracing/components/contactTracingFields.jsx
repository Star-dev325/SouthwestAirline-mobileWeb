// @flow

import React from 'react';
import Segment from 'src/shared/components/segment';
import PhoneNumberWithModal from 'src/shared/form/fields/phoneNumberWithModal';
import FormInputField from 'src/shared/form/fields/formInputField';
import i18n from '@swa-ui/locale';

import type { DestinationConfig } from 'src/contactTracing/flow-typed/contactTracing.types';

type Props = {
  destinationConfig: DestinationConfig
};

export class ContactTracingFields extends React.Component<Props> {
  render() {
    const {
      destinationConfig: { contactEmailLabel, contactPhone1Label, contactPhone2Label }
    } = this.props;

    return (
      <div>
        <Segment label={contactPhone1Label || i18n('PRIMARY_CONTACT')}>
          <PhoneNumberWithModal
            nameForPhoneNumber="contactPhone1Number"
            nameForPhoneCountryCode="contactPhone1CountryCode"
            className="phone-number-field phone-number-field--international"
            isISOCountryCode={false}
          />
        </Segment>
        <Segment label={contactPhone2Label || i18n('ALTERNATE_CONTACT')}>
          <PhoneNumberWithModal
            nameForPhoneNumber="contactPhone2Number"
            nameForPhoneCountryCode="contactPhone2CountryCode"
            className="phone-number-field phone-number-field--international"
            isISOCountryCode={false}
          />
        </Segment>
        <Segment label={contactEmailLabel || i18n('EMAIL_ADDRESS')}>
          <FormInputField name="contactEmail" placeholder={i18n('EMAIL_ADDRESS')} type="email" />
        </Segment>
      </div>
    );
  }
}

export default ContactTracingFields;
