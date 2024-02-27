import React from 'react';
import { mount } from 'enzyme';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import { focus, enterTextIntoMaskedField, enterText } from 'test/unit/helpers/enzymeFormTestUtils';
import { SecurityCodeInputField } from 'src/shared/form/fields/securityCodeInputField';
import _ from 'lodash';

describe('SecurityCodeInputField', () => {
  let securityCodeInputField;

  function createComponent(props = {}, formOptions = {}) {
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm formData={{ securityCode: '' }} onSubmit={_.noop}>
        <SecurityCodeInputField name="securityCode" {...props} />
      </MockedForm>
    );
  }

  context('render', () => {
    it('should not render FormInputMaskAllField if shouldShowSecurityInputField is false', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: false
      });
      expect(securityCodeInputField.find('FormInputMaskAllField')).not.to.be.present();
    });

    it('should pass default class name to FormInputMaskAllField', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: true
      });
      expect(securityCodeInputField.find('FormInputMaskAllField').props().className).to.be.equal(
        'purchase-summary-security-code--input-field'
      );
    });

    it('should pass customized class name to FormInputMaskAllField', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: true,
        className: 'my-class'
      });
      expect(securityCodeInputField.find('FormInputMaskAllField').props().className).to.be.equal('my-class');
    });

    it('should pass extra props to FormInputMaskAllField', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: true,
        extraProp1: '4012999999999999',
        securityCode: '123'
      });
      expect(securityCodeInputField.find('FormInputMaskAllField').props().extraProp1).to.be.equal('4012999999999999');
      expect(securityCodeInputField.find('FormInputMaskAllField').props().securityCode).to.be.equal('123');
    });

    it('should mask input value', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: true
      });

      enterTextIntoMaskedField(securityCodeInputField, 'FormInputMaskAllField', '1234');

      expect(securityCodeInputField.find('input')).to.have.attr('value', '****');
    });

    it('should not mask input value when field has focus', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: true
      });

      focus(securityCodeInputField.find('input'));
      enterText(securityCodeInputField, '1234');

      expect(securityCodeInputField.find('input')).to.have.attr('value', '1234');
    });

    it('should clear input value when field has focus', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: true
      });

      enterTextIntoMaskedField(securityCodeInputField, 'FormInputMaskAllField', '1234');
      expect(securityCodeInputField.find('input')).to.have.attr('value', '****');

      focus(securityCodeInputField.find('input'));
      expect(securityCodeInputField.find('input')).to.have.attr('value', '');
    });

    it('should limit ccv input to a maximum of 4 digits', () => {
      securityCodeInputField = createComponent({
        shouldShowSecurityInputField: true
      });

      focus(securityCodeInputField.find('input'));

      expect(securityCodeInputField.find('input')).to.have.attr('maxLength', '4');
    });
  });
});
