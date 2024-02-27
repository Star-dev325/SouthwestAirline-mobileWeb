import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import SpecialAssistancePage from 'src/shared/pages/specialAssistancePage';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('SpecialAssistancePage', () => {
  describe('render', () => {
    it('should render the SpecialAssistanceForm', () => {
      const component = createComponent();

      expect(component).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      formId: 'SPECIAL_ASSISTANCE_FORM',
      goBack: jest.fn(),
      initialFormData: {},
      onSubmit: jest.fn(),
      updateFormDataValueFn: jest.fn()
    };
    const newProps = {
      ...defaultProps,
      ...props
    };

    const store = createMockedFormStore({
      app: {},
      router: {
        location: {
          search: 'search'
        }
      }
    });

    return render(
      <Provider store={createMockedFormStore(store)}>
        <SpecialAssistancePage {...newProps} />
      </Provider>
    );
  };
});
