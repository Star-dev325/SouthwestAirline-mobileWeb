import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import NavItemLink from 'src/shared/components/navItemLink';

describe('NavItemLink', () => {
  let component;

  const createComponent = (props) => {
    const finalProps = {
      link: '/flight-status',
      children: 'children',
      ...props
    };

    return mount(
      <MemoryRouter>
        <NavItemLink {...finalProps} />
      </MemoryRouter>
    );
  };

  it('should render a link', () => {
    component = createComponent();

    expect(component.find('Link')).to.have.lengthOf(1);
    expect(component).to.not.have.className('nav-item-link_disabled');
  });

  it('should use an `a` tag when passed an href prop', () => {
    const props = {
      children: 'children',
      href: 'href'
    };

    component = mount(
      <MemoryRouter>
        <NavItemLink {...props} />
      </MemoryRouter>
    );

    expect(component.find('a')).to.have.lengthOf(1);
    expect(component.find('a')).to.have.attr('href', 'href');
  });

  it('should render content by props.children', () => {
    component = createComponent({
      children: <div className="content-element" />
    });

    expect(component.find('.content-element')).to.have.lengthOf(1);
  });

  it('should render className by props.className', () => {
    component = createComponent({
      className: 'classname-passed-in'
    });

    expect(component).to.have.className('classname-passed-in');
  });

  it('should render a disabled link when the component is disabled', () => {
    component = createComponent({
      disabled: true
    });

    expect(component).to.have.className('nav-item-link_disabled');
  });

  it('should render Icon with type and className', () => {
    component = createComponent({
      icon: 'a',
      iconClassName: 'class'
    });

    expect(component.find('Icon')).to.have.prop('type', 'a');
    expect(component.find('Icon')).to.have.prop('className', 'class');
  });
});
