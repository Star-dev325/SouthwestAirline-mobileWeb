jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import EnrollContactInfoFormDefaultExport from 'src/enroll/components/enrollContactInfoForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('EnrollContactInfoForm', () => {
  let onSubmitStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should display EnrollContactInfoForm', () => {
      const { container } = createComponent();

      expect(container.querySelector('.enroll-contact-info-form')).not.toBeNull();
    });

    it('EnrollContactInfoForm', () => {
      const { container } = createComponent({});

      expect(container).toMatchSnapshot();
    });
  });

  describe('onSubmit', () => {
    it('should trigger onSubmit with required fields when Continue button is pressed', async () => {
      const { container, getByText } = createComponent();

      await userEvent.type(container.querySelector('[name="addressLine1"]'), '123 Main St');
      await userEvent.type(container.querySelector('[name="addressLine2"]'), 'APT #1');
      await userEvent.type(container.querySelector('[name="city"]'), 'Bedford');
      await userEvent.selectOptions(container.querySelector('[name="stateProvinceRegion"]'), 'TX');
      await userEvent.type(container.querySelector('[name="zipOrPostalCode"]'), '76021');
      fireEvent.change(container.querySelector('[name="phoneNumber"]'), { target: { value: '5552224444' } });
      await userEvent.type(container.querySelector('[name="email"]'), 'abc@test.com');
      await userEvent.type(container.querySelector('[name="confirmedEmail"]'), 'abc@test.com');

      await userEvent.click(getByText('ENROLL_CONTINUE'));

      const expectedFormData = {
        isoCountryCode: 'US',
        addressLine1: '123 Main St',
        addressLine2: 'APT #1',
        zipOrPostalCode: '76021',
        city: 'Bedford',
        stateProvinceRegion: 'TX',
        phoneCountryCode: 'US',
        phoneNumber: '555-222-4444',
        email: 'abc@test.com',
        confirmedEmail: 'abc@test.com',
        optInForEmailSubscriptions: true
      };

      expect(onSubmitStub).toBeCalledWith(expectedFormData);
    });

    it('should not trigger onSubmit when Continue button is pressed and required fields are empty', async () => {
      const { getByText } = createComponent();

      await userEvent.click(getByText('ENROLL_CONTINUE'));

      expect(onSubmitStub).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props = {}) => {
    const mockStore = createMockedFormStore();

    return render(
      <Provider store={mockStore}>
        <EnrollContactInfoFormDefaultExport formId="formId" onSubmit={onSubmitStub} {...props} />
      </Provider>
    );
  };
});
