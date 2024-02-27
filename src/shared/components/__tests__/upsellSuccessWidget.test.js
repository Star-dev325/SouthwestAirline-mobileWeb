import React from 'react';
import { shallow } from 'enzyme';
import UpsellSuccessWidget from 'src/shared/components/upsellSuccessWidget';

describe('UpsellSuccessWidget', () => {
  it('should render correctly', () => {
    const component = createComponent();

    expect(component).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = { upsellSuccessMessage: { header: 'test header', body: 'test body' } };

    return shallow(<UpsellSuccessWidget {...{ ...defaultProps, ...props }} />);
  };
});
