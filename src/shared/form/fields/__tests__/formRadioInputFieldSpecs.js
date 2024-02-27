import React from 'react';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import FormRadioInputField from 'src/shared/form/fields/formRadioInputField';
import OptionsHelper from 'src/shared/helpers/optionsHelper';
import genderOptions from 'src/shared/form/constants/genderOptionsForChapi';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { click, submitForm } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sinonModule.sandbox.create();

describe('FormRadioInputField', () => {
  let onSubmitStub;

  afterEach(() => {
    sinon.restore();
  });

  it('should update the value when change the option', () => {
    const wrapper = createComponent();

    click(wrapper.find('button').at(1));
    submitForm(wrapper);

    expect(onSubmitStub).to.have.been.calledWith({
      name: 'F'
    });
  });

  function createComponent(props = {}, formOptions = {}) {
    onSubmitStub = sinon.stub();
    const defaultProps = {
      options: OptionsHelper.getOptionsByMeta(genderOptions)
    };
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm formData={{ gender: 'M' }} onSubmit={onSubmitStub}>
        <FormRadioInputField name="name" {...defaultProps} {...props} />
      </MockedForm>
    );
  }
});
