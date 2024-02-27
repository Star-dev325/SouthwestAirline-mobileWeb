// @flow
import React from 'react';
import ContactInfoTravelManagerForm from 'src/shared/form/components/contactInfoTravelManagerForm';
import { _addHyphenForUSPhoneNumber } from 'src/shared/helpers/contactMethodPageHelper';
import type { DutyOfCare, ContactMethodInfo } from 'src/shared/flow-typed/shared.types';
import { TRAVEL_MANAGER_OPTIONS } from 'src/shared/constants/contactMethodOptions';
import optionsHelper from 'src/shared/helpers/optionsHelper';

const contactMethodKeys = optionsHelper.keyMirror(TRAVEL_MANAGER_OPTIONS);

type Props = {
  formId: string,
  updateContactInfoTravelManagerFn: (*) => void,
  goBack: () => void,
  dutyOfCareContact: DutyOfCare,
  isInternationalBooking: boolean,
  isLoggedIn?: boolean,
  asyncGoBack?: boolean,
  isAirBooking?: boolean,
  disclaimerText?: string,
  updateFormFieldDataValueFn: (string, string, string) => void
};

const ContactInfoTravelManagerPage = ({
  dutyOfCareContact: { contactMethod, contactPhone, contactEmail },
  formId,
  goBack,
  isLoggedIn,
  isAirBooking,
  updateContactInfoTravelManagerFn,
  asyncGoBack,
  disclaimerText,
  updateFormFieldDataValueFn
}: Props) => {
  const _onSubmit = (info: ContactMethodInfo) => {
    updateContactInfoTravelManagerFn(info);
    clearDirtyFormFields(info);
    !asyncGoBack && goBack();
  };

  const clearDirtyFormFields = (info: ContactMethodInfo) => {
    if (info.phoneNumber) {
      updateFormFieldDataValueFn(formId, 'email', '');
    } else if (info.email) {
      updateFormFieldDataValueFn(formId, 'phoneNumber', '');
    } else {
      updateFormFieldDataValueFn(formId, 'email', '');
      updateFormFieldDataValueFn(formId, 'phoneNumber', '');
    }
  };

  const initialFormData = {
    contactMethod: contactMethod ?? contactMethodKeys.CALL_ME,
    declineNotifications: false,
    email: contactEmail,
    phoneCountryCode: contactPhone?.countryCode,
    phoneNumber: _addHyphenForUSPhoneNumber(contactPhone?.countryCode, contactPhone?.number),
    disclaimerText
  };

  return (
    <ContactInfoTravelManagerForm
      formId={formId}
      onSubmit={_onSubmit}
      initialFormData={initialFormData}
      isAirBooking={isAirBooking}
      isLoggedIn={isLoggedIn}
      goBack={goBack}
    />
  );
};

export default ContactInfoTravelManagerPage;
