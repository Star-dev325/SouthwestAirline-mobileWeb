// @flow
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import PaymentForm from 'src/shared/form/components/paymentForm';
import withPaymentEditMode from 'src/shared/enhancers/withPaymentEditMode';
import { AIR_CHANGE_PAYMENT_FORM } from 'src/shared/constants/formIds';
import * as AirChangeActions from 'src/airChange/actions/airChangeActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import withBodyClass from 'src/shared/enhancers/withBodyClass';
import { transformSearchToQuery } from 'src/shared/helpers/pathUtils';

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
  query: *,
  onMakePrimaryCreditCard: (string) => void,
  onUpdateCreditCard: (string) => void,
  onDeleteCreditCards: (Array<string>) => void,
  onClickContinueButton: (PaymentFormData) => void,
  userAddressInfo?: AccountContactInfoType,
  updateFormDataValueFn: (formId: string, fieldValues: *) => void,
  shouldShowApplePay?: boolean
};

export class AirChangePaymentPage extends React.Component<Props> {
  render() {
    const {
      onClickContinueButton,
      query,
      isLoggedIn,
      paymentInfo,
      userAddressInfo,
      updateFormDataValueFn,
      ...restProps
    } = this.props;
    const { airportsCode } = transformSearchToQuery(query);

    return (
      <div className="payment">
        <PaymentForm
          enableOperationOnCC={isLoggedIn}
          formId={AIR_CHANGE_PAYMENT_FORM}
          hideGhostCards
          hideSubmitSegment
          initialFormData={paymentInfo}
          onClickApplePayButton={onClickContinueButton}
          onClickPayPalButton={onClickContinueButton}
          onSubmit={onClickContinueButton}
          showEditHeader
          subTitle={airportsCode}
          supportModifyCountryCode
          updateFormDataValueFn={updateFormDataValueFn}
          userAddressInfo={userAddressInfo}
          {...restProps}
        />
      </div>
    );
  }
}

const enhancers = _.flowRight(
  withBodyClass('hide-header'),
  withPaymentEditMode({ fullScreenModalId: 'airChangeCreditCardUpdate', enableRelogin: false }),
  connect(
    (state) => ({
      savedCreditCards: state.app.savedCreditCards,
      paymentInfo: state.app.airChange.paymentInfo,
      isLoggedIn: state.app.account.isLoggedIn,
      userAddressInfo: _.get(state, 'app.account.accountInfo.contactInfo'),
      shouldShowApplePay: _.get(state, 'app.applePay.applePayAvailability.isAvailable')
    }),
    {
      updateFormDataValueFn: FormDataActions.updateFormDataValue,
      onClickContinueButton: AirChangeActions.savePaymentInfoAndGoToReviewPage
    }
  )
);

export default enhancers(AirChangePaymentPage);
