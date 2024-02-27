// @flow

import React from 'react';
import cx from 'classnames';
import Fields from 'src/shared/components/fields';
import Form from 'src/shared/form/components/form';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import FormRadioInputField from 'src/shared/form/fields/formRadioInputField';
import OptionsHelper from 'src/shared/helpers/optionsHelper';
import withForm from 'src/shared/form/enhancers/withForm';
import Segments from 'src/shared/components/segments';
import Segment from 'src/shared/components/segment';
import Button from 'src/shared/components/button';
import EnrollPersonalInfoFormValidator from 'src/shared/form/formValidators/enrollPersonalInfoFormValidator';
import i18n from '@swa-ui/locale';

import type { FormData } from 'src/shared/form/flow-typed/form.types';

type Props = {
  formId: string,
  formData: FormData,
  onSubmit: () => void,
  LOYALTY_AGE_VERIFICATION?: boolean,
  fieldNameEnabledForChange?: string
};

const GENDER_OPTIONS = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' }
];

const fieldShouldBeDisabled = (currentFieldName: string, fieldNameEnabledForChange) =>
  fieldNameEnabledForChange && fieldNameEnabledForChange !== currentFieldName;

export class EnrollPersonalInfoForm extends React.Component<Props> {
  render() {
    const { formId, onSubmit, fieldNameEnabledForChange } = this.props;

    return (
      <Form formId={formId} className="enroll-personal-info-form" onSubmit={onSubmit}>
        <Segments>
          <Segment ordinality="secondary">
            <Fields>
              <p className="helper-text-top">
                {i18n('ENROLL_HELPER_TEXT_RR_1')}
                <sup>&reg;</sup>
                {i18n('ENROLL_HELPER_TEXT_RR_2')}
              </p>
            </Fields>
            <Fields type="grouped" label="PERSONAL INFO">
              <FormInputField
                name="firstName"
                placeholder="First name"
                disabled={fieldShouldBeDisabled('firstName', fieldNameEnabledForChange)}
                className={cx({ 'disabled-field': fieldShouldBeDisabled('firstName', fieldNameEnabledForChange) })}
              />
              <FormInputField
                name="middleName"
                placeholder="Middle name (optional)"
                disabled={fieldShouldBeDisabled('middleName', fieldNameEnabledForChange)}
                className={cx({ 'disabled-field': fieldShouldBeDisabled('middleName', fieldNameEnabledForChange) })}
              />
              <FormInputField
                name="lastName"
                placeholder="Last name"
                disabled={fieldShouldBeDisabled('lastName', fieldNameEnabledForChange)}
                className={cx({ 'disabled-field': fieldShouldBeDisabled('lastName', fieldNameEnabledForChange) })}
              />
              <FormInputField
                name="preferredName"
                placeholder="Preferred name (optional)"
                disabled={fieldShouldBeDisabled('preferredName', fieldNameEnabledForChange)}
                className={cx({ 'disabled-field': fieldShouldBeDisabled('preferredName', fieldNameEnabledForChange) })}
              />
              <FormSelectField
                className={cx('no-shadow', {
                  'disabled-field': fieldShouldBeDisabled('suffix', fieldNameEnabledForChange)
                })}
                name="suffix"
                options={OptionsHelper.getNameSuffixOptions()}
                disablePlaceholder
                disabled={fieldShouldBeDisabled('suffix', fieldNameEnabledForChange)}
              />
              <p className="helper-text-bottom">{i18n('ENROLL_HELPER_TEXT_NAME')}</p>
            </Fields>
            <Fields type="grouped" label="DATE OF BIRTH">
              <FormDatePickerField
                name="dateOfBirth"
                defaultDate={new Date('1970/01/01')}
                disabled={fieldShouldBeDisabled('dateOfBirth', fieldNameEnabledForChange)}
                className={cx({ 'disabled-field': fieldShouldBeDisabled('dateOfBirth', fieldNameEnabledForChange) })}
              />
            </Fields>
            <Fields type="grouped" label="GENDER">
              <FormRadioInputField
                name="gender"
                options={GENDER_OPTIONS}
                disableDefaultSelection
                disabled={fieldShouldBeDisabled('gender', fieldNameEnabledForChange)}
                className={cx({ 'disabled-field': fieldShouldBeDisabled('gender', fieldNameEnabledForChange) })}
              />
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
  formValidator: EnrollPersonalInfoFormValidator,
  fieldsToValidateOnChange: ['dateOfBirth']
})(EnrollPersonalInfoForm);
