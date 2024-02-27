// @flow
import React from 'react';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import i18n from '@swa-ui/locale';
import withFields from 'src/shared/form/enhancers/withFields';

export type TravelInformationFormProps = {
  id?: string,
  onFocusAndBlur: (fieldName: string, isFocus?: boolean) => void
}
const RedressAndKnownTravelerFields = ({ id = '', onFocusAndBlur }: TravelInformationFormProps) => (
  <div>
    <Fields type="grouped" label={i18n('SHARED__REDRESS_UNKNOWN_TRAVELER_FIELDS__SECURE_TRAVELER_INFO')}>
      <FormInputField
        id={`${id}_knownTravelerNumber`}
        name="knownTravelerNumber"
        placeholder={i18n('SHARED__REDRESS_UNKNOWN_TRAVELER_FIELDS__KNOWN_TRAVELER_NUMBER')}
        maxLength={25}
        onFocus={() => onFocusAndBlur('knownTravelerNumber', true)}
        onBlur={() => onFocusAndBlur('knownTravelerNumber')}
      />
      <FormInputField
        id={`${id}_redressNumber`}
        name="redressNumber"
        maxLength={13}
        placeholder={i18n('SHARED__REDRESS_UNKNOWN_TRAVELER_FIELDS__REDRESS_NUMBER')}
        onFocus={() => onFocusAndBlur('redressNumber', true)}
        onBlur={() => onFocusAndBlur('redressNumber')}
        type="tel"
      />
    </Fields>
  </div>
);

export default withFields(RedressAndKnownTravelerFields);
