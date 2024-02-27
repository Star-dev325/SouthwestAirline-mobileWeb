// @flow
import _ from 'lodash';

import * as AccountsApi from 'src/shared/api/accountsApi';
import { transformToSaveContactMethodRequest } from 'src/shared/transformers/contactInfoTransformer';
import ContactMethodActionTypes, { apiActionCreator } from 'src/shared/actions/contactMethodActionTypes';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { ContactMethodInfo } from 'src/shared/flow-typed/shared.types';

const {
  updateSavedContactMethod: startUpdateSavedContactMethod,
  updateSavedContactMethodSuccess,
  updateSavedContactMethodFailed
} = apiActionCreator(ContactMethodActionTypes.CONTACT_METHOD__UPDATE_SAVED_CONTACT_METHOD, { isSpinnerNeeded: false });

export const updateSavedContactMethod = (contactMethodInfo: ContactMethodInfo) => {
  const declineNotifications = _.toBoolean(contactMethodInfo.declineNotifications);
  const saveContactMethod = _.toBoolean(contactMethodInfo.saveContactMethod);
  const shouldUpdateSavedContactMethod = !declineNotifications && saveContactMethod;

  return (dispatch: ReduxDispatch<*>): Promise<*> => {
    if (!shouldUpdateSavedContactMethod) {
      return Promise.resolve();
    }

    dispatch(startUpdateSavedContactMethod());
    const contactInfo = transformToSaveContactMethodRequest({
      number: contactMethodInfo.phoneNumber,
      contactEmail: contactMethodInfo.email,
      countryCode: contactMethodInfo.phoneCountryCode,
      contactMethod: contactMethodInfo.contactMethod
    });

    return AccountsApi.saveContactMethod(contactInfo)
      .then(() => {
        dispatch(updateSavedContactMethodSuccess());
      })
      .catch(() => dispatch(updateSavedContactMethodFailed()));
  };
};

export const updateContactMethod = (info: ContactMethodInfo) => ({
  type: ContactMethodActionTypes.CONTACT_METHOD__UPDATE_CONTACT_METHOD,
  info
});
