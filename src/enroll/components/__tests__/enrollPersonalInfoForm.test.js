import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import EnrollPersonalInfoForm from 'src/enroll/components/enrollPersonalInfoForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('PersonalInfoForm', () => {
  let onSubmitStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should display EnrollPersonalInfoForm', () => {
      const { container } = createComponent();

      expect(container.querySelector('.enroll-personal-info-form')).not.toBeNull();
    });

    it('should display Join Rapid Rewards text', () => {
      const { container } = createComponent();

      expect(container.querySelector('.helper-text-top').textContent).toBe(
        'ENROLL_HELPER_TEXT_RR_1®ENROLL_HELPER_TEXT_RR_2'
      );
    });

    it('should display name must match government ID text', () => {
      const { queryAllByText } = createComponent();

      expect(queryAllByText('ENROLL_HELPER_TEXT_NAME')).not.toBeNull();
    });

    it('should show FormDatePickerField', () => {
      const { container } = createComponent();

      expect(container.querySelector('.date-selection--select')).not.toBeNull();
    });
  });

  describe('onSubmit', () => {
    it('should trigger onSubmit with required fields when Continue button is pressed', async () => {
      const { container } = createComponent();

      await userEvent.type(container.querySelector('input[name="firstName"]'), 'Freddy');
      await userEvent.type(container.querySelector('input[name="lastName"]'), 'Flint');
      await userEvent.type(container.querySelector('input[name="middleName"]'), 'NMN');
      await userEvent.type(container.querySelector('input[name="preferredName"]'), 'George');
      await userEvent.click(container.querySelectorAll('.switch-button--item')[0]);
      await userEvent.selectOptions(container.querySelector('select[placeholder="Year"]'), '1999');
      await userEvent.selectOptions(container.querySelector('select[placeholder="Day"]'), '23');
      await userEvent.selectOptions(container.querySelector('select[placeholder="Month"]'), '3');

      await userEvent.click(container.querySelector('[data-qa="continue-button"]'));

      expect(onSubmitStub).toHaveBeenCalledWith({
        dateOfBirth: '1999-03-23',
        firstName: 'Freddy',
        gender: 'MALE',
        lastName: 'Flint',
        middleName: 'NMN',
        preferredName: 'George',
        suffix: ''
      });
    });
  });

  const createComponent = (props = { LOYALTY_AGE_VERIFICATION: false }) => {
    const mockStore = createMockedFormStore();

    return render(
      <Provider store={mockStore}>
        <EnrollPersonalInfoForm formId="formId" onSubmit={onSubmitStub} {...props} />
      </Provider>
    );
  };
});
