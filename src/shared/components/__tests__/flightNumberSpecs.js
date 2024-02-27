import React from 'react';
import { mount } from 'enzyme';

import FlightNumber from 'src/shared/components/flightNumber';

describe('FlightNumber', () => {
  const render = (props) => mount(<FlightNumber {...props} />);

  context('when rendered', () => {
    it('displays the flightNumber passed in from props', () => {
      const wrapper = render({ flightNumber: '123' });

      expect(wrapper.find('FlightNumber')).to.contain.text('123');
    });

    it('displays aircraft type info when aircraft type view res toggle is ON', () => {
      const wrapper = render({ flightNumber: '123', AIRCRAFT_TYPE_VIEWRES: true, aircraftType: 'Boeing 777' });

      expect(wrapper.find('.aircraft-type')).to.be.present();
    });

    it(' does not display aircraft type info when aircraft type view res toggle is ON but no aircraft type exists', () => {
      const wrapper = render({ flightNumber: '123', AIRCRAFT_TYPE_VIEWRES: true, aircraftType: null });

      expect(wrapper.find('.aircraft-type')).to.not.be.present();
    });
  });
});
