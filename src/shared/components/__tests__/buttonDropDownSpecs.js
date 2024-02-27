import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import ButtonDropDown from 'src/shared/components/buttonDropDown';

describe('buttonDropDown', () => {
  it('should render select and label', () => {
    const options = [
      {
        value: 'test value0',
        label: 'test label0'
      },
      {
        value: 'test value1',
        label: 'test label1'
      }
    ];

    const wrapper = shallow(
      <ButtonDropDown
        className="shopping-dropdown"
        options={options}
        value={'test value0'}
        label={'test label text'}
        onChange={_.noop}
      />
    );

    expect(wrapper.find('Select')).to.have.props({
      className: 'button-dropdown--select',
      options,
      value: 'test value0',
      onChange: _.noop
    });

    expect(wrapper.find('.button-dropdown--label')).to.have.text('test label text');
  });
});
