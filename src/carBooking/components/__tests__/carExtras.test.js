import i18n from '@swa-ui/locale';
import { render } from '@testing-library/react';
import React from 'react';
import CarExtras from 'src/carBooking/components/carExtras';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('CarExtras', () => {
  let carExtras;

  beforeEach(() => {
    carExtras = [
      { type: 'SKI_RACK', description: 'Ski Rack' },
      { type: 'GPS', description: 'GPS' }
    ];
  });

  it('should render when car extras exist', () => {
    const { container, getByText } = createComponent({ carExtras });

    expect(container).toMatchSnapshot();
    expect(getByText(i18n('CAR_BOOKING__PRICING_EXTRAS__TITLE'))).not.toBeNull();
    expect(container.querySelector('[name="SKI_RACK"]')).not.toBeNull();
    expect(container.querySelector('[name="GPS"]')).not.toBeNull();
  });

  it('should not render when zero car extras exist', () => {
    const { container } = createComponent({ carExtras: [] });

    expect(container.querySelector('FormCheckboxField')).toBeNull();
  });

  const createComponent = (props = {}) => {
    const noop = () => {};
    const MockedForm = createMockedForm(createMockedFormStore());

    return render(
      <MockedForm onSubmit={noop}>
        <CarExtras {...props} />
      </MockedForm>
    );
  };
});
