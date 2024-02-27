import React from 'react';
import sinonModule from 'sinon';
import SwitchRadioField from 'src/shared/form/fields/switchRadioField';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

const sinon = sinonModule.sandbox.create();

describe('SwitchRadioField', () => {
  afterEach(() => {
    sinon.restore();
  });

  context('disabled', () => {
    it('should toggling the button by click when component is not disabled', () => {
      const wrapper = createComponent();

      click(wrapper.find('.save-credit-cards-field--radio'));

      expect(wrapper.find('SwitchRadioField')).to.have.prop('value', true);
    });

    it('should not toggling the button by click when component is disabled', () => {
      const wrapper = createComponent({
        disabled: true
      });

      click(wrapper.find('.save-credit-cards-field--radio'));

      expect(wrapper.find('SwitchRadioField')).to.have.prop('value', false);
    });
  });

  it('should get false as default prop value', () => {
    const wrapper = createComponent();

    expect(wrapper.find('SwitchRadioField')).to.have.prop('value', false);
  });

  it('should show label context pass from prop', () => {
    const wrapper = createComponent({
      label: 'some label'
    });

    expect(wrapper.find('.save-credit-cards-field--label').text()).to.equal('some label');
  });

  it('should show label context pass from prop', () => {
    const wrapper = createComponent({
      description: 'some description'
    });

    expect(wrapper.find('.switch-radio-field--description').text()).to.equal('some description');
  });

  function createComponent(props, formOptions) {
    const MockedForm = createMockedForm(createMockedFormStore(), formOptions);

    return mount(
      <MockedForm initialFormData={{ toggle: false }} onSubmit={() => {}}>
        <SwitchRadioField name="toggle" {...props} />
      </MockedForm>
    );
  }
});
