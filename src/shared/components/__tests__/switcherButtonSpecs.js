import React from 'react';
import { mount } from 'enzyme';
import { click } from 'test/unit/helpers/enzymeFormTestUtils';
import { sandbox } from 'sinon';
import SwitcherButton from 'src/shared/components/switcherButton';

const sinon = sandbox.create();

describe('SwitcherButton', () => {
  let options;
  let onSelectStub;

  beforeEach(() => {
    onSelectStub = sinon.stub();
    options = [
      {
        label: '1',
        value: '1'
      },
      {
        label: '2',
        value: '2'
      },
      {
        label: '3',
        value: '3'
      }
    ];
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should have class and have items in correct number', () => {
    const wrapper = mount(<SwitcherButton options={options} />);

    expect(wrapper).to.have.className('switch-button');
    expect(wrapper.find('.switch-button--item')).to.have.lengthOf(3);
  });

  it('should set default value with defaultValue', () => {
    const wrapper = mount(<SwitcherButton options={options} defaultValue={'2'} />);

    expect(wrapper.find('.switch-button--item').at(1)).to.have.className('active');
  });

  it('should click the component to toggle selected item', () => {
    const wrapper = mount(<SwitcherButton options={options} defaultValue={'1'} />);

    click(wrapper);
    expect(wrapper.find('.switch-button--item').at(1)).to.have.className('active');

    click(wrapper);
    expect(wrapper.find('.switch-button--item').at(2)).to.have.className('active');

    click(wrapper);
    expect(wrapper.find('.switch-button--item').at(0)).to.have.className('active');
  });

  it('should click item to change selected item when set itemClickable', () => {
    const wrapper = mount(<SwitcherButton options={options} itemClickable />);

    click(wrapper.find('.switch-button--item').at(2));

    expect(wrapper.find('.switch-button--item').at(2)).to.have.className('active');
  });

  it('should call onSelect with correct new value when clicked and keep previous selected value (parent component overrides selected)', () => {
    const valueProp = '1';
    const wrapper = mount(<SwitcherButton options={options} value={valueProp} onSelect={onSelectStub} itemClickable />);

    click(wrapper.find('.switch-button--item').at(2));
    expect(onSelectStub).to.be.calledWith(options[2]);
    expect(wrapper.find('.active')).to.have.text(valueProp);
  });

  it('should call onSelect with correct option value when clicked', () => {
    const wrapper = mount(<SwitcherButton options={options} onSelect={onSelectStub} itemClickable />);

    click(wrapper.find('.switch-button--item').at(2));
    expect(onSelectStub).to.be.calledWith(options[2]);

    click(wrapper.find('.switch-button--item').at(0));
    expect(onSelectStub).to.be.calledWith(options[0]);
  });

  context('when set disabled', () => {
    it('the component should have class switch-button--disabled', () => {
      const switcherButton = mount(<SwitcherButton options={options} disabled />);

      expect(switcherButton.find('.switch-button--disabled')).to.exist;
    });

    it('the component should not trigger onSelect', () => {
      const switcherButton = mount(<SwitcherButton options={options} onSelect={onSelectStub} disabled />);

      click(switcherButton);
      expect(onSelectStub).to.not.be.called;
    });
  });

  context('when setting  "value" prop', () => {
    it('should add "active" class to the option with that value', () => {
      const switcherButton = mount(<SwitcherButton value="2" options={options} />);

      expect(switcherButton.find('.switch-button--item').at(1)).to.have.className('active');
    });

    context('when prop changes', () => {
      it('should add "active" class to the newly selected option for value changed', () => {
        const switcherButton = mount(<SwitcherButton value="2" options={options} />);

        switcherButton.setProps({
          value: '1',
          options
        });

        expect(switcherButton.find('.switch-button--item').at(0)).to.have.className('active');
      });

      it('should add "active" class to the newly selected option for options changed', () => {
        const switcherButton = mount(<SwitcherButton value="2" options={options} />);

        options = [
          {
            label: '4',
            value: '4'
          }
        ].concat(options);

        switcherButton.setProps({
          value: '2',
          options
        });

        expect(switcherButton.find('.switch-button--item').length).to.equal(4);
        expect(switcherButton.find('.switch-button--item').at(2)).to.have.className('active');
      });

      it('should reset selected index and selected option', () => {
        const switcherButton = mount(<SwitcherButton value="2" options={options} />);

        const newOptions = [
          {
            label: '4',
            value: '4'
          }
        ];

        switcherButton.setProps({
          value: '2',
          options: newOptions
        });

        expect(switcherButton.state('selectedIndex')).to.be.undefined;
      });

      it('should add "active" class to the newly selected option for both changed', () => {
        const switcherButton = mount(<SwitcherButton value="2" options={options} itemClickable />);

        options = [
          {
            label: '4',
            value: '4'
          }
        ].concat(options);

        switcherButton.setProps({
          value: '1',
          options
        });

        expect(switcherButton.find('.switch-button--item').at(1)).to.have.className('active');
      });
    });

    context('when set disable default value props to true', () => {
      it('should not update state', () => {
        const switcherButton = mount(<SwitcherButton disableDefaultSelection options={options} />);

        expect(switcherButton.state('selectedIndex')).to.be.undefined;
        expect(switcherButton.state('selectedOption')).to.be.undefined;
      });
    });
  });
});
