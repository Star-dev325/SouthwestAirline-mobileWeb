import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { CompanionSpecialAssistancePage } from 'src/companion/pages/companionSpecialAssistancePage';
import { COMPANION_SPECIAL_ASSISTANCE_FORM } from 'src/shared/constants/formIds';

describe('CompanionSpecialAssistancePage', () => {
  let clearFormDataByIdFnStub;
  let goBackStub;
  let updateCompanionWithSpecialAssistanceFnStub;

  beforeEach(() => {
    goBackStub = jest.fn();
    updateCompanionWithSpecialAssistanceFnStub = jest.fn();
    clearFormDataByIdFnStub = jest.fn();
  });
  describe('should render', () => {
    it('SpecialAssistancePage', () => {
      const { container } = createComponent();

      expect(container).toMatchSnapshot();
    });

    it('SpecialAssistanceForm', () => {
      const { container } = createComponent();

      expect(container.querySelector('.special-assistance-form')).not.toBeNull();
    });
  });

  describe('on submit', () => {
    it('should save companion passenger info and back to purchase summary page when submit', () => {
      const { container } = createComponent({ specialAssistanceFormData: { BLIND: true } });

      fireEvent.submit(container.querySelector('form'));

      expect(updateCompanionWithSpecialAssistanceFnStub).toHaveBeenCalledWith({ BLIND: true });
      expect(clearFormDataByIdFnStub).toHaveBeenCalledWith(COMPANION_SPECIAL_ASSISTANCE_FORM);
    });
  });

  const createComponent = (props = {}) => {
    const noop = () => {};
    const defaultProps = {
      goBack: goBackStub,
      updateCompanionWithSpecialAssistanceFn: updateCompanionWithSpecialAssistanceFnStub,
      updateFormDataValueFn: noop,
      clearFormDataByIdFn: clearFormDataByIdFnStub,
      specialAssistanceFormData: {},
      savedFormData: {}
    };

    const store = configureMockStore()({
      app: {
        errorHeader: {
          hasError: false,
          errorMessage: null
        }
      },
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return render(
      <Provider store={store}>
        <CompanionSpecialAssistancePage {...defaultProps} {...props} />
      </Provider>
    );
  };
});
