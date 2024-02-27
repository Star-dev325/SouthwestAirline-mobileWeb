import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import BillingAddressNavItemField from 'src/shared/form/fields/billingAddressNavItemField';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('BillingAddressNavItemField', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});

  let onClickMock;

  beforeEach(() => {
    onClickMock = jest.fn();
  });

  describe('render', () => {
    it("should display 'Required' if there are no funds being spent", () => {
      const { container } = createComponent(false);

      expect(container.querySelector('.nav-item-field').textContent).toBe('Required');
    });

    it("should display 'Complete' if billingAddressComplete prop is true", () => {
      const { container } = createComponent(true);

      expect(container.querySelector('.nav-item-field').textContent).toBe('Complete');
    });
  });

  describe('click', () => {
    it('should call click prop when clicked', () => {
      const { container } = createComponent(true);

      fireEvent.click(container.querySelector('.nav-item-field'));

      expect(onClickMock).toBeCalled();
    });
  });

  const createComponent = (billingAddressComplete = false) =>
    render(
      <MockedForm initialFormData={{}} onSubmit={() => {}}>
        <BillingAddressNavItemField
          billingAddressComplete={billingAddressComplete}
          name="travelFundsAddress"
          onNavItemClick={onClickMock}
        />
      </MockedForm>
    );
});
