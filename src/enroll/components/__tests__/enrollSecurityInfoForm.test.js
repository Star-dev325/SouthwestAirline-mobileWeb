import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import EnrollSecurityInfoForm from 'src/enroll/components/enrollSecurityInfoForm';
import EnrollSecurityQuestionsBuilder from 'test/builders/model/enrollSecurityQuestionsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('EnrollSecurityInfoForm', () => {
  let onSubmitStub;
  let onValidationFailedStub;

  beforeEach(() => {
    onSubmitStub = jest.fn();
    onValidationFailedStub = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('render', () => {
    it('should render the form component', () => {
      const { container } = createComponent();

      expect(container.querySelector('.enroll-security-info-form')).not.toBeNull();
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit when all required data is entered and form is submitted', async () => {
      const { container } = createComponent();

      await userEvent.type(container.querySelector('input[name="userName"]'), 'freddyflint');
      await userEvent.type(container.querySelector('input[name="password"]'), 'Test1234');
      await userEvent.type(container.querySelector('input[name="confirmedPassword"]'), 'Test1234');
      await userEvent.type(container.querySelector('input[name="answer1"]'), 'Blue');
      await userEvent.type(container.querySelector('input[name="answer2"]'), 'Chocolate');
      await userEvent.click(container.querySelector('[data-qa="continue-button"]'));

      expect(onSubmitStub).toBeCalledWith({
        acceptRulesAndRegulations: true,
        answer1: 'Blue',
        answer2: 'Chocolate',
        confirmedPassword: 'Test1234',
        password: 'Test1234',
        promoCode: '',
        question1: securityQuestions[0],
        question2: securityQuestions[1],
        userName: 'freddyflint'
      });
      expect(onValidationFailedStub).not.toHaveBeenCalled();
    });

    it('should not call onSubmit when missing required data and form is submitted', async () => {
      const { container } = createComponent();

      await userEvent.click(container.querySelector('[data-qa="continue-button"]'));

      expect(onSubmitStub).not.toHaveBeenCalled();
      expect(onValidationFailedStub).toHaveBeenCalled();
    });
  });

  const securityQuestions = new EnrollSecurityQuestionsBuilder().build();

  const createComponent = (props = {}) => {
    const mockStore = createMockedFormStore();
    const defaultProps = {
      dateOfBirth: '1990-03-23',
      formId: 'ENROLL_SECURITY_INFO_FORM',
      initialFormData: {
        acceptRulesAndRegulations: true,
        question1: securityQuestions[0],
        question2: securityQuestions[1]
      },
      minorAcknowledge: 'minor acknowledge',
      minorAgeThreshold: 13,
      onSubmit: onSubmitStub,
      onValidationFailed: onValidationFailedStub,
      rulesAcknowledge: 'rules acknowledge',
      securityQuestions
    };

    return render(
      <Provider store={mockStore}>
        <EnrollSecurityInfoForm {..._.merge({}, defaultProps, props)} />
      </Provider>
    );
  };
});
