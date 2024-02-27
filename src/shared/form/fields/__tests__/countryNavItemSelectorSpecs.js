import React from 'react';
import _ from 'lodash';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import Button from 'src/shared/components/button';
import CountryNavItemField from 'src/shared/form/fields/countryNavItemField';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import { submitForm } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sinonModule.sandbox.create();

describe('countryNavItemSelector', () => {
  let onSubmitStub;
  let wrapper;

  const defaultProps = {
    onNavItemClick: _.noop,
    placeholder: 'placeholder'
  };

  beforeEach(() => {
    onSubmitStub = sinon.stub();
  });

  context('when has value', () => {
    beforeEach(() => {
      wrapper = createComponent();
    });

    it('should pass all the props', () => {
      expect(wrapper.find('a.nav-item-field')).to.contain.text('placeholder');
      expect(wrapper.find('FormNavItemField').props()).to.contains({
        ...defaultProps,
        name: 'countryNavItemSelector'
      });
    });
  });

  it('should display formatted value', () => {
    wrapper = createComponent('CN');

    expect(wrapper.find('[data-qa="nav-item-field-value"]')).to.have.text('China - CN');
  });

  it('should display empty string for empty value', () => {
    wrapper = createComponent('');

    expect(wrapper.find('[data-qa="nav-item-field-value"]')).to.have.text('');
  });

  it('should submit with unformatted value', () => {
    wrapper = createComponent('US');

    submitForm(wrapper.find('form'));

    expect(onSubmitStub).to.have.been.calledWith({ countryNavItemSelector: 'US' });
  });

  function createComponent(initialValue = '') {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, {});

    return mount(
      <MockedForm initialFormData={{ countryNavItemSelector: initialValue }} onSubmit={onSubmitStub}>
        <CountryNavItemField name="countryNavItemSelector" {...defaultProps} />
        <Button className="continue " type="submit" color="yellow" size="huge" fluid />
      </MockedForm>
    );
  }
});
