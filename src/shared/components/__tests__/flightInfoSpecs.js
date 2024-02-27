import React from 'react';
import { mount } from 'enzyme';
import FlightInfo from 'src/shared/components/flightInfo';

describe('FlightInfo', () => {
  let flight1, flight2;
  let flightInfo;

  before(() => {
    flight1 = { flights: [{ flightNumber: '1688', hasWifi: false }], travelTime: '2h 15m', gate: null };
    flight2 = { flights: [{ flightNumber: '47', hasWifi: true }], travelTime: '1h 5m', gate: 'A10' };
  });

  it('should show all flight info', () => {
    flightInfo = mount(<FlightInfo {...flight1} />);

    expect(flightInfo.find('.flight-number')).to.have.text('1688');
    expect(flightInfo.find('.flight-duration')).to.have.text('2h 15m');
    expect(flightInfo.find('.label-container--label').at(1)).to.have.text('TRAVEL TIME');
    expect(flightInfo.find('.label-container--content').at(2)).to.have.text('---');
  });

  it('should show gate info when flight has assign gate', () => {
    flightInfo = mount(<FlightInfo {...flight2} />);

    expect(flightInfo.find('.label-container--content').at(2)).to.have.text('A10');
  });

  it('should show total travel time when give property `isTotalTravelDuration`', () => {
    flightInfo = mount(<FlightInfo {...flight1} isTotalTravelDuration />);

    expect(flightInfo.find('.label-container--label').at(1)).to.have.text('TOTAL TRAVEL TIME');
  });
});
