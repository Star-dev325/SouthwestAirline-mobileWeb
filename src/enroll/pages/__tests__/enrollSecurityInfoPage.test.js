import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { EnrollSecurityInfoPage } from 'src/enroll/pages/enrollSecurityInfoPage';
import * as EnrollmentTransformer from 'src/enroll/transformers/enrollmentTransformer';
import * as AnalyticsActions from 'src/shared/analytics/actions/analyticsActions';
import EnrollSecurityQuestionsBuilder from 'test/builders/model/enrollSecurityQuestionsBuilder';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('EnrollSecurityInfoPage', () => {
  const requestObj = {
    contactInfo: {
      address: { addressType: 'HOME', isoCountryCode: 'US' },
      emailAddress: undefined,
      phone: { countryCode: '1', number: undefined, phoneType: 'HOME' }
    },
    customerInfo: {
      birthDate: undefined,
      gender: undefined,
      name: {
        firstName: '',
        lastName: '',
        middleName: '',
        preferredName: '',
        suffix: undefined
      }
    },
    optInForEmailSubscriptions: true,
    password: undefined,
    promoCode: '',
    securityQuestions: [
      { answer: undefined, question: undefined },
      { answer: undefined, question: undefined }
    ],
    userName: ''
  };
  const createUserAccountFnMock = jest.fn();
  const getEnrollSecurityQuestionsFnMock = jest.fn();
  const analyticsTrackSubmitFormFnMock = jest.spyOn(AnalyticsActions, 'trackSubmitForm');
  const updateFormDataValueFnMock = jest.fn();
  const transformToEnrollRequestMock = jest
    .spyOn(EnrollmentTransformer, 'transformToEnrollRequest')
    .mockReturnValue(requestObj);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    const { container } = createComponent();

    expect(container).toMatchSnapshot();
  });

  it('should render progress bar correctly', () => {
    const { container } = createComponent();

    expect(container.querySelector('.step-item--inner')).not.toBeNull();
  });

  it('should render enroll security info form', () => {
    const { container } = createComponent();

    expect(container.querySelector('.enroll-security-info-form')).not.toBeNull();
  });

  it('calls get security questions on mount', () => {
    createComponent();

    expect(getEnrollSecurityQuestionsFnMock).toHaveBeenCalled();
  });

  describe('submit form', () => {
    it('should call push and analytics track form when form is successfully submitted', () => {
      const instance = React.createRef();

      createComponent({ ref: instance });

      const mockData = {
        userName: 'testacct123',
        password: 'Test1234',
        confirmedPassword: 'Test1234',
        question1: 'some question',
        answer1: 'some answer',
        question2: 'another question',
        answer2: 'another answer'
      };

      instance.current._onSubmit(mockData);

      expect(analyticsTrackSubmitFormFnMock).toHaveBeenCalledWith('enroll-security-info');
      expect(createUserAccountFnMock).toHaveBeenCalledWith(requestObj);
      expect(updateFormDataValueFnMock).not.toHaveBeenCalled();
      expect(transformToEnrollRequestMock).toHaveBeenCalled();
    });

    it('should trigger form validation and display error header when Continue button is pressed and required fields are empty', () => {
      const { container } = createComponent();

      fireEvent.click(container.querySelector('.checkbox-button'));

      fireEvent.submit(container.querySelector('.enroll-security-info-form'));

      expect(container.querySelectorAll('div.error-header')[0].textContent).toEqual(
        'Please correct the highlighted errors.'
      );
      expect(analyticsTrackSubmitFormFnMock).not.toHaveBeenCalled();
      expect(createUserAccountFnMock).not.toHaveBeenCalled();
      expect(updateFormDataValueFnMock).toHaveBeenCalledWith('ENROLL_SECURITY_INFO_FORM', {
        password: '',
        confirmedPassword: '',
        answer1: '',
        answer2: ''
      });
      expect(transformToEnrollRequestMock).not.toHaveBeenCalled();
    });
  });

  const minorAcknowledge = 'I acknowledge that this enrollment is for a Customer who is under 13 years old.';
  const rulesAcknowledge = 'I acknowledge I have read and accept the rules';
  const minorAgeThreshold = 13;
  const enrollSecurityQuestions = new EnrollSecurityQuestionsBuilder().build();

  const createComponent = (props = {}) => {
    const defaultProps = {
      minorAcknowledge,
      rulesAcknowledge,
      minorAgeThreshold,
      dateOfBirth: '2000-01-23',
      enrollSecurityQuestions,
      getEnrollSecurityQuestionsFn: getEnrollSecurityQuestionsFnMock,
      createUserAccountFn: createUserAccountFnMock,
      personalInfoData: {},
      contactInfoData: {},
      securityInfoData: {},
      analyticsTrackSubmitFormFn: analyticsTrackSubmitFormFnMock,
      updateFormDataValueFn: updateFormDataValueFnMock
    };
    const state = {
      app: {},
      router: {
        location: {
          search: '_modal=SECURITY_QUESTION1_LIST_MODAL_ID'
        }
      }
    };

    const finalProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <EnrollSecurityInfoPage {...finalProps} />
      </Provider>
    );
  };
});
