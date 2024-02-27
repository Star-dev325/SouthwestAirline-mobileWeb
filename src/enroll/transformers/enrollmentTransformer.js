import _ from 'lodash';
import { removeSeparator } from 'src/shared/helpers/separatorHelper';
import countryCodes from 'src/shared/constants/countryCode';

const DEFAULT_ADDRESS_PHONE_TYPE = 'HOME';
const DEFAULT_ISO_COUNTRY_CODE = 'US';
const DEFAULT_PHONE_COUNTRY_CODE = '1';

const getPhoneCountryCodeFromCountryCode = (countryCode) =>
  _.get(countryCodes, `${countryCode}`, DEFAULT_PHONE_COUNTRY_CODE).toString();

export const transformToEnrollRequest = (data) => {
  const {
    personalInfoData,
    contactInfoData: { optInForEmailSubscriptions = true, ...restContactInfoData } = {},
    securityInfoData
  } = data;

  return {
    userName: _.trim(securityInfoData.userName),
    password: securityInfoData.password,
    promoCode: _.isEmpty(securityInfoData.promoCode) ? '' : securityInfoData.promoCode,
    contactInfo: {
      address: _.merge(
        {},
        _.pick(restContactInfoData, ['addressLine1', 'addressLine2', 'city', 'stateProvinceRegion', 'zipOrPostalCode']),
        {
          isoCountryCode: _.isEmpty(restContactInfoData.isoCountryCode)
            ? DEFAULT_ISO_COUNTRY_CODE
            : restContactInfoData.isoCountryCode,
          addressType: DEFAULT_ADDRESS_PHONE_TYPE
        }
      ),
      phone: {
        countryCode: getPhoneCountryCodeFromCountryCode(restContactInfoData.phoneCountryCode),
        number: removeSeparator(restContactInfoData.phoneNumber),
        phoneType: DEFAULT_ADDRESS_PHONE_TYPE
      },
      emailAddress: restContactInfoData.email
    },
    customerInfo: {
      name: {
        firstName: _.trim(personalInfoData.firstName),
        lastName: _.trim(personalInfoData.lastName),
        middleName: _.trim(personalInfoData.middleName),
        preferredName: _.trim(personalInfoData.preferredName),
        // missing field will broken api
        suffix: _.isEmpty(personalInfoData.suffix) ? undefined : personalInfoData.suffix
      },
      gender: personalInfoData.gender,
      birthDate: personalInfoData.dateOfBirth
    },
    optInForEmailSubscriptions,
    securityQuestions: [
      {
        question: securityInfoData.question1,
        answer: securityInfoData.answer1
      },
      {
        question: securityInfoData.question2,
        answer: securityInfoData.answer2
      }
    ]
  };
};
