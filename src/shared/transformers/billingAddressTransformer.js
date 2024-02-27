// @flow
import { getIsoCountryCodeForPhone } from 'src/shared/helpers/countryCodeHelper';
import { removeSeparator } from 'src/shared/helpers/separatorHelper';
import { addHyphensToPhoneNumber } from 'src/shared/helpers/phoneNumberHelper';

import type { FormData } from 'src/shared/form/flow-typed/form.types';
import type {
  AccountContactInfoType,
  BillingAddressFormType,
  TravelFundsAddressType
} from 'src/shared/flow-typed/shared.types';

const US_PHONE_COUNTRY_CODE = 1;

const getPhoneNumber = (phoneCountryCode: string, number: string): string  => (
  parseInt(phoneCountryCode) === US_PHONE_COUNTRY_CODE ?
    number && addHyphensToPhoneNumber(number) :
    number
);

export const transformContactInfoToBillingAddressFormData = (
  contactInfo: ?AccountContactInfoType
): BillingAddressFormType => {
  const {
    address: {
      addressLine1 = '',
      addressLine2 = '',
      city = '',
      isoCountryCode = 'US',
      stateProvinceRegion = '',
      zipOrPostalCode = ''
    } = {},
    phone = {}
  } = contactInfo ?? {};
  const phoneCountryCode = phone?.countryCode ?? '1';
  const number = phone?.number ?? '';

  return {
    addressLine1,
    addressLine2,
    city,
    isoCountryCode,
    phoneCountryCode: getIsoCountryCodeForPhone(phoneCountryCode),
    phoneNumber: getPhoneNumber(phoneCountryCode, number),
    stateProvinceRegion,
    zipOrPostalCode
  };
};

export const transformToTravelFundsAddress = (formData: FormData): TravelFundsAddressType => ({
  phoneNumber: removeSeparator(formData.phoneNumber),
  address: {
    addressLine1: formData.addressLine1,
    addressLine2: formData.addressLine2 ? formData.addressLine2 : null,
    city: formData.city,
    stateProvinceRegion: formData.stateProvinceRegion,
    zipOrPostalCode: formData.zipOrPostalCode,
    isoCountryCode: formData.isoCountryCode
  }
});
