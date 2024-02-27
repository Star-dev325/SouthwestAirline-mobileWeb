import React from 'react';
import { mount } from 'enzyme';
import SwitchButton from 'src/shared/components/switchButton';

describe('SwitchButton', () => {
  let options;

  beforeEach(() => {
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

  it('should have class and have items in correct number', () => {
    const wrapper = mount(<SwitchButton options={options} />);

    expect(wrapper).to.have.className('switch-button');
    expect(wrapper.find('.switch-button--item')).to.have.lengthOf(3);
  });

  it('should set default value with defaultValue', () => {
    const wrapper = mount(<SwitchButton options={options} defaultValue={'2'} />);

    expect(wrapper.find('.switch-button--item').at(1)).to.have.className('active');
  });

  it('should click the component to toggle selected item', () => {
    const wrapper = mount(<SwitchButton options={options} defaultValue={'1'} />);

    wrapper.simulate('click');
    expect(wrapper.find('.switch-button--item').at(1)).to.have.className('active');

    wrapper.simulate('click');
    expect(wrapper.find('.switch-button--item').at(2)).to.have.className('active');

    wrapper.simulate('click');
    expect(wrapper.find('.switch-button--item').at(0)).to.have.className('active');
  });

  it('should click item to change selected item when set itemClickable', () => {
    const wrapper = mount(<SwitchButton options={options} itemClickable />);

    wrapper.find('.switch-button--item').at(2).simulate('click');

    expect(wrapper.find('.switch-button--item').at(2)).to.have.className('active');
  });

  it('should through onSelect to back the selectedOption', () => {
    const wrapper = mount(<SwitchButton options={options} onSelect={onSelect} itemClickable />);

    wrapper.find('.switch-button--item').at(2).simulate('click');

    const onSelect = (selectOption) => {
      expect(selectOption).to.be.eql(options[2]);
    };
  });

  context('when set disabled', () => {
    it('the component should have class switch-button--disabled', () => {
      const switchButton = mount(<SwitchButton options={options} disabled />);

      expect(switchButton.find('.switch-button--disabled')).to.exist;
    });

    it('the component should not trigger onSelect', () => {
      const switchButton = mount(<SwitchButton options={options} onSelect={expect.fail} disabled />);

      switchButton.simulate('click');
    });
  });

  context('when setting  "value" prop', () => {
    it('should add "active" class to the option with that value', () => {
      const switchButton = mount(<SwitchButton value="2" options={options} />);

      expect(switchButton.find('.switch-button--item').at(1)).to.have.className('active');
    });

    context('when prop changes', () => {
      it('should add "active" class to the newly selected option for value changed', () => {
        const switchButton = mount(<SwitchButton value="2" options={options} />);

        switchButton.setProps({
          value: '1',
          options
        });

        expect(switchButton.find('.switch-button--item').at(0)).to.have.className('active');
      });

      it('should add "active" class to the newly selected option for options changed', () => {
        const switchButton = mount(<SwitchButton value="2" options={options} />);

        options = [
          {
            label: '4',
            value: '4'
          }
        ].concat(options);

        switchButton.setProps({
          value: '2',
          options
        });

        expect(switchButton.find('.switch-button--item').at(2)).to.have.className('active');
      });

      it('should add "active" class to the newly selected option for both changed', () => {
        const switchButton = mount(<SwitchButton value="2" options={options} />);

        options = [
          {
            label: '4',
            value: '4'
          }
        ].concat(options);

        switchButton.setProps({
          value: '1',
          options
        });

        expect(switchButton.find('.switch-button--item').at(1)).to.have.className('active');
      });
    });

    context('when set disable default value props to true', () => {
      it('should not update state', () => {
        const switchButton = mount(<SwitchButton disableDefaultSelection options={options} />);

        expect(switchButton.state('selectedIndex')).to.be.undefined;
        expect(switchButton.state('selectedOption')).to.be.undefined;
      });
    });
  });
});
