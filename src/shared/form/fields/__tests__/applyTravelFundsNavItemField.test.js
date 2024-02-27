import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ApplyTravelFundsNavItemField from 'src/shared/form/fields/applyTravelFundsNavItemField';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('ApplyTravelFundsNavItemField', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});

  let onClickMock;

  beforeEach(() => {
    onClickMock = jest.fn();
  });

  describe('render', () => {
    it("should display 'Select (optional)' if there are no funds being spent", () => {
      const { container } = createComponent(false);

      expect(container.querySelector('.no-funds-selected').textContent).toBe('Select (optional)');
    });

    it('should apply gray text color (className: no-funds-selected) if there are no funds being spent', () => {
      const { container } = createComponent(false);

      expect(container.querySelector('.no-funds-selected')).toBeTruthy();
    });

    it("should display 'Funds Applied' if there are funds being spent", () => {
      const { container } = createComponent(true);

      expect(container.querySelector('.nav-item-field').textContent).toBe('Funds Applied');
    });

    it('should not apply gray text color (className: no-funds-selected) if there are funds being spent', () => {
      const { container } = createComponent(true);

      expect(container.querySelector('.no-funds-selected')).toBeFalsy();
    });
  });

  describe('click', () => {
    it('should call click prop when clicked', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.nav-item-field'));

      expect(onClickMock).toBeCalled();
    });
  });

  const createComponent = (travelFundsApplied = false) =>
    render(
      <MockedForm initialFormData={{}} onSubmit={() => {}}>
        <ApplyTravelFundsNavItemField
          name="applyTravelFunds"
          onNavItemClick={onClickMock}
          travelFundsApplied={travelFundsApplied}
        />
      </MockedForm>
    );
});
