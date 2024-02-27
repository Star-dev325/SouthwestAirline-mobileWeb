// @flow

import React, { Component } from 'react';

import * as contactMethodHelper from 'src/shared/helpers/contactMethodHelper';
import ContactMethodForm from 'src/shared/form/components/contactMethodForm';

import type { ContactMethodInfo } from 'src/shared/flow-typed/shared.types';

type Props = {
  formId: string,
  updateContactMethodFn: (*) => void,
  goBack: () => void,
  contactMethodInfo: ?ContactMethodInfo,
  isInternationalBooking: boolean,
  isAlreadyHasContactMethod?: boolean,
  isLoggedIn?: boolean,
  message?: ?string,
  asyncGoBack?: boolean,
  isAirBooking?: boolean
};

class ContactMethodPage extends Component<Props> {
  _onSubmit = (info: ContactMethodInfo) => {
    const { goBack, updateContactMethodFn, asyncGoBack, isInternationalBooking } = this.props;

    updateContactMethodFn(contactMethodHelper.omitUselessContactInfoFields(info, isInternationalBooking));
    !asyncGoBack && goBack();
  };

  render() {
    const {
      contactMethodInfo,
      formId,
      goBack,
      isAirBooking,
      isAlreadyHasContactMethod,
      isInternationalBooking,
      isLoggedIn,
      message
    } = this.props;

    return (
      <ContactMethodForm
        formId={formId}
        onSubmit={this._onSubmit}
        initialFormData={contactMethodInfo}
        isAirBooking={isAirBooking}
        isInternationalBooking={isInternationalBooking}
        isAlreadyHasContactMethod={isAlreadyHasContactMethod}
        isLoggedIn={isLoggedIn}
        goBack={goBack}
        message={message}
      />
    );
  }
}

export default ContactMethodPage;
