import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import RefundTotalItem from 'src/shared/components/refundTotalItem';

describe('RefundTotalItem', () => {
  it('should render the details based on the props given', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight',
      needAdditionalPay: true
    });

    const refundMessage = container.querySelector('.refund-total-item--message');
    const totalAmount = container.querySelector('[data-qa="total-amount"]');
    const bottomMessage = container.querySelector('[data-qa="bottom-message-left"]');
    const refundTotalBody = container.querySelector('.refund-total-item--body');

    expect(refundMessage.textContent).toBe('topMessage');
    expect(totalAmount.textContent).toBe('0.00');
    expect(bottomMessage.textContent).toBe('SHARED__REFUND_METHOD__REFUND_SUMMARY_EXPIRES: bottomMessageLeft');
    expect(refundTotalBody).not.toBeNull();
  });

  it('should show blue banner and top border when needAdditionalPay is false and amount due is 0', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight'
    });
    
    const refundTotalAmountDue = container.querySelector('.refund-total-item_amount-due');
   
    expect(refundTotalAmountDue).not.toBeNull();
  });

  it('should show blue banner and top border when needAdditionalPay is true', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '5.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight',
      needAdditionalPay: true
    });

    const refundTotalAmountDue = container.querySelector('.refund-total-item_amount-due');
   
    expect(refundTotalAmountDue).not.toBeNull();
  });

  it('should show green banner even when needAdditionalPay is false and amount due is 0 if forceBackgroundGreen is true', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight',
      forceBackgroundGreen: true
    });

    const refundTotalItemCredit = container.querySelector('.refund-total-item_credit');
    
    expect(refundTotalItemCredit).not.toBeNull();
  });

  it('should show green banner even when needAdditionalPay is true if forceBackgroundGreen is true', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '5.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight',
      needAdditionalPay: true,
      forceBackgroundGreen: true
    });

    const refundTotalItemCredit = container.querySelector('.refund-total-item_credit');
    
    expect(refundTotalItemCredit).not.toBeNull();
  });

  it('should render the topMessage as bold if boldTopMessage is true', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight',
      needAdditionalPay: true,
      boldTopMessage: true
    });

    const refundTotalItemMessage = container.querySelector('.refund-total-item--message');

    expect(refundTotalItemMessage).toHaveClass('bold');
  });

  it('should render the "Taxes and Fees" message if showTaxesAndFees is true', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight',
      needAdditionalPay: true,
      showTaxesAndFees: true
    });

    const refundTotalItemShowTaxes = container.querySelector('[data-qa="show-taxes-and-fees"]');
    
    expect(refundTotalItemShowTaxes.textContent).toBe('SHARED__REFUND_METHOD__REFUND_SUMMARY_TAXES_AND_FEES ');
  });

  it('should not render the "Taxes and Fees" message if showTaxesAndFees is false/unset', () => {
    const { container } = createComponent({
      topMessage: 'topMessage',
      amount: {
        amount: '0.00',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      bottomMessageLeft: 'bottomMessageLeft',
      bottomMessageRight: 'bottomMessageRight',
      needAdditionalPay: true
    });

    const refundTotalItemShowTaxes = container.querySelector('[data-qa="show-taxes-and-fees"]');
    
    expect(refundTotalItemShowTaxes).toBeNull();
  });
});

const createComponent = (props) => render(<RefundTotalItem {...props} />);