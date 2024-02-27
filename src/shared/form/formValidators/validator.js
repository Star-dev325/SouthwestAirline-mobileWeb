import dayjs from 'dayjs';
import _ from 'lodash';
import GenderTypes from 'src/shared/form/constants/genderTypes';
import { doesCreditCardNeedCVV, isCardValid } from 'src/shared/helpers/creditCardHelper';
import OptionsHelper from 'src/shared/helpers/optionsHelper';
import validator from 'validator';

const haveCommonOriginAndDestination = (origin, destination) => {
  const destinationList = destination ? destination.split(',') : [];
  const originList = origin ? origin.split(',') : [];
  const originMap = {};

  for (const airport of originList) {
    originMap[airport] = true;
  }
  for (const airport of destinationList) {
    if (originMap[airport]) {
      return true;
    }
  }

  return false;
};

const DATE_FORMAT = 'YYYY-MM-DD';
const NAME_SUFFIX_VALUES = _.map(OptionsHelper.getNameSuffixOptions(), 'value');
const NATIVE_DATE_FORMAT = 'MM/DD/YYYY';

const validatorExtends = {
  isAddress: (value) => /^[a-zA-Z0-9\-.,#&()\s]+$/.test(value),
  isAlphanumeric: (value) => /^[a-zA-Z0-9]*$/.test(value),
  isAlphanumericOrOnFile: (initialValue) => (value) =>
    validator.isAlphanumeric(value) || (validatorExtends.isOnFile(initialValue) && validatorExtends.isOnFile(value)),
  isAlphanumericWithSpaces: (value) => /^[a-zA-Z0-9]{2,}(\s?[a-zA-Z0-9]+)*$/.test(value),
  isAlreadyTwoYearsOld: (date) => (birthDate) => dayjs(date).diff(dayjs(birthDate, DATE_FORMAT), 'years') >= 2,
  isAnswer: (value) => /^([a-zA-Z0-9]*(\s*)([!@#$%^&*(){}\[\]:;"'<>,.?/~`+-_=|]*))*$/.test(value), // eslint-disable-line no-useless-escape
  isAtLeastOneAlpha: (value) => /[a-zA-Z]+/.test(value),
  isCardExpirationFormat: (value) => dayjs(value, 'MM/YYYY', true).isValid(),
  isChecked: (value) => value === 'true' || value === true,
  isCity: (value) => /^[a-zA-Z\s]+$/.test(value),
  isCreditCard: isCardValid,
  isCreditCardExpirationDateInFuture: (string) => {
    const numbers = string.split('/');
    const value = string.includes('/') ? `${numbers[1]}-${numbers[0]}` : string;

    return dayjs(`${value}-01`, 'YYYY-MM-DD', true).isSameOrAfter(dayjs().startOf('month'));
  },
  isDateInFuture: (value) => dayjs(value, 'YYYY-MM-DD').isSameOrAfter(dayjs().startOf('day')),
  isDateOfBirthFormat: (value) => dayjs(value, 'MM/DD/YYYY', true).isValid(),
  isDriverName: (value) => /^[a-zA-Z\s]+$/.test(value),
  isEnrollUserName: (value) => /^[a-zA-Z0-9!@#$%^&*(){}\[\]:;"'<>,.?/~`+-_=|]*$/.test(value), // eslint-disable-line no-useless-escape
  isFormattedMobilePhone: (value) => /^\d{3}-\d{3}-\d{4}$/.test(value),
  isFullNameLengthValid: (value) => {
    const names = value.split(' ');

    return _.every(names, (name) => name.length >= 1 && name.length <= 30);
  },
  isFullNameNoHyphens: (value) => /^[a-zA-Z]+\s[a-zA-Z\s]+$/.test(value),
  isFullNameOrFirstNameNoHyphens: (value) => /^[a-zA-Z\s]+$/.test(value) || /^[a-zA-Z]+\s[a-zA-Z\s]+$/.test(value),
  isIrn: (value) => /^[A-Za-z0-9]{0,30}$/.test(value),
  isIsoDateFormat: (value) => dayjs(value, 'YYYY-MM-DD', true).isValid(),
  isLastNameValid: (value) => /.*[a-zA-Z]{2,}$/.test(value),
  isLengthBetweenOrEqual:
    (min, max, isOnFile = false) =>
      (str) =>
        (isOnFile && validatorExtends.isOnFile(str)) || (str.length >= min && str.length <= max),
  isLengthEql: (number) => (str) => str.length === number,
  isLengthLessOrEqual:
    (number, isOnFile = false) =>
      (str) =>
        (isOnFile && validatorExtends.isOnFile(str)) || str.length <= number,
  isLengthLessThan: (number) => (str) => str.length < number,
  isLessThanFourteenDaysOld: (birthDate, departureDate) =>
    dayjs(departureDate, DATE_FORMAT).diff(dayjs(birthDate, DATE_FORMAT), 'days') < 14,
  isMoreThanHundredYearsAgo: (date) => dayjs().diff(dayjs(date, 'MM/DD/YYYY', true), 'years', true) <= 100,
  isName: (value) => /^[a-zA-Z\s]+$/.test(value),
  isNotContainValue: (expectValue, value) => !expectValue || value.indexOf(expectValue) === -1,
  isNotDateInFuture: (value) => !dayjs(value, 'MM/DD/YYYY', true).isSameOrAfter(dayjs().startOf('day')),
  isNotSimplePassword: (value) => {
    const hasNumber = /[0-9]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasSpecial = /[!@#$%^*()_+\\]/.test(value);
    const noSpaces = /[^\s]/.test(value);

    return noSpaces && ((hasNumber && hasUppercase) || (hasNumber && hasSpecial) || (hasSpecial && hasUppercase));
  },
  isNumericOrOnFile: (initialValue) => (value) =>
    validator.isNumeric(value) || (validatorExtends.isOnFile(initialValue) && validatorExtends.isOnFile(value)),
  isOnFile: (value) => value === 'On File',
  isPassengerNameSuffix: (value) => !_.isEmpty(value) && _.indexOf(NAME_SUFFIX_VALUES, value) >= 0,
  isPassword: (value) => /^[a-zA-Z0-9!@#$%^*();:./\\]*$/.test(value),
  isPostalCode: (value) => /^[a-zA-Z0-9\s\-,()]+$/.test(value),
  isRecordLocator: (value) => !!value.match(/^[\d\w]{6}$/),
  isRelationship: (value) => /^[a-zA-Z\s]+$/.test(value),
  isRequired: (value) => !_.isEmpty(value) || _.isBoolean(value),
  isSameValue: (expectValue, value) => expectValue === value,
  isStartWithAlphanumeric: (value) => /^\w+/.test(value),
  isStateProvinceRegion: (value) => /^[a-zA-Z\s\-.]+$/.test(value),
  isUserName: (value) => /^([a-zA-Z]+)[0-9\S]+$/.test(value),
  isValidAssociatedAdult: (value, associatedAdultsInfo) => {
    const associatedAdult =
      (value &&
        associatedAdultsInfo.find(
          (adult) => value === `${adult.passengerInfo.firstName} ${adult.passengerInfo.lastName}`
        )) ||
      associatedAdultsInfo[0];

    const associatedAdultDateOfBirth = dayjs(associatedAdult.passengerInfo.dateOfBirth, [
      DATE_FORMAT,
      NATIVE_DATE_FORMAT
    ]);

    return dayjs(associatedAdult.departureDate, DATE_FORMAT).diff(associatedAdultDateOfBirth, 'years') >= 12;
  },
  isValidDepartureAndArrival: (formDataParams) =>
    !haveCommonOriginAndDestination(formDataParams.origin, formDataParams.destination),
  isValidFullGender: (value) => value === GenderTypes.FEMALE_FULL || value === GenderTypes.MALE_FULL,
  isValidGender: (value) => value === GenderTypes.FEMALE || value === GenderTypes.MALE,
  isValidLapChildDate: (birthDate, departureDate, returnDate) =>
    dayjs(departureDate, DATE_FORMAT).diff(dayjs(birthDate, [DATE_FORMAT, NATIVE_DATE_FORMAT]), 'days') >= 14 &&
    dayjs(returnDate || departureDate, DATE_FORMAT).diff(dayjs(birthDate, [DATE_FORMAT, NATIVE_DATE_FORMAT]), 'years') < 2,
  isValidNumericPhoneNumber: (value) => /^[1-9][0-9]{2}-\d{3}-\d{4}$/.test(value),
  isValidSecurityCode: (cardNumber, value) =>
    !doesCreditCardNeedCVV(cardNumber) || validatorExtends.isLengthBetweenOrEqual(3, 4)(value)
};

export default _.merge({}, validator, validatorExtends);
