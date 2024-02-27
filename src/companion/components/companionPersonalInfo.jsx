// @flow

import React from 'react';
import FormattedName from 'src/shared/components/formattedName';
import LabelContainer from 'src/shared/components/labelContainer';
import { formatDate } from 'src/shared/helpers/dateHelper';
import i18n from '@swa-ui/locale';
import type { CompanionBasicInfo } from 'src/companion/flow-typed/companion.types';
import GenderTypes from 'src/shared/form/constants/genderTypes';

export type CompanionInfoProps = {
  companionInfo: CompanionBasicInfo
};

const CompanionPersonalInfo = (props: CompanionInfoProps) => {
  const { name, birthDate, dateOfBirth, gender, suffix } = props.companionInfo;
  const companionBirthDate = birthDate || dateOfBirth;

  return (
    <div>
      <p className="large pb4 gray5 bold">{i18n('COMPANION_PERSONAL_INFO')}</p>
      <div className="companion-personal-info">
        <div className="companion-personal-info--label">
          <FormattedName name={name} suffix={suffix} className="companion-personal-info--name" />
        </div>
        {companionBirthDate && (
          <div className="companion-personal-info--label" data-qa="companion-personal-info--birth-date">
            <LabelContainer labelText={i18n('COMPANION_DATE_OF_BIRTH')} className="pt4">
              <p>{formatDate(companionBirthDate, 'M/DD/YYYY')}</p>
            </LabelContainer>
          </div>
        )}
        {gender && gender !== GenderTypes.UNAVAILABLE && (
          <div className="companion-personal-info--label" data-qa="companion-personal-info--gender">
            <LabelContainer labelText={i18n('COMPANION_GENDER')} className="pt4">
              <p>{gender}</p>
            </LabelContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanionPersonalInfo;
