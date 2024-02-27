import React from 'react';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import ContactMethodFields from 'src/shared/form/fields/contactMethodFields';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import i18n from '@swa-ui/locale';

const sinon = sinonModule.sandbox.create();

describe('ContactMethodFields', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});

  let clickContactMethodFnStub;

  beforeEach(() => {
    clickContactMethodFnStub = sinon.stub();
  });

  it('should display new contact method item with  content and without title when contact method entered', () => {
    const contactMethodFields = createComponent(
      `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`
    );

    expect(contactMethodFields.find('FormNavItemField')).to.contain.text(
      `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`
    );
    expect(contactMethodFields.find('FormNavItemField')).to.not.contain.text('Contact method');
  });

  it('should display new contact method item with title and without content when contact method not entered', () => {
    const contactMethodFields = createComponent();

    expect(contactMethodFields.find('FormNavItemField')).to.contain.text('Contact method');
    expect(contactMethodFields.find('FormNavItemField')).to.not.contain.text(
      `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`
    );
  });

  it('should go to contact method page when click new contact method', () => {
    const contactMethodFields = createComponent();

    contactMethodFields.find('NavItemLink').simulate('click');

    expect(clickContactMethodFnStub).to.be.called;
  });

  it('should render with exclamation mark if missingContactMethod is true', () => {
    const contactMethodFields = createComponent(
      `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL')}, (333)123-4567`,
      { missingContactMethod: true }
    );

    expect(contactMethodFields.find('Icon').prop('type')).to.be.equal('exclamation-circle warning');
  });

  it('should display optional title when contact method is optional', () => {
    const contactMethodFields = createComponent(null, { isOptional: true });

    expect(contactMethodFields.find('FormNavItemField')).to.contain.text('Contact method (optional)');
    expect(contactMethodFields.find('FormNavItemField')).to.not.contain.text(
      `${i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT')}, (333)123-4567`
    );
  });

  function createComponent(contactMethodContent, extraProps = {}) {
    const mockedFormWithContactMethodFields = mount(
      <MockedForm initialFormData={{ contactMethodContent }} onSubmit={() => {}}>
        <ContactMethodFields
          clickContactMethodFn={clickContactMethodFnStub}
          names={['contactMethodContent']}
          {...extraProps}
        />
      </MockedForm>
    );

    return mockedFormWithContactMethodFields.find('ContactMethodFields');
  }
});
