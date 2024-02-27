import _ from 'lodash';

import isoCountryCode from 'src/shared/constants/isoCountryCode';
import statesOfUS from 'src/shared/constants/statesOfAmerican';
import { nameSuffixes } from 'src/shared/constants/nameSuffixes';
import dayjs from 'dayjs';

const DATE_FORMAT = 'YYYY-MM-DD';

export const getOptionsByMeta = (metaObj) =>
  _.map(metaObj, (value, key) => ({
    label: value,
    value: key
  }));

export const getOptionsByValueList = (valueList) =>
  _.map(valueList, (value) => ({
    label: value,
    value
  }));

export const keyMirror = (obj) => _.mapValues(obj, (value, key) => key);

export const getCountryOptions = () =>
  _.map(isoCountryCode, (value, key) => ({
    label: `${value} - ${key}`,
    value: key
  }));

export const getStatesOfUS = () => getOptionsByMeta(statesOfUS);

export const getNameSuffixOptions = () => {
  const suffixes = _.map(nameSuffixes, (value) => ({
    label: `${value}`,
    value
  }));

  suffixes.unshift({ label: 'Suffix (optional)', value: '' });

  return suffixes;
};

export const getAssociatedAdultsOptions = (adultInfo, lapChildInfo, formData) => {
  const { firstName, middleName, lastName, suffix, associatedAdult } = formData || {};
  const alreadyAssociatedAdults = lapChildInfo.map(
    (lapChild) => lapChild.passengerInfo && lapChild.passengerInfo['associatedAdult']
  );

  const getOptionalName = (value) => (_.isEmpty(value) ? '' : ` ${value}`);

  const formatPassengerDisplayName = (passenger) => {
    const {
      passengerInfo: { firstName: first, middleName: middle, lastName: last, suffix: suf }
    } = passenger;

    return `${first}${getOptionalName(middle)} ${last}${getOptionalName(suf)}`;
  };

  const checkIsNameDisabled = (adult) => {
    const associatedPassengerReference = `${adult.passengerReference}`;
    const isAssociatedAdultOldEnough =
      dayjs(adult.departureDate, DATE_FORMAT).diff(adult.passengerInfo.dateOfBirth, 'years') < 12;

    if (lapChildInfo) {
      const lapChildObject = {
        passengerInfo: {
          firstName,
          middleName,
          lastName,
          suffix
        }
      };

      const findLapChild = lapChildInfo.find(
        (lapChild) =>
          lapChild?.passengerInfo && formatPassengerDisplayName(lapChild) === formatPassengerDisplayName(lapChildObject)
      );

      if (
        associatedPassengerReference === findLapChild?.passengerInfo?.associatedAdult ||
        associatedPassengerReference === associatedAdult
      ) {
        return false;
      }
    }

    return alreadyAssociatedAdults.includes(`${adult.passengerReference}`) || isAssociatedAdultOldEnough;
  };

  const checkMiddleName = (adult) => {
    const uppercaseMiddleName = adult?.passengerInfo?.middleName?.toUpperCase() ?? '';
    const extraSeatValues = /\b(XS|IXS|DXS)\b/;

    return uppercaseMiddleName?.search(extraSeatValues) <= -1;
  };

  const removeExtraSeatPassengers = _.filter(adultInfo, (adult) => checkMiddleName(adult));

  const associatedAdultName = _.map(removeExtraSeatPassengers, (adult) => ({
    label: formatPassengerDisplayName(adult),
    value: adult.passengerReference,
    disabled: checkIsNameDisabled(adult)
  }));

  if (adultInfo.length > 1) {
    associatedAdultName.unshift({ label: 'Associated Adult', value: '' });
  }

  return associatedAdultName;
};

export default {
  getOptionsByMeta,
  getOptionsByValueList,
  keyMirror,
  getCountryOptions,
  getStatesOfUS,
  getNameSuffixOptions,
  getAssociatedAdultsOptions
};
