import React from 'react';
import { sandbox } from 'sinon';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import CountryCodeNavItemField from 'src/shared/form/fields/countryCodeNavItemField';

const sinon = sandbox.create();

describe('CountryCodeNavItemField', () => {
  let onLabelClickStub;
  let onSubmitStub;

  beforeEach(() => {
    onLabelClickStub = sinon.stub();
    onSubmitStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('display', () => {
    it('should display the default country and code', () => {
      const countryCodeNavItemField = createComponent();

      expect(countryCodeNavItemField).to.contain.text('United States of America - US');
    });

    it('should display the country for the specified country code', () => {
      const countryCodeNavItemField = createComponent({ countryCode: 'AF' });

      expect(countryCodeNavItemField).to.contain.text('Afghanistan - AF');
    });
  });

  context('on click', () => {
    it('should call onLabelClick when user clicks', () => {
      const countryCodeNavItemField = createComponent();

      click(countryCodeNavItemField.find('NavItemLink'));

      expect(onLabelClickStub).to.have.been.called;
    });
  });

  const createComponent = (props = {}) => {
    const MockedForm = createMockedForm(createMockedFormStore());

    const defaultProps = {
      name: 'isoCountryCode',
      onLabelClick: onLabelClickStub
    };

    const wrapper = mount(
      <MockedForm onSubmit={onSubmitStub}>
        <CountryCodeNavItemField {...defaultProps} {...props} />
      </MockedForm>
    );

    return wrapper.find('CountryCodeNavItemField');
  };
});
