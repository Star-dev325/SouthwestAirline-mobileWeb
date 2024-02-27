import { render } from '@testing-library/react';
import _ from 'lodash';
import React from 'react';
import CarBookingVehicleSelector from 'src/shared/form/fields/carBookingVehicleSelector';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('CarBookingVehicleSelector', () => {
  it('should render label form props', () => {
    const { container } = createComponent();

    const label = container.querySelectorAll('label')[0];

    expect(label.textContent).toBe('Vehicle Type');
  });

  it('should render 17 type options', () => {
    const { container } = createComponent();

    const options = container.querySelectorAll('option');

    expect(options[0].textContent).toBe('Economy');
    expect(options[options.length - 1].textContent).toBe('Full-size Van');
    expect(options.length).toBe(17);
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      label: 'Vehicle Type',
      name: 'vehicleType',
      onChange: _.noop
    };

    const MockedForm = createMockedForm(createMockedFormStore());
    const wrapper = render(
      <MockedForm onSubmit={_.noop}>
        <CarBookingVehicleSelector {...defaultProps} {...props} />
      </MockedForm>
    );

    return wrapper;
  };
});
