import { mount } from 'enzyme';
import React from 'react';
import FlightTimes from 'src/shared/components/flightTimes';

describe('FlightTimes', () => {
  const createComponent = (props) => mount(<FlightTimes {...props} />);

  it("should not show a 'Next Day' flag when have isNextDay prop and the value is true but hideIsNextDay is true", () => {
    const flightTimes = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      isNextDay: true,
      hideIsNextDay: true
    });

    expect(flightTimes).not.contain.text('Next Day');
  });

  it("should show a 'Next Day' flag when have isNextDay prop and the value is true", () => {
    const flightTimes = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      isNextDay: true
    });

    expect(flightTimes).to.contain.text('Next Day');
  });

  it('should show Overnight indicator when isOvernight prop is true', () => {
    const flightTimes = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      isOvernight: true
    });

    expect(flightTimes).to.contain.text('Overnight');
  });

  it('should not show only Overnight indicator when isOvernight and isNextDay are both true', () => {
    const flightTimes = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      isOvernight: true,
      isNextDay: true
    });

    expect(flightTimes).contain.text('Overnight');
    expect(flightTimes).not.contain.text('Next Day');
  });

  it('should render in standard mode without the appropriate class name for stretched mode', () => {
    const flightTime = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20'
    });

    expect(flightTime.find('.flight-times_stretched')).to.not.exist;
  });

  context('stretched mode', () => {
    it('should render with the appropriate class name in stretched mode', () => {
      const flightTime = createComponent({
        departureTime: '2015-06-13T08:00',
        arrivalTime: '2015-06-13T10:20',
        isStretched: true
      });

      expect(flightTime.find('.flight-times_stretched')).to.exist;
    });
  });
});
