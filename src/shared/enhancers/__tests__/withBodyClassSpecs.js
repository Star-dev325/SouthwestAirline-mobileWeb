import React from 'react';
import { mount } from 'enzyme';
import withBodyClass from 'src/shared/enhancers/withBodyClass';

describe('withBodyClass HOC', () => {
  it('should add className when component mount', () => {
    const WithBodyClassComponent = withBodyClass('body-class-name')(() => <div />);

    mount(<WithBodyClassComponent />);
    expect(document.getElementsByClassName('body-class-name')).to.have.lengthOf(1);
  });

  it('should append an array of classNames', () => {
    const WithBodyClassComponent = withBodyClass(['first-body-class', 'second-body-class'])(() => <div />);

    mount(<WithBodyClassComponent />);
    expect(document.getElementsByClassName('first-body-class')).to.have.lengthOf(1);
    expect(document.getElementsByClassName('second-body-class')).to.have.lengthOf(1);
  });

  it('should not append additional className if it is already present', () => {
    const WithBodyClassComponent = withBodyClass('body-class-name')(() => <div className="body-class-name" />);

    mount(<WithBodyClassComponent />);
    expect(document.getElementsByClassName('body-class-name')).to.have.lengthOf(1);
  });

  it('should not append additional className if it is not a string', () => {
    const WithBodyClassComponent = withBodyClass({})(() => <div className="body-class-name" />);

    mount(<WithBodyClassComponent />);
    expect(document.getElementsByClassName('body-class-name')).to.have.lengthOf(1);
  });

  it('should remove className after component unmount', () => {
    const WithBodyClassComponent = withBodyClass('body-class-name')(() => <div />);
    const component = mount(<WithBodyClassComponent />);

    component.unmount();
    expect(document.getElementsByClassName('body-class-name')).to.have.lengthOf(0);
  });
});
