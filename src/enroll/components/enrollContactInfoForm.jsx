// @flow

import React from 'react';
import Fields from 'src/shared/components/fields';
import Form from 'src/shared/form/components/form';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormCheckboxField from 'src/shared/form/fields/formCheckboxField';
import ContactInfoFields from 'src/shared/form/fields/contactInfoFields';
import withForm from 'src/shared/form/enhancers/withForm';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import { sitePaths } from 'src/shared/constants/siteLinks';
import EnrollContactInfoFormValidator from 'src/shared/form/formValidators/enrollContactInfoFormValidator';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  formData: FormData,
  onSubmit: () => void
};

export class EnrollContactInfoForm extends React.Component<Props> {
  render() {
    const { formId, onSubmit } = this.props;

    return (
      <Form formId={formId} className="enroll-contact-info-form" onSubmit={onSubmit}>
        <Segments>
          <Segment ordinality="secondary">
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
              supportModifyCountryCode
            />
            <FormInputField name="email" placeholder="Email address" type="email" />
            <FormInputField name="confirmedEmail" placeholder="Re-enter Email address" type="email" />
          </Segment>
          <Segment fill ordinality="secondary">
            <Fields className="email-subscriptions-fields" type="grouped" divided label={i18n('STAY_CONNECTED')}>
              <FormCheckboxField
                name="optInForEmailSubscriptions"
                className="checkbox-button"
                size="large"
                childrenClassName="children-ses"
                alignTop
              >
                {i18n('ENROLL_EMAIL_OPT_IN')}
                <sup>®</sup>
                <p className="helper-text-ses" ref="SubscriptionDetails">
                  <a target="_blank" href={sitePaths.subscriptionDetails}>
                    {i18n('ENROLL_SUBSCRIPTION_DETAILS')}
                  </a>
                </p>
              </FormCheckboxField>
            </Fields>
          </Segment>

          <Segment color="blue" inverted>
            <Button className="continue" data-qa="continue-button" type="submit" color="yellow" size="huge" fluid>
              {i18n('ENROLL_CONTINUE')}
            </Button>
          </Segment>
        </Segments>
      </Form>
    );
  }
}

export default withForm({
  formValidator: EnrollContactInfoFormValidator,
  defaultValues: () => ({
    isoCountryCode: 'US',
    phoneCountryCode: 'US',
    optInForEmailSubscriptions: true
  })
})(EnrollContactInfoForm);
