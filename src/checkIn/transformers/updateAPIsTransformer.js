import { addPhoneNumberSeparator, removeSeparator } from 'src/shared/helpers/separatorHelper';

import _ from 'lodash';
import CheckInAPISConstants from 'src/checkIn/constants/checkInAPISConstants';
import countryCodes from 'src/shared/constants/countryCode';

const { PERMANENTRESIDENTCARD_FORM_NAME, VISA_FORM_NAME, DESTINATION_FORM_NAME } = CheckInAPISConstants;

const _transformPermanentResidentCardFormData = (permanentResidentCardFormData) => {
  if (_.isEmpty(permanentResidentCardFormData)) return permanentResidentCardFormData;
  const { number, ...others } = permanentResidentCardFormData;

  return {
    number: removeSeparator(number),
    ...others
  };
};

const _toPhoneUpdateRequest = (data, prefix) => {
  const key = `${prefix}Number`;
  const rawNumber = data[key];
  let value = null;

  if (rawNumber) {
    const number = rawNumber.replace(/[-_]/g, '');
    const countryKey = `${prefix}CountryCode`;
    const countryCode = data[countryKey] || '1';

    value = {
      number,
      countryCode
    };
  }

  return value;
};

const _transformDestinationFormData = (destinationFormData) => {
  if (_.isEmpty(destinationFormData)) return destinationFormData;

  const { contactEmail, addressLine, city, isoCountryCode, stateProvinceRegion, zipOrPostalCode } = destinationFormData;

  return _.pickBy(
    {
      contactPhone1: _toPhoneUpdateRequest(destinationFormData, 'contactPhone1'),
      contactPhone2: _toPhoneUpdateRequest(destinationFormData, 'contactPhone2'),
      contactEmail,
      streetAddress: addressLine,
      city,
      country: isoCountryCode,
      stateProvinceRegion,
      zipOrPostalCode
    },
    _.identity
  );
};

const _transformTravelDocument = (travelDocument) => {
  const {
    href,
    method,
    body,
    meta: { missingDocuments, destinationConfig }
  } = travelDocument;
  const travelerName = _.get(body, 'fullName');

  return {
    requestData: {
      href,
      method,
      body
    },
    missingDocuments,
    destinationConfig,
    travelerName
  };
};

const toPhoneFormData = (data, prefix) => {
  const countryCode = _.get(data, `${prefix}.countryCode`, '1');
  const rawPhoneNumber = _.get(data, `${prefix}.number`, '');
  const phoneNumber = addPhoneNumberSeparator(rawPhoneNumber, countryCode);

  return {
    [`${prefix}Number`]: phoneNumber,
    [`${prefix}CountryCode`]: countryCode
  };
};

const transformDestinationToFormData = (destination) => {
  const {
    streetAddress: addressLine,
    zipOrPostalCode,
    city,
    stateProvinceRegion,
    country: isoCountryCode,
    contactEmail
  } = destination || {};

  return {
    contactEmail,
    ...toPhoneFormData(destination, 'contactPhone1'),
    ...toPhoneFormData(destination, 'contactPhone2'),
    addressLine,
    zipOrPostalCode,
    city,
    stateProvinceRegion,
    isoCountryCode
  };
};

const _transformPrefillDataToPassportPageFormData = (passengerPrefillData) => {
  const { destination } = passengerPrefillData;
  const countryCode = _.get(passengerPrefillData, 'emergencyContact.contactPhone.countryCode');
  const countryDialingCode = countryCode && countryCodes[countryCode];

  const additionalDocuments = !destination
    ? {}
    : {
      additionalPassportPageFormData: {
        destination: transformDestinationToFormData(destination)
      }
    };

  return {
    ...additionalDocuments,
    passportPageFormData: {
      passportNumber: _.get(passengerPrefillData, 'passport.lastFourPassportNumber'),
      passportIssuedBy: _.get(passengerPrefillData, 'passport.passportIssuedBy'),
      nationality: _.get(passengerPrefillData, 'passport.nationality'),
      passportExpirationDate: _.get(passengerPrefillData, 'passport.passportExpirationDate'),
      countryOfResidence: _.get(passengerPrefillData, 'passport.countryOfResidence'),
      doNotWishToProvideAnEmergencyContact: _.get(
        passengerPrefillData,
        'emergencyContact.doNotWishToProvideAnEmergencyContact'
      ),
      emergencyContactName: _.get(passengerPrefillData, 'emergencyContact.name'),
      emergencyContactCountryCode: countryCode,
      emergencyContactCountryDialingCode: countryDialingCode,
      emergencyContactPhoneNumber: _.get(passengerPrefillData, 'emergencyContact.contactPhone.number')
    }
  };
};

export default {
  transformLinksToTravelDocuments(checkInViewReservationLinks) {
    return _.chain(checkInViewReservationLinks).get('travelDocuments').map(_transformTravelDocument).value();
  },
  transformToPassportInfoRequest(requestData, formData, checkInSessionToken, suppressEmergencyContact) {
    const {
      passportNumber,
      passportIssuedBy,
      nationality,
      passportExpirationDate,
      countryOfResidence,
      doNotWishToProvideAnEmergencyContact,
      emergencyContactName,
      emergencyContactCountryCode,
      emergencyContactPhoneNumber
    } = formData;
    const { href, method, body } = requestData;

    const nationalityDocument = {
      nationality: {
        passportInformation: {
          passportNumber,
          passportIssuedBy,
          nationality,
          passportExpirationDate,
          countryOfResidence
        }
      }
    };

    const emergencyContactParams = {
      emergencyContact: {
        doNotWishToProvideAnEmergencyContact,
        emergencyContactInformation: _.toBoolean(doNotWishToProvideAnEmergencyContact)
          ? null
          : {
            name: emergencyContactName,
            contactPhone: {
              countryCode: emergencyContactCountryCode,
              number: emergencyContactPhoneNumber
            }
          }
      }
    };

    const travelDocumentsUpdate = _.merge(
      {},
      body,
      nationalityDocument,
      !suppressEmergencyContact && emergencyContactParams,
      {
        checkInSessionToken
      }
    );

    return {
      href,
      method,
      body: {
        travelDocumentsUpdate
      }
    };
  },
  transformToAdditionalInfoRequest(requestData, formData, checkInSessionToken) {
    const { href, method, body } = requestData;
    const permanentResidentCard = _transformPermanentResidentCardFormData(
      _.get(formData, PERMANENTRESIDENTCARD_FORM_NAME)
    );
    const destination = _transformDestinationFormData(_.get(formData, DESTINATION_FORM_NAME));

    const visa = _.get(formData, VISA_FORM_NAME);

    const requestFormData = _.merge(
      {},
      permanentResidentCard && { permanentResidentCard },
      visa && { visa },
      destination && { destination }
    );

    return {
      href,
      method,
      body: {
        travelDocumentsUpdate: _.merge({}, body, requestFormData, { checkInSessionToken })
      }
    };
  },
  transformPrefillAPISDataToCheckInAPISFormData(passengerPrefillData) {
    return _.reduce(
      passengerPrefillData,
      (result, perPassengerPrefillData) => {
        result[perPassengerPrefillData.travelerIdentifier] =
          _transformPrefillDataToPassportPageFormData(perPassengerPrefillData);

        return result;
      },
      {}
    );
  },
  transformDestinationFormData: _transformDestinationFormData,
  toPhoneUpdateRequest: _toPhoneUpdateRequest,
  toPhoneFormData
};
