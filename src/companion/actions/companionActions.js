// @flow

import i18n from '@swa-ui/locale';
import { goBack, push } from 'connected-react-router';
import _ from 'lodash';
import { transformToEarlybirdInPathRequest } from 'src/airBooking/helpers/purchaseSummaryPageHelper';
import CompanionActionTypes, { apiActionCreator } from 'src/companion/actions/companionActionTypes';
import { showEarlybirdFailedDialog } from 'src/earlyBird/actions/earlyBirdActions';
import * as AccountActions from 'src/shared/actions/accountActions';
import {
  initiateVoidTransaction,
  resetAlternativeFormsOfPayment
} from 'src/shared/actions/alternativeFormsOfPaymentActions';
import * as TravelFundsActions from 'src/shared/actions/applyTravelFundsActions';
import * as ContactMethodActions from 'src/shared/actions/contactMethodActions';
import { hideDialog, showDialog } from 'src/shared/actions/dialogActions';
import FlowStatusActions from 'src/shared/actions/flowStatusActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as AccountsApi from 'src/shared/api/accountsApi';
import * as CompanionApi from 'src/shared/api/companionApi';
import * as FlightBookingApi from 'src/shared/api/flightBookingApi';
import { sendErrorLog } from 'src/shared/api/loggingApi';
import { isSessionTimeoutError } from 'src/shared/helpers/errorCodesHelper';
import { playHapticFeedback } from 'src/shared/helpers/hapticFeedbackHelper';
import { toChapiAfpErrorLog } from 'src/shared/transformers/alternativeFormsOfPaymentTransformer';
import { generateDialogConfigFromError } from 'src/shared/transformers/dialogTransformer';
import { transformToPurchaseRequest } from 'src/shared/transformers/flightPurchaseRequestTransformer';
import store2 from 'store2';

import { TRAVEL_FUNDS } from 'src/companion/constants/companionConstants';
import { STATUS } from 'src/shared/constants/flowConstants';
import { COMPANION_PURCHASE_SUMMARY_FORM } from 'src/shared/constants/formIds';
import { DOLLAR } from 'src/shared/constants/moneyOrPoints';
import StorageKeys from 'src/shared/helpers/storageKeys';

import type { Dispatch as ReduxDispatch } from 'redux';
import type { PurchaseFlightParamsType } from 'src/airBooking/flow-typed/airBooking.types';
import type {
  CompanionInformationResponseType, CompanionPassengerFormData
} from 'src/companion/flow-typed/companion.types';
import { PAYMENT_METHODS } from 'src/shared/constants/alternativeFormsOfPaymentConstants';
import { APPLE_PAY } from 'src/shared/constants/creditCardTypes';
import type {
  BillingAddressFormType, ContactMethodInfo, Dispatch as ThunkDispatch, EarlyBirdPricing,
  PassengerInfos, PaymentInfo
} from 'src/shared/flow-typed/shared.types';
import type { FormData } from 'src/shared/form/flow-typed/form.types';

const {
  COMPANION__FETCH_PAYMENT_PAGE,
  COMPANION__FETCH_PRICING_PAGE,
  COMPANION__FETCH_COMPANION_INFORMATION,
  COMPANION__SET_INTERNATIONAL_BOOKING_FLAG,
  COMPANION__PREFILL_PASSENGER_INFO,
  COMPANION__UPDATE_PASSENGER_INFO,
  COMPANION__UPDATE_CONTACT_METHOD,
  COMPANION__FETCH_CONFIRMATION_PAGE,
  COMPANION__SAVE_PAYMENT_INFO,
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO,
  COMPANION__UPDATE_SPECIAL_ASSISTANCE,
  COMPANION__RESET_SPECIAL_ASSISTANCE,
  COMPANION__SAVE_TRAVEL_FUNDS_ADDRESS
} = CompanionActionTypes;
const { fetchPaymentPage, fetchPaymentPageSuccess, fetchPaymentPageFailed } =
  apiActionCreator(COMPANION__FETCH_PAYMENT_PAGE);

const { fetchPricingPage, fetchPricingPageSuccess, fetchPricingPageFailed } =
  apiActionCreator(COMPANION__FETCH_PRICING_PAGE);

