// @flow
import React from 'react';
import _ from 'lodash';

import Form from 'src/shared/form/components/form';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import withForm from 'src/shared/form/enhancers/withForm';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import lookUpFundsFormValidator from 'src/shared/form/formValidators/lookUpFundsFormValidator';
import { getMaskProps } from 'src/shared/form/helpers/formHelper';

import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type { LookUpFormFieldType } from 'src/travelFunds/flow-typed/travelFunds.types';

type Props = {
  formId: string,
  formFields: Array<LookUpFormFieldType>,
  buttonText: string,
  onSubmit: (formData: FormData) => void,
  specialNote?: string
};

const LookUpFundsForm = (props: Props) => {
  const { formId, formFields, buttonText, onSubmit, specialNote } = props;

  return (
    <Form formId={formId} onSubmit={onSubmit} className="look-up-funds-form">
      <Segments>
        <Segment>
          <Fields type="grouped">
            {_.map(formFields, (field) => (
              <FormInputField
                key={_.kebabCase(`${buttonText}${field.placeholder}`)}
                name={field.fieldName}
                placeholder={field.placeholder}
                type={field.type}
                {...(field.maxLength ? getMaskProps({ rule: '9', repeat: field.maxLength }) : {})}
                {...(field.pattern ? { pattern: field.pattern } : {})}
              />
            ))}
          </Fields>
        </Segment>
        {specialNote && (
          <Segment>
            <p className="look-up-funds-form--special-note">{specialNote}</p>
          </Segment>
        )}
        <Segment>
          <Button size="larger" color="blue" type="submit" role="submit" fluid>
            {buttonText}
          </Button>
        </Segment>
      </Segments>
    </Form>
  );
};

export default withForm({
  autoClearFormData: false,
  formValidator: lookUpFundsFormValidator
})(LookUpFundsForm);
