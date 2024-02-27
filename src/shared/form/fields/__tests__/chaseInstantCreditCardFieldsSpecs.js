import React from 'react';
import { mount } from 'enzyme';
import { createMockedFormStore, createMockedForm } from 'test/unit/helpers/formTestUtils';
import ChaseInstantCreditCardFields from 'src/shared/form/fields/chaseInstantCreditCardFields';

describe('chaseInstantCreditCardFields', () => {
  let wrapper;

  context('when justAdded is true', () => {
    beforeEach(() => {
      wrapper = createComponent(
        {},
        {
          justAdded: true
        }
      );
    });

    it('should show Just added! text', () => {
      expect(wrapper.find('CreditCardRadioField')).to.contain.text('Just added!');
    });
  });

  it('should disabled when in editMode', () => {
    wrapper = createComponent({}, { editMode: true });

    expect(wrapper.find('CreditCardRadioField')).to.have.prop('disabled', true);
    expect(wrapper.find('CreditCardRadioField')).to.have.prop('editMode', false);
  });

  it('should not disable when not in editMode', () => {
    wrapper = createComponent({}, { editMode: false });

    expect(wrapper.find('CreditCardRadioField')).to.have.prop('disabled', false);
  });

  function createComponent(initialValue = {}, props = {}, formOptions = {}) {
    const onSubmitStub = () => null;
    const store = createMockedFormStore();
    const MockedForm = createMockedForm(store, formOptions);

    return mount(
      <MockedForm initialFormData={initialValue} onSubmit={onSubmitStub}>
        <ChaseInstantCreditCardFields
          names={['selectedCardId', 'chasePhoneNumber', 'chasePhoneCountryCode']}
          supportModifyCountryCode
          {...props}
        />
      </MockedForm>
    );
  }
});