const { fetchCompanionInformation, fetchCompanionInformationSuccess, fetchCompanionInformationFailed } =
  apiActionCreator(COMPANION__FETCH_COMPANION_INFORMATION);

export const goToCompanionPricingPage = (companionPricingLink: Link) => {
  store2.session.remove(StorageKeys.PAYPAL_DATA_KEY);

  return (dispatch: ThunkDispatch) => {
    dispatch(fetchPricingPage());
    dispatch(resetAlternativeFormsOfPayment());

    return FlightBookingApi.getProductPrices(companionPricingLink)
      .then((response) => {
        dispatch(fetchPricingPageSuccess(response.flightPricingPage));
        dispatch(setInternationalBookingFlag(response));
        dispatch(AccountActions.cleanUpAssociatedInfo());
        dispatch(FlowStatusActions.setFlowStatus('companion', STATUS.IN_PROGRESS));
        dispatch(push('/companion/pricing'));
      })
      .catch((error) => dispatch(fetchPricingPageFailed(error)));
  };
};

const setInternationalBookingFlag = (response) => ({
  type: COMPANION__SET_INTERNATIONAL_BOOKING_FLAG,
  response
});

const prefillPassengerInfo = (response: CompanionInformationResponseType, isInternationalBooking: boolean) => ({
  type: COMPANION__PREFILL_PASSENGER_INFO,
  response,
  isInternationalBooking
});

const savePassenger = (formData: CompanionPassengerFormData) => ({
  type: COMPANION__UPDATE_PASSENGER_INFO,
  formData
});

const updateSpecialAssistance = ({ specialAssistanceFormData }: { specialAssistanceFormData: FormData }) => ({
  type: COMPANION__UPDATE_SPECIAL_ASSISTANCE,
  specialAssistanceFormData
});

export const saveTravelFundsBillingAddress = (travelFundsAddress: BillingAddressFormType) => ({
  type: COMPANION__SAVE_TRAVEL_FUNDS_ADDRESS,
  travelFundsAddress
});

export const resetCompanionSpecialAssistance = () => ({
  type: COMPANION__RESET_SPECIAL_ASSISTANCE
});

export const saveCompanionPassenger = (passengerInfo: CompanionPassengerFormData) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePassenger(passengerInfo));
};

export const goToCompanionPassengerPage =
  (isInternationalBookingForCompanion: boolean) => (dispatch: ReduxDispatch<*>) => {
    dispatch(fetchCompanionInformation());

    return CompanionApi.getCompanionInformation()
      .then((response) => {
        dispatch(TravelFundsActions.resetCalculateFlowData());
        dispatch(fetchCompanionInformationSuccess(response));
        dispatch(prefillPassengerInfo(response, isInternationalBookingForCompanion));
        dispatch(push('/companion/passenger'));
      })
      .catch((error) => {
        dispatch(fetchCompanionInformationFailed(error));
      });
  };

export const updateContactMethod = (info: ContactMethodInfo) => ({
  type: COMPANION__UPDATE_CONTACT_METHOD,
  info
});

export const updateCompanionWithSpecialAssistance =
  (specialAssistanceFormData: FormData) => (dispatch: ReduxDispatch<*>) => {
    specialAssistanceFormData && dispatch(updateSpecialAssistance({ specialAssistanceFormData }));
    dispatch(goBack());
  };

export const goToCompanionPaymentPage = () => (dispatch: ReduxDispatch<*>) => {
  dispatch(fetchPaymentPage());

  return AccountsApi.fetchPaymentOptions()
    .then(({ paymentSavedCreditCardsPage }) => {
      dispatch(fetchPaymentPageSuccess(paymentSavedCreditCardsPage));
      dispatch(push('companion/payment'));
    })
    .catch((err) => {
      dispatch(fetchPaymentPageFailed(err));
    });
};

const { fetchConfirmationPage, fetchConfirmationPageSuccess, fetchConfirmationPageFailed } = apiActionCreator(
  COMPANION__FETCH_CONFIRMATION_PAGE
);

