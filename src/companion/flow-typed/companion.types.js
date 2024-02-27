// @flow

export type CompanionBasicInfo = {
  birthDate?: string,
  // @TODO
  // remove birthDate when we release companion CHAPI work
  // add dateOfBirth to make it compatiable with old WAPI
  dateOfBirth?: string,
  gender: string,
  suffix: ?string,
  name: {
    firstName?: string,
    lastName?: string
  } | string
};

export type CompanionPassengerFormData = {
  contactMethodContent: ?string,
  emailReceiptTo: string,
  shareItineraryEmail: ?string,
  redressNumber: ?string,
  knownTravelerNumber: ?string
};

export type CompanionInformationResponseType = {
  companionDetailsPage: {
    contactEmail: ?string,
    contactMethod: ?string,
    contactPhone: ?{
      countryCode: string,
      number: string
    },
    dateOfBirth: string,
    emailReceiptTo: ?string,
    gender: string,
    knownTravelerNumber: ?string,
    name: string,
    firstName: string,
    middleName: string,
    lastName: string,
    redressNumber: ?string
  }
}

export type AccountCompanionName = {
  firstName: string,
  lastName: string
}
