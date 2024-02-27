import React from 'react';
import { mount } from 'enzyme';
import PhoneNumberFields from 'src/shared/form/fields/phoneNumberFields';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('phoneNumberFields', () => {
  let wrapper;

  describe('when rendered with country field', () => {
    it('should have an input field with expected props', () => {
      wrapper = createComponent();
      expect(wrapper.find('input')).to.be.present();
      expect(wrapper.find('input').at(0).prop('type')).to.be.equal('tel');
    });

    describe('with country as US', () => {
      it('should have country code as prefix label as +1', () => {
        wrapper = createComponent({
          phoneCountryCode: 'US'
        });
        expect(wrapper.find('FormInputField')).to.have.text('+1');
      });

      it('should have a mask as 999-999-9999', () => {
        wrapper = createComponent({
          phoneCountryCode: 'US',
          phoneNumber: '1234567890'
        });

        expect(wrapper.find('FormInputField')).to.have.prop('mask', '999-999-9999');
      });
    });

    describe('with country other than US', () => {
      it('should have country code as +91', () => {
        wrapper = createComponent({
          phoneCountryCode: 'IN'
        });
        expect(wrapper.find('FormInputField')).to.have.text('+91');
      });

      it('should have a mask as ************', () => {
        wrapper = createComponent({
          phoneCountryCode: 'IN',
          phoneNumber: '1234567890'
        });

        expect(wrapper.find('FormInputField')).to.have.prop('mask', '************');
      });

      it('should have a formatChars prop to limit inputs to numbers only', () => {
        wrapper = createComponent({
          phoneCountryCode: 'AW',
          phoneNumber: '1234567890'
        });

        expect(wrapper.find('FormInputField')).to.have.prop('formatChars').deep.equal({ '*': '[0-9]' });
      });
    });

    describe('with isISOCountryCode is false and  country code is prefix code like `86`', () => {
      it('should have country code as +86', () => {
        wrapper = createComponent(
          {
            phoneCountryCode: '86'
          },
          {
            isISOCountryCode: false
          }
        );

        expect(wrapper.find('FormInputField')).to.have.text('+86');
      });

      it('should have a mask as ************', () => {
        wrapper = createComponent(
          {
            phoneCountryCode: '86',
            phoneNumber: '1234567890'
          },
          {
            isISOCountryCode: false
          }
        );

        expect(wrapper.find('FormInputField')).to.have.prop('mask', '************');
      });
    });

    describe('with country code value is prefix code like `1`', () => {
      it('should have a label `+1` and mask as `999-999-9999`', () => {
        wrapper = createComponent(
          {
            country: '1',
            phoneNumber: '1234567890'
          },
          {
            isISOCountryCode: false
          }
        );

        expect(wrapper.find('FormInputField')).to.have.text('+1');
        expect(wrapper.find('FormInputField')).to.have.prop('mask', '999-999-9999');
      });
    });
  });

  function createComponent(initialValue = {}, props = {}, formOptions = {}) {
    const onSubmitStub = () => null;
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm initialFormData={initialValue} onSubmit={onSubmitStub}>
        <PhoneNumberFields names={['phoneNumber', 'phoneCountryCode']} {...props} />
      </MockedForm>
    );
  }
});
