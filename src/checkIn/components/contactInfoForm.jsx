// @flow
import React from 'react';

import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import FormInputField from 'src/shared/form/fields/formInputField';
import Button from 'src/shared/components/button';
import Fields from 'src/shared/components/fields';
import Field from 'src/shared/components/field';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import InstructionText from 'src/checkIn/components/instructionText';
import contactInfoFormValidator from 'src/shared/form/formValidators/contactInfoFormValidator';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  onSubmit: (FormData) => void,
  instructionText: string,
  formData: FormData,
  hideErrorHeaderMsgFn: () => void
};

class ContactInfoForm extends React.Component<Props> {
  render() {
    const { formId, onSubmit, instructionText, formData, hideErrorHeaderMsgFn } = this.props;

    return (
      <Form formId={formId} className="notification-form" onSubmit={onSubmit}>
        <InstructionText text={instructionText} />

        <Fields type="grouped">
          <Field>
            <FormSelectField
              name="contactMethod"
              className="mb4"
              options={[
                { value: 'EMAIL', label: 'Email' },
                { value: 'SMS', label: 'Text' }
              ]}
              onChange={hideErrorHeaderMsgFn}
            />
          </Field>

          {formData.contactMethod === 'EMAIL' ? (
            <Field>
              <FormInputField
                name="email"
                size="huge"
                type="email"
                placeholder={i18n('SHARED__PLACEHOLDER__EMAIL_ADDRESS')}
              />
            </Field>
          ) : (
            <Field type="grouped">
              <FormInputField
                name="sms"
                size="huge"
                type="tel"
                mask="999-999-9999"
                maxLength="12"
                maskChar={null}
                placeholder={i18n('SHARED__PLACEHOLDER__PHONE_NUMBER')}
              />
              <InstructionText text="Standard text messaging charges will apply." />
            </Field>
          )}
        </Fields>
        <div>
          <Button size="larger" color="yellow" fluid type="submit" role="submit">
            Submit
          </Button>
        </div>
      </Form>
    );
  }
}

export default withForm({
  formValidator: contactInfoFormValidator,
  defaultValues: () => ({
    contactMethod: 'EMAIL'
  })
})(ContactInfoForm);
