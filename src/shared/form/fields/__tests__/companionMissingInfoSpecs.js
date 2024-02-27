import React from 'react';
import { mount } from 'enzyme';
import CompanionMissingInfo from 'src/shared/form/fields/companionMissingInfo';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import GenderTypes from 'src/shared/form/constants/genderTypes';

describe('companionPersonalInfo', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});

  it('should display a date picker to pick it if date of birth is empty', () => {
    const props = {
      companionInfo: {
        dateOfBirth: '',
        gender: 'Male',
        name: {
          firstName: 'James',
          lastName: 'Merson'
        }
      }
    };
    const wrapper = createComponent(props);

    expect(wrapper.find('FormDatePickerField')).to.exist;
  });

  it('should give a radio button to select gender if gender is empty', () => {
    const props = {
      companionInfo: {
        dateOfBirth: '1989-02-25',
        gender: '',
        name: {
          firstName: 'James',
          lastName: 'Merson'
        }
      }
    };
    const wrapper = createComponent(props);

    expect(wrapper.find('FormRadioInputField')).to.exist;
  });

  it('should give a radio button to select gender if gender is UNAVAILABLE', () => {
    const props = {
      companionInfo: {
        dateOfBirth: '1989-02-25',
        gender: GenderTypes.UNAVAILABLE,
        name: {
          firstName: 'James',
          lastName: 'Merson'
        }
      }
    };
    const wrapper = createComponent(props);

    expect(wrapper.find('FormRadioInputField')).to.exist;
  });

  function createComponent(props) {
    const contactMethodContent = {};

    const form = mount(
      <MockedForm initialFormData={{ contactMethodContent }} onSubmit={() => {}}>
        <CompanionMissingInfo names={['gender', 'dateOfBirth']} {...props} />
      </MockedForm>
    );

    return form.find('CompanionMissingInfo');
  }
});
