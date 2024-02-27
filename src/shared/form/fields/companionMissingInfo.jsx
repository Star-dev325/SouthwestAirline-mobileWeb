// @flow
import React from 'react';
import FormDatePickerField from 'src/shared/form/fields/formDatePickerField';
import FormRadioInputField from 'src/shared/form/fields/formRadioInputField';
import Fields from 'src/shared/components/fields';
import OptionsHelper from 'src/shared/helpers/optionsHelper';
import genderOptions from 'src/shared/form/constants/genderOptionsForChapi';
import withFields from 'src/shared/form/enhancers/withFields';
import GenderTypes from 'src/shared/form/constants/genderTypes';
import i18n from '@swa-ui/locale';

import type { CompanionBasicInfo } from 'src/companion/flow-typed/companion.types';

type CompanionInfoProps = {
  companionInfo: CompanionBasicInfo
};

const CompanionMissingInfo = (props: CompanionInfoProps) => {
  const { dateOfBirth, birthDate, gender } = props.companionInfo;
  const companionBirthDate = birthDate || dateOfBirth;

  return (
    <div>
      {!companionBirthDate && (
        <Fields type="grouped" label={i18n('AIR_BOOKING__PASSENGERS__DATE_OF_BIRTH')}>
          <FormDatePickerField name="dateOfBirth" data-qa="companion-personal-info--birth-date-input" />
        </Fields>
      )}
      {(!gender || gender === GenderTypes.UNAVAILABLE) && (
        <Fields type="grouped" label={i18n('AIR_BOOKING__PASSENGERS__GENDER')}>
          <FormRadioInputField
            className="companion-personal-info--gender"
            data-qa="companion-personal-info--gender-input"
            name="gender"
            options={OptionsHelper.getOptionsByMeta(genderOptions)}
            disableDefaultSelection
          />
        </Fields>
      )}
    </div>
  );
};

export default withFields(CompanionMissingInfo);
