// @flow

export type DestinationConfig = {
  addressTextWithLinks?: string,
  contactEmailLabel?: string,
  contactEmailRequired?: boolean,
  contactPhone1Label?: string,
  contactPhone1Required?: boolean,
  contactPhone2Label?: string,
  contactPhone2Required?: boolean,
  includeContactTracingFields?: boolean,
  collectionNoticeHeader?: string,
  collectionNoticeTextWithLinks?: string,
  termsAndConditionsHeader?: string,
  termsAndConditionsTextWithLinks?: string,
  applyToAllLabel?: string,
  allowApplyToAll?: boolean,
  title?: string
};

export type passengerToApplyToAllType = ?{
  contactEmail?: string,
  contactPhone1?: contactPhoneType,
  contactPhone2?: contactPhoneType,
  destination?: ?{
    city?: string,
    country?: string,
    stateProvinceRegion?: string,
    streetAddress?: string,
    zipOrPostalCode?: string
  },
  passengerId?: string,
  saveToAll?: boolean
};

export type contactPhoneType = {
  countryCode?: string,
  number?: string
};
