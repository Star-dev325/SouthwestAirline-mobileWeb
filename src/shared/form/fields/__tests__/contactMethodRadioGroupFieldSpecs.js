import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import _ from 'lodash';
import i18n from '@swa-ui/locale';

import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import ContactMethodRadioGroupField from 'src/shared/form/fields/contactMethodRadioGroupField';
import { DOMESTIC_OPTIONS } from 'src/shared/constants/contactMethodOptions';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';

const sinon = sandbox.create();

describe('contactMethodRadioGroupField', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});
  let onChangeStub, wrapper;

  beforeEach(() => {
    onChangeStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('enabled', () => {
    beforeEach(() => {
      wrapper = createComponent();
    });

    context('render', () => {
      it('should render contact method list', () => {
        const contactMethodItems = wrapper.find('.contact-method-item');

        expect(contactMethodItems).to.have.lengthOf(3);
        expect(contactMethodItems.at(0)).to.have.text(i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_TEXT'));
        expect(contactMethodItems.at(1)).to.have.text(i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_CALL'));
        expect(contactMethodItems.at(2)).to.have.text(i18n('SHARED__CONTACT_METHOD_OPTION__DOMESTIC_OPTIONS_EMAIL'));
      });
    });

    context('select contact method', () => {
      it('should call onChange Function when click list item', () => {
        click(wrapper.find('.contact-method-item').at(0));

        expect(onChangeStub).to.be.called;
      });
    });
  });

  context('disabled', () => {
    beforeEach(() => {
      wrapper = createComponent({ disabled: true });
    });

    it('should not call onChange Function when click list item but contact method disabled', () => {
      click(wrapper.find('.contact-method-item').at(0));

      expect(onChangeStub).to.not.be.called;
    });
  });

  function createComponent(props, formData) {
    return mount(
      <MockedForm initialFormData={{ declineNotifications: false, ...formData }} onSubmit={_.noop}>
        <ContactMethodRadioGroupField
          name="language"
          className="contact-method--language"
          radioGroupOptions={DOMESTIC_OPTIONS}
          onChange={onChangeStub}
          {...props}
        />
      </MockedForm>
    );
  }
});
