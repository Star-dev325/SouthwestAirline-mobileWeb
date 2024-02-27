// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import { UPGRADED_BOARDING_PAYMENT_EDIT_FORM } from 'src/shared/constants/formIds';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withPaymentEditMode from 'src/shared/enhancers/withPaymentEditMode';
import PaymentForm from 'src/shared/form/components/paymentForm';
import { getShouldShowApplePay } from 'src/shared/selectors/upgradedBoardingSelector';
import * as UpgradedBoardingActions from 'src/upgradedBoarding/actions/upgradedBoardingActions';

import type {
  AccountContactInfoType,
  PaymentFormData,
  PaymentInfo,
  PaymentSavedCreditCards
} from 'src/shared/flow-typed/shared.types';

type Props = {
  isLoggedIn: boolean,
  paymentInfo?: PaymentInfo,
  savedCreditCards?: PaymentSavedCreditCards,
  userAddressInfo?: AccountContactInfoType,
  shouldShowApplePay: boolean,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  onClickContinueButton?: (paymentInfo: PaymentFormData) => void
};

export const UpgradedBoardingPaymentPage = (props: Props) => {
  const {
    isLoggedIn,
    paymentInfo,
    savedCreditCards,
    userAddressInfo,
    updateFormDataValueFn,
    onClickContinueButton,
    ...restProps
  } = props;

  return (
    <div className="payment-edit">
      <PaymentForm
        formId={UPGRADED_BOARDING_PAYMENT_EDIT_FORM}
        hideSubmitSegment
        showEditHeader
        onSubmit={onClickContinueButton}
        enableOperationOnCC={isLoggedIn}
        initialFormData={paymentInfo}
        formData={paymentInfo}
        onClickPayPalButton={onClickContinueButton}
        onClickApplePayButton={onClickContinueButton}
        supportModifyCountryCode
        userAddressInfo={userAddressInfo}
        updateFormDataValueFn={updateFormDataValueFn}
        savedCreditCards={savedCreditCards}
        {...restProps}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: _.get(state, 'app.account.isLoggedIn', false),
  paymentInfo: _.get(state, 'app.upgradedBoarding.upgradedBoardingPage.paymentInfo'),
  savedCreditCards: _.get(state, 'app.savedCreditCards'),
  userAddressInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
  shouldShowApplePay: getShouldShowApplePay(state)
});
const mapDispatchToProps = {
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  onClickContinueButton: UpgradedBoardingActions.savePaymentInfoAndBackToPreviousPage
};

const enhancers = _.flowRight(
  withBodyClass(['hide-header', 'payment-edit-page']),
  connect(mapStateToProps, mapDispatchToProps),
  withPaymentEditMode({ fullScreenModalId: 'upgradedBoardingCreditCardUpdate', enableRelogin: false })
);

export default enhancers(UpgradedBoardingPaymentPage);