export const goToCompanionConfirmationPage = (purchaseFlightParams: PurchaseFlightParamsType) => (dispatch: *, getState: *) => {
  const state = getState();
  const { contactMethodInfo } = purchaseFlightParams;
  const purchaseRequest = transformToPurchaseRequest(purchaseFlightParams);
  const request = { xhref: purchaseRequest.href, ...purchaseRequest };
  const CEPTOR_VOID_API = state?.app?.toggles?.CEPTOR_VOID_API;

  dispatch(fetchConfirmationPage(request));

  return FlightBookingApi.purchaseFlight(request, true)
    .then((response) => {
      dispatch(FlowStatusActions.setFlowStatus('companion', STATUS.COMPLETED));
      dispatch(resetCompanionSpecialAssistance());
      dispatch(fetchConfirmationPageSuccess(response));

      dispatch(push('/companion/confirmation'));
      playHapticFeedback();

      const { failedEarlyBird } = response.flightConfirmationPage;

      if (failedEarlyBird) {
        dispatch(showEarlybirdFailedDialog(failedEarlyBird));
      }

      return ContactMethodActions.updateSavedContactMethod(contactMethodInfo)(dispatch);
    })
    .catch((error) => {
      const errorCode = _.get(error, 'responseJSON.code');
      const isApplePay = _.get(purchaseRequest, 'body.payment.newCreditCard.digitalPaymentType') === APPLE_PAY.key;

      dispatch(FormDataActions.updateFormFieldDataValue(purchaseFlightParams.formId, 'securityCode', ''));

      if (errorCode === TRAVEL_FUNDS.TOKEN_EXPIRED_COMPANION_CODE) {
        const dialogConfig = generateDialogConfigFromError(error);

        dispatch(
          showDialog({
            name: 'fund-token-expired-message',
            buttons: [
              {
                label: i18n('SHARED__BUTTON_TEXT__OK'),
                onClick: () => {
                  dispatch(hideDialog()).then(() => {
                    dispatch(push(TRAVEL_FUNDS.TOKEN_EXPIRED_COMPANION_URL));
                  });
                }
              }
            ],
            ...dialogConfig
          })
        );
        error.$customized = true;
        dispatch(fetchConfirmationPageFailed(error));
      } else if (isApplePay) {
        sendErrorLog(toChapiAfpErrorLog(error, PAYMENT_METHODS.APPLE_PAY));

        if (!CEPTOR_VOID_API || !isSessionTimeoutError(error)) {
          dispatch(initiateVoidTransaction(PAYMENT_METHODS.APPLE_PAY, error));
        }
        dispatch(fetchConfirmationPageFailed());
      } else {
        dispatch(fetchConfirmationPageFailed(error));
      }
    });
};

export const savePaymentInfo = (paymentInfo: PaymentInfo) => ({
  type: COMPANION__SAVE_PAYMENT_INFO,
  paymentInfo
});

export const savePaymentInfoAndGoToPurchaseSummaryPage = (paymentInfo: PaymentInfo) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(push('/companion/purchase'));
};

export const savePaymentInfoAndBackToPreviousPage = (paymentInfo: PaymentInfo) => (dispatch: ReduxDispatch<*>) => {
  dispatch(savePaymentInfo(paymentInfo));
  dispatch(goBack());
  dispatch(FormDataActions.updateFormFieldDataValue(COMPANION_PURCHASE_SUMMARY_FORM, 'securityCode', ''));
};

const { fetchEarlyBirdInPathInfo, fetchEarlyBirdInPathInfoSuccess, fetchEarlyBirdInPathInfoFailed } = apiActionCreator(
  COMPANION__FETCH_EARLY_BIRD_IN_PATH_INFO
);

export const fetchEarlybirdPricing = (earlyBirdPricing: EarlyBirdPricing, passengerInfos: PassengerInfos) => {
  const earlybirdInPathRequest = transformToEarlybirdInPathRequest(earlyBirdPricing, passengerInfos, DOLLAR.VALUE);

  return (dispatch: *) => {
    dispatch(fetchEarlyBirdInPathInfo());

    return FlightBookingApi.retrieveEarlyBirdInPathInfo(earlybirdInPathRequest)
      .then((response) => dispatch(fetchEarlyBirdInPathInfoSuccess(response)))
      .catch(() => dispatch(fetchEarlyBirdInPathInfoFailed()));
  };
};
