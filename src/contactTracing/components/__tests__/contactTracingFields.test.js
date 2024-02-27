import { render } from '@testing-library/react';
import React from 'react';
import { ContactTracingFields } from '../contactTracingFields';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('Contact Tracing Fields', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render default props', () => {
    const { container } = createComponent({});

    expect(container).toMatchSnapshot();
  });

  it('should render optional field props', () => {
    const { container } = createComponent({
      destinationConfig: {
        contactEmailRequired: false,
        contactPhone1Required: false,
        contactPhone2Required: false
      }
    });

    expect(container).toMatchSnapshot();
  });

  it('should render destinationConfig label props', () => {
    const { container } = createComponent({
      destinationConfig: {
        contactPhone1Label: 'Contact Label 1 Override',
        contactPhone2Label: 'Contact Label 2 Override'
      }
    });

    expect(container).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      destinationConfig: {
        contactEmailRequired: true,
        contactPhone1Required: true,
        contactPhone2Required: true
      }
    };
    const mergedProps = { ...defaultProps, ...props };
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store);

    return render(
      <MockedForm>
        <ContactTracingFields {...mergedProps} />
      </MockedForm>
    );
  };
});
