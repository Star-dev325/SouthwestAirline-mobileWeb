// @flow

import _ from 'lodash';
import Q from 'q';
import { push, goBack } from 'connected-react-router';

import {
  hideFullScreenModal,
  showFullScreenModal
} from 'src/shared/components/fullScreenModal/helpers/fullScreenModalHelper';
import * as AccountsApi from 'src/shared/api/accountsApi';
import CreditCardActionTypes, { apiActionCreator } from 'src/shared/actions/creditCardActionTypes';
import { hideButton, showEditButton } from 'src/shared/actions/globalHeaderActions';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { PaymentSavedCreditCards, UpdateSavedCreditCardFormData } from 'src/shared/flow-typed/shared.types';

const fetchUpdateCreditCard = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD,
  isFetching: true
});

const fetchUpdateCreditCardSuccess = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD_SUCCESS,
  isFetching: false
});

const fetchUpdateCreditCardFail = (error) => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_UPDATE_CREDIT_CARD_FAILED,
  isFetching: false,
  error
});

export const updateCreditCard =
  (updateSavedCreditCardFormData: UpdateSavedCreditCardFormData, fullScreenModalId: string) => (dispatch: *) => {
    dispatch(fetchUpdateCreditCard());

    return AccountsApi.updateCreditCard(updateSavedCreditCardFormData)
      .then(() => {
        dispatch(fetchUpdateCreditCardSuccess());
        dispatch(fetchSavedCreditCardsAfterUpdate()).then(() => {
          hideFullScreenModal(fullScreenModalId);
        });
      })
      .catch((error) => {
        dispatch(fetchUpdateCreditCardFail(error));
      });
  };

const fetchSavedCreditCardsAfterUpdateBegin = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE,
  isFetching: true
});

const fetchSavedCreditCardsAfterUpdateSuccess = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE_SUCCESS,
  isFetching: false
});

const fetchSavedCreditCardsAfterUpdateFail = (error) => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS_AFTER_UPDATE_FAILED,
  isFetching: false,
  error
});

const fetchSavedCreditCardsAfterUpdate = (shouldGoBackAfterSuccess?: boolean) => (dispatch: *) => {
  dispatch(fetchSavedCreditCardsAfterUpdateBegin());

  return AccountsApi.fetchPaymentOptions()
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(fetchSavedCreditCardsAfterUpdateSuccess());
      dispatch(setSavedCCAndGlobalHeaderButton(paymentSavedCreditCardsPage));
      shouldGoBackAfterSuccess && dispatch(goBack());
    })
    .catch((error) => {
      dispatch(fetchSavedCreditCardsAfterUpdateFail(error));
    });
};

export const setSavedCC = (paymentSavedCreditCardsPage: PaymentSavedCreditCards) => ({
  type: CreditCardActionTypes.CREDIT_CARD__SET_SAVED_CREDIT_CARDS,
  paymentSavedCreditCardsPage
});

const setSavedCCAndGlobalHeaderButton = (paymentSavedCreditCardsPage: PaymentSavedCreditCards) => (dispatch: *) => {
  _.isEmpty(paymentSavedCreditCardsPage) ? dispatch(hideButton()) : dispatch(showEditButton());
  dispatch(setSavedCC(paymentSavedCreditCardsPage));
};

const fetchSavedCreditCardByIdSuccess = (updateSavedCreditCardPage) => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID_SUCCESS,
  updateSavedCreditCardPage,
  isFetching: false
});

const fetchSavedCreditCardByIdFail = (error) => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID_FAILED,
  error,
  isFetching: false
});

const fetchSavedCreditCardById = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__FETCH_CREDIT_CARD_BY_ID,
  isFetching: true
});

