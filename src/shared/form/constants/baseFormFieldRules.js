import validator from 'src/shared/form/formValidators/validator';
import i18n from '@swa-ui/locale';

const isRequired = true;

export const baseFieldRules = {
  addressLine1: [
    {
      isRequired
    },
    {
      msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_1'),
      validator: validator.isAddress
    },
    {
      msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_1_LENGTH'),
      validator: validator.isLengthLessOrEqual(40)
    }
  ],
  addressLine2: [
    {
      msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_2'),
      validator: validator.isAddress
    },
    {
      msg: i18n('SHARED__ERROR_MESSAGES__ADDRESS_LINE_2_LENGTH'),
      validator: validator.isLengthLessOrEqual(40)
    }
  ],
  city: [
    {
      isRequired
    },
    {
      msg: i18n('SHARED__ERROR_MESSAGES__CITY'),
      validator: validator.isCity
    }
  ]
};

export const basePostal = {
  stateProvince: [
    {
      msg: i18n('SHARED__ERROR_MESSAGES__STATE_PROVINCE_REGION'),
      validator: validator.isStateProvinceRegion
    },
    {
      msg: i18n('SHARED__ERROR_MESSAGES__STATE_PROVINCE_REGION_LENGTH'),
      validator: validator.isLengthLessThan(50)
    }
  ],
  isUSPostal: [
    {
      msg: i18n('SHARED__ERROR_MESSAGES__ZIP_FOR_US'),
      validator: (value) => validator.isNumeric(value) && validator.isLengthEql(5)(value)
    }
  ],
  postalCode: [
    {
      msg: i18n('SHARED__ERROR_MESSAGES__POSTAL_CODE'),
      validator: validator.isPostalCode
    },
    {
      msg: i18n('SHARED__ERROR_MESSAGES__POSTAL_CODE_LENGTH'),
      validator: validator.isLengthLessOrEqual(10)
    }
  ]
};
