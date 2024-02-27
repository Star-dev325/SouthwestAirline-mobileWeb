import React from 'react';
import { mount } from 'enzyme';
import FlightTime from 'src/shared/components/flightTime';

describe('FlightTime', () => {
  const createComponent = (props) => mount(<FlightTime {...props} />);

  it('should render time', () => {
    const flightTime = createComponent({ timeString: '2015-02-12T10:50:00.000-08:00' });

    expect(flightTime.find('.flight-time--time > span').first()).to.have.text('10:50');
  });

  it('should render period', () => {
    const flightTime = createComponent({ timeString: '2015-02-12T10:50:00.000-08:00' });

    expect(flightTime.find('.time-period')).to.have.prop('children', 'AM');
  });
});
