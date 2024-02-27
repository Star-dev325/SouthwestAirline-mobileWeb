import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { history } from 'src/appHistory';
import * as DialogActions from 'src/shared/actions/dialogActions';
import * as FormDataActions from 'src/shared/actions/formDataActions';
import * as SharedActions from 'src/shared/actions/sharedActions';
import SharedActionsTypes from 'src/shared/actions/sharedActionTypes';
import Input from 'src/shared/components/input';
import withField from 'src/shared/form/enhancers/withField';
import { noop } from 'src/shared/helpers/jsUtils';
import RouterStore from 'src/shared/stores/routerStore';
import createMockStore from 'test/unit/helpers/createMockStore';
import { untilAssertPass } from 'test/unit/helpers/waitFor';

import { ERROR_HEADER, SIMPLE_ERROR_POPUP } from 'src/shared/form/constants/validationErrorTypes';

const { SHARED__HIDE_ERROR_HEADER_MSG, SHARED__SHOW_ERROR_HEADER_MSG } = SharedActionsTypes;

import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

const mockStore = createMockStore();

const TEST_FORM_ID = 'TEST_FORM_ID';

describe('withForm', () => {
  let onSubmitStub;
  let onValidationFailedStub;
  let asyncActionStartFnStub;
  let asyncActionFinishFnStub;
  let asyncActionRestrictFieldFnStub;
  let asyncActionUnrestrictFieldFnStub;
  let showDialogFnStub;
  const { action } = history;
  const { search } = history.location;

  beforeEach(() => {
    onSubmitStub = jest.fn();
    onValidationFailedStub = jest.fn();
    asyncActionStartFnStub = jest.spyOn(SharedActions, 'asyncActionStart').mockReturnValue({ type: 'fake' });
    asyncActionFinishFnStub = jest.spyOn(SharedActions, 'asyncActionFinish').mockReturnValue({ type: 'fake' });
    asyncActionRestrictFieldFnStub = jest
      .spyOn(FormDataActions, 'restrictFormChangeToFieldName')
      .mockReturnValue({ type: '', formId: 'formId', fieldName: 'fieldName' });
    asyncActionUnrestrictFieldFnStub = jest
      .spyOn(FormDataActions, 'unrestrictFormChangeToFieldName')
      .mockReturnValue({ type: '', formId: 'formId' });
    showDialogFnStub = jest.spyOn(DialogActions, 'showDialog').mockReturnValue({ type: 'someType' });
  });

  afterEach(() => {
    jest.clearAllMocks();
    history.action = action;
    history.location.search = search;
  });

  describe('when initialize', () => {
    it('should calc defaultValue and merge with initialFormData to child component', () => {
      const { container } = createComponent(
        { initialFormData: {} },
        { defaultValues: () => ({ fieldName: 'defaultValue' }) }
      );

      expect(container).toMatchSnapshot();
    });

    it('should use redux store value as first priority when it is back/forward', () => {
      const mockedFormStore = createMockedFormStore();

      history.action = 'POP';
      mockedFormStore.dispatch(FormDataActions.updateFormFieldDataValue(TEST_FORM_ID, 'fieldName', 'value2'));

      const { container } = createComponent(
        {
          initialFormData: {
            fieldName: 'value1'
          }
        },
        {},
        mockedFormStore
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when update form data', () => {
    it('should provide new field value to wrapped component when explicit call the action', () => {
      const mockedFormStore = createMockedFormStore();
      const { container } = createComponent(
        { initialFormData: { fieldName: 'value1' } },
        {},
        mockedFormStore
      );

      mockedFormStore.dispatch(FormDataActions.updateFormFieldDataValue(TEST_FORM_ID, 'fieldName', 'value2'));

      expect(container).toMatchSnapshot();
    });
  });

  describe('when submit form', () => {
    it('should call onSubmit from props', () => {
      const { container } = createComponent();

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalled();
    });

    it('should clear form data value when autoClearFormData is true', () => {
      const clearFormDataByIdStub = jest.fn();
      const mockedFormStore = createMockedFormStore();
      const { container } = createComponent(
        { clearFormDataById: clearFormDataByIdStub },
        { autoClearFormData: true },
        mockedFormStore
      );

      mockedFormStore.dispatch(FormDataActions.updateFormFieldDataValue(TEST_FORM_ID, 'fieldName', 'value2'));

      fireEvent.submit(container.querySelector('form'));

      expect(mockedFormStore.getState().app.formData).toEqual({});
    });

    it('should not clear form data value automatically by default', () => {
      const clearFormDataByIdStub = jest.fn();
      const mockedFormStore = createMockedFormStore();
      const { container } = createComponent(
        { clearFormDataById: clearFormDataByIdStub },
        {},
        mockedFormStore
      );

      mockedFormStore.dispatch(FormDataActions.updateFormFieldDataValue(TEST_FORM_ID, 'fieldName', 'value2'));

      fireEvent.submit(container.querySelector('form'));

      expect(mockedFormStore.getState().app.formData).toEqual({
        TEST_FORM_ID: {
          data: { fieldName: 'value2' },
          url: '/'
        }
      });
    });
  });

  describe('transition to a new page with form', () => {
    const initalState = {
      app: {
        formData: {
          TEST_FORM_ID: {
            data: {
              fieldName: 'value2'
            },
            url: '/'
          },
          TEST_FORM_NOT_CLEAR: {
            data: {
              fieldName: 'value2'
            },
            url: '/'
          }
        }
      }
    };

    it('should clear form data when pushing to new page', () => {
      history.action = 'PUSH';
      const mockedFormStore = createMockedFormStore(initalState);

      createComponent({}, {}, mockedFormStore);

      expect(mockedFormStore.getState().app.formData).toEqual({
        TEST_FORM_NOT_CLEAR: {
          data: { fieldName: 'value2' },
          url: '/'
        }
      });
    });

    it('should clear form data when replacing to new page', () => {
      history.action = 'REPLACE';
      const mockedFormStore = createMockedFormStore(initalState);

      createComponent({}, {}, mockedFormStore);

      expect(mockedFormStore.getState().app.formData).toEqual({
        TEST_FORM_NOT_CLEAR: {
          data: { fieldName: 'value2' },
          url: '/'
        }
      });
    });

    it('should not clear form data when back/forward to a new page', () => {
      history.action = 'POP';
      const mockedFormStore = createMockedFormStore(initalState);

      createComponent();

      expect(mockedFormStore.getState().app.formData).toEqual(initalState.app.formData);
    });

    it('should not clear form data when the clearFormData of query is false', () => {
      history.action = 'PUSH';
      history.location.search = '?clearFormData=false';
      const mockedFormStore = createMockedFormStore(initalState);

      createComponent();

      expect(mockedFormStore.getState().app.formData).toEqual(initalState.app.formData);
    });

    it('should not clear form data when opening modal', () => {
      history.action = 'PUSH';

      const getCurrentStateMock = jest.spyOn(RouterStore, 'getCurrentState').mockReturnValue({
        search: '_modal=MODAL_ID'
      });
      const mockedFormStore = createMockedFormStore(initalState);

      createComponent();

      expect(mockedFormStore.getState().app.formData).toEqual(initalState.app.formData);

      getCurrentStateMock.mockRestore();
    });

    it('should not clear form data when opening popup', () => {
      history.action = 'PUSH';
      const getCurrentStateMock = jest.spyOn(RouterStore, 'getCurrentState').mockReturnValue({
        search: '',
        state: {
          popup: 'open'
        }
      });
      const mockedFormStore = createMockedFormStore(initalState);

      createComponent();

      expect(mockedFormStore.getState().app.formData).toEqual(initalState.app.formData);

      getCurrentStateMock.mockRestore();
    });

    it('should not clear if currentRouteState is falsy', () => {
      history.action = 'PUSH';

      const getCurrentStateMock = jest.spyOn(RouterStore, 'getCurrentState').mockReturnValue(null);
      const mockedFormStore = createMockedFormStore(initalState);

      createComponent();

      expect(mockedFormStore.getState().app.formData).toEqual(initalState.app.formData);

      getCurrentStateMock.mockRestore();
    });
  });

  describe('disable form data', () => {
    it('should clear form data when disableFormData is true', () => {
      const mockedFormStore = createMockedFormStore();
      const { unmount } = createComponent(
        { initialFormData: { fieldName: 'value1' } },
        { disableFormData: true },
        mockedFormStore
      );

      unmount();

      expect(mockedFormStore.getState().app.formData).toEqual({});
    });

    it('should not clear form data when disableFormData is false', () => {
      const mockedFormStore = createMockedFormStore();
      const { unmount } = createComponent(
        { initialFormData: { fieldName: 'value1' } },
        { disableFormData: false },
        mockedFormStore
      );

      mockedFormStore.dispatch(FormDataActions.updateFormFieldDataValue(TEST_FORM_ID, 'fieldName', 'value1'));

      unmount();

      expect(mockedFormStore.getState().app.formData).toEqual({
        TEST_FORM_ID: {
          data: { fieldName: 'value1' },
          url: '/'
        }
      });
    });
  });

  describe('show spinner', () => {
    it('should show spinner at start and hide spinner after validation end when the validation function return a promise', (done) => {
      const { container } = createComponent(
        {},
        { formValidator: () => () => Promise.resolve() }
      );

      fireEvent.submit(container.querySelector('form'));

      untilAssertPass(() => {
        expect(asyncActionStartFnStub).toHaveBeenCalled();
        expect(asyncActionFinishFnStub).toHaveBeenCalled();
      }, done);
    });

    it('should not show spinner when the validation function return a non promise', () => {
      const { container } = createComponent(
        {},
        { formValidator: () => () => ({}) }
      );

      fireEvent.submit(container.querySelector('form'));

      expect(asyncActionStartFnStub).not.toHaveBeenCalled();
      expect(asyncActionFinishFnStub).not.toHaveBeenCalled();
    });
  });

  describe('popup errors', () => {
    it('should show simple popup when validation failed on a certain type of error', () => {
      const { container } = createComponent(
        {},
        { formValidator: () => () => ({ somePopUpError: { msg: 'Custom Pop Up Error', type: SIMPLE_ERROR_POPUP } }) }
      );

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).not.toHaveBeenCalled();
      expect(showDialogFnStub).toHaveBeenCalled();
    });
  });

  describe('header errors', () => {
    const initalState = {
      app: {
        formData: {
          TEST_FORM_ID: {
            data: {
              fieldName: 'value2'
            },
            url: '/'
          }
        }
      }
    };

    it('should show header error when validation failed on a certain type', () => {
      const mockedStore = mockStore(initalState);
      const { container } = createComponent(
        {},
        { formValidator: () => () => ({ someHeaderError: { msg: 'Custom Header Error', type: ERROR_HEADER } }) },
        mockedStore
      );

      fireEvent.submit(container.querySelector('form'));

      expect(mockedStore.getActions()[1]).toEqual({
        type: SHARED__SHOW_ERROR_HEADER_MSG,
        errorHeader: { errorMessage: 'Custom Header Error', hasError: true }
      });
    });

    it('should show header error onChange when fieldsToValidateOnChange is passed in', () => {
      const mockedStore = mockStore(initalState);
      const { container } = createComponent(
        {},
        {
          formValidator: () => () => ({ someHeaderError: { msg: 'Custom Header Error', type: ERROR_HEADER } }),
          fieldsToValidateOnChange: ['dateOfBirth'],
          parse: (e) => e.target.value
        },
        mockedStore,
        'dateOfBirth'
      );

      fireEvent.change(container.querySelector('input'), { target: { value: 'value' } });

      expect(mockedStore.getActions()[2]).toEqual({
        type: SHARED__SHOW_ERROR_HEADER_MSG,
        errorHeader: { errorMessage: 'Custom Header Error', hasError: true }
      });
      expect(asyncActionRestrictFieldFnStub).toHaveBeenCalled();
      expect(asyncActionUnrestrictFieldFnStub).not.toHaveBeenCalled();
    });

    it('should not show header error onChange when the fieldsToValidateOnChange field is not changed', () => {
      const mockedStore = mockStore(initalState);
      const { container } = createComponent(
        {},
        {
          formValidator: () => () => ({}),
          fieldsToValidateOnChange: ['dateOfBirth'],
          parse: (e) => e.target.value
        },
        mockedStore,
        'dateOfBirth'
      );

      fireEvent.change(container.querySelector('input'), { target: { value: 'value' } });

      expect(asyncActionRestrictFieldFnStub).not.toHaveBeenCalled();
      expect(asyncActionUnrestrictFieldFnStub).toHaveBeenCalled();
    });

    it('should hide header error when submit the form', () => {
      const mockedStore = mockStore(initalState);
      const { container } = createComponent({}, {}, mockedStore);

      fireEvent.submit(container.querySelector('form'));

      expect(mockedStore.getActions()).toEqual([{ type: SHARED__HIDE_ERROR_HEADER_MSG }]);
    });

    it('should hide header error when component unmount', () => {
      const mockedStore = mockStore(initalState);
      const { unmount } = createComponent({}, {}, mockedStore);

      unmount();

      expect(mockedStore.getActions()).toEqual([{ type: SHARED__HIDE_ERROR_HEADER_MSG }]);
    });
  });

  describe('validation failed with onValidationFailed', () => {
    it('should call onValidationFailed', () => {
      const { container } = createComponent(
        { onValidationFailed: onValidationFailedStub },
        { formValidator: () =>
          () => ({ someHeaderError: { msg: 'Custom Header Error', type: ERROR_HEADER } })
        });

      fireEvent.submit(container.querySelector('form'));

      expect(onValidationFailedStub).toHaveBeenCalledWith();
    });
  });

  describe('trim field values', () => {
    it('should trim field values when there are trailing or leading spaces', () => {
      const { container } = createComponent({ initialFormData: { fieldName: '  value1  ' } });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({ fieldName: 'value1' });
    });

    it('should not trim field for password', () => {
      const { container } = createComponent({ initialFormData: { password: ' *sdf ' } });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({ password: ' *sdf ', fieldName: '' });
    });

    it('should not trim field for non string value', () => {
      const { container } = createComponent({ initialFormData: { paymentInfo: { selectedCardId: 'someId' } } });

      fireEvent.submit(container.querySelector('form'));

      expect(onSubmitStub).toHaveBeenCalledWith({
        paymentInfo: { selectedCardId: 'someId' },
        fieldName: ''
      });
    });
  });

  const mergeFieldNames = (defaultFormData, propsFormData) =>
    Object.keys({
      ...defaultFormData,
      ...propsFormData
    });

  function createComponent(props = {}, options = {}, mockedStore?, name?) {
    const MockedInput = (props) => <Input {...props} />;
    const ConnectedField = withField(options)(MockedInput);
    const defaultProps = {
      onSubmit: onSubmitStub,
      onValidationFailed: noop,
      initialFormData: {
        fieldName: 'value1'
      },
      search: '',
      showDialogFn: showDialogFnStub
    };

    const MockedForm = createMockedForm(mockedStore ? mockedStore : createMockedFormStore(), options);
    const fieldNames = mergeFieldNames(defaultProps.initialFormData, props.initialFormData);

    return render(
      <MockedForm {...defaultProps} {...props}>
        {fieldNames.map((key) => (
          <ConnectedField key={key} name={name || key} />
        ))}
      </MockedForm>
    );
  }
});
