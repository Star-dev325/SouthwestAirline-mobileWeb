jest.mock('src/shared/actions/sharedActions', () => ({
  hideErrorHeaderMsg: jest.fn().mockImplementation(() => ({
    type: 'FAKE_HIDE_ERROR_ACTION'
  })),
  showErrorHeaderMsg: jest.fn().mockImplementation(() => ({
    type: 'FAKE_SHOW_ERROR_ACTION'
  }))
}));

import i18n from '@swa-ui/locale';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ContactInfoForm from 'src/checkIn/components/contactInfoForm';
import { hideErrorHeaderMsg, showErrorHeaderMsg } from 'src/shared/actions/sharedActions';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('Contact Info Form', () => {
  it('should render form', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call onchange event when the value of contact method select field is changed', () => {
    const { container } = createComponent({
      initialFormData: {
        contactMethod: 'EMAIL'
      }
    });
    const contactMethodField = container.querySelector('[name="contactMethod"]');

    fireEvent.change(contactMethodField, { target: { value: 'SMS' } });

    expect(hideErrorHeaderMsg).toHaveBeenCalled();
  });

  describe('contact method is email', () => {
    it('should only presents email field when contact method is email', () => {
      const { container } = createComponent({
        initialFormData: {
          contactMethod: 'EMAIL'
        }
      });

      expect(container.querySelector('input[name="email"]')).not.toBeNull();
      expect(container.querySelector('input[name="sms"]')).toBeNull();
    });

    it('should call onSubmit method successfully when contact method is email and inputted email is valid', () => {
      const onSubmitStub = jest.fn();
      const { container } = createComponent({
        initialFormData: {
          contactMethod: 'EMAIL',
          email: 'fakeEmail@wnco.com'
        },
        onSubmit: onSubmitStub
      });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({
        contactMethod: 'EMAIL',
        email: 'fakeEmail@wnco.com'
      });
    });

    it('should render email error when contact method is email and input email is invalid', () => {
      const onSubmitStub = jest.fn();
      const { container, getByRole } = createComponent({
        initialFormData: {
          contactMethod: 'EMAIL',
          email: 'invalid email'
        },
        onSubmit: onSubmitStub
      });

      fireEvent.click(getByRole('submit'));

      expect(showErrorHeaderMsg).toHaveBeenCalled();
      expect(container.querySelector('.field--error-msg').textContent).toEqual(
        i18n('SHARED__ERROR_MESSAGES__INVALID_EMAIL')
      );
      expect(onSubmitStub).not.toHaveBeenCalled();
    });
  });

  describe('contact method is sms (phone number)', () => {
    it('should only presents phone number field when contact method is sms', () => {
      const { container } = createComponent({
        initialFormData: {
          contactMethod: 'SMS'
        }
      });

      expect(container.querySelector('input[name="email"]')).toBeNull();
      expect(container.querySelector('input[name="sms"]')).not.toBeNull();
    });

    it('should call onSubmit method successfully when contact method is sms and inputted phone number is valid', () => {
      const onSubmitStub = jest.fn();
      const { container } = createComponent({
        initialFormData: {
          contactMethod: 'SMS',
          sms: '111-111-1111'
        },
        onSubmit: onSubmitStub
      });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({
        contactMethod: 'SMS',
        sms: '111-111-1111'
      });
    });

    it('should presents error design for phone number when contact method is sms and inputted phone number is invalid', () => {
      const onSubmitStub = jest.fn();
      const { container } = createComponent({
        initialFormData: {
          contactMethod: 'SMS',
          sms: '1111111111'
        },
        onSubmit: onSubmitStub
      });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).not.toHaveBeenCalled();
    });
  });

  const createComponent = (props) => {
    const defaultProps = {
      formId: 'fakeFormId',
      instructionText: 'fake instruction text',
      onSubmit: jest.fn(),
      name: 'test'
    };

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore()}>
        <ContactInfoForm {...mergedProps} />
      </Provider>
    );
  };
});
