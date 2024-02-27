// @flow
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import PaymentForm from 'src/shared/form/components/paymentForm';
import * as CompanionActions from 'src/companion/actions/companionActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import withPaymentEditMode from 'src/shared/enhancers/withPaymentEditMode';
import { COMPANION_PAYMENT_EDIT_FORM } from 'src/shared/constants/formIds';

import type {
  PaymentFormData,
  PaymentSavedCreditCards,
  PaymentInfo,
  AccountContactInfoType
} from 'src/shared/flow-typed/shared.types';

type Props = {
  editMode: boolean,
  savedCreditCards: PaymentSavedCreditCards,
  paymentInfo: PaymentInfo,
  isLoggedIn: boolean,
  onMakePrimaryCreditCard: (string) => void,
  onUpdateCreditCard: (string) => void,
  onDeleteCreditCards: (Array<string>) => void,
  onClickContinueButton: (PaymentFormData) => void,
  userAddressInfo?: AccountContactInfoType,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  shouldShowApplePay?: boolean
};

export class CompanionPaymentEditPage extends React.Component<Props> {
  render() {
    const { onClickContinueButton, isLoggedIn, paymentInfo, userAddressInfo, updateFormDataValueFn, ...restProps } =
      this.props;

    return (
      <div>
        <PaymentForm
          formId={COMPANION_PAYMENT_EDIT_FORM}
          initialFormData={paymentInfo}
          onSubmit={onClickContinueButton}
          enableOperationOnCC={isLoggedIn}
          onClickPayPalButton={onClickContinueButton}
          onClickApplePayButton={onClickContinueButton}
          supportModifyCountryCode
          showEditHeader
          hideSubmitSegment
          userAddressInfo={userAddressInfo}
          updateFormDataValueFn={updateFormDataValueFn}
          {...restProps}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userAddressInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
  savedCreditCards: state.app.savedCreditCards,
  paymentInfo: state.app.companion.paymentInfo,
  isLoggedIn: state.app.account.isLoggedIn,
  shouldShowApplePay: _.get(state, 'app.applePay.applePayAvailability.isAvailable')
});

const mapDispatchToProps = {
  updateFormDataValueFn: FormDataActions.updateFormDataValue,
  onClickContinueButton: CompanionActions.savePaymentInfoAndBackToPreviousPage
};

const enhancers = _.flowRight(
  withBodyClass('hide-header'),
  withPaymentEditMode({ fullScreenModalId: 'companionCreditCardUpdate', enableRelogin: false }),
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhancers(CompanionPaymentEditPage);
