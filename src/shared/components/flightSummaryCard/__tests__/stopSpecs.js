import { shallow } from 'enzyme';
import React from 'react';
import Stop from 'src/shared/components/flightSummaryCard/stop';

describe('stop', () => {
  it('has no plane change', () => {
    const stop = {
      airport: {
        code: 'BWI',
        country: null,
        name: 'Baltimore/Washington',
        state: 'MD'
      },
      arrivalStatus: null,
      arrivalStatusType: null,
      arrivalTime: '11:05',
      changePlanes: false,
      departureStatus: null,
      departureStatusType: null,
      departureTime: '11:55'
    };

    const component = shallow(<Stop stop={stop} stopsTotalNumber={1} stopNumber={1} />);

    expect(component.find('.stop-detail__info')).to.have.text('Stop: Baltimore/Washington, MD');
    expect(component.find('.stop-detail__status')).to.have.text('No plane change');
  });

  it('has delayed flights', () => {
    const delayedStop = {
      actualArrivalTime: '07:45',
      actualDepartureTime: '09:10',
      airport: {
        code: 'HAV',
        country: 'Cuba',
        name: 'Havana',
        state: null
      },
      arrivalStatus: 'DELAYED',
      arrivalStatusType: 'NEGATIVE',
      arrivalTime: '07:35',
      changePlanes: true,
      departureStatus: 'DELAYED',
      departureStatusType: 'NEGATIVE',
      departureTime: '09:00'
    };

    const component = shallow(<Stop stop={delayedStop} stopsTotalNumber={1} stopNumber={1} />);

    const arrivalTime = component.find('FlightTimeAndStatus').first();
    const departureTime = component.find('FlightTimeAndStatus').last();

    expect(arrivalTime).to.have.prop('timeString').which.equal('07:45');
    expect(arrivalTime).to.have.prop('flightStatus').which.equal('DELAYED');
    expect(arrivalTime).to.have.prop('statusType').which.equal('NEGATIVE');
    expect(arrivalTime).to.have.prop('originalTime').which.equal('07:35');
    expect(departureTime).to.have.prop('timeString').which.equal('09:10');
    expect(departureTime).to.have.prop('flightStatus').which.equal('DELAYED');
    expect(departureTime).to.have.prop('statusType').which.equal('NEGATIVE');
    expect(departureTime).to.have.prop('originalTime').which.equal('09:00');
  });

  it('had delayed stop that landed', () => {
    const delayedStop = {
      actualArrivalTime: '07:45',
      actualDepartureTime: '09:10',
      airport: {
        code: 'HAV',
        country: 'Cuba',
        name: 'Havana',
        state: null
      },
      arrivalStatus: 'LANDED',
      arrivalStatusType: 'POSITIVE',
      arrivalTime: '07:35',
      changePlanes: true,
      departureStatus: 'DELAYED',
      departureStatusType: 'NEGATIVE',
      departureTime: '09:00'
    };

    const component = shallow(<Stop stop={delayedStop} stopsTotalNumber={1} stopNumber={1} />);

    const arrivalTime = component.find('FlightTimeAndStatus').first();
    const departureTime = component.find('FlightTimeAndStatus').last();

    expect(arrivalTime).to.have.prop('timeString').which.equal('07:45');
    expect(arrivalTime).to.have.prop('flightStatus').which.equal('LANDED');
    expect(arrivalTime).to.have.prop('statusType').which.equal('POSITIVE');
    expect(arrivalTime).to.have.prop('originalTime').which.equal('07:35');
    expect(departureTime).to.have.prop('timeString').which.equal('09:10');
    expect(departureTime).to.have.prop('flightStatus').which.equal('DELAYED');
    expect(departureTime).to.have.prop('statusType').which.equal('NEGATIVE');
    expect(departureTime).to.have.prop('originalTime').which.equal('09:00');
  });

  it('has change planes', () => {
    const stop = {
      airport: {
        code: 'HAV',
        country: 'Cuba',
        name: 'Havana',
        state: null
      },
      arrivalStatus: 'ON TIME',
      arrivalStatusType: 'POSITIVE',
      arrivalTime: '07:35',
      changePlanes: true,
      departureStatus: 'ON TIME',
      departureStatusType: 'POSITIVE',
      departureTime: '09:00'
    };

    const component = shallow(<Stop stop={stop} stopsTotalNumber={1} stopNumber={1} />);

    expect(component.find('.stop-detail__info')).to.have.text('Stop: Havana, Cuba');
    expect(component.find('.stop-detail__status')).to.contain.text('Change planes');
    expect(component.find('.stop-detail__status').find('Icon')).to.have.lengthOf(2);

    const arrivalLabel = component.find('LabelContainer').at(0);
    const depatureLabel = component.find('LabelContainer').at(1);

    expect(arrivalLabel).to.have.prop('labelText').which.equal('ARRIVES');
    expect(depatureLabel).to.have.prop('labelText').which.equal('DEPARTS');

    const arrivalTime = component.find('FlightTimeAndStatus').first();
    const departureTime = component.find('FlightTimeAndStatus').last();

    expect(arrivalTime).to.have.prop('timeString').which.equal('07:35');
    expect(arrivalTime).to.have.prop('flightStatus').which.equal('ON TIME');
    expect(arrivalTime).to.have.prop('statusType').which.equal('POSITIVE');
    expect(departureTime).to.have.prop('timeString').which.equal('09:00');
    expect(departureTime).to.have.prop('flightStatus').which.equal('ON TIME');
    expect(departureTime).to.have.prop('statusType').which.equal('POSITIVE');
  });

  it('is the second stop of all stops', () => {
    const stop = {
      airport: {
        code: 'MDW',
        country: null,
        name: 'Chicago (Midway)',
        state: 'IL'
      },
      arrivalStatus: null,
      arrivalStatusType: null,
      arrivalTime: '10:40',
      changePlanes: true,
      departureStatus: null,
      departureStatusType: null,
      departureTime: '14:00'
    };

    const component = shallow(<Stop stop={stop} stopsTotalNumber={2} stopNumber={2} />);

    expect(component.find('.stop-detail__info')).to.have.text('2nd stop:Chicago (Midway), IL');
  });

  it('Should show overnight details when overnight is true', () => {
    const stop = {
      airport: {
        code: 'HAV',
        country: 'Cuba',
        name: 'Havana',
        state: null
      },
      arrivalStatus: 'ON TIME',
      arrivalStatusType: 'POSITIVE',
      arrivalTime: '07:35',
      changePlanes: true,
      departureStatus: 'ON TIME',
      departureStatusType: 'POSITIVE',
      departureTime: '09:00',
      isOvernight: true
    };

    const component = shallow(<Stop stop={stop} stopsTotalNumber={1} stopNumber={1} />);

    expect(component.find('[data-qa="stop-detail--overnight-indicator"]')).to.exist;
  });

  it('Should not show overnight details when overnight is false', () => {
    const stop = {
      airport: {
        code: 'HAV',
        country: 'Cuba',
        name: 'Havana',
        state: null
      },
      arrivalStatus: 'ON TIME',
      arrivalStatusType: 'POSITIVE',
      arrivalTime: '07:35',
      changePlanes: true,
      departureStatus: 'ON TIME',
      departureStatusType: 'POSITIVE',
      departureTime: '09:00',
      isOvernight: false
    };

    const component = shallow(<Stop stop={stop} stopsTotalNumber={1} stopNumber={1} />);

    expect(component.find('[data-qa="stop-detail--overnight-indicator"]')).to.not.exist;
  });
});
