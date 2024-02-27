import React from 'react';
import { shallow } from 'enzyme';

import PricingBannerList from 'src/shared/components/pricingBannerList';

describe('pricingBannerList', () => {
  context('render', () => {
    it('should render a list of messages', () => {
      const messages = [
        {
          key: 'PRICING_EARLY_BIRD_BUNDLED_INSIDE_36_HOURS',
          header: 'EarlyBird Check-in is not available',
          body: 'We can not add this product to a flight that leaves within 36 hours of purchase',
          icon: 'WARNING',
          textColor: 'DEFAULT',
          backgroundColor: 'DEFAULT'
        }
      ];
      const wrapper = shallow(<PricingBannerList messages={messages} />);

      expect(wrapper).toMatchSnapshot();
    });
  });
});
