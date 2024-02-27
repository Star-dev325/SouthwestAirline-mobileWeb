import React from 'react';
import { shallow } from 'enzyme';
import { sandbox } from 'sinon';
import { MoneyOrPointsSwitchButtonField } from 'src/shared/form/fields/moneyOrPointsSwitchButtonField';

const sinon = sandbox.create();

describe('MoneyOrPointsSwitchButtonField', () => {
  let wrapper;
  let onChangeStub;

  beforeEach(() => {
    onChangeStub = sinon.stub();
  });

  context('render', () => {
    beforeEach(() => {
      wrapper = createComponent();
    });

    it('should render label show fares in', () => {
      expect(wrapper.find('.checkbox-label')).to.have.text('Show fares in:');
    });

    it('should render moneyOrPointsSwitchButton', () => {
      expect(wrapper.find('MoneyOrPointsSwitchButton').props()).to.includes({
        name: 'currencyType',
        value: 'USD',
        disabled: false
      });
      expect(wrapper.find('MoneyOrPointsSwitchButton')).to.have.prop('onSelect');
    });
  });

  context('UNSAFE_componentWillReceiveProps', () => {
    beforeEach(() => {
      wrapper = createComponent({ value: 'PTS' });
    });

    it('should reset value when disabled the component', () => {
      wrapper.setProps({ disabled: true });

      expect(onChangeStub).to.have.been.calledWith('USD');
    });
  });

  function createComponent(props = {}) {
    const defaultProps = {
      name: 'currencyType',
      value: 'USD',
      disabled: false,
      onChange: onChangeStub,
      MWEB_HOMEPAGE_REDESIGN: false,
      clearError: () => {}
    };

    return shallow(<MoneyOrPointsSwitchButtonField {...defaultProps} {...props} />);
  }
});
