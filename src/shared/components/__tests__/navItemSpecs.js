import React from 'react';
import { shallow } from 'enzyme';

import NavItem from 'src/shared/components/navItem';

describe('NavItem', () => {
  it('should add custom classes after nav-item class so they can override it', () => {
    const wrapper = shallow(<NavItem iconFixed noIcon className={'custom'} />);

    expect(wrapper).to.have.className('nav-item');
    expect(wrapper).to.have.className('nav-item--icon-fixed');
    expect(wrapper).to.have.className('nav-item--no-icon');
    expect(wrapper).to.have.className('custom');
  });
});
