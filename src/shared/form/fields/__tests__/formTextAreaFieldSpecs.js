import React from 'react';
import { shallow } from 'enzyme';
import { sandbox } from 'sinon';
import _ from 'lodash';

import FormTextAreaField from 'src/shared/form/fields/formTextAreaField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

const sinon = sandbox.create();

describe('FormTextAreaField', () => {
  it('should render with passed in props', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  const createComponent = () => {
    const onSubmitStub = sinon.stub();
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store);
    const defaultProps = {
      className: 'test-class',
      placeholder: 'test-placeholder',
      _onMessageChange: _.noop,
      rowCount: 4,
      name: 'test-name',
      value: 'mock value'
    };

    return shallow(
      <MockedForm initialFormData={{ name: 'init value' }} onSubmit={onSubmitStub}>
        <FormTextAreaField {...defaultProps} />
      </MockedForm>
    );
  };
});
