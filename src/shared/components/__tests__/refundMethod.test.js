import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import RefundMethod from 'src/shared/components/refundMethod';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('refund method', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});

  describe('onChange callback', () => {
    it('should set default setting, placeholder and  options and not hide component when notVisible is not true', () => {
      const { container } = createComponent();
      const refundMethod = container.querySelector('.refund-method');
      const select = container.querySelector('select');
      const options = container.querySelectorAll('option');

      expect(refundMethod).not.toHaveClass("hide");
      expect(select.getAttribute('placeholder')).toBe('SHARED__REFUND_METHOD__SELECT_AN_OPTION');
      expect(options[1].getAttribute('value')).toBe('BACK_TO_ORIGINAL_PAYMENT');
      expect(options[2].getAttribute('value')).toBe('HOLD_FUTURE_USE');
    });

    it('should hide component when notVisible is true', () => {
      const { container } = createComponent({ notVisible: true });
      const refundMethod = container.querySelector('.refund-method');

      expect(refundMethod).toHaveClass('hide');
    });

    it('should render passed classname', () => {
      const { container } = createComponent({ className: 'fakeClassName' });
      const refundMethod = container.querySelector('.refund-method');

      expect(refundMethod).toHaveClass('fakeClassName');
    });
  });

  const createComponent = (extraProps = {}) => {
    const mockedFormWithContactMethodFields = render(
      <MockedForm initialFormData={{ refundMethod: '' }} onSubmit={() => {}}>
        <RefundMethod name="refundMethod" {...extraProps} />
      </MockedForm>
    );
    
    return mockedFormWithContactMethodFields;
  };
});
