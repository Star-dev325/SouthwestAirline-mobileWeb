// @flow
import React from 'react';
import Fields from 'src/shared/components/fields';
import FormInputField from 'src/shared/form/fields/formInputField';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import FormRadioInputField from 'src/shared/form/fields/formRadioInputField';
import FormSelectField from 'src/shared/form/fields/formSelectField';
import withFields from 'src/shared/form/enhancers/withFields';
import genderOptions from 'src/shared/form/constants/genderOptionsForChapi';
import OptionsHelper from 'src/shared/helpers/optionsHelper';
import i18n from '@swa-ui/locale';
import dayjs from 'dayjs';
import { MEDIUM_DATE_FORMAT } from 'src/shared/constants/dateConstants';

type Props = {
  isWebView?: boolean,
  id?: string,
  departureDate: string,
  isLapChild?: boolean
};

const PersonalInfoFields = (props: Props) => {
  const { isWebView, id = '', departureDate, isLapChild } = props;
  const minLapChildFormYear = dayjs(departureDate).subtract(2, 'year').format(MEDIUM_DATE_FORMAT);

  return (
    <div>
      <Fields type="grouped" label={i18n('AIR_BOOKING__PASSENGERS__ADULT_PERSONAL_INFO')}>
        <FormInputField id={`${id}_firstName`} name="firstName" placeholder={i18n('SHARED__PLACEHOLDER__FIRST_NAME')} />
        <FormInputField
          id={`${id}_middleName`}
          name="middleName"
          placeholder={i18n('SHARED__PLACEHOLDER__MIDDLE_NAME_OPTIONAL')}
        />
        <FormInputField id={`${id}_lastName`} name="lastName" placeholder={i18n('SHARED__PLACEHOLDER__LAST_NAME')} />
        <FormSelectField
          className="no-shadow"
          name="suffix"
          options={OptionsHelper.getNameSuffixOptions()}
          disablePlaceholder
        />
      </Fields>
      <p className="helper-text">{i18n('AIR_BOOKING__PASSENGERS__NAME_HELP_INFO')}</p>
      <Fields type="grouped" label={i18n('AIR_BOOKING__PASSENGERS__DATE_OF_BIRTH')}>
        {isWebView ? (
          <FormInputField
            id={`${id}_dateOfBirth`}
            name="dateOfBirth"
            placeholder={i18n('SHARED__PLACEHOLDER__DATE_OF_BIRTH')}
            type="tel"
            maxLength={10}
            pattern="[0-9]*"
            mask={'99/99/9999'}
            maskChar={null}
          />
        ) : (
          <FormDatePickerField name="dateOfBirth" minLapChildFormYear={minLapChildFormYear} isLapChild={isLapChild} />
        )}
      </Fields>
      <Fields type="grouped" label={i18n('AIR_BOOKING__PASSENGERS__GENDER')}>
        <FormRadioInputField
          name="gender"
          options={OptionsHelper.getOptionsByMeta(genderOptions)}
          disableDefaultSelection
          backgroundColorSelection
        />
      </Fields>
    </div>
  );
};

export default withFields(PersonalInfoFields);
