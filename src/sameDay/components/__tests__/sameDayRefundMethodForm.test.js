import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import SameDayRefundMethodForm from 'src/sameDay/components/sameDayRefundMethodForm';
import SameDayRefundMethodBuilder from 'test/builders/apiResponse/sameDayRefundMethodBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('SameDayRefundMethod', () => {
  describe('when rendering', () => {
    it('should show same day refund method form', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('should show same day refund method form when showRefundableSelection is enabled', () => {
      const { container } = createComponent({ showRefundableSelection: true });
      
      expect(container).toMatchSnapshot();
    });

    it('should show the tax refund when available', () => {
      const { fareSummary: { creditDue } } = new SameDayRefundMethodBuilder().withPointsEvenExchangeAndTaxCredit().build().sameDayRefundMethod;

      const { container } = createComponent({
        creditDue
      });

      expect(container).toMatchSnapshot();
    });
  });
  
  const createComponent = (props = {}) => {
    const { _links: { sameDayConfirmation } = {}, fareSummary, showRefundableSelection } = new SameDayRefundMethodBuilder().withShowRefundPage().build().sameDayRefundMethod ?? {};
    const { creditDue, creditInfoMessage, taxesAndFeesWithLinks } = fareSummary || {};

    const defaultProps = {
      className: '',
      creditDue,
      creditInfoMessage,
      formId: 'test',
      labelText: sameDayConfirmation?.labelText,
      onSubmit: jest.fn(),
      refundMethod: 'HOLD_FUTURE_USE',
      refundMethodLabels: ['HOLD_FUTURE_USE'],
      onRefundMethodFieldClick: jest.fn(),
      showRefundableSelection,
      taxesAndFeesWithLinks
    };

    return render(
      <Provider store={createMockedFormStore()}>
        <SameDayRefundMethodForm { ...defaultProps } {...props} />
      </Provider>
    );
  };
});