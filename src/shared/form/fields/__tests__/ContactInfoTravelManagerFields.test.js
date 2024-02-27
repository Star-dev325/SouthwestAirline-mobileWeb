import React from 'react';
import { Provider } from 'react-redux';
import _ from 'lodash';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ContactInfoTravelManagerFields from 'src/shared/form/fields/contactInfoTravelManagerFields';

describe('ContactInfoTravelManagerFields', () => {
  it('should render when value is exist', () => {
    const { container } = createComponent({ value: '(1) 123-456-7890' });

    expect(container).toMatchSnapshot();
  });

  it('should render the placeholder when value is not exist', () => {
    const { container } = createComponent({ value: '' });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props = {}, state = {}) => {
    const defaultProps = {
      formId: 'CONTACT_INFO_TRAVEL_MANAGER_METHOD_FORM',
      formData: {
        contactMethod: 'TEXT123',
        declineNotifications: false,
        disclaimerText: 'TEXT',
        email: null,
        isNotificationsEnabled: false,
        phoneCountryCode: '1',
        phoneNumber: '2145551234'
      }
    };

    const store = createMockedFormStore(state);

    const MockedForm = createMockedForm(store);

    const component = render(
      <Provider store={store} values={{ form: { formData: defaultProps.formData } }}>
        <MockedForm initialFormData={{ ...defaultProps.formData }} onSubmit={() => {}}>
          <ContactInfoTravelManagerFields
            clickContactInfoTravelManagerMethodFn={{ clickContactInfoTravelMethodFnMock: jest.fn() }}
            {..._.merge({}, defaultProps, props)}
          />
        </MockedForm>
      </Provider>
    );

    return component;
  };
});
