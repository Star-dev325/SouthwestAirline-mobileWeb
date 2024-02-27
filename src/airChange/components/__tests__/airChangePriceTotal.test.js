import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import AirChangePriceTotal from 'src/airChange/components/airChangePriceTotal';
import PriceTotalBuilder from 'test/builders/model/priceTotalBuilder';
import { createMockStoreWithRouterMiddleware } from 'test/unit/helpers/createMockStore';

describe('Air Change Price Total', () => {
  describe('change header', () => {
    describe('by money', () => {
      it('should render even exchange header', () => {
        const givenProps = new PriceTotalBuilder().withEvenExchange().build();
        const amountOwed = givenProps.fareSummary.newAmountDue.fare.amount;
        const { container, getByText } = createComponent({ ...givenProps, shouldHidePriceBreakdown: true });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(3);
        expect(getByText('Original trip cost')).not.toBeNull();
        expect(elements[0].textContent).toBe('566.58');
        expect(getByText('New trip cost')).not.toBeNull();
        expect(elements[1].textContent).toBe('566.58');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[2].textContent).toBe(amountOwed);
        expect(container.querySelector('[data-qa="toggleBreakdown"]')).toBeNull();
      });

      it('should render upgrade header', () => {
        const givenProps = new PriceTotalBuilder().withUpgrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(3);
        expect(getByText('Original trip cost')).not.toBeNull();
        expect(elements[0].textContent).toBe('566.58');
        expect(getByText('New trip cost')).not.toBeNull();
        expect(elements[1].textContent).toBe('596.58');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[2].textContent).toBe('30.00');
        expect(container.querySelector('[data-qa="toggleBreakdown"]')).toBeNull();
      });

      it('should render refundable downgrade header', () => {
        const givenProps = new PriceTotalBuilder().withRefundableDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(3);
        expect(getByText('Original trip cost')).not.toBeNull();
        expect(elements[0].textContent).toBe('566.58');
        expect(getByText('New trip cost')).not.toBeNull();
        expect(elements[1].textContent).toBe('506.58');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[2].textContent).toBe('60.00');
      });

      it('should render split pay points downgrade and tax downgrade header', () => {
        const givenProps = new PriceTotalBuilder().withSplitPayDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(4);
        expect(getByText('Original trip Total')).not.toBeNull();
        expect(elements[0].textContent).toBe('252.65');
        expect(getByText('New trip Total')).not.toBeNull();
        expect(elements[1].textContent).toBe('107.00');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[2].textContent).toBe('2,257');
        expect(elements[3].textContent).toBe('132.05');
      });

      it('should render nonRefundable downgrade header', () => {
        const givenProps = new PriceTotalBuilder().withNonRefundableDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(3);
        expect(getByText('Original trip cost')).not.toBeNull();
        expect(elements[0].textContent).toBe('566.58');
        expect(getByText('New trip cost')).not.toBeNull();
        expect(elements[1].textContent).toBe('506.58');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[2].textContent).toBe('60.00');
      });

      it('should render both refundable and nonRefundable downgrade headers', () => {
        const givenProps = new PriceTotalBuilder().withRefundableAndNonRefundableDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(3);
        expect(getByText('Original trip cost')).not.toBeNull();
        expect(elements[0].textContent).toBe('566.58');
        expect(getByText('New trip cost')).not.toBeNull();
        expect(elements[1].textContent).toBe('506.58');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[2].textContent).toBe('60.00');
      });
    });

    describe('by points', () => {
      it('should render points even exchange and tax even exchange header', () => {
        const givenProps = new PriceTotalBuilder().withPointEvenExchange().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(5);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('2,814');
        expect(elements[3].textContent).toBe('5.60');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[4].textContent).toBe('0');
      });

      it('should render points upgrade and tax even exchange header', () => {
        const givenProps = new PriceTotalBuilder().withPointUpgrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(5);
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('15,149');
        expect(elements[3].textContent).toBe('5.60');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[4].textContent).toBe('12,335');
      });

      it('should render points downgrade and tax even exchange header', () => {
        const givenProps = new PriceTotalBuilder().withPointDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(5);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('2,479');
        expect(elements[3].textContent).toBe('5.60');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[4].textContent).toBe('335');
      });

      it('should render points even exchange and tax upgrade header', () => {
        const givenProps = new PriceTotalBuilder().withPointEvenExchange().withTaxUpgrade().build();
        const { container, getAllByText, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');
        const amountDueElements = getAllByText('Amount due');

        expect(elements.length).toBe(6);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('2,814');
        expect(elements[3].textContent).toBe('8.40');
        expect(amountDueElements[0]).not.toBeNull();
        expect(elements[4].textContent).toBe('0');
        expect(amountDueElements[1]).not.toBeNull();
        expect(elements[5].textContent).toBe('2.80');
      });

      it('should render points upgrade and tax upgrade header', () => {
        const givenProps = new PriceTotalBuilder().withPointUpgrade().withTaxUpgrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(6);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('15,149');
        expect(elements[3].textContent).toBe('8.40');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[4].textContent).toBe('12,335');
        expect(elements[5].textContent).toBe('2.80');
      });

      it('should render points downgrade and tax upgrade header', () => {
        const givenProps = new PriceTotalBuilder().withPointDowngrade().withTaxUpgrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(6);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('2,479');
        expect(elements[3].textContent).toBe('8.40');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[4].textContent).toBe('335');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[5].textContent).toBe('2.80');
      });

      it('should render points even exchange and tax downgrade header', () => {
        const givenProps = new PriceTotalBuilder().withPointEvenExchange().withTaxDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(6);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('2,814');
        expect(elements[3].textContent).toBe('4.20');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[4].textContent).toBe('0');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[5].textContent).toBe('1.40');
      });

      it('should render points upgrade and tax downgrade header', () => {
        const givenProps = new PriceTotalBuilder().withPointUpgrade().withTaxDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(6);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('15,149');
        expect(elements[3].textContent).toBe('4.20');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[4].textContent).toBe('1.40');
        expect(getByText('Amount due')).not.toBeNull();
        expect(elements[5].textContent).toBe('12,335');
      });

      it('should render points downgrade and tax downgrade header', () => {
        const givenProps = new PriceTotalBuilder().withPointDowngrade().withTaxDowngrade().build();
        const { container, getByText } = createComponent({ ...givenProps });
        const elements = container.querySelectorAll('[data-qa="total-amount"]');

        expect(elements.length).toBe(6);
        expect(getByText('Original trip total')).not.toBeNull();
        expect(elements[0].textContent).toBe('2,814');
        expect(elements[1].textContent).toBe('5.60');
        expect(getByText('New trip total')).not.toBeNull();
        expect(elements[2].textContent).toBe('2,479');
        expect(elements[3].textContent).toBe('4.20');
        expect(getByText('Credit')).not.toBeNull();
        expect(elements[4].textContent).toBe('335');
        expect(elements[5].textContent).toBe('1.40');
      });
    });

    describe('confirmation price total', () => {
      const mockChangeType = {
        downGrade: false,
        evenExchange: true,
        upGrade: false
      };

      it('should show total line when change flight with points', () => {
        const { title } = new PriceTotalBuilder().withPointsTotal().build();
        const { container } = createComponent({
          change: mockChangeType,
          isPointsChange: true,
          totals: title
        });
        const elements = container.querySelectorAll('.air-change-price-total--fare-summary');

        expect(elements.length).toBe(1);
      });

      it('should show total line when change flight without points', () => {
        const { title } = new PriceTotalBuilder().withPointsTotal().build();
        const { container } = createComponent({
          change: mockChangeType,
          isPointsChange: false,
          totals: title
        });
        const elements = container.querySelectorAll('.air-change-price-total--fare-summary');

        expect(elements.length).toBe(1);
      });

      it('should show total line when change flight without change', () => {
        const { title } = new PriceTotalBuilder().withPointDowngrade().withTaxDowngrade().build();
        const { container } = createComponent({ totals: title, change: undefined });
        const elements = container.querySelectorAll('.air-change-price-total--fare-summary');

        expect(elements.length).toBe(1);
      });
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {};
    const state = {
      app: {
        airChange: {},
        toggles: {
          EARLY_BIRD_AB_TESTING: false
        }
      }
    };
    const store = createMockStoreWithRouterMiddleware()(state);

    return render(
      <Provider store={store}>
        <AirChangePriceTotal {...defaultProps} {...props} ref={props.ref} />
      </Provider>
    );
  };
});
