import { shallow } from 'enzyme';
import React from 'react';
import FlightProductSGAMessageBanner from 'src/shared/components/flightProductSGAMessageBanner';

describe('flightProductSGAMessageBanner', () => {
  it('should render when SGA title or SGA message', () => {
    const props = {
      title: 'test title',
      message: 'test message'
    };

    const wrapper = shallow(<FlightProductSGAMessageBanner {...props} />);

    expect(wrapper.find('.banner-container--title')).to.have.text('test title');
    expect(wrapper.find('.banner-container--subtitle')).to.have.text('test message');
    expect(wrapper.find('Icon')).to.have.props({ type: 'exclamation-circle sga' });
  });

  it('should have custom className applied to the container when className is set', () => {
    const props = {
      title: 'test title',
      message: 'test message',
      className: 'some-test-class'
    };

    const wrapper = shallow(<FlightProductSGAMessageBanner {...props} />);

    expect(wrapper.find('.flight-product-sga-message-banner')).to.have.className('some-test-class');
  });

  it('should not have custom className applied to the container when className is not set', () => {
    const props = {
      title: 'test title',
      message: 'test message'
    };

    const wrapper = shallow(<FlightProductSGAMessageBanner {...props} />);

    expect(wrapper.find('.flight-product-sga-message-banner')).to.not.have.className('some-test-class');
  });
});
