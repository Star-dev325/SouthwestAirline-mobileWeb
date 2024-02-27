import React from 'react';
import { ContactTracing } from '../index';
import { shallow } from 'enzyme';

describe('Contact Tracing Index', () => {
  it('should render default props', () => {
    const props = {
      match: {
        url: 'contact-tracing'
      }
    };

    expect(shallow(<ContactTracing {...props} />)).toMatchSnapshot();
  });
});
