import React from 'react';
import { mount } from 'enzyme';
import BriefBound from 'src/shared/components/flightSummary/briefBound';
import BriefBoundBuilder from 'test/builders/model/briefBoundBuilder';

describe('BriefBound Component', () => {
  let component;

  beforeEach(() => {
    const props = new BriefBoundBuilder().build();

    component = mount(<BriefBound {...props} />);
  });

  it('should display departure date and departure day of week', () => {
    expect(component.find('.flex4').at(0)).to.have.text('Nov 27');
    expect(component.find('.flex4').at(1)).to.have.text('Monday');
  });

  it('should display the departure and arrive airport code', () => {
    expect(component.find('div > div > .flex2').at(0)).to.have.text('LAS');
    expect(component.find('div > div > .flex2').at(2)).to.have.text('OAK');
  });

  it('should display the departure and arrive time', () => {
    expect(component.find('FlightTime').at(0)).to.have.text('11:55PM');
    expect(component.find('FlightTime').at(1)).to.have.text('1:30AM');
  });

  context('overnight', () => {
    it('should show overnight indicator when isOvernight is true', () => {
      const props = new BriefBoundBuilder().withOvernightStops().build();

      component = mount(<BriefBound {...props} />);

      expect(component.find('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should not show overnight indicator when isOvernight is false', () => {
      const props = new BriefBoundBuilder().withoutOvernightStops().build();

      component = mount(<BriefBound {...props} />);

      expect(component.find('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });
  });

  context('overnight without stops', () => {
    it('should show overnight indicator when isOvernight is true', () => {
      const props = new BriefBoundBuilder().build();

      component = mount(<BriefBound {...props} isOvernight />);

      expect(component.find('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });

    it('should not show overnight indicator when isOvernight is false', () => { 
      const props = new BriefBoundBuilder().build();

      component = mount(<BriefBound {...props} />);

      expect(component.find('[data-qa="overnight-indicator"]')).toMatchSnapshot();
    });
  });

  context('next day', () => {
    it('should show next day indicator when isNextDayArrival is true', () => {
      const props = new BriefBoundBuilder().build();

      component = mount(<BriefBound {...props} isNextDayArrival />);

      expect(component.find('[data-qa="next-day-indicator"]')).toMatchSnapshot();
    });

    it('should not show next day indicator when isNextDayArrival is false', () => { 
      const props = new BriefBoundBuilder().build();

      component = mount(<BriefBound {...props} />);

      expect(component.find('[data-qa="next-day-indicator"]')).toMatchSnapshot();
    });
  });
});
