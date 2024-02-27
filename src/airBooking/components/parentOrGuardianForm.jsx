// @flow
import i18n from '@swa-ui/locale';
import React from 'react';
import Button from 'src/shared/components/button';
import Fields from 'src/shared/components/fields';
import PageHeaderWithButtons from 'src/shared/components/pageHeaderWithButtons';
import Form from 'src/shared/form/components/form';
import withForm from 'src/shared/form/enhancers/withForm';
import ContactInfoFields from 'src/shared/form/fields/contactInfoFields';
import FormInputField from 'src/shared/form/fields/formInputField';
import parentOrGuardianFormValidator from 'src/shared/form/formValidators/parentOrGuardianFormValidator';

type Props = {
  disclaimerText: string,
  formId: string,
  infoText: string,
  isEditMode: boolean,
  linkText: string,
  onClickYoungTravelerParentConsent: () => void,
  onSubmit: () => void
};
const ParentOrGuardianForm = ({
  disclaimerText,
  formId,
  infoText,
  isEditMode,
  linkText,
  onClickYoungTravelerParentConsent,
  onSubmit
}: Props) => (
  <Form formId={formId} onSubmit={onSubmit}>
    {isEditMode && (
      <PageHeaderWithButtons
        rightButtons={[{ name: i18n('SHARED__BUTTON_TEXT__DONE'), type: 'submit' }]}
        title={i18n('AIR_BOOKING__YOUNG_TRAVELER_EDIT__PAGE_TITLE')}
      />
    )}
    <div className="parent-or-guardian-form--container">
      {infoText && <p className="parent-or-guardian-form--info-text">{infoText}</p>}
      <Fields
        className="pt5"
        label={i18n('AIR_BOOKING__PARENT_OR_GUARDIAN_FORM__PARENT_OR_GUARDIAN_LABEL')}
        type="grouped"
      >
        <FormInputField maxLength={30} name="firstName" placeholder={i18n('SHARED__PLACEHOLDER__FIRST_NAME')} />
        <FormInputField maxLength={30} name="lastName" placeholder={i18n('SHARED__PLACEHOLDER__LAST_NAME')} />
        <FormInputField maxLength={20} name="relationship" placeholder={i18n('SHARED__PLACEHOLDER__RELATIONSHIP')} />
      </Fields>
      <ContactInfoFields
        label={i18n('AIR_BOOKING__PARENT_OR_GUARDIAN_FORM__CONTACT_INFORMATION_LABEL')}
        names={[
          'addressLine1',
          'addressLine2',
          'city',
          'isoCountryCode',
          'phoneCountryCode',
          'phoneNumber',
          'stateProvinceRegion',
          'zipOrPostalCode'
        ]}
        supportModifyCountryCode
      />
      {disclaimerText && linkText && (
        <div className="parent-or-guardian-form--disclaimer-text">
          <span dangerouslySetInnerHTML={{ __html: disclaimerText }} />{' '}
          <a className="pblue" href="#" onClick={onClickYoungTravelerParentConsent}>{linkText}</a>
        </div>
      )}
    </div>
    {!isEditMode && (
      <div className="parent-or-guardian-form--continue-button">
        <Button color="yellow" fluid size="larger" type="submit">
          {i18n('AIR_BOOKING__PARENT_OR_GUARDIAN_FORM__CONTINUE')}
        </Button>
      </div>
    )}
  </Form>
);

export default withForm({
  defaultValues: () => ({
    isoCountryCode: 'US',
    phoneCountryCode: 'US'
  }),
  formValidator: parentOrGuardianFormValidator
})(ParentOrGuardianForm);
