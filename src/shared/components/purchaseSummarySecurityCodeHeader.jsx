// @flow

import React from 'react';
import i18n from '@swa-ui/locale';

type Props = {
  missingContactMethod?: boolean,
  isSavedCreditCardThatRequiresCVVMissing?: boolean,
  missingPaymentMethod?: boolean,
  missingBillingAddress?: boolean
};

export class PurchaseSummarySecurityCodeHeader extends React.PureComponent<Props> {
  _renderTextWithMessage = (message: string) => (
    <div className="p5 purchase-summary--message">
      <h4 className="xxlarge bold inline-block">{i18n('SHARED__PURCHASE_SUMMARY_FORM__MESSAGE_TITLE')}</h4>
      <p className="large">{message}</p>
    </div>
  );

  render() {
    const {
      missingContactMethod,
      isSavedCreditCardThatRequiresCVVMissing,
      missingPaymentMethod,
      missingBillingAddress
    } = this.props;

    if (!missingPaymentMethod && isSavedCreditCardThatRequiresCVVMissing) {
      return this._renderTextWithMessage(i18n('SHARED__PURCHASE_SUMMARY_FORM__MESSAGE_SECURITY_CODE_MISSING'));
    } else if (missingContactMethod) {
      return this._renderTextWithMessage(i18n('SHARED__PURCHASE_SUMMARY_FORM__MESSAGE_CONTACT_METHOD_MISSING'));
    } else if (missingPaymentMethod) {
      return this._renderTextWithMessage(i18n('SHARED__PURCHASE_SUMMARY_FORM__MESSAGE_PAYMENT_METHOD_MISSING'));
    } else if (missingBillingAddress) {
      return this._renderTextWithMessage(i18n('SHARED__PURCHASE_SUMMARY_FORM__MESSAGE_BILLING_ADDRESS_MISSING'));
    } else {
      return null;
    }
  }
}

export default PurchaseSummarySecurityCodeHeader;
