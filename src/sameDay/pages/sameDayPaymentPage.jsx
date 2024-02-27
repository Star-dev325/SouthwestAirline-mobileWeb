// @flow
import _ from 'lodash';
import { connect } from 'react-redux';
import { SAME_DAY_PAYMENT_FORM } from 'src/shared/constants/formIds';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as SameDayActions from 'src/sameDay/actions/sameDayActions';
import { getShouldShowApplePay } from 'src/sameDay/selectors/sameDayApplePaySelectors';
import PaymentForm from 'src/shared/form/components/paymentForm';
import React from 'react';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withPaymentEditMode from 'src/shared/enhancers/withPaymentEditMode';

import type {
  AccountContactInfoType,
  PaymentFormData,
  PaymentInfo,
  PaymentSavedCreditCards
} from 'src/shared/flow-typed/shared.types';

type Props = {
  isLoggedIn: boolean,
  onClickContinueButton: (paymentFormData: PaymentFormData) => void,
  paymentInfo: PaymentInfo,
  query: any,
  savedCreditCards?: PaymentSavedCreditCards,
  shouldShowApplePay?: boolean,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  userAddressInfo?: AccountContactInfoType
};

export const SameDayPaymentPage = (props: Props) => {
  const {
    isLoggedIn,
    onClickContinueButton,
    paymentInfo,
    query,
    updateFormDataValueFn,
    userAddressInfo,
    ...restProps
  } = props;

  const { airportsCode } = transformSearchToQuery(query);

  return (
    <div className="same-day-payment-page">
      <PaymentForm
        enableOperationOnCC={isLoggedIn}
        formId={SAME_DAY_PAYMENT_FORM}
        hideGhostCards
        hideSubmitSegment
        initialFormData={paymentInfo}
        onClickApplePayButton={onClickContinueButton}
        onClickPayPalButton={onClickContinueButton}
        onSubmit={onClickContinueButton}
        shouldEnableSaveCC={false}
        showEditHeader
        subTitle={airportsCode}
        supportModifyCountryCode
        updateFormDataValueFn={updateFormDataValueFn}
        userAddressInfo={userAddressInfo}
        {...restProps}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.app.account.isLoggedIn,
  paymentInfo: state.app.sameDay.sameDayPaymentPage,
  savedCreditCards: state.app.savedCreditCards,
  shouldShowApplePay: getShouldShowApplePay(state),
  userAddressInfo: _.get(state, 'app.account.accountInfo.contactInfo')
});

const mapDispatchToProps = {
  onClickContinueButton: SameDayActions.savePaymentInfoAndGoToReviewPage,
  updateFormDataValueFn: FormDataActions.updateFormDataValue
};

const enhancers = _.flowRight(
  connect(mapStateToProps, mapDispatchToProps),
  withBodyClass('hide-header'),
  withPaymentEditMode({ enableRelogin: false, fullScreenModalId: 'sameDayCreditCardUpdate' })
);

export default enhancers(SameDayPaymentPage);
