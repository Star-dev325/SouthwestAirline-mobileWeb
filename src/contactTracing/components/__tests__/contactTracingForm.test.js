import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import ContactTracingForm from '../contactTracingForm';
import { createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('Contact Tracing Form', () => {
  let onChangeMock;
  let updateFormDataValueMock;

  beforeEach(() => {
    onChangeMock = jest.fn();
    updateFormDataValueMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render default US form props', () => {
    const { container } = createComponent({
      destinationConfig: {
        addressTextWithLinks: 'Instructions for address here.',
        allowApplyToAll: true,
        applyToAllLabel: 'Use this contact tracing information for all passengers',
        collectionNoticeHeader: 'Collection notice header goes here',
        collectionNoticeTextWithLinks: 'Collection notice info goes here <a href="http://example.com">A link</a>',
        termsAndConditionsHeader: 'Terms and conditions header goes here',
        termsAndConditionsTextWithLinks: 'Terms and conditions info goes here <a href="http://example.com">A link</a>'
      },
      formData: {
        country: 'US'
      },
      isoCountryCode: 'US',
      onChange: onChangeMock
    });

    expect(container).toMatchSnapshot();
  });

  it('should render international form props', () => {
    const { container } = createComponent({
      formData: {
        country: 'MX'
      },
      onChange: jest.fn()
    });

    expect(container).toMatchSnapshot();
  });

  it('should not show apply to all if allowApplyToAll is false', () => {
    const { container } = createComponent({
      destinationConfig: {
        allowApplyToAll: false
      },
      formData: {
        country: 'MX'
      },
      onChange: onChangeMock,
      passengerNumber: 1
    });

    expect(container).toMatchSnapshot();
  });

  it('should not show apply to all if allowApplyToAll is null', () => {
    const { container } = createComponent({
      destinationConfig: {
        allowApplyToAll: null
      },
      formData: {
        country: 'MX'
      },
      onChange: onChangeMock,
      passengerNumber: 1
    });

    expect(container).toMatchSnapshot();
  });

  it('should not show apply to all if not on the first passenger', () => {
    const { container } = createComponent({
      destinationConfig: {
        allowApplyToAll: null
      },
      formData: {
        country: 'MX'
      },
      onChange: onChangeMock,
      passengerNumber: 2
    });

    expect(container).toMatchSnapshot();
  });

  it('should empty destination field on country change', async () => {
    const { container } = createComponent({
      formData: {
        country: 'US'
      },
      isoCountryCode: 'US',
      onChange: onChangeMock
    });

    fireEvent.click(container.querySelector('.destination-address .nav-item-link'));
    fireEvent.click(screen.getByText('Switzerland - CH'));

    expect(onChangeMock.mock.calls[0]).toEqual(['isoCountryCode', 'CH']);
  });

  const createComponent = (props) => {
    const defaultProps = {
      destinationConfig: {
        contactEmailRequired: false,
        contactPhone1Required: false,
        contactPhone2Required: false
      },
      formId: 'the-form',
      isLastPAX: false,
      onSubmit: () => {},
      passengerName: 'John Doe',
      passengerNumber: 1,
      passengerCount: 2,
      submitButtonText: 'Save Form',
      updateFormDataValueFn: updateFormDataValueMock
    };

    const state = {
      router: {
        location: {
          search: '/?_modal=countryList'
        }
      }
    };

    const mergedProps = { ...defaultProps, ...props };

    return render(
      <Provider store={createMockedFormStore(state)}>
        <ContactTracingForm {...mergedProps} />
      </Provider>
    );
  };
});
