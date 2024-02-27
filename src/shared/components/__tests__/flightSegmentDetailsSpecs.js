import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';

import FlightSegmentDetails from '../flightSegmentDetails';

context('FlightSegmentDetails', () => {
  it('should render the departure/arrival times, flight icon and airports', () => {
    const wrapper = createComponent();

    expect(wrapper.find('.flight-segment-details--time-block-label').length).to.equal(2);
    expect(wrapper.find('.flight-segment-details--time-block-time').length).to.equal(2);

    expect(wrapper.find('.flight-segment-details--time-block-label').at(0)).to.have.text('Departs');
    expect(wrapper.find('.flight-segment-details--time-block-time').at(0)).to.have.text('8:55AM');

    expect(wrapper.find('.flight-segment-details--flight-number')).to.have.text('Flight 12');

    const Icon = wrapper.find('Icon');

    expect(Icon).to.exist;
    expect(Icon.length).to.equal(1);
    expect(Icon.first()).to.have.prop('type', 'airplane');

    expect(wrapper.find('.flight-segment-details--time-block-label').at(1)).to.have.text('Arrives');
    expect(wrapper.find('.flight-segment-details--time-block-time').at(1)).to.have.text('11:14AM');

    expect(wrapper.find('.flight-segment-details--airport-info').length).to.equal(2);
    expect(wrapper.find('.flight-segment-details--airport-info').at(0)).to.have.text('Dallas (Love Field), TX - DAL');
    expect(wrapper.find('.flight-segment-details--airport-info').at(1)).to.have.text(
      'Minneapolis/St Paul (Terminal 2), MN - MSP'
    );
  });

  context('outdated style', () => {
    it('should render component with outdated style when pass outdated prop with true value', () => {
      const wrapper = createComponent({ outdated: true });

      expect(wrapper.find('.flight-segment-details_outdated')).to.exist;
    });

    it('should not render component with outdated style when not pass outdated prop', () => {
      const wrapper = createComponent();

      expect(wrapper.find('.flight-segment-details_outdated')).to.not.exist;
    });
  });

  context('delayed', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = createComponent({
        originalDepartureTime: '07:00',
        originalArrivalTime: '10:00',
        departureTime: '08:00',
        arrivalTime: '11:00'
      });
    });

    it('should show delayed time and original time for departure', () => {
      expect(wrapper.find('.flight-segment-details--time-block-time').at(0)).to.have.text('8:00AM');
      expect(wrapper.find('.flight-segment-details--time-block-time_delayed').at(0)).to.have.text('(was 7:00am)');
    });

    it('should show delayed time and original time for arrival', () => {
      expect(wrapper.find('.flight-segment-details--time-block-time').at(1)).to.have.text('11:00AM');
      expect(wrapper.find('.flight-segment-details--time-block-time_delayed').at(1)).to.have.text('(was 10:00am)');
    });

    it('should not show two original time when just one case different', () => {
      const wrapper = createComponent({
        departureTime: '08:00',
        originalDepartureTime: '07:00',
        arrivalTime: '11:00',
        originalArrivalTime: '11:00'
      });

      expect(wrapper.find('.flight-segment-details--time-block-time_delayed')).to.have.lengthOf(1);
    });

    it('should not show delayed time when original time is the same as actual time', () => {
      const wrapper = createComponent({
        departureTime: '08:00',
        arrivalTime: '11:00',
        originalDepartureTime: '08:00',
        originalArrivalTime: '11:00'
      });

      expect(wrapper.find('.flight-segment-details--time-block-time_delayed')).to.not.exist;
    });
  });
  
  context('overnight', () => {
    it('should show overnight indicator when isOvernight is true', () => {
      const wrapper = createComponent({
        arrivalTime: '11:00',
        departureTime: '08:00',
        isOvernight: true,
        originalArrivalTime: '10:00',
        originalDepartureTime: '07:00'
      });

      expect(wrapper.find('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should not show overnight indicator when isOvernight is false', () => {
      const wrapper = createComponent({
        arrivalTime: '11:00',
        departureTime: '08:00',
        isOvernight: false,
        originalArrivalTime: '10:00',
        originalDepartureTime: '07:00'
      });

      expect(wrapper.find('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });
  });

  const createComponent = (props = {}) => {
    const defaultProps = {
      departureTime: '08:55',
      arrivalTime: '11:14',
      flightNumber: '12',
      departureAirport: 'Dallas (Love Field), TX - DAL',
      arrivalAirport: 'Minneapolis/St Paul (Terminal 2), MN - MSP',
      originalDepartureTime: '08:55',
      originalArrivalTime: '11:14',
      AIRCRAFT_TYPE_TRIPCARD: false
    };
    const finalProps = _.merge({}, defaultProps, props);

    return mount(<FlightSegmentDetails {...finalProps} />);
  };
});
