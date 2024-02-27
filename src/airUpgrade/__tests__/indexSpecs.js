import React from 'react';
import { AirUpgrade } from '../index';
import { shallow } from 'enzyme';

describe('airUpgrade Index', () => {
  it('should render default props', () => {
    const airUpgradeWrapper = createComponent();

    expect(airUpgradeWrapper).toMatchSnapshot();
  });

  it('should render airUpgrade component routes when AIR_UPGRADE is true', () => {
    const airUpgradeWrapper = createComponent({ AIR_UPGRADE: true });

    expect(airUpgradeWrapper).toMatchSnapshot();
  });

  const createComponent = (props) => {
    const defaultProps = {
      match: {
        url: 'air/upgrade'
      },
      AIR_UPGRADE: false
    };
    const combinedProps = {
      ...defaultProps,
      ...props
    };

    return shallow(<AirUpgrade {...combinedProps} />);
  };
});
