import React from 'react';
import Segment from '../segment';
import { shallow } from 'enzyme';

describe('Segment', () => {
  it('should render default props', () => {
    expect(createComponent()).toMatchSnapshot();
  });

  it('should render with label', () => {
    expect(
      createComponent({
        label: 'Section Header'
      })
    ).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {};

    return shallow(
      <Segment
        {...{
          ...defaultProps,
          ...props
        }}
      >
        <div>An example</div>
      </Segment>
    );
  };
});
