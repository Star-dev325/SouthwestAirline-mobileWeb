// @flow
import _ from 'lodash';
import countryCodes from 'src/shared/constants/countryCode';
import { addUSPhoneNumberSeparator, removeSeparator } from 'src/shared/helpers/separatorHelper';
import {
  transformNonAncillaryToFormData,
  transformToNonChargeableAncillaryProducts
} from 'src/shared/transformers/nonChargeableAncillaryProductsTransformer';
import { DEFAULT_FIELD_VALUES } from 'src/shared/constants/specialAssistanceConstants';

import type {
  EditPNRPassengerPageType,
  TravelInformationFormData
} from 'src/viewReservation/flow-typed/viewReservation.types';
import type { SpecialAssistanceType } from 'src/shared/flow-typed/shared.types';

export const transformToTravelInformationFormInitialFormData = (
  editPNRPassengerPage: EditPNRPassengerPageType
): TravelInformationFormData => {
  const {
    accountNumber,
    redressNumber,
    knownTravelerId,
    passportInformation,
    emergencyContact,
    nonChargeableAncillaryProducts,
    disableSpecialAssistance,
    passengerDetails
  } = editPNRPassengerPage;
  const { dateOfBirth, gender } = passengerDetails;
  const { firstName, lastName, middleName, suffix } = passengerDetails.name;

  const {
    lastFourPassportNumber: passportNumber,
    passportIssuedBy,
    passportExpirationDate,
    nationality,
    countryOfResidence
  } = passportInformation ? passportInformation : {};

  const { name: emergencyContactName, contactPhone = {} } = emergencyContact ? emergencyContact : {};

  const { countryCode: emergencyContactCountryCode = 'US', number } = contactPhone;
  const codeNumberNeedAddSeparator = 1;
  const shouldAddPhoneNumberSeparator = countryCodes[emergencyContactCountryCode] === codeNumberNeedAddSeparator;
  const emergencyContactPhoneNumber =
    !_.isEmpty(number) && shouldAddPhoneNumberSeparator ? addUSPhoneNumberSeparator(number) : number;
  const specialAssistance = transformNonAncillaryToFormData(nonChargeableAncillaryProducts);

  return {
    rapidRewardsNumber: accountNumber,
    knownTravelerNumber: knownTravelerId,
    redressNumber,
    passportNumber,
    emergencyContactName,
    emergencyContactCountryCode,
    emergencyContactPhoneNumber,
    passportExpirationDate,
    passportIssuedBy,
    nationality,
    countryOfResidence,
    gender,
    firstName,
    lastName,
    middleName,
    suffix,
    dateOfBirth,
    specialAssistance,
    disableSpecialAssistance
  };
};

export const transformToSaveTravelInformationLink = (
  isInternational: boolean,
  initialFormData: TravelInformationFormData,
  currentFormData: TravelInformationFormData,
  link: Link,
  isPassportNumberEdited: boolean
): { updateTravelInformationLink: ?Link, isNameChanged: boolean } => {
  const passportInformation = _getChangedPassportInfo(initialFormData, currentFormData, isPassportNumberEdited);
  const emergencyContact = _getChangedEmergencyContact(initialFormData, currentFormData);
  const nonChargeableAncillaryProducts = _getChangedSpecialAssistance(
    initialFormData.specialAssistance,
    currentFormData.specialAssistance
  );
  const accountNumber = _getIsChanged(initialFormData.rapidRewardsNumber, currentFormData.rapidRewardsNumber);
  const redressNumber = _getIsChanged(initialFormData.redressNumber, currentFormData.redressNumber);
  const knownTravelerId = _getIsChanged(initialFormData.knownTravelerNumber, currentFormData.knownTravelerNumber);

  /**
   * if there is no name change (not middle first OR last name, then we are not sending a passenger name object)
   */
  const firstName = _getIsChanged(initialFormData.firstName, currentFormData.firstName);
  const lastName = _getIsChanged(initialFormData.lastName, currentFormData.lastName);
  const middleNameChange = _getIsChanged(initialFormData.middleName, currentFormData.middleName);
  const middleName = !_.isNil(middleNameChange) ? middleNameChange : initialFormData.middleName;

  const nameIsChanged = firstName || lastName || !_.isNil(middleNameChange);
  const isChanged =
    passportInformation ||
    emergencyContact ||
    accountNumber ||
    redressNumber ||
    knownTravelerId ||
    nonChargeableAncillaryProducts ||
    nameIsChanged;
  let travelInfoBody = isInternational
    ? {
      passportInformation,
      emergencyContact,
      accountNumber,
      redressNumber,
      knownTravelerId,
      nonChargeableAncillaryProducts,
      firstName: initialFormData.firstName,
      lastName: initialFormData.lastName
    }
    : {
      emergencyContact,
      accountNumber,
      redressNumber,
      knownTravelerId,
      nonChargeableAncillaryProducts,
      firstName: initialFormData.firstName,
      lastName: initialFormData.lastName
    };

  const passengerName = {};

  firstName && _.set(passengerName, 'firstName', firstName);
  !_.isNil(middleNameChange) && _.set(passengerName, 'middleName', middleName);
  lastName && _.set(passengerName, 'lastName', lastName);

  travelInfoBody = nameIsChanged
    ? {
      ...travelInfoBody,
      passengerName
    }
    : { ...travelInfoBody };

  const updateTravelInformationLink = !isChanged
    ? null
    : {
      href: link.href,
      method: link.method,
      body: _.merge({}, link.body, travelInfoBody)
    };

  return { updateTravelInformationLink, isNameChanged: !!nameIsChanged };
};

