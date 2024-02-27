import _ from 'lodash';
import { formatAccountNumber } from 'src/shared/helpers/accountNumberFormatter';
import countryCodeMeta from 'src/shared/constants/countryCode';

export const transformToDriverInfo = (apiResponse) => {
  const { customerInfo } = apiResponse;
  const formattedAccountNumber = formatAccountNumber(_.get(customerInfo, 'accountNumber'));

  return {
    firstName: _.capitalize(_.get(customerInfo, 'name.firstName')),
    lastName: _.capitalize(_.get(customerInfo, 'name.lastName')),
    middleName: _.capitalize(_.get(customerInfo, 'name.middleName')),
    accountNumber: formattedAccountNumber,
    gender: _.get(customerInfo, 'gender'),
    birthDate: _.get(customerInfo, 'birthDate')
  };
};

export const transformToContactInfo = (apiResponse) => {
  const { contactInfo } = apiResponse;
  const isoCountryCode = _.get(contactInfo, 'address.isoCountryCode', 'US');
  const phoneNumber = _.get(contactInfo, 'phone.number');
  const driverPhoneNumber = _.get(apiResponse, 'contactInfo.phone.number');
  const driverIsoCountryCode = _getIsoCountryCode(apiResponse);

  return {
    confirmationEmail: _.get(contactInfo, 'emailAddress'),
    purposeOfTravel: _.get(contactInfo, 'purposeOfTravel'),
    phoneNumber: _formatPhoneNumber(phoneNumber, isoCountryCode),
    receiptEmail: _.get(contactInfo, 'emailAddress'),
    isoCountryCode,
    addressLine1: _.get(contactInfo, 'address.addressLine1'),
    addressLine2: _.get(contactInfo, 'address.addressLine2'),
    stateProvinceRegion: _.get(contactInfo, 'address.stateProvinceRegion'),
    zipOrPostalCode: _.get(contactInfo, 'address.zipOrPostalCode'),
    city: _.get(contactInfo, 'address.city'),
    driverIsoCountryCode,
    driverCountryCode: _getCountryCode(apiResponse),
    driverPhoneNumber: _formatPhoneNumber(driverPhoneNumber, driverIsoCountryCode)
  };
};

const _getCountryCode = (apiResponse) => {
  const countryCode = _.get(apiResponse, 'contactInfo.phone.countryCode');

  return _.isEmpty(countryCode) ? '1' : countryCode;
};

const _getIsoCountryCode = (apiResponse) => {
  const invertedCountryCode = _.invert(countryCodeMeta);
  const countryCodeString = _getCountryCode(apiResponse);

  const countryCodeInteger = parseInt(countryCodeString);

  return countryCodeInteger === 1 ? 'US' : invertedCountryCode[countryCodeInteger];
};

const _formatPhoneNumber = (phoneNumber, isoCountryCode) => {
  if (!_.isEmpty(phoneNumber) && _isUS(isoCountryCode)) {
    return `${phoneNumber.substr(0, 3)}-${phoneNumber.substr(3, 3)}-${phoneNumber.substr(6, 4)}`;
  } else {
    return phoneNumber;
  }
};

const _isUS = (isoCountryCode) => isoCountryCode === 'US';
