import { fireEvent } from '@testing-library/react';
import AirCancelRefundQuoteForm from 'src/airCancel/components/airCancelRefundQuoteForm';
import { transformToRefundQuoteFormData } from 'src/airCancel/transformers/refundQuoteFormTransformer';
import CancelRefundQuotePageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/cancelRefundQuotePageBuilder';
import { createComponentRender } from 'test/unit/helpers/testUtils';

describe('AirCancelRefundQuoteForm', () => {
  let defaultProps;
  let mergedProps;
  let onRefundOptionChangeStub, onSubmitStub;

  beforeEach(() => {
    onRefundOptionChangeStub = jest.fn();
    onSubmitStub = jest.fn();

    defaultProps = {
      formData: {},
      formId: 'FORMID',
      onRefundOptionChange: onRefundOptionChangeStub,
      onSubmit: onSubmitStub,
      recordLocatorLabel: 'Test Label',
      requireEmailReceipt: false
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Form', () => {
    it('should render with both refundable and nonrefundable funds and no email field', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      
      expect(container).toMatchSnapshot();
    });

    it('should render a blank email field if requireEmailReceipt is true, even if CHAPI sends a value for receiptEmail', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();

      cancelRefundQuotePage.requireEmailReceipt = true;
      cancelRefundQuotePage.receiptEmail = 'whatever@email.com';

      const { container } = createComponentRender(
        AirCancelRefundQuoteForm,
        createProps(cancelRefundQuotePage)
      );

      expect(container).toMatchSnapshot();
    });

    it('should not render refund info if tripTotals is null', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();

      cancelRefundQuotePage.tripTotals = null;

      const { container } = createComponentRender(
        AirCancelRefundQuoteForm,
        createProps(cancelRefundQuotePage));

      expect(container.querySelector('.cancel-refund-quote')).toBeNull();
    });

    it('should not render refund summary if refund values are null', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();

      cancelRefundQuotePage.refundableFunds = null;
      cancelRefundQuotePage.nonRefundableFunds = null;
      cancelRefundQuotePage.pointsToCreditTotal = null;
      cancelRefundQuotePage.pointsToCreditAccount = null;

      const { container } = createComponentRender(
        AirCancelRefundQuoteForm,
        createProps(cancelRefundQuotePage));

      expect(container.querySelector('.refund-summary')).toBeNull();
    });

    it('should render with only refundable funds', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withOnlyRefundableFunds().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.refund-total-item-currency').textContent).toEqual('$159.98');
      expect(container.querySelector('.refund-total-item--bottom-message').textContent).toEqual('');
    });

    it('should render with only nonrefundable funds', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withOnlyNonRefundableFunds().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.refund-total-item-currency').textContent).toEqual('$159.98');
      expect(container.querySelector('.refund-total-item--bottom-message').textContent).toEqual('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
    });

    it('should call onSubmit function when form is submitted', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().setRefundRequested(true).build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
    
      fireEvent.submit(container.querySelector('form'));
      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should render non-rev with a hardcoded refund to card message', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withNonRev().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      const refundSummary = container.querySelector('.refund-summary');

      expect(refundSummary.querySelector('.refund-total-item_credit')).not.toBeNull();
      expect(refundSummary.querySelector('.refund-total-item--bottom-message').textContent).toEqual('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
    });

    it('should set the value of the {formData: refundMethod} dropdown to HOLD_FUTURE_USE if refundRequested is false', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().setRefundRequested(false).build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.refund-total-item--bottom-message').textContent).toEqual('SHARED__REFUND_METHOD__HOLD_FOR_FUTURE_USE');
    });

    it('should set the value of the {formData: refundMethod} dropdown to BACK_TO_ORIGINAL_PAYMENT if refundRequested is true', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().setRefundRequested(true).build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.refund-total-item--bottom-message').textContent).toEqual('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
    });
  });

  describe('CancellationBoundsRefundInfo', () => {
    it('should render with both refundable and nonrefundable funds', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.price-amount').textContent).toEqual('$245.96');
    });

    it('should render with only refundable funds', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withOnlyRefundableFunds().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.price-amount').textContent).toEqual('$159.98');
    });

    it('should render with only nonrefundable funds', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withOnlyNonRefundableFunds().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.price-amount').textContent).toEqual('$159.98');
    });

    it('should render guestPasses for Non Revenune Pnr with guest Passes Present', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withNonRev().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      
      expect(container.querySelector('.guest-passes-review')).not.toBeNull();
    });

    it('should not render guestPasses for Revenue Pnr with guest Passes null', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.guest-passes-review')).toBeNull();
    });

    it('should render RefundSummaryForCancel even when guestPasses is null', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      
      expect(container.querySelector('.guest-passes-review')).toBeNull();
      expect(container.querySelector('.refund-summary')).not.toBeNull();
    });

    it('should render RefundSummaryForCancel even when guestPasses is present', () => {
      const guestPasses = {
        amount: null,
        currencyCode: null,
        currencySymbol: null,
        item: 'Nonrevenue Guest Pass(es)',
        itemSubText: 'Refund to Employee`s account'
      };
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps({ ...cancelRefundQuotePage, guestPasses }));
     
      expect(container.querySelector('.guest-passes-review')).not.toBeNull();
      expect(container.querySelector('.refund-summary')).not.toBeNull();
    });

    it('should render RefundTotalItem section with a bottom message when a sometext present in itemSubText of refundableFunds and when showRefundableSelection is false for non-rev', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withRefundableFundsSubText().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      const refundSummary = container.querySelector('.refund-total-item_credit');

      expect(refundSummary.querySelector('.refund-total-item--bottom-message').textContent).toEqual('Refund to method of payment');
    });

    it('should render RefundTotalItem section with hardCoded bottom message when refundableFunds has empty itemSubText and when showRefundableSelection is false for non-rev', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withRefundableFundsSubTextEmpty().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      const refundSummary = container.querySelector('.refund-total-item_credit');

      expect(refundSummary.querySelector('.refund-total-item--bottom-message').textContent).toEqual('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
    });

    it('should render RefundTotalItem with a hardCoded bottom message when itemSubText is not defined in refundableFunds and when showRefundableSelection for non-rev', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withRefundableFundsSubTextUndefined().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      const refundSummary = container.querySelector('.refund-total-item_credit');

      expect(refundSummary.querySelector('.refund-total-item--bottom-message').textContent).toEqual('SHARED__REFUND_METHOD__REFUND_TO_CREDIT_CARD');
    });

    it('should not render RefundMethod section for non-rev', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withNonRev().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container).toMatchSnapshot();
    });

    it('should not render guestPasses when guestPasses is null and refundableFunds are not null and nonrefundableFunds not null and with no email field', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));

      expect(container.querySelector('.guest-passes-review')).toBeNull();
    });

    it('should render the page correctly', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const { container } = createComponentRender(AirCancelRefundQuoteForm, createProps(cancelRefundQuotePage));
      
      expect(container).toMatchSnapshot();
    });
  });  

  const createProps = (cancelRefundQuotePage) => {
    const props = {
      bounds: cancelRefundQuotePage.cancelBounds,
      cancellationLink: cancelRefundQuotePage._links.cancelPolicies.href,
      guestPasses: cancelRefundQuotePage.guestPasses,
      initialFormData: transformToRefundQuoteFormData(cancelRefundQuotePage.refundRequested),
      nonRefundableFunds: cancelRefundQuotePage.nonRefundableFunds,
      passengers: cancelRefundQuotePage.passengers,
      pointsToCreditAccount: cancelRefundQuotePage.pointsToCreditAccount,
      pointsToCreditTotal: cancelRefundQuotePage.pointsToCreditTotal,
      recordLocator: cancelRefundQuotePage.recordLocator,
      refundableFunds: cancelRefundQuotePage.refundableFunds,
      showRefundableSelection: cancelRefundQuotePage.showRefundableSelection,
      tripTotals: cancelRefundQuotePage.tripTotals
    };
    const emailProps = {
      receiptEmail: cancelRefundQuotePage.receiptEmail,
      requireEmailReceipt: cancelRefundQuotePage.requireEmailReceipt
    };

    if (emailProps.requireEmailReceipt) {
      mergedProps = { ...defaultProps, ...props, ...emailProps  };
    } else {
      mergedProps = { ...props, ...defaultProps };
    }

    return { props: mergedProps };
  };
});
