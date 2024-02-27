import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import RefundInfoPerType from 'src/shared/components/refundInfoPerType';

describe('refundInfoType', () => {
  const amount = {
    amount: '477.68',
    currencyCode: 'USD',
    currencySymbol: '$'
  };

  it('should show correct default information', () => {
    const { container } = createComponent();

    expect(container.querySelector('.price-line--title').textContent).toBe('Amount due');
    expect(container.querySelector('.money-sign').textContent).toBe('$');
    expect(container.querySelector('[data-qa="total-amount"]').textContent).toBe(amount.amount);
    expect(container.querySelector('.refund-info-per-type--price-total-line_credit')).not.toBeNull();

    expect(container.querySelector('p').textContent).toBe(
      `SHARED__REFUND_METHOD__REFUND_INFO_NEVER_CHARGE_FEESSHARED__REFUND_METHOD__REFUND_INFO_ONLY_PAY_DIFFERENCE`
    );
  });

  it('should show blue text when user needs additional pay', () => {
    const { container } = createComponent({ needAdditionalPay: true });

    expect(container).not.toHaveClass('refund-info-per-type--price-total-line_credit');
  });

  it('should not show refund message when pass hideRefundMessage', () => {
    const { container } = createComponent({ hideRefundMessage: true });

    expect(container.querySelector('.refund-info-per-type').textContent).not.toBe('Amount due');
  });

  it('should show amount due and tax amount when pass taxAmount', () => {
    const pointsAmountDueWithTax = {
      label: 'Amount due',
      amount: {
        amount: '477.68',
        currencyCode: 'PTS',
        currencySymbol: '$'
      },
      taxAmount: {
        amount: '2.50',
        currencyCode: 'USD',
        currencySymbol: '$'
      }
    };
    const { container } = createComponent({ ...pointsAmountDueWithTax });
    const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
    
    expect(totalAmount[0].textContent).toBe(pointsAmountDueWithTax.amount.amount);
    expect(totalAmount[1].textContent).toBe(pointsAmountDueWithTax.taxAmount.amount);
  });
});

const createComponent = (props) => {
  const defaultProps = {
    label: 'Amount due',
    amount: {
      amount: '477.68',
      currencyCode: 'USD',
      currencySymbol: '$'
    },
    className: 'className'
  };
  const combinedProps = {
    ...defaultProps,
    ...props
  };

  return render(<RefundInfoPerType {...combinedProps} />);
};