const _getIsChanged = (initialValue: ?string, currentValue: ?string) => {
  const initialNullAndCurrentEmptyString = initialValue === null && currentValue === '';

  return initialNullAndCurrentEmptyString || _.isEqual(initialValue, currentValue) ? null : currentValue;
};

const _getChangedSpecialAssistance = (
  initialSpecialAssistance: ?SpecialAssistanceType,
  currentSpecialAssistance: ?SpecialAssistanceType
) => {
  if (currentSpecialAssistance && !_.isEqual(initialSpecialAssistance, currentSpecialAssistance)) {
    if (_.isEqual(DEFAULT_FIELD_VALUES, currentSpecialAssistance)) {
      return [];
    } else {
      return transformToNonChargeableAncillaryProducts(currentSpecialAssistance);
    }
  } else {
    return null;
  }
};

const _getChangedPassportInfo = (
  initialFormData: TravelInformationFormData,
  currentFormData: TravelInformationFormData,
  isPassportNumberEdited: boolean
) => {
  const passportInfoFields = ['countryOfResidence', 'nationality', 'passportExpirationDate', 'passportIssuedBy'];

  const initialPassportInfo = _.chain(initialFormData).pick(passportInfoFields).omitBy(_.isNil).value();
  const currentPassportInfo = _.chain(currentFormData).pick(passportInfoFields).omitBy(_.isEmpty).value();

  if (isPassportNumberEdited || !_.isEqual(initialPassportInfo, currentPassportInfo)) {
    _.set(currentPassportInfo, 'passportNumber', currentFormData.passportNumber);

    return currentPassportInfo;
  }

  return null;
};

const _getChangedEmergencyContact = (
  initialFormData: TravelInformationFormData,
  currentFormData: TravelInformationFormData
) => {
  const emergencyContactFields = ['emergencyContactName', 'emergencyContactCountryCode', 'emergencyContactPhoneNumber'];

  const initialEmergencyContactInfo = _.chain(initialFormData)
    .pick(emergencyContactFields)
    .omitBy(_.isUndefined)
    .value();
  const currentEmergencyContactInfo = _.pick(currentFormData, emergencyContactFields);

  if (
    !_.isEmpty(currentEmergencyContactInfo.emergencyContactName) &&
    !_.isEmpty(currentEmergencyContactInfo.emergencyContactPhoneNumber) &&
    !_.isEqual(initialEmergencyContactInfo, currentEmergencyContactInfo)
  ) {
    return {
      contactPhone: {
        countryCode: currentFormData.emergencyContactCountryCode,
        number: removeSeparator(currentFormData.emergencyContactPhoneNumber)
      },
      name: currentFormData.emergencyContactName
    };
  }

  return null;
};
