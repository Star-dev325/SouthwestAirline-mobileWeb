import React from 'react';
import { shallow } from 'enzyme';
import ShoppingAirStationsOverview from 'src/shared/components/shoppingAirStationsOverview';

describe('ShoppingAirStationsOverview', () => {
  context('render', () => {
    it('should create an inbound shopping air stations overview between OAK and SEA', () => {
      const wrapper = shallow(
        <ShoppingAirStationsOverview destinationAirport={'SEA'} isOutbound={false} originAirport={'OAK'} />
      );

      expect(wrapper.find('.shopping-air-stations-overview')).to.exist;
      expect(wrapper.find('[data-qa="ic-select-depart-img"]')).to.not.exist;
      expect(wrapper.find('[data-qa="ic-select-return-img"]')).to.exist;
      expect(wrapper.find('.direction')).to.contain.text('Return');
      expect(wrapper.find('[data-qa="air-stations"]')).to.contain.text('OAK<Icon />SEA');
    });

    it('should create an outbound shopping air stations overview between MIA and MSY', () => {
      const wrapper = shallow(
        <ShoppingAirStationsOverview destinationAirport={'MSY'} isOutbound originAirport={'MIA'} />
      );

      expect(wrapper.find('.shopping-air-stations-overview')).to.exist;
      expect(wrapper.find('[data-qa="-img"]')).to.exist;
      expect(wrapper.find('[data-qa="ic-select-return-img"]')).to.not.exist;
      expect(wrapper.find('.direction')).to.contain.text('Depart');
      expect(wrapper.find('[data-qa="air-stations"]')).to.contain.text('MIA<Icon />MSY');
    });
  });
});
