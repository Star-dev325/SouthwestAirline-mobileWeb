// @flow
import _ from 'lodash';
import { push } from 'connected-react-router';
import Actions, { apiActionCreator } from 'src/contactTracing/actions/contactTracingActionTypes';
import * as ReservationApi from 'src/shared/api/reservationApi';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { passengerToApplyToAllType } from 'src/contactTracing/flow-typed/contactTracing.types';
import type { MessageType } from 'src/shared/flow-typed/shared.types';

const {
  CONTACT_TRACING__SEARCH_REQUEST,
  CONTACT_TRACING__PASSENGER_INDEX,
  CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL,
  CONTACT_TRACING__RESET_DATA,
  CONTACT_TRACING__FETCH_CONTACT_TRACING,
  CONTACT_TRACING__SAVE_CONTACT_TRACING
} = Actions;

const { fetchContactTracing, fetchContactTracingSuccess, fetchContactTracingFailed } = apiActionCreator(
  CONTACT_TRACING__FETCH_CONTACT_TRACING
);

const { saveContactTracing, saveContactTracingSuccess, saveContactTracingFailed } = apiActionCreator(
  CONTACT_TRACING__SAVE_CONTACT_TRACING
);

export type ContactTracingRequest = {
  link: Link,
  update: *
};

export const goToContactTracing = (link: Link, confirmationNumber: string) => (dispatch: *) => {
  dispatch(
    searchRequest({
      search: {
        confirmationNumber,
        link
      }
    })
  );
  dispatch(push('/contact-tracing'));
};

const searchRequest = (request) => ({
  type: CONTACT_TRACING__SEARCH_REQUEST,
  request
});

export const retrieveContractTracing = (lookup: { link: Link, confirmationNumber: string }) => {
  const { link, confirmationNumber } = lookup;

  return (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchContactTracing(lookup));

    return ReservationApi.retrieveContactTracing(link)
      .then((response) => {
        dispatch(
          fetchContactTracingSuccess({
            ...response.contactTracingPage,
            confirmationNumber
          })
        );
      })
      .catch((error) => {
        dispatch(fetchContactTracingFailed(error));
      });
  };
};

export const updateContactTracing =
  (onComplete: (message: MessageType) => void, { link, update }: ContactTracingRequest) =>
    (dispatch: *) => {
      dispatch(saveContactTracing(link));

      return ReservationApi.updateContactTracing(link, update)
        .then((updateResponse) => {
          dispatch(saveContactTracingSuccess(updateResponse));
          onComplete(_.get(updateResponse, 'contactTracingUpdate.message'));
        })
        .catch((error) => {
          dispatch(saveContactTracingFailed(error));
        });
    };

export const updatePassengerIndex = (passengerIndex: number) => (dispatch: *) => {
  dispatch(_updatePassengerIndex(passengerIndex));
};

export const updatePassengerToApplyToAll = (passengerToApplyToAll: passengerToApplyToAllType) => (dispatch: *) => {
  dispatch(_updatePassengerToApplyToAll(passengerToApplyToAll));
};

export const resetData = () => (dispatch: *) => {
  dispatch({
    type: CONTACT_TRACING__RESET_DATA
  });
};

const _updatePassengerIndex = (passengerIndex) => ({
  type: CONTACT_TRACING__PASSENGER_INDEX,
  passengerIndex
});

const _updatePassengerToApplyToAll = (passengerToApplyToAll) => ({
  type: CONTACT_TRACING__PASSENGER_TO_APPLY_TO_ALL,
  passengerToApplyToAll
});
