import { render } from '@testing-library/react';
import React from 'react';
import AirChangeRefundInfo from 'src/airChange/components/airChangeRefundInfo';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('air change refund info', () => {
  describe('purchase with Dollars', () => {
    const amountDue = {
      fare: {
        amount: '0.80',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      item: 'Amount Due',
      tax: null
    };
    const nonRefundable = {
      fare: {
        amount: '477.68',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      item: 'Credit',
      tax: null
    };
    const refundable = {
      fare: {
        amount: '477.68',
        currencyCode: 'USD',
        currencySymbol: '$'
      },
      item: 'Credit',
      tax: null
    };

    it('should show you additional amount due for dollar booking', () => {
      const { container } = createComponent({
        purchaseWithPoints: false
      });

      expect(container.querySelector('[data-qa="additional-amount-due"]')).toBeNull();
    });

    describe('even exchange', () => {
      it('should show Amount Due zero dollars for dollar booking', () => {
        const amountDue = {
          fare: {
            amount: '0.00',
            currencyCode: 'USD',
            currencySymbol: '$'
          },
          item: 'Amount Due',
          tax: null
        };
        const { container, getByText } = createComponent({
          amountDue,
          purchaseWithPoints: false
        });

        expect(container.querySelector('.refund-method')).toBeNull();
        expect(getByText(amountDue.fare.amount)).not.toBeNull();
        expect(getByText(amountDue.item)).not.toBeNull();
        expect(container.querySelector('.refund-info-per-type--price-total-line_credit')).not.toBeNull();
        expect(container.querySelector('[class="gray4 large block"')).not.toBeNull();
      });
    });

    describe('downgrade', () => {
      it('should show Credit when refundable is not empty', () => {
        const { container, getByText } = createComponent({
          amountDue: null,
          nonRefundable: null,
          refundable
        });

        expect(container.querySelector('[data-qa="travel-funds-refund-info"]')).toBeNull();
        expect(getByText(refundable.fare.amount)).not.toBeNull();
      });

      it('should show 2 RefundInfoPerTypes when both refundable and nonRefundable are not empty', () => {
        const { container, getAllByText } = createComponent({
          amountDue: null,
          nonRefundable,
          refundable
        });

        expect(container.querySelector('.refund-method')).not.toBeNull();
        expect(getAllByText(refundable.fare.amount)).not.toBeNull();
        expect(getAllByText(refundable.item)).not.toBeNull();
        expect(getAllByText(nonRefundable.fare.amount).length).toBe(2);
        expect(getAllByText(nonRefundable.item).length).toBe(2);
      });

      it('should show Credit message when nonrefundable is not empty', () => {
        const { getByText } = createComponent({
          amountDue: null,
          nonRefundable,
          refundable: null
        });

        expect(getByText(nonRefundable.fare.amount)).not.toBeNull();
        expect(getByText('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE')).not.toBeNull();
      });

      it('should not contain RefundMethod when refundable is not existed', () => {
        const { container } = createComponent({
          amountDue: null,
          nonRefundable,
          refundable: null
        });

        expect(container.querySelector('.refund-method')).toBeNull();
      });
    });

    describe('upgrade', () => {
      it('should show Amount due when is upgrade', () => {
        const { container, getByText } = createComponent({
          amountDue,
          nonRefundable: null,
          refundable: null
        });

        expect(container.querySelector('.refund-method')).toBeNull();
        expect(getByText(amountDue.fare.amount)).not.toBeNull();
        expect(container.querySelector('.refund-info-per-type--price-total-line_credit')).toBeNull();
      });
    });
  });

  describe('purchaseWithPoints', () => {
    it('should not show RefundMethod section for points booking', () => {
      const { container } = createComponent({
        purchaseWithPoints: true
      });

      expect(container.querySelector('.refund-method')).toBeNull();
    });

    describe('downgrade', () => {
      it('should show tax refundable and nonRefundable credit for tax downgrade', () => {
        const mockNonRefund = {
          fare: null,
          item: 'Credit',
          tax: {
            amount: '3.60',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const mockRefund = {
          fare: {
            amount: '100',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Credit',
          tax: {
            amount: '2.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const { container, getByText } = createComponent({
          amountDue: null,
          nonRefundable: mockNonRefund,
          purchaseWithPoints: true,
          refundable: mockRefund
        });

        expect(container.querySelector('.refund-method')).not.toBeNull();
        expect(getByText(mockRefund.fare.amount)).not.toBeNull();
        expect(getByText(mockRefund.tax.amount)).not.toBeNull();
        expect(container.querySelector('.refund-info-per-type--price-total-line_credit')).not.toBeNull();
        expect(container.querySelector('[class="gray4 large block"')).not.toBeNull();
        expect(
          container.querySelector('[data-qa="travel-funds-refund-info"]').querySelector('[class="large gray4"]')
            .textContent
        ).toBe('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
      });

      it('should show air change refund info for tax even exchange', () => {
        const mockRefund = {
          fare: {
            amount: '1000',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Credit',
          tax: null
        };
        const { container, getByText } = createComponent({
          purchaseWithPoints: true,
          refundable: mockRefund
        });

        expect(container.querySelector('.refund-method')).toBeNull();
        expect(getByText(mockRefund.fare.amount)).not.toBeNull();
        expect(getByText(mockRefund.item)).not.toBeNull();
        expect(container.querySelectorAll('.refund-info-per-type').length).toBe(1);
      });

      it('should show amount due for tax upgrade ', () => {
        const mockAmountDue = {
          fare: null,
          item: 'Amount due',
          tax: {
            amount: '2.50',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const mockRefund = {
          fare: {
            amount: '1000',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Credit',
          tax: null
        };
        const { container, getByText } = createComponent({
          amountDue: mockAmountDue,
          nonRefundable: null,
          purchaseWithPoints: true,
          refundable: mockRefund
        });

        expect(container.querySelector('.refund-method')).toBeNull();
        expect(getByText(mockRefund.fare.amount)).not.toBeNull();
        expect(getByText(mockRefund.item)).not.toBeNull();
        expect(getByText(mockAmountDue.tax.amount)).not.toBeNull();
        expect(getByText(mockAmountDue.item)).not.toBeNull();
        expect(container.querySelector('.refund-info-per-type--price-total-line_credit')).not.toBeNull();
        expect(container.querySelector('gray4 large block')).toBeNull();
      });
    });

    describe('even exchange', () => {
      it('should show refundable and nonRefundable credit for mixed refundable tax downgrade', () => {
        const mockAmountDue = {
          fare: {
            amount: '0',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Amount due',
          tax: null
        };
        const mockNonRefund = {
          fare: null,
          item: 'Credit',
          tax: {
            amount: '3.60',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const mockRefund = {
          fare: null,
          item: 'Credit',
          tax: {
            amount: '2.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const { container } = createComponent({
          amountDue: mockAmountDue,
          nonRefundable: mockNonRefund,
          purchaseWithPoints: true,
          refundable: mockRefund
        });

        expect(container).toMatchSnapshot();
      });

      it('should show 0 points due for tax even exchange', () => {
        const mockAmountDue = {
          fare: {
            amount: '0',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Amount Due',
          tax: null
        };
        const { container } = createComponent({
          amountDue: mockAmountDue,
          purchaseWithPoints: true
        });

        expect(container).toMatchSnapshot();
      });

      it('should show Amount due tax when tax upgrade', () => {
        const mockAmountDue = {
          fare: {
            amount: '0',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Amount Due',
          tax: {
            amount: '2.80',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const { container } = createComponent({
          amountDue: mockAmountDue,
          purchaseWithPoints: true
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('upgrade', () => {
      it('should show amount due and tax amount when mixed tax downgrade', () => {
        const mockAmountDue = {
          fare: {
            amount: '2000',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Amount due',
          tax: null
        };
        const mockNonRefund = {
          fare: null,
          item: 'Credit',
          tax: {
            amount: '3.50',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const mockRefund = {
          fare: null,
          item: 'Credit',
          tax: {
            amount: '2.50',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const { container } = createComponent({
          amountDue: mockAmountDue,
          nonRefundable: mockNonRefund,
          purchaseWithPoints: true,
          refundable: mockRefund
        });

        expect(container).toMatchSnapshot();
      });

      it('should show amount due and tax amount when tax even', () => {
        const mockAmountDue = {
          fare: {
            amount: '2000.00',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Amount due',
          tax: null
        };
        const { container } = createComponent({
          amountDue: mockAmountDue,
          nonRefundable: null,
          purchaseWithPoints: true,
          refundable: null
        });

        expect(container).toMatchSnapshot();
      });

      it('should show amount due and tax amount when tax upgrade', () => {
        const mockAmountDue = {
          fare: {
            amount: '2000',
            currencyCode: 'PTS',
            currencySymbol: ''
          },
          item: 'Amount due',
          tax: {
            amount: '2.50',
            currencyCode: 'USD',
            currencySymbol: '$'
          }
        };
        const { container } = createComponent({
          amountDue: mockAmountDue,
          nonRefundable: null,
          refundable: null
        });

        expect(container).toMatchSnapshot();
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {};
    const MockedForm = createMockedForm(createMockedFormStore(), {});

    return render(
      <MockedForm>
        <AirChangeRefundInfo {...defaultProps} {...props} />
      </MockedForm>
    );
  };
});
