import React from 'react';
import { shallow } from 'enzyme';

import { PurchaseSummarySecurityCodeHeader } from 'src/shared/components/purchaseSummarySecurityCodeHeader';

describe('PurchaseSummarySecurityCodeHeader', () => {
  const createComponent = (props = {}) => shallow(<PurchaseSummarySecurityCodeHeader {...props} />);

  context('When rendered', () => {
    let purchaseSummarySecurityCodeHeader;

    it('should not show PurchaseSummarySecurityCodeHeader when missingContactMethod is false and isSavedCreditCardThatRequiresCVVMissing is false', () => {
      purchaseSummarySecurityCodeHeader = createComponent({
        missingContactMethod: false,
        isSavedCreditCardThatRequiresCVVMissing: false,
        missingPaymentMethod: false,
        missingBillingAddress: false
      });
      expect(purchaseSummarySecurityCodeHeader.find('h4')).to.be.not.present();
    });

    it('should show contact required message when missingContactMethod is true and isSavedCreditCardThatRequiresCVVMissing is false', () => {
      purchaseSummarySecurityCodeHeader = createComponent({
        missingContactMethod: true,
        isSavedCreditCardThatRequiresCVVMissing: false,
        missingPaymentMethod: false,
        missingBillingAddress: false
      });
      expect(purchaseSummarySecurityCodeHeader.find('h4')).to.have.text('Almost there!');
      expect(purchaseSummarySecurityCodeHeader.find('p')).to.have.text(
        `Please check what's below and add any missing information.`
      );
    });

    it('should show contact required message when missingContactMethod is true and isSavedCreditCardThatRequiresCVVMissing is true', () => {
      purchaseSummarySecurityCodeHeader = createComponent({
        missingContactMethod: true,
        isSavedCreditCardThatRequiresCVVMissing: true,
        missingPaymentMethod: false,
        missingBillingAddress: false
      });
      expect(purchaseSummarySecurityCodeHeader.find('h4')).to.have.text('Almost there!');
      expect(purchaseSummarySecurityCodeHeader.find('p')).to.have.text(
        `Please check what's below and add any missing information, including CVV.`
      );
    });

    it('should show contact required message when missingContactMethod is false and isSavedCreditCardThatRequiresCVVMissing is true', () => {
      purchaseSummarySecurityCodeHeader = createComponent({
        missingContactMethod: false,
        isSavedCreditCardThatRequiresCVVMissing: true,
        missingPaymentMethod: false,
        missingBillingAddress: false
      });
      expect(purchaseSummarySecurityCodeHeader.find('h4')).to.have.text('Almost there!');
      expect(purchaseSummarySecurityCodeHeader.find('p')).to.have.text(
        `Please check what's below and add any missing information, including CVV.`
      );
    });

    it('should show payment method message when missingPaymentMethod is true', () => {
      purchaseSummarySecurityCodeHeader = createComponent({
        missingContactMethod: false,
        isSavedCreditCardThatRequiresCVVMissing: false,
        missingPaymentMethod: true,
        missingBillingAddress: false
      });
      expect(purchaseSummarySecurityCodeHeader.find('h4')).to.have.text('Almost there!');
      expect(purchaseSummarySecurityCodeHeader.find('p')).to.have.text(
        `Please check what's below and add any missing information.`
      );
    });

    it('should show billing address message when missingBillingAddress is true', () => {
      purchaseSummarySecurityCodeHeader = createComponent({
        missingContactMethod: false,
        isSavedCreditCardThatRequiresCVVMissing: false,
        missingPaymentMethod: false,
        missingBillingAddress: true
      });
      expect(purchaseSummarySecurityCodeHeader.find('h4')).to.have.text('Almost there!');
      expect(purchaseSummarySecurityCodeHeader.find('p')).to.have.text(
        `Please check what's below and add any missing information.`
      );
    });
  });
});
