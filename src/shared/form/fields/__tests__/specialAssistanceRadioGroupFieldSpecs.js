import React from 'react';
import { mount } from 'enzyme';
import { sandbox } from 'sinon';
import _ from 'lodash';

import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { createMockedForm, createMockedFormStore } from 'test/unit/helpers/formTestUtils';
import SpecialAssistanceRadioGroupField from 'src/shared/form/fields/specialAssistanceRadioGroupField';
import { WHEELCHAIR_ASSISTANCE, WHEELCHAIR_STOWAGE } from 'src/shared/constants/specialAssistanceConstants';
import Select from 'src/shared/components/select';

const sinon = sandbox.create();

describe('specialAssistanceRadioGroupField', () => {
  const store = createMockedFormStore();
  const MockedForm = createMockedForm(store, {});
  let onChangeStub, updateNumberOfBatteriesFnStub;

  beforeEach(() => {
    updateNumberOfBatteriesFnStub = sinon.stub();
    onChangeStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  context('render', () => {
    it('list with given array of strings', () => {
      const wrapper = createComponent({ radioGroupOptions: WHEELCHAIR_ASSISTANCE.OPTIONS });

      const specialAssistanceRadioItems = wrapper.find('.sa-radio-item');

      expect(specialAssistanceRadioItems).to.have.lengthOf(3);
      expect(specialAssistanceRadioItems.at(0)).to.have.text('No wheelchair assistance needed');
      expect(specialAssistanceRadioItems.at(1)).to.have.text('Can walk but need assistance to and from gate');
      expect(specialAssistanceRadioItems.at(2)).to.have.text('Need lift/transfer assistance to and from aircraft seat');
    });
  });

  context('regular radio fields', () => {
    it('should trigger onChange', () => {
      const wrapper = createComponent({ radioGroupOptions: WHEELCHAIR_ASSISTANCE.OPTIONS });

      click(wrapper.find('.sa-radio-item--radio').first());

      expect(onChangeStub).to.have.been.called;
    });

    it('should not call onChange or updateNumberOfBatteriesFn when selected item is clicked again', () => {
      const wrapper = createComponent({ radioGroupOptions: WHEELCHAIR_ASSISTANCE.OPTIONS });

      click(wrapper.find('.sa-radio-item_checked').first());

      expect(onChangeStub).to.not.have.been.called;
      expect(updateNumberOfBatteriesFnStub).to.not.have.been.called;
    });
  });

  context('batteries', () => {
    it('should reset when a field without batteries is selected', () => {
      const wrapper = createComponent({
        batteryOptions: WHEELCHAIR_STOWAGE.BATTERIES.OPTIONS,
        radioGroupOptions: WHEELCHAIR_STOWAGE.OPTIONS,
        WET_BATTERIES: '2',
        DRY_BATTERIES: null,
        value: 'WET_CELL_BATTERY_WHEELCHAIR'
      });

      click(wrapper.find('.sa-radio-item').at(0));

      expect(onChangeStub).to.have.been.called;
      expect(updateNumberOfBatteriesFnStub).to.have.been.calledWith('', '');
    });

    it('should call updateNumberOfBatteriesFn with defaultBatteries on first click', () => {
      const wrapper = createComponent({
        batteryDefault: WHEELCHAIR_STOWAGE.BATTERIES.DEFAULT,
        batteryOptions: WHEELCHAIR_STOWAGE.BATTERIES.OPTIONS,
        radioGroupOptions: WHEELCHAIR_STOWAGE.OPTIONS,
        WET_BATTERIES: null,
        DRY_BATTERIES: null,
        value: 'NONE'
      });

      click(wrapper.find('.sa-radio-item[name="WET_CELL_BATTERY_WHEELCHAIR"]'));

      expect(onChangeStub).to.have.been.called;
      expect(updateNumberOfBatteriesFnStub).to.have.been.calledWith(
        'WET_CELL_BATTERY_WHEELCHAIR',
        WHEELCHAIR_STOWAGE.BATTERIES.DEFAULT
      );
    });

    it('should set the defaultValue for wet batteries based on battery amount', () => {
      const wrapper = createComponent({
        batteryDefault: WHEELCHAIR_STOWAGE.BATTERIES.DEFAULT,
        batteryOptions: WHEELCHAIR_STOWAGE.BATTERIES.OPTIONS,
        radioGroupOptions: WHEELCHAIR_STOWAGE.OPTIONS,
        WET_BATTERIES: '3',
        DRY_BATTERIES: null,
        value: 'WET_CELL_BATTERY_WHEELCHAIR'
      });

      expect(wrapper.find(Select).at(0)).to.have.prop('value').to.equal('3');
    });

    it('should set the defaultValue for dry batteries based on battery amount', () => {
      const wrapper = createComponent({
        batteryDefault: WHEELCHAIR_STOWAGE.BATTERIES.DEFAULT,
        batteryOptions: WHEELCHAIR_STOWAGE.BATTERIES.OPTIONS,
        radioGroupOptions: WHEELCHAIR_STOWAGE.OPTIONS,
        WET_BATTERIES: null,
        DRY_BATTERIES: '3',
        value: 'DRY_CELL_BATTERY_WHEELCHAIR'
      });

      expect(wrapper.find(Select).at(0)).to.have.prop('value').to.equal('3');
    });

    it('should update battery selection upon new selection in dropdown', () => {
      const wrapper = createComponent({
        batteryDefault: WHEELCHAIR_STOWAGE.BATTERIES.DEFAULT,
        batteryOptions: WHEELCHAIR_STOWAGE.BATTERIES.OPTIONS,
        radioGroupOptions: WHEELCHAIR_STOWAGE.OPTIONS,
        WET_BATTERIES: null,
        DRY_BATTERIES: '3',
        value: 'DRY_CELL_BATTERY_WHEELCHAIR'
      });

      wrapper.find('select').simulate('change', {
        target: {
          value: '4'
        }
      });

      expect(onChangeStub).to.have.been.called;
      expect(updateNumberOfBatteriesFnStub).to.have.been.calledWith('DRY_CELL_BATTERY_WHEELCHAIR', '4');
    });
  });

  const createComponent = (props) =>
    mount(
      <MockedForm onSubmit={_.noop}>
        <SpecialAssistanceRadioGroupField
          name="wheelchairAssistanceRadios"
          className="sa-radio-options"
          onChange={onChangeStub}
          updateNumberOfBatteriesFn={updateNumberOfBatteriesFnStub}
          {...props}
        />
      </MockedForm>
    );
});
