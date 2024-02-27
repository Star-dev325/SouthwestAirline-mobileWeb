import React from 'react';
import { mount } from 'enzyme';
import sinonModule from 'sinon';
import SpecialAssistanceNavItem from 'src/shared/components/specialAssistanceNavItem';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import i18n from '@swa-ui/locale';

const sinon = sinonModule.sandbox.create();

describe('SpecialAssistanceNavItem', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});

  let onClickStub, wrapper;

  beforeEach(() => {
    onClickStub = sinon.stub();
    wrapper = createComponent();
  });

  context('render', () => {
    it('should display new contact method item with  content and without title when contact method entered', () => {
      expect(wrapper.find('NavItemLink')).to.contain.text('Special assistance');
    });

    it("should display '(optional)' subtext if there are no Special Assistance items selected", () => {
      expect(wrapper.find('NavItemLink')).to.contain.text('Optional');
    });

    it("should display 'Some options selected' subtext if there are no Special Assistance items selected", () => {
      wrapper = createComponent({
        BLIND: true,
        COGNITIVE_AND_DEVELOPMENTAL_SSR: false,
        WHEELCHAIR_STOWAGE: 'WET_CELL_BATTERY_WHEELCHAIR',
        WET_BATTERIES: '3',
        DRY_BATTERIES: null
      });
      expect(wrapper.find('NavItemLink')).to.contain.text('Some options selected');
    });

    it('should display special assistance static message about flights in progress', () => {
      expect(wrapper.find('.sa-flight-in-progress-message')).to.have.have.text(
        i18n('SHARED__SPECIAL_ASSISTANCE__SA_FLIGHT_IN_PROGRESS_MESSAGE')
      );
    });
  });

  context('click', () => {
    it('should go to special assistance page when click new contact method', () => {
      wrapper.find('NavItemLink').simulate('click');

      expect(onClickStub).to.be.called;
    });

    it('should NOT go to special assistance page when disabled and clicked', () => {
      wrapper = createComponent({}, true);

      wrapper.find('NavItemLink').simulate('click');

      expect(onClickStub).to.not.be.called;
    });
  });

  const createComponent = (selections, disabled = false) => {
    const mockedFormWithSpecialAssistanceField = mount(
      <MockedForm initialFormData={{}} onSubmit={() => {}}>
        <SpecialAssistanceNavItem
          onClick={onClickStub}
          disabled={disabled}
          specialAssistanceSelections={selections ? selections : undefined}
        />
      </MockedForm>
    );

    return mockedFormWithSpecialAssistanceField.find('SpecialAssistanceNavItem');
  };
});
