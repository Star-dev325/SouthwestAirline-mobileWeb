// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { shouldShowChaseInstantCreditCard } from 'src/airBooking/selectors/paymentPageSelectors';
import * as EarlyBirdActions from 'src/earlyBird/actions/earlyBirdActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as HistoryActions from 'src/shared/actions/historyActions';
import { EARLY_BIRD_PAYMENT_EDIT_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withPaymentEditMode from 'src/shared/enhancers/withPaymentEditMode';
import PaymentForm from 'src/shared/form/components/paymentForm';
import { buildPathWithParamAndQuery } from 'src/shared/helpers/pathUtils';
import { getNormalizedRoute } from 'src/shared/helpers/urlHelper';

import type {
  AccountContactInfoType,
  PaymentFormData,
  PaymentInfo,
  PaymentSavedCreditCards,
  Push
} from 'src/shared/flow-typed/shared.types';

type Props = {
  editMode: boolean,
  savedCreditCards?: PaymentSavedCreditCards,
  paymentInfo?: PaymentInfo,
  recordLocator: string,
  isLoggedIn?: boolean,
  shouldShowChaseInstantCreditCard?: boolean,
  onMakePrimaryCreditCard: (string) => void,
  onUpdateCreditCard?: (string) => void,
  onDeleteCreditCards?: (Array<string>) => void,
  onClickContinueButton?: (PaymentFormData) => void,
  push: Push,
  goBack: () => void,
  userAddressInfo?: AccountContactInfoType,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  shouldShowApplePay?: boolean,
  addHistoryBackToHomeFn: (boolean) => void
};

export class EarlyBirdPayment extends React.Component<Props> {
  render() {
    const { isLoggedIn, onClickContinueButton, paymentInfo, userAddressInfo, updateFormDataValueFn, ...restProps } =
      this.props;
    const subTitle = 'Add EarlyBird';

    return (
      <div className="payment-edit">
        <PaymentForm
          formId={EARLY_BIRD_PAYMENT_EDIT_FORM}
          hideSubmitSegment
          showEditHeader
          onSubmit={onClickContinueButton}
          subTitle={subTitle}
          enableOperationOnCC={isLoggedIn}
          initialFormData={paymentInfo}
          onClickPayPalButton={onClickContinueButton}
          onClickApplePayButton={onClickContinueButton}
          supportModifyCountryCode
          userAddressInfo={userAddressInfo}
          updateFormDataValueFn={updateFormDataValueFn}
          {...restProps}
        />
      </div>
    );
  }
}

export const continueAsGuestForSessionExpiredFn = (props: {
  push: Push,
  recordLocator?: string,
  addHistoryBackToHomeFn: (boolean) => void
}) => {
  const { push, recordLocator, addHistoryBackToHomeFn } = props;
  const checkinRoute = getNormalizedRoute({ routeName: 'checkin' });

  addHistoryBackToHomeFn(true);
  recordLocator && push(buildPathWithParamAndQuery(checkinRoute, { pnr: recordLocator }, null));
};

const enhancers = _.flowRight(
  withBodyClass('hide-header'),
  connect(
    (state) => ({
      userAddressInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
      savedCreditCards: state.app.savedCreditCards,
      paymentInfo: state.app.earlyBird.paymentInfo,
      recordLocator: _.get(state, 'app.earlyBird.detailPage.response.recordLocator'),
      isLoggedIn: state.app.account.isLoggedIn,
      shouldShowChaseInstantCreditCard: shouldShowChaseInstantCreditCard(state),
      shouldShowApplePay: _.get(state, 'app.applePay.applePayAvailability.isAvailable')
    }),
    {
      updateFormDataValueFn: FormDataActions.updateFormDataValue,
      onClickContinueButton: EarlyBirdActions.savePaymentInfoAndBackToPreviousPage,
      addHistoryBackToHomeFn: HistoryActions.addHistoryBackToHome
    }
  ),
  withPaymentEditMode({ fullScreenModalId: 'earlyBirdCreditCardUpdate' }, continueAsGuestForSessionExpiredFn)
);

export default enhancers(EarlyBirdPayment);
