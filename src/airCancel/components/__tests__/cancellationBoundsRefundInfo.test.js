import { render } from '@testing-library/react';
import React from 'react';
import CancellationBoundsRefundInfo from 'src/airCancel/components/cancellationBoundsRefundInfo';
import CancelRefundQuotePageBuilder from 'test/builders/apiResponse/v1/mobile-air-booking/page/cancel/cancelRefundQuotePageBuilder';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('cancellationBoundsRefundInfo', () => {
  const store = createMockedFormStore();

  const MockedForm = createMockedForm(store, {});

  describe('with dollar only', () => {
    it('should handle dollar properly', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().build();
      const props = {
        priceTotals: cancelRefundQuotePage.tripTotals
      };

      const cancellationBoundsRefundInfoContainer = createComponent(props);

      expect(cancellationBoundsRefundInfoContainer).toMatchSnapshot();
    });
  });

  describe('with points', () => {
    it('should handle points properly', () => {
      const { cancelRefundQuotePage } = new CancelRefundQuotePageBuilder().withPoints().build();
      const props = {
        priceTotals: cancelRefundQuotePage.tripTotals
      };

      const cancellationBoundsRefundInfoContainer = createComponent(props);

      expect(cancellationBoundsRefundInfoContainer).toMatchSnapshot();
    });
  });

  const createComponent = (props) => {
    const { container } = render(
      <MockedForm initialFormData={{ refundMethod: '' }} onSubmit={() => {}}>
        <CancellationBoundsRefundInfo {...props} />
      </MockedForm>
    );

    return container;
  };
});
