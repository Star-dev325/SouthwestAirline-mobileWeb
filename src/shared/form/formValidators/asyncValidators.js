// @flow

import _ from 'lodash';
import * as AccountsApi from 'src/shared/api/accountsApi';
import HttpRequestError from 'src/shared/errors/httpRequestError';
import AirBookingActionTypes, { apiActionCreator } from 'src/airBooking/actions/airBookingActionTypes';
import { store } from 'src/shared/redux/createStore';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { FormValidationErrors, FormData } from 'src/shared/form/flow-typed/form.types';
import type { Passenger } from 'src/shared/flow-typed/shared.types';

type PersonalInfo = {
  firstName: string,
  middleName: ?string,
  lastName: string,
  rapidRewardsNumber?: string,
  frequentTravelerId?: string,
  frequentTravelerToken?: string
};

const { fetchAccountLookUp, fetchAccountLookUpSuccess, fetchAccountLookUpFailed } = apiActionCreator(
  AirBookingActionTypes.AIR_BOOKING__FETCH_ACCOUNT_LOOK_UP
);

const checkRR =
  (personalInfo: PersonalInfo) =>
    (dispatch: ReduxDispatch<*>): * => {
      const isFrequentTraveler = _.has(personalInfo, 'frequentTravelerId') && _.has(personalInfo, 'frequentTravelerToken');
      
      dispatch(fetchAccountLookUp());

      return AccountsApi.accountNumberLookup(personalInfo, isFrequentTraveler)
        .then(() => {
          dispatch(fetchAccountLookUpSuccess());
        })
        .catch((error) => {
          dispatch(fetchAccountLookUpFailed(error));
          throw error;
        });
    };

export const accountNumberValidator = (formData: Passenger, errors: FormValidationErrors) => {
  const { rapidRewardsNumber } = formData;

  if (_.isEmpty(errors) && !_.isEmpty(rapidRewardsNumber)) {
    const personalInfoForCheck = {
      ..._.pick(formData, ['firstName', 'middleName', 'lastName', 'frequentTravelerId', 'frequentTravelerToken']),
      accountNumber: formData.rapidRewardsNumber
    };

    return store
      .dispatch(checkRR(personalInfoForCheck))
      .then(() => true)
      .catch((error) => {
        const errorMessage = error.responseJSON ? error.responseJSON.message : undefined;
        const requestId = _.get(error, 'responseJSON.requestId');
        const responseCode = _.get(error, 'responseJSON.code');
        const httpStatusCode = _.get(error, 'responseJSON.httpStatusCode');

        return new HttpRequestError(errorMessage, requestId, responseCode, httpStatusCode);
      });
  }

  return true;
};

export const rapidRewardsNumberValidator =
  (names: { firstName: string, middleName: ?string, lastName: string }) =>
    (formData: FormData, errors: FormValidationErrors) => {
      const { rapidRewardsNumber } = formData;
      const { firstName, middleName, lastName } = names;

      if (_.isEmpty(errors) && !_.isEmpty(rapidRewardsNumber)) {
        return store
          .dispatch(checkRR({ accountNumber: rapidRewardsNumber, firstName, middleName, lastName }))
          .then(() => true)
          .catch((error) => {
            const errorMessage = error.responseJSON ? error.responseJSON.message : undefined;
            const requestId = _.get(error, 'responseJSON.requestId');
            const responseCode = _.get(error, 'responseJSON.code');
            const httpStatusCode = _.get(error, 'responseJSON.httpStatusCode');

            return new HttpRequestError(errorMessage, requestId, responseCode, httpStatusCode);
          });
      }

      return true;
    };
