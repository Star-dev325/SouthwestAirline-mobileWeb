import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { ZERO_DOLLARS, ZERO_POINTS } from 'src/airChange/constants/airChangeConstants';
import RefundSummary from 'src/shared/components/refundSummary';
import RefundTypes from 'src/shared/constants/refundTypes';

const { HOLD_FUTURE_USE, BACK_TO_ORIGINAL_PAYMENT } = RefundTypes;

describe('refundSummary', () => {
  describe('from change confirmation page', () => {
    const fare = {
      amount: '82.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const nonRefundable = {
      item: 'Credit',
      fare,
      tax: null
    };

    const refundable = {
      item: 'Credit',
      fare,
      tax: null
    };

    it('should show Credit if we chose refund to credit card', () => {
      const { container } = createComponent({
        refundable,
        refundMethod: BACK_TO_ORIGINAL_PAYMENT,
        isEvenExchange: false,
        isConfirmationPage: true
      });
      
      const topMessage = container.querySelector('.refund-total-item--message');
      const bottomMessage = container.querySelector('.refund-total-item--bottom-message');
      
      expect(topMessage.textContent).toBe('Credit');
      expect(bottomMessage.textContent).toBe('SHARED__REFUND_METHOD__REFUNDED_TO_CREDIT_CARD');
    });

    it('should show Credit if we chose hold for future use', () => {
      const { container } = createComponent({
        nonRefundable,
        refundMethod: HOLD_FUTURE_USE,
        isEvenExchange: false,
        isConfirmationPage: true
      });
 
      const topMessage = container.querySelector('.refund-total-item--message');
      const bottomMessage = container.querySelector('.refund-total-item--bottom-message');

      expect(topMessage.textContent).toBe('Credit');
      expect(bottomMessage.textContent).toBe('SHARED__REFUND_METHOD__HELD_FOR_FUTURE_USE');
    });

    it('should show 2 items of Credit you if there are both nonRefundable and Refundable and we choose hold for future use', () => {
      const { container } = createComponent({
        nonRefundable,
        refundable,
        refundMethod: HOLD_FUTURE_USE,
        isEvenExchange: false,
        isConfirmationPage: true
      });

      const topMessage = container.querySelectorAll('.refund-total-item--message');
      const bottomMessage = container.querySelectorAll('.refund-total-item--bottom-message');

      expect(topMessage[0].textContent).toBe('Credit');
      expect(bottomMessage[0].textContent).toBe('SHARED__REFUND_METHOD__HELD_FOR_FUTURE_USE');
      expect(topMessage[1].textContent).toBe('Credit');
      expect(bottomMessage[1].textContent).toBe('SHARED__REFUND_METHOD__HELD_FOR_FUTURE_USE');
    });

    it('should show Credit twice if there are both nonRefundable and Refundable and we choose refund to credit card', () => {
      const { container } = createComponent({
        nonRefundable,
        refundable,
        refundMethod: BACK_TO_ORIGINAL_PAYMENT,
        isEvenExchange: false,
        isConfirmationPage: true
      });

      const topMessage = container.querySelectorAll('.refund-total-item--message');
      const bottomMessage = container.querySelectorAll('.refund-total-item--bottom-message');

      expect(topMessage[0].textContent).toBe('Credit');
      expect(bottomMessage[0].textContent).toBe('SHARED__REFUND_METHOD__REFUNDED_TO_CREDIT_CARD');
      expect(topMessage[1].textContent).toBe('Credit');
      expect(bottomMessage[1].textContent).toBe('SHARED__REFUND_METHOD__HELD_FOR_FUTURE_USE');
    });
  });

  describe('refundable amount', () => {
    const fare = {
      amount: '82.00',
      currencyCode: 'USD',
      currencySymbol: '$'
    };

    const newAmountDue = {
      item: 'Amount due',
      fare,
      tax: null
    };

    const nonRefundable = {
      item: 'Credit',
      fare,
      tax: null
    };

    const refundable = {
      item: 'Credit',
      fare,
      tax: null
    };

    it('should show Credit if we chose refund to credit card', () => {
      const { container } = createComponent({
        refundable,
        refundMethod: BACK_TO_ORIGINAL_PAYMENT,
        isEvenExchange: false
      });

      const topMessage = container.querySelector('.refund-total-item--message');
      const bottomMessage = container.querySelector('.refund-total-item--bottom-message');

      expect(topMessage.textContent).toBe('Credit');
      expect(bottomMessage.textContent).toBe('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
    });

    it('should show Credit if we chose hold for future use', () => {
      const { container } = createComponent({
        nonRefundable,
        refundMethod: HOLD_FUTURE_USE,
        isEvenExchange: false
      });

      const topMessage = container.querySelector('.refund-total-item--message');
      const bottomMessage = container.querySelector('.refund-total-item--bottom-message');

      expect(topMessage.textContent).toBe('Credit');
      expect(bottomMessage.textContent).toBe('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
    });

    it('should show 2 items of Credit you if there are both nonRefundable and Refundable and we choose hold for future use', () => {
      const { container } = createComponent({
        nonRefundable,
        refundable,
        refundMethod: HOLD_FUTURE_USE,
        isEvenExchange: false
      });

      const topMessage = container.querySelectorAll('.refund-total-item--message');
      const bottomMessage = container.querySelectorAll('.refund-total-item--bottom-message');

      expect(topMessage[0].textContent).toBe('Credit');
      expect(bottomMessage[0].textContent).toBe('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
      expect(topMessage[1].textContent).toBe('Credit');
      expect(bottomMessage[1].textContent).toBe('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
    });

    it('should show Credit twice if there are both nonRefundable and Refundable and we choose refund to credit card', () => {
      const { container } = createComponent({
        nonRefundable,
        refundable,
        refundMethod: BACK_TO_ORIGINAL_PAYMENT,
        isEvenExchange: false
      });

      const topMessage = container.querySelectorAll('.refund-total-item--message');
      const bottomMessage = container.querySelectorAll('.refund-total-item--bottom-message');

      expect(topMessage[0].textContent).toBe('Credit');
      expect(bottomMessage[0].textContent).toBe('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
      expect(topMessage[1].textContent).toBe('Credit');
      expect(bottomMessage[1].textContent).toBe('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
    });

    it("should show Credit without bottom message if we don't chose anything", () => {
      const { container } = createComponent({ refundable, refundMethod: '' });

      const topMessage = container.querySelector('.refund-total-item--message');
      const bottomMessage = container.querySelector('.refund-total-item--bottom-message');

      expect(topMessage.textContent).toBe('Credit');
      expect(container).not.toHaveClass(bottomMessage);
    });

    it('should show total without bottom message and needAdditionalPay if it is upgrade', () => {
      const { container } = createComponent({ newAmountDue, refundMethod: '' });
      
      const topMessage = container.querySelector('.refund-total-item--message');

      expect(topMessage.textContent).toBe(newAmountDue.item);
    });
  });

  describe('even exchange for dollar booking', () => {
    it('should show the refund total item as zero dollars for an even exchange dollars booking', () => {
      const amount = ZERO_DOLLARS.fare;
      const mockNewAmountDue = { fare: amount, item: 'Amount due' };
      const { container } = createComponent({ newAmountDue: mockNewAmountDue, purchaseWithPoints: false });

      const topMessage = container.querySelector('.refund-total-item--message');
      const totalAmount = container.querySelector('[data-qa="total-amount"]');
      const currencySymbol = container.querySelector('.money-sign');

      expect(topMessage.textContent).toBe(mockNewAmountDue.item);
      expect(totalAmount.textContent).toBe(mockNewAmountDue.fare.amount);
      expect(currencySymbol.textContent).toBe(mockNewAmountDue.fare.currencySymbol);
    });
  });

  describe('downgrade for points', () => {
    it('should show refund total item with points downgrade and tax dollar downgrade', () => {
      const mockRefundable = {
        item: 'Credit',
        fare: {
          amount: '150',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const mockNonRefundable = {
        item: 'Credit',
        fare: null,
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const { container } = createComponent({
        refundable: mockRefundable,
        nonRefundable: mockNonRefundable,
        newAmountDue: null,
        purchaseWithPoints: true,
        refundMethod: BACK_TO_ORIGINAL_PAYMENT
      });

      const bottomMessage = container.querySelectorAll('.refund-total-item--bottom-message');
      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');

      expect(bottomMessage[0].textContent).toBe('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
      expect(bottomMessage[1].textContent).toBe('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
      expect(totalAmount[0].textContent).toBe(mockRefundable.fare.amount);
      expect(totalAmount[1].textContent).toBe(mockRefundable.tax.amount);
      expect(totalAmount[2].textContent).toBe(mockRefundable.tax.amount);
    });

    it('should show refund total item with points downgrade only when tax dollars even', () => {
      const mockRefundable = {
        item: 'Credit',
        fare: {
          amount: '150',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: null
      };
      const { container } = createComponent({
        refundable: mockRefundable,
        purchaseWithPoints: true,
        refundMethod: BACK_TO_ORIGINAL_PAYMENT
      });
   
      const refundSummary = container.querySelectorAll('.refund-total-item--message');
      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
      const bottomMessage = container.querySelector('.refund-total-item--bottom-message');

      expect(refundSummary.length).toBe(1);
      expect(totalAmount[0].textContent).toBe(mockRefundable.fare.amount);
      expect(container).not.toHaveClass(bottomMessage);
    });

    it('should show refund total item with points downgrade and tax dollars upgrade', () => {
      const mockRefundable = {
        item: 'Credit',
        fare: {
          amount: '150',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: null
      };
      const mockNewAmountDue = {
        fare: null,
        item: 'Amount due',
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const { container } = createComponent({
        refundable: mockRefundable,
        nonRefundable: null,
        newAmountDue: mockNewAmountDue,
        purchaseWithPoints: true,
        refundMethod: BACK_TO_ORIGINAL_PAYMENT
      });
      
      const refundSummary = container.querySelectorAll('.refund-total-item--message');
      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
      const topMessage = container.querySelectorAll('.refund-total-item--message');

      expect(refundSummary.length).toBe(2);
      expect(totalAmount[0].textContent).toBe(mockRefundable.fare.amount);
      expect(totalAmount[1].textContent).toBe(mockNewAmountDue.tax.amount);
      expect(topMessage[0].textContent).toBe('Credit');
      expect(topMessage[1].textContent).toBe('Amount due');
    });
  });

  describe('even exchange for points', () => {
    it('should show the refund total item as zero points', () => {
      const amount = ZERO_POINTS.fare;
      const mockNewAmountDue = { fare: amount, item: 'Amount due' };
      const { container } = createComponent({ newAmountDue: mockNewAmountDue, purchaseWithPoints: true });

      const totalAmount = container.querySelector('[data-qa="total-amount"]');
      const topMessage = container.querySelector('.refund-total-item--message');

      expect(totalAmount.textContent).toBe(mockNewAmountDue.fare.amount);
      expect(topMessage.textContent).toBe(mockNewAmountDue.item);
    });

    it('should show the refund total item for tax dollars downgrade', () => {
      const mockNewAmountDue = {
        fare: ZERO_POINTS.fare,
        item: 'Amount due',
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const mockRefundable = {
        item: 'Credit',
        fare: null,
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const mockNonRefundable = {
        item: 'Credit',
        fare: null,
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const { container } = createComponent({
        refundable: mockRefundable,
        nonRefundable: mockNonRefundable,
        newAmountDue: mockNewAmountDue,
        purchaseWithPoints: true
      });

      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');

      expect(totalAmount[0].textContent).toBe(mockRefundable.tax.amount);
      expect(totalAmount[1].textContent).toBe(mockNonRefundable.tax.amount);
      expect(totalAmount[2].textContent).toBe(mockNewAmountDue.fare.amount);
    });

    it('should show the amount due total item for tax dollars even', () => {
      const mockNewAmountDue = {
        item: 'Amount Due',
        fare: {
          amount: '0',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: null
      };
      const { container } = createComponent({
        refundable: null,
        nonRefundable: null,
        newAmountDue: mockNewAmountDue,
        purchaseWithPoints: true
      });

      const refundSummary = container.querySelectorAll('.refund-total-item--message');
      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
      const topMessage = container.querySelector('.refund-total-item--message');

      expect(refundSummary.length).toBe(1);
      expect(totalAmount[0].textContent).toBe(mockNewAmountDue.fare.amount);
      expect(topMessage.textContent).toBe(mockNewAmountDue.item);
    });

    it('should show the refund total item for tax dollars upgrade', () => {
      const amount = ZERO_POINTS.fare;
      const tax = {
        amount: '2.50',
        currencyCode: 'USD',
        currencySymbol: '$'
      };
      const mockNewAmountDue = { fare: amount, item: 'Amount due', tax };
      const { container } = createComponent({ newAmountDue: mockNewAmountDue, purchaseWithPoints: true });
  
      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
      const topMessage = container.querySelectorAll('.refund-total-item--message');

      expect(totalAmount[0].textContent).toBe(mockNewAmountDue.fare.amount);
      expect(topMessage[0].textContent).toBe(mockNewAmountDue.item);
      expect(totalAmount[1].textContent).toBe(mockNewAmountDue.tax.amount);
      expect(topMessage[1].textContent).toBe(mockNewAmountDue.item);
    });
  });

  describe('upgrade for points', () => {
    it('should show points owed and taxes downgrade', () => {
      const mockRefundable = {
        item: 'Credit',
        fare: null,
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const mockNewAmountDue = {
        item: 'Amount due',
        fare: {
          amount: '2000',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: null
      };
      const { container } = createComponent({
        refundable: mockRefundable,
        nonRefundable: null,
        newAmountDue: mockNewAmountDue,
        purchaseWithPoints: true
      });

      const refundSummary = container.querySelectorAll('.refund-total-item--message');
      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
      const topMessage = container.querySelectorAll('.refund-total-item--message');

      expect(refundSummary.length).toBe(2);
      expect(totalAmount[0].textContent).toBe(mockRefundable.tax.amount);
      expect(totalAmount[1].textContent).toBe(mockNewAmountDue.fare.amount);
      expect(topMessage[0].textContent).toBe(mockRefundable.item);
      expect(topMessage[1].textContent).toBe(mockNewAmountDue.item);
    });

    it('should show points owed and mix refundable taxes downgrade', () => {
      const mockRefundable = {
        item: 'Credit',
        fare: null,
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const mockNonRefundable = {
        item: 'Credit',
        fare: null,
        tax: {
          amount: '3.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const mockNewAmountDue = {
        item: 'Amount due',
        fare: {
          amount: '2000',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: null
      };
      const { container } = createComponent({
        refundable: mockRefundable,
        nonRefundable: mockNonRefundable,
        newAmountDue: mockNewAmountDue,
        purchaseWithPoints: true
      });

      const refundSummary = container.querySelectorAll('.refund-total-item--message');
      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
      const topMessage = container.querySelectorAll('.refund-total-item--message');

      expect(refundSummary.length).toBe(3);
      expect(totalAmount[0].textContent).toBe(mockRefundable.tax.amount);
      expect(totalAmount[1].textContent).toBe(mockNonRefundable.tax.amount);
      expect(totalAmount[2].textContent).toBe(mockNewAmountDue.fare.amount);
      expect(topMessage[0].textContent).toBe(mockRefundable.item);
      expect(topMessage[1].textContent).toBe(mockNonRefundable.item);
      expect(topMessage[2].textContent).toBe(mockNewAmountDue.item);
    });

    it('should show points owed and taxes even', () => {
      const mockNewAmountDue = {
        item: 'Amount due',
        fare: {
          amount: '2000',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: null
      };
      const { container } = createComponent({
        refundable: null,
        nonRefundable: null,
        newAmountDue: mockNewAmountDue,
        purchaseWithPoints: true
      });

      const refundSummary = container.querySelectorAll('.refund-total-item--message');
      const totalAmount = container.querySelector('[data-qa="total-amount"]');
      const topMessage = container.querySelector('.refund-total-item--message');

      expect(refundSummary.length).toBe(1);
      expect(totalAmount.textContent).toBe(mockNewAmountDue.fare.amount);
      expect(topMessage.textContent).toBe(mockNewAmountDue.item);
    });

    it('should show points owed and taxes upgrade', () => {
      const mockNewAmountDue = {
        item: 'Amount due',
        fare: {
          amount: '2000',
          currencyCode: 'PTS',
          currencySymbol: ''
        },
        tax: {
          amount: '2.50',
          currencyCode: 'USD',
          currencySymbol: '$'
        }
      };
      const { container } = createComponent({
        refundable: null,
        nonRefundable: null,
        newAmountDue: mockNewAmountDue,
        purchaseWithPoints: true
      });

      const totalAmount = container.querySelectorAll('[data-qa="total-amount"]');
      const topMessage = container.querySelectorAll('.refund-total-item--message');

      expect(totalAmount[0].textContent).toBe(mockNewAmountDue.fare.amount);
      expect(totalAmount[1].textContent).toBe(mockNewAmountDue.tax.amount);
      expect(topMessage[0].textContent).toBe(mockNewAmountDue.item);
      expect(topMessage[1].textContent).toBe(mockNewAmountDue.item);
    });
  });

  describe('brief notes', () => {
    const props = {
      refundable: null,
      nonRefundable: null,
      newAmountDue: {
        fare: {
          amount: '82.00',
          currencyCode: 'USD',
          currencySymbol: '$'
        },
        item: 'Amount due',
        tax: null
      },
      purchaseWithPoints: true
    };

    it('should show brief notes when showBriefNotes true', () => {
      const { container } = createComponent(props);

      const fareSummaryNote = container.querySelector('.air-change-price-total--fare-summary-note');

      expect(container).not.toHaveClass(fareSummaryNote);
    });

    it('should show brief notes when showBriefNotes true', () => {
      const { container } = createComponent({ ...props, showBriefNotes: true });

      const fareSummaryNote = container.querySelector('.air-change-price-total--fare-summary-note');

      expect(fareSummaryNote.textContent).toBe('SHARED__PRICE_TOTAL_EXPLANATORY_NOTE__BRIEF_NOTE');
    });
  });

  describe('travel funds', () => {
    it('should display the travel funds when both contain values', () => {
      const { container } = createComponent({
        totalDueNow: { item: '2131' },
        newAmountDue: { item: '4567' },
        travelFunds: { item: '1234' }
      });

      const travelFundsForm = container.querySelector('[data-qa="review-form--travel-funds"]');

      expect(travelFundsForm).not.toBeNull();
    });

    it('should not display the travel funds when missing totalDueNow', () => {
      const { container } = createComponent({
        newAmountDue: { item: '4567' },
        travelFunds: { item: '1234' }
      });

      const travelFundsForm = container.querySelector('[data-qa="review-form--travel-funds"]');

      expect(travelFundsForm).toBeNull();
    });

    it('should not display the travel funds when missing newAmountDue', () => {
      const { container } = createComponent({
        totalDueNow: { item: '2131' },
        travelFunds: { item: '1234' }
      });

      const travelFundsForm = container.querySelector('[data-qa="review-form--travel-funds"]');

      expect(travelFundsForm).toBeNull();
    });

    it('should not display the travel funds when missing travelFunds', () => {
      const { container } = createComponent({
        totalDueNow: { item: '2131' },
        newAmountDue: { item: '4567' }
      });

      const travelFundsForm = container.querySelector('[data-qa="review-form--travel-funds"]');

      expect(travelFundsForm).toBeNull();
    });
  });
});

const createComponent = (props) => render(<RefundSummary {...props} />);
