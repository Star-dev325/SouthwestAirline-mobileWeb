import _ from 'lodash';
import validator from 'src/shared/form/formValidators/validator';
import { executeValidators } from 'src/shared/form/helpers/validatorHelpers';
import * as sharedFormValidators from 'src/shared/form/formValidators/sharedFormValidatorRules';
import { doesCreditCardNeedCVV } from 'src/shared/helpers/creditCardHelper';
import { getPhoneNumberRule, securityCodeRule } from 'src/shared/form/formValidators/sharedFieldValidatorRules';
import countryCodes from 'src/shared/constants/countryCode';
import i18n from '@swa-ui/locale';
import { baseFieldRules, basePostal } from 'src/shared/form/constants/baseFormFieldRules';

const isRequired = true;

const removeMultipleSpacesFromNameOnCard = (formData) => {
  let nameOnCard = _.get(formData, 'nameOnCard');

  if (nameOnCard) {
    nameOnCard = _.chain(nameOnCard).split(' ').compact().value().join().replace(',', ' ');
    _.set(formData, 'nameOnCard', nameOnCard);
  }
};

export default ({ isWebView }) =>
  (formData) => {
    const isCountryCodeNumberEqualOne = countryCodes[formData.phoneCountryCode] === 1;
    const isUS = formData.isoCountryCode === 'US';

    removeMultipleSpacesFromNameOnCard(formData);

    const webViewExpirationDateValidators = isWebView
      ? [
        {
          msg: i18n('SHARED__ERROR_MESSAGES__CREDIT_CARD_EXPIRATION_DATE_FORMAT'),
          validator: validator.isCardExpirationFormat
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__CREDIT_CARD_EXPIRATION_DATE_FORMAT'),
          validator: validator.isLengthEql(7)
        }
      ]
      : [];

    const fieldRules = {
      ...baseFieldRules,
      stateProvinceRegion: _.concat(
        [
          {
            isRequired
          }
        ],
        isUS ? basePostal.stateProvince : []
      ),
      zipOrPostalCode: _.concat(
        [
          {
            isRequired
          }
        ],
        isUS ? basePostal.isUSPostal : basePostal.postalCode
      ),
      cardNumber: [
        {
          isRequired
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__CREDIT_CARD_VALID'),
          validator: validator.isCreditCard
        }
      ],
      nameOnCard: [
        {
          isRequired
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__FULL_NAME_VALID'),
          validator: validator.isFullNameNoHyphens
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__FULL_NAME_LENGTH_VALID'),
          validator: validator.isFullNameLengthValid
        },
        {
          msg: i18n('SHARED__ERROR_MESSAGES__LAST_NAME_VALID'),
          validator: validator.isLastNameValid
        }
      ],
      expiration: [
        {
          isRequired
        },
        ...webViewExpirationDateValidators,
        {
          msg: i18n('SHARED__ERROR_MESSAGES__CREDIT_CARD_EXPIRATION_DATE_IN_THE_PAST'),
          validator: validator.isCreditCardExpirationDateInFuture
        }
      ],
      selectedCardId: [
        {
          isRequired
        }
      ],
      securityCode: [..._.concat(doesCreditCardNeedCVV(formData.cardNumber) ? { isRequired } : []), securityCodeRule],
      chasePhoneNumber: getPhoneNumberRule(),
      phoneNumber: getPhoneNumberRule(isCountryCodeNumberEqualOne)
    };
    const formRules = {
      ...sharedFormValidators
    };

    return executeValidators(formData, formRules, fieldRules);
  };
