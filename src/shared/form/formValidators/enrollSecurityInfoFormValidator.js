import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import i18n from '@swa-ui/locale';

const isRequired = true;

export default () => (formData) => {
  const fieldRules = {
    userName: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_USERNAME_ALPHA'),
        validator: (value) => validator.isAtLeastOneAlpha(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_USERNAME_LENGTH'),
        validator: (value) => validator.isLengthBetweenOrEqual(4, 20)(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_USERNAME_VALID'),
        validator: (value) => validator.isEnrollUserName(value)
      }
    ],
    password: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PASSWORD_VALID'),
        validator: (value) => validator.isPassword(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PASSWORD_CHARS'),
        validator: (value) => validator.isStartWithAlphanumeric(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PASSWORD_COMPLEXITY'),
        validator: (value) => validator.isNotSimplePassword(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PASSWORD_LENGTH'),
        validator: (value) => validator.isLengthBetweenOrEqual(8, 16)(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PASSWORD_NOT_CONTAIN_USERNAME'),
        validator: (value) => validator.isNotContainValue(value, formData.userName)
      }
    ],
    confirmedPassword: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PASSWORD_CONFIRMATION'),
        validator: (value) => validator.isSameValue(value, formData.password)
      }
    ],
    question1: [
      {
        isRequired
      }
    ],
    question2: [
      {
        isRequired
      }
    ],
    answer1: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_ANSWER_VALID'),
        validator: (value) => validator.isAnswer(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_ANSWER_LENGTH'),
        validator: (value) => validator.isLengthLessThan(20)(value)
      }
    ],
    answer2: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_ANSWER_VALID'),
        validator: (value) => validator.isAnswer(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_ANSWER_LENGTH'),
        validator: (value) => validator.isLengthLessThan(20)(value)
      }
    ],
    promoCode: [
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PROMO_CODE_VALID'),
        validator: (value) => validator.isAlphanumeric(value)
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_PROMO_CODE_LENGTH'),
        validator: (value) => validator.isLengthLessOrEqual(20)(value)
      }
    ],
    acceptRulesAndRegulations: [
      {
        isRequired
      },
      {
        msg: i18n('SHARED__ERROR_MESSAGES__ENROLL_ACCEPT_RULES_AND_REGULATIONS'),
        validator: (value) => validator.isChecked(value)
      }
    ]
  };

  const formRules = {
    ...sharedFormValidators
  };

  return executeValidators(formData, formRules, fieldRules);
};
