import React from 'react';
import { mount } from 'enzyme';
import FlightHeader from 'src/shared/components/flightHeader';

describe('FlightHeader', () => {
  const createComponent = (props) => mount(<FlightHeader {...props} />);

  it("should not show a 'Next Day' flag when arrival date is one or more days after departure date", () => {
    const components = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      flightNumbers: '42',
      stopDescription: 'Nonstop'
    });

    expect(components).not.contain.text('Next Day');
  });

  it("should not show a 'Next Day' flag when have isNextDay prop and the value is true but hideIsNextDay is true", () => {
    const components = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      isNextDay: true,
      hideIsNextDay: true,
      flightNumbers: '42',
      stopDescription: 'Nonstop'
    });

    expect(components).not.contain.text('Next Day');
  });

  it("should show a 'Next Day' flag when it has isNextDay prop and the value is true", () => {
    const components = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      isNextDay: true,
      flightNumbers: '42',
      stopDescription: 'Nonstop'
    });

    expect(components).to.contain.text('Next Day');
  });

  it("should show an 'Overnight' flag when it has isOvernight prop and the value is true", () => {
    const components = createComponent({
      arrivalTime: '2015-06-13T10:20',
      departureTime: '2015-06-13T08:00',
      flightNumbers: '42',
      isOvernight: true,
      stopDescription: 'Nonstop'
    });

    expect(components).to.contain.text('Overnight');
  });

  it("should show only an 'Overnight' flag when isOvernight and isNextDay props are both true", () => {
    const components = createComponent({
      arrivalTime: '2015-06-13T10:20',
      departureTime: '2015-06-13T08:00',
      flightNumbers: '42',
      isNextDay: true,
      isOvernight: true,
      stopDescription: 'Nonstop'
    });

    expect(components).to.contain.text('Overnight');
    expect(components).to.not.contain.text('Next Day');
  });

  it('should render in standard mode', () => {
    const component = createComponent({
      departureTime: '2015-06-13T08:00',
      arrivalTime: '2015-06-13T10:20',
      flightNumbers: '42',
      stopDescription: 'Nonstop',
      isNextDay: true
    });

    expect(component.find('div[data-qa="departs"]').text()).to.equal('Departs8:00AM');
    expect(component.find('div.flight-header--flight-numbers-col').text()).to.equal('Flight#42Nonstop');
    expect(component.find('div.flight-header--arrives-col').text()).to.equal('Arrives10:20AMNext Day');
    expect(component.find('p[data-qa="next-day"]').text().trim()).to.equal('Next Day');
  });
});
