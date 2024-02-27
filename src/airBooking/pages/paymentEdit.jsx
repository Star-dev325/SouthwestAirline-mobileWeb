// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import {
  shouldShowChaseInstantCreditCard,
  getUpliftAdditionalMessagingTripTotal,
  getShouldShowUpliftAirBooking,
  getShouldDisableUpliftAirBooking
} from 'src/airBooking/selectors/paymentPageSelectors';
import * as AirBookingActions from 'src/airBooking/actions/airBookingActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as HistoryActions from 'src/shared/actions/historyActions';
import PaymentForm from 'src/shared/form/components/paymentForm';
import withPaymentEditMode from 'src/shared/enhancers/withPaymentEditMode';
import { AIR_BOOKING_PAYMENT_EDIT_FORM } from 'src/shared/constants/formIds';
import { raiseSatelliteEvent } from 'src/shared/analytics/helpers/analyticsEventHelper';
import type {
  PaymentInfo,
  PaymentSavedCreditCards,
  Push,
  PaymentFormData,
  AccountContactInfoType
} from 'src/shared/flow-typed/shared.types';
import type { Dispatch as ReduxDispatch } from 'redux';
import { transformExpirationPaymentInfo } from 'src/shared/transformers/cardExpirationDateTransformer';
import i18n from '@swa-ui/locale';
import type { DynamicPlacementResponse } from 'src/wcm/flow-typed/wcm.types';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

type Props = {
  editMode: boolean,
  savedCreditCards?: PaymentSavedCreditCards,
  paymentInfo?: PaymentInfo,
  isLoggedIn?: boolean,
  shouldShowChaseInstantCreditCard?: boolean,
  shouldShowApplePay?: boolean,
  shouldShowUplift?: boolean,
  shouldDisableUplift?: boolean,
  upliftAdditionalMessaging?: string,
  onMakePrimaryCreditCard: (string) => void,
  onUpdateCreditCard?: (string) => void,
  onDeleteCreditCards?: (Array<string>) => void,
  onClickContinueButton?: (PaymentFormData) => void,
  push: Push,
  goBack: () => void,
  continueAsGuestActionFn?: () => (dispatch: ReduxDispatch<*>) => {},
  userAddressInfo?: AccountContactInfoType,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  addHistoryBackToHomeFn: (boolean) => void,
  isWebView?: boolean,
  placements?: { upliftMessage?: DynamicPlacementResponse }
};

export class PaymentEdit extends React.Component<Props> {
  componentDidMount() {
    raiseSatelliteEvent('BOOK:SWA:Payment Page');
  }

  render() {
    const {
      isLoggedIn,
      onClickContinueButton,
      paymentInfo: originalPaymentInfo,
      userAddressInfo,
      updateFormDataValueFn,
      isWebView,
      upliftAdditionalMessaging,
      placements,
      ...restProps
    } = this.props;

    const paymentInfo =
      isWebView && originalPaymentInfo
        ? transformExpirationPaymentInfo(originalPaymentInfo, 'MM/YYYY')
        : originalPaymentInfo;

    const { upliftMessage } = placements || {};

    return (
      <div className="payment-edit">
        <PaymentForm
          formId={AIR_BOOKING_PAYMENT_EDIT_FORM}
          hideSubmitSegment
          showEditHeader
          onSubmit={onClickContinueButton}
          enableOperationOnCC={isLoggedIn}
          initialFormData={paymentInfo}
          supportModifyCountryCode
          onClickPayPalButton={onClickContinueButton}
          onClickApplePayButton={onClickContinueButton}
          onClickUpliftButton={onClickContinueButton}
          userAddressInfo={userAddressInfo}
          updateFormDataValueFn={updateFormDataValueFn}
          isWebView={isWebView}
          upliftAdditionalMessaging={upliftAdditionalMessaging}
          upliftAdditionalInfoLink={i18n('AIR_BOOKING__LEARN_MORE')}
          upliftDisabledPlacement={upliftMessage}
          {...restProps}
        />
      </div>
    );
  }
}

export const continueAsGuestForSessionExpiredFn = (props: {
  push: Push,
  continueAsGuestActionFn?: () => (dispatch: ReduxDispatch<*>) => {},
  addHistoryBackToHomeFn: (boolean) => void
}) => {
  const { push, continueAsGuestActionFn, addHistoryBackToHomeFn } = props;

  continueAsGuestActionFn && continueAsGuestActionFn();
  addHistoryBackToHomeFn(true);
  push(getNormalizedRoute({ routeName: 'price' }));
};

const enhancers = _.flowRight(
  withBodyClass(['hide-header', 'payment-edit-page']),
  connect(
    (state) => ({
      userAddressInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
      savedCreditCards: state.app.savedCreditCards,
      paymentInfo: state.app.airBooking.paymentInfo,
      isLoggedIn: state.app.account.isLoggedIn,
      shouldShowChaseInstantCreditCard: shouldShowChaseInstantCreditCard(state),
      shouldShowApplePay: _.get(state, 'app.applePay.applePayAvailability.isAvailable'),
      shouldShowUplift: getShouldShowUpliftAirBooking(state),
      shouldDisableUplift: getShouldDisableUpliftAirBooking(state),
      upliftAdditionalMessaging: getUpliftAdditionalMessagingTripTotal(state),
      isWebView: _.get(state, 'app.webView.isWebView'),
      placements: _.get(state, 'app.airBooking.purchasePagePlacements')
    }),
    {
      updateFormDataValueFn: FormDataActions.updateFormDataValue,
      onClickContinueButton: AirBookingActions.savePaymentInfoAndBackToPreviousPage,
      continueAsGuestActionFn: AirBookingActions.resetAirBookingPurchaseData,
      addHistoryBackToHomeFn: HistoryActions.addHistoryBackToHome
    }
  ),
  withPaymentEditMode({ fullScreenModalId: 'airBookingCreditCardUpdate' }, continueAsGuestForSessionExpiredFn)
);

export default enhancers(PaymentEdit);
