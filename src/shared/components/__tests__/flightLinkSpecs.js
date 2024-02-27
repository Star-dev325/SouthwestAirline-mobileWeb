import React from 'react';
import { mount } from 'enzyme';

import FlightLink from 'src/shared/components/flightLink';

describe('FlightLink', () => {
  context('when rendered', () => {
    let flightLink;

    beforeEach(() => {
      const dallasToAustin = {
        departureAirportCode: 'DAL',
        departureTime: '11:59',
        arrivalAirportCode: 'AUS',
        arrivalTime: '15:59'
      };

      flightLink = mount(<FlightLink flight={dallasToAustin} />);
    });

    it('should have a departing and arriving airport code', () => {
      expect(flightLink.find('.airport-code')).to.be.lengthOf(2);

      expect(flightLink.find('.airport-code').at(0)).to.have.text('DAL');
      expect(flightLink.find('.airport-code').at(1)).to.have.text('AUS');
    });

    it('should have a departing and arriving time', () => {
      expect(flightLink.find('.formatted-time')).to.be.lengthOf(2);

      expect(flightLink.find('.formatted-time').at(0)).to.have.text('11:59AM');
      expect(flightLink.find('.formatted-time').at(1)).to.have.text('3:59PM');
    });
  });
});
