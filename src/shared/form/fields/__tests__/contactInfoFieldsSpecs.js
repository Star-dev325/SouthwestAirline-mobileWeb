import React from 'react';
import { mount } from 'enzyme';
import _ from 'lodash';
import { click, select } from 'test/unit/helpers/enzymeFormTestUtils';
import ContactInfoFields from 'src/shared/form/fields/contactInfoFields';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';

describe('ContactInfoFields', () => {
  let wrapper;
  let stateWithCountryCodeModal;

  beforeEach(() => {
    stateWithCountryCodeModal = {
      router: {
        location: {
          search: '_modal=CONTACT_INFO_FIELDS_COUNTRY_CODE_MODAL_ID'
        }
      }
    };
  });

  context('select phone number country code', () => {
    it('phone number should not be cleared when country code not changed ', () => {
      wrapper = createComponent({
        phoneNumber: '1111111111',
        phoneCountryCode: 'US'
      });

      click(wrapper.find('PhoneCountryCodeList').find('.searchable-list-code--item').at(0));

      const phoneNumberWrapper = wrapper.find('PhoneNumberFields');

      expect(phoneNumberWrapper.find('input[name="phoneNumber"]')).to.have.value('111-111-1111');
      expect(phoneNumberWrapper.find('Input')).to.have.prop('label', '+1');
    });

    it('phone number should be cleared when country code changed ', () => {
      wrapper = createComponent(
        {
          phoneNumber: '1111111111',
          phoneCountryCode: 'US'
        },
        stateWithCountryCodeModal
      );

      click(wrapper.find('CountryCodeList').find('.searchable-list-code--item').at(1));

      const phoneNumberWrapper = wrapper.find('PhoneNumberFields');

      expect(phoneNumberWrapper.find('input[name="phoneNumber"]')).to.have.value('');
      expect(phoneNumberWrapper.find('Input')).to.have.prop('label', '+93');
    });
  });

  context('country code is modal', () => {
    context('select country', () => {
      beforeEach(() => {
        wrapper = createComponent(
          {
            phoneNumber: '1111111111',
            phoneCountryCode: 'US',
            addressLine1: 'asdjlasj',
            addressLine2: 'klsjdsk',
            city: 'asdad'
          },
          stateWithCountryCodeModal
        );
      });

      it('should render as a nav item field when showCountryCodeAsDropDown is false (default)s', () => {
        expect(wrapper.find('CountryCodeNavItemField')).to.be.present();
      });

      it('should reset those fields phone after reselect country', () => {
        click(wrapper.find('CountryCodeList').find('.searchable-list-code--item').at(1));

        expect(wrapper.find('input[name="addressLine1"]')).to.have.value('');
        expect(wrapper.find('input[name="addressLine2"]')).to.have.value('');
        expect(wrapper.find('input[name="zipOrPostalCode"]')).to.have.value('');
        expect(wrapper.find('input[name="city"]')).to.have.value('');
        expect(wrapper.find('input[name="phoneNumber"]')).to.have.value('');
        expect(wrapper.find('input[name="stateProvinceRegion"]')).to.have.value('');
        expect(wrapper.find('PhoneNumberFields').prop('formData')).to.include({ phoneCountryCode: 'AF' });
      });
    });
  });

  context('country code is dropdown', () => {
    beforeEach(() => {
      wrapper = createComponent(
        {
          phoneNumber: '1111111111',
          phoneCountryCode: 'US',
          addressLine1: 'asdjlasj',
          addressLine2: 'klsjdsk',
          city: 'asdad'
        },
        {},
        { showCountryCodeAsDropDown: true }
      );
    });

    it('should render as a select when showCountryCodeAsDropDown is true', () => {
      expect(wrapper.find('.country-field').find('select')).to.be.present();
    });

    it('should reset those fields phone after reselect country', () => {
      select(wrapper.find('.country-field').find('select'), 'AF');

      expect(wrapper.find('input[name="addressLine1"]')).to.have.value('');
      expect(wrapper.find('input[name="addressLine2"]')).to.have.value('');
      expect(wrapper.find('input[name="zipOrPostalCode"]')).to.have.value('');
      expect(wrapper.find('input[name="city"]')).to.have.value('');
      expect(wrapper.find('input[name="phoneNumber"]')).to.have.value('');
      expect(wrapper.find('input[name="stateProvinceRegion"]')).to.have.value('');
      expect(wrapper.find('PhoneNumberFields').prop('formData')).to.include({ phoneCountryCode: 'AF' });
    });
  });

  const createComponent = (initialValue = {}, state = {}, props = {}) => {
    const onSubmitStub = () => null;
    const mergedState = _.merge(
      {},
      {
        app: {},
        router: {
          location: {
            search: '_modal=CONTACT_INFO_FIELDS_MODAL_ID'
          }
        }
      },
      state
    );
    const store = createMockedFormStore(mergedState);
    const MockedForm = createMockedForm(store);

    return mount(
      <MockedForm initialFormData={initialValue} onSubmit={onSubmitStub}>
        <ContactInfoFields
          names={[
            'isoCountryCode',
            'addressLine1',
            'addressLine2',
            'city',
            'stateProvinceRegion',
            'zipOrPostalCode',
            'phoneNumber',
            'phoneCountryCode'
          ]}
          supportModifyCountryCode
          {...props}
        />
      </MockedForm>
    );
  };
});
