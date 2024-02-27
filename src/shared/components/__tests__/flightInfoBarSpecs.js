import FlightInfoBar from 'src/shared/components/flightInfoBar';
import { mount } from 'enzyme';
import React from 'react';

describe('FlightInfoBar', () => {
  let flight1, flight2;
  let flightInfo;

  before(() => {
    flight1 = {
      flightInfo: { flightNumber: '1688', departureTime: '02:30', gate: null },
      title: 'DEPARTING'
    };
    flight2 = {
      flightInfo: { flightNumber: '47', departureTime: '18:30', gate: 'A10' },
      title: 'CHANGE PLANES'
    };
  });

  it('should show all flight info', () => {
    flightInfo = mount(<FlightInfoBar {...flight1} />);

    expect(flightInfo.find('.flight-number')).to.have.text('1688');
    expect(flightInfo.find('.flight-info-bar--departs-time')).to.have.text('2:30');
    expect(flightInfo.find('.flight-info-bar--departs-period')).to.have.text('AM');
    expect(flightInfo.find('.label-container--label').at(1)).to.have.text('DEPARTS');
    expect(flightInfo.find('.label-container--content').at(2)).to.have.text('---');
    expect(flightInfo.find('.flight-info-bar--title-text')).to.have.text('DEPARTING');
  });

  it('should show gate info when flight has assign gate', () => {
    flightInfo = mount(<FlightInfoBar {...flight2} />);

    expect(flightInfo.find('.label-container--content').at(2)).to.have.text('A10');
  });

  it('should show PM when time if late 12', () => {
    flightInfo = mount(<FlightInfoBar {...flight2} />);

    expect(flightInfo.find('.flight-info-bar--departs-period')).to.have.text('PM');
  });

  it('should not have icons when title is CHANGE PLANES', () => {
    flightInfo = mount(<FlightInfoBar {...flight2} />);

    expect(flightInfo.find('.flight-info-bar--title-icon')).to.be.exist;
  });

  it('should not have icons when title is not CHANGE PLANES', () => {
    flightInfo = mount(<FlightInfoBar {...flight1} />);

    expect(flightInfo.find('.flight-info-bar--title-icon')).to.not.be.exist;
  });
});
