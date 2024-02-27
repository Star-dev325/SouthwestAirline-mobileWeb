import React from 'react';
import { shallow } from 'enzyme';
import Container from 'src/shared/components/container';

describe('Container', () => {
  let props;
  let containerWrapper;

  beforeEach(() => {
    props = {
      className: ''
    };
  });

  afterEach(() => {
    props = {};
  });

  it('should display if no props', () => {
    containerWrapper = createComponent();

    expect(containerWrapper).to.have.className('custom-container');
  });

  it('should invert colours', () => {
    props.inverted = true;

    containerWrapper = createComponent(props);

    expect(containerWrapper).to.have.className('bgpdkblue');
  });

  it('should remove bottom padding', () => {
    props.noBottomPadding = true;

    containerWrapper = createComponent(props);

    expect(containerWrapper).to.have.className('pb0');
  });

  const createComponent = (props = {}) =>
    shallow(
      <Container {...props}>
        <div />
      </Container>
    );
});
