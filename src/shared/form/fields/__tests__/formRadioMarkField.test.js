import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import FormRadioMarkField from 'src/shared/form/fields/formRadioMarkField.jsx';
import _ from 'lodash';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';

describe('formRadioMarkField', () => {
  it('Should render radio field', () => {
    const  { container } = createComponent();

    fireEvent.click(container.querySelector('.flex-main-center'));
    expect(container).toMatchSnapshot();
  });
});

const createComponent = (props = {}) => {
  const defaultProps = {
    className: 'radio-1',
    callback: _.noop
  };

  const mergedProps = { ...defaultProps, ...props };

  const formStore = createMockedFormStore();
  const MockedForm = createMockedForm(formStore, props);

  return render(
    <MockedForm formData={{ firstbound: true }}>
      <FormRadioMarkField {...mergedProps} />
    </MockedForm>
  );
};