export const getSavedCreditCardById =
  (creditCardId: string, fullScreenModalId: string) => (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchSavedCreditCardById());

    return AccountsApi.fetchSavedCreditCardsById(creditCardId)
      .then(({ updateSavedCreditCardPage }) => {
        dispatch(fetchSavedCreditCardByIdSuccess(updateSavedCreditCardPage));
        showFullScreenModal(fullScreenModalId);
      })
      .catch((error) => {
        dispatch(fetchSavedCreditCardByIdFail(error));
      });
  };

const makeCreditCardPrimaryAndUpdateCreditCardBegin = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD,
  isFetching: true
});

const makeCreditCardPrimaryAndUpdateCreditCardSuccess = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD_SUCCESS,
  isFetching: false
});

const makeCreditCardPrimaryAndUpdateCreditCardFail = (error) => ({
  type: CreditCardActionTypes.CREDIT_CARD__MAKE_CC_PRIMARY_AND_UPDATE_CARD_FAILED,
  isFetching: false,
  error
});

const deleteCreditCardsAndUpdateCreditCardBegin = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD,
  isFetching: true
});

const deleteCreditCardsAndUpdateCreditCardSuccess = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD_SUCCESS,
  isFetching: false
});

const deleteCreditCardsAndUpdateCreditCardFail = (error) => ({
  type: CreditCardActionTypes.CREDIT_CARD__DELETE_CC_AND_UPDATE_CARD_FAILED,
  isFetching: false,
  error
});

export const deleteCreditCardsAndUpdateCreditCard = (creditCardIds: Array<string>) => (dispatch: *) => {
  dispatch(deleteCreditCardsAndUpdateCreditCardBegin());

  return Q.fcall(AccountsApi.deleteCreditCards, creditCardIds)
    .then(AccountsApi.fetchPaymentOptions)
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(deleteCreditCardsAndUpdateCreditCardSuccess());
      dispatch(setSavedCCAndGlobalHeaderButton(paymentSavedCreditCardsPage));
    })
    .catch((error) => {
      dispatch(deleteCreditCardsAndUpdateCreditCardFail(error));
    });
};

export const makeCreditCardPrimaryAndUpdateCreditCard = (creditCardId: string) => (dispatch: *) => {
  dispatch(makeCreditCardPrimaryAndUpdateCreditCardBegin());

  return Q.fcall(AccountsApi.makeCreditCardPrimary, creditCardId)
    .then(AccountsApi.fetchPaymentOptions)
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(makeCreditCardPrimaryAndUpdateCreditCardSuccess());
      dispatch(setSavedCCAndGlobalHeaderButton(paymentSavedCreditCardsPage));
    })
    .catch((error) => {
      dispatch(makeCreditCardPrimaryAndUpdateCreditCardFail(error));
    });
};

export const fetchCreditCardsAndQuitEditMode = (shouldGoBackAfterSuccess?: boolean) => (dispatch: *) => {
  dispatch(hideButton());

  return Q(dispatch(fetchSavedCreditCardsAfterUpdate(shouldGoBackAfterSuccess)));
};

const { fetchSavedCreditCards, fetchSavedCreditCardsSuccess, fetchSavedCreditCardsFailed } = apiActionCreator(
  CreditCardActionTypes.CREDIT_CARD__FETCH_SAVED_CREDIT_CARDS
);

export const fetchSavedCreditCardsAndGoToNextPage = (nextPagePath: string) => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchSavedCreditCards());

  return AccountsApi.fetchPaymentOptions()
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(fetchSavedCreditCardsSuccess(paymentSavedCreditCardsPage));
      dispatch(push(nextPagePath));
    })
    .catch((err) => {
      dispatch(fetchSavedCreditCardsFailed(err));
    });
};

export const getSavedCreditCards = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchSavedCreditCards());

  return AccountsApi.fetchPaymentOptions()
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(fetchSavedCreditCardsSuccess(paymentSavedCreditCardsPage));
    })
    .catch((err) => {
      dispatch(fetchSavedCreditCardsFailed(err));
    });
};

export const resetSavedCreditCards = () => ({
  type: CreditCardActionTypes.CREDIT_CARD__RESET_SAVED_CREDIT_CARDS
});
