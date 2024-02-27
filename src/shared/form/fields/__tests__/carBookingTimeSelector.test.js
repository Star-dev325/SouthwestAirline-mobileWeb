import { render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import CarBookingTimeSelector from 'src/shared/form/fields/carBookingTimeSelector';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingTimeSelector', () => {
  it("should render options from '12:00AM' to '11:30PM' and length 48 in total", () => {
    const { container } = createComponent({ placeholder: '' });

    const options = container.querySelectorAll('option');

    expect(options[0].textContent).toBe('12:00AM');
    expect(options[options.length - 1].textContent).toBe('11:30PM');
    expect(options.length).toBe(48);
  });

  it('should show hint', () => {
    const { container } = createComponent();

    expect(container.querySelector('.car-time-selector--hint').textContent).toBe('Pick-up Time');
  });

  it('should using default value as placeholder for select', () => {
    const { container } = createComponent();

    expect(container.querySelector('Select').getAttribute('placeholder')).toBe('11:00AM');
  });

  it('should hide placeholder at options', () => {
    const { container } = createComponent();

    expect(container.querySelectorAll('option')[0].hasAttribute('hidden')).toBeTruthy();
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      hint: 'Pick-up Time',
      name: 'pickupTime',
      placeholder: '11:00AM',
      value: ''
    };

    const MockedForm = createMockedForm(createMockedFormStore());

    return render(
      <MockedForm onSubmit={_.noop}>
        <CarBookingTimeSelector {...defaultProps} {...props} />
      </MockedForm>
    );
  };
});
